import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Calendar, MessageSquare, BarChart3, User, Settings, Bell, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Plus, Maximize, Minimize } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [originalTime, setOriginalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(time => time - 1);
      }, 1000);
    } else if (focusTime === 0) {
      setIsRunning(false);
      // Timer completed notification
      alert('Focus session completed!');
    }
    return () => clearInterval(interval);
  }, [isRunning, focusTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setFocusTime(originalTime);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const setCustomTimer = () => {
    const newTime = customMinutes * 60;
    setFocusTime(newTime);
    setOriginalTime(newTime);
    setIsRunning(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
      days.push(<div key={day} className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded-md ${isToday ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-gray-100'}`}>
          {day}
        </div>);
    }
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="w-full h-full border-8 border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-blue-400 rounded-full" style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * (1 - focusTime / originalTime)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`
            }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">{formatTime(focusTime)}</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center mb-4">
            <Button onClick={toggleTimer} size="lg" className="bg-blue-600 hover:bg-blue-700">
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button onClick={resetTimer} variant="outline" size="lg">
              <RotateCcw className="w-6 h-6" />
            </Button>
            <Button onClick={toggleFullscreen} variant="outline" size="lg">
              <Minimize className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-white text-xl">Do Not Disturb Mode</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <main className="p-6 bg-gray-50 min-h-screen">
            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="h-7 w-7" />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                      <p className="text-gray-600">Monday, 20 June 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
                      <Bell className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>GC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Gareth Christopher</p>
                        <p className="text-sm text-gray-500">@garethchris</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Hello, Gareth!</h2>
                        <p className="text-blue-100 mb-4">We've missed you! Check out what's new in your dashboard</p>
                        <Button variant="secondary" size="sm">
                          Explore New Classes
                        </Button>
                      </div>
                      <div className="w-32 h-32 rounded-lg flex items-center justify-center overflow-hidden">
                        <Avatar className="w-32 h-32">
                          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face" className="object-cover" />
                          <AvatarFallback className="w-32 h-32 text-4xl bg-blue-400 text-white">GC</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-4 gap-4">
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">3.8</p>
                          <p className="text-sm text-gray-600">GPA</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">8</p>
                          <p className="text-sm text-gray-600">Tasks</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">132</p>
                          <p className="text-sm text-gray-600">Hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">124</p>
                          <p className="text-sm text-gray-600">Points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg">Forum Live Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">Sarah is working on Data Structures assignment</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">New post in Web Development community</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">Mike completed Algorithm quiz</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Focus Mode</CardTitle>
                        <Button onClick={toggleFullscreen} variant="outline" size="sm">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                      <div className="relative w-32 h-32">
                        <div className="w-full h-full border-8 border-gray-200 rounded-full"></div>
                        <div className="absolute inset-0 border-8 border-blue-500 rounded-full" style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * (1 - focusTime / originalTime)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`
                        }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{formatTime(focusTime)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={toggleTimer} size="sm">
                          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button onClick={resetTimer} variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Set</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Set Focus Timer</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Minutes</label>
                                <Input
                                  type="number"
                                  value={customMinutes}
                                  onChange={(e) => setCustomMinutes(Number(e.target.value))}
                                  min="1"
                                  max="120"
                                />
                              </div>
                              <Button onClick={setCustomTimer} className="w-full">
                                Set Timer
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[{
                        title: "Market Analysis Report",
                        subject: "Business Strategy",
                        due: "Oct 23, 2027",
                        progress: 30,
                        priority: "High"
                      }, {
                        title: "Corporate Finance Case Study",
                        subject: "Finance",
                        due: "Nov 5, 2027",
                        progress: 0,
                        priority: "Not Started"
                      }].map((assignment, index) => (
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
              </div>

              {/* Right Column - Calendar and Tasks */}
              <div className="w-80 space-y-6">
                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-xs text-gray-500 text-center py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">My Schedule</CardTitle>
                      <Button size="sm" variant="ghost">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="font-medium text-sm">Business Strategy Development Test</p>
                        <p className="text-xs text-gray-600">Business Strategy • 9:00 AM - 11:00 AM</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <p className="font-medium text-sm">Financial Analysis Presentation</p>
                        <p className="text-xs text-gray-600">Finance • 2:00 PM - 3:30 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Watched a lecture video on Business Ethics</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
