
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { BookOpen, Plus, Search, FileText, Video, HelpCircle, Upload, Settings, Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface UserCourse {
  id: string;
  name: string;
  category?: string;
  isSubject?: boolean;
  resources: {
    notes: number;
    pyqs: number;
    videos: number;
    mcqs: number;
  };
}

interface Profile {
  education_type: string;
  can_tutor: boolean;
  can_take_paid_jobs: boolean;
  can_post_paid_jobs: boolean;
}

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableSubjects, setAvailableSubjects] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('education_type, can_tutor, can_take_paid_jobs, can_post_paid_jobs')
        .eq('id', user?.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      if (profileData.education_type === 'school') {
        // Fetch user's selected subjects
        const { data: userSubjects, error: subjectsError } = await supabase
          .from('user_subjects')
          .select(`
            subjects:subject_id (
              id,
              name,
              category
            )
          `)
          .eq('user_id', user?.id);

        if (subjectsError) throw subjectsError;

        const courses = userSubjects?.map(us => ({
          id: us.subjects.id,
          name: us.subjects.name,
          category: us.subjects.category,
          isSubject: true,
          resources: { notes: 0, pyqs: 0, videos: 0, mcqs: 0 }
        })) || [];

        setUserCourses(courses);

        // Fetch available subjects for adding
        const { data: allSubjects } = await supabase
          .from('subjects')
          .select('*')
          .eq('education_type', 'school');
        
        setAvailableSubjects(allSubjects || []);
      } else {
        // Fetch college courses
        const { data: collegeCourses, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('user_id', user?.id);

        if (coursesError) throw coursesError;

        const courses = collegeCourses?.map(course => ({
          id: course.id,
          name: course.name,
          category: course.code,
          isSubject: false,
          resources: { notes: 0, pyqs: 0, videos: 0, mcqs: 0 }
        })) || [];

        setUserCourses(courses);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const removeSubject = async (subjectId: string) => {
    try {
      const { error } = await supabase
        .from('user_subjects')
        .delete()
        .eq('user_id', user?.id)
        .eq('subject_id', subjectId);

      if (error) throw error;

      setUserCourses(prev => prev.filter(course => course.id !== subjectId));
      toast.success('Subject removed successfully');
    } catch (error) {
      console.error('Error removing subject:', error);
      toast.error('Failed to remove subject');
    }
  };

  const addSubject = async (subjectId: string) => {
    try {
      const { error } = await supabase
        .from('user_subjects')
        .insert({ user_id: user?.id, subject_id: subjectId });

      if (error) throw error;

      const subject = availableSubjects.find(s => s.id === subjectId);
      if (subject) {
        const newCourse = {
          id: subject.id,
          name: subject.name,
          category: subject.category,
          isSubject: true,
          resources: { notes: 0, pyqs: 0, videos: 0, mcqs: 0 }
        };
        setUserCourses(prev => [...prev, newCourse]);
        toast.success('Subject added successfully');
      }
    } catch (error) {
      console.error('Error adding subject:', error);
      toast.error('Failed to add subject');
    }
  };

  const filteredCourses = userCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unselectedSubjects = availableSubjects.filter(
    subject => !userCourses.some(course => course.id === subject.id)
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Courses</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
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
          <main className="pt-0 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
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

              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading your courses...</p>
                </div>
              ) : (
                <>
                  {/* User Courses Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <Card key={course.id} className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{course.name}</h3>
                              <p className="text-sm text-gray-600">{course.category}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-6 w-6 text-blue-600" />
                              {course.isSubject && profile?.education_type === 'school' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeSubject(course.id)}
                                  className="h-6 w-6 p-0 hover:bg-red-100"
                                >
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              )}
                            </div>
                          </CardTitle>
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
                              View {course.isSubject ? 'Subject' : 'Course'}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Add Subject/Course Section for School Students */}
                  {profile?.education_type === 'school' && unselectedSubjects.length > 0 && (
                    <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                      <CardHeader>
                        <CardTitle>Add More Subjects</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {unselectedSubjects.map((subject) => (
                            <Button
                              key={subject.id}
                              variant="outline"
                              size="sm"
                              onClick={() => addSubject(subject.id)}
                              className="justify-start"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {subject.name}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Add Course Section for College Students */}
                  {profile?.education_type === 'college' && (
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
                  )}

                  {filteredCourses.length === 0 && !loading && (
                    <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                      <CardContent className="text-center p-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No {profile?.education_type === 'school' ? 'subjects' : 'courses'} found</h3>
                        <p className="text-gray-600">
                          {profile?.education_type === 'school' 
                            ? 'Start by adding subjects you\'re studying'
                            : 'Start by adding your courses'}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Courses;
