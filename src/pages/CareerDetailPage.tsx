import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Clock, BookOpen, GraduationCap, Heart, Briefcase, Building2, Wrench } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useFavoriteCareers } from "@/hooks/useFavoriteCareers";
import { useToast } from "@/hooks/use-toast";
import { careerSkillsData, defaultSkills, CareerSkillCategory } from "@/data/careerSkillsData";
import { RelatedOpportunities } from "@/components/RelatedOpportunities";

// Import careers data (we'll need to export it from CareersPage or create a shared data file)
const careers = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Build applications, websites, and software systems",
    category: "IT & Technology",
    type: "private",
    levels: ["12th-science"],
    salary: "₹4-25 LPA",
    icon: Briefcase,
    skills: ["Programming", "Problem Solving", "Logic"],
    officialLink: "https://www.nasscom.in/",
  },
  {
    id: "doctor",
    title: "Doctor (MBBS)",
    description: "Diagnose and treat patients in hospitals or clinics",
    category: "Medical",
    type: "academic",
    levels: ["12th-science"],
    salary: "₹6-30 LPA",
    icon: GraduationCap,
    skills: ["Biology", "Chemistry", "Patience"],
    officialLink: "https://www.nmc.org.in/",
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    description: "Design and construct buildings, bridges, and infrastructure",
    category: "Engineering",
    type: "private",
    levels: ["12th-science"],
    salary: "₹4-15 LPA",
    icon: Building2,
    skills: ["Mathematics", "Physics", "Design"],
    officialLink: "https://www.aicte-india.org/",
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    description: "Manage finances, auditing, and taxation for businesses",
    category: "Finance",
    type: "private",
    levels: ["12th-commerce"],
    salary: "₹6-25 LPA",
    icon: Briefcase,
    skills: ["Accounting", "Mathematics", "Analysis"],
    officialLink: "https://www.icai.org/",
  },
  {
    id: "bank-po",
    title: "Bank PO/Clerk",
    description: "Work in public sector banks handling customer services",
    category: "Banking",
    type: "government",
    levels: ["12th-commerce", "12th-arts", "12th-science"],
    salary: "₹4-12 LPA",
    icon: Building2,
    skills: ["Mathematics", "Reasoning", "English"],
    officialLink: "https://www.ibps.in/",
  },
  {
    id: "ias-officer",
    title: "IAS Officer",
    description: "Administrative role in government policy and governance",
    category: "Civil Services",
    type: "government",
    levels: ["12th-arts", "12th-science", "12th-commerce"],
    salary: "₹8-20 LPA",
    icon: GraduationCap,
    skills: ["General Knowledge", "Writing", "Leadership"],
    officialLink: "https://www.upsc.gov.in/",
  },
  {
    id: "lawyer",
    title: "Lawyer",
    description: "Represent clients in legal matters and court cases",
    category: "Law",
    type: "academic",
    levels: ["12th-arts", "12th-commerce"],
    salary: "₹3-50 LPA",
    icon: Briefcase,
    skills: ["English", "Reasoning", "Communication"],
    officialLink: "https://www.barcouncilofindia.org/",
  },
  {
    id: "electrician",
    title: "Electrician (ITI)",
    description: "Install and repair electrical systems and wiring",
    category: "Vocational",
    type: "skill-based",
    levels: ["10th"],
    salary: "₹2-6 LPA",
    icon: Wrench,
    skills: ["Technical Skills", "Safety Knowledge", "Problem Solving"],
    officialLink: "https://www.ncvtmis.gov.in/",
  },
  {
    id: "mechanic",
    title: "Auto Mechanic (ITI)",
    description: "Repair and maintain automobiles and vehicles",
    category: "Vocational",
    type: "skill-based",
    levels: ["10th"],
    salary: "₹2-5 LPA",
    icon: Wrench,
    skills: ["Mechanical Skills", "Vehicle Knowledge", "Hands-on Work"],
    officialLink: "https://www.ncvtmis.gov.in/",
  },
  {
    id: "web-developer",
    title: "Web Developer",
    description: "Create and maintain websites and web applications",
    category: "IT & Technology",
    type: "private",
    levels: ["10th", "12th-science", "12th-commerce"],
    salary: "₹3-20 LPA",
    icon: Briefcase,
    skills: ["HTML/CSS", "JavaScript", "Design"],
    officialLink: "https://www.w3schools.com/",
  },
  {
    id: "teacher",
    title: "School Teacher",
    description: "Teach students in schools and educational institutions",
    category: "Education",
    type: "government",
    levels: ["12th-arts", "12th-science", "12th-commerce"],
    salary: "₹3-8 LPA",
    icon: GraduationCap,
    skills: ["Subject Knowledge", "Communication", "Patience"],
    officialLink: "https://ncte.gov.in/",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Promote businesses online through social media and ads",
    category: "Marketing",
    type: "private",
    levels: ["12th-commerce", "12th-arts"],
    salary: "₹3-15 LPA",
    icon: Briefcase,
    skills: ["Social Media", "Analytics", "Creativity"],
    officialLink: "https://skillshop.withgoogle.com/",
  },
  {
    id: "diploma-engineering",
    title: "Diploma in Engineering",
    description: "3-year technical diploma in various engineering branches",
    category: "Engineering",
    type: "academic",
    levels: ["10th"],
    salary: "₹2.5-8 LPA",
    icon: GraduationCap,
    skills: ["Mathematics", "Technical Drawing", "Problem Solving"],
    officialLink: "https://www.aicte-india.org/",
  },
  {
    id: "iti-electrician",
    title: "ITI Electrician",
    description: "Industrial training in electrical installation and maintenance",
    category: "Vocational",
    type: "academic",
    levels: ["10th"],
    salary: "₹2-5 LPA",
    icon: Wrench,
    skills: ["Electrical Systems", "Safety", "Circuit Design"],
    officialLink: "https://www.ncvtmis.gov.in/",
  },
  {
    id: "polytechnic-mechanical",
    title: "Polytechnic Mechanical",
    description: "Diploma course focusing on mechanical engineering fundamentals",
    category: "Engineering",
    type: "academic",
    levels: ["10th"],
    salary: "₹2.5-7 LPA",
    icon: Wrench,
    skills: ["Mechanical Design", "Manufacturing", "AutoCAD"],
    officialLink: "https://www.aicte-india.org/",
  },
  {
    id: "diploma-computer-applications",
    title: "Diploma in Computer Applications",
    description: "Learn computer fundamentals, programming, and office applications",
    category: "IT & Technology",
    type: "academic",
    levels: ["10th"],
    salary: "₹2-6 LPA",
    icon: Briefcase,
    skills: ["MS Office", "Basic Programming", "Data Entry"],
    officialLink: "https://www.nielit.gov.in/",
  },
  {
    id: "paramedical-courses",
    title: "Paramedical Courses",
    description: "Training in medical support roles like lab technician, X-ray technician",
    category: "Medical",
    type: "academic",
    levels: ["10th"],
    salary: "₹2-6 LPA",
    icon: GraduationCap,
    skills: ["Patient Care", "Medical Equipment", "Lab Procedures"],
    officialLink: "https://main.mohfw.gov.in/",
  },
  {
    id: "indian-army-soldier",
    title: "Indian Army (Soldier – GD)",
    description: "Serve the nation as a General Duty soldier in the Indian Army",
    category: "Defence",
    type: "government",
    levels: ["10th"],
    salary: "₹3-6 LPA",
    icon: Building2,
    skills: ["Physical Fitness", "Discipline", "Teamwork"],
    officialLink: "https://joinindianarmy.nic.in/",
  },
  {
    id: "indian-navy-mr",
    title: "Indian Navy (MR)",
    description: "Join Indian Navy as Matric Recruit for various roles",
    category: "Defence",
    type: "government",
    levels: ["10th"],
    salary: "₹3-6 LPA",
    icon: Building2,
    skills: ["Physical Fitness", "Swimming", "Discipline"],
    officialLink: "https://www.joinindiannavy.gov.in/",
  },
  {
    id: "railway-group-d",
    title: "Railway Group D",
    description: "Work in Indian Railways in track maintenance, helper roles",
    category: "Railways",
    type: "government",
    levels: ["10th"],
    salary: "₹2.5-4 LPA",
    icon: Building2,
    skills: ["Physical Fitness", "Teamwork", "Basic Math"],
    officialLink: "https://www.rrcb.gov.in/",
  },
  {
    id: "police-constable",
    title: "Police Constable",
    description: "Maintain law and order as a state police constable",
    category: "Law Enforcement",
    type: "government",
    levels: ["10th"],
    salary: "₹2.5-5 LPA",
    icon: Building2,
    skills: ["Physical Fitness", "Law Knowledge", "Communication"],
    officialLink: "https://police.gov.in/",
  },
  {
    id: "home-guard",
    title: "Home Guard",
    description: "Assist police in maintaining internal security",
    category: "Law Enforcement",
    type: "government",
    levels: ["10th"],
    salary: "₹1.5-3 LPA",
    icon: Building2,
    skills: ["Discipline", "Community Service", "First Aid"],
    officialLink: "https://dgfs.gov.in/",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Analyze data to help businesses make informed decisions",
    category: "IT & Technology",
    type: "skill-based",
    levels: ["12th-science"],
    salary: "₹4-12 LPA",
    icon: Briefcase,
    skills: ["Excel", "SQL", "Data Visualization"],
    officialLink: "https://www.coursera.org/professional-certificates/google-data-analytics",
  },
  {
    id: "python-developer",
    title: "Python Developer",
    description: "Build applications and automation scripts using Python",
    category: "IT & Technology",
    type: "skill-based",
    levels: ["12th-science"],
    salary: "₹4-15 LPA",
    icon: Briefcase,
    skills: ["Python", "Problem Solving", "APIs"],
    officialLink: "https://www.python.org/",
  },
  {
    id: "lab-technician",
    title: "Lab Technician",
    description: "Conduct tests and experiments in medical or research labs",
    category: "Medical",
    type: "skill-based",
    levels: ["12th-science"],
    salary: "₹2.5-6 LPA",
    icon: GraduationCap,
    skills: ["Lab Equipment", "Sample Testing", "Documentation"],
    officialLink: "https://www.paramedicalcouncil.in/",
  },
  {
    id: "ai-ml-assistant",
    title: "AI & ML Assistant",
    description: "Support AI/ML projects with data preparation and model training",
    category: "IT & Technology",
    type: "skill-based",
    levels: ["12th-science"],
    salary: "₹4-10 LPA",
    icon: Briefcase,
    skills: ["Python", "Machine Learning Basics", "Data Processing"],
    officialLink: "https://www.coursera.org/learn/machine-learning",
  },
  {
    id: "cloud-computing-associate",
    title: "Cloud Computing Associate",
    description: "Manage cloud infrastructure and services",
    category: "IT & Technology",
    type: "skill-based",
    levels: ["12th-science"],
    salary: "₹4-12 LPA",
    icon: Briefcase,
    skills: ["AWS/Azure Basics", "Networking", "Linux"],
    officialLink: "https://aws.amazon.com/training/",
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    description: "Create and manage online marketing campaigns",
    category: "Marketing",
    type: "skill-based",
    levels: ["12th-commerce"],
    salary: "₹3-12 LPA",
    icon: Briefcase,
    skills: ["SEO", "Social Media", "Google Ads"],
    officialLink: "https://skillshop.withgoogle.com/",
  },
  {
    id: "tally-gst-executive",
    title: "Tally & GST Executive",
    description: "Handle accounting, taxation, and GST compliance using Tally",
    category: "Finance",
    type: "skill-based",
    levels: ["12th-commerce"],
    salary: "₹2-5 LPA",
    icon: Briefcase,
    skills: ["Tally Software", "GST Filing", "Accounting"],
    officialLink: "https://tallysolutions.com/",
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    description: "Analyze business processes and recommend improvements",
    category: "Business",
    type: "skill-based",
    levels: ["12th-commerce"],
    salary: "₹5-15 LPA",
    icon: Briefcase,
    skills: ["Data Analysis", "Communication", "Problem Solving"],
    officialLink: "https://www.iiba.org/",
  },
  {
    id: "financial-modeling-analyst",
    title: "Financial Modeling Analyst",
    description: "Create financial models for business planning and valuation",
    category: "Finance",
    type: "skill-based",
    levels: ["12th-commerce"],
    salary: "₹5-15 LPA",
    icon: Briefcase,
    skills: ["Excel", "Financial Analysis", "Valuation"],
    officialLink: "https://corporatefinanceinstitute.com/",
  },
  {
    id: "banking-operations-executive",
    title: "Banking Operations Executive",
    description: "Handle day-to-day banking operations and customer service",
    category: "Banking",
    type: "skill-based",
    levels: ["12th-commerce"],
    salary: "₹2.5-6 LPA",
    icon: Building2,
    skills: ["Banking Software", "Customer Service", "Documentation"],
    officialLink: "https://www.iibf.org.in/",
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    description: "Create visual content for brands, websites, and marketing",
    category: "Design",
    type: "skill-based",
    levels: ["12th-arts"],
    salary: "₹3-12 LPA",
    icon: Briefcase,
    skills: ["Photoshop", "Illustrator", "Typography"],
    officialLink: "https://www.adobe.com/",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    description: "Design user interfaces and experiences for apps and websites",
    category: "Design",
    type: "skill-based",
    levels: ["12th-arts"],
    salary: "₹4-15 LPA",
    icon: Briefcase,
    skills: ["Figma", "User Research", "Prototyping"],
    officialLink: "https://www.figma.com/",
  },
  {
    id: "content-writer",
    title: "Content Writer",
    description: "Write articles, blogs, and marketing content for businesses",
    category: "Media",
    type: "skill-based",
    levels: ["12th-arts"],
    salary: "₹2.5-10 LPA",
    icon: Briefcase,
    skills: ["Writing", "SEO", "Research"],
    officialLink: "https://www.contentmarketinginstitute.com/",
  },
  {
    id: "video-editor",
    title: "Video Editor",
    description: "Edit and produce videos for social media, films, and ads",
    category: "Media",
    type: "skill-based",
    levels: ["12th-arts"],
    salary: "₹3-12 LPA",
    icon: Briefcase,
    skills: ["Premiere Pro", "After Effects", "Storytelling"],
    officialLink: "https://www.adobe.com/products/premiere.html",
  },
  {
    id: "animation-artist",
    title: "Animation Artist",
    description: "Create animated content for films, games, and advertisements",
    category: "Media",
    type: "skill-based",
    levels: ["12th-arts"],
    salary: "₹3-15 LPA",
    icon: Briefcase,
    skills: ["Maya/Blender", "Character Design", "Motion Graphics"],
    officialLink: "https://www.autodesk.com/products/maya/",
  },
];

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">✅ Beginner</Badge>;
    case "Intermediate":
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">⚠️ Intermediate</Badge>;
    case "Advanced":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">🔥 Advanced</Badge>;
    default:
      return <Badge variant="secondary">{difficulty}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "government":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Government</Badge>;
    case "private":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Private</Badge>;
    case "academic":
      return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">Academic</Badge>;
    case "skill-based":
      return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">Skill-Based</Badge>;
    default:
      return <Badge variant="secondary">{type}</Badge>;
  }
};

