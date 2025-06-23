
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import NameStep from '@/components/onboarding/NameStep';
import SchoolCollegeStep from '@/components/onboarding/SchoolCollegeStep';
import CollegeStep from '@/components/onboarding/CollegeStep';
import SchoolStep from '@/components/onboarding/SchoolStep';
import StandardStep from '@/components/onboarding/StandardStep';
import DegreeStep from '@/components/onboarding/DegreeStep';
import CourseStep from '@/components/onboarding/CourseStep';
import YearStep from '@/components/onboarding/YearStep';

interface OnboardingData {
  fullName: string;
  educationType: string;
  region: string;
  college: string;
  school: string;
  board: string;
  standard: string;
  degree: string;
  course: string;
  startYear: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    fullName: '',
    educationType: '',
    region: 'India',
    college: '',
    school: '',
    board: '',
    standard: '',
    degree: '',
    course: '',
    startYear: ''
  });

  const getSteps = () => {
    const baseSteps = [
      { component: NameStep, title: "Let's get started!" },
      { component: SchoolCollegeStep, title: "Tell us about your education" }
    ];

    if (data.educationType === 'school') {
      return [
        ...baseSteps,
        { component: SchoolStep, title: "Tell us about your school" },
        { component: StandardStep, title: "Which standard?" },
        { component: CourseStep, title: "What's your stream?" },
        { component: YearStep, title: "When did you start?" }
      ];
    } else if (data.educationType === 'college') {
      return [
        ...baseSteps,
        { component: CollegeStep, title: "Tell us about your institution" },
        { component: DegreeStep, title: "What's your degree level?" },
        { component: CourseStep, title: "What's your course?" },
        { component: YearStep, title: "When did you start?" }
      ];
    } else {
      return baseSteps;
    }
  };

  const steps = getSteps();

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.fullName,
          education_type: data.educationType,
          region: data.region,
          college: data.college,
          school: data.school,
          board: data.board,
          standard: data.standard,
          degree: data.degree,
          course: data.course,
          start_year: data.startYear,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Create default course if user has course info
      if (data.course) {
        await supabase.from('courses').insert({
          user_id: user.id,
          name: data.course,
          code: data.educationType === 'school' ? data.standard : data.degree
        });
      }

      toast.success('Profile saved successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Failed to save profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      saveProfile();
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
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2"
            >
              {loading ? 'Saving...' : currentStep === steps.length - 1 ? "Let's Go!" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
