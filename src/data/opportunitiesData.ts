// Types for opportunities
export interface Internship {
  id: string;
  title: string;
  organization: string;
  description: string;
  duration: string;
  skills: string[];
  certificate: boolean;
  mode: "online" | "offline" | "hybrid";
  classLevel: ("10th" | "12th")[];
  careerInterests: string[];
  timeCommitment: string;
  applyLink: string;
  verified: boolean;
}

export interface Volunteering {
  id: string;
  title: string;
  organization: string;
  cause: "education" | "environment" | "health" | "rural-development" | "other";
  description: string;
  roleDescription: string;
  timeCommitment: string;
  location: string;
  mode: "online" | "offline" | "hybrid";
  classLevel: ("10th" | "12th")[];
  careerInterests: string[];
  benefits: string[];
  applyLink: string;
  verified: boolean;
}

export interface SchoolProject {
  id: string;
  title: string;
  description: string;
  classLevel: ("10th" | "12th")[];
  difficulty: "easy" | "medium" | "hard";
  timeRequired: string;
  skillsGained: string[];
  careerInterests: string[];
  presentationFormat: string[];
  materials: string[];
}

export interface Competition {
  id: string;
  title: string;
  organizer: string;
  description: string;
  eligibility: ("10th" | "12th")[];
  mode: "online" | "offline" | "hybrid";
  registrationDeadline: string;
  fee: "free" | "low-cost";
  category: "olympiad" | "coding" | "science" | "essay" | "quiz" | "other";
  careerInterests: string[];
  officialLink: string;
  verified: boolean;
}

// Sample Data
export const internships: Internship[] = [
  {
    id: "content-writing-intern",
    title: "Content Writing Intern",
    organization: "Various Startups (via Internshala)",
    description: "Write blog posts, social media content, and articles. Perfect for students who love writing.",
    duration: "1-2 months",
    skills: ["Writing", "Research", "Creativity"],
    certificate: true,
    mode: "online",
    classLevel: ["10th", "12th"],
    careerInterests: ["content-writer", "digital-marketing", "lawyer"],
    timeCommitment: "5-10 hrs/week",
    applyLink: "https://internshala.com/",
    verified: true,
  },
  {
    id: "social-media-assistant",
    title: "Social Media Assistant",
    organization: "Small Businesses & NGOs",
    description: "Help manage Instagram, Facebook pages. Create simple posts and engage with followers.",
    duration: "1-3 months",
    skills: ["Social Media", "Communication", "Creativity"],
    certificate: true,
    mode: "online",
    classLevel: ["10th", "12th"],
    careerInterests: ["digital-marketing", "graphic-designer", "content-writer"],
    timeCommitment: "3-5 hrs/week",
    applyLink: "https://internshala.com/",
    verified: true,
  },
  {
    id: "data-entry-intern",
    title: "Data Entry & Research Intern",
    organization: "Research Organizations",
    description: "Help with data collection, entry, and basic research tasks using spreadsheets.",
    duration: "1-2 months",
    skills: ["Excel", "Attention to Detail", "Research"],
    certificate: true,
    mode: "online",
    classLevel: ["10th", "12th"],
    careerInterests: ["data-analyst", "business-analyst", "tally-gst-executive"],
    timeCommitment: "5-8 hrs/week",
    applyLink: "https://internshala.com/",
    verified: true,
  },
  {
    id: "basic-coding-intern",
    title: "Basic Coding Intern",
    organization: "Ed-Tech Startups",
    description: "Learn and practice basic coding while helping with simple development tasks.",
    duration: "2-3 months",
    skills: ["HTML/CSS", "Basic JavaScript", "Problem Solving"],
    certificate: true,
    mode: "online",
    classLevel: ["12th"],
    careerInterests: ["software-engineer", "web-developer", "python-developer"],
    timeCommitment: "8-10 hrs/week",
    applyLink: "https://internshala.com/",
    verified: true,
  },
  {
    id: "graphic-design-intern",
    title: "Graphic Design Intern",
    organization: "Design Studios & Startups",
    description: "Create social media graphics, banners, and simple designs using Canva or similar tools.",
    duration: "1-2 months",
    skills: ["Canva", "Creativity", "Visual Design"],
    certificate: true,
    mode: "online",
    classLevel: ["10th", "12th"],
    careerInterests: ["graphic-designer", "ui-ux-designer", "video-editor"],
    timeCommitment: "5-8 hrs/week",
    applyLink: "https://internshala.com/",
    verified: true,
  },
  {
    id: "video-editing-intern",
    title: "Video Editing Intern",
    organization: "YouTube Channels & Content Creators",
    description: "Help edit videos, add subtitles, and create short clips for social media.",
    duration: "1-2 months",
    skills: ["Video Editing", "Creativity", "Storytelling"],
    certificate: true,
    mode: "online",
    classLevel: ["10th", "12th"],
    careerInterests: ["video-editor", "animation-artist", "digital-marketing"],
    timeCommitment: "6-10 hrs/week",
    applyLink: "https://internshala.com/",
    verified: true,
  },
];

