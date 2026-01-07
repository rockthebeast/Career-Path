import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export function useContactForm() {
  const { toast } = useToast();

  const submitContact = useMutation({
    mutationFn: async (data: ContactData) => {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: data.name,
          email: data.email,
          message: data.message
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Message sent!', description: 'We will get back to you soon.' });
    },
    onError: (error) => {
      toast({ title: 'Failed to send message', description: error.message, variant: 'destructive' });
    }
  });

  return { submitContact };
}
