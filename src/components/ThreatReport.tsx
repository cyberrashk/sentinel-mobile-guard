
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Zap, Bell, AlertTriangle } from 'lucide-react';

const ThreatReport = () => {
  const threats = [
    {
      id: 1,
      type: 'Phishing Attack',
      icon: Eye,
      severity: 'high',
      description: 'Suspicious email from fake banking domain detected',
      time: '2 minutes ago',
      status: 'blocked',
      details: 'email-phish-bank.com'
    },
    {
      id: 2,
      type: 'Malicious APK',
      icon: Shield,
      severity: 'critical',
      description: 'Trojan.Android.FakeApp installation blocked',
      time: '15 minutes ago',
      status: 'quarantined',
      details: 'FakeApp_v2.1.apk'
    },
    {
      id: 3,
      type: 'SMS Fraud',
      icon: Bell,
      severity: 'medium',
      description: 'Suspicious text with malicious link detected',
      time: '1 hour ago',
      status: 'blocked',
      details: '+1-555-FRAUD'
    },
    {
      id: 4,
      type: 'Network Risk',
      icon: Zap,
      severity: 'low',
      description: 'Unsecured Wi-Fi connection detected',
      time: '3 hours ago',
      status: 'warning',
      details: 'PublicWiFi_Unsecured'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-green-400';
      case 'quarantined': return 'text-orange-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader className="text-center pb-8">
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 w-fit mx-auto mb-4">
            <AlertTriangle className="h-12 w-12 text-red-400" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Threat Report
          </CardTitle>
          <p className="text-gray-400 mt-2">Recent security events and detected threats</p>
        </CardHeader>
      </Card>

      {/* Threats List */}
      <div className="space-y-4">
        {threats.map((threat) => {
          const IconComponent = threat.icon;
          return (
            <Card key={threat.id} className="glass-card hover:bg-white/5 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50">
                    <IconComponent className="h-6 w-6 text-blue-400" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{threat.type}</h3>
                      <Badge className={`${getSeverityColor(threat.severity)} border`}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300">{threat.description}</p>
                    <p className="text-sm text-gray-500 font-mono">{threat.details}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{threat.time}</span>
                      <span className={`font-medium ${getStatusColor(threat.status)} capitalize`}>
                        ● {threat.status}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-400 border border-blue-500/30"
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* All Clear Status */}
      <Card className="glass-card">
        <CardContent className="p-8 text-center">
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 w-fit mx-auto mb-6">
            <Shield className="h-16 w-16 text-green-400 glow-green" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">System Status: Secure</h3>
          <p className="text-gray-400">All threats have been neutralized. Your device is protected.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatReport;
