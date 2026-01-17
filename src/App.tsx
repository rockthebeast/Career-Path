import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ChatBot } from "@/components/ChatBot";
import { ExitIntentFeedback } from "@/components/ExitIntentFeedback";
import Index from "./pages/Index";
import CareersPage from "./pages/CareersPage";
import CareerDetailPage from "./pages/CareerDetailPage";
import GovernmentJobsPage from "./pages/GovernmentJobsPage";
import ScholarshipsPage from "./pages/ScholarshipsPage";
import CoursesPage from "./pages/CoursesPage";
import CareerQuizPage from "./pages/CareerQuizPage";
import AuthPage from "./pages/AuthPage";
import FavoritesHub from "./pages/FavoritesHub";
import FavoriteCareersPage from "./pages/FavoriteCareersPage";
import FavoriteCoursesPage from "./pages/FavoriteCoursesPage";
import ContactPage from "./pages/ContactPage";
import ParentDashboardPage from "./pages/ParentDashboardPage";
import CollegeFinderPage from "./pages/CollegeFinderPage";
import CollegeDetailPage from "./pages/CollegeDetailPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import ExploreExperiencePage from "./pages/ExploreExperiencePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import QuizResultsPage from "./pages/QuizResultsPage";
import NotificationsPage from "./pages/NotificationsPage";
import AuthCallback from "./pages/AuthCallback";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  // Hide ChatBot on public routes and when no user
  const publicRoutes = ["/", "/auth/callback"];
  if (publicRoutes.includes(location.pathname)) return null;
  if (!user) return null;
  return <>{children}</>;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Route - Login Page */}
              <Route path="/" element={<AuthPage />} />
              
              {/* OAuth Callback - public route to complete provider login */}
              <Route path="/auth/callback" element={<AuthCallback />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/careers" element={<ProtectedRoute><CareersPage /></ProtectedRoute>} />
              <Route path="/careers/:id" element={<ProtectedRoute><CareerDetailPage /></ProtectedRoute>} />
              <Route path="/government-jobs" element={<ProtectedRoute><GovernmentJobsPage /></ProtectedRoute>} />
              <Route path="/scholarships" element={<ProtectedRoute><ScholarshipsPage /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><CareerQuizPage /></ProtectedRoute>} />
              <Route path="/career-quiz" element={<ProtectedRoute><CareerQuizPage /></ProtectedRoute>} />
              
              <Route path="/favorites" element={<ProtectedRoute><FavoritesHub /></ProtectedRoute>} />
              <Route path="/favorites/careers" element={<ProtectedRoute><FavoriteCareersPage /></ProtectedRoute>} />
              <Route path="/favorites/courses" element={<ProtectedRoute><FavoriteCoursesPage /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
              <Route path="/parent-dashboard" element={<ProtectedRoute><ParentDashboardPage /></ProtectedRoute>} />
              <Route path="/colleges" element={<ProtectedRoute><CollegeFinderPage /></ProtectedRoute>} />
              <Route path="/colleges/:id" element={<ProtectedRoute><CollegeDetailPage /></ProtectedRoute>} />
              <Route path="/mental-health" element={<ProtectedRoute><MentalHealthPage /></ProtectedRoute>} />
              <Route path="/explore" element={<ProtectedRoute><ExploreExperiencePage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/quiz-results" element={<ProtectedRoute><QuizResultsPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              
                                                                                                                
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* Only show ChatBot after login (i.e., not on the public Auth page) */}
            {/* We conditionally render ChatBot by checking current route and auth state via a lightweight wrapper */}
            <AuthGate>
              <ChatBot />
            </AuthGate>
            <ExitIntentFeedback />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
