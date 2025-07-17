import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-slate-400 mb-8">Page not found</p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
