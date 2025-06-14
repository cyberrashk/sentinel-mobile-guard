
import React from 'react';
import { Card } from '@/components/ui/card';

const VPNHeroSection = () => {
  return (
    <Card className="glass-card overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white mb-2">Military-Grade VPN Protection</h2>
          <p className="text-gray-200 text-sm">Enterprise-level encryption for your mobile device</p>
        </div>
      </div>
    </Card>
  );
};

export default VPNHeroSection;
