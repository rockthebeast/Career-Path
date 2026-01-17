import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, GraduationCap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ProfileMenu from "@/components/ProfileMenu";

const navLinkKeys = [
  { href: "/dashboard", labelKey: "nav.home" },
  { href: "/careers", labelKey: "nav.careers" },
  { href: "/colleges", labelKey: "nav.colleges" },
  { href: "/explore", labelKey: "nav.explore" },
  { href: "/government-jobs", labelKey: "nav.govtJobs" },
  { href: "/scholarships", labelKey: "nav.scholarships" },
  { href: "/courses", labelKey: "nav.freeCourses" },
  { href: "/quiz", labelKey: "nav.careerQuiz" },
  { href: "/mental-health", labelKey: "nav.mentalHealth" },
  { href: "/parent-dashboard", labelKey: "nav.parentDashboard" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg md:text-xl text-slate-900 transition-colors">
            CareerPath
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center flex-nowrap gap-3 md:gap-4 xl:gap-5">
          {navLinkKeys.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`group relative inline-flex items-center justify-center h-10 px-3 md:px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 transform after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-200 ${
                location.pathname === link.href
                  ? "bg-primary/10 text-primary after:scale-x-100"
                  : "text-muted-foreground hover:text-primary hover:-translate-y-0.5 hover:scale-[1.02] hover:after:scale-x-100"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3 pl-4 pr-1">
          {user ? <ProfileMenu /> : null}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-2">
            {navLinkKeys.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`group relative inline-flex items-center px-4 py-3 rounded-lg text-base font-medium whitespace-nowrap transition-all duration-200 transform after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-200 ${
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary after:scale-x-100"
                    : "text-muted-foreground hover:text-primary hover:-translate-y-0.5 hover:scale-[1.02] hover:after:scale-x-100"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            {user && (
              <div className="pt-4 mt-2 border-t">
                <Button variant="outline" className="w-full" onClick={async () => { await signOut(); setIsMenuOpen(false); navigate('/auth'); }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('common.logout', 'Logout')}
                </Button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
