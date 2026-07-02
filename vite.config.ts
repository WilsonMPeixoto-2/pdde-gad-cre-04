import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { execSync } from "node:child_process";
import { GUIDE_VERSION } from "./src/lib/guideVersion";

const resolveBuildId = () => {
  const commitSha =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ??
    process.env.GITHUB_SHA?.slice(0, 12);

  if (commitSha) return commitSha;

  try {
    return execSync("git rev-parse --short=12 HEAD", {
      cwd: __dirname,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return `${Date.now()}`;
  }
};

const buildId = resolveBuildId();

const guideMetadataPlugin = () => ({
  name: "pdde-guide-metadata",
  transformIndexHtml(html: string) {
    return html
      .replaceAll("__GUIDE_FIRST_PUBLISHED_ISO_DATE__", GUIDE_VERSION.firstPublishedIsoDate)
      .replaceAll("__GUIDE_PUBLISHED_ISO_DATE__", GUIDE_VERSION.publishedIsoDate);
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    __APP_BUILD_ID__: JSON.stringify(buildId),
  },
  plugins: [react(), guideMetadataPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

