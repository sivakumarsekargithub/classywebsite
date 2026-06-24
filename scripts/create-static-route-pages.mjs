import { copyFile, mkdir, writeFile } from "node:fs/promises";
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
  "pricing",
  "plans",
  "get-the-app",
  "get-app",
  "getapp",
  "management-users",
  "management-users/home",
  "management-users/dashboard",
  "management-users/institute",
  "management-users/chat",
  "management-users/schedule",
  "management-users/chats",
  "management-users/analytics",
  "management-users/calendar",
  "management-users/profile",
  "management",
  "management/home",
  "management/dashboard",
  "management/institute",
  "management/analytics",
  "management/codes",
  "management/users",
  "management/chat",
  "management/chats",
  "management/communication",
  "management/communications",
  "management/schedule",
  "management/calendar",
  "management/profile",
  "admin",
  "dashboard",
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

function getSafeConnectOrigin(value) {
  const trimmed = value?.trim();

  if (!trimmed || trimmed.startsWith("/")) {
    return "";
  }

  try {
    const url = new URL(trimmed);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? url.origin : "";
  } catch {
    return "";
  }
}

function createHeadersFile() {
  const apiConnectOrigin = getSafeConnectOrigin(process.env.VITE_CLASSY_MANAGEMENT_API_URL);
  const connectSrc = ["'self'", "https://formspree.io", apiConnectOrigin].filter(Boolean).join(" ");

  return `/*
  Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src ${connectSrc}; form-action 'self' https://formspree.io; upgrade-insecure-requests
  Cross-Origin-Opener-Policy: same-origin
  Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
`;
}

await Promise.all(
  staticRoutes.map(async (route) => {
    const routeDir = join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await copyFile(source, join(routeDir, "index.html"));
  })
);

await writeFile(join(distDir, "_headers"), createHeadersFile(), "utf8");
