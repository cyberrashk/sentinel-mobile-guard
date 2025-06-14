
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Signal, Zap } from 'lucide-react';

interface VPNServer {
  id: string;
  name: string;
  country: string;
  flag: string;
  latency: number;
  load: number;
  premium?: boolean;
}

interface VPNServerListProps {
  vpnServers: VPNServer[];
  selectedServer: VPNServer | null;
  isConnected: boolean;
  isConnecting: boolean;
  onServerSelect: (server: VPNServer) => void;
}

const VPNServerList: React.FC<VPNServerListProps> = ({
  vpnServers,
  selectedServer,
  isConnected,
  isConnecting,
  onServerSelect,
}) => {
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

  return (
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
              onClick={() => !isConnecting && !isConnected && onServerSelect(server)}
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
  );
};

export default VPNServerList;
