
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { BookOpen, Plus, Search, FileText, Video, HelpCircle, Upload, Settings, Bell } from 'lucide-react';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: 1,
      name: 'Data Structures and Algorithms',
      code: 'CS101',
      instructor: 'Dr. Smith',
      resources: { notes: 12, pyqs: 8, videos: 15, mcqs: 50 }
    },
    {
      id: 2,
      name: 'Database Management Systems',
      code: 'CS201',
      instructor: 'Prof. Johnson',
      resources: { notes: 10, pyqs: 6, videos: 12, mcqs: 40 }
    },
    {
      id: 3,
      name: 'Computer Networks',
      code: 'CS301',
      instructor: 'Dr. Brown',
      resources: { notes: 8, pyqs: 5, videos: 10, mcqs: 35 }
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900">Courses</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[calc(100vh-4rem)]">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-lg"
                />
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{course.name}</h3>
                          <p className="text-sm text-gray-600">{course.code}</p>
                        </div>
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </CardTitle>
                      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm">{course.resources.notes} Notes</span>
                        </div>
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 mr-2 text-orange-600" />
                          <span className="text-sm">{course.resources.pyqs} PYQs</span>
                        </div>
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-2 text-red-600" />
                          <span className="text-sm">{course.resources.videos} Videos</span>
                        </div>
                        <div className="flex items-center">
                          <Settings className="h-4 w-4 mr-2 text-purple-600" />
                          <span className="text-sm">{course.resources.mcqs} MCQs</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          View Course
                        </Button>
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add Course Section */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30 border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <Plus className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Add New Course</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Add courses that aren't listed or create custom study materials
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Courses;
