import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Dashboard stats
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      const stats = {
        systemsOnline: 3,
        totalSystems: 5,
        threatsDetected: 12,
        scansCompleted: 45,
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Systems routes
  app.get('/api/systems', async (req, res) => {
    try {
      const systems = [
        { id: 1, name: "Web Server", status: "online", ipAddress: "192.168.1.100" },
        { id: 2, name: "Database Server", status: "scanning", ipAddress: "192.168.1.101" },
      ];
      res.json(systems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch systems" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