export const volunteering: Volunteering[] = [
  {
    id: "teach-india",
    title: "Teach India - Education Volunteer",
    organization: "Teach India (Times of India)",
    cause: "education",
    description: "Teach underprivileged children in your community. Make a difference through education.",
    roleDescription: "Conduct weekend classes, help with homework, teach basic English and Math.",
    timeCommitment: "2-4 hrs/week",
    location: "Multiple Cities",
    mode: "offline",
    classLevel: ["10th", "12th"],
    careerInterests: ["teacher", "ias-officer", "lawyer"],
    benefits: ["Social responsibility", "Teaching experience", "Certificate", "College applications"],
    applyLink: "https://www.teachindia.net/",
    verified: true,
  },
  {
    id: "nss-volunteer",
    title: "NSS (National Service Scheme)",
    organization: "Government of India",
    cause: "other",
    description: "Join NSS in your school/college for community service and nation building.",
    roleDescription: "Participate in camps, cleanliness drives, health awareness programs.",
    timeCommitment: "2-3 hrs/week",
    location: "Your School/College",
    mode: "offline",
    classLevel: ["10th", "12th"],
    careerInterests: ["ias-officer", "teacher", "police-constable"],
    benefits: ["Grace marks", "Certificate", "Leadership skills", "Social awareness"],
    applyLink: "https://nss.gov.in/",
    verified: true,
  },
  {
    id: "online-tutor-volunteer",
    title: "Online Tutoring Volunteer",
    organization: "Various NGOs",
    cause: "education",
    description: "Teach students from rural areas online. Help bridge the education gap.",
    roleDescription: "Conduct online classes via Zoom/Google Meet for students in need.",
    timeCommitment: "2-3 hrs/week",
    location: "Online",
    mode: "online",
    classLevel: ["10th", "12th"],
    careerInterests: ["teacher", "software-engineer", "doctor"],
    benefits: ["Teaching skills", "Communication skills", "Certificate", "Social impact"],
    applyLink: "https://www.pratham.org/",
    verified: true,
  },
  {
    id: "green-earth-volunteer",
    title: "Environmental Volunteer",
    organization: "WWF India / Local NGOs",
    cause: "environment",
    description: "Participate in tree plantation, clean-up drives, and environmental awareness campaigns.",
    roleDescription: "Organize or join plantation drives, spread awareness about environment.",
    timeCommitment: "3-4 hrs/week",
    location: "Your City",
    mode: "hybrid",
    classLevel: ["10th", "12th"],
    careerInterests: ["civil-engineer", "ias-officer", "teacher"],
    benefits: ["Environmental awareness", "Teamwork", "Certificate", "Community service"],
    applyLink: "https://www.wwfindia.org/",
    verified: true,
  },
  {
    id: "health-awareness-volunteer",
    title: "Health Awareness Volunteer",
    organization: "Red Cross India",
    cause: "health",
    description: "Help spread awareness about health, hygiene, and first aid in communities.",
    roleDescription: "Conduct health camps, distribute information, assist in blood donation drives.",
    timeCommitment: "3-5 hrs/week",
    location: "Your City",
    mode: "offline",
    classLevel: ["10th", "12th"],
    careerInterests: ["doctor", "paramedical-courses", "lab-technician"],
    benefits: ["Medical exposure", "First aid training", "Certificate", "Social service"],
    applyLink: "https://www.indianredcross.org/",
    verified: true,
  },
  {
    id: "rural-development-volunteer",
    title: "Rural Development Volunteer",
    organization: "Smile Foundation",
    cause: "rural-development",
    description: "Work with rural communities on education, health, and livelihood programs.",
    roleDescription: "Participate in village visits, surveys, and community development activities.",
    timeCommitment: "Weekend programs",
    location: "Rural Areas",
    mode: "offline",
    classLevel: ["12th"],
    careerInterests: ["ias-officer", "teacher", "bank-po"],
    benefits: ["Rural exposure", "Leadership", "Certificate", "Social awareness"],
    applyLink: "https://www.smilefoundationindia.org/",
    verified: true,
  },
];

