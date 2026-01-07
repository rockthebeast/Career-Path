import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface Article {
  id: string;
  title: string;
  emoji: string;
  whyNormal: string;
  commonThoughts: string[];
  reassurance: string;
  practicalSteps: string[];
  closingMessage: string;
}

const articles: Article[] = [
  {
    id: "failure",
    title: "What if I fail?",
    emoji: "💭",
    whyNormal: "Fear of failure is one of the most common feelings among students. Almost every student, even toppers, worry about this. It's your mind's way of showing that you care about your future.",
    commonThoughts: [
      "What will my parents say?",
      "My friends will laugh at me",
      "My life will be ruined",
      "I'm not smart enough"
    ],
    reassurance: "Failure is not the end — it's a redirection. Many successful people failed multiple times before finding their path. APJ Abdul Kalam failed to become a pilot. Amitabh Bachchan was rejected by AIR. Your one exam result does not define your entire life or your worth as a person.",
    practicalSteps: [
      "Focus on what you CAN control — your effort today",
      "Break your study into small, manageable tasks",
      "Talk to someone you trust about your fears",
      "Remember: there are always multiple paths to success"
    ],
    closingMessage: "You are more than your marks. One exam is just one chapter in a very long book of your life. Keep going! 🌟"
  },
  {
    id: "comparison",
    title: "Everyone else seems better than me",
    emoji: "🤔",
    whyNormal: "Comparing ourselves to others is natural, especially when everyone around you is talking about marks and achievements. But remember, you're seeing their outside, not their inside struggles.",
    commonThoughts: [
      "My friend studies less but scores more",
      "Everyone knows what they want except me",
      "I'm the only one struggling",
      "Social media shows everyone doing better"
    ],
    reassurance: "Every student has their own pace and their own strengths. The friend who tops in Math might struggle with something else. You are not in a race with anyone — your only competition is with who you were yesterday.",
    practicalSteps: [
      "Limit time on social media during exams",
      "Write down 3 things YOU are good at",
      "Focus on your improvement, not others' scores",
      "Celebrate small wins — even finishing one chapter"
    ],
    closingMessage: "Your journey is unique. Don't compare your Chapter 1 to someone else's Chapter 20. You are exactly where you need to be. 💪"
  },
  {
    id: "parents",
    title: "My parents expect too much from me",
    emoji: "🏠",
    whyNormal: "Feeling pressure from parents is very common in Indian families. Parents often express love through expectations. It can feel heavy, but usually comes from their desire to see you succeed.",
    commonThoughts: [
      "I can never meet their expectations",
      "They compare me to my cousin/neighbour",
      "They won't love me if I fail",
      "I'm letting my family down"
    ],
    reassurance: "Your parents' expectations come from love, even if it doesn't always feel that way. But your mental peace matters too. Most parents, when they understand your feelings, will support you. They want you to be happy, not just successful.",
    practicalSteps: [
      "Try having a calm conversation about how you feel",
      "Write a letter if talking feels hard",
      "Show them your effort, not just results",
      "Ask a trusted relative to help explain your perspective"
    ],
    closingMessage: "You are doing your best, and that is enough. Your parents' love for you is not dependent on your marks. They will always be there for you. 💚"
  },
  {
    id: "confusion",
    title: "I don't know what I want to do",
    emoji: "🧭",
    whyNormal: "Not knowing your career path at 15-18 is completely normal! Most adults changed their career paths multiple times. You're not supposed to have everything figured out right now.",
    commonThoughts: [
      "Everyone knows their goal except me",
      "What if I choose the wrong stream?",
      "I have no special talent",
      "Time is running out"
    ],
    reassurance: "Career clarity often comes with experience, not just thinking. Many successful people discovered their passion in their 20s or even 30s. Right now, focus on exploring your interests and building basic skills.",
    practicalSteps: [
      "Try different activities — sports, arts, coding, writing",
      "Talk to people in different careers",
      "Take the career quiz on this portal",
      "Choose based on interest, not just salary or status"
    ],
    closingMessage: "It's okay to not have all the answers. Life is not a straight line — it's an adventure with many beautiful turns. Explore and enjoy! 🌈"
  },
  {
    id: "marks",
    title: "Marks don't define your future",
    emoji: "📝",
    whyNormal: "In our education system, marks feel like everything. But the truth is, they are just one measure of one type of intelligence. There are many ways to be smart and successful.",
    commonThoughts: [
      "Low marks = bad future",
      "Only toppers succeed in life",
      "I'm not good at studies so I'm not good at anything",
      "Marks are the only thing that matters"
    ],
    reassurance: "Many highly successful people were average students. Sachin Tendulkar, Dhirubhai Ambani, Mary Kom — none were academic toppers. Skills like creativity, communication, hard work, and kindness matter just as much, often more.",
    practicalSteps: [
      "Identify your non-academic strengths",
      "Explore skill-based courses (ITI, vocational training)",
      "Focus on learning concepts, not just memorizing",
      "Build practical skills alongside studies"
    ],
    closingMessage: "Your marks are just a number. Your character, your effort, and your kindness make you who you are. The world needs all kinds of people — including YOU! ⭐"
  }
];

export function StressArticles() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Understanding Your Feelings</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Click on any topic to read more. Remember, these feelings are normal.
        </p>
      </div>

      <div className="grid gap-3">
        {articles.map((article) => (
          <Card 
            key={article.id} 
            className={`transition-all duration-300 border-border/50 ${
              expandedArticle === article.id 
                ? 'bg-accent/30 shadow-md' 
                : 'hover:bg-accent/20'
            }`}
          >
            <CardHeader 
              className="cursor-pointer py-4"
              onClick={() => toggleArticle(article.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{article.emoji}</span>
                  <CardTitle className="text-base font-medium">
                    {article.title}
                  </CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {expandedArticle === article.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedArticle === article.id && (
              <CardContent className="pt-0 pb-5 space-y-4 animate-in fade-in-50 duration-300">
                {/* Why this is normal */}
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Why this feeling is normal</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {article.whyNormal}
                  </p>
                </div>

                {/* Common thoughts */}
                <div>
                  <p className="text-sm font-medium mb-2">Many students think:</p>
                  <div className="flex flex-wrap gap-2">
                    {article.commonThoughts.map((thought, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs font-normal py-1"
                      >
                        "{thought}"
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Reassurance */}
                <div className="border-l-4 border-primary/30 pl-4">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    {article.reassurance}
                  </p>
                </div>

                {/* Practical steps */}
                <div>
                  <p className="text-sm font-medium mb-2">Small steps you can take:</p>
                  <ul className="space-y-2">
                    {article.practicalSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Closing message */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/30 rounded-lg p-4 text-center">
                  <Sparkles className="h-4 w-4 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">
                    {article.closingMessage}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
