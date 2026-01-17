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
      
      const validData = data || [];
      setFavorites(validData);
      // Cache to localStorage
      localStorage.setItem(`favorites_careers_${user.id}`, JSON.stringify(validData));
    } catch (error) {
      console.error("Error fetching favorite careers:", error);
      // Fallback to localStorage
      const cached = localStorage.getItem(`favorites_careers_${user.id}`);
      if (cached) {
        setFavorites(JSON.parse(cached));
      }
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

  const removeFavorite = useCallback(async (careerId: string) => {
    if (!user) {
      return;
    }

    // Optimistic update
    const previousFavorites = [...favorites];
    const newFavorites = previousFavorites.filter((favorite) => favorite.career_id !== careerId);
    setFavorites(newFavorites);

    try {
      const { error } = await supabase
        .from("favorite_careers")
        .delete()
        .eq("user_id", user.id)
        .eq("career_id", careerId);

      if (error) {
        throw error;
      }
      
      localStorage.setItem(`favorites_careers_${user.id}`, JSON.stringify(newFavorites));
      
      toast({
        title: "Removed from Favorites",
        description: "Career has been removed from your favorites.",
      });
    } catch (error) {
      console.error("Error removing favorite career:", error);
      
      // Fallback
      try {
        localStorage.setItem(`favorites_careers_${user.id}`, JSON.stringify(newFavorites));
        toast({
          title: "Removed from Favorites",
          description: "Career has been removed from your favorites.",
        });
      } catch (localError) {
        setFavorites(previousFavorites);
        toast({
          title: "Unable to remove favorite",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
      }
    }
  }, [toast, user, favorites]);

  const toggleFavorite = useCallback(async (career: CareerData) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please sign in to save favorite careers.",
        variant: "destructive",
      });
      return;
    }

    const isCurrentlyFavorite = isFavorite(career.id);

    if (isCurrentlyFavorite) {
      await removeFavorite(career.id);
    } else {
      // Optimistic add
      const previousFavorites = [...favorites];
      
      const optimisticFavorite: FavoriteCareer = {
        id: `temp-${Date.now()}`,
        career_id: career.id,
        career_title: career.title,
        career_description: career.description,
        career_category: career.category,
        career_salary: career.salary,
        career_skills: career.skills,
        created_at: new Date().toISOString(),
      };
      const newFavorites = [optimisticFavorite, ...previousFavorites];
      setFavorites(newFavorites);

      try {
      const { data, error } = await supabase
        .from("favorite_careers")
        .insert({
          user_id: user.id,
          career_id: career.id,
          career_title: career.title,
          career_description: career.description ?? null,
          career_category: career.category ?? null,
          career_salary: career.salary ?? null,
          career_skills: career.skills ?? null,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Replace optimistic with real data
        setFavorites((prev) => prev.map(f => f.career_id === career.id ? data : f));
        
        // Update localStorage with real data
        const updatedFavs = newFavorites.map(f => f.career_id === career.id ? data : f);
        localStorage.setItem(`favorites_careers_${user.id}`, JSON.stringify(updatedFavs));
      }
      
      toast({
        title: "Added to Favorites",
        description: "Career has been added to your favorites.",
      });
    } catch (error) {
      console.error("Error adding favorite career:", error);
      
      // Fallback
      try {
        localStorage.setItem(`favorites_careers_${user.id}`, JSON.stringify(newFavorites));
        toast({
          title: "Added to Favorites",
          description: "Career has been added to your favorites.",
        });
      } catch (localError) {
        setFavorites(previousFavorites);
        toast({
          title: "Unable to save favorite",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
      }
    }
    }
  }, [favorites, toast, user, isFavorite, removeFavorite]);

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
}
