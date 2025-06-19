
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Shield, Palette, HelpCircle, MessageSquare, LogOut, Trash2, Bell } from 'lucide-react';

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[calc(100vh-4rem)]">
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Data and Privacy */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Data and Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Collection</p>
                      <p className="text-sm text-gray-600">Allow app to collect usage data</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-sm text-gray-600">Help improve the app with anonymous analytics</p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" className="w-full">
                    Download My Data
                  </Button>
                </CardContent>
              </Card>

              {/* Theme */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Theme
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Theme</p>
                      <p className="text-sm text-gray-600">Follow system theme</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Help and Support */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Help and Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    Help Desk
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Feedback
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-white/80 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
