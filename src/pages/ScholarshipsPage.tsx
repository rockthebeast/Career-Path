import { useState } from "react";
import { Search, Award, ExternalLink, Calendar, IndianRupee } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "All Scholarships" },
  { id: "central", label: "Central Govt" },
  { id: "state", label: "State Govt" },
  { id: "minority", label: "Minority" },
  { id: "merit", label: "Merit-Based" },
  { id: "disability", label: "Disability" },
  { id: "school", label: "School Level" },
  { id: "ug", label: "Undergraduate" },
  { id: "pg", label: "Postgraduate" },
];

const scholarships = [
  // Central Government Scholarships
  {
    id: "nsp-post-matric",
    title: "Post Matric Scholarship for SC Students",
    provider: "Ministry of Social Justice & Empowerment",
    category: "central",
    level: "UG/PG",
    description: "For SC students studying in post-matriculation courses",
    eligibility: "SC students, family income less than ₹2.5 Lakh per annum",
    benefits: "Tuition fees + Maintenance allowance",
    amount: "Up to ₹10,000 - ₹25,000 per year",
    deadline: "October - December",
    website: "https://scholarships.gov.in",
  },
  {
    id: "nsp-post-matric-st",
    title: "Post Matric Scholarship for ST Students",
    provider: "Ministry of Tribal Affairs",
    category: "central",
    level: "UG/PG",
    description: "For ST students in post-matriculation classes",
    eligibility: "ST students, family income less than ₹2.5 Lakh",
    benefits: "Full tuition fee + Maintenance allowance",
    amount: "Up to ₹1,30,000 per year",
    deadline: "September - November",
    website: "https://scholarships.gov.in",
  },
  {
    id: "nsp-post-matric-obc",
    title: "Post Matric Scholarship for OBC Students",
    provider: "Ministry of Social Justice & Empowerment",
    category: "central",
    level: "UG/PG",
    description: "For OBC students studying in post-matriculation courses",
    eligibility: "OBC students, family income less than ₹1.5 Lakh per annum",
    benefits: "Tuition fees + Maintenance allowance",
    amount: "Up to ₹7,000 per year",
    deadline: "September - December",
    website: "https://scholarships.gov.in",
  },
  {
    id: "nsp-pre-matric",
    title: "Pre Matric Scholarship for SC Students",
    provider: "Ministry of Social Justice & Empowerment",
    category: "central",
    level: "School",
    description: "For SC students in classes 9th and 10th",
    eligibility: "SC students with family income below ₹2.5 Lakh",
    benefits: "Monthly stipend + Books allowance",
    amount: "₹3,500 - ₹6,000 per year",
    deadline: "September - November",
    website: "https://scholarships.gov.in",
  },
  {
    id: "nsp-pre-matric-st",
    title: "Pre Matric Scholarship for ST Students",
    provider: "Ministry of Tribal Affairs",
    category: "central",
    level: "School",
    description: "For ST students in classes 9th and 10th",
    eligibility: "ST students with family income below ₹2.5 Lakh",
    benefits: "Monthly stipend + Books + Adhoc grant",
    amount: "₹4,000 - ₹7,500 per year",
    deadline: "September - November",
    website: "https://scholarships.gov.in",
  },
  {
    id: "pm-scholarship",
    title: "PM Scholarship Scheme (PMSS)",
    provider: "Ministry of Defence",
    category: "central",
    level: "UG",
    description: "For children of ex-servicemen and widows of armed forces personnel",
    eligibility: "Pursuing professional degree courses",
    benefits: "Fixed scholarship for full duration of course",
    amount: "₹2,500 - ₹3,000 per month",
    deadline: "Check official portal",
    website: "https://ksb.gov.in/pmss.htm",
  },
  {
    id: "aicte-pragati",
    title: "AICTE Pragati Scholarship",
    provider: "AICTE",
    category: "central",
    level: "UG",
    description: "For girl students in AICTE approved technical institutions",
    eligibility: "Girl students, family income less than ₹8 Lakh per annum",
    benefits: "One-time fee reimbursement + Monthly allowance",
    amount: "Up to ₹50,000 per year",
    deadline: "October - December",
    website: "https://www.aicte-india.org/schemes/students-development-schemes/PRAGATI",
  },
  {
    id: "aicte-saksham",
    title: "AICTE Saksham Scholarship",
    provider: "AICTE",
    category: "disability",
    level: "UG",
    description: "For differently-abled students in technical education",
    eligibility: "Students with 40% or more disability",
    benefits: "Fee reimbursement + Monthly allowance",
    amount: "Up to ₹50,000 per year",
    deadline: "October - December",
    website: "https://www.aicte-india.org/schemes/students-development-schemes/SAKSHAM",
  },
  {
    id: "aicte-swanath",
    title: "AICTE Swanath Scholarship",
    provider: "AICTE",
    category: "central",
    level: "UG",
    description: "For orphans, wards of armed forces/CAPF martyrs, single parent children",
    eligibility: "Orphans or wards of martyrs pursuing technical education",
    benefits: "Tuition fee + Development charges",
    amount: "Up to ₹50,000 per year",
    deadline: "October - December",
    website: "https://www.aicte-india.org/schemes/students-development-schemes/SWANATH",
  },
  // Minority Scholarships
  {
    id: "minority-scholarship",
    title: "Post Matric Scholarship for Minorities",
    provider: "Ministry of Minority Affairs",
    category: "minority",
    level: "UG/PG",
    description: "For minority community students in post-matric courses",
    eligibility: "Minority students with 50% marks, family income below ₹2 Lakh",
    benefits: "Course fee + Maintenance allowance",
    amount: "₹5,000 - ₹10,000 per year",
    deadline: "September - December",
    website: "https://scholarships.gov.in",
  },
  {
    id: "minority-merit",
    title: "Merit-cum-Means Scholarship for Minorities",
    provider: "Ministry of Minority Affairs",
    category: "minority",
    level: "UG",
    description: "For minority students pursuing professional courses",
    eligibility: "Minority students, 50% marks, family income below ₹2.5 Lakh",
    benefits: "Course fee + Maintenance allowance",
    amount: "Up to ₹20,000 per year",
    deadline: "September - December",
    website: "https://scholarships.gov.in",
  },
  {
    id: "begum-hazrat",
    title: "Begum Hazrat Mahal National Scholarship",
    provider: "Maulana Azad Education Foundation",
    category: "minority",
    level: "School",
    description: "For minority girl students studying in classes 9th to 12th",
    eligibility: "Minority girls, family income less than ₹2 Lakh per annum",
    benefits: "Annual scholarship",
    amount: "₹5,000 - ₹6,000 per year",
    deadline: "September - November",
    website: "https://bhmnsmaef.org",
  },
  // Merit-Based Scholarships
  {
    id: "kvpy",
    title: "KVPY Fellowship",
    provider: "DST, Government of India",
    category: "merit",
    level: "UG",
    description: "For students interested in basic science research",
    eligibility: "Students in Class 11 to 1st year BSc with aptitude for research",
    benefits: "Monthly fellowship + Annual contingency grant",
    amount: "₹5,000 - ₹7,000 per month",
    deadline: "July - August",
    website: "http://kvpy.iisc.ac.in",
  },
  {
    id: "inspire",
    title: "INSPIRE Scholarship (SHE)",
    provider: "DST, Government of India",
    category: "merit",
    level: "UG",
    description: "Scholarship for Higher Education in natural and basic sciences",
    eligibility: "Top 1% in 12th board exams or JEE/NEET rank holders",
    benefits: "Annual scholarship for BSc, MSc, PhD",
    amount: "₹80,000 per year for 5 years",
    deadline: "December",
    website: "https://online-inspire.gov.in",
  },
  {
    id: "ntse",
    title: "National Talent Search Examination (NTSE)",
    provider: "NCERT",
    category: "merit",
    level: "School",
    description: "For exceptionally talented students at Class 10 level",
    eligibility: "Class 10 students with 75% in Class 9",
    benefits: "Monthly scholarship through higher education",
    amount: "₹1,250 - ₹2,000 per month",
    deadline: "November",
    website: "https://ncert.nic.in/national-talent-examination.php",
  },
  {
    id: "ishan-uday",
    title: "Ishan Uday Scholarship",
    provider: "UGC",
    category: "merit",
    level: "UG",
    description: "For students from North Eastern Region",
    eligibility: "Students from NE states, family income below ₹4.5 Lakh",
    benefits: "Monthly scholarship for UG courses",
    amount: "₹3,500 - ₹5,000 per month",
    deadline: "October - December",
    website: "https://scholarships.gov.in",
  },
  // State Government Scholarships
  {
    id: "state-merit",
    title: "State Merit Scholarship",
    provider: "Various State Governments",
    category: "state",
    level: "UG",
    description: "Merit-based scholarships by various state governments",
    eligibility: "Varies by state - usually merit in 10th/12th exams",
    benefits: "Tuition fee waiver + Monthly stipend",
    amount: "Varies by state (₹5,000 - ₹30,000)",
    deadline: "Check state portal",
    website: "https://scholarships.gov.in",
  },
  {
    id: "up-scholarship",
    title: "UP Scholarship",
    provider: "Government of Uttar Pradesh",
    category: "state",
    level: "School/UG/PG",
    description: "For students of Uttar Pradesh across all levels",
    eligibility: "Domicile of UP, income criteria varies",
    benefits: "Tuition fee + Maintenance allowance",
    amount: "₹1,000 - ₹20,000 per year",
    deadline: "October - December",
    website: "https://scholarship.up.gov.in",
  },
  {
    id: "mp-scholarship",
    title: "MP State Scholarship",
    provider: "Government of Madhya Pradesh",
    category: "state",
    level: "School/UG",
    description: "Various scholarships for MP students",
    eligibility: "Domicile of MP, category-wise income criteria",
    benefits: "Tuition fee + Books + Stipend",
    amount: "₹3,000 - ₹15,000 per year",
    deadline: "July - October",
    website: "https://scholarshipportal.mp.nic.in",
  },
  {
    id: "bihar-scholarship",
    title: "Bihar Combined Scholarship",
    provider: "Government of Bihar",
    category: "state",
    level: "UG/PG",
    description: "For students of Bihar pursuing higher education",
    eligibility: "Domicile of Bihar, category-wise criteria",
    benefits: "One-time grant for education expenses",
    amount: "₹10,000 - ₹25,000",
    deadline: "As per notification",
    website: "https://scholarships.gov.in",
  },
  {
    id: "rajasthan-scholarship",
    title: "Rajasthan Ambedkar DBT Voucher",
    provider: "Government of Rajasthan",
    category: "state",
    level: "UG",
    description: "For SC/ST students pursuing college education",
    eligibility: "SC/ST students of Rajasthan",
    benefits: "Monthly voucher for accommodation and food",
    amount: "₹2,000 - ₹7,000 per month",
    deadline: "As per notification",
    website: "https://sje.rajasthan.gov.in",
  },
  // Disability Scholarships
  {
    id: "nhfdc-scholarship",
    title: "NHFDC Scholarship for Disabled",
    provider: "National Handicapped Finance Development Corporation",
    category: "disability",
    level: "UG/PG",
    description: "For persons with disabilities pursuing professional courses",
    eligibility: "40% or more disability, family income below ₹3 Lakh",
    benefits: "Course fee + Maintenance allowance",
    amount: "Up to ₹2 Lakh",
    deadline: "As per notification",
    website: "https://www.nhfdc.nic.in",
  },
  {
    id: "pre-matric-disability",
    title: "Pre-Matric Scholarship for Disabled",
    provider: "Ministry of Social Justice",
    category: "disability",
    level: "School",
    description: "For disabled students in classes 9th and 10th",
    eligibility: "40% or more disability, family income below ₹2.5 Lakh",
    benefits: "Monthly stipend + Books + Disability allowance",
    amount: "₹8,000 - ₹12,000 per year",
    deadline: "September - November",
    website: "https://scholarships.gov.in",
  },
  // Postgraduate Scholarships
  {
    id: "ugc-net-jrf",
    title: "UGC NET Junior Research Fellowship",
    provider: "UGC",
    category: "merit",
    level: "PG",
    description: "For students pursuing PhD after clearing UGC NET",
    eligibility: "NET qualified with JRF",
    benefits: "Monthly fellowship for research",
    amount: "₹31,000 per month",
    deadline: "As per NET exam schedule",
    website: "https://ugcnet.nta.nic.in",
  },
  {
    id: "pg-indira-gandhi",
    title: "PG Indira Gandhi Scholarship for Single Girl Child",
    provider: "UGC",
    category: "merit",
    level: "PG",
    description: "For single girl child pursuing PG in non-professional courses",
    eligibility: "Single girl child, admitted to regular PG course",
    benefits: "Monthly scholarship for 2 years",
    amount: "₹3,100 per month",
    deadline: "October - December",
    website: "https://scholarships.gov.in",
  },
];

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scholarship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scholarship.level.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                            scholarship.category === selectedCategory ||
                            (selectedCategory === "school" && scholarship.level.toLowerCase().includes("school")) ||
                            (selectedCategory === "ug" && scholarship.level.toLowerCase().includes("ug")) ||
                            (selectedCategory === "pg" && scholarship.level.toLowerCase().includes("pg"));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Scholarships & Schemes
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find scholarships from National Scholarship Portal and government schemes
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search scholarships..."
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
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Showing {filteredScholarships.length} scholarships
        </p>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScholarships.map((scholarship, index) => (
            <Card 
              key={scholarship.id} 
              variant="elevated"
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {scholarship.level}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{scholarship.title}</CardTitle>
                    <CardDescription className="mt-1">{scholarship.provider}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                
                <div className="space-y-2 text-sm">
                  <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                  <p><strong>Benefits:</strong> {scholarship.benefits}</p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <span className="inline-flex items-center gap-1 text-success font-medium">
                      <IndianRupee className="h-4 w-4" />
                      {scholarship.amount}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {scholarship.deadline}
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <a href={scholarship.website} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No scholarships found matching your criteria.</p>
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