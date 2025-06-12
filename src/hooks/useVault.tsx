
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface VaultItem {
  id: string;
  name: string;
  description?: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  tags: string[];
  is_encrypted: boolean;
  uploaded_at: string;
  last_accessed: string;
}

export const useVault = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const vaultQuery = useQuery({
    queryKey: ['vault-items'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('vault_items')
        .select('*')
        .order('uploaded_at', { ascending: false });
      
      if (error) throw error;
      return data as VaultItem[];
    },
    enabled: !!user,
  });

  const uploadFile = useMutation({
    mutationFn: async ({ file, name, description, tags }: {
      file: File;
      name: string;
      description?: string;
      tags: string[];
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('vault-files')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // Create vault item record
      const { data, error } = await supabase
        .from('vault_items')
        .insert({
          user_id: user.id,
          name,
          description,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
          tags,
          is_encrypted: true
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault-items'] });
      toast({
        title: "File Uploaded",
        description: "Your file has been securely stored in the vault.",
      });
    },
  });

  const downloadFile = async (item: VaultItem) => {
    if (!item.file_path) return;
    
    const { data, error } = await supabase.storage
      .from('vault-files')
      .download(item.file_path);
    
    if (error) throw error;
    
    // Update last accessed
    await supabase
      .from('vault_items')
      .update({ last_accessed: new Date().toISOString() })
      .eq('id', item.id);
    
    // Create download link
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    a.click();
    URL.revokeObjectURL(url);
    
    queryClient.invalidateQueries({ queryKey: ['vault-items'] });
  };

  const deleteItem = useMutation({
    mutationFn: async (item: VaultItem) => {
      // Delete file from storage
      if (item.file_path) {
        await supabase.storage
          .from('vault-files')
          .remove([item.file_path]);
      }
      
      // Delete record
      const { error } = await supabase
        .from('vault_items')
        .delete()
        .eq('id', item.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault-items'] });
      toast({
        title: "Item Deleted",
        description: "The vault item has been permanently deleted.",
      });
    },
  });

  return {
    items: vaultQuery.data || [],
    isLoading: vaultQuery.isLoading,
    error: vaultQuery.error,
    uploadFile: uploadFile.mutate,
    downloadFile,
    deleteItem: deleteItem.mutate,
    isUploading: uploadFile.isPending,
    isDeleting: deleteItem.isPending,
  };
};
