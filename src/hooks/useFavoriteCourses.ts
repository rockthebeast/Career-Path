import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FavoriteCourse {
  id: string;
  course_id: string;
  course_name: string;
  course_platform: string;
  course_description: string | null;
  course_url: string | null;
  course_category: string | null;
  created_at: string;
}

interface CourseData {
  id: string;
  title: string;
  platformName: string;
  description: string;
  link: string;
  category: string;
}

export function useFavoriteCourses() {
  const [favorites, setFavorites] = useState<FavoriteCourse[]>([]);
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
        .from("favorite_courses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = useCallback((courseId: string) => {
    return favorites.some(fav => fav.course_id === courseId);
  }, [favorites]);

  const toggleFavorite = async (course: CourseData) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save favorite courses.",
        variant: "destructive",
      });
      return;
    }

    const isCurrentlyFavorite = isFavorite(course.id);

    try {
      if (isCurrentlyFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favorite_courses")
          .delete()
          .eq("user_id", user.id)
          .eq("course_id", course.id);

        if (error) throw error;

        setFavorites(prev => prev.filter(fav => fav.course_id !== course.id));
        toast({
          title: "Removed from Favorites",
          description: `${course.title} has been removed from your favorites.`,
        });
      } else {
        // Add to favorites
        const { data, error } = await supabase
          .from("favorite_courses")
          .insert({
            user_id: user.id,
            course_id: course.id,
            course_name: course.title,
            course_platform: course.platformName,
            course_description: course.description,
            course_url: course.link,
            course_category: course.category,
          })
          .select()
          .single();

        if (error) throw error;

        setFavorites(prev => [data, ...prev]);
        toast({
          title: "Added to Favorites",
          description: `${course.title} has been added to your favorites.`,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeFavorite = async (courseId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("favorite_courses")
        .delete()
        .eq("user_id", user.id)
        .eq("course_id", courseId);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.course_id !== courseId));
      toast({
        title: "Removed from Favorites",
        description: "Course has been removed from your favorites.",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
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
