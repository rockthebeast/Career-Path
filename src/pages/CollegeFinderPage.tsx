import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CollegeCard } from "@/components/CollegeCard";
import { EligibilityChecker } from "@/components/EligibilityChecker";
import {
  collegesData,
  courseCategories,
  states,
  districts,
  getEligibilityStatus,
  formatFees,
  College,
} from "@/data/collegesData";
import { Search, Filter, X, School, MapPin, IndianRupee, GraduationCap, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

// Famous colleges from Dakshina Kannada district
const dakshinaKannadaColleges: College[] = [
  {
    id: "st-aloysius-puc-mangalore",
    name: "St. Aloysius Pre-University College",
    city: "Mangalore",
    state: "karnataka",
    district: "dakshina-kannada",
    type: "private",
    courses: ["science", "commerce", "arts"],
    totalFees: 45000,
    annualFees: 22000,
    established: "1880",
    website: "https://staloysiuspuc.in",
    affiliation: "Karnataka PU Board",
    accreditation: "A+",
    facilities: ["Labs", "Library", "Sports Complex", "Auditorium", "Hostel"],
    class10CutOff: { percentage: 85, board: "state" }
  },
  {
    id: "expert-pu-college-mangalore",
    name: "Expert Pre-University College",
    city: "Mangalore",
    state: "karnataka",
    district: "dakshina-kannada",
    type: "private",
    courses: ["science"],
    totalFees: 180000,
    annualFees: 90000,
    established: "1986",
    website: "https://www.expertclasses.org",
    affiliation: "Karnataka PU Board",
    facilities: ["AC Classrooms", "Hostel", "Transport", "Study Halls"],
    class10CutOff: { percentage: 88, board: "state" }
  },
  {
    id: "nitk-surathkal",
    name: "National Institute of Technology Karnataka (NITK)",
    city: "Surathkal",
    state: "karnataka",
    district: "dakshina-kannada",
    type: "government",
    courses: ["engineering", "science", "phd"],
    totalFees: 600000,
    annualFees: 150000,
    established: "1960",
    website: "https://www.nitk.ac.in",
    affiliation: "Autonomous",
    accreditation: "NBA",
    facilities: ["Hostel", "Beach Access", "Central Library", "Sports Complex", "Labs"],
    pucCutOff: { percentage: 98, stream: "science", subjects: "PCM" }
  },
  {
    id: "kmc-mangalore",
    name: "Kasturba Medical College (KMC)",
    city: "Mangalore",
    state: "karnataka",
    district: "dakshina-kannada",
    type: "private",
    courses: ["medical", "science"],
    totalFees: 6500000,
    annualFees: 1400000,
    established: "1953",
    website: "https://manipal.edu/kmc-mangalore.html",
    affiliation: "Manipal Academy of Higher Education",
    accreditation: "NAAC A++",
    facilities: ["Hospital", "Labs", "Library", "Hostel", "Sports"],
    pucCutOff: { percentage: 90, stream: "science", subjects: "PCB" }
  },
  {
    id: "canara-college-mangalore",
    name: "Canara College",
    city: "Mangalore",
    state: "karnataka",
    district: "dakshina-kannada",
    type: "private",
    courses: ["science", "commerce", "arts", "bca", "bba"],
    totalFees: 75000,
    annualFees: 25000,
    established: "1973",
    website: "https://www.canaracollege.com",
    affiliation: "Mangalore University",
    accreditation: "A",
    facilities: ["Library", "Labs", "Seminar Hall", "Canteen"],
    pucCutOff: { percentage: 60, stream: "any" }
  },
  {
    id: "govt-polytechnic-mangalore",
    name: "Government Polytechnic",
    city: "Mangalore",
    state: "karnataka",
    district: "dakshina-kannada",
    type: "government",
    courses: ["diploma"],
    totalFees: 15000,
    annualFees: 5000,
    established: "1950",
    website: "https://gpt.karnataka.gov.in/gptmangalore",
    affiliation: "DTE Karnataka",
    facilities: ["Labs", "Workshop", "Library"],
    class10CutOff: { percentage: 45, board: "state" }
  }
];

const allColleges = [...collegesData, ...dakshinaKannadaColleges];

const CollegeFinderPage = () => {
  const { t } = useTranslation();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [feesRange, setFeesRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Eligibility checker states
  const [eligibilityData, setEligibilityData] = useState<{
    studentClass: '10' | 'puc';
    board: string;
    percentage: number;
    stream?: string;
  } | null>(null);

  // Filter colleges based on all criteria
  const filteredColleges = useMemo(() => {
    return allColleges.filter((college) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !college.name.toLowerCase().includes(query) &&
          !college.city.toLowerCase().includes(query) &&
          !college.courses.some(c => c.toLowerCase().includes(query))
        ) {
          return false;
        }
      }

      // Course filter
      if (selectedCourses.length > 0) {
        if (!college.courses.some(c => selectedCourses.includes(c))) {
          return false;
        }
      }

      // State filter
      if (selectedState && college.state !== selectedState) {
        return false;
      }

      // District filter
      if (selectedDistrict && college.district !== selectedDistrict) {
        return false;
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(college.type)) {
        return false;
      }

      // Fees filter
      if (college.totalFees < feesRange[0] || college.totalFees > feesRange[1]) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCourses, selectedState, selectedDistrict, selectedTypes, feesRange]);

  // Get eligibility status for each college if eligibility check is active
  const collegesWithEligibility = useMemo(() => {
    if (!eligibilityData) return filteredColleges.map(c => ({ college: c, status: undefined }));

    return filteredColleges
      .map((college) => ({
        college,
        status: getEligibilityStatus(
          college,
          eligibilityData.studentClass,
          eligibilityData.percentage
        ),
      }))
      .sort((a, b) => {
        const order = { eligible: 0, borderline: 1, 'not-eligible': 2 };
        return order[a.status || 'not-eligible'] - order[b.status || 'not-eligible'];
      });
  }, [filteredColleges, eligibilityData]);

  const handleCourseToggle = (course: string) => {
    setSelectedCourses(prev =>
      prev.includes(course)
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCourses([]);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedTypes([]);
    setFeesRange([0, 1000000]);
    setEligibilityData(null);
  };

  const activeFiltersCount = [
    selectedCourses.length > 0,
    selectedState,
    selectedDistrict,
    selectedTypes.length > 0,
    feesRange[0] > 0 || feesRange[1] < 1000000,
  ].filter(Boolean).length;

  // Stats
  const eligibleCount = collegesWithEligibility.filter(c => c.status === 'eligible').length;
  const borderlineCount = collegesWithEligibility.filter(c => c.status === 'borderline').length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">College Finder</h1>
          <p className="text-lg text-muted-foreground">
            Find the right college based on your marks, budget, and preferences
          </p>
        </div>

        {/* Eligibility Checker */}
        <div className="mb-8">
          <EligibilityChecker onCheck={setEligibilityData} />
        </div>

        {/* Eligibility Results Summary */}
        {eligibilityData && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-none">
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Results for:</p>
                  <p className="font-medium">
                    {eligibilityData.studentClass === '10' ? 'Class 10' : 'PUC'} • 
                    {eligibilityData.percentage}% • 
                    {eligibilityData.board.toUpperCase()}
                    {eligibilityData.stream && ` • ${eligibilityData.stream.charAt(0).toUpperCase() + eligibilityData.stream.slice(1)}`}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{eligibleCount}</p>
                    <p className="text-xs text-muted-foreground">Eligible</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{borderlineCount}</p>
                    <p className="text-xs text-muted-foreground">Borderline</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEligibilityData(null)}>
                  Clear Check
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search colleges, courses, cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button
            variant="outline"
            className="h-12"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2" variant="secondary">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" className="h-12" onClick={clearFilters}>
              <X className="h-5 w-5 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Colleges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Filter */}
              <div>
                <Label className="text-base flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5" />
                  Course Type
                </Label>
                <div className="flex flex-wrap gap-2">
                  {courseCategories.map((course) => (
                    <Badge
                      key={course.value}
                      variant={selectedCourses.includes(course.value) ? "default" : "outline"}
                      className="cursor-pointer text-sm py-1.5 px-3"
                      onClick={() => handleCourseToggle(course.value)}
                    >
                      {course.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-base flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5" />
                    State
                  </Label>
                  <Select
                    value={selectedState}
                    onValueChange={(value) => {
                      setSelectedState(value);
                      setSelectedDistrict("");
                    }}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-base mb-2 block">District</Label>
                  <Select
                    value={selectedDistrict}
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedState}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="All Districts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Districts</SelectItem>
                      {selectedState &&
                        districts[selectedState]?.map((district) => (
                          <SelectItem key={district.value} value={district.value}>
                            {district.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* College Type Filter */}
              <div>
                <Label className="text-base flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5" />
                  College Type
                </Label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'government', label: 'Government', color: 'text-green-600' },
                    { value: 'private', label: 'Private', color: 'text-blue-600' },
                    { value: 'aided', label: 'Aided', color: 'text-purple-600' },
                  ].map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.value}
                        checked={selectedTypes.includes(type.value)}
                        onCheckedChange={() => handleTypeToggle(type.value)}
                      />
                      <label
                        htmlFor={type.value}
                        className={`text-base cursor-pointer ${type.color}`}
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fees Filter */}
              <div>
                <Label className="text-base flex items-center gap-2 mb-3">
                  <IndianRupee className="h-5 w-5" />
                  Total Fees Range: {formatFees(feesRange[0])} - {formatFees(feesRange[1])}
                </Label>
                <Slider
                  value={feesRange}
                  onValueChange={setFeesRange}
                  min={0}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>₹0</span>
                  <span>₹10 Lakhs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredColleges.length}</span> colleges
          </p>
        </div>

        {/* College Grid */}
        {filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegesWithEligibility.map(({ college, status }) => (
              <CollegeCard
                key={college.id}
                college={college}
                eligibilityStatus={eligibilityData ? status : undefined}
              />
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <School className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CollegeFinderPage;
