import { useState } from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const PercentageCalculator = () => {
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const calculatePercentage = () => {
    if (totalValue !== null && percentage !== null) {
      setResult((percentage / 100) * totalValue);
    } else {
      setResult(null);
    }
  };

  const clearFields = () => {
    setTotalValue(null);
    setPercentage(null);
    setResult(null);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Percentage Calculator</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="container mx-auto max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle>Percentage Calculator</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="total">Total Value</label>
                    <Input
                      type="number"
                      id="total"
                      placeholder="Enter total value"
                      value={totalValue === null ? '' : totalValue.toString()}
                      onChange={(e) => setTotalValue(e.target.value === '' ? null : parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="percentage">Percentage</label>
                    <Input
                      type="number"
                      id="percentage"
                      placeholder="Enter percentage"
                      value={percentage === null ? '' : percentage.toString()}
                      onChange={(e) => setPercentage(e.target.value === '' ? null : parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="result">Result</label>
                    <Input
                      type="text"
                      id="result"
                      placeholder="Result"
                      value={result === null ? '' : result.toFixed(2)}
                      readOnly
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button onClick={calculatePercentage}>Calculate</Button>
                    <Button variant="secondary" onClick={clearFields}>Clear</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PercentageCalculator;
