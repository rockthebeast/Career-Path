import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Career = Database['public']['Tables']['careers']['Row'];

interface LikeButtonProps {
  career: Career;
}

export const LikeButton = ({ career }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUserAndLikeStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
        const { data } = await supabase
          .from('favorite_careers')
          .select('id')
          .eq('user_id', user.id)
          .eq('career_id', career.id)
          .maybeSingle();
        
        if (data) setIsLiked(true);
      }
    };
    checkUserAndLikeStatus();
  }, [career.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    if (!userId) {
      alert("Please log in to like properties.");
      return;
    }
    setLoading(true);
    if (isLiked) {
      const { error } = await supabase
        .from('favorite_careers')
        .delete()
        .eq('user_id', userId)
        .eq('career_id', career.id);
      
      if (!error) setIsLiked(false);
    } else {
      const { error } = await supabase
        .from('favorite_careers')
        .insert({
          user_id: userId,
          user_email: userEmail,
          career_id: career.id,
          career_title: career.title,
          career_category: career.category,
          career_salary: career.salary_range,
          career_description: career.description,
          career_skills: career.skills
        });
      
      if (!error) setIsLiked(true);
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleLike} 
      disabled={loading}
      className={`px-4 py-2 rounded-md transition-colors ${
        isLiked 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`}
    >
      {loading ? '...' : (isLiked ? 'Saved' : 'Save')}
    </button>
  );
};