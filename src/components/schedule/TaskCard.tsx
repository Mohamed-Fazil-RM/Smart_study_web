
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, Edit } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  task_date: string;
  task_time: string;
  task_type: 'study' | 'meet' | 'project' | 'assignment';
  status: 'pending' | 'completed' | 'failed' | 'not_marked';
  created_at: string;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onStatusChange, onEdit }: TaskCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'failed': return 'border-red-500 bg-red-50';
      case 'not_marked': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'border-blue-500 bg-blue-50';
      case 'meet': return 'border-green-500 bg-green-50';
      case 'project': return 'border-purple-500 bg-purple-50';
      case 'assignment': return 'border-red-500 bg-red-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className={`border-l-4 ${getStatusColor(task.status)}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-sm mb-1">{task.title}</h4>
            {task.description && (
              <p className="text-xs text-gray-600 mb-2">{task.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>{task.task_time}</span>
              <span className={`capitalize px-2 py-1 rounded ${getTypeColor(task.task_type)}`}>
                {task.task_type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(task)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onStatusChange(task.id, 'completed')}
                className={`h-8 w-8 p-0 ${task.status === 'completed' ? 'bg-green-100' : ''}`}
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onStatusChange(task.id, 'failed')}
                className={`h-8 w-8 p-0 ${task.status === 'failed' ? 'bg-red-100' : ''}`}
              >
                <XCircle className="h-4 w-4 text-red-600" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onStatusChange(task.id, 'not_marked')}
                className={`h-8 w-8 p-0 ${task.status === 'not_marked' ? 'bg-blue-100' : ''}`}
              >
                <Clock className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
