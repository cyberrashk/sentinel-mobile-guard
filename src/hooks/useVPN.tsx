
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { useToast } from './use-toast';

interface VPNServer {
  id: string;
  name: string;
  country: string;
  flag: string;
  latency: number;
  load: number;
}

export const useVPN = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<VPNServer | null>(null);
  const [connectionTime, setConnectionTime] = useState(0);
  const { toast } = useToast();

  const vpnServers: VPNServer[] = [
    { id: 'us-east', name: 'New York', country: 'United States', flag: '🇺🇸', latency: 25, load: 65 },
    { id: 'us-west', name: 'Los Angeles', country: 'United States', flag: '🇺🇸', latency: 45, load: 45 },
    { id: 'uk', name: 'London', country: 'United Kingdom', flag: '🇬🇧', latency: 80, load: 70 },
    { id: 'germany', name: 'Frankfurt', country: 'Germany', flag: '🇩🇪', latency: 90, load: 55 },
    { id: 'japan', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', latency: 120, load: 40 },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', latency: 110, load: 50 },
  ];

  const connectVPN = async (server: VPNServer) => {
    setIsConnecting(true);
    setSelectedServer(server);

    try {
      // Simulate VPN connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (Capacitor.isNativePlatform()) {
        // On native platforms, this would integrate with actual VPN APIs
        console.log(`Connecting to VPN server: ${server.name}`);
      }

      setIsConnected(true);
      setConnectionTime(Date.now());
      
      toast({
        title: "VPN Connected",
        description: `Connected to ${server.name}, ${server.country}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to VPN server",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectVPN = async () => {
    setIsConnecting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(false);
      setSelectedServer(null);
      setConnectionTime(0);
      
      toast({
        title: "VPN Disconnected",
        description: "Your connection is no longer protected",
        variant: "destructive"
      });
    } catch (error) {
      toast({
        title: "Disconnect Failed",
        description: "Unable to disconnect VPN",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Calculate connection duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected && connectionTime) {
      interval = setInterval(() => {
        // This will trigger re-renders to update the connection time display
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, connectionTime]);

  const getConnectionDuration = () => {
    if (!isConnected || !connectionTime) return '00:00:00';
    
    const elapsed = Math.floor((Date.now() - connectionTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    isConnected,
    isConnecting,
    selectedServer,
    vpnServers,
    connectVPN,
    disconnectVPN,
    getConnectionDuration,
  };
};
