import { useState, useEffect, useCallback } from 'react';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFeedback } from '@/hooks/useFeedback';
import { cn } from '@/lib/utils';

const SESSION_KEY = 'exit_feedback_shown';

export function ExitIntentFeedback() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [liked, setLiked] = useState('');
  const [improvements, setImprovements] = useState('');
  const { submitFeedback } = useFeedback();

  const hasShownThisSession = useCallback(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }, []);

  const markAsShown = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'true');
  }, []);

  useEffect(() => {
    if (hasShownThisSession()) return;

    // Delay enabling listeners to prevent triggering on page load or right after login
    const timeoutId = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        // Only trigger when mouse moves toward top of viewport (exit intent)
        if (e.clientY <= 0 && !hasShownThisSession()) {
          setOpen(true);
          markAsShown();
        }
      };

      const handleVisibilityChange = () => {
        // Trigger on tab switch (when page becomes hidden)
        if (document.hidden && !hasShownThisSession()) {
          setOpen(true);
          markAsShown();
        }
      };

      const handleBeforeUnload = () => {
        // Trigger on close or back navigation
        if (!hasShownThisSession()) {
          setOpen(true);
          markAsShown();
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, 5000); // 5-second delay

    return () => clearTimeout(timeoutId);
  }, [hasShownThisSession, markAsShown]);

  const handleSubmit = () => {
    if (!improvements.trim() || rating === 0) return;

    submitFeedback.mutate({
      rating,
      feedbackMessage: liked.trim() || 'No specific likes mentioned',
      improvementSuggestions: improvements.trim(),
      pageUrl: window.location.pathname,
    });

    setSubmitted(true);
    setTimeout(() => setOpen(false), 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your feedback helps us improve.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            👉 Before you go, help us improve!
          </DialogTitle>
          <DialogDescription>
            We'd love to hear about your experience and what we can do better.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <Label>How was your experience? *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      'h-7 w-7 transition-colors',
                      (hoverRating || rating) >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground/40'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* What did you like */}
          <div className="space-y-2">
            <Label htmlFor="liked">What did you like about the website?</Label>
            <Textarea
              id="liked"
              placeholder="Share what you enjoyed..."
              value={liked}
              onChange={(e) => setLiked(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          {/* Improvements */}
          <div className="space-y-2">
            <Label htmlFor="improvements">
              What improvements or features would you like to see? *
            </Label>
            <Textarea
              id="improvements"
              placeholder="Tell us how we can do better..."
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              className="resize-none"
              rows={3}
              required
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={handleClose}>
            No Thanks
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!improvements.trim() || rating === 0 || submitFeedback.isPending}
          >
            {submitFeedback.isPending ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
