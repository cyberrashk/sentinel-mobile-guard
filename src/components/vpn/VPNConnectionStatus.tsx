
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Wifi, Lock, Clock, Download, Upload } from 'lucide-react';

interface VPNServer {
  id: string;
  name: string;
  country: string;
  flag: string;
  latency: number;
  load: number;
  premium?: boolean;
}

interface ConnectionStats {
  bytesReceived: number;
  bytesSent: number;
  protocol: string;
}

interface VPNConnectionStatusProps {
  isConnected: boolean;
  isConnecting: boolean;
  selectedServer: VPNServer | null;
  connectionStats: ConnectionStats;
  onToggleConnection: () => void;
  getConnectionDuration: () => string;
  formatBytes: (bytes: number) => string;
}

const VPNConnectionStatus: React.FC<VPNConnectionStatusProps> = ({
  isConnected,
  isConnecting,
  selectedServer,
  connectionStats,
  onToggleConnection,
  getConnectionDuration,
  formatBytes,
}) => {
  return (
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
            onClick={onToggleConnection}
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
  );
};

export default VPNConnectionStatus;
