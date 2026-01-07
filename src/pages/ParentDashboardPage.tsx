import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Shield, 
  Building2, 
  Briefcase,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { CareerComparisonTool } from '@/components/CareerComparisonTool';

interface CareerInfo {
  id: string;
  title: string;
  simpleExplanation: string;
  icon: React.ReactNode;
  education: {
    govt: { cost: string; duration: string };
    private: { cost: string; duration: string };
    coaching?: string;
  };
  avgSalary: string;
  roi: 'high' | 'medium' | 'low';
  riskLevel: 'safe' | 'medium' | 'risky';
  riskReason: string;
  govtOptions: string[];
  privateOptions: string[];
  jobSecurity: { govt: string; private: string };
  growthComparison: { govt: string; private: string };
}

const careersData: CareerInfo[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    simpleExplanation: 'Works on building apps, websites, and software used by companies and people daily. They write code to solve problems and create digital products.',
    icon: <Briefcase className="h-5 w-5" />,
    education: {
      govt: { cost: '₹1-3 Lakhs', duration: '4 years' },
      private: { cost: '₹8-15 Lakhs', duration: '4 years' },
      coaching: '₹50K-2 Lakhs (JEE preparation)'
    },
    avgSalary: '₹6-25 LPA',
    roi: 'high',
    riskLevel: 'safe',
    riskReason: 'High demand in all industries, constant need for software development, recession-resistant career',
    govtOptions: ['ISRO Scientist', 'DRDO Engineer', 'NIC Developer', 'Bank IT Officer'],
    privateOptions: ['TCS, Infosys, Wipro', 'Google, Microsoft, Amazon', 'Startups', 'Freelancing'],
    jobSecurity: { govt: 'Very High - Permanent jobs', private: 'Medium - Performance based' },
    growthComparison: { govt: '₹6-15 LPA, Slower promotions', private: '₹8-50+ LPA, Fast growth possible' }
  },
  {
    id: 'doctor',
    title: 'Doctor (MBBS)',
    simpleExplanation: 'Treats patients, diagnoses illnesses, and helps people stay healthy. They work in hospitals, clinics, or start their own practice.',
    icon: <GraduationCap className="h-5 w-5" />,
    education: {
      govt: { cost: '₹3-8 Lakhs', duration: '5.5 years + 1 year internship' },
      private: { cost: '₹50 Lakhs - 1.5 Crore', duration: '5.5 years + 1 year internship' },
      coaching: '₹1-5 Lakhs (NEET preparation)'
    },
    avgSalary: '₹8-30 LPA',
    roi: 'medium',
    riskLevel: 'safe',
    riskReason: 'Always in demand, essential service, respected profession. High initial investment but stable long-term income.',
    govtOptions: ['Government Hospital Doctor', 'PHC/CHC Doctor', 'Railway Doctor', 'Army Medical Corps'],
    privateOptions: ['Private Hospital', 'Own Clinic', 'Corporate Hospitals', 'Medical Consultant'],
    jobSecurity: { govt: 'Very High - Essential service', private: 'High - Healthcare always needed' },
    growthComparison: { govt: '₹8-20 LPA, Good benefits', private: '₹15-1 Cr+ (Specialists), Higher earning potential' }
  },
  {
    id: 'ca',
    title: 'Chartered Accountant (CA)',
    simpleExplanation: 'Manages money matters for businesses - handles taxes, audits accounts, and ensures companies follow financial rules. They are trusted financial advisors.',
    icon: <IndianRupee className="h-5 w-5" />,
    education: {
      govt: { cost: '₹1-2 Lakhs', duration: '3-4 years (after 12th)' },
      private: { cost: '₹1-2 Lakhs', duration: '3-4 years' },
      coaching: '₹50K-1.5 Lakhs'
    },
    avgSalary: '₹7-25 LPA',
    roi: 'high',
    riskLevel: 'safe',
    riskReason: 'Every business needs accountants. Strong legal recognition. Low investment with high returns.',
    govtOptions: ['CAG Office', 'Income Tax Department', 'Government Auditor', 'PSU Finance'],
    privateOptions: ['Big 4 Firms (Deloitte, PwC, EY, KPMG)', 'Corporate CFO', 'Own Practice', 'Banks & NBFCs'],
    jobSecurity: { govt: 'Very High', private: 'High - Always in demand' },
    growthComparison: { govt: '₹7-15 LPA', private: '₹10-50 LPA (Partners earn crores)' }
  },
  {
    id: 'civil-services',
    title: 'IAS/IPS (Civil Services)',
    simpleExplanation: 'Government officers who run districts, make policies, and maintain law and order. They are the backbone of government administration.',
    icon: <Shield className="h-5 w-5" />,
    education: {
      govt: { cost: '₹50K-2 Lakhs (any graduation)', duration: '3-4 years graduation + 2-3 years prep' },
      private: { cost: '₹3-8 Lakhs (any graduation)', duration: '3-4 years graduation' },
      coaching: '₹1-3 Lakhs (UPSC preparation)'
    },
    avgSalary: '₹10-20 LPA + Benefits',
    roi: 'high',
    riskLevel: 'risky',
    riskReason: 'Extremely competitive exam (0.1% success rate). May take 3-5 attempts. But once cleared, most prestigious career with job security.',
    govtOptions: ['IAS', 'IPS', 'IFS', 'IRS', 'State Services'],
    privateOptions: ['Not applicable - Government only'],
    jobSecurity: { govt: 'Highest - Constitutional protection', private: 'N/A' },
    growthComparison: { govt: '₹10-20 LPA + Housing, Car, Staff, Power & Prestige', private: 'N/A' }
  },
  {
    id: 'teacher',
    title: 'Teacher / Professor',
    simpleExplanation: 'Educates students in schools or colleges. Shapes young minds and helps them learn subjects and life skills.',
    icon: <GraduationCap className="h-5 w-5" />,
    education: {
      govt: { cost: '₹50K-2 Lakhs (B.Ed)', duration: '4-5 years (Graduation + B.Ed)' },
      private: { cost: '₹2-5 Lakhs', duration: '4-5 years' },
      coaching: '₹20K-50K (TET/NET preparation)'
    },
    avgSalary: '₹3-12 LPA',
    roi: 'medium',
    riskLevel: 'safe',
    riskReason: 'Education is essential. Government teaching jobs are stable with good benefits. Private sector has variable pay.',
    govtOptions: ['KVS Teacher', 'Government School', 'University Professor', 'SCERT/DIET'],
    privateOptions: ['Private Schools', 'Coaching Institutes', 'Online Teaching', 'Tuition'],
    jobSecurity: { govt: 'Very High - Permanent jobs', private: 'Medium - Contract based often' },
    growthComparison: { govt: '₹4-12 LPA + Pension', private: '₹2-8 LPA (varies greatly)' }
  },
  {
    id: 'bank-po',
    title: 'Bank Officer (PO/Clerk)',
    simpleExplanation: 'Works in banks handling customer accounts, loans, and financial transactions. Helps people manage their money safely.',
    icon: <Building2 className="h-5 w-5" />,
    education: {
      govt: { cost: '₹50K-2 Lakhs (any graduation)', duration: '3 years graduation' },
      private: { cost: '₹3-6 Lakhs (any graduation)', duration: '3 years graduation' },
      coaching: '₹30K-1 Lakh (Banking exam prep)'
    },
    avgSalary: '₹5-15 LPA',
    roi: 'high',
    riskLevel: 'safe',
    riskReason: 'Banking sector is stable. PSU banks offer job security. Many exam opportunities throughout the year.',
    govtOptions: ['SBI PO/Clerk', 'IBPS PO/Clerk', 'RBI Officer', 'NABARD'],
    privateOptions: ['HDFC, ICICI, Axis Bank', 'Kotak, Yes Bank', 'Foreign Banks'],
    jobSecurity: { govt: 'Very High', private: 'Medium-High' },
    growthComparison: { govt: '₹5-15 LPA + Perks', private: '₹4-25 LPA (faster promotions)' }
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    simpleExplanation: 'Creates visual content like logos, posters, websites, and social media graphics. Uses creativity to communicate ideas through images.',
    icon: <Briefcase className="h-5 w-5" />,
    education: {
      govt: { cost: '₹20K-1 Lakh (NID/Govt colleges)', duration: '3-4 years' },
      private: { cost: '₹2-8 Lakhs', duration: '3-4 years' },
      coaching: '₹10K-50K (Software training)'
    },
    avgSalary: '₹3-15 LPA',
    roi: 'medium',
    riskLevel: 'medium',
    riskReason: 'Growing demand but competitive field. Success depends on portfolio and skills. Freelancing can be unstable initially.',
    govtOptions: ['Government Press', 'Publications Division', 'Doordarshan/AIR', 'NID Faculty'],
    privateOptions: ['Design Agencies', 'IT Companies', 'Freelancing', 'Media Houses'],
    jobSecurity: { govt: 'High - Limited positions', private: 'Medium - Project based often' },
    growthComparison: { govt: '₹4-10 LPA', private: '₹3-20 LPA (Top designers earn more)' }
  },
  {
    id: 'lawyer',
    title: 'Lawyer / Advocate',
    simpleExplanation: 'Represents people in courts, provides legal advice, and helps with legal documents. Fights for justice and protects rights.',
    icon: <Shield className="h-5 w-5" />,
    education: {
      govt: { cost: '₹50K-3 Lakhs (Govt Law College)', duration: '5 years (after 12th) or 3 years (after graduation)' },
      private: { cost: '₹5-20 Lakhs', duration: '5 years or 3 years' },
      coaching: '₹20K-1 Lakh (CLAT preparation)'
    },
    avgSalary: '₹3-30 LPA',
    roi: 'medium',
    riskLevel: 'medium',
    riskReason: 'Initial years are challenging. Building clientele takes time. But established lawyers earn very well.',
    govtOptions: ['Public Prosecutor', 'Legal Advisor to Govt', 'Judge (after experience)', 'UPSC Legal Services'],
    privateOptions: ['Law Firms', 'Corporate Lawyer', 'Independent Practice', 'Legal Consultant'],
    jobSecurity: { govt: 'High', private: 'Depends on practice' },
    growthComparison: { govt: '₹5-15 LPA', private: '₹3-1 Cr+ (Senior Partners)' }
  },
  {
    id: 'electrician',
    title: 'Electrician / ITI Trades',
    simpleExplanation: 'Installs, repairs, and maintains electrical systems in homes, buildings, and factories. Skilled trade work with hands-on expertise.',
    icon: <Briefcase className="h-5 w-5" />,
    education: {
      govt: { cost: '₹5K-20K (Govt ITI)', duration: '1-2 years' },
      private: { cost: '₹30K-1 Lakh', duration: '1-2 years' },
    },
    avgSalary: '₹2-8 LPA',
    roi: 'high',
    riskLevel: 'safe',
    riskReason: 'Always in demand. Low investment. Can start earning quickly. Good for self-employment.',
    govtOptions: ['Railways', 'Electricity Board', 'PWD', 'Defence (Technical)'],
    privateOptions: ['Construction Companies', 'Manufacturing', 'Self-employed', 'Maintenance Contracts'],
    jobSecurity: { govt: 'Very High', private: 'High - Skill-based' },
    growthComparison: { govt: '₹3-6 LPA + Benefits', private: '₹2-10 LPA (Own business can earn more)' }
  },
  {
    id: 'content-creator',
    title: 'Content Creator / Influencer',
    simpleExplanation: 'Creates videos, blogs, or social media content to entertain, educate, or inform people online. Builds audience and earns from ads, sponsorships.',
    icon: <TrendingUp className="h-5 w-5" />,
    education: {
      govt: { cost: '₹0-1 Lakh (Self-learning)', duration: 'Variable' },
      private: { cost: '₹50K-3 Lakhs (Media courses)', duration: '1-3 years' },
    },
    avgSalary: '₹0 - ₹1 Cr+ (highly variable)',
    roi: 'low',
    riskLevel: 'risky',
    riskReason: 'Extremely competitive. No guaranteed income. Takes years to build audience. Platform algorithms can change anytime.',
    govtOptions: ['DD/AIR Content', 'Government Media Units', 'DAVP'],
    privateOptions: ['YouTube', 'Instagram', 'Podcasting', 'Brand Partnerships'],
    jobSecurity: { govt: 'High - Limited roles', private: 'Very Low - No guarantees' },
    growthComparison: { govt: '₹4-10 LPA', private: '₹0 to ₹10 Cr+ (Top 0.1% only)' }
  }
];

