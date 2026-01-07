import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, Briefcase, GraduationCap, Wrench, Building2, ChevronRight, Heart, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFavoriteCareers } from "@/hooks/useFavoriteCareers";
import { useToast } from "@/hooks/use-toast";
const educationLevels = [
  { id: "all", label: "All Levels" },
  { id: "10th", label: "After 10th" },
  { id: "12th-science", label: "12th Science" },
  { id: "12th-commerce", label: "12th Commerce" },
  { id: "12th-arts", label: "12th Arts" },
];

const careerTypes = [
  { id: "all", label: "All Types" },
  { id: "academic", label: "Academic" },
  { id: "government", label: "Government" },
  { id: "private", label: "Private" },
  { id: "skill-based", label: "Skill-Based" },
];

const careers = [
  // Existing careers with official links
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

  // Academic Careers – After 10th
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

  // Government Careers – After 10th
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

  // 12th Science – Skill Based
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

  // 12th Commerce – Skill Based
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

  // 12th Arts – Skill Based
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

export default function CareersPage() {
  const [searchParams] = useSearchParams();
  const initialLevel = searchParams.get("level") || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedType, setSelectedType] = useState("all");
  const { isFavorite, toggleFavorite } = useFavoriteCareers();
  const { toast } = useToast();

  const filteredCareers = careers.filter((career) => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          career.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || career.levels.includes(selectedLevel);
    const matchesType = selectedType === "all" || career.type === selectedType;
    
    return matchesSearch && matchesLevel && matchesType;
  });

  const handleToggleFavorite = (career: typeof careers[0]) => {
    toggleFavorite({
      id: career.id,
      title: career.title,
      description: career.description,
      category: career.category,
      salary: career.salary,
      skills: career.skills,
    });
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Explore Career Paths
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover careers based on your education level, interests, and goals
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>

          {/* Level Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {educationLevels.map((level) => (
              <Button
                key={level.id}
                variant={selectedLevel === level.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level.id)}
              >
                {level.label}
              </Button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {careerTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
              >
                <Filter className="h-3 w-3 mr-1" />
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        
        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Showing {filteredCareers.length} careers
        </p>

        {/* Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career, index) => (
            <Link to={`/careers/${career.id}`} key={career.id}>
              <Card 
                variant="interactive"
                className="group animate-slide-up h-full cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <career.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {career.title}
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">{career.category}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleFavorite(career);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite(career.id) ? "fill-primary text-primary" : ""}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{career.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {career.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 text-xs bg-muted rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-semibold text-success">{career.salary}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View Details <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No careers found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery("");
              setSelectedLevel("all");
              setSelectedType("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
