import React, { useMemo } from 'react';
import { Layout } from '@/components/Layout';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Bell, CalendarClock, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function daysBetween(from: Date, to: Date) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export default function NotificationsPage() {
  const { user } = useAuth();

  const subsQuery = useQuery({
    queryKey: ['scholarship_subscriptions', user?.id],
    queryFn: async () => {
      if (!user) return [] as { id: string; user_id: string; scholarship_id: string | null; notify_all: boolean | null }[];
      const { data, error } = await supabase
        .from('scholarship_subscriptions')
        .select('id,user_id,scholarship_id,notify_all')
        .eq('user_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
    refetchInterval: 5 * 60 * 1000,
  });

  const scholarshipsQuery = useQuery({
    queryKey: ['scholarships-for-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scholarships')
        .select('id,name,deadline')
        .order('deadline', { ascending: true });
      if (error) throw error;
      return data as { id: string; name: string; deadline: string | null }[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const notifications = useMemo(() => {
    if (!user) return [] as { id: string; message: string; daysLeft: number; deadline: string }[];
    const now = new Date();

    const subs = subsQuery.data || [];
    const notifyAll = subs.some(s => !!s.notify_all);
    const subIds = new Set(subs.filter(s => s.scholarship_id).map(s => s.scholarship_id as string));

    const list: { id: string; message: string; daysLeft: number; deadline: string }[] = [];
    for (const s of scholarshipsQuery.data || []) {
      const d = parseDate(s.deadline);
      if (!d) continue; // skip unknown deadlines
      const daysLeft = daysBetween(now, d);
      if (daysLeft < 0 || daysLeft > 30) continue; // only within next month

      // Eligibility: notify_all or specifically subscribed to this scholarship
      if (!notifyAll && !subIds.has(s.id)) continue;

      const label = daysLeft === 0
        ? 'closes today'
        : daysLeft === 1
          ? 'closes in 1 day'
          : `closes in ${daysLeft} days`;
      list.push({ id: s.id, message: `Scholarship "${s.name}" ${label}.`, daysLeft, deadline: s.deadline || '' });
    }

    return list;
  }, [user, subsQuery.data, scholarshipsQuery.data]);

  const isLoading = scholarshipsQuery.isLoading || subsQuery.isLoading;
  const isError = scholarshipsQuery.isError || subsQuery.isError;

  return (
    <Layout>
      <div className="container py-8">
        <BackButton className="mb-4" />
        <div className="max-w-3xl mx-auto bg-card border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-semibold">Notifications</h1>
          </div>

          {isLoading && (
            <p className="text-muted-foreground">Loading alerts…</p>
          )}

          {isError && (
            <div className="flex items-start gap-2 p-3 rounded-md border bg-muted/40">
              <Info className="h-4 w-4 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">Failed to load notifications. Please try again.</p>
            </div>
          )}

          {!isLoading && !isError && notifications.length === 0 && (
            <p className="text-muted-foreground">No upcoming scholarship deadlines within the next month.</p>
          )}

          {!isLoading && !isError && notifications.length > 0 && (
            <div className="space-y-3">
              {notifications.map((n) => (
                <Card key={n.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <CalendarClock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">Deadline: {new Date(n.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
