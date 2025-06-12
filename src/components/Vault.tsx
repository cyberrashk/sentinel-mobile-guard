
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lock, Eye, Folder, User, Fingerprint, KeyRound } from 'lucide-react';

const Vault = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authMethod, setAuthMethod] = useState('biometric');

  const BiometricLogin = () => (
    <div className="space-y-8">
      <Card className="glass-card">
        <CardContent className="p-8 text-center space-y-8">
          <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto">
            <Lock className="h-16 w-16 text-purple-400" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Secure Vault
            </h2>
            <p className="text-gray-400">Your encrypted files are protected with military-grade security</p>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <Lock className="h-4 w-4" />
            <span>AES-256 Encryption</span>
            <span>•</span>
            <span>Zero-Knowledge Architecture</span>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`glass-card cursor-pointer transition-all duration-300 ${
            authMethod === 'biometric' ? 'ring-2 ring-blue-500/50 bg-blue-500/5' : 'hover:bg-white/5'
          }`}
          onClick={() => setAuthMethod('biometric')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 w-fit mx-auto">
              <Fingerprint className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white">Biometric</h3>
            <p className="text-sm text-gray-400">Use fingerprint or face recognition</p>
          </CardContent>
        </Card>

        <Card 
          className={`glass-card cursor-pointer transition-all duration-300 ${
            authMethod === 'password' ? 'ring-2 ring-purple-500/50 bg-purple-500/5' : 'hover:bg-white/5'
          }`}
          onClick={() => setAuthMethod('password')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mx-auto">
              <KeyRound className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white">Password</h3>
            <p className="text-sm text-gray-400">Enter your master password</p>
          </CardContent>
        </Card>
      </div>

      {/* Authentication Form */}
      <Card className="glass-card">
        <CardContent className="p-6 space-y-6">
          {authMethod === 'biometric' ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center glow-blue animate-pulse">
                <Fingerprint className="h-12 w-12 text-blue-400" />
              </div>
              <p className="text-gray-400">Place your finger on the sensor</p>
              <Button 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0"
                onClick={() => setIsUnlocked(true)}
              >
                <Fingerprint className="h-5 w-5 mr-2" />
                Unlock with Biometrics
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Master Password</label>
                <Input 
                  type="password" 
                  placeholder="Enter your password"
                  className="bg-white/5 border-white/10 text-white placeholder-gray-500"
                />
              </div>
              <Button 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                onClick={() => setIsUnlocked(true)}
              >
                <KeyRound className="h-5 w-5 mr-2" />
                Unlock Vault
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const VaultContent = () => (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Secure Vault
            </CardTitle>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              ● Unlocked
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="photos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
          <TabsTrigger value="photos" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Photos
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Documents
          </TabsTrigger>
          <TabsTrigger value="passwords" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Passwords
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10 flex items-center justify-center hover:border-blue-500/30 transition-all cursor-pointer group"
                  >
                    <Eye className="h-8 w-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="space-y-3">
                {['Personal_ID.pdf', 'Insurance_Policy.pdf', 'Tax_Documents_2024.pdf', 'Passport_Copy.pdf'].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                      <Folder className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="flex-1 text-white font-medium">{doc}</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Encrypted
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passwords" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="space-y-3">
                {['Banking App', 'Email Account', 'Social Media', 'Work Portal', 'Shopping Sites'].map((service) => (
                  <div
                    key={service}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    <span className="flex-1 text-white font-medium">{service}</span>
                    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 font-mono">
                      ••••••••
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => setIsUnlocked(false)}
          className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
        >
          <Lock className="h-4 w-4 mr-2" />
          Lock Vault
        </Button>
      </div>
    </div>
  );

  return isUnlocked ? <VaultContent /> : <BiometricLogin />;
};

export default Vault;
