export interface SkillResource {
  name: string;
  url: string;
  platform: string;
}

export interface CareerSkill {
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeRequired: string;
  resources: SkillResource[];
}

export interface CareerSkillCategory {
  category: string;
  icon: string;
  skills: CareerSkill[];
}

export interface CareerSkillsData {
  [careerId: string]: CareerSkillCategory[];
}

export const careerSkillsData: CareerSkillsData = {
  "software-engineer": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Python Programming",
          description: "Foundation for software development, automation, and AI",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Python for Everybody", url: "https://www.youtube.com/watch?v=8DvywoWv6fI", platform: "YouTube" },
            { name: "NPTEL Python", url: "https://nptel.ac.in/courses/106106182", platform: "NPTEL" },
            { name: "CS50 Python", url: "https://www.youtube.com/watch?v=OvKCESUCWII", platform: "YouTube" },
          ],
        },
        {
          name: "Data Structures & Algorithms",
          description: "Essential for cracking coding interviews and building efficient software",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "DSA Full Course", url: "https://www.youtube.com/watch?v=8hly31xKli0", platform: "YouTube" },
            { name: "NPTEL DSA", url: "https://nptel.ac.in/courses/106102064", platform: "NPTEL" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Technical Writing",
          description: "Document code, write clear emails, and explain complex concepts",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Google Technical Writing", url: "https://developers.google.com/tech-writing", platform: "Google" },
            { name: "Technical Writing Course", url: "https://www.youtube.com/watch?v=qlwh3aW0OKk", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Logical Thinking",
          description: "Break down complex problems into smaller, manageable parts",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Problem Solving Course", url: "https://www.coursera.org/learn/computational-thinking-problem-solving", platform: "Coursera (Free Audit)" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Aptitude for Tech Interviews",
          description: "Prepare for placement tests and coding assessments",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Aptitude Preparation", url: "https://www.youtube.com/watch?v=PKPOeVrAzOE", platform: "YouTube" },
            { name: "IndiaBix Aptitude", url: "https://www.indiabix.com/", platform: "IndiaBix" },
          ],
        },
      ],
    },
  ],

  "doctor": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Medical Software Basics",
          description: "Learn to use hospital management systems and medical databases",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Healthcare IT Basics", url: "https://www.youtube.com/watch?v=6F8eXMLwN1s", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Patient Communication",
          description: "Explain medical conditions clearly to patients and families",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Doctor-Patient Communication", url: "https://www.youtube.com/watch?v=2MQdU1vrlLQ", platform: "YouTube" },
            { name: "SWAYAM Communication", url: "https://swayam.gov.in/", platform: "SWAYAM" },
          ],
        },
        {
          name: "Medical English",
          description: "Master medical terminology and professional communication",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Medical English", url: "https://www.youtube.com/watch?v=xrFEO1KiJms", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Clinical Reasoning",
          description: "Develop diagnostic thinking and treatment planning skills",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Clinical Reasoning Basics", url: "https://www.youtube.com/watch?v=Lg2Q8mJrxuA", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "NEET Preparation",
          description: "Build strong aptitude for medical entrance exams",
          difficulty: "Beginner",
          timeRequired: "1-2 years",
          resources: [
            { name: "NEET Free Classes", url: "https://www.youtube.com/c/PhysicsWallah", platform: "YouTube" },
            { name: "NCERT Solutions", url: "https://ncert.nic.in/", platform: "NCERT" },
          ],
        },
      ],
    },
  ],

  "civil-engineer": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "AutoCAD",
          description: "Essential software for civil engineering drawings and designs",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "AutoCAD Tutorial", url: "https://www.youtube.com/watch?v=VtLXKU1PpRU", platform: "YouTube" },
            { name: "NPTEL CAD", url: "https://nptel.ac.in/courses/112104235", platform: "NPTEL" },
          ],
        },
        {
          name: "STAAD Pro Basics",
          description: "Structural analysis software for building design",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "STAAD Pro Tutorial", url: "https://www.youtube.com/watch?v=1v2MFAj5pvs", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Engineering Drawing",
          description: "Create technical drawings for construction projects",
          difficulty: "Beginner",
          timeRequired: "3 months",
          resources: [
            { name: "Engineering Drawing", url: "https://nptel.ac.in/courses/112103019", platform: "NPTEL" },
            { name: "Drawing Basics", url: "https://www.youtube.com/watch?v=3fGpR6nHP60", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Structural Analysis",
          description: "Analyze forces and design safe structures",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "NPTEL Structural Analysis", url: "https://nptel.ac.in/courses/105106113", platform: "NPTEL" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "GATE Preparation",
          description: "Prepare for GATE Civil Engineering exam",
          difficulty: "Beginner",
          timeRequired: "6-12 months",
          resources: [
            { name: "GATE Civil Free", url: "https://www.youtube.com/watch?v=8RvFMDM4lJM", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "chartered-accountant": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Tally ERP",
          description: "Industry-standard accounting software for businesses",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Tally Complete Course", url: "https://www.youtube.com/watch?v=Xcc9C3W4Xv0", platform: "YouTube" },
            { name: "Tally Official", url: "https://tallysolutions.com/learning-hub/", platform: "Tally" },
          ],
        },
        {
          name: "Excel for Finance",
          description: "Advanced Excel for financial modeling and analysis",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Excel for Finance", url: "https://www.youtube.com/watch?v=Vl0H-qTclOg", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Business Communication",
          description: "Professional writing and presentation skills for clients",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Business Communication", url: "https://swayam.gov.in/", platform: "SWAYAM" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Financial Problem Solving",
          description: "Analyze financial statements and solve accounting problems",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Accounting Basics", url: "https://www.youtube.com/watch?v=yYX4bvQSqbo", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "CA Foundation Aptitude",
          description: "Prepare for CA Foundation exam mathematics and reasoning",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "CA Foundation Free", url: "https://www.youtube.com/watch?v=LHKZLy_pWlo", platform: "YouTube" },
            { name: "ICAI Learning", url: "https://bos.icai.org/", platform: "ICAI" },
          ],
        },
      ],
    },
  ],

  "bank-po": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Banking Software Basics",
          description: "Understand core banking systems and operations",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Banking Basics", url: "https://www.youtube.com/watch?v=xcGMU2YNeDU", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "English for Banking",
          description: "Grammar, comprehension, and professional English",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Bank English", url: "https://www.youtube.com/watch?v=xt5zt4Ggz4k", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Quantitative Aptitude",
          description: "Speed math and problem-solving for bank exams",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "Bank Maths", url: "https://www.youtube.com/watch?v=5mLk0f5qGjc", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Reasoning for Bank Exams",
          description: "Logical reasoning and puzzles for IBPS/SBI exams",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Reasoning Complete", url: "https://www.youtube.com/watch?v=qZ3yD7ZxvjQ", platform: "YouTube" },
            { name: "IBPS Free Prep", url: "https://www.ibps.in/", platform: "IBPS" },
          ],
        },
      ],
    },
  ],

  "ias-officer": [
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Essay Writing",
          description: "Write structured essays on social, political, and economic topics",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "UPSC Essay Writing", url: "https://www.youtube.com/watch?v=0L8sE7mxK9Y", platform: "YouTube" },
          ],
        },
        {
          name: "Interview Skills",
          description: "Prepare for UPSC personality test and interviews",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "IAS Interview Prep", url: "https://www.youtube.com/watch?v=RiQcMxW9jgI", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Case Study Analysis",
          description: "Analyze governance issues and propose solutions",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Ethics Case Studies", url: "https://www.youtube.com/watch?v=cMmHxmLxFzM", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "CSAT Preparation",
          description: "Clear UPSC Prelims CSAT with aptitude and reasoning",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "CSAT Free Course", url: "https://www.youtube.com/watch?v=gGjTG2OJ0Aw", platform: "YouTube" },
            { name: "UPSC Official", url: "https://www.upsc.gov.in/", platform: "UPSC" },
          ],
        },
      ],
    },
  ],

  "lawyer": [
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Legal Writing",
          description: "Draft legal documents, petitions, and contracts",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Legal Writing Basics", url: "https://www.youtube.com/watch?v=sTBZzR8wWqE", platform: "YouTube" },
          ],
        },
        {
          name: "Public Speaking & Debate",
          description: "Develop argumentation and courtroom speaking skills",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Public Speaking", url: "https://www.youtube.com/watch?v=tShavGuo0_E", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Legal Reasoning",
          description: "Analyze cases and apply legal principles",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "Legal Reasoning for CLAT", url: "https://www.youtube.com/watch?v=RQmZJGBp8_8", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "CLAT Preparation",
          description: "Prepare for law entrance exam with reasoning and GK",
          difficulty: "Beginner",
          timeRequired: "6-12 months",
          resources: [
            { name: "CLAT Free Prep", url: "https://www.youtube.com/watch?v=K9YZj7dR4SI", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "electrician": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Electrical Circuit Basics",
          description: "Understand circuits, voltage, current, and resistance",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Electrical Basics", url: "https://www.youtube.com/watch?v=mc979OhitAg", platform: "YouTube" },
            { name: "NPTEL Electrical", url: "https://nptel.ac.in/courses/108102042", platform: "NPTEL" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Troubleshooting",
          description: "Diagnose and fix electrical faults safely",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Electrical Troubleshooting", url: "https://www.youtube.com/watch?v=6Maq5IyHSuc", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "mechanic": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Vehicle Systems",
          description: "Understand engine, transmission, and brake systems",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "Auto Mechanic Basics", url: "https://www.youtube.com/watch?v=pAOtFaMqr54", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Diagnostic Skills",
          description: "Identify and fix vehicle problems efficiently",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Vehicle Diagnostics", url: "https://www.youtube.com/watch?v=9BIjKvDyeJY", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "web-developer": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "HTML & CSS",
          description: "Build the structure and design of websites",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "HTML CSS Full Course", url: "https://www.youtube.com/watch?v=mU6anWqZJcc", platform: "YouTube" },
            { name: "W3Schools", url: "https://www.w3schools.com/html/", platform: "W3Schools" },
          ],
        },
        {
          name: "JavaScript",
          description: "Add interactivity and functionality to websites",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "JavaScript Tutorial", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "UI/UX Basics",
          description: "Create user-friendly and visually appealing websites",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "UI/UX for Web", url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Debugging",
          description: "Find and fix errors in your code",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Debugging Tips", url: "https://www.youtube.com/watch?v=H0XScE08hy8", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "teacher": [
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Classroom Communication",
          description: "Explain concepts clearly to students of all levels",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Teaching Skills", url: "https://www.youtube.com/watch?v=UCFg9bcW7Bk", platform: "YouTube" },
            { name: "SWAYAM Teaching", url: "https://swayam.gov.in/", platform: "SWAYAM" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Lesson Planning",
          description: "Create engaging and effective lesson plans",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Lesson Planning", url: "https://www.youtube.com/watch?v=s6TgN3-K5og", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "digital-marketing": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Google Analytics",
          description: "Track and analyze website traffic and user behavior",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Google Analytics Course", url: "https://skillshop.withgoogle.com/", platform: "Google Skillshop" },
          ],
        },
        {
          name: "SEO Basics",
          description: "Optimize websites to rank higher in search results",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "SEO Tutorial", url: "https://www.youtube.com/watch?v=xsVTqzratPs", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Content Creation",
          description: "Create engaging posts, graphics, and videos",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Canva Tutorial", url: "https://www.youtube.com/watch?v=zJSgUx5K6V0", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "diploma-engineering": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Engineering Drawing",
          description: "Create technical drawings using standards",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Engineering Drawing", url: "https://nptel.ac.in/courses/112103019", platform: "NPTEL" },
          ],
        },
        {
          name: "Basic Workshop Practice",
          description: "Learn fitting, welding, and machining basics",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Workshop Practice", url: "https://www.youtube.com/watch?v=sFR3lmnq5Ec", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Polytechnic Entrance Prep",
          description: "Prepare for state polytechnic entrance exams",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "Polytechnic Prep", url: "https://www.youtube.com/watch?v=3OdGC-cB0G0", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "iti-electrician": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Electrical Wiring",
          description: "Domestic and industrial wiring techniques",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "Electrical Wiring", url: "https://www.youtube.com/watch?v=mc979OhitAg", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Electrical Safety",
          description: "Follow safety protocols while working with electricity",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Electrical Safety", url: "https://www.youtube.com/watch?v=xP2AyhxPuEI", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "polytechnic-mechanical": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "AutoCAD for Mechanical",
          description: "Create 2D and 3D mechanical drawings",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "AutoCAD Mechanical", url: "https://www.youtube.com/watch?v=VtLXKU1PpRU", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Machine Shop Basics",
          description: "Operate lathe, milling, and drilling machines",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "Machine Shop", url: "https://www.youtube.com/watch?v=q8wNlRH_BW0", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "diploma-computer-applications": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "MS Office Suite",
          description: "Master Word, Excel, and PowerPoint",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "MS Office Complete", url: "https://www.youtube.com/watch?v=9-7V8spCfZ4", platform: "YouTube" },
          ],
        },
        {
          name: "Basic Programming",
          description: "Learn C programming fundamentals",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "C Programming", url: "https://www.youtube.com/watch?v=KJgsSFOSQv0", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "paramedical-courses": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Medical Equipment Operation",
          description: "Learn to operate X-ray, ECG, and lab equipment",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "Medical Equipment Basics", url: "https://www.youtube.com/watch?v=FbjWxB0TXIY", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Patient Interaction",
          description: "Communicate with patients professionally and empathetically",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Healthcare Communication", url: "https://www.youtube.com/watch?v=2MQdU1vrlLQ", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "indian-army-soldier": [
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Physical Fitness Training",
          description: "Build strength, endurance, and agility for army tests",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "Army Physical Training", url: "https://www.youtube.com/watch?v=C8wOs7C0Jhk", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Army Written Exam Prep",
          description: "Prepare for GD written test with GK and maths",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Army GD Prep", url: "https://www.youtube.com/watch?v=KV_h6cBDYfs", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "indian-navy-mr": [
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Physical & Swimming Training",
          description: "Prepare for navy physical tests including swimming",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "Navy Physical Prep", url: "https://www.youtube.com/watch?v=K8xL8Vm-QI4", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Navy MR Exam Prep",
          description: "Mathematics, science, and GK for MR exam",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Navy MR Prep", url: "https://www.youtube.com/watch?v=eo0jD_2LrNw", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "railway-group-d": [
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Physical Fitness",
          description: "Prepare for railway PET requirements",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Railway Physical Prep", url: "https://www.youtube.com/watch?v=9tN8v9vYYkE", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "RRB Group D Exam Prep",
          description: "Maths, reasoning, and GK for railway exams",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "RRB Group D", url: "https://www.youtube.com/watch?v=1cXJLqFDxTY", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "police-constable": [
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Physical Training",
          description: "Running, endurance, and fitness for police tests",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "Police Physical Prep", url: "https://www.youtube.com/watch?v=EJ8r-4N0P8Y", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Police Exam Prep",
          description: "GK, maths, and reasoning for state police exams",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "Police Constable Prep", url: "https://www.youtube.com/watch?v=TQn1mFz-v7E", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "home-guard": [
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Basic First Aid",
          description: "Learn emergency first aid and rescue techniques",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "First Aid Basics", url: "https://www.youtube.com/watch?v=BQNNOh8c8ks", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Community Communication",
          description: "Interact effectively with public during emergencies",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Public Speaking Basics", url: "https://www.youtube.com/watch?v=tShavGuo0_E", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "data-analyst": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Excel Advanced",
          description: "Master pivot tables, VLOOKUP, and data analysis",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Excel for Data Analysis", url: "https://www.youtube.com/watch?v=opJgMj1IUrc", platform: "YouTube" },
          ],
        },
        {
          name: "SQL Basics",
          description: "Query databases to extract and analyze data",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "SQL Tutorial", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", platform: "YouTube" },
          ],
        },
        {
          name: "Python for Data Analysis",
          description: "Use Pandas and NumPy for data manipulation",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Python Data Analysis", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Data Visualization",
          description: "Create charts and dashboards to present insights",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Data Viz with Tableau", url: "https://www.youtube.com/watch?v=TPMlZxRRaBQ", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "python-developer": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Python Programming",
          description: "Master Python syntax, functions, and OOP",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Python Full Course", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", platform: "YouTube" },
            { name: "NPTEL Python", url: "https://nptel.ac.in/courses/106106182", platform: "NPTEL" },
          ],
        },
        {
          name: "API Development",
          description: "Build REST APIs using Flask or FastAPI",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "Flask Tutorial", url: "https://www.youtube.com/watch?v=Z1RJmh_OqeA", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Debugging & Testing",
          description: "Write test cases and debug Python applications",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Python Testing", url: "https://www.youtube.com/watch?v=6tNS--WetLI", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "lab-technician": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Lab Equipment Handling",
          description: "Operate microscopes, centrifuges, and analyzers",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "Lab Equipment Guide", url: "https://www.youtube.com/watch?v=kFNO-VGHGQY", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Problem-Solving Skills",
      icon: "🧩",
      skills: [
        {
          name: "Sample Testing Procedures",
          description: "Learn blood, urine, and tissue testing protocols",
          difficulty: "Beginner",
          timeRequired: "3-6 months",
          resources: [
            { name: "Lab Testing Basics", url: "https://www.youtube.com/watch?v=yZLOKS_7bT4", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "ai-ml-assistant": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Python for ML",
          description: "Use Python libraries for machine learning",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "ML with Python", url: "https://www.youtube.com/watch?v=7eh4d6sabA0", platform: "YouTube" },
          ],
        },
        {
          name: "Machine Learning Basics",
          description: "Understand algorithms like regression and classification",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "ML Course Free", url: "https://www.coursera.org/learn/machine-learning", platform: "Coursera (Free Audit)" },
            { name: "NPTEL ML", url: "https://nptel.ac.in/courses/106106139", platform: "NPTEL" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Statistics & Probability",
          description: "Foundation for understanding ML algorithms",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "Statistics for ML", url: "https://www.youtube.com/watch?v=xxpc-HPKN28", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "cloud-computing-associate": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "AWS/Azure Basics",
          description: "Learn cloud fundamentals and services",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "AWS Free Training", url: "https://aws.amazon.com/training/", platform: "AWS" },
            { name: "Azure Fundamentals", url: "https://www.youtube.com/watch?v=NKEFWyqJ5XA", platform: "YouTube" },
          ],
        },
        {
          name: "Linux Basics",
          description: "Command line and server management",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Linux Tutorial", url: "https://www.youtube.com/watch?v=wBp0Rb-ZJak", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "digital-marketer": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Google Ads",
          description: "Create and manage paid advertising campaigns",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Google Ads Certification", url: "https://skillshop.withgoogle.com/", platform: "Google Skillshop" },
          ],
        },
        {
          name: "Social Media Marketing",
          description: "Grow brands on Instagram, Facebook, and LinkedIn",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Social Media Marketing", url: "https://www.youtube.com/watch?v=9ZlEhHvLjJQ", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Canva for Marketing",
          description: "Create professional graphics and social media posts",
          difficulty: "Beginner",
          timeRequired: "2 weeks",
          resources: [
            { name: "Canva Tutorial", url: "https://www.youtube.com/watch?v=zJSgUx5K6V0", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "tally-gst-executive": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Tally Prime",
          description: "Master accounting software for business",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "Tally Prime Course", url: "https://www.youtube.com/watch?v=Xcc9C3W4Xv0", platform: "YouTube" },
          ],
        },
        {
          name: "GST Filing",
          description: "Learn GST returns and compliance",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "GST Tutorial", url: "https://www.youtube.com/watch?v=KQvK-2_2s0k", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "business-analyst": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Excel & Data Tools",
          description: "Analyze business data with advanced Excel",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Excel for Business", url: "https://www.youtube.com/watch?v=opJgMj1IUrc", platform: "YouTube" },
          ],
        },
        {
          name: "SQL for Business",
          description: "Query databases for business insights",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "SQL Tutorial", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Business Presentation",
          description: "Present findings effectively to stakeholders",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Business Presentations", url: "https://www.youtube.com/watch?v=i68a6M5FFBc", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "financial-modeling-analyst": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Excel Financial Modeling",
          description: "Build financial models for valuation and planning",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Financial Modeling", url: "https://www.youtube.com/watch?v=y5wPj2Tk5Ao", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Aptitude & Logical Thinking",
      icon: "🧠",
      skills: [
        {
          name: "Financial Statement Analysis",
          description: "Analyze income statements and balance sheets",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "Financial Analysis", url: "https://www.youtube.com/watch?v=WEDIj9JBTC8", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "banking-operations-executive": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Core Banking Systems",
          description: "Understand banking software and operations",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "Banking Operations", url: "https://www.youtube.com/watch?v=xcGMU2YNeDU", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "Customer Service",
          description: "Handle customer queries professionally",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Customer Service Skills", url: "https://www.youtube.com/watch?v=DNRCqSXqpKk", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "graphic-designer": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Adobe Photoshop",
          description: "Edit images and create digital graphics",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Photoshop Tutorial", url: "https://www.youtube.com/watch?v=IyR_uYsRdPs", platform: "YouTube" },
          ],
        },
        {
          name: "Adobe Illustrator",
          description: "Create vector graphics and logos",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Illustrator Tutorial", url: "https://www.youtube.com/watch?v=Ib8UBwu3yGA", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Color Theory & Typography",
          description: "Understand design principles for better visuals",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Design Principles", url: "https://www.youtube.com/watch?v=_2LLXnUdUIc", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "ui-ux-designer": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Figma",
          description: "Design user interfaces and prototypes",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "Figma Tutorial", url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "User Research",
          description: "Understand user needs and behaviors",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "UX Research", url: "https://www.youtube.com/watch?v=w_T1PN2vG_Y", platform: "YouTube" },
          ],
        },
        {
          name: "Wireframing",
          description: "Create low-fidelity designs for websites and apps",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Wireframing Guide", url: "https://www.youtube.com/watch?v=qpH7-KFWZRI", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "content-writer": [
    {
      category: "Communication Skills",
      icon: "🗣️",
      skills: [
        {
          name: "SEO Writing",
          description: "Write content that ranks in search engines",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "SEO Writing", url: "https://www.youtube.com/watch?v=xsVTqzratPs", platform: "YouTube" },
          ],
        },
        {
          name: "Blog Writing",
          description: "Create engaging blog posts and articles",
          difficulty: "Beginner",
          timeRequired: "1 month",
          resources: [
            { name: "Blog Writing Guide", url: "https://www.youtube.com/watch?v=pBrEq3RaXPs", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Copywriting",
          description: "Write persuasive marketing and ad copy",
          difficulty: "Beginner",
          timeRequired: "1-2 months",
          resources: [
            { name: "Copywriting Basics", url: "https://www.youtube.com/watch?v=RSbEpzzpTMA", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "video-editor": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Adobe Premiere Pro",
          description: "Edit videos professionally for all platforms",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Premiere Pro Tutorial", url: "https://www.youtube.com/watch?v=Hls3Tp7JS8E", platform: "YouTube" },
          ],
        },
        {
          name: "DaVinci Resolve (Free)",
          description: "Free professional video editing software",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "DaVinci Resolve", url: "https://www.youtube.com/watch?v=63Ln33O4p4c", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Storytelling",
          description: "Create compelling narratives through video",
          difficulty: "Beginner",
          timeRequired: "Ongoing",
          resources: [
            { name: "Video Storytelling", url: "https://www.youtube.com/watch?v=1nYFpuc2Umk", platform: "YouTube" },
          ],
        },
      ],
    },
  ],

  "animation-artist": [
    {
      category: "Coding / Technical Skills",
      icon: "💻",
      skills: [
        {
          name: "Blender (Free)",
          description: "Create 3D animations and models for free",
          difficulty: "Beginner",
          timeRequired: "3-4 months",
          resources: [
            { name: "Blender Tutorial", url: "https://www.youtube.com/watch?v=nIoXOplUvAw", platform: "YouTube" },
          ],
        },
      ],
    },
    {
      category: "Design / Creativity Skills",
      icon: "🎨",
      skills: [
        {
          name: "Character Design",
          description: "Design memorable characters for animation",
          difficulty: "Beginner",
          timeRequired: "2-3 months",
          resources: [
            { name: "Character Design", url: "https://www.youtube.com/watch?v=IxWf8z4HU3E", platform: "YouTube" },
          ],
        },
        {
          name: "Animation Principles",
          description: "Learn 12 principles of animation",
          difficulty: "Beginner",
          timeRequired: "2 months",
          resources: [
            { name: "Animation Principles", url: "https://www.youtube.com/watch?v=uDqjIdI4bF4", platform: "YouTube" },
          ],
        },
      ],
    },
  ],
};

