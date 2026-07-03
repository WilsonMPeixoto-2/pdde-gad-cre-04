import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
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

const extractGuideHowToSteps = () => {
  const guideContentPath = path.resolve(__dirname, "src/lib/guideContent.ts");
  const source = readFileSync(guideContentPath, "utf8");
  const sectionPattern = /\{\s*id:\s*"secao-([1-6])",\s*number:\s*"\1",\s*title:\s*"([^"]+)",\s*shortTitle:\s*"[^"]+",\s*subtitle:\s*"([^"]+)"/g;
  const steps = [...source.matchAll(sectionPattern)]
    .map((match) => ({
      "@type": "HowToStep",
      position: Number(match[1]),
      name: match[2],
      text: match[3],
    }))
    .sort((a, b) => a.position - b.position);

  if (steps.length !== 6) {
    throw new Error(
      `Não foi possível gerar o JSON-LD a partir de guideContent.ts: esperados 6 passos, encontrados ${steps.length}.`,
    );
  }

  return steps;
};

const buildId = resolveBuildId();

const guideMetadataPlugin = () => ({
  name: "pdde-guide-metadata",
  transformIndexHtml(html: string) {
    const howToSteps = extractGuideHowToSteps();

    return html
      .replaceAll("__GUIDE_FIRST_PUBLISHED_ISO_DATE__", GUIDE_VERSION.firstPublishedIsoDate)
      .replaceAll("__GUIDE_PUBLISHED_ISO_DATE__", GUIDE_VERSION.publishedIsoDate)
      .replaceAll("__GUIDE_HOW_TO_STEPS__", JSON.stringify(howToSteps, null, 2));
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
