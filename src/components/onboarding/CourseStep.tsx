
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, BookOpen } from 'lucide-react';

interface CourseStepProps {
  data: any;
  updateData: (data: any) => void;
}

const CourseStep = ({ data, updateData }: CourseStepProps) => {
  const [searchTerm, setSearchTerm] = useState(data.course || '');
  
  const schoolCourses = [
    "Bio Maths",
    "Maths with Computer Science",
    "Pure Science",
    "Commerce",
    "Arts/Humanities"
  ];

  const collegeCourses = [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Commerce",
    "English Literature",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Medicine",
    "Nursing",
    "Psychology",
    "Economics"
  ];

  const courses = data.educationType === 'school' ? schoolCourses : collegeCourses;

  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseSelect = (course: string) => {
    setSearchTerm(course);
    updateData({ course });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600 text-lg">
          {data.educationType === 'school' ? "What's your stream?" : "What's your course?"}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">
            {data.educationType === 'school' ? 'Search for your stream' : 'Search for your course'}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={data.educationType === 'school' ? "Type to search streams..." : "Type to search courses..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 border-gray-300"
            />
          </div>
        </div>

        {searchTerm && (
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card
                  key={course}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    data.course === course
                      ? 'ring-2 ring-purple-500 bg-purple-50/50'
                      : 'hover:bg-gray-50 bg-white/50'
                  }`}
                  onClick={() => handleCourseSelect(course)}
                >
                  <CardContent className="p-3">
                    <p className="text-gray-900">{course}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white/50">
                <CardContent className="p-3">
                  <p className="text-gray-500">No {data.educationType === 'school' ? 'streams' : 'courses'} found. You can still continue with "{searchTerm}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseStep;
