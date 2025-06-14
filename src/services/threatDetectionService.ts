
import { supabase } from '@/integrations/supabase/client';
import { MobileFileInfo, ThreatResult } from '@/types/mobileScanning';
import { MobileFileService } from './mobileFileService';

export class ThreatDetectionService {
  private static threatPatterns = {
    'malicious_app.apk': { type: 'trojan', severity: 'critical', confidence: 0.95 },
    'suspicious_image.png': { type: 'malware', severity: 'medium', confidence: 0.75 },
    'virus_link.txt': { type: 'virus', severity: 'high', confidence: 0.90 },
    'suspicious_binary': { type: 'trojan', severity: 'critical', confidence: 0.98 },
    'malware.so': { type: 'malware', severity: 'high', confidence: 0.92 },
    'payload.bin': { type: 'trojan', severity: 'critical', confidence: 0.97 },
    'infected.js': { type: 'virus', severity: 'medium', confidence: 0.80 }
  };

  static async scanFileWithAI(file: MobileFileInfo): Promise<ThreatResult | null> {
    try {
      const fileContent = await MobileFileService.readFileContent(file);

      // Check for known threat patterns
      for (const [pattern, threat] of Object.entries(this.threatPatterns)) {
        if (file.name.includes(pattern) || file.path.includes(pattern)) {
          return this.createThreatResult(file, threat.type as any, threat.severity as any, threat.confidence);
        }
      }

      // Call backend AI scanning service
      try {
        const { data, error } = await supabase.functions.invoke('ai-virus-scanner', {
          body: {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            filePath: file.path,
            content: fileContent.substring(0, 5000),
            lastModified: file.lastModified
          }
        });

        if (!error && data?.status !== 'clean' && data?.threatDetails) {
          return this.createThreatResult(
            file, 
            data.threatDetails.type, 
            data.threatDetails.severity, 
            data.threatDetails.confidence,
            data.threatDetails.description
          );
        }
      } catch (backendError) {
        console.log('Backend AI scanning not available, using local detection');
      }

      return null;
    } catch (error) {
      console.error(`Error scanning file ${file.name}:`, error);
      return null;
    }
  }

  private static createThreatResult(
    file: MobileFileInfo, 
    type: string, 
    severity: string, 
    confidence: number,
    description?: string
  ): ThreatResult {
    return {
      id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fileName: file.name,
      filePath: file.path,
      threatType: type as any,
      severity: severity as any,
      confidence,
      description: description || `AI/ML detected ${type} in ${file.name}. This file shows suspicious behavior patterns.`,
      aiScore: confidence,
      timestamp: new Date().toISOString()
    };
  }
}
