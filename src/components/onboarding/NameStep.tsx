import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface NameStepProps {
  data: any;
  updateData: (data: any) => void;
}

const NameStep = ({ data, updateData }: NameStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">What's your full name?</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          value={data.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          className="text-lg p-4 bg-white/50 border-gray-300"
        />
      </div>
    </div>
  );
};

export default NameStep;