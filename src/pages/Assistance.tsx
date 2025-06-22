
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { MessageCircle, BookOpen, Users, Lightbulb, Bell, Bot, FileQuestion, Video } from 'lucide-react';

const Assistance = () => {
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
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Assistance</h1>
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get Help & Assistance</h2>
                <p className="text-gray-600 dark:text-gray-300">Find the support you need to succeed in your studies</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* AI Assistant */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow dark:bg-gray-800/80">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bot className="h-6 w-6 mr-3 text-blue-600" />
                      AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Get instant answers to your questions with our AI-powered assistant</p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                      Chat with AI
                    </Button>
                  </CardContent>
                </Card>

                {/* Study Groups */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow dark:bg-gray-800/80">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-6 w-6 mr-3 text-green-600" />
                      Study Groups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Join or create study groups with fellow students</p>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                      Find Groups
                    </Button>
                  </CardContent>
                </Card>

                {/* Q&A Forum */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow dark:bg-gray-800/80">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-6 w-6 mr-3 text-purple-600" />
                      Q&A Forum
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Ask questions and get answers from the community</p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Browse Forum
                    </Button>
                  </CardContent>
                </Card>

                {/* Video Tutorials */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow dark:bg-gray-800/80">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Video className="h-6 w-6 mr-3 text-red-600" />
                      Video Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Watch step-by-step tutorials for complex topics</p>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600">
                      Watch Videos
                    </Button>
                  </CardContent>
                </Card>

                {/* Study Materials */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow dark:bg-gray-800/80">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-6 w-6 mr-3 text-teal-600" />
                      Study Materials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Access curated study materials and resources</p>
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600">
                      Browse Materials
                    </Button>
                  </CardContent>
                </Card>

                {/* Help Center */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow dark:bg-gray-800/80">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileQuestion className="h-6 w-6 mr-3 text-orange-600" />
                      Help Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Find answers to frequently asked questions</p>
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-yellow-600">
                      Get Help
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Tips Section */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Quick Study Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-medium mb-2">Active Learning</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Engage with the material through discussions and practice problems</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-medium mb-2">Spaced Repetition</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Review material at increasing intervals for better retention</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h3 className="font-medium mb-2">Break It Down</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Divide complex topics into smaller, manageable chunks</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <h3 className="font-medium mb-2">Stay Organized</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Keep your notes and materials organized for easy access</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Assistance;