export const schoolProjects: SchoolProject[] = [
  {
    id: "community-survey",
    title: "Community Survey on Career Awareness",
    description: "Conduct a survey in your neighborhood about career options students know about.",
    classLevel: ["10th", "12th"],
    difficulty: "easy",
    timeRequired: "1-2 weeks",
    skillsGained: ["Research", "Communication", "Data Analysis", "Report Writing"],
    careerInterests: ["ias-officer", "data-analyst", "business-analyst"],
    presentationFormat: ["Report", "PPT", "Charts"],
    materials: ["Questionnaire", "Notebook", "Calculator"],
  },
  {
    id: "simple-website",
    title: "Personal Portfolio Website",
    description: "Create a simple website about yourself using HTML/CSS. No coding experience needed!",
    classLevel: ["10th", "12th"],
    difficulty: "medium",
    timeRequired: "2-3 weeks",
    skillsGained: ["HTML", "CSS", "Web Design", "Creativity"],
    careerInterests: ["software-engineer", "web-developer", "ui-ux-designer"],
    presentationFormat: ["Live Website", "PPT", "Demo"],
    materials: ["Computer", "Internet", "Free hosting (GitHub Pages)"],
  },
  {
    id: "environmental-study",
    title: "Local Environmental Study",
    description: "Study pollution levels, tree cover, or waste management in your area.",
    classLevel: ["10th", "12th"],
    difficulty: "medium",
    timeRequired: "2-4 weeks",
    skillsGained: ["Research", "Data Collection", "Analysis", "Environmental Awareness"],
    careerInterests: ["civil-engineer", "ias-officer", "teacher"],
    presentationFormat: ["Report", "PPT", "Model/Chart"],
    materials: ["Camera", "Notebook", "Measuring tools"],
  },
  {
    id: "mini-app-project",
    title: "Simple Calculator App",
    description: "Build a basic calculator using Python or JavaScript. Great for beginners!",
    classLevel: ["12th"],
    difficulty: "medium",
    timeRequired: "1-2 weeks",
    skillsGained: ["Programming Logic", "Python/JavaScript", "Problem Solving"],
    careerInterests: ["software-engineer", "python-developer", "data-analyst"],
    presentationFormat: ["Working App", "Code Demo", "PPT"],
    materials: ["Computer", "Python/VS Code", "Internet"],
  },
  {
    id: "social-awareness-campaign",
    title: "Social Awareness Campaign",
    description: "Create posters, videos, or presentations about important social issues.",
    classLevel: ["10th", "12th"],
    difficulty: "easy",
    timeRequired: "1-2 weeks",
    skillsGained: ["Communication", "Design", "Social Awareness", "Creativity"],
    careerInterests: ["graphic-designer", "content-writer", "teacher"],
    presentationFormat: ["Posters", "Video", "PPT"],
    materials: ["Paper/Canva", "Camera/Phone", "Creativity"],
  },
  {
    id: "science-working-model",
    title: "Working Science Model",
    description: "Build a working model demonstrating scientific principles (solar system, circuits, etc.)",
    classLevel: ["10th"],
    difficulty: "medium",
    timeRequired: "2-3 weeks",
    skillsGained: ["Scientific Thinking", "Hands-on Skills", "Creativity", "Presentation"],
    careerInterests: ["civil-engineer", "doctor", "lab-technician"],
    presentationFormat: ["Working Model", "Report", "Demo"],
    materials: ["Craft materials", "Basic electronics", "Instructions"],
  },
  {
    id: "budget-tracker-excel",
    title: "Personal Budget Tracker in Excel",
    description: "Create a spreadsheet to track monthly expenses and savings.",
    classLevel: ["10th", "12th"],
    difficulty: "easy",
    timeRequired: "1 week",
    skillsGained: ["Excel", "Financial Planning", "Data Organization"],
    careerInterests: ["chartered-accountant", "tally-gst-executive", "bank-po"],
    presentationFormat: ["Excel File", "PPT", "Report"],
    materials: ["Computer", "MS Excel/Google Sheets"],
  },
  {
    id: "interview-video",
    title: "Career Interview Video",
    description: "Interview a professional in a career you're interested in and create a short video.",
    classLevel: ["10th", "12th"],
    difficulty: "medium",
    timeRequired: "2 weeks",
    skillsGained: ["Communication", "Video Editing", "Research", "Interview Skills"],
    careerInterests: ["video-editor", "content-writer", "digital-marketing"],
    presentationFormat: ["Video", "Report", "PPT"],
    materials: ["Phone/Camera", "Video editing app", "Questions list"],
  },
];

