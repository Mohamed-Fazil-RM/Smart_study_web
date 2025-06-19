
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import NameStep from '@/components/onboarding/NameStep';
import CollegeStep from '@/components/onboarding/CollegeStep';
import DegreeStep from '@/components/onboarding/DegreeStep';
import CourseStep from '@/components/onboarding/CourseStep';
import YearStep from '@/components/onboarding/YearStep';

interface OnboardingData {
  fullName: string;
  region: string;
  college: string;
  degree: string;
  course: string;
  startYear: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    fullName: '',
    region: 'India',
    college: '',
    degree: '',
    course: '',
    startYear: ''
  });

  const steps = [
    { component: NameStep, title: "Let's get started!" },
    { component: CollegeStep, title: "Tell us about your institution" },
    { component: DegreeStep, title: "What's your degree level?" },
    { component: CourseStep, title: "What's your course?" },
    { component: YearStep, title: "When did you start?" }
  ];

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data to localStorage for profile
      localStorage.setItem('userProfile', JSON.stringify(data));
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-lg border-white/30">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {steps[currentStep].title}
            </h1>
            <CurrentStepComponent data={data} updateData={updateData} />
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? "Let's Go!" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
