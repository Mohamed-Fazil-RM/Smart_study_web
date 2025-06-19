
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit, BarChart3, Calendar, Upload, Download } from 'lucide-react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    college: 'IIT Madras',
    degree: 'Bachelor',
    course: 'Computer Science Engineering',
    year: 2021,
    email: 'john.doe@example.com'
  });

  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    tasksCompleted: 45,
    tasksFailed: 5,
    resourcesDownloaded: 120,
    resourcesUploaded: 8,
    studyHours: 156,
    coursesEnrolled: 5
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your profile and view statistics</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {userInfo.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-semibold">{userInfo.fullName}</h3>
                  <p className="text-gray-600">{userInfo.course}</p>
                  <p className="text-gray-500">{userInfo.college}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={userInfo.fullName}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userInfo.email}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    value={userInfo.college}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({...userInfo, college: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={userInfo.degree}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({...userInfo, degree: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={userInfo.course}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({...userInfo, course: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="year">Start Year</Label>
                  <Input
                    id="year"
                    value={userInfo.year}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({...userInfo, year: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Task Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Completed</span>
                    <span className="font-semibold text-green-600">{stats.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Failed</span>
                    <span className="font-semibold text-red-600">{stats.tasksFailed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-semibold text-blue-600">
                      {((stats.tasksCompleted / (stats.tasksCompleted + stats.tasksFailed)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Study Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Study Hours</span>
                    <span className="font-semibold text-blue-600">{stats.studyHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Courses Enrolled</span>
                    <span className="font-semibold text-purple-600">{stats.coursesEnrolled}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg. Hours/Day</span>
                    <span className="font-semibold text-green-600">{(stats.studyHours / 30).toFixed(1)}h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-orange-600" />
                  Resource Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Downloaded
                    </span>
                    <span className="font-semibold text-blue-600">{stats.resourcesDownloaded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Upload className="h-4 w-4 mr-1" />
                      Uploaded
                    </span>
                    <span className="font-semibold text-green-600">{stats.resourcesUploaded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Contribution Score</span>
                    <span className="font-semibold text-purple-600">85/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
