
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Scan {
  id: string;
  scan_type: 'network' | 'malware' | 'vulnerability' | 'phishing';
  status: 'pending' | 'running' | 'completed' | 'failed';
  target: string;
  parameters: any;
  results: any;
  threats_found: number;
  started_at: string;
  completed_at?: string;
}

export const useScans = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Real-time subscription for scan updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('scans-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'scans',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Scan change received:', payload);
          queryClient.invalidateQueries({ queryKey: ['scans'] });
          
          if (payload.eventType === 'UPDATE' && payload.new.status === 'completed') {
            toast({
              title: "Scan Completed",
              description: `${payload.new.scan_type} scan finished. Found ${payload.new.threats_found} threats.`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient, toast]);

  const scansQuery = useQuery({
    queryKey: ['scans'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('scans')
        .select('*')
        .order('started_at', { ascending: false });
      
      if (error) throw error;
      return data as Scan[];
    },
    enabled: !!user,
  });

  const startScan = useMutation({
    mutationFn: async (scanData: { 
      scan_type: Scan['scan_type']; 
      target: string; 
      parameters?: any 
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('scans')
        .insert({ 
          ...scanData, 
          user_id: user.id,
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: "Scan Started",
        description: "Your security scan has been initiated.",
      });
    },
  });

  return {
    scans: scansQuery.data || [],
    isLoading: scansQuery.isLoading,
    error: scansQuery.error,
    startScan: startScan.mutate,
    isStarting: startScan.isPending,
  };
};
