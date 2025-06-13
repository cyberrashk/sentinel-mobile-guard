
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Eye, Zap, FileCheck, Wifi, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';
import { useRealTimeScanning } from '@/hooks/useRealTimeScanning';

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const { startRealTimeScanning, stopRealTimeScanning, isScanning: isRealTimeScanning } = useRealTimeScanning();

  const startQuickScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);

    // Simulate scanning process
    const scanTypes = [
      { name: 'System Files', duration: 1000 },
      { name: 'Applications', duration: 1500 },
      { name: 'Network Connections', duration: 800 },
      { name: 'Memory Processes', duration: 1200 },
      { name: 'Storage Security', duration: 900 },
    ];

    let currentProgress = 0;
    const progressIncrement = 100 / scanTypes.length;

    for (const scanType of scanTypes) {
      await new Promise(resolve => setTimeout(resolve, scanType.duration));
      currentProgress += progressIncrement;
      setScanProgress(currentProgress);
    }

    // Simulate scan results
    setScanResults([
      { type: 'Files Scanned', count: '2,847', status: 'clean', icon: FileCheck },
      { type: 'Apps Checked', count: '156', status: 'clean', icon: Smartphone },
      { type: 'Network Scans', count: '23', status: 'warning', icon: Wifi },
      { type: 'Threats Found', count: '0', status: 'clean', icon: Shield },
    ]);

    setIsScanning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'threat': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'threat': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Cyber Security Image */}
      <Card className="glass-card overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-2">Advanced Security Scanner</h2>
            <p className="text-gray-200 text-sm">AI-powered threat detection and real-time protection</p>
          </div>
        </div>
      </Card>

      {/* Real-time Scanning Toggle */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Real-Time Protection</h3>
                <p className="text-sm text-gray-400">Continuous monitoring and threat detection</p>
              </div>
            </div>
            <Button
              onClick={isRealTimeScanning ? stopRealTimeScanning : startRealTimeScanning}
              className={`${
                isRealTimeScanning 
                  ? 'bg-red-600 hover:bg-red-700 glow-red' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 glow-green'
              }`}
            >
              {isRealTimeScanning ? 'Stop' : 'Start'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Scan Section */}
      <Card className="glass-card">
        <CardHeader className="text-center">
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 w-fit mx-auto mb-4">
            <Search className="h-12 w-12 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Security Scanner
          </CardTitle>
          <p className="text-gray-400">Comprehensive device security analysis</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {isScanning && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-white font-medium mb-2">Scanning in progress...</p>
                <p className="text-sm text-gray-400">Analyzing your device for threats</p>
              </div>
              <Progress value={scanProgress} className="h-2" />
              <p className="text-center text-sm text-gray-400">
                {scanProgress.toFixed(0)}% Complete
              </p>
            </div>
          )}

          {!isScanning && scanResults.length === 0 && (
            <div className="text-center space-y-4">
              <Button
                onClick={startQuickScan}
                size="lg"
                className="w-56 h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-blue scan-pulse"
              >
                <Search className="h-6 w-6 mr-3" />
                Start Quick Scan
              </Button>
              <p className="text-sm text-gray-400">
                Scan your device for malware, vulnerabilities, and security issues
              </p>
            </div>
          )}

          {scanResults.length > 0 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 w-fit mx-auto mb-4">
                  <Shield className="h-12 w-12 text-green-400 glow-green" />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Scan Complete</h3>
                <p className="text-gray-400">Your device security analysis is finished</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {scanResults.map((result, index) => {
                  const IconComponent = result.icon;
                  const StatusIcon = getStatusIcon(result.status);
                  return (
                    <Card key={index} className="glass-card hover:bg-white/5 transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 w-fit mx-auto mb-3">
                          <IconComponent className={`h-6 w-6 ${getStatusColor(result.status)}`} />
                        </div>
                        <h4 className="font-semibold text-white text-sm mb-1">{result.type}</h4>
                        <p className={`text-lg font-bold ${getStatusColor(result.status)} mb-2`}>
                          {result.count}
                        </p>
                        <div className="flex items-center justify-center gap-1">
                          <StatusIcon className={`h-3 w-3 ${getStatusColor(result.status)}`} />
                          <span className={`text-xs ${getStatusColor(result.status)} capitalize font-medium`}>
                            {result.status}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Button
                onClick={() => {
                  setScanResults([]);
                  setScanProgress(0);
                }}
                className="w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-400 border border-blue-500/30"
              >
                <Search className="h-4 w-4 mr-2" />
                Scan Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Deep Scan</h3>
            <p className="text-gray-400 text-sm">
              Comprehensive analysis of all files and system components
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Wifi className="h-10 w-10 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Network Scan</h3>
            <p className="text-gray-400 text-sm">
              Analyze network connections and detect suspicious activity
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scanner;
