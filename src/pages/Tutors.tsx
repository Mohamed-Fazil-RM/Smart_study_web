
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Star, Search, MapPin, Clock, DollarSign } from 'lucide-react';

const Tutors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const tutors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      specialization: 'Calculus, Linear Algebra',
      rating: 4.9,
      reviews: 156,
      experience: '8 years',
      rate: '₹500/hour',
      location: 'Chennai',
      availability: 'Available',
      description: 'Expert in advanced mathematics with PhD from IIT. Specialized in helping students with complex calculus problems.'
    },
    {
      id: 2,
      name: 'Prof. Rajesh Kumar',
      subject: 'Computer Science',
      specialization: 'Data Structures, Algorithms',
      rating: 4.8,
      reviews: 203,
      experience: '12 years',
      rate: '₹700/hour',
      location: 'Bangalore',
      availability: 'Busy',
      description: 'Senior software engineer turned educator. Expert in programming and computer science fundamentals.'
    },
    {
      id: 3,
      name: 'Ms. Priya Sharma',
      subject: 'Physics',
      specialization: 'Quantum Mechanics, Thermodynamics',
      rating: 4.7,
      reviews: 89,
      experience: '5 years',
      rate: '₹400/hour',
      location: 'Mumbai',
      availability: 'Available',
      description: 'M.Sc. Physics graduate with passion for teaching complex physics concepts in simple ways.'
    }
  ];

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(tutor => 
    !selectedSubject || tutor.subject === selectedSubject
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Tutors</h1>
        <p className="text-gray-600">Connect with expert tutors for personalized learning</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tutors by name, subject, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Subjects</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="Biology">Biology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTutors.map((tutor) => (
          <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {tutor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{tutor.name}</CardTitle>
                    <Badge variant={tutor.availability === 'Available' ? 'default' : 'secondary'}>
                      {tutor.availability}
                    </Badge>
                  </div>
                  
                  <p className="text-blue-600 font-medium">{tutor.subject}</p>
                  <p className="text-sm text-gray-600">{tutor.specialization}</p>
                  
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {tutor.rating} ({tutor.reviews} reviews)
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutor.experience}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{tutor.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tutor.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {tutor.rate}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button size="sm" disabled={tutor.availability === 'Busy'}>
                    <Users className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No tutors found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Tutors;
