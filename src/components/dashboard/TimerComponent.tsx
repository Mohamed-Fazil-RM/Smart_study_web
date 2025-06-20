
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Play, Pause, RotateCcw, Maximize, Minimize } from 'lucide-react';

interface TimerComponentProps {
  onFullscreenToggle: () => void;
  isFullscreen: boolean;
}

export const TimerComponent = ({ onFullscreenToggle, isFullscreen }: TimerComponentProps) => {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [originalTime, setOriginalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(time => time - 1);
      }, 1000);
    } else if (focusTime === 0) {
      setIsRunning(false);
      alert('Focus session completed!');
    }
    return () => clearInterval(interval);
  }, [isRunning, focusTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setFocusTime(originalTime);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const setCustomTimer = () => {
    const newTime = customMinutes * 60;
    setFocusTime(newTime);
    setOriginalTime(newTime);
    setIsRunning(false);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="w-full h-full border-8 border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-blue-400 rounded-full" style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * (1 - focusTime / originalTime)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`
            }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">{formatTime(focusTime)}</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center mb-4">
            <Button onClick={toggleTimer} size="lg" className="bg-blue-600 hover:bg-blue-700">
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button onClick={resetTimer} variant="outline" size="lg">
              <RotateCcw className="w-6 h-6" />
            </Button>
            <Button onClick={onFullscreenToggle} variant="outline" size="lg">
              <Minimize className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-white text-xl">Do Not Disturb Mode</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Focus Mode</CardTitle>
          <Button onClick={onFullscreenToggle} variant="outline" size="sm">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32">
          <div className="w-full h-full border-8 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-blue-500 rounded-full" style={{
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * (1 - focusTime / originalTime)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`
          }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{formatTime(focusTime)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleTimer} size="sm">
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Set</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Focus Timer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Minutes</label>
                  <Input
                    type="number"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(Number(e.target.value))}
                    min="1"
                    max="120"
                  />
                </div>
                <Button onClick={setCustomTimer} className="w-full">
                  Set Timer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
