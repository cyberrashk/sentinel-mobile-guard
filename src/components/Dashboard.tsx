
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Lock, Zap, Users, Scan, Globe, Smartphone, Activity, Server, Wifi, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const securityMetrics = [
    { label: 'Threat Shield', status: 'secure', icon: Shield, color: 'text-green-400', count: '100%', bgGlow: 'security-pulse' },
    { label: 'Network Guard', status: 'secure', icon: Wifi, color: 'text-green-400', count: 'ACTIVE', bgGlow: 'glow-green' },
    { label: 'AI Detection', status: 'warning', icon: Eye, color: 'text-yellow-400', count: '2 ALERTS', bgGlow: 'glow-yellow' },
    { label: 'Firewall', status: 'secure', icon: Server, color: 'text-cyan-400', count: 'ENABLED', bgGlow: 'glow-cyan' },
    { label: 'Secure Vault', status: 'secure', icon: Lock, color: 'text-purple-400', count: 'LOCKED', bgGlow: 'glow-purple' }
  ];

  const realTimeData = [
    { label: 'Packets Analyzed', value: '2,847,392', change: '+12.3%', trend: 'up' },
    { label: 'Threats Blocked', value: '156', change: '+5.7%', trend: 'up' },
    { label: 'Network Scans', value: '23', change: '0%', trend: 'stable' },
    { label: 'System Health', value: '99.8%', change: '+0.2%', trend: 'up' }
  ];

  return (
    <div className="space-y-8 relative z-10">
      {/* Advanced Hero Section */}
      <Card className="glass-card overflow-hidden cyber-border hologram">
        <div 
          className="h-64 bg-cover bg-center relative neural-pattern"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
          <div className="absolute inset-0 cyber-grid opacity-30" />
          
          {/* Floating Data Elements */}
          <div className="absolute top-4 right-4 p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 float-animation">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-mono">LIVE</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center glow-green security-pulse">
                  <Shield className="h-10 w-10 text-green-400" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white mb-2 cyber-gradient bg-clip-text text-transparent">
                  AI SENTINEL
                </h2>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                    DEFENSE MODE: ACTIVE
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
                    AI LEARNING: ON
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-gray-200 text-lg font-medium">
              Next-Generation AI-Powered Cyber Defense System
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Real-time threat analysis • Neural network protection • Quantum encryption ready
            </p>
          </div>
        </div>
      </Card>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {realTimeData.map((item, index) => (
          <Card key={index} className="glass-card hover:glow-blue transition-all duration-300 group">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              <div className="relative">
                <h3 className="text-sm text-gray-400 mb-2 font-mono">{item.label}</h3>
                <p className="text-2xl font-bold text-white mb-2 font-mono">{item.value}</p>
                <div className={`text-xs flex items-center justify-center gap-1 ${
                  item.trend === 'up' ? 'text-green-400' : 
                  item.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  <span>{item.change}</span>
                  {item.trend === 'up' && <span>↗</span>}
                  {item.trend === 'down' && <span>↘</span>}
                  {item.trend === 'stable' && <span>→</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Action Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card hover:glow-blue transition-all duration-300 group cyber-border">
          <CardContent className="p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 data-stream opacity-20" />
            <div className="relative">
              <div className="p-6 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Scan className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Deep System Scan</h3>
              <p className="text-gray-400 mb-6">Advanced AI-powered threat detection with neural network analysis</p>
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-blue group-hover:glow-purple transition-all duration-300"
              >
                <Scan className="h-6 w-6 mr-3" />
                INITIATE SCAN
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover:glow-green transition-all duration-300 group cyber-border">
          <CardContent className="p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 neural-pattern opacity-10" />
            <div className="relative">
              <div className="p-6 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-12 w-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure VPN Shield</h3>
              <p className="text-gray-400 mb-6">Military-grade encryption with global server network</p>
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 glow-green group-hover:glow-cyan transition-all duration-300"
              >
                <Globe className="h-6 w-6 mr-3" />
                ACTIVATE VPN
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Security Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {securityMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card
              key={index}
              className={`glass-card hover:bg-white/10 transition-all duration-300 cursor-pointer group cyber-border ${metric.bgGlow}`}
            >
              <CardContent className="flex flex-col items-center p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent group-hover:via-white/10 transition-all duration-300" />
                <div className="relative">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 mb-4 group-hover:scale-110 transition-transform duration-300 hologram">
                    <IconComponent className={`h-8 w-8 ${metric.color}`} />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">{metric.label}</h3>
                  <div className="space-y-2">
                    <Badge className={`${
                      metric.status === 'secure' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    } px-3 py-1 font-mono`}>
                      {metric.status.toUpperCase()}
                    </Badge>
                    <p className={`text-sm font-bold font-mono ${metric.color}`}>
                      {metric.count}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Advanced Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card hover:glow-cyan transition-all duration-300 group overflow-hidden cyber-border">
          <div 
            className="h-40 bg-cover bg-center relative"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute inset-0 neural-pattern opacity-20" />
            <div className="absolute bottom-4 left-6">
              <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-sm">
                <Eye className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono">
                AI ACTIVE
              </Badge>
            </div>
          </div>
          <CardContent className="p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-3">Neural Threat Analysis</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Advanced machine learning algorithms continuously monitor and analyze potential threats with 99.9% accuracy rate
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  Real-time Analysis
                </span>
                <span>Neural Networks: 12 Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover:glow-purple transition-all duration-300 group overflow-hidden cyber-border">
          <div 
            className="h-40 bg-cover bg-center relative"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=300&fit=crop)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute bottom-4 left-6">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm">
                <Lock className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-mono">
                QUANTUM READY
              </Badge>
            </div>
          </div>
          <CardContent className="p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-3">Quantum Vault Security</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Next-generation encryption with quantum-resistant algorithms and biometric multi-factor authentication
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  AES-256 + Quantum
                </span>
                <span>Vault Integrity: 100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status Grid */}
      <Card className="glass-card cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <Smartphone className="h-6 w-6 text-blue-400" />
            </div>
            <span className="cyber-gradient-2 bg-clip-text text-transparent">
              Advanced Security Matrix
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hologram">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center mx-auto mb-3 glow-green">
                <span className="text-green-400 font-bold text-lg">98</span>
              </div>
              <p className="text-xl font-bold text-green-400 font-mono">SECURE</p>
              <p className="text-sm text-gray-400">Apps Verified</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20 hologram">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 flex items-center justify-center mx-auto mb-3 glow-cyan">
                <span className="text-blue-400 font-bold text-lg">3.2K</span>
              </div>
              <p className="text-xl font-bold text-blue-400 font-mono">PROTECTED</p>
              <p className="text-sm text-gray-400">Files Encrypted</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20 hologram">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold text-lg">47</span>
              </div>
              <p className="text-xl font-bold text-yellow-400 font-mono">MONITORED</p>
              <p className="text-sm text-gray-400">Network Points</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 hologram">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center mx-auto mb-3 glow-purple">
                <span className="text-purple-400 font-bold text-lg">∞</span>
              </div>
              <p className="text-xl font-bold text-purple-400 font-mono">LEARNING</p>
              <p className="text-sm text-gray-400">AI Evolution</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
