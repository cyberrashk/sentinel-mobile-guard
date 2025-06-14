
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Menu, X, Bell, LogOut, Activity, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="glass-card backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 cyber-border">
      <div className="absolute inset-0 neural-pattern opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 glow-blue cyber-border">
                <Shield className="h-10 w-10 text-blue-400" />
              </div>
              <div className="absolute inset-0 rounded-xl border border-blue-400/30 animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold cyber-gradient bg-clip-text text-transparent">
                  AI SENTINEL
                </h1>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs font-mono">
                  v3.0 QUANTUM
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-green-400 animate-pulse" />
                <p className="text-xs text-green-400 font-mono">DEFENSE MATRIX ACTIVE</p>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* System Status Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <Zap className="h-4 w-4 text-green-400 animate-pulse" />
              <span className="text-sm font-mono text-green-400">OPTIMAL</span>
            </div>

            {/* Enhanced Notifications */}
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 relative cyber-border">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span className="hidden lg:inline">Alerts</span>
              </div>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs glow-red animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                <User className="h-4 w-4 text-purple-400" />
              </div>
              <span className="text-sm text-gray-300 font-mono">{user?.email}</span>
            </div>

            <Button 
              onClick={handleSignOut}
              variant="ghost" 
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white cyber-border"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 space-y-4 border-t border-white/20 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-400 animate-pulse" />
                  <span className="text-sm font-mono text-green-400">SYSTEM STATUS</span>
                </div>
                <span className="text-sm font-mono text-green-400">OPTIMAL</span>
              </div>
            </div>

            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 cyber-border">
              <Bell className="h-5 w-5 mr-3" />
              Threat Alerts
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-auto glow-red">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>

            <div className="flex items-center justify-start px-4 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-purple-400" />
              </div>
              <span className="text-gray-300 font-mono">{user?.email}</span>
            </div>

            <Button 
              onClick={handleSignOut}
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Secure Disconnect
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
