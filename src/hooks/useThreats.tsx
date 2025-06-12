
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Threat {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'investigating' | 'false_positive';
  source_ip?: string;
  target_ip?: string;
  threat_type?: string;
  detected_at: string;
  resolved_at?: string;
}

export const useThreats = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('threats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'threats',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Threat change received:', payload);
          queryClient.invalidateQueries({ queryKey: ['threats'] });
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New Threat Detected!",
              description: `${payload.new.title} - Severity: ${payload.new.severity}`,
              variant: payload.new.severity === 'critical' ? 'destructive' : 'default'
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient, toast]);

  const threatsQuery = useQuery({
    queryKey: ['threats'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('threats')
        .select('*')
        .order('detected_at', { ascending: false });
      
      if (error) throw error;
      return data as Threat[];
    },
    enabled: !!user,
  });

  const createThreat = useMutation({
    mutationFn: async (threat: Omit<Threat, 'id' | 'detected_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('threats')
        .insert({ ...threat, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    },
  });

  const updateThreatStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Threat['status'] }) => {
      const { data, error } = await supabase
        .from('threats')
        .update({ 
          status, 
          resolved_at: status === 'resolved' ? new Date().toISOString() : null 
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      toast({
        title: "Threat Updated",
        description: "Threat status has been updated successfully.",
      });
    },
  });

  return {
    threats: threatsQuery.data || [],
    isLoading: threatsQuery.isLoading,
    error: threatsQuery.error,
    createThreat: createThreat.mutate,
    updateThreatStatus: updateThreatStatus.mutate,
    isCreating: createThreat.isPending,
    isUpdating: updateThreatStatus.isPending,
  };
};
