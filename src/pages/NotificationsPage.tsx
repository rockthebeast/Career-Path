import React from 'react';
import { Layout } from '@/components/Layout';
import BackButton from '@/components/BackButton';

export default function NotificationsPage() {
  return (
    <Layout>
      <div className="container py-8">
        <BackButton className="mb-4" />
        <div className="max-w-3xl mx-auto bg-card border rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
          <p className="text-muted-foreground">No notifications yet. This space will show updates about jobs, scholarships and courses.</p>
        </div>
      </div>
    </Layout>
  );
}
