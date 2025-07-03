import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GraduationCap, School } from 'lucide-react';

interface SchoolCollegeStepProps {
  data: any;
  updateData: (data: any) => void;
}

const SchoolCollegeStep = ({ data, updateData }: SchoolCollegeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <School className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">Are you currently in school or college?</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <RadioGroup 
          value={data.educationType} 
          onValueChange={(value) => updateData({ educationType: value })}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="school" id="school" />
            <Label htmlFor="school" className="flex items-center gap-3 cursor-pointer">
              <School className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">School</p>
                <p className="text-sm text-gray-500">9th, 10th, 11th, 12th standard</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="college" id="college" />
            <Label htmlFor="college" className="flex items-center gap-3 cursor-pointer">
              <GraduationCap className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">College/University</p>
                <p className="text-sm text-gray-500">Undergraduate, Graduate studies</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default SchoolCollegeStep;