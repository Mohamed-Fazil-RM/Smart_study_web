
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, MessageSquare, Calendar, User, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah',
      description: 'Hey! Can you help me with the Data Structures assignment?',
      time: '2 minutes ago',
      read: false,
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'calendar',
      title: 'Upcoming deadline',
      description: 'Market Analysis Report is due in 2 days',
      time: '1 hour ago',
      read: false,
      icon: Calendar
    },
    {
      id: 3,
      type: 'forum',
      title: 'New post in Web Development',
      description: 'Someone posted a new question about React hooks',
      time: '3 hours ago',
      read: true,
      icon: User
    },
    {
      id: 4,
      type: 'system',
      title: 'Task completed',
      description: 'You successfully completed your Algorithm quiz!',
      time: '1 day ago',
      read: true,
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center h-16 px-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`bg-white/80 backdrop-blur-lg border-white/30 cursor-pointer hover:shadow-lg transition-shadow ${
                !notification.read ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.type === 'message' ? 'bg-blue-100' :
                    notification.type === 'calendar' ? 'bg-orange-100' :
                    notification.type === 'forum' ? 'bg-purple-100' :
                    'bg-green-100'
                  }`}>
                    <notification.icon className={`w-5 h-5 ${
                      notification.type === 'message' ? 'text-blue-600' :
                      notification.type === 'calendar' ? 'text-orange-600' :
                      notification.type === 'forum' ? 'text-purple-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {notifications.length === 0 && (
            <Card className="bg-white/80 backdrop-blur-lg border-white/30">
              <CardContent className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
