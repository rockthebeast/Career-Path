import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Scholarship {
  id: string;
  name: string;
  description: string | null;
  eligibility: string | null;
  category: string | null;
  amount: string | null;
  deadline: string | null;
  official_link: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useScholarships() {
  return useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('deadline', { ascending: true });
      
      if (error) throw error;
      return data as Scholarship[];
    }
  });
}

export function useScholarshipSubscriptions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscriptions = useQuery({
    queryKey: ['scholarship_subscriptions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('scholarship_subscriptions')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const subscribe = useMutation({
    mutationFn: async ({ scholarshipId, email }: { scholarshipId?: string; email: string }) => {
      if (!user) throw new Error('Must be logged in to subscribe');
      
      const { error } = await supabase
        .from('scholarship_subscriptions')
        .insert({
          user_id: user.id,
          scholarship_id: scholarshipId || null,
          notify_all: !scholarshipId,
          email
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scholarship_subscriptions'] });
      toast({ title: 'Subscribed to scholarship alerts!' });
    },
    onError: (error) => {
      toast({ title: 'Failed to subscribe', description: error.message, variant: 'destructive' });
    }
  });

  const unsubscribe = useMutation({
    mutationFn: async (subscriptionId: string) => {
      const { error } = await supabase
        .from('scholarship_subscriptions')
        .delete()
        .eq('id', subscriptionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scholarship_subscriptions'] });
      toast({ title: 'Unsubscribed from alerts' });
    }
  });

  return { subscriptions, subscribe, unsubscribe };
}
