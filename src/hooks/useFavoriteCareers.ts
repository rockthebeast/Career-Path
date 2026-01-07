import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FavoriteCareer {
  id: string;
  career_id: string;
  career_title: string;
  career_description: string | null;
  career_category: string | null;
  career_salary: string | null;
  career_skills: string[] | null;
  created_at: string;
}

interface CareerData {
  id: string;
  title: string;
  description: string;
  category: string;
  salary: string;
  skills: string[];
}

export function useFavoriteCareers() {
  const [favorites, setFavorites] = useState<FavoriteCareer[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorite_careers")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorite careers:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = useCallback((careerId: string) => {
    return favorites.some(fav => fav.career_id === careerId);
  }, [favorites]);

  const toggleFavorite = async (career: CareerData) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save favorite careers.",
        variant: "destructive",
      });
      return;
    }

    const isCurrentlyFavorite = isFavorite(career.id);

    try {
      if (isCurrentlyFavorite) {
        const { error } = await supabase
          .from("favorite_careers")
          .delete()
          .eq("user_id", user.id)
          .eq("career_id", career.id);

        if (error) throw error;

        setFavorites(prev => prev.filter(fav => fav.career_id !== career.id));
        toast({
          title: "Removed from Favorites",
          description: `${career.title} has been removed from your favorite careers.`,
        });
      } else {
        const { data, error } = await supabase
          .from("favorite_careers")
          .insert({
            user_id: user.id,
            career_id: career.id,
            career_title: career.title,
            career_description: career.description,
            career_category: career.category,
            career_salary: career.salary,
            career_skills: career.skills,
          })
          .select()
          .single();

        if (error) throw error;

        setFavorites(prev => [data, ...prev]);
        toast({
          title: "Added to Favorites",
          description: `${career.title} has been added to your favorite careers.`,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite career:", error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeFavorite = async (careerId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("favorite_careers")
        .delete()
        .eq("user_id", user.id)
        .eq("career_id", careerId);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.career_id !== careerId));
      toast({
        title: "Removed from Favorites",
        description: "Career has been removed from your favorites.",
      });
    } catch (error) {
      console.error("Error removing favorite career:", error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    refetch: fetchFavorites,
  };
}
