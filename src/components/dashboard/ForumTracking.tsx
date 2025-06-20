
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ForumTracking = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Forum Live Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Sarah is working on Data Structures assignment</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm">New post in Web Development community</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Mike completed Algorithm quiz</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
