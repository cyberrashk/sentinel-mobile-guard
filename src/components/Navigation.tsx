
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, User, Menu } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card/50 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20 glow-blue">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Sentinel</h1>
              <p className="text-xs text-muted-foreground">Cyber Protection</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Threats
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Vault
            </Button>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
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
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Threats
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Vault
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary/30">
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
