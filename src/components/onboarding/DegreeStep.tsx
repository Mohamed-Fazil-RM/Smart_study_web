import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, BookOpen, Award, Users } from 'lucide-react';

interface DegreeStepProps {
  data: any;
  updateData: (data: any) => void;
}

const DegreeStep = ({ data, updateData }: DegreeStepProps) => {
  const degrees = [
    { value: "Bachelor", label: "Bachelor's Degree", icon: BookOpen, color: "from-blue-600 to-indigo-600" },
    { value: "Master", label: "Master's Degree", icon: GraduationCap, color: "from-purple-600 to-pink-600" },
    { value: "Doctorate/PhD", label: "Doctorate/PhD", icon: Award, color: "from-amber-600 to-orange-600" },
    { value: "Other", label: "Other", icon: Users, color: "from-gray-600 to-slate-600" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-lg">Select your degree level below</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {degrees.map((degree) => {
          const Icon = degree.icon;
          const isSelected = data.degree === degree.value;
          
          return (
            <Card
              key={degree.value}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'ring-2 ring-blue-500 bg-blue-50/50'
                  : 'hover:shadow-lg bg-white/50'
              }`}
              onClick={() => updateData({ degree: degree.value })}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${degree.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{degree.label}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DegreeStep;