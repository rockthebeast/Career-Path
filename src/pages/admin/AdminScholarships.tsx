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
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
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
import { Badge } from '@/components/ui/badge';

interface Scholarship {
  id: string;
  name: string;
  description: string | null;
  eligibility: string | null;
  category: string | null;
  amount: string | null;
  deadline: string | null;
  official_link: string | null;
  is_active: boolean;
}

export default function AdminScholarships() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eligibility: '',
    category: '',
    amount: '',
    deadline: '',
    official_link: ''
  });

  const { data: scholarships, isLoading } = useQuery({
    queryKey: ['admin-scholarships'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('deadline', { ascending: true });
      if (error) throw error;
      return data as Scholarship[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('scholarships').insert({
        name: data.name,
        description: data.description || null,
        eligibility: data.eligibility || null,
        category: data.category || null,
        amount: data.amount || null,
        deadline: data.deadline || null,
        official_link: data.official_link || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-scholarships'] });
      toast({ title: 'Scholarship created successfully' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error creating scholarship', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from('scholarships').update({
        name: data.name,
        description: data.description || null,
        eligibility: data.eligibility || null,
        category: data.category || null,
        amount: data.amount || null,
        deadline: data.deadline || null,
        official_link: data.official_link || null
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-scholarships'] });
      toast({ title: 'Scholarship updated successfully' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error updating scholarship', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('scholarships').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-scholarships'] });
      toast({ title: 'Scholarship deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting scholarship', description: error.message, variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', eligibility: '', category: '', amount: '', deadline: '', official_link: '' });
    setEditingScholarship(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      name: scholarship.name,
      description: scholarship.description || '',
      eligibility: scholarship.eligibility || '',
      category: scholarship.category || '',
      amount: scholarship.amount || '',
      deadline: scholarship.deadline ? scholarship.deadline.split('T')[0] : '',
      official_link: scholarship.official_link || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScholarship) {
      updateMutation.mutate({ id: editingScholarship.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isExpiringSoon = (deadline: string | null) => {
    if (!deadline) return false;
    const daysUntil = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil >= 0;
  };

  return (
    <AdminLayout title="Manage Scholarships">
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Scholarship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Central Govt / State / Private"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="₹50,000 per year"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="eligibility">Eligibility</Label>
                <Textarea
                  id="eligibility"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  rows={2}
                />
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
                  {editingScholarship ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Scholarships ({scholarships?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scholarships?.map((scholarship) => (
                  <TableRow key={scholarship.id}>
                    <TableCell className="font-medium">
                      {scholarship.name}
                      {isExpiringSoon(scholarship.deadline) && (
                        <Badge variant="destructive" className="ml-2">Expiring Soon</Badge>
                      )}
                    </TableCell>
                    <TableCell>{scholarship.category || '-'}</TableCell>
                    <TableCell>{scholarship.amount || '-'}</TableCell>
                    <TableCell>
                      {scholarship.deadline 
                        ? format(new Date(scholarship.deadline), 'MMM d, yyyy')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(scholarship)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate(scholarship.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {scholarships?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No scholarships found. Add your first scholarship!
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
