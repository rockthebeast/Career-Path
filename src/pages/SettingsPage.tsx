import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from '@/components/BackButton';
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Link as LinkIcon, Shield, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const meta = (user as any)?.user_metadata ?? {};
  const email = user?.email ?? "";
  const avatarUrl = meta?.avatar_url ?? null;
  const initialName = meta?.name ?? email.split("@")[0] ?? "User";

  const [displayName, setDisplayName] = useState(initialName);
  const [savingName, setSavingName] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  // Preference Toggle (example: enable notifications)
  const initialNotifications = Boolean(meta?.preferences?.enable_notifications);
  const [enableNotifications, setEnableNotifications] = useState<boolean>(initialNotifications);
  const [savingPref, setSavingPref] = useState(false);

  const providers = useMemo(() => {
    const identities = (user as any)?.identities || [];
    // identities entries usually include provider and identity_data
    return identities.map((i: any) => ({ provider: i?.provider || 'unknown', identity: i }));
  }, [user]);

  const saveDisplayName = async () => {
    if (!displayName.trim()) {
      toast({ title: 'Name required', description: 'Please enter a valid display name.', variant: 'destructive' });
      return;
    }
    setSavingName(true);
    try {
      const { error } = await supabase.auth.updateUser({ data: { name: displayName.trim() } });
      if (error) throw error;
      await supabase.from('profiles').upsert({ user_id: user?.id as string, email, name: displayName.trim() });
      toast({ title: 'Display name updated' });
    } catch (err: any) {
      toast({ title: 'Update failed', description: err.message || String(err), variant: 'destructive' });
    } finally {
      setSavingName(false);
    }
  };

  const savePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({ title: 'Invalid password', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: 'Mismatch', description: 'New password and confirmation do not match.', variant: 'destructive' });
      return;
    }

    setSavingPassword(true);
    try {
      // Supabase v2 updateUser password change (current password not required for logged-in session)
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast({ title: 'Password updated' });
    } catch (err: any) {
      toast({ title: 'Password update failed', description: err.message || String(err), variant: 'destructive' });
    } finally {
      setSavingPassword(false);
    }
  };

  const unlinkProvider = async (provider: string) => {
    try {
      // Supabase does not currently support unlinking OAuth identities via client SDK
      // Provide help text to manage from account provider or instruct re-auth
      toast({ title: 'Unlink not available', description: 'Managing linked accounts is limited. Please manage from your provider or contact support.', variant: 'destructive' });
    } catch (err: any) {
      toast({ title: 'Operation failed', description: err.message || String(err), variant: 'destructive' });
    }
  };

  const savePreference = async (next: boolean) => {
    setEnableNotifications(next); // instant UI feedback
    setSavingPref(true);
    try {
      // Merge preferences into metadata
      const newPrefs = { ...(meta?.preferences || {}), enable_notifications: next };
      const { error } = await supabase.auth.updateUser({ data: { preferences: newPrefs } });
      if (error) throw error;
      await supabase.from('profiles').upsert({ user_id: user?.id as string, email, name: (meta?.name || initialName) });
      toast({ title: next ? 'Notifications enabled' : 'Notifications disabled' });
    } catch (err: any) {
      // Revert UI on error
      setEnableNotifications(!next);
      toast({ title: 'Failed to update preference', description: err.message || String(err), variant: 'destructive' });
    } finally {
      setSavingPref(false);
    }
  };

  const confirmDeleteAccount = async () => {
    if (!deletePassword) {
      toast({ title: 'Password required', description: 'Please enter your password to confirm deletion.', variant: 'destructive' });
      return;
    }

    setDeleting(true);
    try {
      // Verify password first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: deletePassword,
      });

      if (signInError) {
        throw new Error('Incorrect password. Please verify and try again.');
      }

      const userId = user?.id as string;

      // Delete user-related rows (client-side needs RLS permissions). Adjust as per RLS policies.
      await Promise.all([
        supabase.from('favorite_careers').delete().eq('user_id', userId),
        supabase.from('favorite_courses').delete().eq('user_id', userId),
        supabase.from('analytics_events').delete().eq('user_id', userId),
        supabase.from('quiz_results').delete().eq('user_id', userId),
        supabase.from('scholarship_subscriptions').delete().eq('user_id', userId),
        supabase.from('profiles').delete().eq('user_id', userId),
      ]);

      await supabase.auth.signOut();
      toast({ title: 'Account deleted', description: 'Your account has been successfully deleted.' });
      navigate('/');
    } catch (err: any) {
      toast({ title: 'Deletion failed', description: err.message || String(err), variant: 'destructive' });
      setDeleting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <BackButton className="mb-4" />

        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <section className="bg-card border rounded-lg p-4 mb-4">
          <div className="flex items-center gap-4">
            <Avatar>
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName} /> : <AvatarFallback>{(displayName || "U")[0]}</AvatarFallback>}
            </Avatar>
            <div>
              <div className="font-medium">{displayName}</div>
              <div className="text-sm text-muted-foreground">{email}</div>
            </div>
          </div>
        </section>

        <section className="bg-card border rounded-lg p-4 mb-4">
          <h2 className="font-medium mb-2">Preferences</h2>
          <div className="flex items-center justify-between gap-4 py-2">
            <div>
              <p className="text-sm font-medium">Enable notifications</p>
              <p className="text-xs text-muted-foreground">Receive alerts and updates in your dashboard.</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={enableNotifications} onCheckedChange={(v) => savePreference(Boolean(v))} disabled={savingPref} />
              <span className="text-xs text-muted-foreground">{enableNotifications ? 'On' : 'Off'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 py-2 mt-2">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark modes instantly.</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </section>

        <section className="bg-card border rounded-lg p-4 mb-4">
          <h2 className="font-medium mb-2">Change display name</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="displayName">Display name</Label>
              <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-1" />
            </div>
            <div className="flex items-end">
              <Button onClick={saveDisplayName} disabled={savingName}>Save</Button>
            </div>
          </div>
        </section>

        <section className="bg-card border rounded-lg p-4 mb-4">
          <h2 className="font-medium mb-2">Change password</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="currentPassword">Current password</Label>
              <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="newPassword">New password</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1" />
            </div>
          </div>
          <div className="mt-3">
            <Button onClick={savePassword} disabled={savingPassword}>Update password</Button>
          </div>
        </section>

        <section className="bg-card border rounded-lg p-4 mb-4">
          <h2 className="font-medium mb-2">Connected accounts</h2>
          {providers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No linked accounts.</p>
          ) : (
            <div className="space-y-2">
              {providers.map((p, idx) => (
                <Card key={idx} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{p.provider}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.provider === 'google' && (
                      <a
                        href="https://myaccount.google.com/permissions"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        Manage at Google <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    <Button variant="outline" size="sm" onClick={() => unlinkProvider(p.provider)}>Unlink</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Shield className="h-3 w-3" /> Some providers cannot be unlinked directly from here due to security restrictions.
          </p>
        </section>

        <section className="bg-card border rounded-lg p-4">
          <h2 className="font-medium mb-2">Danger zone</h2>
          <p className="text-sm text-muted-foreground mb-3">Delete your account and associated data.</p>
          <Button variant="destructive" onClick={() => setShowDeleteModal(true)} disabled={deleting}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete account
          </Button>
        </section>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <Card className="w-full max-w-md p-6 shadow-xl relative animate-in zoom-in-95 border-destructive/20">
              <div className="flex items-center gap-3 mb-4 text-destructive">
                <div className="p-2 bg-destructive/10 rounded-full">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold">Delete Account</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                This action cannot be undone. This will permanently delete your account, profile, favorites, and all associated data.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delete-password">Confirm Password</Label>
                  <Input
                    id="delete-password"
                    type="password"
                    placeholder="Enter your password to confirm"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => { setShowDeleteModal(false); setDeletePassword(""); }} disabled={deleting}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDeleteAccount} disabled={deleting || !deletePassword}>
                    {deleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Account'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
