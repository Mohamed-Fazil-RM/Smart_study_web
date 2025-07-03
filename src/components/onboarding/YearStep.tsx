import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface YearStepProps {
  data: any;
  updateData: (data: any) => void;
}

const YearStep = ({ data, updateData }: YearStepProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">Which year did you start studying?</p>
      </div>

      <div className="space-y-2 max-w-xs mx-auto">
        <Label className="text-gray-700 font-medium">Start Year</Label>
        <Select value={data.startYear} onValueChange={(value) => updateData({ startYear: value })}>
          <SelectTrigger className="bg-white/50 border-gray-300">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          You're almost done! Click continue to finish setup.
        </p>
      </div>
    </div>
  );
};

export default YearStep;