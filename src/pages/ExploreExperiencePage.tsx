import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  HeartHandshake, 
  Lightbulb, 
  Trophy, 
  Filter, 
  Search,
  Clock,
  Award,
  MapPin,
  ExternalLink,
  Users,
  BookOpen,
  CheckCircle2,
  Shield,
  Bookmark
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  internships, 
  volunteering, 
  schoolProjects, 
  competitions,
  careerInterestOptions,
  causeLabels,
  type Internship,
  type Volunteering,
  type SchoolProject,
  type Competition
} from "@/data/opportunitiesData";

// Internship Card Component
const InternshipCard = ({ internship }: { internship: Internship }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start gap-2">
        <div>
          <CardTitle className="text-lg">{internship.title}</CardTitle>
          <CardDescription className="mt-1">{internship.organization}</CardDescription>
        </div>
        {internship.verified && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 shrink-0">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">{internship.description}</p>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          {internship.duration}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {internship.mode === "online" ? "Online" : internship.mode === "offline" ? "Offline" : "Hybrid"}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-4 h-4" />
          {internship.timeCommitment}
        </div>
        {internship.certificate && (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <Award className="w-4 h-4" />
            Certificate
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {internship.skills.map((skill, idx) => (
          <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {internship.classLevel.map((level, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">Class {level}</Badge>
        ))}
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button asChild className="flex-1">
          <a href={internship.applyLink} target="_blank" rel="noopener noreferrer">
            Apply Now
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Volunteering Card Component
const VolunteeringCard = ({ opportunity }: { opportunity: Volunteering }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-500">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start gap-2">
        <div>
          <Badge className="mb-2 bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300">
            {causeLabels[opportunity.cause]}
          </Badge>
          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
          <CardDescription className="mt-1">{opportunity.organization}</CardDescription>
        </div>
        {opportunity.verified && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 shrink-0">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">{opportunity.description}</p>
      
      <div className="p-3 bg-muted/50 rounded-lg">
        <p className="text-xs font-medium text-muted-foreground mb-1">YOUR ROLE:</p>
        <p className="text-sm">{opportunity.roleDescription}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          {opportunity.timeCommitment}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {opportunity.location}
        </div>
      </div>
      
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">BENEFITS:</p>
        <div className="flex flex-wrap gap-1">
          {opportunity.benefits.map((benefit, idx) => (
            <Badge key={idx} variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {benefit}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button asChild className="flex-1">
          <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer">
            Learn More
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Project Card Component
const ProjectCard = ({ project }: { project: SchoolProject }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start gap-2">
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <Badge className={
          project.difficulty === "easy" 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            : project.difficulty === "medium"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
        }>
          {project.difficulty === "easy" ? "✅ Easy" : project.difficulty === "medium" ? "⚠️ Medium" : "🔥 Hard"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">{project.description}</p>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          {project.timeRequired}
        </div>
        <div className="flex flex-wrap gap-1">
          {project.classLevel.map((level, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">Class {level}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">SKILLS YOU'LL GAIN:</p>
        <div className="flex flex-wrap gap-1">
          {project.skillsGained.map((skill, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">PRESENTATION FORMAT:</p>
        <div className="flex flex-wrap gap-1">
          {project.presentationFormat.map((format, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">{format}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">MATERIALS NEEDED:</p>
        <p className="text-sm text-muted-foreground">{project.materials.join(", ")}</p>
      </div>
      
      <Button variant="outline" className="w-full" size="icon">
        <Bookmark className="w-4 h-4 mr-2" />
        Save for Later
      </Button>
    </CardContent>
  </Card>
);

// Competition Card Component
const CompetitionCard = ({ competition }: { competition: Competition }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start gap-2">
        <div>
          <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            {competition.category === "olympiad" ? "🏅 Olympiad" 
              : competition.category === "coding" ? "💻 Coding"
              : competition.category === "science" ? "🔬 Science"
              : competition.category === "essay" ? "✍️ Essay"
              : competition.category === "quiz" ? "❓ Quiz"
              : "🎯 Competition"}
          </Badge>
          <CardTitle className="text-lg">{competition.title}</CardTitle>
          <CardDescription className="mt-1">{competition.organizer}</CardDescription>
        </div>
        {competition.verified && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 shrink-0">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">{competition.description}</p>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          {competition.registrationDeadline}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {competition.mode === "online" ? "Online" : competition.mode === "offline" ? "Offline" : "Hybrid"}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {competition.eligibility.map((level, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">Class {level}</Badge>
        ))}
        <Badge className={competition.fee === "free" 
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
        }>
          {competition.fee === "free" ? "🆓 Free" : "💰 Low Cost"}
        </Badge>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button asChild className="flex-1">
          <a href={competition.officialLink} target="_blank" rel="noopener noreferrer">
            Register
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function ExploreExperiencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [careerFilter, setCareerFilter] = useState<string>("all");

  // Filter functions
  const filterInternships = (items: Internship[]): Internship[] => {
    return items.filter((item) => {
      const matchesClass = classFilter === "all" || item.classLevel.includes(classFilter as "10th" | "12th");
      const matchesMode = modeFilter === "all" || item.mode === modeFilter;
      const matchesCareer = careerFilter === "all" || item.careerInterests.includes(careerFilter);
      return matchesClass && matchesMode && matchesCareer;
    });
  };

  const filterVolunteering = (items: Volunteering[]): Volunteering[] => {
    return items.filter((item) => {
      const matchesClass = classFilter === "all" || item.classLevel.includes(classFilter as "10th" | "12th");
      const matchesMode = modeFilter === "all" || item.mode === modeFilter;
      const matchesCareer = careerFilter === "all" || item.careerInterests.includes(careerFilter);
      return matchesClass && matchesMode && matchesCareer;
    });
  };

  const filterProjects = (items: SchoolProject[]): SchoolProject[] => {
    return items.filter((item) => {
      const matchesClass = classFilter === "all" || item.classLevel.includes(classFilter as "10th" | "12th");
      const matchesCareer = careerFilter === "all" || item.careerInterests.includes(careerFilter);
      return matchesClass && matchesCareer;
    });
  };

  const filterCompetitions = (items: Competition[]): Competition[] => {
    return items.filter((item) => {
      const matchesClass = classFilter === "all" || item.eligibility.includes(classFilter as "10th" | "12th");
      const matchesMode = modeFilter === "all" || item.mode === modeFilter;
      const matchesCareer = careerFilter === "all" || item.careerInterests.includes(careerFilter);
      return matchesClass && matchesMode && matchesCareer;
    });
  };

  const filteredInternships = filterInternships(internships);
  const filteredVolunteering = filterVolunteering(volunteering);
  const filteredProjects = filterProjects(schoolProjects);
  const filteredCompetitions = filterCompetitions(competitions);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Learn by Doing
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore & Experience</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover internships, volunteering opportunities, projects, and competitions to build your skills and confidence. 
            All opportunities are student-safe and verified.
          </p>
        </div>

        {/* Safety Notice */}
        <Alert className="mb-8 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
          <Shield className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-300">
            <strong>Student Safety First:</strong> All listed opportunities are verified, age-appropriate, and free. 
            We never share your personal data and only list trusted organizations.
          </AlertDescription>
        </Alert>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold">Filter Opportunities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search opportunities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Class Level</label>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="10th">Class 10</SelectItem>
                    <SelectItem value="12th">Class 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Mode</label>
                <Select value={modeFilter} onValueChange={setModeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                    <SelectItem value="offline">Offline Only</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Career Interest</label>
                <Select value={careerFilter} onValueChange={setCareerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Interests</SelectItem>
                    {careerInterestOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="internships" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent">
            <TabsTrigger 
              value="internships" 
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-300 flex items-center gap-2 py-3"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Internships</span>
              <Badge variant="secondary" className="ml-1">{filteredInternships.length}</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="volunteering"
              className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800 dark:data-[state=active]:bg-pink-900/30 dark:data-[state=active]:text-pink-300 flex items-center gap-2 py-3"
            >
              <HeartHandshake className="w-4 h-4" />
              <span className="hidden sm:inline">Volunteering</span>
              <Badge variant="secondary" className="ml-1">{filteredVolunteering.length}</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="projects"
              className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-300 flex items-center gap-2 py-3"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
              <Badge variant="secondary" className="ml-1">{filteredProjects.length}</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="competitions"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300 flex items-center gap-2 py-3"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Competitions</span>
              <Badge variant="secondary" className="ml-1">{filteredCompetitions.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Internships Tab */}
          <TabsContent value="internships" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Online Internships (Student-Safe)</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Virtual internships perfect for students. No experience required, beginner-friendly, and completely free.
            </p>
            {filteredInternships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No internships match your filters. Try adjusting the filters.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Volunteering Tab */}
          <TabsContent value="volunteering" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <HeartHandshake className="w-5 h-5 text-pink-600" />
              <h2 className="text-xl font-semibold">NGO & Volunteering Opportunities</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Give back to society while building confidence and skills. Great for college applications too!
            </p>
            {filteredVolunteering.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVolunteering.map((opportunity) => (
                  <VolunteeringCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <HeartHandshake className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No volunteering opportunities match your filters.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-semibold">School-Level Projects</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Curated project ideas you can do at home or school. Build your skills and create something impressive!
            </p>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No projects match your filters.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Competitions Tab */}
          <TabsContent value="competitions" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold">Competitions & Olympiads</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Test your skills and compete with students across India. Win certificates, scholarships, and recognition!
            </p>
            {filteredCompetitions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No competitions match your filters.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-none">
          <CardContent className="py-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Not sure where to start?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Take our career quiz to discover opportunities that match your interests and skills!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link to="/quiz">Take Career Quiz</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/careers">Explore Careers</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
