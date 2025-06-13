
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Smartphone, Bell, FolderOpen, CheckCircle, XCircle } from 'lucide-react';
import { useMobilePermissions } from '@/hooks/useMobilePermissions';

const MobilePermissions = () => {
  const { permissions, requestAllPermissions, isRequesting } = useMobilePermissions();

  const permissionItems = [
    {
      icon: FolderOpen,
      name: 'Storage Access',
      description: 'Required for real-time file scanning',
      granted: permissions.storage,
      key: 'storage'
    },
    {
      icon: Bell,
      name: 'Notifications',
      description: 'Real-time threat alerts',
      granted: permissions.notifications,
      key: 'notifications'
    }
  ];

  const allGranted = Object.values(permissions).every(Boolean);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-blue-400" />
          Mobile Permissions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {permissionItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.granted ? (
                <Badge className="bg-green-500/20 text-green-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Granted
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Denied
                </Badge>
              )}
            </div>
          </div>
        ))}

        {!allGranted && (
          <Button
            onClick={requestAllPermissions}
            disabled={isRequesting}
            className="w-full cyber-gradient glow-blue"
          >
            <Shield className="h-4 w-4 mr-2" />
            {isRequesting ? 'Requesting Permissions...' : 'Grant Permissions'}
          </Button>
        )}

        {allGranted && (
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-medium">All permissions granted!</p>
            <p className="text-sm text-muted-foreground">Real-time scanning is ready.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MobilePermissions;
