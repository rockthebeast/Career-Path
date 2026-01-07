import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FeedbackData {
  rating: number;
  feedbackMessage: string;
  improvementSuggestions?: string;
  pageUrl?: string;
}

export function useFeedback() {
  const { user } = useAuth();
  const { toast } = useToast();

  const submitFeedback = useMutation({
    mutationFn: async (data: FeedbackData) => {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user?.id || null,
          rating: data.rating,
          feedback_message: data.feedbackMessage,
          improvement_suggestions: data.improvementSuggestions || null,
          page_url: data.pageUrl || window.location.pathname
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Thank you for your feedback!' });
    },
    onError: (error) => {
      toast({ title: 'Failed to submit feedback', description: error.message, variant: 'destructive' });
    }
  });

  return { submitFeedback };
}
