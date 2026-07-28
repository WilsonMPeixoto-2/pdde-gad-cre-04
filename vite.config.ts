import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { execSync } from "node:child_process";
import { GUIDE_VERSION } from "./src/lib/guideVersion";
import { guideHowToSteps } from "./src/lib/guideMetadata";

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
    const howToSteps = guideHowToSteps.map((step) => ({
      "@type": "HowToStep",
      ...step,
    }));

    if (howToSteps.length !== 6) {
      throw new Error(
        `Não foi possível gerar o JSON-LD: esperados 6 passos, encontrados ${howToSteps.length}.`,
      );
    }

    return html
      .replaceAll("__GUIDE_FIRST_PUBLISHED_ISO_DATE__", GUIDE_VERSION.firstPublishedIsoDate)
      .replaceAll("__GUIDE_PUBLISHED_ISO_DATE__", GUIDE_VERSION.publishedIsoDate)
      .replaceAll("__GUIDE_HOW_TO_STEPS__", JSON.stringify(howToSteps, null, 2));
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const analyzeBundle = mode === "analyze" || process.env.ANALYZE_BUNDLE === "true";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    define: {
      __APP_BUILD_ID__: JSON.stringify(buildId),
    },
    plugins: [
      react(),
      guideMetadataPlugin(),
      ...(analyzeBundle
        ? [
            visualizer({
              filename: "stats.html",
              gzipSize: true,
              brotliSize: true,
              open: false,
              template: "treemap",
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
