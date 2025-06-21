
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, BookOpen, Users, Calendar, TrendingUp, Star, Brain, Search, FileText, MessageSquare, Lightbulb, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { BouncyCardsFeatures } from '@/components/ui/bounce-card-features';
import { PricingSection } from '@/components/ui/pricing-section';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Smart Resources",
      description: "Access curated notes, papers, and study materials for your specific course"
    },
    {
      icon: Users,
      title: "Discussion Forums",
      description: "Connect with peers, get help, and collaborate on academic projects"
    },
    {
      icon: Calendar,
      title: "Schedule Planner",
      description: "Organize your study schedule with intelligent task management"
    },
    {
      icon: TrendingUp,
      title: "Grade Ninja",
      description: "Track your academic progress with GPA and percentage calculators"
    }
  ];

  const testimonials = [
    {
      quote: "Smart Study transformed how I organize my computer science coursework. The AI assistance is incredible and helped me improve my grades significantly!",
      name: "Sarah Johnson",
      title: "MIT"
    },
    {
      quote: "Finally found a platform that understands student needs. The discussion forums are so helpful and the AI explanations are spot-on.",
      name: "Alex Chen",
      title: "Stanford"
    },
    {
      quote: "The schedule planner and grade tracking features helped me improve my GPA from 3.2 to 3.8 in just one semester!",
      name: "Maria Rodriguez",
      title: "Harvard"
    },
    {
      quote: "The AI-powered study modes and spaced repetition feature completely changed how I learn. My retention rate improved by 70%.",
      name: "David Kim",
      title: "UC Berkeley"
    },
    {
      quote: "Being able to upload lecture slides and get instant flashcards and explanations saves me hours every week.",
      name: "Emily Watson",
      title: "Oxford"
    },
    {
      quote: "The mock exams feature is a game-changer. I feel much more confident going into real exams now.",
      name: "Michael Brown",
      title: "Yale"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: {
        monthly: "Free",
        yearly: "Free",
      },
      description: "Perfect for getting started",
      features: [
        "Limited downloads",
        "Limited storage",
        "Ads included",
        "Limited AI responses",
        "Basic support"
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: {
        monthly: 5,
        yearly: 48,
      },
      description: "Great for active students",
      features: [
        "Up to 8 doc downloads",
        "Ads included",
        "Free access to workshops",
        "30 AI tokens monthly",
        "Priority support"
      ],
      cta: "Choose Pro",
      popular: true,
    },
    {
      name: "Pro Plus",
      price: {
        monthly: 9,
        yearly: 72,
      },
      description: "Best for power users",
      features: [
        "Unlimited downloads & storage",
        "Ad-free experience",
        "Unlimited AI usage",
        "All workshops included",
        "Premium support"
      ],
      cta: "Go Pro Plus",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Study
            </div>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
              Study Smarter, Not Harder
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Your all-in-one academic companion. Organize resources, collaborate with peers, 
              and track your progress with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg">
                  Start Your Journey
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Smart Study Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Powerful Features for Student Success</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in your academic journey, powered by intelligent technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section - Updated */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <BouncyCardsFeatures />
          {/* Get Started Button at the bottom of AI features */}
          <div className="flex justify-center mt-12">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-12 py-6 text-xl">
                Get Started with AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Built for Modern Students</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Smart Study combines the power of AI with intuitive design to create the ultimate 
              academic management platform. From freshmen to graduate students, we provide tools 
              that adapt to your learning style and academic goals.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <p className="text-gray-600">Active Students</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">Universities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <PricingSection
            title="Simple, Transparent Pricing"
            subtitle="Choose the perfect plan for your academic journey"
            frequencies={["monthly", "yearly"]}
            tiers={pricingTiers}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What Students Say</h2>
            <p className="text-xl text-gray-600">Join thousands of students who've transformed their academic journey</p>
          </div>

          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            className="mb-8"
          />
        </div>
      </section>

      {/* Big CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Study anywhere. Anytime.
              <br />
              Across all devices.
            </h2>
            <p className="text-xl text-blue-100 mb-12 opacity-90">
              Access your personalized learning experience on any device, anywhere in the world
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="px-12 py-6 text-xl bg-white text-blue-600 hover:bg-gray-100 rounded-full shadow-2xl">
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Smart Study
              </div>
              <p className="text-gray-400 mb-4">Empowering student success through intelligent technology</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Exams</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Explanations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Companies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Magazine</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Help</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancel Premium</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Smart Study GmbH | Terms | Privacy | Transparency
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Star className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
