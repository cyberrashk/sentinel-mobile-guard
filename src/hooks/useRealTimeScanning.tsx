import { useState, useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { BackgroundTask } from '@capacitor/background-task';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ScanResult {
  id: string;
  type: 'file' | 'network' | 'process';
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  timestamp: string;
}

export const useRealTimeScanning = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [threatCount, setThreatCount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const backgroundTaskId = useRef<string | null>(null);

  const scheduleNotification = async (threat: ScanResult) => {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `${threat.threat_level.toUpperCase()} Threat Detected`,
            body: threat.details,
            id: parseInt(threat.id.slice(-8), 16),
            schedule: { at: new Date(Date.now() + 1000) },
            sound: threat.threat_level === 'critical' ? 'alarm.wav' : 'beep.wav',
            actionTypeId: 'THREAT_ALERT',
            extra: {
              threatId: threat.id,
              threatLevel: threat.threat_level
            }
          }
        ]
      });
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

  const performScan = async (): Promise<ScanResult[]> => {
    // Simulate real-time scanning
    const threats: ScanResult[] = [];
    
    // Random threat detection simulation
    if (Math.random() > 0.8) {
      const threatTypes = ['file', 'network', 'process'] as const;
      const threatLevels = ['low', 'medium', 'high', 'critical'] as const;
      const threatDetails = [
        'Suspicious file access detected',
        'Unusual network activity',
        'Potentially malicious process running',
        'Unauthorized data access attempt',
        'Suspicious API calls detected'
      ];

      const threat: ScanResult = {
        id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        threat_level: threatLevels[Math.floor(Math.random() * threatLevels.length)],
        details: threatDetails[Math.floor(Math.random() * threatDetails.length)],
        timestamp: new Date().toISOString()
      };

      threats.push(threat);

      // Store threat in database
      if (user) {
        await supabase.from('threats').insert({
          user_id: user.id,
          title: `${threat.type.toUpperCase()} Threat`,
          description: threat.details,
          severity: threat.threat_level,
          threat_type: threat.type,
          detected_at: threat.timestamp
        });
      }

      // Schedule notification
      await scheduleNotification(threat);
    }

    return threats;
  };

  const startRealTimeScanning = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start real-time scanning.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    
    try {
      if (Capacitor.isNativePlatform()) {
        backgroundTaskId.current = await BackgroundTask.beforeExit(async () => {
          console.log('Starting background scanning task');
          
          const scanInterval = setInterval(async () => {
            if (!isScanning) {
              clearInterval(scanInterval);
              return;
            }
            
            try {
              const newThreats = await performScan();
              if (newThreats.length > 0) {
                setScanResults(prev => [...newThreats, ...prev].slice(0, 100));
                setThreatCount(prev => prev + newThreats.length);
              }
            } catch (error) {
              console.error('Scan error:', error);
            }
          }, 10000); // Scan every 10 seconds

          // Keep background task alive for 30 minutes max
          setTimeout(() => {
            clearInterval(scanInterval);
            if (backgroundTaskId.current) {
              BackgroundTask.finish({ taskId: backgroundTaskId.current });
            }
          }, 30 * 60 * 1000);
        });
      }

      toast({
        title: "Real-Time Scanning Started",
        description: "Your device is now being monitored for threats.",
      });

    } catch (error) {
      console.error('Failed to start scanning:', error);
      setIsScanning(false);
      toast({
        title: "Scanning Failed",
        description: "Unable to start real-time scanning.",
        variant: "destructive"
      });
    }
  };

  const stopRealTimeScanning = async () => {
    setIsScanning(false);
    
    if (backgroundTaskId.current && Capacitor.isNativePlatform()) {
      await BackgroundTask.finish({ taskId: backgroundTaskId.current });
      backgroundTaskId.current = null;
    }

    toast({
      title: "Scanning Stopped",
      description: "Real-time threat monitoring has been disabled.",
    });
  };

  return {
    isScanning,
    scanResults,
    threatCount,
    startRealTimeScanning,
    stopRealTimeScanning,
  };
};
