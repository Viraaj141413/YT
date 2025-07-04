import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Activity, Users, Globe, Monitor, Zap, TrendingUp, Eye, Clock } from "lucide-react";
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
    watchTime: Math.floor(Math.random() * 300) + 30,
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
      const delay = (60 / viewsPerMinute) * 1000;
      
      interval = setInterval(() => {
        const newView = generateRandomView();
        setViews(prev => [newView, ...prev.slice(0, 49)]);
        setCurrentProgress(prev => prev + 1);
        
        toast({
          title: "🚀 View Generated!",
          description: `New view from ${newView.country} • ${newView.device}`,
          duration: 2000,
        });
      }, delay);
    } else if (currentProgress >= targetViews) {
      setIsRunning(false);
      toast({
        title: "✨ Mission Complete!",
        description: `Successfully simulated ${targetViews} views`,
        duration: 3000,
      });
    }

    return () => clearInterval(interval);
  }, [isRunning, currentProgress, targetViews, viewsPerMinute, toast]);

  const startSimulation = () => {
    setIsRunning(true);
    toast({
      title: "🎬 Simulation Started",
      description: `Generating ${viewsPerMinute} views per minute`,
    });
  };

  const stopSimulation = () => {
    setIsRunning(false);
    toast({
      title: "⏸️ Simulation Paused",
      description: "View generation paused",
    });
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentProgress(0);
    setViews([]);
    toast({
      title: "🔄 Simulation Reset",
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

  const progressPercentage = Math.min((currentProgress / targetViews) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            View Simulation Dashboard
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Generate realistic view patterns for educational purposes
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-views" className="text-sm">Target Views</Label>
              <Input
                id="target-views"
                type="number"
                value={targetViews}
                onChange={(e) => setTargetViews(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="views-per-minute" className="text-sm">Views per Minute</Label>
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
              <Button 
                onClick={resetSimulation} 
                variant="outline"
                size="icon"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentProgress} / {targetViews} ({progressPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{currentProgress.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Watch Time</p>
                <p className="text-2xl font-bold">{avgWatchTime}s</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique IPs</p>
                <p className="text-2xl font-bold">{new Set(views.map(v => v.ip)).size}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Device Types</p>
                <p className="text-2xl font-bold">{Object.keys(getDeviceStats()).length}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Live View Stream */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Recent Views
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {views.slice(0, 8).map((view) => (
                <div 
                  key={view.id} 
                  className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {view.device}
                      </Badge>
                      <span className="text-sm font-medium">{view.country}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{view.ip}</span>
                      <span>{view.watchTime}s</span>
                      <span>{view.referrer}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {view.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {views.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No views yet. Start the simulation to see data.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Top Countries */}
            <div>
              <h4 className="font-medium mb-3">Top Countries</h4>
              <div className="space-y-2">
                {getCountryStats().map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-sm">{country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / views.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-6">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Device Distribution */}
            <div>
              <h4 className="font-medium mb-3">Device Types</h4>
              <div className="space-y-2">
                {Object.entries(getDeviceStats()).map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between">
                    <span className="text-sm">{device}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / views.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-6">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Notice */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm font-medium mb-1">Educational Simulation</p>
              <p className="text-xs text-muted-foreground">
                This generates synthetic data for learning. No real traffic is sent.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};