export default function CareerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoriteCareers();
  const { toast } = useToast();

  const career = careers.find((c) => c.id === id);

  if (!career) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Career Not Found</h1>
          <Button onClick={() => navigate("/careers")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Button>
        </div>
      </Layout>
    );
  }

  const skillCategories: CareerSkillCategory[] = careerSkillsData[career.id] || defaultSkills;
  const IconComponent = career.icon;

  const handleFavoriteToggle = async () => {
    try {
      await toggleFavorite({
        id: career.id,
        title: career.title,
        description: career.description,
        category: career.category,
        salary: career.salary,
        skills: career.skills,
      });
      toast({
        title: isFavorite(career.id) ? "Removed from favorites" : "Added to favorites",
        description: isFavorite(career.id)
          ? `${career.title} has been removed from your favorites.`
          : `${career.title} has been added to your favorites.`,
      });
    } catch (error) {
      toast({
        title: "Login Required",
        description: "Please login to save favorites.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/careers")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Careers
        </Button>

        {/* Career Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl">{career.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{career.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{career.category}</Badge>
                    {getTypeBadge(career.type)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className={isFavorite(career.id) ? "text-red-500" : ""}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(career.id) ? "fill-current" : ""}`} />
                </Button>
                {career.officialLink && (
                  <Button asChild>
                    <a href={career.officialLink} target="_blank" rel="noopener noreferrer">
                      Official Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Salary Range</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{career.salary}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Education Level</p>
                <p className="text-lg font-semibold">
                  {career.levels.map(l => l.replace("-", " ").replace("12th", "After 12th").replace("10th", "After 10th")).join(", ")}
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Required Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {career.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills You Should Start Building Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Skills You Should Start Building</h2>
              <p className="text-muted-foreground text-sm">Free resources to prepare for this career</p>
            </div>
          </div>

          <div className="grid gap-6">
            {skillCategories.map((category, categoryIdx) => (
              <Card key={categoryIdx}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-base">{skill.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                              {getDifficultyBadge(skill.difficulty)}
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {skill.timeRequired}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">FREE LEARNING RESOURCES:</p>
                          <div className="flex flex-wrap gap-2">
                            {skill.resources.map((resource, resourceIdx) => (
                              <Button
                                key={resourceIdx}
                                variant="outline"
                                size="sm"
                                asChild
                                className="text-xs h-8"
                              >
                                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                  {resource.name}
                                  <Badge variant="secondary" className="ml-2 text-[10px] px-1">
                                    {resource.platform}
                                  </Badge>
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Opportunities Section */}
        <RelatedOpportunities careerId={career.id} careerTitle={career.title} />

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to explore more careers?</h3>
              <p className="text-muted-foreground mb-4">Take our career quiz to find the best path for you!</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link to="/career-quiz">Take Career Quiz</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/courses">Explore Free Courses</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
