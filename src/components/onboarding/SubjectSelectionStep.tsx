import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Subject {
  id: string;
  name: string;
  category: string;
}

interface SubjectSelectionStepProps {
  data: any;
  updateData: (data: any) => void;
}

const SubjectSelectionStep = ({ data, updateData }: SubjectSelectionStepProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(data.selectedSubjects || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data: subjectsData, error } = await supabase
        .from('subjects')
        .select('id, name, category')
        .eq('education_type', 'school')
        .order('category, name');

      if (error) throw error;
      setSubjects(subjectsData || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const toggleSubject = (subjectId: string) => {
    const newSelectedSubjects = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    
    setSelectedSubjects(newSelectedSubjects);
    updateData({ selectedSubjects: newSelectedSubjects });
  };

  const groupedSubjects = subjects.reduce((acc, subject) => {
    if (!acc[subject.category]) {
      acc[subject.category] = [];
    }
    acc[subject.category].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg">Loading subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">
          Select the subjects you're studying
        </p>
        <p className="text-sm text-gray-500 mt-2">
          You can add or remove subjects later from your courses page
        </p>
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto">
        {Object.entries(groupedSubjects).map(([category, categorySubjects]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-gray-800 text-lg">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categorySubjects.map((subject) => (
                <Card
                  key={subject.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedSubjects.includes(subject.id)
                      ? 'ring-2 ring-green-500 bg-green-50/50'
                      : 'hover:bg-gray-50 bg-white/50'
                  }`}
                  onClick={() => toggleSubject(subject.id)}
                >
                  <CardContent className="p-3 flex items-center justify-between">
                    <span className="text-gray-900">{subject.name}</span>
                    {selectedSubjects.includes(subject.id) && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedSubjects.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <Label className="text-gray-700 font-medium mb-2 block">
            Selected Subjects ({selectedSubjects.length})
          </Label>
          <div className="flex flex-wrap gap-2">
            {selectedSubjects.map((subjectId) => {
              const subject = subjects.find(s => s.id === subjectId);
              return subject ? (
                <Badge key={subjectId} variant="secondary" className="bg-green-100 text-green-800">
                  {subject.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectSelectionStep;