import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  id: number;
  question: string;
  options: { id: string; text: string; careers: string[] }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your current education level?",
    options: [
      { id: "10th", text: "Completed 10th Standard", careers: ["electrician", "mechanic", "web-developer", "diploma"] },
      { id: "12th-science", text: "12th Science (PCM/PCB)", careers: ["software-engineer", "doctor", "civil-engineer", "data-scientist"] },
      { id: "12th-commerce", text: "12th Commerce", careers: ["chartered-accountant", "bank-po", "business-analyst", "digital-marketing"] },
      { id: "12th-arts", text: "12th Arts/Humanities", careers: ["ias-officer", "lawyer", "teacher", "journalist"] },
    ],
  },
  {
    id: 2,
    question: "What type of work interests you most?",
    options: [
      { id: "technical", text: "Working with computers and technology", careers: ["software-engineer", "web-developer", "data-scientist", "digital-marketing"] },
      { id: "people", text: "Helping and interacting with people", careers: ["doctor", "teacher", "lawyer", "bank-po"] },
      { id: "analytical", text: "Solving problems and analyzing data", careers: ["chartered-accountant", "civil-engineer", "data-scientist", "business-analyst"] },
      { id: "creative", text: "Creative and artistic work", careers: ["digital-marketing", "journalist", "designer", "content-writer"] },
    ],
  },
  {
    id: 3,
    question: "What is your preferred work environment?",
    options: [
      { id: "govt", text: "Government job with job security", careers: ["ias-officer", "bank-po", "teacher", "ssc-jobs", "railways"] },
      { id: "private", text: "Private sector with high growth", careers: ["software-engineer", "data-scientist", "digital-marketing", "chartered-accountant"] },
      { id: "field", text: "Fieldwork and hands-on activities", careers: ["civil-engineer", "electrician", "mechanic", "agriculture"] },
      { id: "flexible", text: "Flexible hours or work from home", careers: ["web-developer", "content-writer", "digital-marketing", "freelancing"] },
    ],
  },
  {
    id: 4,
    question: "Which subject do you enjoy the most?",
    options: [
      { id: "math", text: "Mathematics and Logic", careers: ["software-engineer", "chartered-accountant", "data-scientist", "civil-engineer"] },
      { id: "science", text: "Science (Physics/Chemistry/Biology)", careers: ["doctor", "civil-engineer", "pharmacist", "lab-technician"] },
      { id: "language", text: "Languages and Communication", careers: ["journalist", "lawyer", "teacher", "content-writer"] },
      { id: "social", text: "History, Geography, Civics", careers: ["ias-officer", "teacher", "lawyer", "researcher"] },
    ],
  },
  {
    id: 5,
    question: "What motivates you the most in a career?",
    options: [
      { id: "money", text: "High salary and financial stability", careers: ["software-engineer", "chartered-accountant", "doctor", "data-scientist"] },
      { id: "impact", text: "Making a difference in society", careers: ["ias-officer", "doctor", "teacher", "ngo-worker"] },
      { id: "growth", text: "Career growth and learning", careers: ["software-engineer", "digital-marketing", "business-analyst", "manager"] },
      { id: "balance", text: "Work-life balance", careers: ["teacher", "bank-po", "govt-jobs", "librarian"] },
    ],
  },
];

const careerDetails: Record<string, { title: string; description: string; path: string }> = {
  "software-engineer": {
    title: "Software Engineer",
    description: "Build applications and software systems with excellent pay",
    path: "/careers/software-engineer",
  },
  "doctor": {
    title: "Doctor (MBBS)",
    description: "Serve society by treating and caring for patients",
    path: "/careers/doctor",
  },
  "chartered-accountant": {
    title: "Chartered Accountant",
    description: "Manage finances and taxation for businesses",
    path: "/careers/chartered-accountant",
  },
  "ias-officer": {
    title: "IAS Officer",
    description: "Lead administrative roles in government",
    path: "/careers/ias-officer",
  },
  "bank-po": {
    title: "Bank PO/Clerk",
    description: "Stable government banking career",
    path: "/government-jobs",
  },
  "teacher": {
    title: "School Teacher",
    description: "Shape young minds and contribute to education",
    path: "/careers/teacher",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Promote businesses online with creativity",
    path: "/careers/digital-marketing",
  },
  "web-developer": {
    title: "Web Developer",
    description: "Create websites and web applications",
    path: "/careers/web-developer",
  },
  "data-scientist": {
    title: "Data Scientist",
    description: "Analyze data to drive business decisions",
    path: "/careers",
  },
  "lawyer": {
    title: "Lawyer",
    description: "Represent clients in legal matters",
    path: "/careers/lawyer",
  },
  "civil-engineer": {
    title: "Civil Engineer",
    description: "Design and build infrastructure",
    path: "/careers/civil-engineer",
  },
  "electrician": {
    title: "Electrician (ITI)",
    description: "Skilled trade with good earning potential",
    path: "/careers/electrician",
  },
};

export default function CareerQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (careersForOption: string[]) => {
    const newAnswers = [...answers, ...careersForOption];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getTopCareers = () => {
    const careerCounts: Record<string, number> = {};
    answers.forEach((career) => {
      careerCounts[career] = (careerCounts[career] || 0) + 1;
    });
    
    return Object.entries(careerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([career]) => career)
      .filter((career) => careerDetails[career]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      // Remove the careers added by the previous answer (approximate - take last 3-4)
      const newAnswers = answers.slice(0, -4);
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const topCareers = getTopCareers();
    
    return (
      <Layout>
        <div className="container py-8 md:py-12 max-w-3xl">
          <Card variant="gradient" className="text-center animate-scale-in">
            <CardHeader>
              <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">Your Career Recommendations</CardTitle>
              <CardDescription>Based on your interests and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {topCareers.map((careerId, index) => {
                  const career = careerDetails[careerId];
                  if (!career) return null;
                  
                  return (
                    <Link to={career.path} key={careerId}>
                      <Card 
                        variant="interactive" 
                        className="text-left animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{career.title}</h3>
                            <p className="text-sm text-muted-foreground">{career.description}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-primary" />
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button variant="outline" onClick={resetQuiz}>
                  <RotateCcw className="h-4 w-4" />
                  Take Quiz Again
                </Button>
                <Button asChild>
                  <Link to="/careers">
                    Explore All Careers
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Layout>
      <div className="container py-8 md:py-12 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card variant="elevated" className="animate-scale-in">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl md:text-2xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.careers)}
                className="w-full p-4 text-left rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {option.text}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <div className="mt-6 text-center">
            <Button variant="ghost" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Previous Question
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
