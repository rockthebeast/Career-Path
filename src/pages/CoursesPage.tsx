import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, ExternalLink, Star, Heart, Globe } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoriteCourses } from "@/hooks/useFavoriteCourses";

const platforms = [
  { id: "all", label: "All Platforms" },
  { id: "swayam", label: "SWAYAM" },
  { id: "nptel", label: "NPTEL" },
  { id: "skill-india", label: "Skill India" },
  { id: "coursera", label: "Coursera" },
  { id: "udemy", label: "Udemy" },
  { id: "other", label: "Other" },
];

const streamFilters = [
  { id: "all-streams", label: "All Streams" },
  { id: "12th-science", label: "12th Science" },
  { id: "12th-commerce", label: "12th Commerce" },
  { id: "12th-arts", label: "12th Arts" },
];

const courses = [
  // IT & Programming Courses (Science Stream)
  {
    id: "swayam-python",
    title: "Introduction to Python Programming",
    platform: "swayam",
    platformName: "SWAYAM",
    provider: "IIT Madras",
    description: "Learn Python programming from basics to advanced concepts",
    duration: "12 weeks",
    language: "English / Hindi",
    certificate: true,
    free: true,
    rating: 4.5,
    link: "https://swayam.gov.in/nd2_cec20_cs10",
    category: "IT & Programming",
    stream: "12th-science",
  },
  {
    id: "nptel-ds",
    title: "Data Structures and Algorithms",
    platform: "nptel",
    platformName: "NPTEL",
    provider: "IIT Kharagpur",
    description: "Master fundamental data structures and algorithmic techniques",
    duration: "8 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.7,
    link: "https://nptel.ac.in/courses/106105085",
    category: "IT & Programming",
    stream: "12th-science",
  },
  {
    id: "nptel-machine-learning",
    title: "Machine Learning for Beginners",
    platform: "nptel",
    platformName: "NPTEL",
    provider: "IIT Madras",
    description: "Introduction to machine learning concepts and applications",
    duration: "12 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.8,
    link: "https://nptel.ac.in/courses/106106139",
    category: "IT & Programming",
    stream: "12th-science",
  },
  {
    id: "swayam-web-dev",
    title: "Web Development with HTML, CSS & JS",
    platform: "swayam",
    platformName: "SWAYAM",
    provider: "IIT Bombay",
    description: "Build websites from scratch using HTML, CSS, and JavaScript",
    duration: "10 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.4,
    link: "https://swayam.gov.in/nd1_noc20_cs44",
    category: "IT & Programming",
    stream: "12th-science",
  },
  {
    id: "nptel-ai",
    title: "Artificial Intelligence Basics",
    platform: "nptel",
    platformName: "NPTEL",
    provider: "IIT Delhi",
    description: "Fundamentals of AI including search, planning, and reasoning",
    duration: "8 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.6,
    link: "https://nptel.ac.in/courses/106102220",
    category: "IT & Programming",
    stream: "12th-science",
  },
  {
    id: "coursera-data-analytics",
    title: "Google Data Analytics Certificate",
    platform: "coursera",
    platformName: "Coursera",
    provider: "Google",
    description: "Learn data analysis using spreadsheets, SQL, Tableau, and R",
    duration: "6 months",
    language: "English",
    certificate: true,
    free: false,
    rating: 4.8,
    link: "https://www.coursera.org/professional-certificates/google-data-analytics",
    category: "Data Analytics",
    stream: "12th-science",
  },
  {
    id: "skill-india-lab-tech",
    title: "Laboratory Technician Course",
    platform: "skill-india",
    platformName: "Skill India",
    provider: "NSDC",
    description: "Learn medical and pathological lab techniques",
    duration: "6 months",
    language: "Hindi / English",
    certificate: true,
    free: true,
    rating: 4.2,
    link: "https://www.skillindia.gov.in",
    category: "Healthcare",
    stream: "12th-science",
  },
  // Commerce Stream Courses
  {
    id: "nptel-accounting",
    title: "Financial Accounting Fundamentals",
    platform: "nptel",
    platformName: "NPTEL",
    provider: "IIM Bangalore",
    description: "Learn accounting principles, financial statements, and analysis",
    duration: "12 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.6,
    link: "https://nptel.ac.in/courses/110101132",
    category: "Finance & Accounting",
    stream: "12th-commerce",
  },
  {
    id: "udemy-tally",
    title: "Tally ERP 9 Complete Course",
    platform: "udemy",
    platformName: "Udemy",
    provider: "Various Instructors",
    description: "Learn Tally accounting software for business management",
    duration: "8 hours",
    language: "Hindi / English",
    certificate: true,
    free: false,
    rating: 4.5,
    link: "https://www.udemy.com/course/tally-erp-9-complete-course/",
    category: "Finance & Accounting",
    stream: "12th-commerce",
  },
  {
    id: "coursera-digital-marketing",
    title: "Digital Marketing Specialization",
    platform: "coursera",
    platformName: "Coursera",
    provider: "University of Illinois",
    description: "Master digital marketing strategies and analytics",
    duration: "6 months",
    language: "English",
    certificate: true,
    free: false,
    rating: 4.7,
    link: "https://www.coursera.org/specializations/digital-marketing",
    category: "Marketing",
    stream: "12th-commerce",
  },
  {
    id: "swayam-gst",
    title: "GST - Goods and Services Tax",
    platform: "swayam",
    platformName: "SWAYAM",
    provider: "IGNOU",
    description: "Complete understanding of GST laws and compliance",
    duration: "8 weeks",
    language: "English / Hindi",
    certificate: true,
    free: true,
    rating: 4.3,
    link: "https://swayam.gov.in",
    category: "Finance & Accounting",
    stream: "12th-commerce",
  },
  {
    id: "nptel-financial-modeling",
    title: "Financial Modeling & Valuation",
    platform: "nptel",
    platformName: "NPTEL",
    provider: "IIM Calcutta",
    description: "Learn to build financial models for business valuation",
    duration: "8 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.5,
    link: "https://nptel.ac.in/courses/110105086",
    category: "Finance & Accounting",
    stream: "12th-commerce",
  },
  {
    id: "skill-india-banking",
    title: "Banking & Financial Services",
    platform: "skill-india",
    platformName: "Skill India",
    provider: "NSDC",
    description: "Training for banking operations and financial services",
    duration: "3 months",
    language: "Hindi / English",
    certificate: true,
    free: true,
    rating: 4.1,
    link: "https://www.skillindia.gov.in",
    category: "Finance & Accounting",
    stream: "12th-commerce",
  },
  {
    id: "google-ads",
    title: "Google Ads Certification",
    platform: "other",
    platformName: "Google Skillshop",
    provider: "Google",
    description: "Learn to create and manage Google Ads campaigns",
    duration: "Self-paced",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.6,
    link: "https://skillshop.google.com",
    category: "Marketing",
    stream: "12th-commerce",
  },
  // Arts Stream Courses
  {
    id: "swayam-english",
    title: "Spoken English for Beginners",
    platform: "swayam",
    platformName: "SWAYAM",
    provider: "UGC",
    description: "Improve your English speaking and communication skills",
    duration: "8 weeks",
    language: "English / Hindi",
    certificate: true,
    free: true,
    rating: 4.3,
    link: "https://swayam.gov.in",
    category: "Communication",
    stream: "12th-arts",
  },
  {
    id: "coursera-graphic-design",
    title: "Graphic Design Specialization",
    platform: "coursera",
    platformName: "Coursera",
    provider: "CalArts",
    description: "Master visual design fundamentals and create stunning graphics",
    duration: "6 months",
    language: "English",
    certificate: true,
    free: false,
    rating: 4.7,
    link: "https://www.coursera.org/specializations/graphic-design",
    category: "Design",
    stream: "12th-arts",
  },
  {
    id: "coursera-uiux",
    title: "Google UX Design Certificate",
    platform: "coursera",
    platformName: "Coursera",
    provider: "Google",
    description: "Learn UX design process, wireframing, and prototyping",
    duration: "6 months",
    language: "English",
    certificate: true,
    free: false,
    rating: 4.8,
    link: "https://www.coursera.org/professional-certificates/google-ux-design",
    category: "Design",
    stream: "12th-arts",
  },
  {
    id: "swayam-content-writing",
    title: "Content Writing & Blogging",
    platform: "swayam",
    platformName: "SWAYAM",
    provider: "UGC",
    description: "Learn to write engaging content for websites and blogs",
    duration: "8 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.2,
    link: "https://swayam.gov.in",
    category: "Content & Writing",
    stream: "12th-arts",
  },
  {
    id: "skill-india-animation",
    title: "2D & 3D Animation Course",
    platform: "skill-india",
    platformName: "Skill India",
    provider: "NSDC",
    description: "Learn animation techniques for films and multimedia",
    duration: "6 months",
    language: "Hindi / English",
    certificate: true,
    free: true,
    rating: 4.4,
    link: "https://www.skillindia.gov.in",
    category: "Design",
    stream: "12th-arts",
  },
  {
    id: "udemy-photoshop",
    title: "Adobe Photoshop Masterclass",
    platform: "udemy",
    platformName: "Udemy",
    provider: "Various Instructors",
    description: "Master photo editing and graphic design with Photoshop",
    duration: "15 hours",
    language: "English",
    certificate: true,
    free: false,
    rating: 4.6,
    link: "https://www.udemy.com/course/photoshop-cc-masterclass/",
    category: "Design",
    stream: "12th-arts",
  },
  {
    id: "nptel-journalism",
    title: "Introduction to Journalism",
    platform: "nptel",
    platformName: "NPTEL",
    provider: "IIT Kanpur",
    description: "Fundamentals of journalism and media communication",
    duration: "8 weeks",
    language: "English",
    certificate: true,
    free: true,
    rating: 4.3,
    link: "https://nptel.ac.in",
    category: "Media",
    stream: "12th-arts",
  },
  {
    id: "swayam-creative-writing",
    title: "Creative Writing Workshop",
    platform: "swayam",
    platformName: "SWAYAM",
    provider: "IGNOU",
    description: "Develop creative writing skills for fiction and non-fiction",
    duration: "8 weeks",
    language: "English / Hindi",
    certificate: true,
    free: true,
    rating: 4.1,
    link: "https://swayam.gov.in",
    category: "Content & Writing",
    stream: "12th-arts",
  },
  // General/Vocational Courses
  {
    id: "skill-india-electrician",
    title: "Electrician Training Course",
    platform: "skill-india",
    platformName: "Skill India",
    provider: "NSDC",
    description: "Learn electrical wiring, safety, and maintenance skills",
    duration: "6 months",
    language: "Hindi / Regional",
    certificate: true,
    free: true,
    rating: 4.2,
    link: "https://www.skillindia.gov.in",
    category: "Vocational",
    stream: "all-streams",
  },
  {
    id: "pmkvy-retail",
    title: "Retail Sales Associate Training",
    platform: "skill-india",
    platformName: "PMKVY",
    provider: "NSDC",
    description: "Learn retail sales, customer service, and store operations",
    duration: "3 months",
    language: "Hindi / English",
    certificate: true,
    free: true,
    rating: 4.0,
    link: "https://www.pmkvyofficial.org",
    category: "Retail & Sales",
    stream: "all-streams",
  },
  {
    id: "diksha-teacher",
    title: "Teacher Training Modules",
    platform: "other",
    platformName: "DIKSHA",
    provider: "Government of India",
    description: "Professional development courses for teachers",
    duration: "Self-paced",
    language: "Multiple Languages",
    certificate: true,
    free: true,
    rating: 4.1,
    link: "https://diksha.gov.in",
    category: "Education",
    stream: "all-streams",
  },
  {
    id: "skill-india-beauty",
    title: "Beauty & Wellness Training",
    platform: "skill-india",
    platformName: "Skill India",
    provider: "NSDC",
    description: "Learn beauty care, makeup, and wellness techniques",
    duration: "4 months",
    language: "Hindi / Regional",
    certificate: true,
    free: true,
    rating: 4.3,
    link: "https://www.skillindia.gov.in",
    category: "Beauty & Wellness",
    stream: "all-streams",
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedStream, setSelectedStream] = useState("all-streams");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavoriteCourses();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === "all" || course.platform === selectedPlatform;
    const matchesStream = selectedStream === "all-streams" || course.stream === selectedStream || course.stream === "all-streams";
    const matchesFree = !showFreeOnly || course.free;
    
    return matchesSearch && matchesPlatform && matchesStream && matchesFree;
  });

  const handleToggleFavorite = (course: typeof courses[0]) => {
    toggleFavorite({
      id: course.id,
      title: course.title,
      platformName: course.platformName,
      description: course.description,
      link: course.link,
      category: course.category,
    });
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Free Learning Resources
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Learn new skills from SWAYAM, NPTEL, Skill India and other platforms
          </p>
          {user && (
            <Link to="/favorites" className="inline-flex items-center gap-2 mt-4 text-primary hover:underline">
              <Heart className="h-4 w-4" />
              View My Favorite Courses
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Stream Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {streamFilters.map((stream) => (
              <Button
                key={stream.id}
                variant={selectedStream === stream.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStream(stream.id)}
              >
                {stream.label}
              </Button>
            ))}
          </div>
          {/* Platform Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={selectedPlatform === platform.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedPlatform(platform.id)}
              >
                {platform.label}
              </Button>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant={showFreeOnly ? "success" : "muted"}
              size="sm"
              onClick={() => setShowFreeOnly(!showFreeOnly)}
            >
              {showFreeOnly ? "✓ Free Courses Only" : "Show Free Only"}
            </Button>
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Showing {filteredCourses.length} courses
        </p>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Card 
              key={course.id} 
              variant="interactive"
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-xs font-medium bg-secondary/20 text-secondary rounded-full">
                        {course.platformName}
                      </span>
                      {course.free && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-success/20 text-success rounded-full">
                          Free
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription className="mt-1">{course.provider}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleFavorite(course);
                    }}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(course.id) ? "fill-primary text-primary" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {course.language}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {course.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="px-2 py-1 text-xs bg-muted rounded-md">{course.category}</span>
                  <Button size="sm" asChild>
                    <a href={course.link} target="_blank" rel="noopener noreferrer">
                      Start Learning
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery("");
              setSelectedPlatform("all");
              setSelectedStream("all-streams");
              setShowFreeOnly(false);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}