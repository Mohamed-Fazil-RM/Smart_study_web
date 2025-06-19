
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Plus, Trash2 } from 'lucide-react';

const GradeCalculator = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: '', credits: '', grade: '' }
  ]);
  const [result, setResult] = useState({ gpa: 0, totalCredits: 0, letterGrade: '' });

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), name: '', credits: '', grade: '' }]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const updateSubject = (id: number, field: string, value: string) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
      const credits = parseFloat(subject.credits) || 0;
      const grade = parseFloat(subject.grade) || 0;
      
      totalGradePoints += grade * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    const letterGrade = getLetterGrade(gpa);
    
    setResult({ gpa, totalCredits, letterGrade });
  };

  const getLetterGrade = (gpa: number) => {
    if (gpa >= 9.0) return 'A+';
    if (gpa >= 8.0) return 'A';
    if (gpa >= 7.0) return 'B+';
    if (gpa >= 6.0) return 'B';
    if (gpa >= 5.0) return 'C+';
    if (gpa >= 4.0) return 'C';
    return 'F';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Grade Calculator</h1>
        <p className="text-gray-600">Calculate your GPA and overall grade</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Subject Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <Label>Subject Name</Label>
                  <Input
                    placeholder="Subject name"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <Label>Credits</Label>
                  <Input
                    type="number"
                    placeholder="Credits"
                    value={subject.credits}
                    onChange={(e) => updateSubject(subject.id, 'credits', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <Label>Grade Points</Label>
                  <Input
                    type="number"
                    step="0.1"
                    max="10"
                    placeholder="0-10"
                    value={subject.grade}
                    onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeSubject(subject.id)}
                    disabled={subjects.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex space-x-2">
              <Button onClick={addSubject} variant="outline" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
              <Button onClick={calculateGPA} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate GPA
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {result.gpa.toFixed(2)}
              </div>
              <div className="text-lg text-gray-600">GPA</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-semibold text-green-600">
                  {result.letterGrade || '--'}
                </div>
                <div className="text-sm text-gray-600">Letter Grade</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-semibold text-purple-600">
                  {result.totalCredits}
                </div>
                <div className="text-sm text-gray-600">Total Credits</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Grade Scale:</h4>
              <div className="text-sm space-y-1 text-gray-600">
                <div>A+ (9.0-10.0) | A (8.0-8.9) | B+ (7.0-7.9)</div>
                <div>B (6.0-6.9) | C+ (5.0-5.9) | C (4.0-4.9) | F (&lt;4.0)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradeCalculator;
