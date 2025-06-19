
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Plus, Upload, FileText, Video, HelpCircle } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Computer Science Engineering',
      college: 'IIT Madras',
      resources: {
        notes: 12,
        pyqs: 8,
        syllabus: 1,
        videos: 25,
        mcqs: 150
      }
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    name: '',
    college: '',
    description: ''
  });

  const addCourse = () => {
    if (newCourse.name && newCourse.college) {
      setCourses([...courses, {
        id: Date.now(),
        name: newCourse.name,
        college: newCourse.college,
        resources: { notes: 0, pyqs: 0, syllabus: 0, videos: 0, mcqs: 0 }
      }]);
      setNewCourse({ name: '', college: '', description: '' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">Access your study materials and resources</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <Label htmlFor="college">College/University</Label>
                <Input
                  id="college"
                  value={newCourse.college}
                  onChange={(e) => setNewCourse({...newCourse, college: e.target.value})}
                  placeholder="Enter college name"
                />
              </div>
              <Button onClick={addCourse} className="w-full">Add Course</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                {course.name}
              </CardTitle>
              <p className="text-sm text-gray-600">{course.college}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="flex items-center"><FileText className="h-4 w-4 mr-1" />Notes</span>
                  <span>{course.resources.notes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center"><HelpCircle className="h-4 w-4 mr-1" />PYQs</span>
                  <span>{course.resources.pyqs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center"><Video className="h-4 w-4 mr-1" />Videos</span>
                  <span>{course.resources.videos}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
                <Button size="sm" className="flex-1">View Resources</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
