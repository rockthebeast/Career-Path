import React, { useState, ChangeEvent } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import BackButton from '@/components/BackButton';
import { User, Mail, BookOpen, Key, Save, X, Camera } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const meta = (user as any)?.user_metadata ?? {};
  const [name, setName] = useState<string>(meta.name ?? user?.email?.split('@')[0] ?? '');
  const [email] = useState<string>(user?.email ?? '');
  const [education, setEducation] = useState<string>(meta.education ?? '');
  const [stream, setStream] = useState<string>(meta.stream ?? '');
  const [interests, setInterests] = useState<string>((meta.interests ?? []).join?.(', ') ?? (meta.interests ?? ''));
  const [avatarPreview, setAvatarPreview] = useState<string | null>((meta.avatar_url as string) ?? null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(String(reader.result));
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      // Prepare metadata
      const updatedMeta: Record<string, any> = {
        name,
        education,
        stream,
        interests: interests.split(',').map(s => s.trim()).filter(Boolean),
        language: i18n.language,
      };

      if (avatarPreview) {
        updatedMeta.avatar_url = avatarPreview;
      }

      // Update Supabase auth user metadata
      const { error } = await supabase.auth.updateUser({ data: updatedMeta });
      if (error) throw error;

      // Optionally update profiles table if present
      await supabase.from('profiles').upsert({ user_id: user?.id, email, name });

      toast({ title: t('profile.saved', 'Profile saved'), description: t('profile.savedDesc', 'Your profile was updated successfully.') });
    } catch (err: any) {
      toast({ title: t('profile.saveFailed', 'Save failed'), description: err.message || String(err), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({ title: t('profile.passwordError', 'Password must be at least 6 characters'), variant: 'destructive' });
      return;
    }

    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: t('profile.passwordChanged', 'Password changed'), description: t('profile.passwordChangedDesc', 'Your password was updated.') });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      toast({ title: t('profile.passwordChangeFailed', 'Change failed'), description: err.message || String(err), variant: 'destructive' });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <BackButton className="mb-6" />

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Avatar & quick info */}
          <Card className="order-1 lg:order-1">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-1 ring-primary/10 bg-muted flex items-center justify-center transition-transform hover:scale-105">
                    {avatarPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={avatarPreview} alt={name} className="object-cover w-full h-full" />
                    ) : (
                      <Avatar>
                        <AvatarFallback className="text-xl">{(name || 'U')[0]}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>

                  <label className="absolute -bottom-2 -right-2">
                    <div className="bg-white border rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-primary" />
                    </div>
                    <input type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
                  </label>
                </div>

                <h2 className="mt-4 text-lg font-semibold">{name}</h2>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Profile Info & Security */}
          <div className="lg:col-span-2 order-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">{t('profile.sectionProfile','Profile Information')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> {t('profile.name', 'Full name')}</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {t('profile.email', 'Email')}</Label>
                    <Input value={email} disabled className="mt-1" />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-muted-foreground" /> {t('profile.education', 'Education level')}</Label>
                    <select className="w-full rounded-md border p-2 mt-1" value={education} onChange={(e) => setEducation(e.target.value)}>
                      <option value="">--</option>
                      <option value="highschool">{t('education.highschool','High School')}</option>
                      <option value="puc">{t('education.puc','PUC / Class 11–12')}</option>
                      <option value="bachelors">{t('education.bachelors','Bachelors')}</option>
                      <option value="masters">{t('education.masters','Masters')}</option>
                      <option value="other">{t('education.other','Other')}</option>
                    </select>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">{t('profile.stream', 'Stream')}</Label>
                    <Input value={stream} onChange={(e) => setStream(e.target.value)} placeholder={t('profile.streamPlaceholder','e.g., Science')} className="mt-1" />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="flex items-center gap-2">{t('profile.interests', 'Career interests')}</Label>
                    <Input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder={t('profile.interestsPlaceholder','Comma separated (e.g., Design, Tech)')} className="mt-1" />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">{t('profile.language', 'Language')}</Label>
                    <select className="w-full rounded-md border p-2 mt-1" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
                      <option value="en">English</option>
                      <option value="hi">हिंदी</option>
                      <option value="kn">ಕನ್ನಡ</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={saveProfile} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" /> {saving ? t('common.saving','Saving...') : t('profile.save','Save changes')}
                  </Button>
                  <Button variant="ghost" onClick={() => { setName(meta.name ?? ''); setEducation(meta.education ?? ''); setStream(meta.stream ?? ''); setInterests((meta.interests ?? []).join?.(', ') ?? ''); i18n.changeLanguage(meta.language || 'en'); setAvatarPreview((meta.avatar_url as string) ?? null); }}>
                    <X className="h-4 w-4 mr-2" /> {t('common.cancel','Cancel')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">{t('profile.sectionSecurity','Security')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="flex items-center gap-2"><Key className="h-4 w-4 text-muted-foreground" /> {t('profile.currentPassword','Current password')}</Label>
                    <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">{t('profile.newPassword','New password')}</Label>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={changePassword} disabled={changingPassword}>
                    <Save className="h-4 w-4 mr-2" /> {changingPassword ? t('common.saving','Saving...') : t('profile.changePassword','Update password')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
