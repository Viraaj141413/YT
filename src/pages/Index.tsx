import { ViewSimulator } from "@/components/ViewSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Youtube, Code, Shield, BookOpen, Zap, Target, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply animate-float" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-success/10 rounded-full mix-blend-multiply animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-warning/10 rounded-full mix-blend-multiply animate-float" style={{animationDelay: '4s'}} />
      </div>

      {/* Header */}
      <div className="relative border-b border-accent/20 bg-gradient-surface backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-youtube-gradient rounded-2xl blur animate-pulse-glow" />
              <div className="relative flex items-center gap-3 bg-youtube-gradient p-3 rounded-2xl shadow-glow">
                <Youtube className="h-8 w-8 text-white" />
                <div className="text-white">
                  <h1 className="text-3xl font-bold">View Simulator Pro</h1>
                  <p className="text-sm opacity-90">Advanced Analytics Training Platform</p>
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30 animate-float">
                v2.0 Educational
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary animate-float" style={{animationDelay: '0.5s'}}>
                100% Safe
              </Badge>
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-3xl leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
            Master web automation, analytics tracking, and view simulation in a comprehensive educational environment. 
            This advanced platform generates realistic synthetic data to help you understand how modern view tracking 
            systems operate without violating any platform terms.
          </p>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 hover:shadow-glow transition-all duration-500 animate-scale-in group">
            <div className="absolute inset-0 bg-gradient-glass" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader className="relative pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-glow group-hover:shadow-glow-lg transition-all">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Automation Mastery
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Deep dive into user agents, IP rotation, timing patterns, browser automation, 
                and advanced fingerprinting techniques used by modern platforms.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-400">
                  HTTP Headers
                </Badge>
                <Badge variant="outline" className="text-xs bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
                  Selenium
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 hover:shadow-glow transition-all duration-500 animate-scale-in group" style={{animationDelay: '0.1s'}}>
            <div className="absolute inset-0 bg-gradient-glass" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
            <CardHeader className="relative pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-success group-hover:shadow-glow-lg transition-all">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Detection Systems
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Understand how platforms detect automated traffic, behavioral analysis, 
                CAPTCHA systems, and the latest anti-bot protection mechanisms.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30 text-green-400">
                  ML Detection
                </Badge>
                <Badge variant="outline" className="text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                  Behavioral AI
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-surface border-accent/20 hover:shadow-glow transition-all duration-500 animate-scale-in group" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 bg-gradient-glass" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            <CardHeader className="relative pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-glow group-hover:shadow-glow-lg transition-all">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ethical Learning
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Practice with completely synthetic data in a safe environment that respects 
                all platform terms of service and promotes responsible development.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-400">
                  Zero Risk
                </Badge>
                <Badge variant="outline" className="text-xs bg-pink-500/10 border-pink-500/30 text-pink-400">
                  Educational
                </Badge>
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
