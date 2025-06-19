
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, GraduationCap } from 'lucide-react';

interface CollegeStepProps {
  data: any;
  updateData: (data: any) => void;
}

const CollegeStep = ({ data, updateData }: CollegeStepProps) => {
  const colleges = [
    "Indian Institute of Technology Madras",
    "The New College",
    "Madras University",
    "Stella Maris",
    "SIET JABAS",
    "GSS Jain College for Women",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">
          Hey {data.fullName ? data.fullName.split(' ')[0] : 'there'}! Tell us about your institution
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Region
          </Label>
          <Select value={data.region} onValueChange={(value) => updateData({ region: value })}>
            <SelectTrigger className="bg-white/50 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">College/University</Label>
          <Select value={data.college} onValueChange={(value) => updateData({ college: value })}>
            <SelectTrigger className="bg-white/50 border-gray-300">
              <SelectValue placeholder="Select your college/university" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CollegeStep;
