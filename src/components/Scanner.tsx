import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Eye, Zap, FileCheck, Wifi, Smartphone, AlertTriangle, CheckCircle, Bot, Scan, Lock, Trash2 } from 'lucide-react';
import { useRealTimeScanning } from '@/hooks/useRealTimeScanning';
import { useAIScanning } from '@/hooks/useAIScanning';
import MobileScanner from './MobileScanner';

const Scanner = () => {
  const { startRealTimeScanning, stopRealTimeScanning, isScanning: isRealTimeScanning } = useRealTimeScanning();
  const { 
    isScanning, 
    scanProgress, 
    scanResults, 
    threatsDetected, 
    startSystemScan, 
    quarantineThreat, 
    clearScanResults 
  } = useAIScanning();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'text-green-400';
      case 'suspicious': return 'text-yellow-400';
      case 'infected': return 'text-red-400';
      case 'quarantined': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return CheckCircle;
      case 'suspicious': return AlertTriangle;
      case 'infected': return AlertTriangle;
      case 'quarantined': return Lock;
      default: return CheckCircle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Mobile Device Scanner */}
      <MobileScanner />

      {/* Real-time Protection Toggle */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                <Eye className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Real-Time AI Protection</h3>
                <p className="text-sm text-gray-400">Continuous ML-powered threat monitoring</p>
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
              {isRealTimeScanning ? 'Stop Protection' : 'Start Protection'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legacy System Scan */}
      <Card className="glass-card">
        <CardHeader className="text-center">
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto mb-4">
            <Bot className="h-12 w-12 text-purple-400" />
          </div>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            System File Scan
          </CardTitle>
          <p className="text-gray-400">Legacy system file analysis</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {isScanning && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-white font-medium mb-2">AI Engine Processing...</p>
                <p className="text-sm text-gray-400">Neural networks analyzing system files</p>
              </div>
              <Progress value={scanProgress} className="h-3" />
              <div className="flex justify-between text-sm text-gray-400">
                <span>Progress: {scanProgress.toFixed(0)}%</span>
                <span>Threats Found: {threatsDetected}</span>
              </div>
            </div>
          )}

          {!isScanning && scanResults.length === 0 && (
            <div className="text-center space-y-4">
              <Button
                onClick={startSystemScan}
                size="lg"
                className="w-64 h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 glow-purple"
              >
                <Scan className="h-6 w-6 mr-3" />
                Start System Scan
              </Button>
              <p className="text-sm text-gray-400">
                Scan system files for threats (demo purposes)
              </p>
            </div>
          )}

          {scanResults.length > 0 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className={`p-4 rounded-xl w-fit mx-auto mb-4 ${
                  threatsDetected > 0 
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20' 
                    : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                }`}>
                  {threatsDetected > 0 ? (
                    <AlertTriangle className="h-12 w-12 text-red-400 glow-red" />
                  ) : (
                    <Shield className="h-12 w-12 text-green-400 glow-green" />
                  )}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  threatsDetected > 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  System Scan Complete
                </h3>
                <p className="text-gray-400">
                  {threatsDetected > 0 
                    ? `${threatsDetected} threat(s) detected in system files`
                    : "System files are secure. No threats detected."
                  }
                </p>
              </div>

              {/* Scan Results */}
              <div className="space-y-3">
                {scanResults.map((result) => {
                  const StatusIcon = getStatusIcon(result.status);
                  return (
                    <Card key={result.id} className="glass-card border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50">
                              <StatusIcon className={`h-5 w-5 ${getStatusColor(result.status)}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-white">{result.fileName}</h4>
                                <Badge className={`${getStatusColor(result.status)} capitalize text-xs`}>
                                  {result.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-400 mb-2">{result.filePath}</p>
                              {result.threatDetails && (
                                <div className="space-y-2">
                                  <Badge className={`${getSeverityColor(result.threatDetails.severity)} border text-xs`}>
                                    {result.threatDetails.severity.toUpperCase()} THREAT
                                  </Badge>
                                  <p className="text-sm text-gray-300">{result.threatDetails.description}</p>
                                  <p className="text-xs text-blue-400">
                                    Confidence: {(result.threatDetails.confidence * 100).toFixed(1)}%
                                  </p>
                                </div>
                              )}
                              <p className="text-xs text-gray-500 mt-2">
                                Scan time: {result.scanTime}ms
                              </p>
                            </div>
                          </div>
                          {(result.status === 'infected' || result.status === 'suspicious') && (
                            <Button
                              size="sm"
                              onClick={() => quarantineThreat(result)}
                              className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30"
                            >
                              <Lock className="h-3 w-3 mr-1" />
                              Quarantine
                            </Button>
                          )}
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
                  onClick={startSystemScan}
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

      {/* Advanced Scanning Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Bot className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Neural Network Scan</h3>
            <p className="text-gray-400 text-sm">
              Deep learning models for advanced threat detection
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Behavioral Analysis</h3>
            <p className="text-gray-400 text-sm">
              ML-powered behavioral pattern recognition
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Wifi className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Network AI Guard</h3>
            <p className="text-gray-400 text-sm">
              Intelligent network traffic analysis and protection
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scanner;
