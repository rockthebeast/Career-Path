import { Link } from "react-router-dom";
import { Briefcase, HeartHandshake, Lightbulb, Trophy, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRelatedOpportunities, causeLabels } from "@/data/opportunitiesData";

interface RelatedOpportunitiesProps {
  careerId: string;
  careerTitle: string;
}

export function RelatedOpportunities({ careerId, careerTitle }: RelatedOpportunitiesProps) {
  const related = getRelatedOpportunities(careerId);
  
  const hasOpportunities = 
    related.internships.length > 0 || 
    related.volunteering.length > 0 || 
    related.projects.length > 0 || 
    related.competitions.length > 0;

  if (!hasOpportunities) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Try These Internships & Activities</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Real-world opportunities related to {careerTitle}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Internships */}
        {related.internships.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-sm">Internships</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {related.internships.map((internship) => (
                <div 
                  key={internship.id} 
                  className="p-3 border rounded-lg bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-medium text-sm">{internship.title}</p>
                      <p className="text-xs text-muted-foreground">{internship.organization}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {internship.duration}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {internship.skills.slice(0, 2).map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteering */}
        {related.volunteering.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HeartHandshake className="w-4 h-4 text-pink-600" />
              <h4 className="font-semibold text-sm">Volunteering</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {related.volunteering.map((opp) => (
                <div 
                  key={opp.id} 
                  className="p-3 border rounded-lg bg-pink-50/50 dark:bg-pink-900/10 hover:bg-pink-100/50 dark:hover:bg-pink-900/20 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-medium text-sm">{opp.title}</p>
                      <p className="text-xs text-muted-foreground">{opp.organization}</p>
                    </div>
                    <Badge className="text-xs bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 shrink-0">
                      {causeLabels[opp.cause]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {related.projects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-sm">Project Ideas</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {related.projects.map((project) => (
                <div 
                  key={project.id} 
                  className="p-3 border rounded-lg bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-medium text-sm">{project.title}</p>
                      <p className="text-xs text-muted-foreground">{project.timeRequired}</p>
                    </div>
                    <Badge className={`text-xs shrink-0 ${
                      project.difficulty === "easy" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : project.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                      {project.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competitions */}
        {related.competitions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-purple-600" />
              <h4 className="font-semibold text-sm">Competitions</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {related.competitions.map((competition) => (
                <div 
                  key={competition.id} 
                  className="p-3 border rounded-lg bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-medium text-sm">{competition.title}</p>
                      <p className="text-xs text-muted-foreground">{competition.organizer}</p>
                    </div>
                    <Badge className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 shrink-0">
                      {competition.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="pt-4 border-t">
          <Button asChild variant="outline" className="w-full">
            <Link to="/explore">
              View All Opportunities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
