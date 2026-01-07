import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#10B981', '#F59E0B', '#EF4444'];

export default function AdminAnalytics() {
  const { data: eventsByType } = useQuery({
    queryKey: ['analytics-by-type'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('event_type');
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(event => {
        counts[event.event_type] = (counts[event.event_type] || 0) + 1;
      });
      
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }
  });

  const { data: languageStats } = useQuery({
    queryKey: ['analytics-languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('language');
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(event => {
        const lang = event.language || 'Unknown';
        counts[lang] = (counts[lang] || 0) + 1;
      });
      
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }
  });

  const { data: dailyStats } = useQuery({
    queryKey: ['analytics-daily'],
    queryFn: async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('analytics_events')
        .select('created_at')
        .gte('created_at', sevenDaysAgo.toISOString());
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(event => {
        const date = new Date(event.created_at).toLocaleDateString('en-US', { weekday: 'short' });
        counts[date] = (counts[date] || 0) + 1;
      });
      
      return Object.entries(counts).map(([day, events]) => ({ day, events }));
    }
  });

  const { data: quizStats } = useQuery({
    queryKey: ['analytics-quiz'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('recommended_careers');
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(result => {
        result.recommended_careers?.forEach((career: string) => {
          counts[career] = (counts[career] || 0) + 1;
        });
      });
      
      return Object.entries(counts)
        .map(([career, count]) => ({ career, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    }
  });

  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Events by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {languageStats?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="events" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Recommended Careers</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="career" type="category" width={150} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
