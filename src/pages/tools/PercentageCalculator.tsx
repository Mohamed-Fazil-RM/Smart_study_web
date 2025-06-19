
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Percent, Calculator } from 'lucide-react';

const PercentageCalculator = () => {
  const [marksObtained, setMarksObtained] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [result, setResult] = useState({ percentage: 0, grade: '' });

  const calculatePercentage = () => {
    const obtained = parseFloat(marksObtained) || 0;
    const total = parseFloat(totalMarks) || 0;
    
    if (total > 0) {
      const percentage = (obtained / total) * 100;
      const grade = getGrade(percentage);
      setResult({ percentage, grade });
    }
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Percentage Calculator</h1>
        <p className="text-gray-600">Calculate percentage and grade from marks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="h-5 w-5 mr-2" />
              Enter Marks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="marksObtained">Marks Obtained</Label>
              <Input
                id="marksObtained"
                type="number"
                placeholder="Enter marks obtained"
                value={marksObtained}
                onChange={(e) => setMarksObtained(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                placeholder="Enter total marks"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />
            </div>

            <Button onClick={calculatePercentage} className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Percentage
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">
                {result.percentage.toFixed(2)}%
              </div>
              <div className="text-lg text-gray-600 mt-2">Percentage</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-semibold text-green-600">
                {result.grade || '--'}
              </div>
              <div className="text-sm text-gray-600">Grade</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Grading Scale:</h4>
              <div className="text-sm space-y-1 text-gray-600">
                <div>A+ (90-100%) | A (80-89%) | B+ (70-79%)</div>
                <div>B (60-69%) | C (50-59%) | D (40-49%) | F (&lt;40%)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PercentageCalculator;