export const competitions: Competition[] = [
  {
    id: "ntse",
    title: "NTSE (National Talent Search Exam)",
    organizer: "NCERT",
    description: "Prestigious scholarship exam for Class 10 students. Tests mental ability and scholastic aptitude.",
    eligibility: ["10th"],
    mode: "offline",
    registrationDeadline: "August-September",
    fee: "free",
    category: "olympiad",
    careerInterests: ["ias-officer", "doctor", "software-engineer"],
    officialLink: "https://ncert.nic.in/national-talent-examination.php",
    verified: true,
  },
  {
    id: "kvpy",
    title: "INSPIRE Awards - MANAK",
    organizer: "DST, Government of India",
    description: "National program to identify and nurture young scientific talent with innovative ideas.",
    eligibility: ["10th", "12th"],
    mode: "hybrid",
    registrationDeadline: "September-October",
    fee: "free",
    category: "science",
    careerInterests: ["doctor", "civil-engineer", "lab-technician"],
    officialLink: "https://www.inspireawards-dst.gov.in/",
    verified: true,
  },
  {
    id: "sof-olympiad",
    title: "SOF Science Olympiad",
    organizer: "Science Olympiad Foundation",
    description: "International olympiad for science enthusiasts. Tests scientific knowledge and reasoning.",
    eligibility: ["10th", "12th"],
    mode: "offline",
    registrationDeadline: "July-August",
    fee: "low-cost",
    category: "olympiad",
    careerInterests: ["doctor", "civil-engineer", "lab-technician"],
    officialLink: "https://sofworld.org/",
    verified: true,
  },
  {
    id: "codechef-starters",
    title: "CodeChef Starters (Beginner)",
    organizer: "CodeChef",
    description: "Weekly online coding contests for beginners. Great way to start competitive programming.",
    eligibility: ["10th", "12th"],
    mode: "online",
    registrationDeadline: "Every Week",
    fee: "free",
    category: "coding",
    careerInterests: ["software-engineer", "python-developer", "data-analyst"],
    officialLink: "https://www.codechef.com/",
    verified: true,
  },
  {
    id: "hackerrank-challenges",
    title: "HackerRank Challenges",
    organizer: "HackerRank",
    description: "Practice coding problems and participate in challenges. Earn certificates and badges.",
    eligibility: ["10th", "12th"],
    mode: "online",
    registrationDeadline: "Always Open",
    fee: "free",
    category: "coding",
    careerInterests: ["software-engineer", "python-developer", "web-developer"],
    officialLink: "https://www.hackerrank.com/",
    verified: true,
  },
  {
    id: "science-fair",
    title: "CBSE Science Exhibition",
    organizer: "CBSE",
    description: "Annual science exhibition for students to showcase innovative projects and models.",
    eligibility: ["10th", "12th"],
    mode: "offline",
    registrationDeadline: "School Level: August",
    fee: "free",
    category: "science",
    careerInterests: ["civil-engineer", "doctor", "lab-technician"],
    officialLink: "https://www.cbse.gov.in/",
    verified: true,
  },
  {
    id: "essay-competition",
    title: "National Essay Competition",
    organizer: "Various (Gandhi Jayanti, Republic Day)",
    description: "Essay writing competitions on national topics. Tests writing and critical thinking.",
    eligibility: ["10th", "12th"],
    mode: "hybrid",
    registrationDeadline: "Varies by event",
    fee: "free",
    category: "essay",
    careerInterests: ["lawyer", "content-writer", "ias-officer"],
    officialLink: "https://www.mygov.in/",
    verified: true,
  },
  {
    id: "quiz-competitions",
    title: "Quiz Competitions (Bournvita, Tata)",
    organizer: "Various Brands",
    description: "Popular quiz competitions testing general knowledge and current affairs.",
    eligibility: ["10th", "12th"],
    mode: "offline",
    registrationDeadline: "School Registrations",
    fee: "free",
    category: "quiz",
    careerInterests: ["ias-officer", "teacher", "lawyer"],
    officialLink: "https://www.tatabuildingschools.com/",
    verified: true,
  },
  {
    id: "google-code-to-learn",
    title: "Google Code to Learn",
    organizer: "Google India",
    description: "Coding contest for school students organized by Google. Learn and win prizes!",
    eligibility: ["10th", "12th"],
    mode: "online",
    registrationDeadline: "October-November",
    fee: "free",
    category: "coding",
    careerInterests: ["software-engineer", "python-developer", "ai-ml-assistant"],
    officialLink: "https://codetolearn.withgoogle.com/",
    verified: true,
  },
];

