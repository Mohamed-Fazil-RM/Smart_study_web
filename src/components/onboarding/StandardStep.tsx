
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen } from 'lucide-react';

interface StandardStepProps {
  data: any;
  updateData: (data: any) => void;
}

const StandardStep = ({ data, updateData }: StandardStepProps) => {
  const standards = ["9th", "10th", "11th", "12th"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">Which standard are you in?</p>
      </div>

      <div className="space-y-2 max-w-xs mx-auto">
        <Label className="text-gray-700 font-medium">Standard</Label>
        <Select value={data.standard} onValueChange={(value) => updateData({ standard: value })}>
          <SelectTrigger className="bg-white/50 border-gray-300">
            <SelectValue placeholder="Select your standard" />
          </SelectTrigger>
          <SelectContent>
            {standards.map((standard) => (
              <SelectItem key={standard} value={standard}>
                {standard}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StandardStep;
