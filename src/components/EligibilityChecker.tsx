import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertCircle, XCircle, GraduationCap } from "lucide-react";

interface EligibilityCheckerProps {
  onCheck: (data: {
    studentClass: '10' | 'puc';
    board: string;
    percentage: number;
    stream?: string;
  }) => void;
}

export const EligibilityChecker = ({ onCheck }: EligibilityCheckerProps) => {
  const [studentClass, setStudentClass] = useState<'10' | 'puc'>('10');
  const [board, setBoard] = useState('');
  const [percentage, setPercentage] = useState('');
  const [stream, setStream] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!percentage || !board) return;
    
    onCheck({
      studentClass,
      board,
      percentage: parseFloat(percentage),
      stream: studentClass === 'puc' ? stream : undefined,
    });
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Check Your Eligibility</CardTitle>
        </div>
        <CardDescription className="text-base">
          Enter your marks to find colleges that match your eligibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">Class</Label>
              <Select
                value={studentClass}
                onValueChange={(value: '10' | 'puc') => setStudentClass(value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="puc">PUC / Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Board</Label>
              <Select value={board} onValueChange={setBoard}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cbse">CBSE</SelectItem>
                  <SelectItem value="icse">ICSE</SelectItem>
                  <SelectItem value="state">State Board</SelectItem>
                  <SelectItem value="any">Any Board</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {studentClass === 'puc' && (
              <div className="space-y-2">
                <Label className="text-base">Stream</Label>
                <Select value={stream} onValueChange={setStream}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-base">Percentage / Marks (%)</Label>
              <Input
                type="number"
                placeholder="Enter your percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className="h-12 text-base"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full text-base">
            Check Eligible Colleges
          </Button>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Eligible</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span>Borderline (within 5%)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <XCircle className="h-5 w-5 text-red-500" />
              <span>Not Eligible</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
