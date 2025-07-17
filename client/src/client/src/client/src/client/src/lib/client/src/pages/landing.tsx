import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Scan, Activity, Users } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Ingoha
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Advanced malware analysis and threat intelligence platform for security professionals
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Access Dashboard
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">Real-time Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Advanced threat detection with multi-engine analysis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Scan className="h-8 w-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Deep Scanning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Comprehensive system scans with heuristic analysis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Activity className="h-8 w-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">System Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Real-time system health and security monitoring
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Users className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Multi-user access with role-based permissions
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="text-center">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-slate-400">Detection Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-slate-400">Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-slate-400">Threats Blocked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
