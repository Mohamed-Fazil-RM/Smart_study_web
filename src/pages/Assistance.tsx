
import React from 'react';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { HeroSection } from '@/components/ui/hero-section';
import { 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Users, 
  Video,
  FileText,
  Zap,
  Brain,
  ArrowRight,
  Play
} from 'lucide-react';

const Assistance = () => {
  const assistanceFeatures = [
    {
      Icon: MessageSquare,
      name: "Live Chat Support",
      description: "Get instant help from our support team. Available 24/7 to answer your questions and resolve issues.",
      href: "/chat",
      cta: "Start Chat",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-blue-600/20">
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-sky-400/30 rounded-full blur-xl" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-400/20 rounded-full blur-lg" />
        </div>
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: Brain,
      name: "AI Study Assistant",
      description: "Get personalized study recommendations, explanations, and academic guidance powered by AI.",
      href: "/ai-assistant",
      cta: "Try AI Assistant",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-cyan-600/20">
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-sky-400/30 rounded-full blur-xl" />
          <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-cyan-400/20 rounded-full blur-lg" />
        </div>
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: BookOpen,
      name: "Study Guides",
      description: "Access comprehensive study guides and resources for all subjects and courses.",
      href: "/guides",
      cta: "Browse Guides",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-sky-600/20">
          <div className="absolute -right-14 -top-14 w-32 h-32 bg-blue-400/30 rounded-full blur-xl" />
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-sky-400/20 rounded-full blur-lg" />
        </div>
      ),
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: Video,
      name: "Video Tutorials",
      description: "Watch step-by-step video tutorials covering various academic topics and study techniques.",
      href: "/tutorials",
      cta: "Watch Videos",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-sky-600/20">
          <div className="absolute -right-12 -top-12 w-30 h-30 bg-cyan-400/30 rounded-full blur-xl" />
          <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-sky-400/20 rounded-full blur-lg" />
        </div>
      ),
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
    },
    {
      Icon: Users,
      name: "Peer Support",
      description: "Connect with fellow students, join study groups, and get help from your academic community.",
      href: "/peer-support",
      cta: "Join Community",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-blue-600/20">
          <div className="absolute -right-10 -top-10 w-28 h-28 bg-sky-400/30 rounded-full blur-xl" />
          <div className="absolute -left-2 -bottom-2 w-16 h-16 bg-blue-400/20 rounded-full blur-lg" />
        </div>
      ),
      className: "lg:row-start-2 lg:row-end-4 lg:col-start-3 lg:col-end-4",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        badge={{
          text: "Need Academic Support?",
          action: {
            text: "Learn more",
            href: "#features",
          },
        }}
        title="Get the Help You Need"
        description="Our comprehensive assistance platform provides multiple ways to get support, learn new concepts, and succeed in your academic journey."
        actions={[
          {
            text: "Get Started",
            href: "#features",
            variant: "glow",
            icon: <ArrowRight className="h-5 w-5" />,
          },
          {
            text: "Watch Demo",
            href: "/demo",
            variant: "default",
            icon: <Play className="h-5 w-5" />,
          },
        ]}
        image={{
          light: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center",
          dark: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center",
          alt: "Students collaborating and studying together",
        }}
      />

      {/* Features Section */}
      <div id="features" className="bg-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Bento Grid */}
          <div className="mb-12">
            <BentoGrid className="lg:grid-rows-3 max-w-6xl mx-auto">
              {assistanceFeatures.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>

          {/* Additional Help Section */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-sky-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need More Help?
              </h2>
              <p className="text-gray-600">
                Can't find what you're looking for? Our support team is here to help.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/70 rounded-xl hover:bg-white transition-colors shadow-sm">
                <FileText className="w-8 h-8 text-sky-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-gray-600">Browse our comprehensive docs</p>
              </div>
              
              <div className="text-center p-6 bg-white/70 rounded-xl hover:bg-white transition-colors shadow-sm">
                <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600">Reach out via email or chat</p>
              </div>
              
              <div className="text-center p-6 bg-white/70 rounded-xl hover:bg-white transition-colors shadow-sm">
                <Zap className="w-8 h-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Quick Start</h3>
                <p className="text-sm text-gray-600">Get started in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistance;
