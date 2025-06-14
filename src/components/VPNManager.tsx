
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Globe, Wifi, Lock, Zap, Signal, Download, Upload, Clock } from 'lucide-react';
import { useVPN } from '@/hooks/useVPN';

const VPNManager = () => {
  const {
    isConnected,
    isConnecting,
    selectedServer,
    vpnServers,
    connectionStats,
    connectVPN,
    disconnectVPN,
    getConnectionDuration,
    formatBytes,
  } = useVPN();

  const getLoadColor = (load: number) => {
    if (load < 50) return 'text-green-400';
    if (load < 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-green-400';
    if (latency < 100) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleConnectionToggle = () => {
    if (isConnected) {
      disconnectVPN();
    } else {
      // Connect to the best available server if none selected
      const bestServer = vpnServers.reduce((best, current) => 
        current.latency < best.latency ? current : best
      );
      const serverToConnect = selectedServer || bestServer;
      connectVPN(serverToConnect);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="glass-card overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-2">Military-Grade VPN Protection</h2>
            <p className="text-gray-200 text-sm">Enterprise-level encryption for your mobile device</p>
          </div>
        </div>
      </Card>

      {/* Connection Status */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                isConnected 
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 glow-green' 
                  : 'bg-gradient-to-br from-red-500/20 to-orange-600/20 glow-red'
              } ${isConnecting ? 'animate-pulse' : ''}`}>
                <Shield className={`h-12 w-12 ${isConnected ? 'text-green-400' : 'text-red-400'}`} />
              </div>
              {isConnected && (
                <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-pulse"></div>
              )}
            </div>
            
            <div>
              <h3 className={`text-xl font-bold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Secure Connection Active' : 'Unprotected Connection'}
              </h3>
              {isConnected && selectedServer ? (
                <div className="space-y-3 mt-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <p className="text-green-400 font-medium text-lg">
                      {selectedServer.flag} {selectedServer.name}, {selectedServer.country}
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div className="text-center">
                        <Clock className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                        <p className="text-blue-400 font-medium">{getConnectionDuration()}</p>
                        <p className="text-gray-400 text-xs">Connected</p>
                      </div>
                      <div className="text-center">
                        <Download className="h-4 w-4 mx-auto mb-1 text-green-400" />
                        <p className="text-green-400 font-medium">{formatBytes(connectionStats.bytesReceived)}</p>
                        <p className="text-gray-400 text-xs">Downloaded</p>
                      </div>
                      <div className="text-center">
                        <Upload className="h-4 w-4 mx-auto mb-1 text-purple-400" />
                        <p className="text-purple-400 font-medium">{formatBytes(connectionStats.bytesSent)}</p>
                        <p className="text-gray-400 text-xs">Uploaded</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 mt-3">
                  <p className="text-red-400 mb-2">Your internet traffic is not encrypted</p>
                  <p className="text-gray-400 text-sm">Connect to VPN to secure your connection</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleConnectionToggle}
              disabled={isConnecting}
              size="lg"
              className={`w-48 h-14 text-lg font-semibold ${
                isConnected 
                  ? 'bg-red-600 hover:bg-red-700 glow-red' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 glow-green'
              }`}
            >
              {isConnecting ? (
                <>
                  <Wifi className="h-5 w-5 mr-3 animate-spin" />
                  {isConnected ? 'Disconnecting...' : 'Connecting...'}
                </>
              ) : isConnected ? (
                <>
                  <Lock className="h-5 w-5 mr-3" />
                  Disconnect VPN
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-3" />
                  Connect VPN
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Server Selection */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-400" />
            VPN Server Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3">
            {vpnServers.map((server) => (
              <div
                key={server.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedServer?.id === server.id
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isConnecting && !isConnected && connectVPN(server)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{server.flag}</span>
                    <div>
                      <p className="font-medium text-white text-lg">{server.name}</p>
                      <p className="text-sm text-gray-400">{server.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Signal className={`h-4 w-4 ${getLatencyColor(server.latency)}`} />
                        <span className={`text-sm font-medium ${getLatencyColor(server.latency)}`}>
                          {server.latency}ms
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Latency</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Zap className={`h-4 w-4 ${getLoadColor(server.load)}`} />
                        <span className={`text-sm font-medium ${getLoadColor(server.load)}`}>
                          {server.load}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Load</p>
                    </div>
                    
                    {selectedServer?.id === server.id && isConnected && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Connected
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-400" />
            Advanced Security Features
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">AES-256</p>
              <p className="text-xs text-gray-400">Military Encryption</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Kill Switch</p>
              <p className="text-xs text-gray-400">Auto Protection</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">DNS Leak</p>
              <p className="text-xs text-gray-400">Protection</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <Wifi className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Zero Logs</p>
              <p className="text-xs text-gray-400">Privacy Policy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VPNManager;
