
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Globe, Lock } from 'lucide-react';

const VPNHeroSection = () => {
  return (
    <Card className="glass-card overflow-hidden cyber-border hologram">
      <div 
        className="h-56 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 neural-pattern opacity-20" />
        
        {/* Floating Status Indicators */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-mono">
            QUANTUM VPN
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono">
            MILITARY GRADE
          </Badge>
        </div>

        <div className="absolute top-4 right-4 p-3 rounded-lg bg-gradient-to-r from-lime-500/20 to-teal-500/20 backdrop-blur-sm border border-lime-500/30 float-animation">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-lime-400" />
            <span className="text-lime-400 text-sm font-mono">GLOBAL NETWORK</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-lime-600/30 flex items-center justify-center glow-emerald">
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 cyber-gradient bg-clip-text text-transparent">
                QUANTUM VPN SHIELD
              </h2>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-400" />
                <p className="text-emerald-400 font-medium">Next-Generation Protection Active</p>
              </div>
            </div>
          </div>
          <p className="text-gray-200 text-sm">
            Military-grade quantum encryption • Zero-log policy • Global server network • AI threat detection
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VPNHeroSection;