// Default skills for careers not in the list
export const defaultSkills: CareerSkillCategory[] = [
  {
    category: "Communication Skills",
    icon: "🗣️",
    skills: [
      {
        name: "English Communication",
        description: "Essential for any career - spoken and written English",
        difficulty: "Beginner",
        timeRequired: "2-3 months",
        resources: [
          { name: "English Speaking Course", url: "https://www.youtube.com/watch?v=juKd26qkNAw", platform: "YouTube" },
          { name: "SWAYAM English", url: "https://swayam.gov.in/", platform: "SWAYAM" },
        ],
      },
    ],
  },
  {
    category: "Aptitude & Logical Thinking",
    icon: "🧠",
    skills: [
      {
        name: "Basic Aptitude",
        description: "Build logical thinking and problem-solving abilities",
        difficulty: "Beginner",
        timeRequired: "2 months",
        resources: [
          { name: "Aptitude Basics", url: "https://www.youtube.com/watch?v=PKPOeVrAzOE", platform: "YouTube" },
          { name: "IndiaBix", url: "https://www.indiabix.com/", platform: "IndiaBix" },
        ],
      },
    ],
  },
  {
    category: "Problem-Solving Skills",
    icon: "🧩",
    skills: [
      {
        name: "Critical Thinking",
        description: "Analyze situations and find effective solutions",
        difficulty: "Beginner",
        timeRequired: "Ongoing",
        resources: [
          { name: "Critical Thinking", url: "https://www.coursera.org/learn/critical-thinking-skills-for-university-success", platform: "Coursera (Free Audit)" },
        ],
      },
    ],
  },
];
