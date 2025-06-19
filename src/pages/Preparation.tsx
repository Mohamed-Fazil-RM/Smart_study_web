
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, FileText, Target, Search } from 'lucide-react';

const Preparation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const quizzes = [
    { id: 1, title: 'Data Structures Quiz', college: 'IIT Madras', questions: 25, difficulty: 'Medium' },
    { id: 2, title: 'Algorithms Quiz', college: 'IIT Madras', questions: 30, difficulty: 'Hard' },
  ];

  const interviewQuestions = [
    { id: 1, category: 'Technical', question: 'Explain the difference between Array and Linked List', difficulty: 'Easy' },
    { id: 2, category: 'Behavioral', question: 'Tell me about a challenging project you worked on', difficulty: 'Medium' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Preparation Hub</h1>
        <p className="text-gray-600">Prepare for quizzes, interviews, and career goals</p>
      </div>

      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quiz">Quiz Prep</TabsTrigger>
          <TabsTrigger value="interview">Interview Prep</TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for topics or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Brain className="h-4 w-4 mr-2" />
              Generate AI Quiz
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    {quiz.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{quiz.college}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span className="font-medium">{quiz.questions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span className={`font-medium ${
                        quiz.difficulty === 'Easy' ? 'text-green-600' :
                        quiz.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{quiz.difficulty}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Start Quiz</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {interviewQuestions.map((q) => (
                  <div key={q.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-blue-600">{q.category}</span>
                      <span className="text-xs text-gray-500">{q.difficulty}</span>
                    </div>
                    <p className="text-sm">{q.question}</p>
                  </div>
                ))}
                <Button className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Generate More Questions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Create a professional resume tailored to your field</p>
                <Button className="w-full mb-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Build Resume
                </Button>
                <div className="space-y-2">
                  <Input placeholder="What's your career ambition?" />
                  <Button variant="outline" className="w-full">Get Career Roadmap</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Preparation;
