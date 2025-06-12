
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Shield, Zap, Eye } from 'lucide-react';

const Geofence = () => {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const safeZones = [
    { name: 'Home', status: 'safe', distance: '0.2 km' },
    { name: 'Office', status: 'safe', distance: '1.5 km' },
    { name: 'Shopping Mall', status: 'warning', distance: '2.1 km' }
  ];

  const activateSOS = () => {
    setSosActive(true);
    setCountdown(10);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSosActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setCountdown(0);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Geofence & SOS</CardTitle>
          <p className="text-center text-muted-foreground">Location-based security monitoring</p>
        </CardHeader>
      </Card>

      {/* Map Placeholder */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-0">
          <div className="h-64 bg-gradient-to-br from-secondary/20 to-secondary/10 relative flex items-center justify-center">
            <div className="absolute inset-4 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Eye className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive Map View</p>
                <p className="text-xs text-muted-foreground">Real-time location tracking</p>
              </div>
            </div>
            
            {/* Mock location indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-primary rounded-full glow-blue animate-pulse"></div>
              <div className="absolute inset-0 w-8 h-8 border-2 border-primary/30 rounded-full -m-2 animate-ping"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safe Zones */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Nearby Safe Zones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {safeZones.map((zone, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border/50"
            >
              <div className="flex items-center space-x-3">
                <Shield className={`h-5 w-5 ${zone.status === 'safe' ? 'text-green-400' : 'text-yellow-400'}`} />
                <div>
                  <p className="font-medium">{zone.name}</p>
                  <p className="text-sm text-muted-foreground">{zone.distance} away</p>
                </div>
              </div>
              <Badge className={zone.status === 'safe' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                {zone.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SOS Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-red-400" />
            Emergency SOS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sosActive ? (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 flex items-center justify-center glow-red">
                <span className="text-2xl font-bold text-red-400">{countdown}</span>
              </div>
              <p className="text-red-400 font-semibold">SOS will be sent in {countdown} seconds</p>
              <Button
                onClick={cancelSOS}
                variant="outline"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                Cancel SOS
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors cursor-pointer">
                <Bell className="h-12 w-12 text-red-400" />
              </div>
              <p className="text-muted-foreground">Press and hold for emergency assistance</p>
              <Button
                onClick={activateSOS}
                className="w-full h-12 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 glow-red"
              >
                <Bell className="h-5 w-5 mr-2" />
                Emergency SOS
              </Button>
            </div>
          )}
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Emergency contacts and location will be shared</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Geofence;
