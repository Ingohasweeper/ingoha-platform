import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Activity, Scan, LogOut } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: systems } = useQuery({
    queryKey: ["/api/systems"],
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Ingoha Dashboard</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Systems Online
              </CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats?.systemsOnline || 0}/{stats?.totalSystems || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Threats Detected
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats?.threatsDetected || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Scans Completed
              </CardTitle>
              <Scan className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats?.scansCompleted || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Protection Status
              </CardTitle>
              <Shield className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                Active
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Systems List */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Monitored Systems</CardTitle>
            <CardDescription className="text-slate-400">
              Overview of all systems under protection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systems?.map((system: any) => (
                <div key={system.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{system.name}</div>
                    <div className="text-sm text-slate-400">{system.ipAddress}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    system.status === 'online' 
                      ? 'bg-green-900/30 text-green-400' 
                      : system.status === 'scanning'
                      ? 'bg-blue-900/30 text-blue-400'
                      : 'bg-slate-900/30 text-slate-400'
                  }`}>
                    {system.status}
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-slate-400">
                  No systems configured yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
