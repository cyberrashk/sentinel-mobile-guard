
import { useState, useCallback } from 'react';
import { aiScanningService, ScanResult } from '@/services/aiScanningService';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAIScanning = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [threatsDetected, setThreatsDetected] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  const startSystemScan = useCallback(async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start scanning.",
        variant: "destructive"
      });
      return;
    }

    console.log('Starting AI system scan...');
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    setThreatsDetected(0);

    try {
      toast({
        title: "AI Scan Started",
        description: "Advanced AI/ML security scanning initiated...",
      });

      // Simulate real-time progress updates
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 12;
        });
      }, 1200);

      const results = await aiScanningService.performSystemScan();
      
      clearInterval(progressInterval);
      setScanProgress(100);
      setScanResults(results);

      const threats = results.filter(r => r.status === 'infected' || r.status === 'suspicious');
      setThreatsDetected(threats.length);

      // Store scan results in database
      if (threats.length > 0) {
        console.log(`Storing ${threats.length} threats in database...`);
        for (const threat of threats) {
          try {
            await supabase.from('threats').insert({
              user_id: user.id,
              title: `${threat.threatDetails?.type?.toUpperCase() || 'THREAT'} Detected`,
              description: `${threat.fileName}: ${threat.threatDetails?.description || 'Unknown threat'}`,
              severity: threat.threatDetails?.severity || 'medium',
              threat_type: threat.threatDetails?.type || 'unknown',
              detected_at: threat.timestamp
            });
          } catch (dbError) {
            console.error('Error storing threat in database:', dbError);
          }
        }
      }

      toast({
        title: threats.length > 0 ? "Threats Detected!" : "Scan Complete",
        description: threats.length > 0 
          ? `${threats.length} threat(s) found and analyzed.`
          : "Your device is secure. No threats detected.",
        variant: threats.length > 0 ? "destructive" : "default"
      });

    } catch (error) {
      console.error('Scanning failed:', error);
      toast({
        title: "Scan Failed",
        description: "AI scanning engine encountered an error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  }, [user, toast]);

  const quarantineThreat = useCallback(async (scanResult: ScanResult) => {
    console.log(`Quarantining threat: ${scanResult.fileName}`);
    
    try {
      // Call quarantine API
      const { data, error } = await supabase.functions.invoke('quarantine-threat', {
        body: {
          scanResultId: scanResult.id,
          filePath: scanResult.filePath,
          threatType: scanResult.threatDetails?.type
        }
      });

      if (error) {
        console.error('Quarantine API error:', error);
        throw error;
      }

      console.log('Quarantine successful:', data);

      toast({
        title: "Threat Quarantined",
        description: `${scanResult.fileName} has been safely quarantined.`,
      });

      // Update scan results
      setScanResults(prev => 
        prev.map(result => 
          result.id === scanResult.id 
            ? { ...result, status: 'quarantined' }
            : result
        )
      );

    } catch (error) {
      console.error('Quarantine failed:', error);
      toast({
        title: "Quarantine Failed",
        description: "Unable to quarantine threat. Manual intervention may be required.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const clearScanResults = useCallback(() => {
    console.log('Clearing scan results...');
    setScanResults([]);
    setScanProgress(0);
    setThreatsDetected(0);
    aiScanningService.clearResults();
  }, []);

  return {
    isScanning,
    scanProgress,
    scanResults,
    threatsDetected,
    startSystemScan,
    quarantineThreat,
    clearScanResults
  };
};
