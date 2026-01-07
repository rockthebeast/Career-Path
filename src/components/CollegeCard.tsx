import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, IndianRupee, Building2 } from "lucide-react";
import { College, formatFees } from "@/data/collegesData";
import { useNavigate } from "react-router-dom";

interface CollegeCardProps {
  college: College;
  eligibilityStatus?: 'eligible' | 'borderline' | 'not-eligible';
}

export const CollegeCard = ({ college, eligibilityStatus }: CollegeCardProps) => {
  const navigate = useNavigate();

  const typeColors = {
    government: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    private: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    aided: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  const eligibilityStyles = {
    eligible: 'border-green-500 bg-green-50 dark:bg-green-950',
    borderline: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
    'not-eligible': 'border-red-500 bg-red-50 dark:bg-red-950',
  };

  const eligibilityIcons = {
    eligible: '✅',
    borderline: '⚠️',
    'not-eligible': '❌',
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${
        eligibilityStatus ? `border-2 ${eligibilityStyles[eligibilityStatus]}` : ''
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight">{college.name}</CardTitle>
          {eligibilityStatus && (
            <span className="text-xl flex-shrink-0">{eligibilityIcons[eligibilityStatus]}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className={typeColors[college.type]}>
            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
          </Badge>
          {college.accreditation && (
            <Badge variant="outline" className="text-xs">
              {college.accreditation}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>{college.city}, {college.state.charAt(0).toUpperCase() + college.state.slice(1).replace('-', ' ')}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">
            {college.courses.map(c => c.toUpperCase().replace('-', ' ')).join(', ')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <IndianRupee className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <span className="font-medium">
            {formatFees(college.annualFees)}/year
          </span>
          <span className="text-muted-foreground">
            (Total: {formatFees(college.totalFees)})
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 flex-shrink-0" />
          <span>Est. {college.established}</span>
        </div>

        {/* Cut-off Information */}
        <div className="pt-2 border-t space-y-1">
          {college.class10CutOff && (
            <div className="text-sm">
              <span className="font-medium text-blue-600 dark:text-blue-400">Class 10 Cut-off:</span>
              <span className="ml-2">{college.class10CutOff.percentage}% ({college.class10CutOff.board})</span>
            </div>
          )}
          {college.pucCutOff && (
            <div className="text-sm">
              <span className="font-medium text-green-600 dark:text-green-400">PUC Cut-off:</span>
              <span className="ml-2">
                {college.pucCutOff.percentage}% ({college.pucCutOff.stream}
                {college.pucCutOff.subjects && ` - ${college.pucCutOff.subjects}`})
              </span>
            </div>
          )}
        </div>

        <Button 
          className="w-full mt-3" 
          onClick={() => navigate(`/colleges/${college.id}`)}
        >
          Check Eligibility
        </Button>
      </CardContent>
    </Card>
  );
};
