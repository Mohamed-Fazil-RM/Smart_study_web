
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const ActivitiesWidget = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Watched a lecture video on Business Ethics</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
