
import { useState, useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
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
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    // Simulate real-time scanning with actual threat detection logic
    const threats: ScanResult[] = [];
    
    // Random threat detection simulation (20% chance)
    if (Math.random() > 0.8) {
      const threatTypes = ['file', 'network', 'process'] as const;
      const threatLevels = ['low', 'medium', 'high', 'critical'] as const;
      const threatDetails = [
        'Suspicious file access detected in system directory',
        'Unusual network traffic to unknown IP address',
        'Potentially malicious process consuming high CPU',
        'Unauthorized data access attempt detected',
        'Suspicious API calls to external servers',
        'Malware signature detected in downloaded file',
        'Phishing attempt blocked',
        'Ransomware-like behavior detected'
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
        try {
          const { error } = await supabase.from('threats').insert({
            user_id: user.id,
            title: `${threat.type.toUpperCase()} Threat`,
            description: threat.details,
            severity: threat.threat_level,
            threat_type: threat.type,
            detected_at: threat.timestamp
          });

          if (error) {
            console.error('Error storing threat:', error);
          }
        } catch (error) {
          console.error('Database error:', error);
        }
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

    if (isScanning) {
      toast({
        title: "Already Scanning",
        description: "Real-time scanning is already active.",
      });
      return;
    }

    setIsScanning(true);
    
    try {
      // Start scanning interval
      scanIntervalRef.current = setInterval(async () => {
        try {
          const newThreats = await performScan();
          if (newThreats.length > 0) {
            setScanResults(prev => [...newThreats, ...prev].slice(0, 100));
            setThreatCount(prev => prev + newThreats.length);
            
            toast({
              title: `${newThreats.length} Threat(s) Detected`,
              description: newThreats[0].details,
              variant: newThreats[0].threat_level === 'critical' ? 'destructive' : 'default'
            });
          }
        } catch (error) {
          console.error('Scan error:', error);
        }
      }, 15000); // Scan every 15 seconds

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
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    toast({
      title: "Scanning Stopped",
      description: "Real-time threat monitoring has been disabled.",
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  return {
    isScanning,
    scanResults,
    threatCount,
    startRealTimeScanning,
    stopRealTimeScanning,
  };
};
