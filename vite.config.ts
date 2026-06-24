import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

function getSafeConnectOrigin(value: string | undefined) {
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

function createSecurityHeaders(apiConnectOrigin = "") {
  const connectSrc = ["'self'", "https://formspree.io", apiConnectOrigin].filter(Boolean).join(" ");

  return {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    `connect-src ${connectSrc}`,
    "form-action 'self' https://formspree.io",
    "upgrade-insecure-requests",
  ].join("; "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  };
}

const devSecurityHeaders = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const securityHeaders = createSecurityHeaders(getSafeConnectOrigin(env.VITE_CLASSY_MANAGEMENT_API_URL));

  return {
    server: {
      host: "127.0.0.1",
      port: 8080,
      strictPort: true,
      cors: false,
      fs: {
        strict: true,
      },
      hmr: {
        overlay: false,
      },
      headers: devSecurityHeaders,
    },
    preview: {
      host: "127.0.0.1",
      port: 4173,
      strictPort: true,
      headers: securityHeaders,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
