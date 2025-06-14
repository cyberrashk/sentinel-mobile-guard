
import React from 'react';
import { useVPN } from '@/hooks/useVPN';
import VPNHeroSection from './vpn/VPNHeroSection';
import VPNConnectionStatus from './vpn/VPNConnectionStatus';
import VPNServerList from './vpn/VPNServerList';
import VPNSecurityFeatures from './vpn/VPNSecurityFeatures';

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

  const handleServerSelect = (server: any) => {
    connectVPN(server);
  };

  return (
    <div className="space-y-6">
      <VPNHeroSection />
      
      <VPNConnectionStatus
        isConnected={isConnected}
        isConnecting={isConnecting}
        selectedServer={selectedServer}
        connectionStats={connectionStats}
        onToggleConnection={handleConnectionToggle}
        getConnectionDuration={getConnectionDuration}
        formatBytes={formatBytes}
      />

      <VPNServerList
        vpnServers={vpnServers}
        selectedServer={selectedServer}
        isConnected={isConnected}
        isConnecting={isConnecting}
        onServerSelect={handleServerSelect}
      />

      <VPNSecurityFeatures />
    </div>
  );
};

export default VPNManager;
