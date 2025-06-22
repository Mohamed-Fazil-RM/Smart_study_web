import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Target } from 'lucide-react';

const GradePrediction = () => {
  const [internalMarks, setInternalMarks] = useState('');
  const [targetGrade, setTargetGrade] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [internalWeightage, setInternalWeightage] = useState('30');
  const [prediction, setPrediction] = useState({ required: 0, possibility: '', advice: '' });

  const predictGrade = () => {
    const internal = parseFloat(internalMarks) || 0;
    const total = parseFloat(totalMarks) || 100;
    const target = parseFloat(targetGrade) || 0;
    const weightage = parseFloat(internalWeightage) / 100;
    
    const internalContribution = internal * weightage;
    const externalWeightage = 1 - weightage;
    const requiredExternal = (target - internalContribution) / externalWeightage;
    
    let possibility = '';
    let advice = '';
    
    if (requiredExternal <= 0) {
      possibility = 'Already Achieved!';
      advice = 'You have already achieved your target grade with internal marks alone!';
    } else if (requiredExternal <= total) {
      if (requiredExternal <= total * 0.4) {
        possibility = 'Very Easy';
        advice = 'You need very low marks in external exam. Focus on basic concepts.';
      } else if (requiredExternal <= total * 0.6) {
        possibility = 'Easy';
        advice = 'Achievable with moderate preparation. Review key topics.';
      } else if (requiredExternal <= total * 0.8) {
        possibility = 'Moderate';
        advice = 'Requires good preparation. Focus on important topics and practice.';
      } else {
        possibility = 'Difficult';
        advice = 'Requires excellent preparation. Study extensively and practice regularly.';
      }
    } else {
      possibility = 'Not Possible';
      advice = 'Target grade not achievable. Consider adjusting your target or improving internal marks.';
    }
    
    setPrediction({
      required: Math.max(0, requiredExternal),
      possibility,
      advice
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Grade Prediction</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Grade Prediction</h1>
                <p className="text-gray-600">Predict required marks to achieve your target grade</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Input Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="internalMarks">Internal Marks Obtained</Label>
                      <Input
                        id="internalMarks"
                        type="number"
                        placeholder="Enter your internal marks"
                        value={internalMarks}
                        onChange={(e) => setInternalMarks(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="targetGrade">Target Overall Percentage</Label>
                      <Input
                        id="targetGrade"
                        type="number"
                        placeholder="Enter target percentage"
                        value={targetGrade}
                        onChange={(e) => setTargetGrade(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="totalMarks">Total External Marks</Label>
                      <Input
                        id="totalMarks"
                        type="number"
                        placeholder="Enter total external marks"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Internal Marks Weightage</Label>
                      <Select value={internalWeightage} onValueChange={setInternalWeightage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="25">25%</SelectItem>
                          <SelectItem value="30">30%</SelectItem>
                          <SelectItem value="40">40%</SelectItem>
                          <SelectItem value="50">50%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={predictGrade} className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Predict Grade
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prediction Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">
                        {prediction.required.toFixed(1)}
                      </div>
                      <div className="text-lg text-gray-600">Marks Required in External</div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-semibold ${
                        prediction.possibility === 'Very Easy' || prediction.possibility === 'Easy' ? 'text-green-600' :
                        prediction.possibility === 'Moderate' ? 'text-yellow-600' :
                        prediction.possibility === 'Difficult' ? 'text-orange-600' :
                        prediction.possibility === 'Not Possible' ? 'text-red-600' :
                        'text-blue-600'
                      }`}>
                        {prediction.possibility || '--'}
                      </div>
                      <div className="text-sm text-gray-600">Difficulty Level</div>
                    </div>

                    {prediction.advice && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Advice:</h4>
                        <p className="text-blue-700 text-sm">{prediction.advice}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default GradePrediction;
