
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useState } from 'react';
import { TimerComponent } from '@/components/dashboard/TimerComponent';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProfileHeader } from '@/components/dashboard/ProfileHeader';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { ScheduleWidget } from '@/components/dashboard/ScheduleWidget';
import { ActivitiesWidget } from '@/components/dashboard/ActivitiesWidget';
import { ForumTracking } from '@/components/dashboard/ForumTracking';
import { AssignmentsWidget } from '@/components/dashboard/AssignmentsWidget';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';

const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return <TimerComponent onFullscreenToggle={toggleFullscreen} isFullscreen={isFullscreen} />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <main className="p-6 bg-gray-50 min-h-screen">
            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="h-7 w-7" />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                      <p className="text-gray-600">Monday, 20 June 2025</p>
                    </div>
                  </div>
                  <ProfileHeader />
                </div>

                <WelcomeBanner />
                <StatsCards />

                <div className="grid grid-cols-2 gap-6">
                  <ForumTracking />
                  <TimerComponent onFullscreenToggle={toggleFullscreen} isFullscreen={isFullscreen} />
                </div>

                <AssignmentsWidget />
              </div>

              <div className="w-80 space-y-6">
                <CalendarWidget />
                <ScheduleWidget />
                <ActivitiesWidget />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
