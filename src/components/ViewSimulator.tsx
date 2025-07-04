import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Activity, Users, Globe, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimulatedView {
  id: string;
  timestamp: Date;
  userAgent: string;
  ip: string;
  country: string;
  device: string;
  watchTime: number;
  referrer: string;
}

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
  "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0"
];

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan"];
const DEVICES = ["Desktop", "Mobile", "Tablet"];
const REFERRERS = ["Direct", "Google Search", "YouTube Search", "External Link", "Social Media"];

const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const generateRandomView = (): SimulatedView => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
    ip: generateRandomIP(),
    country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
    watchTime: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
    referrer: REFERRERS[Math.floor(Math.random() * REFERRERS.length)]
  };
};

export const ViewSimulator = () => {
  const [views, setViews] = useState<SimulatedView[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [targetViews, setTargetViews] = useState(100);
  const [viewsPerMinute, setViewsPerMinute] = useState(10);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && currentProgress < targetViews) {
      const delay = (60 / viewsPerMinute) * 1000; // Convert to milliseconds
      
      interval = setInterval(() => {
        const newView = generateRandomView();
        setViews(prev => [newView, ...prev.slice(0, 49)]); // Keep only last 50 views
        setCurrentProgress(prev => prev + 1);
        
        toast({
          title: "View Simulated",
          description: `Generated view from ${newView.country} (${newView.device})`,
          duration: 2000,
        });
      }, delay);
    } else if (currentProgress >= targetViews) {
      setIsRunning(false);
      toast({
        title: "Simulation Complete!",
        description: `Successfully simulated ${targetViews} views`,
        duration: 3000,
      });
    }

    return () => clearInterval(interval);
  }, [isRunning, currentProgress, targetViews, viewsPerMinute, toast]);

  const startSimulation = () => {
    setIsRunning(true);
    toast({
      title: "Simulation Started",
      description: `Generating ${viewsPerMinute} views per minute`,
    });
  };

  const stopSimulation = () => {
    setIsRunning(false);
    toast({
      title: "Simulation Paused",
      description: "View generation paused",
    });
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentProgress(0);
    setViews([]);
    toast({
      title: "Simulation Reset",
      description: "All data cleared",
    });
  };

  const getDeviceStats = () => {
    const deviceCounts = views.reduce((acc, view) => {
      acc[view.device] = (acc[view.device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return deviceCounts;
  };

  const getCountryStats = () => {
    const countryCounts = views.reduce((acc, view) => {
      acc[view.country] = (acc[view.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(countryCounts).slice(0, 5);
  };

  const avgWatchTime = views.length > 0 
    ? Math.round(views.reduce((sum, view) => sum + view.watchTime, 0) / views.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-youtube" />
            View Simulation Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="target-views">Target Views</Label>
              <Input
                id="target-views"
                type="number"
                value={targetViews}
                onChange={(e) => setTargetViews(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div>
              <Label htmlFor="views-per-minute">Views per Minute</Label>
              <Input
                id="views-per-minute"
                type="number"
                value={viewsPerMinute}
                onChange={(e) => setViewsPerMinute(Number(e.target.value))}
                disabled={isRunning}
                min="1"
                max="60"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                onClick={isRunning ? stopSimulation : startSimulation}
                className="flex-1"
                variant={isRunning ? "destructive" : "default"}
              >
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button onClick={resetSimulation} variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentProgress} / {targetViews}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-youtube h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((currentProgress / targetViews) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{currentProgress}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Watch Time</p>
                <p className="text-2xl font-bold">{avgWatchTime}s</p>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique IPs</p>
                <p className="text-2xl font-bold">{new Set(views.map(v => v.ip)).size}</p>
              </div>
              <Globe className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Device Types</p>
                <p className="text-2xl font-bold">{Object.keys(getDeviceStats()).length}</p>
              </div>
              <Monitor className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Views & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Simulated Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {views.slice(0, 10).map((view) => (
                <div key={view.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">{view.device}</Badge>
                      <span className="text-muted-foreground">{view.country}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {view.ip} • {view.watchTime}s • {view.referrer}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {view.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {views.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No views simulated yet. Start the simulation to see data!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Top Countries</h4>
              <div className="space-y-1">
                {getCountryStats().map(([country, count]) => (
                  <div key={country} className="flex justify-between text-sm">
                    <span>{country}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Device Distribution</h4>
              <div className="space-y-1">
                {Object.entries(getDeviceStats()).map(([device, count]) => (
                  <div key={device} className="flex justify-between text-sm">
                    <span>{device}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                ⚠️ Educational Tool: This simulates view data for learning purposes only.
                No real views are sent to any platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};