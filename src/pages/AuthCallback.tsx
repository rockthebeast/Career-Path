import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

function parseHashParams(hash: string): Record<string, string> {
  const out: Record<string, string> = {};
  const h = hash.startsWith('#') ? hash.slice(1) : hash;
  for (const part of h.split('&')) {
    const [k, v] = part.split('=');
    if (k) out[decodeURIComponent(k)] = decodeURIComponent(v || '');
  }
  return out;
}

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handle = async () => {
      // If Google cancelled or error occurred, Supabase may include error params in the URL hash
      const hashParams = parseHashParams(window.location.hash || '');
      const hashError = hashParams.error_description || hashParams.error || '';
      if (hashError) {
        navigate(`/?error=${encodeURIComponent(hashError)}`);
        return;
      }

      // Ensure session is set by Supabase, then upsert profile and redirect
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        navigate(`/?error=${encodeURIComponent(error.message)}`);
        return;
      }

      const sess = session;
      if (sess?.user) {
        // Upsert profile record
        const user = sess.user;
        const name = (user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User') as string;
        const email = (user.email || '') as string;
        try {
          await supabase.from('profiles').upsert(
            {
              user_id: user.id,
              name,
              email,
            },
            { onConflict: 'user_id' }
          );

          // Record login history
          if (email) {
            await supabase.from('user_logins').insert({
              user_id: user.id,
              email: email,
            });
          }
        } catch (e) {
          // Ignore upsert errors for UX; profile can be created later
        }
        navigate('/dashboard', { replace: true });
        return;
      }

      // If no session yet, retry briefly once, then fallback to login
      setTimeout(async () => {
        const { data: { session: session2 } } = await supabase.auth.getSession();
        if (session2?.user) {
          const user = session2.user;
          const name = (user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User') as string;
          const email = (user.email || '') as string;
          try {
            await supabase.from('profiles').upsert(
              {
                user_id: user.id,
                name,
                email,
              },
              { onConflict: 'user_id' }
            );
          } catch {}
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/');
        }
      }, 500);
    };

    handle();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Completing sign in...</span>
      </div>
    </div>
  );
}
