import { useState } from "react";
import { Search, Building2, Shield, Train, Landmark, GraduationCap, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "All Categories", icon: Building2 },
  { id: "ssc", label: "SSC Exams", icon: Building2 },
  { id: "banking", label: "Banking", icon: Landmark },
  { id: "defence", label: "Defence", icon: Shield },
  { id: "railways", label: "Railways", icon: Train },
  { id: "upsc", label: "UPSC", icon: GraduationCap },
  { id: "state", label: "State PSC", icon: Building2 },
];

const govtJobs = [
  {
    id: "ssc-cgl",
    title: "SSC CGL",
    fullName: "Combined Graduate Level Examination",
    category: "ssc",
    description: "For graduate-level Group B & C posts in various ministries",
    eligibility: "Graduate from recognized university",
    ageLimit: "18-32 years",
    salary: "₹25,500 - ₹1,51,100",
    examPattern: ["Tier I (Online)", "Tier II (Online)", "Document Verification"],
    officialWebsite: "https://ssc.gov.in",
    icon: Building2,
  },
  {
    id: "ssc-chsl",
    title: "SSC CHSL",
    fullName: "Combined Higher Secondary Level",
    category: "ssc",
    description: "For 10+2 pass candidates for LDC, DEO, PA/SA posts",
    eligibility: "12th pass from recognized board",
    ageLimit: "18-27 years",
    salary: "₹19,900 - ₹92,300",
    examPattern: ["Tier I (Online)", "Tier II (Descriptive)", "Skill Test"],
    officialWebsite: "https://ssc.gov.in",
    icon: Building2,
  },
  {
    id: "ssc-gd",
    title: "SSC GD Constable",
    fullName: "General Duty Constable",
    category: "ssc",
    description: "For Constable posts in BSF, CISF, CRPF, SSB, ITBP",
    eligibility: "10th pass from recognized board",
    ageLimit: "18-23 years",
    salary: "₹21,700 - ₹69,100",
    examPattern: ["CBT", "Physical Test", "Medical Test"],
    officialWebsite: "https://ssc.gov.in",
    icon: Shield,
  },
  {
    id: "ssc-mts",
    title: "SSC MTS",
    fullName: "Multi Tasking Staff",
    category: "ssc",
    description: "For Group C non-technical posts in various ministries",
    eligibility: "10th pass from recognized board",
    ageLimit: "18-25 years",
    salary: "₹18,000 - ₹56,900",
    examPattern: ["Paper I (Online)", "Paper II (Descriptive)"],
    officialWebsite: "https://ssc.gov.in",
    icon: Building2,
  },
  {
    id: "ibps-po",
    title: "IBPS PO",
    fullName: "Probationary Officer",
    category: "banking",
    description: "For PO posts in various public sector banks",
    eligibility: "Graduate with computer knowledge",
    ageLimit: "20-30 years",
    salary: "₹36,000 - ₹63,840",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "https://www.ibps.in",
    icon: Landmark,
  },
  {
    id: "ibps-clerk",
    title: "IBPS Clerk",
    fullName: "Clerical Cadre",
    category: "banking",
    description: "For clerk posts in public sector banks",
    eligibility: "Graduate from recognized university",
    ageLimit: "20-28 years",
    salary: "₹19,900 - ₹47,920",
    examPattern: ["Prelims", "Mains"],
    officialWebsite: "https://www.ibps.in",
    icon: Landmark,
  },
  {
    id: "sbi-po",
    title: "SBI PO",
    fullName: "State Bank of India Probationary Officer",
    category: "banking",
    description: "Officer cadre position in SBI",
    eligibility: "Graduate (21-30 years)",
    ageLimit: "21-30 years",
    salary: "₹36,000 - ₹63,840",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "https://sbi.co.in/web/careers",
    icon: Landmark,
  },
  {
    id: "sbi-clerk",
    title: "SBI Clerk",
    fullName: "State Bank of India Junior Associate",
    category: "banking",
    description: "Junior Associate position in SBI",
    eligibility: "Graduate from recognized university",
    ageLimit: "20-28 years",
    salary: "₹19,900 - ₹47,920",
    examPattern: ["Prelims", "Mains"],
    officialWebsite: "https://sbi.co.in/web/careers",
    icon: Landmark,
  },
  {
    id: "rbi-grade-b",
    title: "RBI Grade B",
    fullName: "Reserve Bank of India Grade B Officer",
    category: "banking",
    description: "Prestigious officer position in RBI",
    eligibility: "Graduate with 60% marks",
    ageLimit: "21-30 years",
    salary: "₹55,200 - ₹92,300",
    examPattern: ["Phase I (Online)", "Phase II (Online)", "Interview"],
    officialWebsite: "https://opportunities.rbi.org.in",
    icon: Landmark,
  },
  {
    id: "indian-army",
    title: "Indian Army",
    fullName: "Join Indian Army",
    category: "defence",
    description: "Various entry schemes for officers and soldiers",
    eligibility: "10th/12th/Graduate based on entry",
    ageLimit: "17.5-23 years",
    salary: "₹21,700 - ₹2,50,000",
    examPattern: ["Written Test", "Physical", "Medical", "Interview"],
    officialWebsite: "https://joinindianarmy.nic.in",
    icon: Shield,
  },
  {
    id: "indian-navy",
    title: "Indian Navy",
    fullName: "Join Indian Navy",
    category: "defence",
    description: "Officer and sailor entries in Indian Navy",
    eligibility: "10+2 with PCM / Graduate",
    ageLimit: "17-25 years",
    salary: "₹21,700 - ₹2,50,000",
    examPattern: ["Written Test", "SSB Interview", "Medical"],
    officialWebsite: "https://www.joinindiannavy.gov.in",
    icon: Shield,
  },
  {
    id: "indian-airforce",
    title: "Indian Air Force",
    fullName: "Join Indian Air Force",
    category: "defence",
    description: "Flying, Technical, and Ground Duty branches",
    eligibility: "10+2 with Physics & Maths / Graduate",
    ageLimit: "17-23 years",
    salary: "₹21,700 - ₹2,50,000",
    examPattern: ["AFCAT", "AFSB Interview", "Medical"],
    officialWebsite: "https://afcat.cdac.in",
    icon: Shield,
  },
  {
    id: "nda",
    title: "NDA",
    fullName: "National Defence Academy",
    category: "defence",
    description: "Joint services academy for Army, Navy, Air Force",
    eligibility: "12th pass with Physics & Maths (for Air Force & Navy)",
    ageLimit: "16.5-19.5 years",
    salary: "₹56,100 - ₹2,50,000 (after training)",
    examPattern: ["Written (UPSC)", "SSB Interview", "Medical"],
    officialWebsite: "https://upsc.gov.in",
    icon: Shield,
  },
  {
    id: "rrb-ntpc",
    title: "RRB NTPC",
    fullName: "Non-Technical Popular Categories",
    category: "railways",
    description: "For various non-technical posts in Railways",
    eligibility: "12th pass / Graduate",
    ageLimit: "18-33 years",
    salary: "₹19,900 - ₹92,300",
    examPattern: ["CBT 1", "CBT 2", "Typing Test (for some)"],
    officialWebsite: "https://www.rrbcdg.gov.in",
    icon: Train,
  },
  {
    id: "rrb-group-d",
    title: "RRB Group D",
    fullName: "Railway Group D Level 1",
    category: "railways",
    description: "For Track Maintainer, Helper, and other posts",
    eligibility: "10th pass + ITI (optional)",
    ageLimit: "18-33 years",
    salary: "₹18,000 - ₹56,900",
    examPattern: ["CBT", "Physical Test", "Document Verification"],
    officialWebsite: "https://www.rrbcdg.gov.in",
    icon: Train,
  },
  {
    id: "rrb-alp",
    title: "RRB ALP",
    fullName: "Assistant Loco Pilot",
    category: "railways",
    description: "For Assistant Loco Pilot posts in Indian Railways",
    eligibility: "10th pass + ITI or Diploma in relevant trade",
    ageLimit: "18-30 years",
    salary: "₹19,900 - ₹63,200",
    examPattern: ["CBT 1", "CBT 2", "Computer Based Aptitude Test"],
    officialWebsite: "https://www.rrbcdg.gov.in",
    icon: Train,
  },
  {
    id: "rrb-je",
    title: "RRB JE",
    fullName: "Railway Junior Engineer",
    category: "railways",
    description: "For Junior Engineer posts in various departments",
    eligibility: "Diploma/Degree in relevant engineering branch",
    ageLimit: "18-33 years",
    salary: "₹35,400 - ₹1,12,400",
    examPattern: ["CBT 1", "CBT 2", "Document Verification"],
    officialWebsite: "https://www.rrbcdg.gov.in",
    icon: Train,
  },
  {
    id: "upsc-cse",
    title: "UPSC Civil Services",
    fullName: "IAS, IPS, IFS, IRS Examination",
    category: "upsc",
    description: "For All India Services and Central Services",
    eligibility: "Graduate from recognized university",
    ageLimit: "21-32 years",
    salary: "₹56,100 - ₹2,50,000",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "https://upsc.gov.in",
    icon: GraduationCap,
  },
  {
    id: "upsc-cds",
    title: "UPSC CDS",
    fullName: "Combined Defence Services Examination",
    category: "upsc",
    description: "Entry to Indian Military Academy, Naval Academy, Air Force Academy",
    eligibility: "Graduate (BA/BSc/BTech based on service)",
    ageLimit: "19-25 years",
    salary: "₹56,100 - ₹2,50,000",
    examPattern: ["Written (UPSC)", "SSB Interview", "Medical"],
    officialWebsite: "https://upsc.gov.in",
    icon: Shield,
  },
  {
    id: "upsc-ese",
    title: "UPSC ESE",
    fullName: "Engineering Services Examination",
    category: "upsc",
    description: "For Group A posts in engineering departments",
    eligibility: "Engineering degree in relevant branch",
    ageLimit: "21-30 years",
    salary: "₹56,100 - ₹2,50,000",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "https://upsc.gov.in",
    icon: GraduationCap,
  },
  {
    id: "state-pcs",
    title: "State PCS Exams",
    fullName: "State Public Service Commission",
    category: "state",
    description: "For state-level administrative services",
    eligibility: "Graduate from recognized university",
    ageLimit: "21-40 years (varies by state)",
    salary: "₹35,400 - ₹1,51,100",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "Check respective state PSC website",
    icon: Building2,
  },
  {
    id: "uppsc",
    title: "UPPSC PCS",
    fullName: "Uttar Pradesh Public Service Commission",
    category: "state",
    description: "For administrative posts in Uttar Pradesh",
    eligibility: "Graduate from recognized university",
    ageLimit: "21-40 years",
    salary: "₹44,900 - ₹1,51,100",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "https://uppsc.up.nic.in",
    icon: Building2,
  },
  {
    id: "mppsc",
    title: "MPPSC",
    fullName: "Madhya Pradesh Public Service Commission",
    category: "state",
    description: "For administrative posts in Madhya Pradesh",
    eligibility: "Graduate from recognized university",
    ageLimit: "21-40 years",
    salary: "₹36,200 - ₹1,51,100",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "https://mppsc.mp.gov.in",
    icon: Building2,
  },
  {
    id: "bpsc",
    title: "BPSC",
    fullName: "Bihar Public Service Commission",
    category: "state",
    description: "For administrative posts in Bihar",
    eligibility: "Graduate from recognized university",
    ageLimit: "20-37 years",
    salary: "₹35,400 - ₹1,51,100",
    examPattern: ["Prelims", "Mains", "Interview"],
    officialWebsite: "https://bpsc.bih.nic.in",
    icon: Building2,
  },
];

export default function GovernmentJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const filteredJobs = govtJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Government Jobs in India
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore SSC, Banking, Railways, Defence, UPSC and State PSC exams
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search government jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              <cat.icon className="h-4 w-4 mr-1" />
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Showing {filteredJobs.length} government jobs
        </p>

        {/* Job Cards */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredJobs.map((job, index) => (
            <Card 
              key={job.id} 
              variant="elevated"
              className="animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader 
                className="cursor-pointer"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <job.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription>{job.fullName}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {expandedJob === job.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {expandedJob === job.id && (
                <CardContent className="pt-0 space-y-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Eligibility:</strong> {job.eligibility}</p>
                      <p className="text-sm"><strong>Age Limit:</strong> {job.ageLimit}</p>
                      <p className="text-sm"><strong>Salary:</strong> <span className="text-success font-medium">{job.salary}</span></p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Exam Pattern:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.examPattern.map((stage, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-muted rounded-md">
                            {stage}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full sm:w-auto">
                    <a href={job.officialWebsite} target="_blank" rel="noopener noreferrer">
                      Visit Official Website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}