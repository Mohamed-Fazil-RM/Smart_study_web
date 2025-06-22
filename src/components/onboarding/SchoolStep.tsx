
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School } from 'lucide-react';

interface SchoolStepProps {
  data: any;
  updateData: (data: any) => void;
}

const SchoolStep = ({ data, updateData }: SchoolStepProps) => {
  const boards = [
    "State Board",
    "CBSE",
    "ICSE", 
    "Matriculation",
    "International",
    "Anglo-Indian"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <School className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">Tell us about your school</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">School Name</Label>
          <Input
            type="text"
            placeholder="Enter your school name"
            value={data.school || ''}
            onChange={(e) => updateData({ school: e.target.value })}
            className="bg-white/50 border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Board</Label>
          <Select value={data.board} onValueChange={(value) => updateData({ board: value })}>
            <SelectTrigger className="bg-white/50 border-gray-300">
              <SelectValue placeholder="Select your board" />
            </SelectTrigger>
            <SelectContent>
              {boards.map((board) => (
                <SelectItem key={board} value={board}>
                  {board}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SchoolStep;
