import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, RotateCcw, Heart, Sun, Wind } from "lucide-react";

interface Question {
  id: number;
  text: string;
  category: "stress" | "confidence" | "support";
}

const questions: Question[] = [
  { id: 1, text: "I feel calm when I think about my future", category: "stress" },
  { id: 2, text: "I can talk openly to my parents about my feelings", category: "support" },
  { id: 3, text: "I believe I can achieve my goals", category: "confidence" },
  { id: 4, text: "I worry about disappointing others", category: "stress" },
  { id: 5, text: "I have at least one person I can share my worries with", category: "support" },
  { id: 6, text: "I feel good about my abilities", category: "confidence" },
  { id: 7, text: "I can sleep well without worrying about exams", category: "stress" },
  { id: 8, text: "I know it's okay to make mistakes", category: "confidence" },
  { id: 9, text: "I compare myself to others often", category: "stress" },
  { id: 10, text: "I take breaks and do things I enjoy", category: "support" }
];

const responseOptions = [
  { value: 1, label: "Not at all", emoji: "😔" },
  { value: 2, label: "A little", emoji: "😕" },
  { value: 3, label: "Sometimes", emoji: "😐" },
  { value: 4, label: "Often", emoji: "🙂" },
  { value: 5, label: "Always", emoji: "😊" }
];

// Questions where higher score means more stress (reverse scored)
const reverseScored = [4, 9];

interface Result {
  category: string;
  message: string;
  tips: string[];
  icon: React.ReactNode;
}

export function SelfAssessment() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleResponse = (value: number) => {
    const newResponses = { ...responses, [questions[currentQuestion].id]: value };
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setResponses({});
    setShowResults(false);
  };

  const calculateResults = (): Result[] => {
    const results: Result[] = [];
    
    // Calculate stress score (lower is better after reversing)
    const stressQuestions = questions.filter(q => q.category === "stress");
    let stressScore = 0;
    stressQuestions.forEach(q => {
      const response = responses[q.id] || 3;
      stressScore += reverseScored.includes(q.id) ? (6 - response) : response;
    });
    const avgStress = stressScore / stressQuestions.length;

    // Calculate confidence score
    const confidenceQuestions = questions.filter(q => q.category === "confidence");
    let confidenceScore = 0;
    confidenceQuestions.forEach(q => {
      confidenceScore += responses[q.id] || 3;
    });
    const avgConfidence = confidenceScore / confidenceQuestions.length;

    // Calculate support score
    const supportQuestions = questions.filter(q => q.category === "support");
    let supportScore = 0;
    supportQuestions.forEach(q => {
      supportScore += responses[q.id] || 3;
    });
    const avgSupport = supportScore / supportQuestions.length;

    // Generate results based on scores
    if (avgStress < 2.5) {
      results.push({
        category: "Managing Stress",
        message: "You may be feeling a bit overwhelmed right now. That's okay — many students feel this way. Taking small steps can help.",
        tips: [
          "Try the breathing exercise in the Calm Tools section",
          "Talk to someone you trust about how you're feeling",
          "Focus on one day at a time"
        ],
        icon: <Wind className="h-5 w-5" />
      });
    } else if (avgStress < 3.5) {
      results.push({
        category: "Managing Stress",
        message: "You seem to be handling stress reasonably well, though some worries are natural. Keep taking care of yourself.",
        tips: [
          "Continue doing activities that relax you",
          "Don't hesitate to ask for help when needed",
          "Celebrate your small victories"
        ],
        icon: <Wind className="h-5 w-5" />
      });
    } else {
      results.push({
        category: "Managing Stress",
        message: "You appear to be managing stress well! Keep up the positive habits you've developed.",
        tips: [
          "Share your coping strategies with friends who might need them",
          "Maintain your healthy routines",
          "Stay connected with your support system"
        ],
        icon: <Wind className="h-5 w-5" />
      });
    }

    if (avgConfidence < 3) {
      results.push({
        category: "Building Confidence",
        message: "Your confidence might need a little boost. Remember, everyone has unique strengths — including you!",
        tips: [
          "Write down 3 things you're good at every morning",
          "Read the article 'Marks don't define your future'",
          "Try new activities to discover hidden talents"
        ],
        icon: <Sun className="h-5 w-5" />
      });
    } else {
      results.push({
        category: "Building Confidence",
        message: "You have a healthy level of self-belief. This will help you face challenges with courage.",
        tips: [
          "Use your confidence to help others who might be struggling",
          "Set realistic goals and work towards them",
          "Keep learning and growing"
        ],
        icon: <Sun className="h-5 w-5" />
      });
    }

    if (avgSupport < 3) {
      results.push({
        category: "Support System",
        message: "It seems like you might benefit from having more people to talk to. Building connections can really help.",
        tips: [
          "Consider opening up to a teacher or relative you trust",
          "Join a study group or activity club",
          "Check the 'When to Seek Help' section for resources"
        ],
        icon: <Heart className="h-5 w-5" />
      });
    } else {
      results.push({
        category: "Support System",
        message: "You have good support around you. Lean on these connections when times get tough.",
        tips: [
          "Express gratitude to those who support you",
          "Be there for others who might need support",
          "Keep nurturing these important relationships"
        ],
        icon: <Heart className="h-5 w-5" />
      });
    }

    return results;
  };

  if (!started) {
    return (
      <Card className="border-border/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <ClipboardCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Stress & Confidence Check</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a simple self-reflection tool to help you understand how you're feeling. 
            It takes about 2 minutes and is completely private.
          </p>
          <div className="bg-accent/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              ⚠️ This is NOT a medical or psychological test. It's just a way to reflect on your feelings.
            </p>
          </div>
          <Button onClick={() => setStarted(true)} className="w-full">
            Start Reflection
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const results = calculateResults();
    
    return (
      <Card className="border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Your Reflection Summary</CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your responses, here are some gentle insights
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="bg-accent/20 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                  {result.icon}
                </div>
                <h4 className="font-medium text-sm">{result.category}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.message}
              </p>
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Suggestions:</p>
                {result.tips.map((tip, tipIndex) => (
                  <p key={tipIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">→</span>
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-primary/10 to-accent/30 rounded-lg p-4 text-center">
            <p className="text-sm font-medium mb-1">Remember</p>
            <p className="text-xs text-muted-foreground">
              It's okay to not feel okay. These feelings are temporary, and you have the strength to get through this. 💚
            </p>
          </div>

          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Take Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <Button variant="ghost" size="sm" onClick={reset} className="text-xs h-7">
            Start Over
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-4">
          <p className="text-base font-medium leading-relaxed">
            {questions[currentQuestion].text}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {responseOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleResponse(option.value)}
              className={`flex flex-col items-center p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-accent/30 transition-all ${
                responses[questions[currentQuestion].id] === option.value
                  ? 'border-primary bg-primary/10'
                  : ''
              }`}
            >
              <span className="text-2xl mb-1">{option.emoji}</span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
