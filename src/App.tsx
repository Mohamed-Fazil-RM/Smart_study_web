
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Preparation from "./pages/Preparation";
import Schedule from "./pages/Schedule";
import Forums from "./pages/Forums";
import Assistance from "./pages/Assistance";
import Tutors from "./pages/Tutors";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Feedback from "./pages/Feedback";
import ContactSupport from "./pages/ContactSupport";
import HelpDesk from "./pages/HelpDesk";
import Notifications from "./pages/Notifications";
import GradeCalculator from "./pages/tools/GradeCalculator";
import GradePrediction from "./pages/tools/GradePrediction";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import GradeTracker from "./pages/tools/GradeTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/preparation" element={<Preparation />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/assistance" element={<Assistance />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/help-desk" element={<HelpDesk />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/tools/grade-calculator" element={<GradeCalculator />} />
            <Route path="/tools/grade-prediction" element={<GradePrediction />} />
            <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/tools/grade-tracker" element={<GradeTracker />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
