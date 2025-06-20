
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Hello, Gareth!</h2>
            <p className="text-blue-100 mb-4">We've missed you! Check out what's new in your dashboard</p>
            <Button variant="secondary" size="sm">
              Explore New Classes
            </Button>
          </div>
          <div className="w-32 h-32 rounded-lg flex items-center justify-center overflow-hidden">
            <Avatar className="w-32 h-32">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face" className="object-cover" />
              <AvatarFallback className="w-32 h-32 text-4xl bg-blue-400 text-white">GC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
