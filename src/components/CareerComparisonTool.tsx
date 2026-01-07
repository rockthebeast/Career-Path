import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GraduationCap, Briefcase, Building2, BookOpen } from "lucide-react";

// Comparison data
const scienceCommerceArtsData = [
  { criterion: "Career Options", science: "Engineering, Medicine, Research, IT", commerce: "CA, MBA, Banking, Finance", arts: "Law, Journalism, Teaching, Civil Services" },
  { criterion: "Difficulty Level", science: "⚠️ High", commerce: "✔ Medium", arts: "✔ Medium" },
  { criterion: "Cost of Education", science: "₹5-20 Lakhs", commerce: "₹3-15 Lakhs", arts: "₹2-10 Lakhs" },
  { criterion: "Job Availability", science: "✔ High", commerce: "✔ High", arts: "⚠️ Moderate" },
  { criterion: "Parent Acceptance", science: "✔ Very High", commerce: "✔ High", arts: "⚠️ Medium" },
  { criterion: "Salary Growth", science: "✔ Fast (Tech)", commerce: "✔ Steady", arts: "⚠️ Slow initially" },
];

const engineeringMedicalData = [
  { criterion: "Duration of Study", engineering: "4 Years (B.Tech)", medical: "5.5 Years (MBBS) + Residency" },
  { criterion: "Cost of Education", engineering: "₹4-15 Lakhs", medical: "₹20-80 Lakhs (Private)" },
  { criterion: "Entrance Exams", engineering: "JEE Main/Advanced", medical: "NEET-UG" },
  { criterion: "Work-Life Balance", engineering: "⚠️ Varies by job", medical: "❌ Demanding initially" },
  { criterion: "Salary Timeline", engineering: "✔ Starts at ₹4-8 LPA", medical: "⚠️ Low during residency" },
  { criterion: "Risk Level", engineering: "⚠️ Medium (Competition)", medical: "⚠️ High (Limited seats)" },
];

const govtPrivateJobData = [
  { criterion: "Job Security", govt: "✔ Very High", private: "⚠️ Performance-based" },
  { criterion: "Salary Growth", govt: "⚠️ Fixed increments", private: "✔ Fast with skills" },
  { criterion: "Promotions", govt: "⚠️ Seniority-based", private: "✔ Merit-based" },
  { criterion: "Stress Level", govt: "✔ Generally Low", private: "❌ Can be High" },
  { criterion: "Location Flexibility", govt: "❌ Transfers possible", private: "✔ More choice" },
  { criterion: "Retirement Benefits", govt: "✔ Pension + Benefits", private: "⚠️ PF + Gratuity only" },
];

const degreeDiplomaData = [
  { criterion: "Time Required", degree: "3-4 Years", diploma: "2-3 Years" },
  { criterion: "Cost", degree: "₹3-15 Lakhs", diploma: "₹50K-3 Lakhs" },
  { criterion: "Job Opportunities", degree: "✔ Wide range", diploma: "⚠️ Technical roles" },
  { criterion: "Growth Potential", degree: "✔ Management roles", diploma: "⚠️ Supervisor level" },
  { criterion: "Suitable For", degree: "Academic learners", diploma: "Practical learners" },
];

const ComparisonTable = ({ 
  data, 
  columns 
}: { 
  data: { criterion: string; [key: string]: string }[]; 
  columns: { key: string; label: string }[];
}) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="font-bold text-foreground text-base min-w-[140px]">Criteria</TableHead>
          {columns.map((col) => (
            <TableHead key={col.key} className="font-bold text-foreground text-base min-w-[150px] text-center">
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index} className="hover:bg-muted/30">
            <TableCell className="font-medium text-sm md:text-base">{row.criterion}</TableCell>
            {columns.map((col) => (
              <TableCell key={col.key} className="text-sm md:text-base text-center">
                {row[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export function CareerComparisonTool() {
  const [activeTab, setActiveTab] = useState("streams");

  return (
    <Card className="mb-10 border-2 border-primary/20">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl flex items-center gap-3">
          <GraduationCap className="h-6 w-6" />
          Career Comparison Tool
        </CardTitle>
        <p className="text-primary-foreground/90 text-sm md:text-base mt-1">
          Compare different career paths to make informed decisions
        </p>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger 
              value="streams" 
              className="flex items-center gap-1 text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BookOpen className="h-4 w-4 hidden sm:block" />
              Streams
            </TabsTrigger>
            <TabsTrigger 
              value="eng-med" 
              className="flex items-center gap-1 text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <GraduationCap className="h-4 w-4 hidden sm:block" />
              Eng vs Med
            </TabsTrigger>
            <TabsTrigger 
              value="govt-pvt" 
              className="flex items-center gap-1 text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Building2 className="h-4 w-4 hidden sm:block" />
              Govt vs Pvt
            </TabsTrigger>
            <TabsTrigger 
              value="deg-dip" 
              className="flex items-center gap-1 text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Briefcase className="h-4 w-4 hidden sm:block" />
              Degree vs Diploma
            </TabsTrigger>
          </TabsList>

          <TabsContent value="streams" className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                🔬 Science vs 📊 Commerce vs 🎨 Arts
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Choose your stream wisely based on your interests and career goals
              </p>
            </div>
            <ComparisonTable 
              data={scienceCommerceArtsData}
              columns={[
                { key: "science", label: "🔬 Science" },
                { key: "commerce", label: "📊 Commerce" },
                { key: "arts", label: "🎨 Arts" },
              ]}
            />
            <div className="mt-4 p-3 bg-info/10 rounded-lg border border-info/20">
              <p className="text-sm text-muted-foreground">
                <strong>💡 Tip:</strong> Choose based on your interests, not just popularity. All streams have good career prospects!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="eng-med" className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                🔧 Engineering vs 🩺 Medical
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Both are prestigious paths but differ significantly in duration, cost, and lifestyle
              </p>
            </div>
            <ComparisonTable 
              data={engineeringMedicalData}
              columns={[
                { key: "engineering", label: "🔧 Engineering" },
                { key: "medical", label: "🩺 Medical" },
              ]}
            />
            <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <p className="text-sm text-muted-foreground">
                <strong>⚠️ Note:</strong> Medical requires longer commitment and higher investment but offers stable career growth.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="govt-pvt" className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                🏛️ Government Job vs 🏢 Private Job
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Understand the key differences before choosing your career path
              </p>
            </div>
            <ComparisonTable 
              data={govtPrivateJobData}
              columns={[
                { key: "govt", label: "🏛️ Government" },
                { key: "private", label: "🏢 Private" },
              ]}
            />
            <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
              <p className="text-sm text-muted-foreground">
                <strong>✔ Best for:</strong> Govt jobs for stability, Private jobs for faster growth and higher pay potential.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="deg-dip" className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                🎓 Degree vs 📜 Diploma
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Choose based on your learning style and career timeline
              </p>
            </div>
            <ComparisonTable 
              data={degreeDiplomaData}
              columns={[
                { key: "degree", label: "🎓 Degree" },
                { key: "diploma", label: "📜 Diploma" },
              ]}
            />
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>💡 Tip:</strong> Diploma is great for quick job entry. You can always pursue a degree later through lateral entry!
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm border-t pt-4">
          <span className="flex items-center gap-1">
            <span className="text-success font-medium">✔</span> Good/Positive
          </span>
          <span className="flex items-center gap-1">
            <span className="text-warning font-medium">⚠️</span> Moderate/Consider
          </span>
          <span className="flex items-center gap-1">
            <span className="text-destructive font-medium">❌</span> Challenging/Negative
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
