import { Link } from "react-router-dom";
import { Heart, Briefcase, BookOpen, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoriteCareers } from "@/hooks/useFavoriteCareers";
import { useFavoriteCourses } from "@/hooks/useFavoriteCourses";

export default function FavoritesHub() {
  const { loading: authLoading } = useAuth();
  const { favorites: favoriteCareers, loading: careersLoading } = useFavoriteCareers();
  const { favorites: favoriteCourses, loading: coursesLoading } = useFavoriteCourses();


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
        <BackButton className="mb-6" />
        <div className="text-center mb-10">
          <h1 className="text-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            My Favorites
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Access your saved careers and courses in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Favorite Careers Card */}
          <Link to="/favorites/careers">
            <Card variant="interactive" className="h-full group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      Favorite Careers
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                    <CardDescription>
                      Career paths you're interested in
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">
                    {careersLoading ? "..." : favoriteCareers.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {favoriteCareers.length === 1 ? "career saved" : "careers saved"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Favorite Courses Card */}
          <Link to="/favorites/courses">
            <Card variant="interactive" className="h-full group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="h-8 w-8 text-success" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      Favorite Courses
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                    <CardDescription>
                      Courses you want to explore
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-success">
                    {coursesLoading ? "..." : favoriteCourses.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {favoriteCourses.length === 1 ? "course saved" : "courses saved"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Preview Sections */}
        <div className="mt-12 space-y-8 max-w-4xl mx-auto">
          {/* Recent Favorite Careers */}
          {favoriteCareers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Favorite Careers</h2>
                <Link to="/favorites/careers" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteCareers.slice(0, 2).map((career) => (
                  <Card key={career.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{career.career_title}</p>
                        <p className="text-xs text-muted-foreground">{career.career_category}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recent Favorite Courses */}
          {favoriteCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Favorite Courses</h2>
                <Link to="/favorites/courses" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteCourses.slice(0, 2).map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{course.course_name}</p>
                        <p className="text-xs text-muted-foreground">{course.course_platform}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
