import express from "express";
import { ViteDevServer } from "vite";

export async function setupVite(app: express.Express, server: any) {
  const vite = await (await import("vite")).createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  
  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
}

export function serveStatic(app: express.Express) {
  app.use(express.static("dist/public"));
  
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "dist/public" });
  });
}

export function log(message: string) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}
