
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Scanner from "@/components/Scanner";
import ThreatReport from "@/components/ThreatReport";
import Vault from "@/components/Vault";
import AIAssistant from "@/components/AIAssistant";
import Geofence from "@/components/Geofence";
import MobilePermissions from "@/components/MobilePermissions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Search, AlertTriangle, Lock, Bot, MapPin, Smartphone } from "lucide-react";
import { Capacitor } from '@capacitor/core';

const Index = () => {
  const isMobile = Capacitor.isNativePlatform();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={isMobile ? "permissions" : "dashboard"} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 bg-white/5 backdrop-blur-sm border border-white/10">
            {isMobile && (
              <TabsTrigger value="permissions" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Permissions</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="scanner" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Scanner</span>
            </TabsTrigger>
            <TabsTrigger value="threats" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Threats</span>
            </TabsTrigger>
            <TabsTrigger value="vault" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Vault</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="geofence" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Geofence</span>
            </TabsTrigger>
          </TabsList>

          {isMobile && (
            <TabsContent value="permissions">
              <MobilePermissions />
            </TabsContent>
          )}

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="scanner">
            <Scanner />
          </TabsContent>

          <TabsContent value="threats">
            <ThreatReport />
          </TabsContent>

          <TabsContent value="vault">
            <Vault />
          </TabsContent>

          <TabsContent value="ai">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="geofence">
            <Geofence />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
