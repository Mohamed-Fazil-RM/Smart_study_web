
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useState, useEffect } from 'react';
import { TimerComponent } from '@/components/dashboard/TimerComponent';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProfileHeader } from '@/components/dashboard/ProfileHeader';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { ScheduleWidget } from '@/components/dashboard/ScheduleWidget';
import { ActivitiesWidget } from '@/components/dashboard/ActivitiesWidget';
import { ForumTracking } from '@/components/dashboard/ForumTracking';
import { AssignmentsWidget } from '@/components/dashboard/AssignmentsWidget';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { useProfile } from '@/hooks/useProfile';
import { useTasks } from '@/hooks/useTasks';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userStats, setUserStats] = useState(null);
  const [recentForumPosts, setRecentForumPosts] = useState([]);
  const { profile } = useProfile();
  const { tasks } = useTasks();

  useEffect(() => {
    // Update current date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUserStats();
    fetchRecentForumPosts();
  }, []);

  const fetchUserStats = async () => {
    try {
      const { data } = await supabase
        .from('user_statistics')
        .select('*')
        .single();
      setUserStats(data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchRecentForumPosts = async () => {
    try {
      const { data } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentForumPosts(data || []);
    } catch (error) {
      console.error('Error fetching forum posts:', error);
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Get today's tasks
  const todaysTasks = tasks.filter(task => {
    const taskDate = new Date(task.task_date);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });

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
                      <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}!
                      </h1>
                      <p className="text-gray-600">{formatDate(currentDate)}</p>
                    </div>
                  </div>
                  <ProfileHeader />
                </div>

                <WelcomeBanner />
                <StatsCards userStats={userStats} />

                <div className="grid grid-cols-2 gap-6">
                  <ForumTracking recentPosts={recentForumPosts} />
                  <TimerComponent onFullscreenToggle={toggleFullscreen} isFullscreen={isFullscreen} />
                </div>

                <AssignmentsWidget tasks={todaysTasks} />
              </div>

              <div className="w-80 space-y-6">
                <CalendarWidget />
                <ScheduleWidget tasks={todaysTasks} />
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
