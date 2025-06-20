
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const AssignmentsWidget = () => {
  const assignments = [
    {
      title: "Market Analysis Report",
      subject: "Business Strategy",
      due: "Oct 23, 2027",
      progress: 30,
      priority: "High"
    },
    {
      title: "Corporate Finance Case Study",
      subject: "Finance",
      due: "Nov 5, 2027",
      progress: 0,
      priority: "Not Started"
    }
  ];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{assignment.due}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  assignment.priority === 'High' ? 'bg-red-100 text-red-600' : 
                  assignment.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
                  'bg-gray-100 text-gray-600'
                }`}>
                  {assignment.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
