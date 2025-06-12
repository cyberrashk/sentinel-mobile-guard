
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, User, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass-card backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 glow-blue">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                AI Sentinel
              </h1>
              <p className="text-xs text-gray-400">Cyber Protection</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
              Threats
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
              Vault
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
              Threats
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
              Vault
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
