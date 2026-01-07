import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, FileText, Bell, HelpCircle, Heart, Settings, LogOut, Globe } from 'lucide-react';
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileMenu() {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const name = user?.user_metadata?.name ?? user?.email?.split("@")[0] ?? "User";
  const email = user?.email ?? "";
  const avatarUrl = (user?.user_metadata as any)?.avatar_url ?? null;

  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center justify-center p-0.5 rounded-full ring-1 ring-transparent hover:ring-primary/20 focus:outline-none transform transition-transform hover:scale-105">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted shadow-sm flex items-center justify-center border">
            <Avatar>
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : <AvatarFallback>{initials}</AvatarFallback>}
            </Avatar>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={8}
        align="end"
        className="z-50 w-72 overflow-hidden rounded-xl border bg-card text-foreground shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out"
      >
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-primary/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border">
                <Avatar>
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={name} />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight">{name}</div>
              <div className="text-xs text-muted-foreground truncate">{email}</div>
            </div>
          </div>
        </div>

        <div className="p-2">
          {/* Primary actions */}
          <div className="space-y-1">
            <DropdownMenuItem
              onClick={() => navigate('/dashboard')}
              className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all ${location.pathname === '/dashboard' ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50'}`}
            >
              <User className={`h-4 w-4 ${location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
              <span className="flex-1">{t('profile.dashboard', 'Dashboard')}</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate('/profile')}
              className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all ${location.pathname === '/profile' ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50'}`}
            >
              <User className={`h-4 w-4 ${location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
              <span className="flex-1">{t('profile.myProfile', 'My Profile')}</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate('/favorites')}
              className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all ${location.pathname === '/favorites' ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50'}`}
            >
              <Heart className={`h-4 w-4 ${location.pathname === '/favorites' ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
              <span className="flex-1">{t('profile.favorites', 'My Favorites')}</span>
            </DropdownMenuItem>
          </div>

          <div className="my-2 border-t" />

          {/* Secondary actions */}
          <div className="space-y-1">
            <DropdownMenuItem
              onClick={() => navigate('/quiz-results')}
              className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all ${location.pathname === '/quiz-results' ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50'}`}
            >
              <FileText className={`h-4 w-4 ${location.pathname === '/quiz-results' ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
              <span className="flex-1">{t('profile.quizResults', 'Career Quiz Results')}</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate('/notifications')}
              className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all ${location.pathname === '/notifications' ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50'}`}
            >
              <Bell className={`h-4 w-4 ${location.pathname === '/notifications' ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
              <span className="flex-1">{t('profile.notifications', 'Notifications')}</span>
            </DropdownMenuItem>
          </div>

          {/* Language sub-menu */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="group flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted/50">
              <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="flex-1">{t('profile.language', 'Language')}</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent className="w-44">
              {[ 
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'kn', label: 'ಕನ್ನಡ' },
              ].map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-3 py-2 text-sm transition-all ${i18n.language === lang.code ? 'bg-primary/5 text-primary font-semibold' : 'hover:bg-muted/50'}`}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <div className="my-2 border-t" />

          <div className="space-y-1">
            <DropdownMenuItem
              onClick={() => navigate('/contact')}
              className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all ${location.pathname === '/contact' ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50'}`}
            >
              <HelpCircle className={`h-4 w-4 ${location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
              <span className="flex-1">{t('profile.helpSupport', 'Help & Support')}</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate('/settings')}
              className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all ${location.pathname === '/settings' ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50'}`}
            >
              <Settings className={`h-4 w-4 ${location.pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
              <span className="flex-1">{t('profile.settings', 'Settings')}</span>
            </DropdownMenuItem>
          </div>

          <div className="my-2 border-t" />

          <DropdownMenuItem
            onClick={() => signOut()}
            className="group flex items-center gap-3 px-3 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="h-4 w-4 text-destructive" />
            <span className="flex-1">{t('common.logout', 'Logout')}</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
