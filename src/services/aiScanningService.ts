
import { supabase } from '@/integrations/supabase/client';

export interface ScanFile {
  name: string;
  path: string;
  size: number;
  type: string;
  content?: string;
}

export interface ThreatDetails {
  type: 'virus' | 'malware' | 'trojan' | 'adware' | 'spyware' | 'ransomware';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  signature: string;
  description: string;
  recommendation: string;
}

export interface ScanResult {
  id: string;
  fileName: string;
  filePath: string;
  status: 'clean' | 'infected' | 'suspicious' | 'quarantined';
  threatDetails?: ThreatDetails;
  scanTime: number;
  timestamp: string;
}

class AIScanningService {
  private scanQueue: ScanFile[] = [];
  private isScanning = false;
  private scanResults: ScanResult[] = [];

  async scanFile(file: ScanFile): Promise<ScanResult> {
    const startTime = Date.now();
    
    try {
      console.log(`Starting AI scan for file: ${file.name}`);
      
      // Call AI scanning edge function
      const { data, error } = await supabase.functions.invoke('ai-virus-scanner', {
        body: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          filePath: file.path,
          content: file.content?.substring(0, 10000) // Limit content size
        }
      });

      if (error) {
        console.error('AI scanning error:', error);
        // Fallback to local heuristic scanning
        return this.performHeuristicScan(file, startTime);
      }

      const scanTime = Date.now() - startTime;
      
      const result: ScanResult = {
        id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fileName: file.name,
        filePath: file.path,
        status: data.status || 'clean',
        threatDetails: data.threatDetails,
        scanTime,
        timestamp: new Date().toISOString()
      };

      console.log(`Scan completed for ${file.name}: ${result.status}`);
      this.scanResults.push(result);
      return result;
    } catch (error) {
      console.error('Scanning error:', error);
      
      // Fallback to local heuristic scanning
      return this.performHeuristicScan(file, startTime);
    }
  }

  private async performHeuristicScan(file: ScanFile, startTime: number): Promise<ScanResult> {
    console.log(`Performing heuristic scan for: ${file.name}`);
    
    // Advanced heuristic analysis
    const suspiciousPatterns = [
      /eval\s*\(/gi,
      /document\.write/gi,
      /\.exe\s*$/gi,
      /\.scr\s*$/gi,
      /\.bat\s*$/gi,
      /javascript:void/gi,
      /onload\s*=/gi,
      /iframe\s+src/gi,
      /crypto\s*miner/gi,
      /bitcoin\s*wallet/gi
    ];

    const virusSignatures = [
      'EICAR-STANDARD-ANTIVIRUS-TEST-FILE',
      'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR',
      'trojan.generic',
      'malware.suspicious'
    ];

    let threatLevel = 'clean';
    let confidence = 0;
    let detectedThreats: string[] = [];

    // Check file extension
    const dangerousExtensions = ['.exe', '.scr', '.bat', '.cmd', '.pif', '.com'];
    if (dangerousExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      confidence += 30;
      detectedThreats.push('Potentially dangerous file extension');
    }

    // Check file content for suspicious patterns
    if (file.content) {
      suspiciousPatterns.forEach(pattern => {
        if (pattern.test(file.content!)) {
          confidence += 25;
          detectedThreats.push(`Suspicious pattern detected: ${pattern.source}`);
        }
      });

      // Check for virus signatures
      virusSignatures.forEach(signature => {
        if (file.content!.includes(signature)) {
          confidence += 90;
          threatLevel = 'infected';
          detectedThreats.push(`Known virus signature: ${signature}`);
        }
      });
    }

    // Check file size anomalies
    if (file.size > 100 * 1024 * 1024) { // Files over 100MB
      confidence += 10;
      detectedThreats.push('Unusually large file size');
    }

    // Determine threat level
    if (confidence >= 80) threatLevel = 'infected';
    else if (confidence >= 50) threatLevel = 'suspicious';
    else threatLevel = 'clean';

    const scanTime = Date.now() - startTime;

    const result: ScanResult = {
      id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fileName: file.name,
      filePath: file.path,
      status: threatLevel as any,
      threatDetails: confidence > 0 ? {
        type: 'virus',
        severity: confidence >= 80 ? 'critical' : confidence >= 50 ? 'high' : 'medium',
        confidence: confidence / 100,
        signature: detectedThreats[0] || 'Heuristic detection',
        description: detectedThreats.join(', '),
        recommendation: threatLevel === 'infected' ? 'Quarantine immediately' : 'Monitor closely'
      } : undefined,
      scanTime,
      timestamp: new Date().toISOString()
    };

    return result;
  }

  async performSystemScan(): Promise<ScanResult[]> {
    this.isScanning = true;
    console.log('Starting system scan...');
    
    const systemFiles: ScanFile[] = [
      { name: 'system32.dll', path: '/system/lib/', size: 1024000, type: 'application/octet-stream' },
      { name: 'config.sys', path: '/system/', size: 2048, type: 'text/plain' },
      { name: 'autorun.inf', path: '/storage/', size: 512, type: 'text/plain' },
      { name: 'downloads.cache', path: '/downloads/', size: 5120, type: 'application/cache' },
      { name: 'temp.files', path: '/tmp/', size: 8192, type: 'application/temp' },
      // Add some potentially infected files for demonstration
      { name: 'suspicious.exe', path: '/temp/', size: 2048, type: 'application/exe', content: 'eval(document.write)' },
      { name: 'test.txt', path: '/downloads/', size: 100, type: 'text/plain', content: 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*' }
    ];

    const results: ScanResult[] = [];
    
    for (const file of systemFiles) {
      try {
        const result = await this.scanFile(file);
        results.push(result);
        
        // Simulate scanning delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (error) {
        console.error(`Error scanning file ${file.name}:`, error);
      }
    }

    this.isScanning = false;
    console.log(`System scan completed. Found ${results.filter(r => r.status !== 'clean').length} threats.`);
    return results;
  }

  getScanResults(): ScanResult[] {
    return this.scanResults;
  }

  clearResults(): void {
    this.scanResults = [];
    console.log('Scan results cleared');
  }
}

export const aiScanningService = new AIScanningService();
