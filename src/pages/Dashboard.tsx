
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, MessageSquare, BarChart3, User, Settings } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Study
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Smart Study!</h1>
          <p className="text-gray-600">Your personalized learning dashboard is ready to help you succeed.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-lg border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Study Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">24h</div>
              <p className="text-xs text-gray-500">This week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-lg border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">5</div>
              <p className="text-xs text-gray-500">Active courses</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-lg border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-xs text-gray-500">Due this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-lg border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <p className="text-xs text-gray-500">Overall progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Study Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Access your personalized study materials and AI-generated content.</p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                Browse Materials
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Schedule Planner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Organize your study schedule and track important deadlines.</p>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                Discussion Forums
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Connect with fellow students and participate in discussions.</p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                Join Discussions
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-orange-600" />
                Grade Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Calculate and track your grades across all courses.</p>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600">
                Calculate Grades
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow cursor-pointer col-span-full md:col-span-2">
            <CardHeader>
              <CardTitle>AI Study Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Get personalized help from our AI assistant. Ask questions, generate flashcards, or get explanations tailored to your learning style.</p>
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Ask AI Question
                </Button>
                <Button variant="outline">
                  Generate Flashcards
                </Button>
                <Button variant="outline">
                  Practice Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
