
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Bot, FileText, Zap, Brain, BookOpen, HelpCircle, Bell } from 'lucide-react';

const Assistance = () => {
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
                <h1 className="text-xl font-semibold text-gray-900">AI Assistance</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Select defaultValue="practical">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practical">Practical</SelectItem>
                    <SelectItem value="theoretical">Theoretical</SelectItem>
                    <SelectItem value="examples">Real Examples</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[calc(100vh-4rem)]">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Learning Assistant</h2>
                <p className="text-gray-600">Get personalized help with AI-generated content tailored to your learning style</p>
              </div>

              {/* AI Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Question Papers Generator */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-6 w-6 mr-3 text-blue-600" />
                      Question Papers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Generate practice question papers for any subject or topic</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-500">✓ Subject-specific questions</div>
                      <div className="text-sm text-gray-500">✓ Difficulty levels</div>
                      <div className="text-sm text-gray-500">✓ Time-based papers</div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                      <Bot className="h-4 w-4 mr-2" />
                      Generate Paper
                    </Button>
                  </CardContent>
                </Card>

                {/* Flashcards Generator */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-6 w-6 mr-3 text-yellow-600" />
                      AI Flashcards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Create smart flashcards for quick revision and memorization</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-500">✓ Key concepts extraction</div>
                      <div className="text-sm text-gray-500">✓ Spaced repetition</div>
                      <div className="text-sm text-gray-500">✓ Progress tracking</div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600">
                      <Zap className="h-4 w-4 mr-2" />
                      Create Flashcards
                    </Button>
                  </CardContent>
                </Card>

                {/* Quiz Generator */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="h-6 w-6 mr-3 text-green-600" />
                      Quick Quiz
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Generate instant quizzes for quick practice and assessment</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-500">✓ Multiple choice questions</div>
                      <div className="text-sm text-gray-500">✓ Instant feedback</div>
                      <div className="text-sm text-gray-500">✓ Score tracking</div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                      <Brain className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI Explanation Tool */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-6 w-6 mr-3 text-purple-600" />
                    AI Topic Explanation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">Get personalized explanations for any topic based on your learning style</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-medium">Practical Approach</h3>
                      <p className="text-sm text-gray-600">Real-world applications and examples</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h3 className="font-medium">Theoretical Deep-dive</h3>
                      <p className="text-sm text-gray-600">Detailed concepts and principles</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h3 className="font-medium">Visual Examples</h3>
                      <p className="text-sm text-gray-600">Diagrams and real-life scenarios</p>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Bot className="h-4 w-4 mr-2" />
                    Ask AI to Explain
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

export default Assistance;
