
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfileHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
        <Bell className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face" />
          <AvatarFallback>GC</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Gareth Christopher</p>
          <p className="text-sm text-gray-500">@garethchris</p>
        </div>
      </div>
    </div>
  );
};
