import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./visual",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  outputDir: "output/playwright/visual-results",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  use: {
    baseURL: "http://127.0.0.1:4176",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    headless: true,
    serviceWorkers: "block",
    reducedMotion: "reduce",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4176",
    port: 4176,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
