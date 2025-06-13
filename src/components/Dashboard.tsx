
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Lock, Zap, Users, Scan, Globe, Smartphone } from 'lucide-react';

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
      {/* Hero Section with Tech Background */}
      <Card className="glass-card overflow-hidden">
        <div 
          className="h-56 bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=400&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center glow-green">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">AI Sentinel</h2>
                <p className="text-green-400 font-medium">System Protected</p>
              </div>
            </div>
            <p className="text-gray-200 text-sm">
              Advanced AI-powered mobile security with real-time threat detection and VPN protection
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-blue"
        >
          <Scan className="h-6 w-6" />
          <span className="text-sm font-medium">Quick Scan</span>
        </Button>
        
        <Button
          size="lg"
          className="h-20 flex-col gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 glow-green"
        >
          <Globe className="h-6 w-6" />
          <span className="text-sm font-medium">Connect VPN</span>
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

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group overflow-hidden">
          <div 
            className="h-32 bg-cover bg-center relative"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <Eye className="h-8 w-8 text-blue-400 mb-2" />
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Threat Analysis</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced AI monitoring with real-time threat detection and automated response systems
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover:bg-white/5 transition-all duration-300 cursor-pointer group overflow-hidden">
          <div 
            className="h-32 bg-cover bg-center relative"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=300&fit=crop)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <Lock className="h-8 w-8 text-purple-400 mb-2" />
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Secure Vault</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Military-grade encryption for your sensitive files, photos, and passwords with biometric access
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Security Stats */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-blue-400" />
            Mobile Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-2xl font-bold text-green-400">156</p>
              <p className="text-sm text-gray-400">Apps Scanned</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">2.8K</p>
              <p className="text-sm text-gray-400">Files Protected</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-2xl font-bold text-yellow-400">23</p>
              <p className="text-sm text-gray-400">Network Scans</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">100%</p>
              <p className="text-sm text-gray-400">Protection Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
