import { Switch, Route } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Dashboard from "./pages/dashboard";
import Landing from "./pages/landing";
import NotFound from "./pages/not-found";

function App() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Switch>
        {isLoading || !isAuthenticated ? (
          <Route path="/" component={Landing} />
        ) : (
          <>
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
