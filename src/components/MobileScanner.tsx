
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Bot, 
  Scan, 
  FileText,
  Trash2,
  Lock,
  Zap
} from 'lucide-react';
import { useMobileFileScanning } from '@/hooks/useMobileFileScanning';

const MobileScanner = () => {
  const { 
    isScanning, 
    scanProgress, 
    threats, 
    startFullDeviceScan, 
    clearScanResults 
  } = useMobileFileScanning();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getThreatIcon = (threatType: string) => {
    switch (threatType) {
      case 'virus': return AlertTriangle;
      case 'malware': return AlertTriangle;
      case 'trojan': return AlertTriangle;
      case 'suspicious': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Mobile AI Scanner Header */}
      <Card className="glass-card overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=400&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 glow-blue">
                <Smartphone className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Mobile AI Scanner</h2>
                <p className="text-blue-400 font-medium">Real Device File Analysis</p>
              </div>
            </div>
            <p className="text-gray-200 text-sm">Advanced AI/ML scanning of all files on your mobile device</p>
          </div>
        </div>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <Bot className="h-6 w-6 text-purple-400 animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">AI Engine Analyzing Device</h3>
                  <p className="text-sm text-gray-400">{scanProgress.currentFile}</p>
                </div>
              </div>
              
              <Progress value={scanProgress.percentage} className="h-3" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <p className="text-2xl font-bold text-blue-400">{scanProgress.scannedFiles}</p>
                  <p className="text-xs text-gray-400">Files Scanned</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                  <p className="text-2xl font-bold text-green-400">{scanProgress.totalFiles}</p>
                  <p className="text-xs text-gray-400">Total Files</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10">
                  <p className="text-2xl font-bold text-red-400">{scanProgress.threatsFound}</p>
                  <p className="text-xs text-gray-400">Threats Found</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <p className="text-2xl font-bold text-purple-400">{scanProgress.percentage}%</p>
                  <p className="text-xs text-gray-400">Progress</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan Control */}
      <Card className="glass-card">
        <CardHeader className="text-center">
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto mb-4">
            <Scan className="h-12 w-12 text-purple-400" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Full Device Security Scan
          </CardTitle>
          <p className="text-gray-400">AI-powered analysis of all device files and applications</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isScanning && threats.length === 0 && (
            <div className="text-center space-y-4">
              <Button
                onClick={startFullDeviceScan}
                size="lg"
                className="w-64 h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 glow-purple"
              >
                <Zap className="h-6 w-6 mr-3" />
                Start Device Scan
              </Button>
              <p className="text-sm text-gray-400">
                Scan all files, apps, and system data for threats using advanced AI
              </p>
            </div>
          )}

          {threats.length > 0 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className={`p-4 rounded-xl w-fit mx-auto mb-4 ${
                  threats.length > 0 
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20' 
                    : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                }`}>
                  {threats.length > 0 ? (
                    <AlertTriangle className="h-12 w-12 text-red-400 glow-red" />
                  ) : (
                    <Shield className="h-12 w-12 text-green-400 glow-green" />
                  )}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  threats.length > 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  Device Scan Complete
                </h3>
                <p className="text-gray-400">
                  {threats.length > 0 
                    ? `${threats.length} threat(s) detected on your device`
                    : "Your device is secure. No threats detected."
                  }
                </p>
              </div>

              {/* Threat Results */}
              <div className="space-y-3">
                {threats.map((threat) => {
                  const ThreatIcon = getThreatIcon(threat.threatType);
                  return (
                    <Card key={threat.id} className="glass-card border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-red-800/50 to-red-700/50">
                              <ThreatIcon className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-white">{threat.fileName}</h4>
                                <Badge className={`${getSeverityColor(threat.severity)} border text-xs`}>
                                  {threat.severity.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-400 mb-2">{threat.filePath}</p>
                              <p className="text-sm text-gray-300 mb-2">{threat.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Type: {threat.threatType}</span>
                                <span>Confidence: {(threat.confidence * 100).toFixed(1)}%</span>
                                <span>AI Score: {(threat.aiScore * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30"
                          >
                            <Lock className="h-3 w-3 mr-1" />
                            Quarantine
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={clearScanResults}
                  className="flex-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-400 border border-blue-500/30"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Results
                </Button>
                <Button
                  onClick={startFullDeviceScan}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Scan Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mobile Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FileText className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real File Access</h3>
            <p className="text-gray-400 text-sm">
              Scans actual files on your mobile device using native permissions
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Bot className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI/ML Detection</h3>
            <p className="text-gray-400 text-sm">
              Advanced machine learning algorithms for accurate threat identification
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileScanner;
