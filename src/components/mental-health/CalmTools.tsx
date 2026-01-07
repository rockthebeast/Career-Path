import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wind, Eye, Sparkles, PenLine, Play, Pause, RotateCcw, Check } from "lucide-react";

export function CalmTools() {
  return (
    <div className="space-y-4">
      <BreathingExercise />
      <GroundingTechnique />
      <DailyAffirmations />
      <WorryBox />
    </div>
  );
}

function BreathingExercise() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [counter, setCounter] = useState(4);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phases = {
    inhale: { duration: 4, next: "hold" as const, label: "Breathe In", emoji: "🌬️" },
    hold: { duration: 4, next: "exhale" as const, label: "Hold", emoji: "⏸️" },
    exhale: { duration: 4, next: "inhale" as const, label: "Breathe Out", emoji: "💨" }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            const currentPhase = phases[phase];
            if (phase === "exhale") {
              setCycles((c) => c + 1);
            }
            setPhase(currentPhase.next);
            return phases[currentPhase.next].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, phase]);

  const reset = () => {
    setIsRunning(false);
    setPhase("inhale");
    setCounter(4);
    setCycles(0);
  };

  const circleSize = phase === "inhale" ? "scale-110" : phase === "exhale" ? "scale-90" : "scale-100";

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">1-Minute Breathing</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center py-4">
          <div 
            className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/40 flex items-center justify-center transition-transform duration-1000 ease-in-out ${circleSize}`}
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{counter}</p>
              <p className="text-xs text-muted-foreground">{phases[phase].label}</p>
            </div>
          </div>
          
          <p className="text-4xl mt-4">{phases[phase].emoji}</p>
          
          {cycles > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Cycles completed: {cycles}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => setIsRunning(!isRunning)} 
            className="flex-1"
            variant={isRunning ? "secondary" : "default"}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Just 3-5 cycles can help calm your mind
        </p>
      </CardContent>
    </Card>
  );
}

function GroundingTechnique() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const steps = [
    { count: 5, sense: "things you can SEE", emoji: "👀", examples: "desk, wall, tree, phone, book" },
    { count: 4, sense: "things you can TOUCH", emoji: "✋", examples: "clothes, chair, hair, table" },
    { count: 3, sense: "things you can HEAR", emoji: "👂", examples: "fan, birds, traffic, breathing" },
    { count: 2, sense: "things you can SMELL", emoji: "👃", examples: "air, food, perfume" },
    { count: 1, sense: "thing you can TASTE", emoji: "👅", examples: "tea, water, toothpaste" }
  ];

  const handleNext = () => {
    if (!completed.includes(step)) {
      setCompleted([...completed, step]);
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setCompleted([]);
  };

  const isComplete = completed.length === steps.length;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">5-4-3-2-1 Grounding</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          This technique helps when you feel anxious or overwhelmed
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress indicators */}
        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                completed.includes(index)
                  ? 'bg-primary'
                  : index === step
                  ? 'bg-primary/50'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {isComplete ? (
          <div className="text-center py-6 space-y-3">
            <div className="text-4xl">🌟</div>
            <p className="font-medium">Great job!</p>
            <p className="text-sm text-muted-foreground">
              You've completed the grounding exercise. Feel more present?
            </p>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Do Again
            </Button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <p className="text-4xl">{steps[step].emoji}</p>
            <div>
              <p className="text-2xl font-bold text-primary">{steps[step].count}</p>
              <p className="text-sm font-medium">{steps[step].sense}</p>
              <p className="text-xs text-muted-foreground mt-1">
                e.g., {steps[step].examples}
              </p>
            </div>
            <Button onClick={handleNext} className="w-full">
              <Check className="h-4 w-4 mr-2" />
              Done, Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DailyAffirmations() {
  const affirmations = [
    "I am doing my best, and that is enough.",
    "My worth is not defined by my marks.",
    "It's okay to not have all the answers right now.",
    "I have the strength to face today's challenges.",
    "Every small step counts towards my goals.",
    "I am allowed to take breaks and rest.",
    "My feelings are valid and temporary.",
    "I believe in my ability to learn and grow.",
    "Comparing myself to others doesn't help me.",
    "I am worthy of love and support."
  ];

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * affirmations.length)
  );

  const getNew = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * affirmations.length);
    } while (newIndex === currentIndex);
    setCurrentIndex(newIndex);
  };

  return (
    <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/10">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Daily Affirmation</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-4">
          <p className="text-lg font-medium leading-relaxed italic">
            "{affirmations[currentIndex]}"
          </p>
        </div>
        <Button onClick={getNew} variant="outline" className="w-full" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          New Affirmation
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Say it out loud or write it down 💚
        </p>
      </CardContent>
    </Card>
  );
}

function WorryBox() {
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);

  const handleRelease = () => {
    if (text.trim()) {
      setReleased(true);
      setTimeout(() => {
        setText("");
        setReleased(false);
      }, 3000);
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Write Your Worries</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          This is private and NOT saved anywhere. Just let it out.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {released ? (
          <div className="text-center py-8 space-y-2 animate-in fade-in-50">
            <p className="text-4xl">🎈</p>
            <p className="font-medium">Released!</p>
            <p className="text-sm text-muted-foreground">
              Your worries are floating away...
            </p>
          </div>
        ) : (
          <>
            <Textarea
              placeholder="Write anything that's worrying you right now. No one will see this..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <Button 
              onClick={handleRelease} 
              disabled={!text.trim()}
              className="w-full"
              variant="secondary"
            >
              Release & Let Go 🎈
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
