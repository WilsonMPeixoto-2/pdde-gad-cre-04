import { expect, test } from "@playwright/test";

test.describe("PWA e service worker", () => {
  test.use({ serviceWorkers: "allow" });

  test("mantém o shell navegável offline após instalação", async ({ context, page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas/i })).toBeVisible();

    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    await page.reload();
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas/i })).toBeVisible();

    await context.setOffline(true);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas/i })).toBeVisible();
    await context.setOffline(false);
  });

  test("usa atalhos com query string e atualização controlada", async ({ request }) => {
    const manifestResponse = await request.get("/manifest.json");
    expect(manifestResponse.ok()).toBe(true);
    const manifest = await manifestResponse.json();
    expect(manifest.shortcuts.map((shortcut: { url: string }) => shortcut.url)).toEqual([
      "/?secao=introducao",
      "/?secao=checklist-documentos",
    ]);

    const swResponse = await request.get("/sw.js");
    expect(swResponse.ok()).toBe(true);
    const serviceWorkerSource = await swResponse.text();
    const installHandler = serviceWorkerSource.match(/self\.addEventListener\("install"[\s\S]*?\n}\);/)?.[0] ?? "";
    expect(installHandler).not.toContain("skipWaiting");
    expect(serviceWorkerSource).toContain('event.data === "skipWaiting"');
  });
});
