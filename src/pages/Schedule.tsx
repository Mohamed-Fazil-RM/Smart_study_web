
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AddTaskDialog } from '@/components/schedule/AddTaskDialog';
import { Calendar, Clock, CheckCircle, AlertCircle, Bell, ArrowLeft } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  date: Date;
  type: 'study' | 'meet' | 'project' | 'assignment';
}

const Schedule = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  
  const todaysTasks = [
    { id: 1, title: 'Complete Data Structures Assignment', time: '10:00 AM', status: 'pending', priority: 'high' },
    { id: 2, title: 'Study for Database Quiz', time: '2:00 PM', status: 'completed', priority: 'medium' },
    { id: 3, title: 'Group Project Meeting', time: '4:00 PM', status: 'pending', priority: 'high' },
    { id: 4, title: 'Review Algorithm Notes', time: '7:00 PM', status: 'pending', priority: 'low' }
  ];

  const upcomingTasks = [
    { id: 5, title: 'Submit Research Paper', date: 'Tomorrow', time: '11:59 PM', priority: 'high' },
    { id: 6, title: 'Computer Networks Exam', date: 'Friday', time: '9:00 AM', priority: 'high' },
    { id: 7, title: 'Project Presentation', date: 'Next Week', time: '2:00 PM', priority: 'medium' }
  ];

  const handleTaskAdded = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'study': return 'border-blue-500 bg-blue-50';
      case 'meet': return 'border-green-500 bg-green-50';
      case 'project': return 'border-purple-500 bg-purple-50';
      case 'assignment': return 'border-red-500 bg-red-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const hasTaskOnDate = (date: number) => {
    return tasks.some(task => 
      task.date.getDate() === date && 
      task.date.getMonth() === currentDate.getMonth() &&
      task.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getTasksForSelectedDate = () => {
    return tasks.filter(task => isSameDay(task.date, selectedDate));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/dashboard')}
                  className="h-7 w-7"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900">Schedule</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <AddTaskDialog onTaskAdded={handleTaskAdded} />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Calendar Section */}
              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Calendar View
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 6; // Start from previous month
                      const isToday = day === currentDate.getDate();
                      const hasTask = [5, 12, 18, 25].includes(day) || hasTaskOnDate(day);
                      const isSelected = day === selectedDate.getDate();
                      
                      return (
                        <div
                          key={i}
                          className={`
                            aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer relative
                            ${isToday ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100'}
                            ${isSelected ? 'ring-2 ring-blue-500' : ''}
                            ${day <= 0 ? 'text-gray-300' : ''}
                          `}
                          onClick={() => {
                            if (day > 0) {
                              const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                              setSelectedDate(newSelectedDate);
                            }
                          }}
                        >
                          {day > 0 ? day : ''}
                          {hasTask && day > 0 && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Today's Tasks */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todaysTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-lg border-l-4 ${
                          task.priority === 'high' ? 'border-red-500 bg-red-50' :
                          task.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                          'border-green-500 bg-green-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </p>
                            <p className="text-xs text-gray-600">{task.time}</p>
                          </div>
                          {task.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Date Tasks */}
            {selectedDate && (
              <Card className="mt-6 bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle>Tasks for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {getTasksForSelectedDate().length > 0 ? (
                    <div className="space-y-3">
                      {getTasksForSelectedDate().map((task) => (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border-l-4 ${getTaskColor(task.type)}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                              <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{task.time}</span>
                                <span className="capitalize bg-white px-2 py-1 rounded">{task.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No tasks scheduled for this date</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Tasks */}
            <Card className="mt-6 bg-white/80 backdrop-blur-lg border-white/30">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border ${
                        task.priority === 'high' ? 'border-red-200 bg-red-50' :
                        task.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                        'border-green-200 bg-green-50'
                      }`}
                    >
                      <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{task.date}</span>
                        <span>{task.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Schedule;
