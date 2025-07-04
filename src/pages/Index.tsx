import { ViewSimulator } from "@/components/ViewSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Youtube, Code, Shield, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Youtube className="h-8 w-8 text-youtube" />
              <h1 className="text-3xl font-bold">View Simulator</h1>
            </div>
            <Badge variant="secondary" className="ml-auto">Educational Tool</Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Learn about web automation, analytics tracking, and view simulation in a safe, educational environment. 
            This tool generates fake data to help you understand how view tracking systems work.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5 text-chart-1" />
                Automation Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Understand user agents, IP rotation, timing patterns, and browser automation concepts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-chart-2" />
                Bot Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how platforms detect automated traffic and what patterns they look for.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-chart-3" />
                Safe Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Practice with simulated data without violating any platform terms of service.
              </p>
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
