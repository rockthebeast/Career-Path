import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface QuizResult {
  id: string;
  user_id: string;
  answers: Record<string, string[]>;
  stream: string | null;
  recommended_careers: string[];
  score: number | null;
  created_at: string;
}

export function useQuizResults() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const history = useQuery({
    queryKey: ['quiz_results', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as QuizResult[];
    },
    enabled: !!user
  });

  const saveResult = useMutation({
    mutationFn: async (result: {
      answers: Record<string, string[]>;
      stream?: string;
      recommended_careers: string[];
      score?: number;
    }) => {
      if (!user) throw new Error('Must be logged in to save results');
      
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          answers: result.answers,
          stream: result.stream || null,
          recommended_careers: result.recommended_careers,
          score: result.score || null
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz_results'] });
      toast({ title: 'Quiz results saved!' });
    },
    onError: (error) => {
      toast({ title: 'Failed to save results', description: error.message, variant: 'destructive' });
    }
  });

  return { history, saveResult };
}
