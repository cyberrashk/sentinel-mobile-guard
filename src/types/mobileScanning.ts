
export interface MobileFileInfo {
  name: string;
  path: string;
  size: number;
  type: string;
  lastModified: number;
  content?: string;
  isDirectory: boolean;
}

export interface ScanProgress {
  currentFile: string;
  scannedFiles: number;
  totalFiles: number;
  threatsFound: number;
  percentage: number;
}

export interface ThreatResult {
  id: string;
  fileName: string;
  filePath: string;
  threatType: 'virus' | 'malware' | 'trojan' | 'suspicious' | 'adware' | 'spyware';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  description: string;
  aiScore: number;
  timestamp: string;
}
