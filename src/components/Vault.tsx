
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lock, Eye, Folder, User } from 'lucide-react';

const Vault = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const BiometricLogin = () => (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardContent className="p-8 text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center glow-blue">
          <Lock className="h-12 w-12 text-primary" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Secure Vault</h2>
          <p className="text-muted-foreground">Your encrypted files are protected</p>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full h-12 cyber-gradient glow-blue"
            onClick={() => setIsUnlocked(true)}
          >
            <Eye className="h-5 w-5 mr-2" />
            Unlock with Biometrics
          </Button>
          
          <Button variant="outline" className="w-full border-primary/30">
            Use Password Instead
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" />
          <span>256-bit AES encryption</span>
        </div>
      </CardContent>
    </Card>
  );

  const VaultContent = () => (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Secure Vault</CardTitle>
            <Badge className="bg-green-500/20 text-green-400">Unlocked</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="photos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/20">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="passwords">Passwords</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-secondary/20 rounded-lg border border-border/50 flex items-center justify-center hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <Eye className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="space-y-3">
                {['Personal_ID.pdf', 'Insurance_Policy.pdf', 'Tax_Documents_2024.pdf'].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <Folder className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm">{doc}</span>
                    <Badge variant="outline">Encrypted</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passwords" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="space-y-3">
                {['Banking App', 'Email Account', 'Social Media', 'Work Portal'].map((service) => (
                  <div
                    key={service}
                    className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <User className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm">{service}</span>
                    <Badge variant="outline">••••••••</Badge>
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
          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
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
