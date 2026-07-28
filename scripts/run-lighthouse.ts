import { spawn, type ChildProcess } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const host = "127.0.0.1";
const port = 4176;
const url = `http://${host}:${port}/`;
const outputDir = path.resolve("output/lighthouse");
const reportBase = path.join(outputDir, "guide");

const waitForServer = async () => {
  const timeoutAt = Date.now() + 30_000;

  while (Date.now() < timeoutAt) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview process may still be starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  throw new Error(`O preview não respondeu em ${url}.`);
};

const waitForExit = (process: ChildProcess) =>
  new Promise<number>((resolve, reject) => {
    process.once("error", reject);
    process.once("exit", (code) => resolve(code ?? 1));
  });

await mkdir(outputDir, { recursive: true });

const preview = spawn(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "preview", "--", "--host", host, "--port", String(port)],
  {
    stdio: "inherit",
    env: process.env,
  },
);

try {
  await waitForServer();

  const lighthouseCli = path.resolve("node_modules/lighthouse/cli/index.js");
  const lighthouseProcess = spawn(
    process.execPath,
    [
      lighthouseCli,
      url,
      "--quiet",
      "--preset=desktop",
      "--only-categories=performance,accessibility,best-practices,seo",
      "--output=json",
      "--output=html",
      `--output-path=${reportBase}`,
      "--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage",
    ],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        CHROME_PATH: chromium.executablePath(),
      },
    },
  );

  const exitCode = await waitForExit(lighthouseProcess);
  if (exitCode !== 0) {
    throw new Error(`Lighthouse encerrou com código ${exitCode}.`);
  }

  const reportPath = `${reportBase}.report.json`;
  const report = JSON.parse(await readFile(reportPath, "utf8")) as {
    categories: Record<string, { score: number | null }>;
  };

  const scores = {
    performance: report.categories.performance?.score ?? 0,
    accessibility: report.categories.accessibility?.score ?? 0,
    bestPractices: report.categories["best-practices"]?.score ?? 0,
    seo: report.categories.seo?.score ?? 0,
  };

  console.log("Lighthouse:", scores);

  const failures: string[] = [];
  if (scores.accessibility < 0.95) failures.push(`acessibilidade ${scores.accessibility}`);
  if (scores.bestPractices < 0.9) failures.push(`boas práticas ${scores.bestPractices}`);
  if (scores.seo < 0.9) failures.push(`SEO ${scores.seo}`);

  if (scores.performance < 0.7) {
    console.warn(`Aviso: desempenho abaixo da linha de base informativa: ${scores.performance}.`);
  }

  if (failures.length > 0) {
    throw new Error(`Gates Lighthouse não atendidos: ${failures.join(", ")}.`);
  }
} finally {
  preview.kill("SIGTERM");
  await Promise.race([
    waitForExit(preview),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);
}
