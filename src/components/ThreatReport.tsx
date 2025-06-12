
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Zap, Bell } from 'lucide-react';

const ThreatReport = () => {
  const threats = [
    {
      id: 1,
      type: 'Phishing',
      icon: Eye,
      severity: 'high',
      description: 'Suspicious email from unknown sender',
      time: '2 minutes ago',
      status: 'blocked'
    },
    {
      id: 2,
      type: 'APK Malware',
      icon: Shield,
      severity: 'critical',
      description: 'Malicious app installation attempt',
      time: '15 minutes ago',
      status: 'quarantined'
    },
    {
      id: 3,
      type: 'SMS Fraud',
      icon: Bell,
      severity: 'medium',
      description: 'Suspicious text message with link',
      time: '1 hour ago',
      status: 'blocked'
    },
    {
      id: 4,
      type: 'Network Risk',
      icon: Zap,
      severity: 'low',
      description: 'Unsecured Wi-Fi connection detected',
      time: '3 hours ago',
      status: 'warning'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-red-50';
      case 'high': return 'bg-orange-500 text-orange-50';
      case 'medium': return 'bg-yellow-500 text-yellow-50';
      case 'low': return 'bg-blue-500 text-blue-50';
      default: return 'bg-gray-500 text-gray-50';
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
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Threat Report</CardTitle>
          <p className="text-center text-muted-foreground">Recent security events and threats</p>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {threats.map((threat) => {
          const IconComponent = threat.icon;
          return (
            <Card key={threat.id} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{threat.type}</h3>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground">{threat.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{threat.time}</span>
                      <span className={`font-medium ${getStatusColor(threat.status)} capitalize`}>
                        {threat.status}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/30"
                  >
                    Fix Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-6 text-center">
          <Shield className="h-16 w-16 text-green-400 mx-auto mb-4 glow-green" />
          <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
          <p className="text-muted-foreground">No active threats detected on your device</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatReport;
