
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Zap, Bell } from 'lucide-react';

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleScan = (type: string) => {
    setIsScanning(true);
    
    setTimeout(() => {
      setScanResult({
        type,
        status: Math.random() > 0.3 ? 'safe' : 'malicious',
        details: type === 'url' 
          ? 'This website has been analyzed for phishing, malware, and suspicious activities.'
          : 'This APK file has been scanned for malicious code, permissions, and security vulnerabilities.',
        threats: Math.random() > 0.5 ? [] : ['Suspicious permissions', 'Unknown source']
      });
      setIsScanning(false);
    }, 3000);
  };

  const ScanResult = ({ result }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
          result.status === 'safe' ? 'bg-green-400/20 glow-green' : 'bg-red-400/20 glow-red'
        }`}>
          <Shield className={`h-8 w-8 ${result.status === 'safe' ? 'text-green-400' : 'text-red-400'}`} />
        </div>
        
        <Badge className={`mb-4 ${
          result.status === 'safe' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {result.status === 'safe' ? 'SAFE' : 'MALICIOUS'}
        </Badge>
        
        <p className="text-muted-foreground mb-4">{result.details}</p>
        
        {result.threats.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-red-400">Threats Detected:</h4>
            {result.threats.map((threat, index) => (
              <div key={index} className="flex items-center justify-center space-x-2">
                <Bell className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-400">{threat}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Security Scanner</CardTitle>
          <p className="text-center text-muted-foreground">Scan APK files and URLs for threats</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="url" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/20">
          <TabsTrigger value="url">Scan URL</TabsTrigger>
          <TabsTrigger value="apk">Scan APK</TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6 space-y-4">
              <div className="text-center mb-6">
                <Eye className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">URL Scanner</h3>
                <p className="text-muted-foreground">Check if a website is safe to visit</p>
              </div>
              
              <div className="space-y-4">
                <Input
                  placeholder="Enter URL (e.g., https://example.com)"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="bg-secondary/20 border-border"
                />
                
                <Button
                  onClick={() => handleScan('url')}
                  disabled={!urlInput || isScanning}
                  className="w-full h-12 cyber-gradient glow-blue"
                >
                  {isScanning ? (
                    <>
                      <Zap className="h-5 w-5 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Eye className="h-5 w-5 mr-2" />
                      Scan URL
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apk" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6 space-y-4">
              <div className="text-center mb-6">
                <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">APK Scanner</h3>
                <p className="text-muted-foreground">Upload an APK file to check for malware</p>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Drop APK file here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supported formats: .apk (max 50MB)</p>
                </div>
                
                <Button
                  onClick={() => handleScan('apk')}
                  disabled={isScanning}
                  className="w-full h-12 cyber-gradient glow-blue"
                >
                  {isScanning ? (
                    <>
                      <Zap className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Scan APK
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {scanResult && <ScanResult result={scanResult} />}
    </div>
  );
};

export default Scanner;
