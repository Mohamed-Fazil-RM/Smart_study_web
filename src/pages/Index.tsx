
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Smart Study
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Learning Experience
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning smarter with our comprehensive study platform.
            Organize your courses, connect with peers, and achieve your academic goals.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-lg px-8 py-3">
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-lg border-white/30">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Organize your courses, upload materials, and access resources anytime.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-white/30">
              <CardHeader>
                <Users className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Study Forums</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Connect with classmates, ask questions, and collaborate on projects.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-white/30">
              <CardHeader>
                <Calendar className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Plan your study sessions and track your progress with our smart calendar.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-white/30">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Monitor your achievements and stay motivated with detailed analytics.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of learners and take your education to the next level.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 Smart Study. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
