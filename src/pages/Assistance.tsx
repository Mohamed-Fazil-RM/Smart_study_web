
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, FileText, HelpCircle, Zap, BookOpen } from 'lucide-react';

const Assistance = () => {
  const [selectedTool, setSelectedTool] = useState('');
  const [topic, setTopic] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [result, setResult] = useState('');

  const generateContent = () => {
    if (!topic || !selectedTool) return;
    
    // Simulate AI generation
    const responses = {
      'question-paper': `Generated Question Paper for ${topic}:\n\n1. Define the basic concepts of ${topic}\n2. Explain the applications of ${topic}\n3. Compare different approaches in ${topic}\n4. Solve practical problems related to ${topic}\n5. Analyze case studies in ${topic}`,
      'flashcards': `Flashcard Set for ${topic}:\n\nCard 1: What is ${topic}? | ${topic} is a fundamental concept...\nCard 2: Key principles of ${topic} | The main principles include...\nCard 3: Applications of ${topic} | Used in various fields such as...`,
      'quiz': `Quiz for ${topic}:\n\n1. What is the primary purpose of ${topic}?\na) Option A\nb) Option B\nc) Option C\nd) Option D\n\n2. Which of the following best describes ${topic}?\na) Option A\nb) Option B\nc) Option C\nd) Option D`,
      'explanation': `${learningStyle} Explanation of ${topic}:\n\n${
        learningStyle === 'practical' ? 'Here\'s how you can apply this in real situations...' :
        learningStyle === 'theoretical' ? 'The theoretical foundation of this concept...' :
        'Let me explain this with a real-life example...'
      }`
    };

    setResult(responses[selectedTool as keyof typeof responses] || 'Generated content will appear here...');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Assistance</h1>
        <p className="text-gray-600">Get personalized help with your studies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-600" />
              AI Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Tool</label>
              <Select value={selectedTool} onValueChange={setSelectedTool}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an AI tool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="question-paper">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Question Paper Generator
                    </div>
                  </SelectItem>
                  <SelectItem value="flashcards">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Flashcard Generator
                    </div>
                  </SelectItem>
                  <SelectItem value="quiz">
                    <div className="flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Quiz Generator
                    </div>
                  </SelectItem>
                  <SelectItem value="explanation">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Topic Explanation
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Topic/Subject</label>
              <Input
                placeholder="Enter the topic you need help with..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {selectedTool === 'explanation' && (
              <div>
                <label className="block text-sm font-medium mb-2">Learning Style</label>
                <Select value={learningStyle} onValueChange={setLearningStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your learning style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practical">Practical</SelectItem>
                    <SelectItem value="theoretical">Theoretical</SelectItem>
                    <SelectItem value="real-life">Real-life Examples</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button onClick={generateContent} className="w-full" disabled={!topic || !selectedTool}>
              <Brain className="h-4 w-4 mr-2" />
              Generate Content
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Select a tool and enter a topic to generate content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold">Question Papers</h3>
            <p className="text-sm text-gray-600">Generate custom question papers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold">Flashcards</h3>
            <p className="text-sm text-gray-600">Create study flashcards</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold">Quick Quiz</h3>
            <p className="text-sm text-gray-600">Practice with quizzes</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold">AI Explanation</h3>
            <p className="text-sm text-gray-600">Get personalized explanations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assistance;
