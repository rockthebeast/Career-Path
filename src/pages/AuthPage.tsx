import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { 
  Eye, 
  EyeOff, 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  Phone,
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
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

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

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

  const switchMode = () => {
    setIsLogin(!isLogin);
    setIsOtpMode(false);
    setIsOtpSent(false);
    setOtpEmail("");
    setOtpToken("");
    setErrors({});
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        setErrors({ general: error.message });
      }
    } catch (err) {
      setErrors({ general: 'Failed to connect to Google. Please try again.' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!otpEmail.trim()) {
      setErrors({ otpEmail: 'Please enter your email address' });
      return;
    }
    
    const emailValidation = z.string().email();
    const result = emailValidation.safeParse(otpEmail.trim());
    if (!result.success) {
      setErrors({ otpEmail: 'Please enter a valid email address' });
      return;
    }

    setIsOtpLoading(true);
    setErrors({});

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: otpEmail.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setErrors({ general: error.message });
      } else {
        setIsOtpSent(true);
      }
    } catch (err) {
      setErrors({ general: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpToken.trim() || otpToken.length !== 6) {
      setErrors({ otpToken: 'Please enter the 6-digit code' });
      return;
    }

    setIsOtpLoading(true);
    setErrors({});

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: otpEmail.trim(),
        token: otpToken.trim(),
        type: 'email',
      });

      if (error) {
        setErrors({ general: error.message });
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setErrors({ general: 'Invalid or expired code. Please try again.' });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const toggleOtpMode = () => {
    setIsOtpMode(!isOtpMode);
    setIsOtpSent(false);
    setOtpEmail("");
    setOtpToken("");
    setErrors({});
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
                  {isOtpMode 
                    ? t('auth.loginWithOTP', 'Login with OTP')
                    : isLogin 
                      ? t('auth.welcomeBack', 'Welcome Back!') 
                      : t('auth.createAccount', 'Create Account')}
                </CardTitle>
                <CardDescription className="text-base">
                  {isOtpMode
                    ? t('auth.otpDescription', 'We will send a one-time code to your email')
                    : isLogin 
                      ? t('auth.loginDescription', 'Login to explore your career path') 
                      : t('auth.signupDescription', 'Join us to discover your perfect career')}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              {/* OTP Mode */}
              {isOtpMode ? (
                <div className="space-y-4">
                  {errors.general && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20 animate-scale-in">
                      {errors.general}
                    </div>
                  )}

                  {!isOtpSent ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otpEmail" className="text-sm font-medium">
                          {t('auth.emailAddress', 'Email Address')}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="otpEmail"
                            type="email"
                            placeholder={t('auth.enterEmail', 'Enter your email')}
                            value={otpEmail}
                            onChange={(e) => {
                              setOtpEmail(e.target.value);
                              if (errors.otpEmail) setErrors(prev => ({ ...prev, otpEmail: "" }));
                            }}
                            className={`pl-11 h-12 text-base ${errors.otpEmail ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                        </div>
                        {errors.otpEmail && (
                          <p className="text-xs text-destructive">{errors.otpEmail}</p>
                        )}
                      </div>

                      <Button 
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity" 
                        disabled={isOtpLoading}
                      >
                        {isOtpLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {t('common.pleaseWait', 'Please wait...')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t('auth.sendOtp', 'Send OTP')}
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="p-3 text-sm text-primary bg-primary/10 rounded-lg border border-primary/20 animate-scale-in">
                        {t('auth.otpSentMessage', 'A 6-digit code has been sent to')} <strong>{otpEmail}</strong>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="otpToken" className="text-sm font-medium">
                          {t('auth.enterOtp', 'Enter OTP Code')}
                        </Label>
                        <Input
                          id="otpToken"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="000000"
                          value={otpToken}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setOtpToken(value);
                            if (errors.otpToken) setErrors(prev => ({ ...prev, otpToken: "" }));
                          }}
                          className={`h-12 text-center text-2xl tracking-widest font-mono ${errors.otpToken ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.otpToken && (
                          <p className="text-xs text-destructive">{errors.otpToken}</p>
                        )}
                      </div>

                      <Button 
                        type="button"
                        onClick={handleVerifyOtp}
                        className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity" 
                        disabled={isOtpLoading}
                      >
                        {isOtpLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {t('auth.verifying', 'Verifying...')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t('auth.verifyAndLogin', 'Verify & Login')}
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        )}
                      </Button>

                      <Button 
                        type="button"
                        variant="ghost"
                        onClick={() => { setIsOtpSent(false); setOtpToken(""); }}
                        className="w-full text-sm"
                      >
                        {t('auth.resendOtp', 'Resend OTP')}
                      </Button>
                    </>
                  )}

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                      {t('auth.or', 'OR')}
                    </span>
                  </div>

                  <Button 
                    type="button"
                    variant="outline"
                    onClick={toggleOtpMode}
                    className="w-full h-12 text-base font-medium"
                  >
                    <Lock className="h-5 w-5 mr-2" />
                    {t('auth.loginWithPassword', 'Login with Password')}
                  </Button>
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

                {/* Divider */}
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                    {t('auth.or', 'OR')}
                  </span>
                </div>

                {/* Social Login Options */}
                <div className="space-y-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading || isSubmitting}
                  >
                    {isGoogleLoading ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    {t('auth.continueWithGoogle', 'Continue with Google')}
                  </Button>

                  {isLogin && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full h-12 text-base font-medium"
                      onClick={toggleOtpMode}
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      {t('auth.loginWithOTP', 'Login with Email OTP')}
                    </Button>
                  )}
                </div>

              </form>
              )}

              {/* Switch Mode */}
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
