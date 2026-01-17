import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { 
  Eye, 
  EyeOff, 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  Loader2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
// ThemeToggle and LanguageSwitcher removed from global header — available in profile menu only

// Validation schemas
const loginSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { user, signUp, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // Surface OAuth error from callback if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get('error');
    if (err) {
      setErrors({ general: err });
      // Clean the URL
      navigate('/', { replace: true });
    }
  }, [location.search, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse({ email: formData.email, password: formData.password });
      } else {
        registerSchema.parse(formData);
      }
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setErrors({ general: error.message });
        } else {
          // Record login history
          const { data: { user } } = await supabase.auth.getUser();
          if (user && user.email) {
            await supabase.from('user_logins').insert({
              user_id: user.id,
              email: user.email,
            });
          }
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          setErrors({ general: error.message });
        } else {
          navigate("/dashboard");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.email || !z.string().email().safeParse(formData.email).success) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/settings`,
      });

      if (error) {
        setErrors({ general: error.message });
      } else {
        setResetEmailSent(true);
      }
    } catch (err) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setResetEmailSent(false);
    setErrors({});
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex justify-center items-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{t('common.loading', 'Loading...')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">
            CareerPath
          </span>
        </div>
        <div className="flex items-center gap-2">
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-2">
              <div className="mx-auto p-4 rounded-2xl bg-gradient-primary shadow-glow w-fit">
                <GraduationCap className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl md:text-3xl">
                  {isForgotPassword
                    ? "Reset Password"
                    : isLogin 
                      ? t('auth.welcomeBack', 'Welcome Back!') 
                      : t('auth.createAccount', 'Create Account')}
                </CardTitle>
                <CardDescription className="text-base">
                  {isForgotPassword
                    ? "Enter your email to receive a password reset link"
                    : isLogin 
                      ? t('auth.loginDescription', 'Login to explore your career path') 
                      : t('auth.signupDescription', 'Join us to discover your perfect career')}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              {isForgotPassword ? (
                <div className="space-y-4">
                  {resetEmailSent ? (
                    <div className="space-y-4 animate-scale-in">
                      <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
                        Check your email for the password reset link.
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setIsForgotPassword(false);
                          setResetEmailSent(false);
                        }}
                      >
                        Back to Login
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-4 animate-slide-up">
                      {errors.general && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20 animate-scale-in">
                          {errors.general}
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`pl-11 h-12 text-base ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                        </div>
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {t('common.pleaseWait', 'Please wait...')}
                          </span>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                      <Button 
                        type="button"
                        variant="ghost" 
                        className="w-full"
                        onClick={() => setIsForgotPassword(false)}
                      >
                        Back to Login
                      </Button>
                    </form>
                  )}
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20 animate-scale-in">
                    {errors.general}
                  </div>
                )}

                {/* Name Field (Registration only) */}
                {!isLogin && (
                  <div className="space-y-2 animate-slide-up">
                    <Label htmlFor="name" className="text-sm font-medium">
                      {t('auth.fullName', 'Full Name')}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('auth.enterName', 'Enter your name')}
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`pl-11 h-12 text-base ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </div>
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('auth.emailOrMobile', 'Email Address')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.enterEmail', 'Enter your email')}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-11 h-12 text-base ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {t('auth.password', 'Password')}
                    </Label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      >
                        {t('auth.forgotPassword', 'Forgot Password?')}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.enterPassword', 'Enter your password')}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pl-11 pr-11 h-12 text-base ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="text-xs text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password (Registration only) */}
                {!isLogin && (
                  <div className="space-y-2 animate-slide-up">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      {t('auth.confirmPassword', 'Confirm Password')}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t('auth.confirmYourPassword', 'Confirm your password')}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`pl-11 pr-11 h-12 text-base ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirm-password-error" className="text-xs text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Remember Me (Login only) */}
                {isLogin && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      {t('auth.rememberMe', 'Remember me')}
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t('common.pleaseWait', 'Please wait...')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {isLogin ? t('auth.login', 'Login') : t('auth.createAccount', 'Create Account')}
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
              )}

              {/* Switch Mode */}
              {!isForgotPassword && (
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  {isLogin ? t('auth.noAccount', "Don't have an account? ") : t('auth.haveAccount', "Already have an account? ")}
                </span>
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-primary font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  {isLogin ? t('auth.signUp', 'Sign Up') : t('auth.login', 'Login')}
                </button>
              </div>
              )}
            </CardContent>
          </Card>

          {/* Trust Message */}
          <p className="text-center text-sm text-muted-foreground mt-6 px-4">
            {t('auth.trustMessage', 'Your data is safe with us. We never share your information.')}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        <p>© 2024 CareerPath. {t('auth.allRightsReserved', 'All rights reserved.')}</p>
      </footer>
    </div>
  );
}
