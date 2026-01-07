import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, ClipboardCheck, Wind, Phone } from "lucide-react";
import { StressArticles } from "@/components/mental-health/StressArticles";
import { SelfAssessment } from "@/components/mental-health/SelfAssessment";
import { CalmTools } from "@/components/mental-health/CalmTools";
import { SeekHelp } from "@/components/mental-health/SeekHelp";

const MentalHealthPage = () => {
  const [activeTab, setActiveTab] = useState("articles");

  const tabs = [
    { id: "articles", label: "Articles", icon: BookOpen },
    { id: "assessment", label: "Check-In", icon: ClipboardCheck },
    { id: "calm", label: "Calm Tools", icon: Wind },
    { id: "help", label: "Get Help", icon: Phone }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/40 mb-4">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Mental Health & Confidence
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Feeling stressed about exams or confused about your future? 
              You're not alone. Let's work through it together.
            </p>
          </div>

          {/* Reassurance Banner */}
          <Card className="mb-6 border-border/50 bg-gradient-to-r from-primary/5 to-accent/10">
            <CardContent className="py-4 text-center">
              <p className="text-sm font-medium">
                🌟 Remember: It's okay to not be okay sometimes
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                These feelings are normal, and there are ways to feel better
              </p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex flex-col items-center gap-1 py-2 text-xs data-[state=active]:bg-primary/10"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="articles" className="mt-0">
              <StressArticles />
            </TabsContent>

            <TabsContent value="assessment" className="mt-0">
              <SelfAssessment />
            </TabsContent>

            <TabsContent value="calm" className="mt-0">
              <CalmTools />
            </TabsContent>

            <TabsContent value="help" className="mt-0">
              <SeekHelp />
            </TabsContent>
          </Tabs>

          {/* Footer Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              ⚠️ This section is for support and education only. 
              It is not a replacement for professional mental health treatment.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentalHealthPage;
