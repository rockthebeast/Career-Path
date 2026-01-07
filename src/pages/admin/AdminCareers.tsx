import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Career {
  id: string;
  title: string;
  category: string | null;
  level: string | null;
  description: string | null;
  salary_range: string | null;
  skills: string[] | null;
  official_link: string | null;
  views: number;
  is_active: boolean;
}

export default function AdminCareers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    description: '',
    salary_range: '',
    skills: '',
    official_link: ''
  });

  const { data: careers, isLoading } = useQuery({
    queryKey: ['admin-careers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Career[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('careers').insert({
        title: data.title,
        category: data.category || null,
        level: data.level || null,
        description: data.description || null,
        salary_range: data.salary_range || null,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()) : null,
        official_link: data.official_link || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast({ title: 'Career created successfully' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error creating career', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from('careers').update({
        title: data.title,
        category: data.category || null,
        level: data.level || null,
        description: data.description || null,
        salary_range: data.salary_range || null,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()) : null,
        official_link: data.official_link || null
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast({ title: 'Career updated successfully' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error updating career', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('careers').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast({ title: 'Career deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting career', description: error.message, variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({ title: '', category: '', level: '', description: '', salary_range: '', skills: '', official_link: '' });
    setEditingCareer(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      title: career.title,
      category: career.category || '',
      level: career.level || '',
      description: career.description || '',
      salary_range: career.salary_range || '',
      skills: career.skills?.join(', ') || '',
      official_link: career.official_link || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCareer) {
      updateMutation.mutate({ id: editingCareer.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <AdminLayout title="Manage Careers">
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Career
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCareer ? 'Edit Career' : 'Add New Career'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Input
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="Entry / Mid / Senior"
                  />
                </div>
                <div>
                  <Label htmlFor="salary_range">Salary Range</Label>
                  <Input
                    id="salary_range"
                    value={formData.salary_range}
                    onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                    placeholder="₹5-10 LPA"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="JavaScript, React, Node.js"
                />
              </div>
              <div>
                <Label htmlFor="official_link">Official Link</Label>
                <Input
                  id="official_link"
                  value={formData.official_link}
                  onChange={(e) => setFormData({ ...formData, official_link: e.target.value })}
                  type="url"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingCareer ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Careers ({careers?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {careers?.map((career) => (
                  <TableRow key={career.id}>
                    <TableCell className="font-medium">{career.title}</TableCell>
                    <TableCell>{career.category || '-'}</TableCell>
                    <TableCell>{career.level || '-'}</TableCell>
                    <TableCell>{career.views}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(career)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate(career.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {careers?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No careers found. Add your first career!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
