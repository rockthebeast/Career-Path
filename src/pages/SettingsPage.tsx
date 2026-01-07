import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from '@/components/BackButton';
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const name = (user as any)?.user_metadata?.name ?? user?.email?.split("@")[0] ?? "User";
  const email = user?.email ?? "";
  const avatarUrl = (user as any)?.user_metadata?.avatar_url ?? null;

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <BackButton className="mb-4" />

        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <section className="bg-card border rounded-lg p-4 mb-4">
          <div className="flex items-center gap-4">
            <Avatar>
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : <AvatarFallback>{(name || "U")[0]}</AvatarFallback>}
            </Avatar>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-muted-foreground">{email}</div>
            </div>
          </div>
        </section>

        <section className="bg-card border rounded-lg p-4">
          <h2 className="font-medium mb-2">Account</h2>
          <p className="text-sm text-muted-foreground mb-4">Manage your account information and preferences.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button className="btn btn-outline w-full py-2 rounded">Change display name</button>
            <button className="btn btn-outline w-full py-2 rounded">Change password</button>
            <button className="btn btn-outline w-full py-2 rounded">Manage connected accounts</button>
            <button className="btn btn-destructive w-full py-2 rounded">Delete account</button>
          </div>
        </section>
      </div>
    </div>
  );
}
