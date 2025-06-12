
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Lock, Zap, Users, Scan } from 'lucide-react';

const Dashboard = () => {
  const securityMetrics = [
    { label: 'Malware', status: 'secure', icon: Shield, color: 'text-green-400', count: '0' },
    { label: 'Phishing', status: 'secure', icon: Eye, color: 'text-green-400', count: '0' },
    { label: 'App Risk', status: 'warning', icon: Zap, color: 'text-yellow-400', count: '2' },
    { label: 'Network', status: 'secure', icon: Users, color: 'text-green-400', count: '0' },
    { label: 'Vault', status: 'secure', icon: Lock, color: 'text-green-400', count: '✓' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center glow-green float-animation">
            <Shield className="h-16 w-16 text-green-400" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-pulse"></div>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Protected
          </h2>
          <p className="text-gray-400 mt-2">Your device is secure and protected</p>
        </div>
      </div>

      {/* Scan Button */}
      <div className="text-center">
        <Button
          size="lg"
          className="w-56 h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 glow-blue scan-pulse"
        >
          <Scan className="h-6 w-6 mr-3" />
          Scan Now
        </Button>
      </div>

      {/* Security Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {securityMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card
              key={index}
              className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-1">{metric.label}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${metric.color} capitalize font-medium`}>
                    {metric.status}
                  </span>
                  <span className={`text-xs ${metric.color} font-bold`}>
                    {metric.count}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Eye className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Threat Report</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              View recent threats and security alerts detected on your device
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Lock className="h-12 w-12 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure Vault</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Access your encrypted files, photos, and passwords safely
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
