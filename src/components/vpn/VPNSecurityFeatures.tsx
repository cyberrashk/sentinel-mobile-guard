
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Shield, Globe, Wifi } from 'lucide-react';

const VPNSecurityFeatures = () => {
  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-blue-400" />
          Advanced Security Features
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">AES-256</p>
            <p className="text-xs text-gray-400">Military Encryption</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Kill Switch</p>
            <p className="text-xs text-gray-400">Auto Protection</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">DNS Leak</p>
            <p className="text-xs text-gray-400">Protection</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <Wifi className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Zero Logs</p>
            <p className="text-xs text-gray-400">Privacy Policy</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VPNSecurityFeatures;
