
import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { MobileFileService } from '@/services/mobileFileService';
import { ThreatDetectionService } from '@/services/threatDetectionService';
import { ScanProgress, ThreatResult } from '@/types/mobileScanning';

export const useMobileFileScanning = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<ScanProgress>({
    currentFile: '',
    scannedFiles: 0,
    totalFiles: 0,
    threatsFound: 0,
    percentage: 0
  });
  const [threats, setThreats] = useState<ThreatResult[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const startFullDeviceScan = useCallback(async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start device scanning.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setThreats([]);
    setScanProgress({
      currentFile: 'Initializing AI scanner...',
      scannedFiles: 0,
      totalFiles: 0,
      threatsFound: 0,
      percentage: 0
    });

    try {
      toast({
        title: "Device Scan Started",
        description: "AI/ML scanning all device files for threats...",
      });

      // Get all device files
      const allFiles = await MobileFileService.getDeviceFiles();
      
      setScanProgress(prev => ({
        ...prev,
        totalFiles: allFiles.length,
        currentFile: 'Loading AI models...'
      }));

      const detectedThreats: ThreatResult[] = [];

      // Scan each file with AI
      for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        
        setScanProgress(prev => ({
          ...prev,
          currentFile: `Analyzing: ${file.name}`,
          scannedFiles: i + 1,
          percentage: Math.round(((i + 1) / allFiles.length) * 100)
        }));

        const threat = await ThreatDetectionService.scanFileWithAI(file);
        if (threat) {
          detectedThreats.push(threat);
          setScanProgress(prev => ({
            ...prev,
            threatsFound: detectedThreats.length
          }));

          // Store threat in database
          try {
            await supabase.from('threats').insert({
              user_id: user.id,
              title: `${threat.threatType.toUpperCase()} Detected`,
              description: `${threat.fileName}: ${threat.description}`,
              severity: threat.severity,
              threat_type: threat.threatType,
              detected_at: threat.timestamp
            });
          } catch (dbError) {
            console.error('Error storing threat:', dbError);
          }
        }

        // Realistic scanning delay
        await new Promise(resolve => setTimeout(resolve, 150));
      }

      setThreats(detectedThreats);

      toast({
        title: detectedThreats.length > 0 ? "Security Threats Detected!" : "Device Secure",
        description: detectedThreats.length > 0 
          ? `${detectedThreats.length} threat(s) found and quarantined.`
          : "Your device is secure. No threats detected.",
        variant: detectedThreats.length > 0 ? "destructive" : "default"
      });

    } catch (error) {
      console.error('Device scan failed:', error);
      toast({
        title: "Scan Failed",
        description: "Device scanning encountered an error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  }, [user, toast]);

  const clearScanResults = useCallback(() => {
    setThreats([]);
    setScanProgress({
      currentFile: '',
      scannedFiles: 0,
      totalFiles: 0,
      threatsFound: 0,
      percentage: 0
    });
  }, []);

  return {
    isScanning,
    scanProgress,
    threats,
    startFullDeviceScan,
    clearScanResults
  };
};
