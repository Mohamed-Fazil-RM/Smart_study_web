
import { useState, useEffect } from 'react';
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
import SubjectSelectionStep from '@/components/onboarding/SubjectSelectionStep';

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
  selectedSubjects: string[];
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Redirect to signup if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      console.log('User not authenticated, redirecting to signup');
      navigate('/signup');
    }
  }, [user, authLoading, navigate]);
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
    startYear: '',
    selectedSubjects: []
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
        { component: SubjectSelectionStep, title: "Select your subjects" },
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
    if (!user) {
      toast.error('Please sign up first');
      navigate('/signup');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Saving profile for user:', user.id);
      console.log('Profile data:', data);
      
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
          // Set permissions based on education type
          can_tutor: data.educationType === 'college',
          can_take_paid_jobs: data.educationType === 'college',
          can_post_paid_jobs: true, // All users can post paid jobs
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Profile save error:', error);
        throw error;
      }

      console.log('Profile saved successfully');

      // Save selected subjects for school students
      if (data.educationType === 'school' && data.selectedSubjects.length > 0) {
        console.log('Saving subjects:', data.selectedSubjects);
        const subjectInserts = data.selectedSubjects.map(subjectId => ({
          user_id: user.id,
          subject_id: subjectId
        }));
        
        const { error: subjectsError } = await supabase.from('user_subjects').insert(subjectInserts);
        if (subjectsError) {
          console.error('Subjects save error:', subjectsError);
          throw subjectsError;
        }
        console.log('Subjects saved successfully');
      }

      // Create default course if user has course info (for college students)
      if (data.course && data.educationType === 'college') {
        console.log('Creating course:', data.course);
        const { error: courseError } = await supabase.from('courses').insert({
          user_id: user.id,
          name: data.course,
          code: data.degree
        });
        if (courseError) {
          console.error('Course save error:', courseError);
          throw courseError;
        }
        console.log('Course saved successfully');
      }

      toast.success('Profile saved successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Save profile error:', error);
      toast.error('Failed to save profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateCurrentStep = () => {
    const currentStepTitle = steps[currentStep].title;
    
    // Name step validation
    if (currentStepTitle.includes("Let's get started")) {
      if (!data.fullName.trim()) {
        toast.error('Please enter your full name');
        return false;
      }
    }
    
    // Education type selection
    if (currentStepTitle.includes("Tell us about your education")) {
      if (!data.educationType) {
        toast.error('Please select school or college');
        return false;
      }
    }
    
    // School-specific validations
    if (data.educationType === 'school') {
      if (currentStepTitle.includes("Tell us about your school")) {
        if (!data.school?.trim() || !data.board) {
          toast.error('Please fill in your school name and board');
          return false;
        }
      }
      
      if (currentStepTitle.includes("Which standard")) {
        if (!data.standard) {
          toast.error('Please select your standard');
          return false;
        }
      }
      
      if (currentStepTitle.includes("What's your stream")) {
        if (!data.course?.trim()) {
          toast.error('Please select or enter your stream');
          return false;
        }
      }
      
      if (currentStepTitle.includes("Select your subjects")) {
        if (!data.selectedSubjects || data.selectedSubjects.length === 0) {
          toast.error('Please select at least one subject');
          return false;
        }
      }
    }
    
    // College-specific validations
    if (data.educationType === 'college') {
      if (currentStepTitle.includes("Tell us about your institution")) {
        if (!data.college) {
          toast.error('Please select your college/university');
          return false;
        }
      }
      
      if (currentStepTitle.includes("degree level")) {
        if (!data.degree) {
          toast.error('Please select your degree level');
          return false;
        }
      }
      
      if (currentStepTitle.includes("What's your course")) {
        if (!data.course?.trim()) {
          toast.error('Please select or enter your course');
          return false;
        }
      }
    }
    
    // Start year validation (for both school and college)
    if (currentStepTitle.includes("When did you start")) {
      if (!data.startYear) {
        toast.error('Please select your start year');
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }
    
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

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

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
