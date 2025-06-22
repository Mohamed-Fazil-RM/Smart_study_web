import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Faq3 } from '@/components/ui/faq3';

const HelpDesk = () => {
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
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Help Desk</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Faq3 
              heading="Frequently Asked Questions"
              description="Find answers to common questions about Smart Study. Can't find what you're looking for? Contact our support team."
              supportHeading="Need more help?"
              supportDescription="Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance."
              supportButtonText="Contact Support"
              supportButtonUrl="/contact-support"
              items={[
                {
                  id: "faq-1",
                  question: "How do I get started with Smart Study?",
                  answer: "Simply sign up for an account, complete the onboarding process to set up your profile, and start exploring our features like course management, study scheduling, and AI assistance."
                },
                {
                  id: "faq-2",
                  question: "How does the AI study assistant work?",
                  answer: "Our AI assistant helps you with personalized study recommendations, answers questions about your coursework, and provides intelligent insights to improve your learning efficiency."
                },
                {
                  id: "faq-3",
                  question: "Can I sync my existing calendar with Smart Study?",
                  answer: "Yes, Smart Study integrates with popular calendar applications to help you manage your study schedule alongside your other commitments."
                },
                {
                  id: "faq-4",
                  question: "Is there a mobile app available?",
                  answer: "Currently, Smart Study is available as a web application that works seamlessly on all devices through your browser. A dedicated mobile app is in development."
                },
                {
                  id: "faq-5",
                  question: "How do I connect with tutors?",
                  answer: "Visit the Tutors section in your dashboard to browse available tutors, view their profiles, and schedule sessions based on your subject needs and availability."
                },
                {
                  id: "faq-6",
                  question: "What tools are available for grade tracking?",
                  answer: "Smart Study offers various grade calculation tools including GPA calculators, grade predictors, percentage calculators, and comprehensive grade tracking systems."
                },
                {
                  id: "faq-7",
                  question: "How do I reset my password?",
                  answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
                }
              ]}
            />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default HelpDesk;
