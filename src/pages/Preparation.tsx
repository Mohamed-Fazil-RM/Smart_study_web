import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Brain, MessageCircle, FileText, Zap, Target, Users, Bell } from 'lucide-react';

const Preparation = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Preparation</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-16 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparation Hub</h2>
                <p className="text-gray-600">Get ready for your exams and interviews with our comprehensive preparation tools</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quiz Prep */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-6 w-6 mr-3 text-blue-600" />
                      Quiz Prep
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Practice with college-specific quizzes or AI-generated questions on any topic</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium">Available College Quizzes</span>
                        <span className="text-sm text-blue-600">25 Sets</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">AI Generated Quizzes</span>
                        <span className="text-sm text-green-600">Unlimited</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                      <Zap className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>

                {/* Interview Prep */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-6 w-6 mr-3 text-green-600" />
                      Interview Prep
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Prepare for interviews with questions, resume builder, and career guidance</p>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="h-4 w-4 mr-2" />
                        Interview Questions
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Resume Builder
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Career Guidance
                      </Button>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600">
                      Start Interview Prep
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Prep Pro Section */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle>Prep Pro - Career Pathway</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Tell us your ambition and get a personalized roadmap to achieve your goals</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h3 className="font-medium">Set Goals</h3>
                      <p className="text-sm text-gray-600">Define your career ambitions</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-medium">Get Roadmap</h3>
                      <p className="text-sm text-gray-600">Receive personalized guidance</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h3 className="font-medium">Take Action</h3>
                      <p className="text-sm text-gray-600">Follow the roadmap to success</p>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600">
                    Start Your Journey
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

export default Preparation;
