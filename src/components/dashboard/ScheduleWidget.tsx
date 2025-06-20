
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const ScheduleWidget = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">My Schedule</CardTitle>
          <Button size="sm" variant="ghost">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="font-medium text-sm">Business Strategy Development Test</p>
            <p className="text-xs text-gray-600">Business Strategy • 9:00 AM - 11:00 AM</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="font-medium text-sm">Financial Analysis Presentation</p>
            <p className="text-xs text-gray-600">Finance • 2:00 PM - 3:30 PM</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
