
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ThreatReport from '@/components/ThreatReport';
import Vault from '@/components/Vault';
import AIAssistant from '@/components/AIAssistant';
import Scanner from '@/components/Scanner';
import Geofence from '@/components/Geofence';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Lock, Zap, Users, Bell } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield, component: Dashboard },
    { id: 'threats', label: 'Threats', icon: Eye, component: ThreatReport },
    { id: 'vault', label: 'Vault', icon: Lock, component: Vault },
    { id: 'assistant', label: 'AI Assistant', icon: Zap, component: AIAssistant },
    { id: 'scanner', label: 'Scanner', icon: Users, component: Scanner },
    { id: 'geofence', label: 'SOS', icon: Bell, component: Geofence }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-8">
          <div className="flex overflow-x-auto space-x-3 pb-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 h-12 px-6 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 glow-blue' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 space-y-3">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full justify-start h-12 px-4 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 glow-blue' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-3" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
