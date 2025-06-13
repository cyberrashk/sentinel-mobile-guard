
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Shield, ArrowLeft } from 'lucide-react';
import { useOTPAuth } from '@/hooks/useOTPAuth';

const OTPVerification = () => {
  const [emailInput, setEmailInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const { sendOTP, verifyOTP, resendOTP, isLoading, otpSent, email } = useOTPAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      await sendOTP(emailInput);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      const success = await verifyOTP(otpCode);
      if (success) {
        setOtpCode('');
      }
    }
  };

  const handleBackToEmail = () => {
    setEmailInput('');
    setOtpCode('');
  };

  if (!otpSent) {
    return (
      <Card className="glass-card border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 glow-blue">
              <Mail className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Email Verification
          </CardTitle>
          <p className="text-gray-400">Enter your email to receive an OTP code</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading || !emailInput}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP Code'}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-white/10">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 glow-green">
            <Shield className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <CardTitle className="text-2xl bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
          Verify OTP Code
        </CardTitle>
        <p className="text-gray-400">Enter the 6-digit code sent to {email}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpCode}
              onChange={setOtpCode}
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot 
                    key={index} 
                    index={index}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={isLoading || otpCode.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToEmail}
                className="flex-1 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={resendOTP}
                disabled={isLoading}
                className="flex-1 text-gray-400 hover:text-white"
              >
                Resend Code
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
