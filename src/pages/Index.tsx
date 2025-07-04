import { ViewSimulator } from "@/components/ViewSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Youtube, Code, Shield, BookOpen, Zap, Target, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3 bg-primary/10 p-3 rounded-lg">
              <Youtube className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">View Simulator Pro</h1>
                <p className="text-sm text-muted-foreground">Educational Analytics Platform</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Badge variant="secondary">v2.0 Educational</Badge>
              <Badge variant="outline">Safe Learning</Badge>
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-3xl">
            Learn web automation and analytics tracking through simulation. This platform generates 
            synthetic data for educational purposes without sending real traffic to any platform.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                Automation Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about user agents, IP rotation, timing patterns, and browser automation 
                techniques used by modern platforms.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">HTTP Headers</Badge>
                <Badge variant="secondary" className="text-xs">Selenium</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                Detection Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Understand how platforms detect automated traffic, behavioral analysis, 
                and anti-bot protection mechanisms.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">ML Detection</Badge>
                <Badge variant="secondary" className="text-xs">Behavioral AI</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                Ethical Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Practice with synthetic data in a safe environment that respects 
                platform terms and promotes responsible development.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">Zero Risk</Badge>
                <Badge variant="secondary" className="text-xs">Educational</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Simulator */}
        <ViewSimulator />
      </div>
    </div>
  );
};

export default Index;
