
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings as SettingsIcon, Shield, Palette, HelpCircle, MessageSquare, LogOut, Trash2 } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    dataCollection: true
  });

  const [feedback, setFeedback] = useState('');

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const submitFeedback = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your app preferences and account</p>
      </div>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications about assignments and deadlines</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={() => toggleSetting('notifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Updates</h4>
                  <p className="text-sm text-gray-600">Get weekly summary emails about your progress</p>
                </div>
                <Switch
                  checked={settings.emailUpdates}
                  onCheckedChange={() => toggleSetting('emailUpdates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Collection</h4>
                  <p className="text-sm text-gray-600">Allow anonymous usage data collection for app improvement</p>
                </div>
                <Switch
                  checked={settings.dataCollection}
                  onCheckedChange={() => toggleSetting('dataCollection')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-600">Switch to dark theme for better viewing in low light</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={() => toggleSetting('darkMode')}
                />
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Theme Color</h4>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-600"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer hover:border-2 hover:border-green-600"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer hover:border-2 hover:border-purple-600"></div>
                  <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer hover:border-2 hover:border-red-600"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ & Help Center
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Send Feedback</h4>
                <Textarea
                  placeholder="Tell us what you think about the app..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mb-3"
                />
                <Button onClick={submitFeedback} disabled={!feedback.trim()}>
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="h-5 w-5 mr-2" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">Cancel</Button>
                      <Button variant="destructive" className="flex-1">Delete Account</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
