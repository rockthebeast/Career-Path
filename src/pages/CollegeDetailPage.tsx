import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  GraduationCap,
  IndianRupee,
  Building2,
  Calendar,
  Globe,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Award,
} from "lucide-react";
import { collegesData, formatFees } from "@/data/collegesData";

const CollegeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const college = collegesData.find((c) => c.id === id);

  if (!college) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">College not found</h1>
          <Button onClick={() => navigate("/colleges")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to College Finder
          </Button>
        </div>
      </Layout>
    );
  }

  const typeColors = {
    government: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    private: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    aided: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/colleges")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to College Finder
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{college.name}</h1>
            <Badge className={`text-sm ${typeColors[college.type]}`}>
              {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{college.city}, {college.state.charAt(0).toUpperCase() + college.state.slice(1).replace('-', ' ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Established {college.established}</span>
            </div>
            {college.website && (
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Globe className="h-5 w-5" />
                <span>Visit Website</span>
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Affiliation</p>
                    <p className="font-medium">{college.affiliation}</p>
                  </div>
                  {college.accreditation && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Accreditation</p>
                      <p className="font-medium">{college.accreditation}</p>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Courses Offered</p>
                  <div className="flex flex-wrap gap-2">
                    {college.courses.map((course) => (
                      <Badge key={course} variant="secondary">
                        {course.toUpperCase().replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Information */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Eligibility Criteria
                </CardTitle>
                <CardDescription className="text-base">
                  Simple explanation of who can apply
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {college.class10CutOff && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      For Class 10 Students
                    </h4>
                    <p className="text-lg">
                      Students who scored <span className="font-bold text-blue-600 dark:text-blue-400">
                        {college.class10CutOff.percentage}% or above
                      </span> in <span className="font-medium">{college.class10CutOff.board}</span> board are eligible to apply.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      This applies to: Diploma, ITI, and PUC courses
                    </p>
                  </div>
                )}

                {college.pucCutOff && (
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      For PUC / Class 12 Students
                    </h4>
                    <p className="text-lg">
                      Students who scored <span className="font-bold text-green-600 dark:text-green-400">
                        {college.pucCutOff.percentage}% or above
                      </span> in <span className="font-medium">{college.pucCutOff.stream}</span> stream
                      {college.pucCutOff.subjects && (
                        <span> with <span className="font-medium">{college.pucCutOff.subjects}</span> subjects</span>
                      )} are eligible to apply.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      This applies to: Degree courses like Engineering, Medical, BSc, BCom, etc.
                    </p>
                  </div>
                )}

                {!college.class10CutOff && !college.pucCutOff && (
                  <p className="text-muted-foreground">
                    Please contact the college directly for eligibility criteria.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {college.facilities.map((facility) => (
                    <Badge key={facility} variant="outline" className="text-sm py-1.5 px-3">
                      ✓ {facility}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fees Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Fees Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Annual Fees</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatFees(college.annualFees)}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Course Fees</p>
                  <p className="text-2xl font-bold">
                    {formatFees(college.totalFees)}
                  </p>
                </div>

                <Separator />

                {/* Cost Comparison */}
                <div className="space-y-2">
                  <p className="font-medium text-sm">Fee Comparison</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Government Avg:</span>
                    <span className="text-green-600 font-medium">₹50,000 - ₹2 Lakhs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Private Avg:</span>
                    <span className="text-blue-600 font-medium">₹3 - ₹10 Lakhs</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <span className={`font-medium ${
                    college.type === 'government' ? 'text-green-600' :
                    college.type === 'private' ? 'text-blue-600' : 'text-purple-600'
                  }`}>
                    {college.type.charAt(0).toUpperCase() + college.type.slice(1)} College
                  </span>
                </div>

                {college.website && (
                  <Button className="w-full" asChild>
                    <a href={college.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Apply Now
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollegeDetailPage;
