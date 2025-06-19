
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { User, Settings, Bell, MapPin, GraduationCap, Calendar, BookOpen, Target, TrendingUp } from 'lucide-react';

const Profile = () => {
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
                <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[calc(100vh-4rem)]">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Profile Header */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">John Doe</CardTitle>
                      <p className="text-gray-600">Computer Science Student</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        Chennai, India
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">College</p>
                      <p className="font-medium">Indian Institute of Technology Madras</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Degree</p>
                      <p className="font-medium">Bachelor's</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Course</p>
                      <p className="font-medium">Computer Science Engineering</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Year Started</p>
                      <p className="font-medium">2022</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tasks Completed</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tasks Failed</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Resources Downloaded</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Resources Uploaded</span>
                      <span className="font-medium">12</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Downloaded Data Structures Notes</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Completed Assignment Task</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Target className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Scored 85% in Algorithm Quiz</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Edit Profile Button */}
              <div className="flex justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Edit Profile
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
