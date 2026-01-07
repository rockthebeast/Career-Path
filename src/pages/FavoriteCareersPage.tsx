import { Link } from "react-router-dom";
import { Heart, Trash2, ExternalLink, Briefcase, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoriteCareers } from "@/hooks/useFavoriteCareers";

export default function FavoriteCareersPage() {
  const { loading: authLoading } = useAuth();
  const { favorites, loading, removeFavorite } = useFavoriteCareers();

  if (authLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/favorites">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-heading text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              My Favorite Careers
            </h1>
            <p className="text-muted-foreground mt-1">
              Careers you've saved for later exploration
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No favorite careers yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring careers and save your favorites!
              </p>
              <Button asChild>
                <Link to="/careers">Explore Careers</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((career, index) => (
              <Card 
                key={career.id} 
                variant="interactive"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{career.career_title}</CardTitle>
                        {career.career_category && (
                          <span className="text-xs text-muted-foreground">
                            {career.career_category}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeFavorite(career.career_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {career.career_description && (
                    <CardDescription>{career.career_description}</CardDescription>
                  )}
                  
                  {career.career_skills && career.career_skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {career.career_skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 text-xs bg-muted rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    {career.career_salary && (
                      <span className="text-sm font-semibold text-success">
                        {career.career_salary}
                      </span>
                    )}
                    <Link 
                      to={`/careers/${career.career_id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      View Details <ExternalLink className="h-3 w-3" />
                    </Link>
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