// Helper function to get opportunities related to a career
export const getRelatedOpportunities = (careerId: string) => {
  const relatedInternships = internships.filter(i => i.careerInterests.includes(careerId)).slice(0, 2);
  const relatedVolunteering = volunteering.filter(v => v.careerInterests.includes(careerId)).slice(0, 2);
  const relatedProjects = schoolProjects.filter(p => p.careerInterests.includes(careerId)).slice(0, 2);
  const relatedCompetitions = competitions.filter(c => c.careerInterests.includes(careerId)).slice(0, 2);
  
  return {
    internships: relatedInternships,
    volunteering: relatedVolunteering,
    projects: relatedProjects,
    competitions: relatedCompetitions,
  };
};

// Filter options
export const careerInterestOptions = [
  { value: "software-engineer", label: "Software Engineering" },
  { value: "doctor", label: "Medical / Healthcare" },
  { value: "civil-engineer", label: "Civil Engineering" },
  { value: "chartered-accountant", label: "Finance / Accounting" },
  { value: "ias-officer", label: "Civil Services / Government" },
  { value: "teacher", label: "Teaching / Education" },
  { value: "graphic-designer", label: "Design / Creative" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "content-writer", label: "Writing / Content" },
  { value: "data-analyst", label: "Data / Analytics" },
];

export const causeLabels: Record<string, string> = {
  "education": "📚 Education",
  "environment": "🌱 Environment",
  "health": "🏥 Health",
  "rural-development": "🏘️ Rural Development",
  "other": "🤝 Community Service",
};
