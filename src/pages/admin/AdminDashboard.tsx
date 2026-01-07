import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Users,
  TrendingUp,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [careers, scholarships, feedback, contacts, quizResults, analytics] = await Promise.all([
        supabase.from('careers').select('id', { count: 'exact' }),
        supabase.from('scholarships').select('id', { count: 'exact' }),
        supabase.from('feedback').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
        supabase.from('quiz_results').select('id', { count: 'exact' }),
        supabase.from('analytics_events').select('id', { count: 'exact' })
      ]);

      return {
        careers: careers.count || 0,
        scholarships: scholarships.count || 0,
        feedback: feedback.count || 0,
        contacts: contacts.count || 0,
        quizResults: quizResults.count || 0,
        analytics: analytics.count || 0
      };
    }
  });

  const statCards = [
    { label: 'Total Careers', value: stats?.careers || 0, icon: Briefcase, color: 'text-blue-500' },
    { label: 'Scholarships', value: stats?.scholarships || 0, icon: GraduationCap, color: 'text-green-500' },
    { label: 'Feedback Received', value: stats?.feedback || 0, icon: MessageSquare, color: 'text-purple-500' },
    { label: 'Contact Messages', value: stats?.contacts || 0, icon: Users, color: 'text-orange-500' },
    { label: 'Quiz Completions', value: stats?.quizResults || 0, icon: TrendingUp, color: 'text-pink-500' },
    { label: 'Analytics Events', value: stats?.analytics || 0, icon: Eye, color: 'text-cyan-500' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/careers" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              Add new career path
            </a>
            <a href="/admin/scholarships" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              Add new scholarship
            </a>
            <a href="/admin/feedback" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              Review user feedback
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Activity feed coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
