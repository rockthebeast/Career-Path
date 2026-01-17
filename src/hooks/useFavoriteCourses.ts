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
      
      const validData = data || [];
      setFavorites(validData);
      // Cache to localStorage
      localStorage.setItem(`favorites_courses_${user.id}`, JSON.stringify(validData));
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // Fallback to localStorage
      const cached = localStorage.getItem(`favorites_courses_${user.id}`);
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

    // Optimistic update
    const previousFavorites = [...favorites];
    let newFavorites: FavoriteCourse[] = [];

    if (isCurrentlyFavorite) {
      newFavorites = previousFavorites.filter((fav) => fav.course_id !== course.id);
    } else {
      const optimisticFavorite: FavoriteCourse = {
        id: `temp-${Date.now()}`,
        course_id: course.id,
        course_name: course.title,
        course_platform: course.platformName,
        course_description: course.description,
        course_url: course.link,
        course_category: course.category,
        created_at: new Date().toISOString(),
      };
      newFavorites = [optimisticFavorite, ...previousFavorites];
    }
    setFavorites(newFavorites);

    try {
      if (isCurrentlyFavorite) {
        const { error } = await supabase
          .from("favorite_courses")
          .delete()
          .eq("user_id", user.id)
          .eq("course_id", course.id);

        if (error) throw error;
        
        // Sync to localStorage
        localStorage.setItem(`favorites_courses_${user.id}`, JSON.stringify(newFavorites));

        toast({
          title: "Removed from Favorites",
          description: "Course has been removed from your favorites.",
        });
      } else {
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

        // Replace optimistic entry with real data
        if (data) {
          setFavorites((prev) => prev.map((f) => (f.course_id === course.id ? data : f)));
          // Update localStorage with real data
          const updatedFavs = newFavorites.map((f) => (f.course_id === course.id ? data : f));
          localStorage.setItem(`favorites_courses_${user.id}`, JSON.stringify(updatedFavs));
        }

        toast({
          title: "Added to Favorites",
          description: "Course has been added to your favorites.",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite course:", error);
      
      // Fallback: Save to localStorage if API fails
      try {
        localStorage.setItem(`favorites_courses_${user.id}`, JSON.stringify(newFavorites));
        toast({
          title: isCurrentlyFavorite ? "Removed from Favorites" : "Added to Favorites",
          description: isCurrentlyFavorite ? "Course removed from favorites." : "Course added to favorites.",
        });
      } catch (localError) {
        setFavorites(previousFavorites); // Revert only if local save also fails
        toast({
          title: "Failed to save favorite",
          description: "Unable to save changes. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const removeFavorite = async (courseId: string) => {
    if (!user) return;

    const previousFavorites = [...favorites];
    const newFavorites = previousFavorites.filter((fav) => fav.course_id !== courseId);
    setFavorites(newFavorites);

    try {
      const { error } = await supabase
        .from("favorite_courses")
        .delete()
        .eq("user_id", user.id)
        .eq("course_id", courseId);

      if (error) throw error;
      
      localStorage.setItem(`favorites_courses_${user.id}`, JSON.stringify(newFavorites));
      
      toast({
        title: "Removed from Favorites",
        description: "Course has been removed from your favorites.",
      });
    } catch (error) {
      console.error("Error removing favorite course:", error);
      
      // Fallback
      try {
        localStorage.setItem(`favorites_courses_${user.id}`, JSON.stringify(newFavorites));
        toast({
          title: "Removed from Favorites",
          description: "Course has been removed from your favorites.",
        });
      } catch (localError) {
        setFavorites(previousFavorites);
        toast({
          title: "Failed to remove favorite",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
}
