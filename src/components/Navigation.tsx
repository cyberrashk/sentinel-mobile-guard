
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Menu, X, Bell, LogOut, Activity, Zap, Lock, Eye } from 'lucide-react';
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
    <nav className="glass-card backdrop-blur-xl border-b border-green-500/20 sticky top-0 z-50 cyber-border">
      <div className="absolute inset-0 neural-pattern opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Premium Logo */}
          <div className="flex items-center space-x-6">
            <div className="relative group">
              {/* Main Logo Container */}
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-lime-500/20 glow-green cyber-border group-hover:scale-105 transition-all duration-500">
                {/* Animated Background Rings */}
                <div className="absolute inset-0 rounded-2xl">
                  <div className="absolute inset-2 rounded-xl border border-green-400/30 animate-ping"></div>
                  <div className="absolute inset-4 rounded-lg border border-emerald-400/20 animate-pulse"></div>
                </div>
                
                {/* Central Shield Icon */}
                <div className="relative">
                  <Shield className="h-12 w-12 text-green-400 relative z-10" />
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 rounded-full bg-green-400/20 blur-lg animate-pulse"></div>
                </div>
                
                {/* Floating Security Elements */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500/30 to-lime-500/30 flex items-center justify-center border border-emerald-400/40 animate-bounce">
                  <Lock className="h-3 w-3 text-emerald-400" />
                </div>
                
                <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-r from-teal-500/30 to-green-500/30 flex items-center justify-center border border-teal-400/40 float-animation">
                  <Eye className="h-3 w-3 text-teal-400" />
                </div>
              </div>
              
              {/* Scanning Effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/60 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-emerald-400/60 to-transparent animate-pulse delay-1000"></div>
              </div>
            </div>
            
            {/* Enhanced Brand Text */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <h1 className="text-3xl font-bold cyber-gradient bg-clip-text text-transparent tracking-wider font-mono">
                    AI SENTINEL
                  </h1>
                  {/* Text glow effect */}
                  <div className="absolute inset-0 text-3xl font-bold text-green-400/20 blur-sm font-mono tracking-wider">
                    AI SENTINEL
                  </div>
                </div>
                
                {/* Premium Badges */}
                <div className="flex flex-col gap-1">
                  <Badge className="bg-gradient-to-r from-emerald-500/20 to-lime-500/20 text-emerald-400 border-emerald-500/30 text-xs font-mono px-2 py-1 hover:glow-emerald transition-all duration-300">
                    v4.0 QUANTUM
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-400 border-green-500/30 text-xs font-mono px-2 py-1 hover:glow-green transition-all duration-300">
                    NEURAL AI
                  </Badge>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20">
                  <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-mono font-bold">NEURAL DEFENSE ACTIVE</span>
                </div>
                
                {/* Live Data Stream Indicator */}
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping delay-200"></div>
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-ping delay-500"></div>
                  <span className="text-xs text-gray-400 font-mono ml-2">LIVE DATA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* System Status Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20">
              <Zap className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-sm font-mono text-emerald-400">OPTIMAL</span>
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
            <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                <User className="h-4 w-4 text-green-400" />
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
            <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-sm font-mono text-emerald-400">SYSTEM STATUS</span>
                </div>
                <span className="text-sm font-mono text-emerald-400">OPTIMAL</span>
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

            <div className="flex items-center justify-start px-4 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-green-400" />
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
