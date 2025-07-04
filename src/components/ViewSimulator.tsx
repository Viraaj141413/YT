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
    <div className="space-y-8 animate-fade-in">
      {/* Hero Control Panel */}
      <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 shadow-glow">
        <div className="absolute inset-0 bg-gradient-glass" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand animate-shimmer" />
        
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-youtube-gradient shadow-glow">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              View Simulation Control Center
            </span>
          </CardTitle>
          <p className="text-muted-foreground">
            Generate realistic view patterns with advanced simulation technology
          </p>
        </CardHeader>
        
        <CardContent className="relative space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="target-views" className="text-sm font-medium">Target Views</Label>
              <Input
                id="target-views"
                type="number"
                value={targetViews}
                onChange={(e) => setTargetViews(Number(e.target.value))}
                disabled={isRunning}
                className="bg-accent/50 border-accent/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="views-per-minute" className="text-sm font-medium">Views per Minute</Label>
              <Input
                id="views-per-minute"
                type="number"
                value={viewsPerMinute}
                onChange={(e) => setViewsPerMinute(Number(e.target.value))}
                disabled={isRunning}
                min="1"
                max="60"
                className="bg-accent/50 border-accent/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="flex items-end gap-3">
              <Button
                onClick={isRunning ? stopSimulation : startSimulation}
                className={`flex-1 h-11 ${
                  isRunning 
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" 
                    : "bg-youtube-gradient hover:shadow-glow"
                } transition-all duration-300 transform hover:scale-105`}
              >
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button 
                onClick={resetSimulation} 
                variant="outline"
                className="h-11 border-accent/30 hover:bg-accent/50 transition-all duration-300"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Simulation Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {currentProgress} / {targetViews}
                </span>
                <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                  {progressPercentage.toFixed(1)}%
                </Badge>
              </div>
            </div>
            <div className="relative w-full bg-accent/30 rounded-full h-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/40" />
              <div 
                className="bg-youtube-gradient h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 hover:shadow-glow transition-all duration-300 animate-float">
          <div className="absolute inset-0 bg-gradient-glass" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-3xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                  {currentProgress.toLocaleString()}
                </p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +{Math.floor(Math.random() * 20) + 5}% growth
                </p>
              </div>
              <div className="p-3 rounded-xl bg-youtube-gradient shadow-glow">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 hover:shadow-glow transition-all duration-300 animate-float" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 bg-gradient-glass" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Watch Time</p>
                <p className="text-3xl font-bold text-foreground">{avgWatchTime}s</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Quality engagement
                </p>
              </div>
              <div className="p-3 rounded-xl bg-success-gradient shadow-success">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 hover:shadow-glow transition-all duration-300 animate-float" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 bg-gradient-glass" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique IPs</p>
                <p className="text-3xl font-bold text-foreground">{new Set(views.map(v => v.ip)).size}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <Globe className="h-3 w-3" />
                  Global reach
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-glow">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 hover:shadow-glow transition-all duration-300 animate-float" style={{animationDelay: '0.3s'}}>
          <div className="absolute inset-0 bg-gradient-glass" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Device Types</p>
                <p className="text-3xl font-bold text-foreground">{Object.keys(getDeviceStats()).length}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <Monitor className="h-3 w-3" />
                  Multi-platform
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-glow">
                <Monitor className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Real-time View Feed */}
        <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 shadow-glow">
          <div className="absolute inset-0 bg-gradient-glass" />
          <CardHeader className="relative border-b border-accent/20">
            <CardTitle className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <Eye className="h-5 w-5 text-primary" />
              </div>
              Live View Stream
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-0">
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {views.slice(0, 12).map((view, index) => (
                <div 
                  key={view.id} 
                  className="flex items-center justify-between p-4 border-b border-accent/10 hover:bg-accent/20 transition-all duration-200 animate-scale-in"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`border-0 ${
                          view.device === 'Desktop' ? 'bg-blue-500/20 text-blue-400' :
                          view.device === 'Mobile' ? 'bg-green-500/20 text-green-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}
                      >
                        {view.device}
                      </Badge>
                      <span className="text-sm font-medium">{view.country}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {view.ip}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {view.watchTime}s
                      </span>
                      <span>{view.referrer}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {view.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {views.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-brand flex items-center justify-center animate-pulse-glow">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-muted-foreground">
                    Ready to simulate views! Hit start to begin.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Analytics Dashboard */}
        <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 shadow-glow">
          <div className="absolute inset-0 bg-gradient-glass" />
          <CardHeader className="relative border-b border-accent/20">
            <CardTitle className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary" />
              Analytics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-6 space-y-6">
            {/* Top Countries */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Top Countries
              </h4>
              <div className="space-y-3">
                {getCountryStats().map(([country, count], index) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-accent/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-brand rounded-full transition-all duration-700"
                          style={{ width: `${(count / views.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground min-w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Device Distribution */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-primary" />
                Device Distribution
              </h4>
              <div className="space-y-3">
                {Object.entries(getDeviceStats()).map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{device}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-accent/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success-gradient rounded-full transition-all duration-700"
                          style={{ width: `${(count / views.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground min-w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Notice */}
            <div className="relative p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-amber-500/20">
                  <Zap className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-200 mb-1">Educational Simulation</p>
                  <p className="text-xs text-amber-300/80">
                    This tool generates synthetic data for learning purposes. No real traffic is sent to any platform.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};