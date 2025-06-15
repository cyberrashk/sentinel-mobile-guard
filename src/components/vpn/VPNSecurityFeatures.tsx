import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, Globe, Wifi, Zap, Eye, Server, Activity } from 'lucide-react';

const VPNSecurityFeatures = () => {
  const features = [
    {
      icon: Lock,
      title: 'AES-256',
      subtitle: 'Quantum Encryption',
      color: 'green',
      status: 'ACTIVE'
    },
    {
      icon: Shield,
      title: 'Kill Switch',
      subtitle: 'Auto Protection',
      color: 'emerald',
      status: 'ENABLED'
    },
    {
      icon: Globe,
      title: 'DNS Shield',
      subtitle: 'Leak Protection',
      color: 'lime',
      status: 'SECURED'
    },
    {
      icon: Wifi,
      title: 'Zero Logs',
      subtitle: 'Privacy Policy',
      color: 'teal',
      status: 'VERIFIED'
    },
    {
      icon: Zap,
      title: 'Speed Boost',
      subtitle: 'AI Optimization',
      color: 'mint',
      status: 'TURBO'
    },
    {
      icon: Eye,
      title: 'Threat Block',
      subtitle: 'Real-time Scan',
      color: 'red',
      status: 'MONITORING'
    },
    {
      icon: Server,
      title: 'Multi-Hop',
      subtitle: 'Double VPN',
      color: 'forest',
      status: 'ADVANCED'
    },
    {
      icon: Activity,
      title: 'Neural Guard',
      subtitle: 'AI Learning',
      color: 'emerald',
      status: 'EVOLVING'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'text-green-400 glow-green',
      emerald: 'text-emerald-400 glow-emerald',
      lime: 'text-lime-400 glow-lime',
      teal: 'text-teal-400 glow-teal',
      mint: 'text-green-300 glow-mint',
      red: 'text-red-400 glow-red',
      forest: 'text-green-600'
    };
    return colors[color as keyof typeof colors] || 'text-gray-400';
  };

  const getBadgeClasses = (color: string) => {
    const colors = {
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      lime: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
      teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      mint: 'bg-green-300/20 text-green-300 border-green-300/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
      forest: 'bg-green-600/20 text-green-600 border-green-600/30'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <Card className="glass-card cyber-border">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 glow-green">
              <Lock className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold cyber-gradient-2 bg-clip-text text-transparent">
              ADVANCED SECURITY MATRIX
            </h3>
          </div>
          <p className="text-gray-400">Next-generation protection technologies powered by quantum encryption</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group hologram cyber-border"
              >
                <div className="relative mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 ${getColorClasses(feature.color)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-300"></div>
                </div>
                
                <h4 className="text-sm font-bold text-white mb-1 font-mono">{feature.title}</h4>
                <p className="text-xs text-gray-400 mb-3">{feature.subtitle}</p>
                
                <Badge className={`${getBadgeClasses(feature.color)} text-xs font-mono px-2 py-1`}>
                  {feature.status}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Additional Security Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-lg border border-emerald-500/20">
            <div className="text-2xl font-bold text-emerald-400 font-mono mb-1">256-bit</div>
            <div className="text-xs text-gray-400">Encryption Strength</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400 font-mono mb-1">Zero</div>
            <div className="text-xs text-gray-400">Data Logs Kept</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-lime-500/10 to-emerald-500/10 rounded-lg border border-lime-500/20">
            <div className="text-2xl font-bold text-lime-400 font-mono mb-1">99.9%</div>
            <div className="text-xs text-gray-400">Uptime Guarantee</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VPNSecurityFeatures;
