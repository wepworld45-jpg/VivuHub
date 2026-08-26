import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const isProduction = process.env.NODE_ENV === "production";

  app.disable("x-powered-by");

  // Serve static files from dist/public in production
  const staticPath = isProduction
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  app.get("/healthz", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use(
    express.static(staticPath, {
      etag: true,
      lastModified: true,
      maxAge: isProduction ? "1h" : 0,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  // Handle extensionless client-side routes without masking missing assets as HTML.
  app.get("*", (req, res) => {
    if (path.extname(req.path)) {
      res.status(404).type("text/plain").send("Not found");
      return;
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = Number.parseInt(process.env.PORT ?? "3000", 10) || 3000;
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}/`);
  });

  const shutdown = (signal: string) => {
    console.log(`${signal} received; closing server gracefully.`);
    server.close(() => process.exit(0));
  };

  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
