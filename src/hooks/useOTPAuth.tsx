
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useOTPAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const sendOTP = async (emailAddress: string) => {
    setIsLoading(true);
    setEmail(emailAddress);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: emailAddress,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (token: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Email verified successfully!",
      });
      
      setOtpSent(false);
      return true;
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid OTP code",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (email) {
      await sendOTP(email);
    }
  };

  return {
    sendOTP,
    verifyOTP,
    resendOTP,
    isLoading,
    otpSent,
    email
  };
};
