import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const distDir = "dist";
const source = join(distDir, "index.html");

const staticRoutes = [
  "stakeholders",
  "pilot-program",
  "pilot",
  "resources",
  "signup",
  "contact",
  "get-the-app",
  "get-app",
  "getapp",
  "who-needs-classy",
  "who",
  "why-classy",
  "why",
  "privacy-policy",
  "privacy",
  "terms-and-conditions",
  "terms",
  "acceptable-use-policy",
  "acceptable-use",
];

await Promise.all(
  staticRoutes.map(async (route) => {
    const routeDir = join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await copyFile(source, join(routeDir, "index.html"));
  })
);
