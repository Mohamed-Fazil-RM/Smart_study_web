
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  date: Date;
  type: 'study' | 'meet' | 'project' | 'assignment';
}

interface ScheduleWidgetProps {
  tasks?: Task[];
}

export const ScheduleWidget = ({ tasks = [] }: ScheduleWidgetProps) => {
  const navigate = useNavigate();

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'study': return 'border-blue-500 bg-blue-50';
      case 'meet': return 'border-green-500 bg-green-50';
      case 'project': return 'border-purple-500 bg-purple-50';
      case 'assignment': return 'border-red-500 bg-red-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const todaysTasks = tasks.filter(task => {
    const today = new Date();
    return task.date.toDateString() === today.toDateString();
  });

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">My Schedule</CardTitle>
          <Button size="sm" variant="ghost" onClick={() => navigate('/schedule')}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Default tasks */}
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="font-medium text-sm">Business Strategy Development Test</p>
            <p className="text-xs text-gray-600">Business Strategy • 9:00 AM - 11:00 AM</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="font-medium text-sm">Financial Analysis Presentation</p>
            <p className="text-xs text-gray-600">Finance • 2:00 PM - 3:30 PM</p>
          </div>
          
          {/* User added tasks for today */}
          {todaysTasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border-l-4 ${getTaskColor(task.type)}`}
            >
              <p className="font-medium text-sm">{task.title}</p>
              <p className="text-xs text-gray-600 capitalize">{task.type} • {task.time}</p>
            </div>
          ))}
          
          {todaysTasks.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">No additional tasks for today</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => navigate('/schedule')}
              >
                Add Task
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
