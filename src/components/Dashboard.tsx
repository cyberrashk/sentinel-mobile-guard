
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Lock, Zap, Users } from 'lucide-react';

const Dashboard = () => {
  const securityMetrics = [
    { label: 'Malware', status: 'secure', icon: Shield, color: 'text-green-400' },
    { label: 'Phishing', status: 'secure', icon: Eye, color: 'text-green-400' },
    { label: 'App Risk', status: 'warning', icon: Zap, color: 'text-yellow-400' },
    { label: 'Network', status: 'secure', icon: Users, color: 'text-green-400' },
    { label: 'Vault', status: 'secure', icon: Lock, color: 'text-green-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Security Status Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Device Security Status</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center glow-green">
              <Shield className="h-16 w-16 text-green-400" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-green-400 mb-2">Protected</h3>
          <p className="text-muted-foreground">Your device is secure</p>
        </CardContent>
      </Card>

      {/* Scan Button */}
      <div className="text-center">
        <Button
          size="lg"
          className="w-48 h-16 text-lg font-semibold cyber-gradient hover:scale-105 transition-transform glow-blue scan-pulse"
        >
          <Shield className="h-6 w-6 mr-2" />
          Scan Now
        </Button>
      </div>

      {/* Security Indicators */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Security Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {securityMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-secondary/20 rounded-lg border border-border/50"
                >
                  <IconComponent className={`h-8 w-8 ${metric.color} mb-2`} />
                  <span className="text-sm font-medium text-foreground">{metric.label}</span>
                  <span className={`text-xs ${metric.color} capitalize`}>{metric.status}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Threat Report</h3>
            <p className="text-muted-foreground text-sm">View recent threats and security alerts</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Vault</h3>
            <p className="text-muted-foreground text-sm">Access your encrypted files and passwords</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
