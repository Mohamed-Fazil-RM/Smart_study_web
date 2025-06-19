
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Target, Plus, Trash2, TrendingUp } from 'lucide-react';

const GradeTracker = () => {
  const [semesters, setSemesters] = useState([
    {
      id: 1,
      name: 'Semester 1',
      subjects: [
        { id: 1, name: 'Mathematics', credits: 4, grade: 8.5 },
        { id: 2, name: 'Physics', credits: 3, grade: 7.8 }
      ]
    }
  ]);

  const [newSemester, setNewSemester] = useState({ name: '', subjects: [] });
  const [newSubject, setNewSubject] = useState({ name: '', credits: '', grade: '' });

  const addSemester = () => {
    if (newSemester.name) {
      setSemesters([...semesters, {
        id: Date.now(),
        name: newSemester.name,
        subjects: []
      }]);
      setNewSemester({ name: '', subjects: [] });
    }
  };

  const calculateSemesterGPA = (subjects: any[]) => {
    if (subjects.length === 0) return 0;
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    subjects.forEach(subject => {
      totalGradePoints += subject.grade * subject.credits;
      totalCredits += subject.credits;
    });
    
    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  };

  const calculateOverallGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    semesters.forEach(semester => {
      semester.subjects.forEach(subject => {
        totalGradePoints += subject.grade * subject.credits;
        totalCredits += subject.credits;
      });
    });
    
    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grade Tracker</h1>
          <p className="text-gray-600">Track your academic performance across semesters</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Semester
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Semester</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="semesterName">Semester Name</Label>
                <Input
                  id="semesterName"
                  value={newSemester.name}
                  onChange={(e) => setNewSemester({...newSemester, name: e.target.value})}
                  placeholder="e.g., Semester 2"
                />
              </div>
              <Button onClick={addSemester} className="w-full">Add Semester</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Overall Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {calculateOverallGPA().toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Overall GPA</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {semesters.length}
              </div>
              <div className="text-sm text-gray-600">Semesters</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {semesters.reduce((total, sem) => total + sem.subjects.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Subjects</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {semesters.map((semester) => (
          <Card key={semester.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  {semester.name}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  GPA: {calculateSemesterGPA(semester.subjects).toFixed(2)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {semester.subjects.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No subjects added yet
                </div>
              ) : (
                <div className="space-y-3">
                  {semester.subjects.map((subject) => (
                    <div key={subject.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-gray-600">Credits: {subject.credits}</div>
                      </div>
                      <div className="text-lg font-semibold text-blue-600">
                        {subject.grade}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button variant="outline" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GradeTracker;
