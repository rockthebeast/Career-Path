import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, Users, GraduationCap, Home, AlertCircle } from "lucide-react";

export function SeekHelp() {
  const supportPeople = [
    {
      icon: <Home className="h-5 w-5" />,
      title: "Parents or Guardian",
      description: "They may not always understand, but most parents want to help. Try starting with 'I've been feeling...'",
      when: "When you need emotional support or guidance"
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Teacher or School Counselor",
      description: "They've helped many students before you. Schools often have trained counselors.",
      when: "When you need academic advice or someone outside family"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Trusted Adult",
      description: "An aunt, uncle, older cousin, or family friend who you feel comfortable with.",
      when: "When you need a different perspective"
    }
  ];

  const helplines = [
    {
      name: "iCall",
      number: "9152987821",
      hours: "Mon-Sat, 8am-10pm",
      description: "Trained counselors for students"
    },
    {
      name: "Vandrevala Foundation",
      number: "1860-2662-345",
      hours: "24/7",
      description: "Free mental health support"
    },
    {
      name: "NIMHANS",
      number: "080-46110007",
      hours: "Mon-Sat, 9am-5pm",
      description: "Government mental health institute"
    }
  ];

  const warningSignsToSeekHelp = [
    "Feeling hopeless for more than 2 weeks",
    "Unable to eat, sleep, or do daily activities",
    "Having thoughts of hurting yourself",
    "Feeling completely alone with no one to talk to",
    "Panic attacks or extreme anxiety regularly"
  ];

  return (
    <div className="space-y-4">
      {/* Main message */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/10">
        <CardContent className="pt-6 text-center space-y-3">
          <Heart className="h-8 w-8 text-primary mx-auto" />
          <h3 className="text-lg font-semibold">
            Asking for Help is a Sign of Strength
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Everyone needs support sometimes. Talking to someone doesn't mean you're weak — 
            it means you're brave enough to take care of yourself.
          </p>
        </CardContent>
      </Card>

      {/* Who to talk to */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Who Can You Talk To?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {supportPeople.map((person, index) => (
            <div 
              key={index}
              className="flex gap-3 p-3 rounded-lg bg-accent/20"
            >
              <div className="p-2 rounded-full bg-primary/10 text-primary h-fit">
                {person.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{person.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {person.description}
                </p>
                <Badge variant="secondary" className="mt-2 text-[10px] font-normal">
                  {person.when}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* When to seek professional help */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <CardTitle className="text-base">When to Seek Professional Help</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            It's important to reach out to a professional if you experience:
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {warningSignsToSeekHelp.map((sign, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Helplines */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Helpline Numbers (India)</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            These are free or low-cost services with trained counselors
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {helplines.map((helpline, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg border border-border/50 space-y-1"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{helpline.name}</h4>
                <Badge variant="secondary" className="text-[10px]">
                  {helpline.hours}
                </Badge>
              </div>
              <a 
                href={`tel:${helpline.number}`}
                className="text-primary font-semibold text-lg hover:underline"
              >
                📞 {helpline.number}
              </a>
              <p className="text-xs text-muted-foreground">
                {helpline.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Important:</strong> This section provides supportive information only. 
          It is NOT a replacement for professional mental health treatment. 
          If you're in crisis, please contact a helpline or go to your nearest hospital.
        </p>
      </div>

      {/* Closing message */}
      <Card className="border-border/50 bg-gradient-to-r from-primary/10 to-accent/30">
        <CardContent className="pt-6 pb-6 text-center space-y-2">
          <p className="text-2xl">💚</p>
          <p className="font-medium">You Are Not Alone</p>
          <p className="text-sm text-muted-foreground">
            Millions of students go through similar feelings. 
            You matter, and things can get better.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
