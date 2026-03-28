import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { execSync } from "node:child_process";

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

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    __APP_BUILD_ID__: JSON.stringify(buildId),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
