import { Link } from "react-router-dom";
import { Heart, BookOpen, ExternalLink, Trash2, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoriteCourses } from "@/hooks/useFavoriteCourses";

export default function FavoriteCoursesPage() {
  const { loading: authLoading } = useAuth();
  const { favorites, loading, removeFavorite } = useFavoriteCourses();

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container py-12 flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/favorites" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Favorites
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Heart className="h-6 w-6 text-primary fill-primary" />
            </div>
            <div>
              <h1 className="text-heading text-2xl md:text-3xl font-bold">My Favorite Courses</h1>
              <p className="text-muted-foreground">
                {favorites.length} course{favorites.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
        </div>

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-lg font-medium mb-2">No Favorites Yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring courses and save your favorites for quick access
              </p>
              <Button asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite, index) => (
              <Card 
                key={favorite.id} 
                variant="interactive"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs font-medium bg-secondary/20 text-secondary rounded-full">
                          {favorite.course_platform}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight">{favorite.course_name}</CardTitle>
                      {favorite.course_category && (
                        <CardDescription className="mt-1">{favorite.course_category}</CardDescription>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeFavorite(favorite.course_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {favorite.course_description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {favorite.course_description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      Added {new Date(favorite.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="pt-2">
                    {favorite.course_url ? (
                      <Button size="sm" className="w-full" asChild>
                        <a href={favorite.course_url} target="_blank" rel="noopener noreferrer">
                          Start Learning
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" className="w-full" asChild>
                        <Link to="/courses">
                          View Course
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
