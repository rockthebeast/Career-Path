import React from 'react';
import { Layout } from '@/components/Layout';
import BackButton from '@/components/BackButton';
import { useQuizResults } from '@/hooks/useQuizResults';
import { Card } from '@/components/ui/card';

export default function QuizResultsPage() {
  const { history } = useQuizResults();

  const results = history.data ?? [];

  return (
    <Layout>
      <div className="container py-8">
        <BackButton className="mb-4" />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Career Quiz Results</h1>

          {results.length === 0 ? (
            <p className="text-muted-foreground">You have no saved quiz results yet. Take the quiz to get recommendations.</p>
          ) : (
            <div className="space-y-4">
              {results.map((r: any) => (
                <Card key={r.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Result — {new Date(r.created_at).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Score: {r.score ?? '—'}</div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {Array.isArray(r.recommended_careers) ? r.recommended_careers.slice(0,3).join(', ') : '—'}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