const getRoiBadge = (roi: 'high' | 'medium' | 'low') => {
  switch (roi) {
    case 'high':
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">🟢 High ROI</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">🟡 Medium ROI</Badge>;
    case 'low':
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">🔴 Low ROI</Badge>;
  }
};

const getRiskBadge = (risk: 'safe' | 'medium' | 'risky') => {
  switch (risk) {
    case 'safe':
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">🟢 Safe Career</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">🟡 Medium Risk</Badge>;
    case 'risky':
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">🔴 High Risk</Badge>;
  }
};

const ParentDashboardPage = () => {
  const [selectedCareer, setSelectedCareer] = useState<CareerInfo>(careersData[0]);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Parent Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Understand Your Child's Career Options
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clear, simple explanations of different careers with costs, returns, and job security information to help you guide your child's future.
          </p>
        </div>

        {/* Career Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Select a Career to Explore:</h2>
          <div className="flex flex-wrap gap-2">
            {careersData.map((career) => (
              <button
                key={career.id}
                onClick={() => setSelectedCareer(career)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCareer.id === career.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {career.title}
              </button>
            ))}
          </div>
        </div>

        {/* Career Details */}
        <div className="space-y-6">
          {/* Simple Explanation Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {selectedCareer.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedCareer.title}</CardTitle>
                  <CardDescription>Simple Career Explanation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-foreground leading-relaxed">
                  <strong>What they do:</strong> {selectedCareer.simpleExplanation}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {getRoiBadge(selectedCareer.roi)}
                {getRiskBadge(selectedCareer.riskLevel)}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Different Sections */}
          <Tabs defaultValue="cost" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="cost" className="py-3">
                <IndianRupee className="h-4 w-4 mr-2" />
                Education Cost
              </TabsTrigger>
              <TabsTrigger value="roi" className="py-3">
                <TrendingUp className="h-4 w-4 mr-2" />
                ROI Analysis
              </TabsTrigger>
              <TabsTrigger value="risk" className="py-3">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Level
              </TabsTrigger>
              <TabsTrigger value="sectors" className="py-3">
                <Building2 className="h-4 w-4 mr-2" />
                Govt vs Private
              </TabsTrigger>
            </TabsList>

            {/* Cost of Education Tab */}
            <TabsContent value="cost" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    Cost of Education
                  </CardTitle>
                  <CardDescription>Complete breakdown of education expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Government College */}
                    <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-green-700 dark:text-green-400">Government College</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-foreground">{selectedCareer.education.govt.cost}</p>
                        <p className="text-sm text-muted-foreground">Duration: {selectedCareer.education.govt.duration}</p>
                      </div>
                    </div>

                    {/* Private College */}
                    <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold text-orange-700 dark:text-orange-400">Private College</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-foreground">{selectedCareer.education.private.cost}</p>
                        <p className="text-sm text-muted-foreground">Duration: {selectedCareer.education.private.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Coaching Costs */}
                  {selectedCareer.education.coaching && (
                    <div className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Additional Coaching Cost</h3>
                      </div>
                      <p className="text-foreground">{selectedCareer.education.coaching}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ROI Tab */}
            <TabsContent value="roi" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Return on Investment (ROI)
                  </CardTitle>
                  <CardDescription>Compare what you invest vs what you earn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border border-border bg-muted/30 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Investment (Govt)</p>
                      <p className="text-xl font-bold text-foreground">{selectedCareer.education.govt.cost}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-muted/30 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Average Salary</p>
                      <p className="text-xl font-bold text-foreground">{selectedCareer.avgSalary}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 text-center">
                      <p className="text-sm text-muted-foreground mb-2">ROI Rating</p>
                      <div className="flex justify-center">{getRoiBadge(selectedCareer.roi)}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <h4 className="font-semibold mb-2">What this means:</h4>
                    <p className="text-muted-foreground">
                      {selectedCareer.roi === 'high' && (
                        <>Your child can recover the education investment within 1-2 years of working. The earning potential is significantly higher than the cost of education.</>
                      )}
                      {selectedCareer.roi === 'medium' && (
                        <>The education investment will take 3-5 years to recover. It's a balanced choice with steady income growth over time.</>
                      )}
                      {selectedCareer.roi === 'low' && (
                        <>The education investment may take longer to recover (5+ years). Success depends heavily on talent, luck, and market conditions.</>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Risk Tab */}
            <TabsContent value="risk" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Career Risk Assessment
                  </CardTitle>
                  <CardDescription>Understanding the stability and risks involved</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30">
                    <div className="text-4xl">
                      {selectedCareer.riskLevel === 'safe' && '🟢'}
                      {selectedCareer.riskLevel === 'medium' && '🟡'}
                      {selectedCareer.riskLevel === 'risky' && '🔴'}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold capitalize">{selectedCareer.riskLevel} Career Path</h3>
                      {getRiskBadge(selectedCareer.riskLevel)}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Why this rating?
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedCareer.riskReason}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <h4 className="font-semibold mb-2">Key Considerations:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {selectedCareer.riskLevel === 'safe' && (
                        <>
                          <li>✓ Stable demand in the job market</li>
                          <li>✓ Predictable career growth path</li>
                          <li>✓ Multiple job opportunities available</li>
                        </>
                      )}
                      {selectedCareer.riskLevel === 'medium' && (
                        <>
                          <li>⚠ Some uncertainty in initial years</li>
                          <li>⚠ Success depends on skill development</li>
                          <li>⚠ Market conditions can affect opportunities</li>
                        </>
                      )}
                      {selectedCareer.riskLevel === 'risky' && (
                        <>
                          <li>⚠ High competition, low success rate</li>
                          <li>⚠ Income can be unpredictable</li>
                          <li>⚠ Requires exceptional talent or luck</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Govt vs Private Tab */}
            <TabsContent value="sectors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Government vs Private Sector
                  </CardTitle>
                  <CardDescription>Compare career options in both sectors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Government Sector */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <Shield className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-green-700 dark:text-green-400">Government Sector</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Available Options:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCareer.govtOptions.map((option, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {option}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground mb-1">Job Security:</p>
                          <p className="font-medium text-foreground">{selectedCareer.jobSecurity.govt}</p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground mb-1">Salary & Growth:</p>
                          <p className="font-medium text-foreground">{selectedCareer.growthComparison.govt}</p>
                        </div>
                      </div>
                    </div>

                    {/* Private Sector */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-700 dark:text-blue-400">Private Sector</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Available Options:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCareer.privateOptions.map((option, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {option}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground mb-1">Job Security:</p>
                          <p className="font-medium text-foreground">{selectedCareer.jobSecurity.private}</p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground mb-1">Salary & Growth:</p>
                          <p className="font-medium text-foreground">{selectedCareer.growthComparison.private}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Comparison */}
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <h4 className="font-semibold mb-3">Quick Comparison</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 text-muted-foreground">Aspect</th>
                            <th className="text-left py-2 text-green-600">Government</th>
                            <th className="text-left py-2 text-blue-600">Private</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Job Security</td>
                            <td className="py-2">⭐⭐⭐⭐⭐</td>
                            <td className="py-2">⭐⭐⭐</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Starting Salary</td>
                            <td className="py-2">⭐⭐⭐</td>
                            <td className="py-2">⭐⭐⭐⭐</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Growth Speed</td>
                            <td className="py-2">⭐⭐</td>
                            <td className="py-2">⭐⭐⭐⭐⭐</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Work-Life Balance</td>
                            <td className="py-2">⭐⭐⭐⭐</td>
                            <td className="py-2">⭐⭐⭐</td>
                          </tr>
                          <tr>
                            <td className="py-2">Benefits & Perks</td>
                            <td className="py-2">⭐⭐⭐⭐⭐</td>
                            <td className="py-2">⭐⭐⭐</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Career Comparison Tool - placed below existing content */}
        <div className="mt-12">
          <CareerComparisonTool />
        </div>
      </div>
    </Layout>
  );
};

export default ParentDashboardPage;
