import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type EventType = 
  | 'career_view'
  | 'scholarship_view'
  | 'course_view'
  | 'quiz_start'
  | 'quiz_complete'
  | 'favorite_add'
  | 'favorite_remove'
  | 'page_view'
  | 'language_change';

interface EventData {
  [key: string]: string | number | boolean | null | undefined;
}

export function useAnalytics() {
  const { user } = useAuth();

  const trackEvent = useCallback(async (
    eventType: EventType,
    eventData?: EventData
  ) => {
    try {
      const sessionId = sessionStorage.getItem('session_id') || generateSessionId();
      sessionStorage.setItem('session_id', sessionId);

      await supabase.from('analytics_events').insert({
        event_type: eventType,
        event_data: eventData || {},
        user_id: user?.id || null,
        session_id: sessionId,
        page_url: window.location.pathname,
        language: localStorage.getItem('i18nextLng') || 'en'
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }, [user]);

  return { trackEvent };
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
