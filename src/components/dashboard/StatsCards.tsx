
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Calendar, MessageSquare } from 'lucide-react';

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">3.8</p>
              <p className="text-sm text-gray-600">GPA</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-gray-600">Tasks</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">132</p>
              <p className="text-sm text-gray-600">Hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">124</p>
              <p className="text-sm text-gray-600">Points</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
