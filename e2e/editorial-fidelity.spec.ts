import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

const overlaps = (
  first: { x: number; y: number; width: number; height: number },
  second: { x: number; y: number; width: number; height: number },
) =>
  first.x < second.x + second.width
  && first.x + first.width > second.x
  && first.y < second.y + second.height
  && first.y + first.height > second.y;

const numericCss = (value: string) => Number.parseFloat(value.replace("px", ""));

test.describe("Fidelidade às referências editoriais aprovadas", () => {
  test("mantém capa legível, integrada e sem sobreposição no desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const hero = page.locator('[data-editorial-hero="true"]');
    const copy = hero.locator(".editorial-hero__copy");
    const visual = hero.locator(".editorial-hero__visual");
    const title = hero.locator(".editorial-hero__title");
    const image = hero.locator(".editorial-hero__photo img");

    await expect(hero).toBeVisible();
    const [copyBox, visualBox, titleBox] = await Promise.all([
      copy.boundingBox(),
      visual.boundingBox(),
      title.boundingBox(),
    ]);

    expect(copyBox).not.toBeNull();
    expect(visualBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    expect(overlaps(copyBox!, visualBox!)).toBe(false);
    expect(titleBox!.width).toBeLessThanOrEqual(copyBox!.width + 1);

    const titleStyle = await title.evaluate((element) => getComputedStyle(element));
    expect(numericCss(titleStyle.fontSize)).toBeGreaterThanOrEqual(48);
    expect(numericCss(titleStyle.fontSize)).toBeLessThanOrEqual(78);
    expect(numericCss(titleStyle.lineHeight)).toBeGreaterThanOrEqual(48);

    const imageScale = await image.evaluate((element: HTMLImageElement) => ({
      naturalWidth: element.naturalWidth,
      renderedWidth: element.getBoundingClientRect().width,
    }));
    expect(imageScale.naturalWidth).toBeGreaterThanOrEqual(imageScale.renderedWidth * 0.9);
  });

  test("usa abertura de etapa compacta, legível e informativa", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/?secao=secao-1");

    const chapter = page.locator('[data-editorial-chapter="secao-1"]');
    const content = chapter.locator(".editorial-chapter__content");
    const map = chapter.locator(".editorial-map");
    const title = chapter.locator(".editorial-chapter__title");

    await expect(chapter).toBeVisible();
    await expect(chapter.locator(".editorial-map__step")).toHaveCount(5);

    const [contentBox, mapBox, titleBox] = await Promise.all([
      content.boundingBox(),
      map.boundingBox(),
      title.boundingBox(),
    ]);
    expect(contentBox).not.toBeNull();
    expect(mapBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    expect(overlaps(contentBox!, mapBox!)).toBe(false);
    expect(titleBox!.width).toBeLessThanOrEqual(contentBox!.width - 24);
    expect(chapter).toHaveCSS("min-height", "0px");

    const titleSize = numericCss(await title.evaluate((element) => getComputedStyle(element).fontSize));
    expect(titleSize).toBeGreaterThanOrEqual(38);
    expect(titleSize).toBeLessThanOrEqual(58);

    const stepText = chapter.locator(".editorial-map__step p").first();
    const stepTextSize = numericCss(await stepText.evaluate((element) => getComputedStyle(element).fontSize));
    expect(stepTextSize).toBeGreaterThanOrEqual(14);
  });

  test("mantém corpo, tabelas e controles em escala confortável", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/?secao=secao-3");

    const section = page.locator("#secao-3");
    const paragraph = section.locator(".editorial-block p").first();
    const tableCell = section.locator(".editorial-comparison-table td").first();
    const label = section.locator(".editorial-block__eyebrow").first();

    for (const locator of [paragraph, tableCell, label]) {
      await expect(locator).toBeVisible();
    }

    const paragraphSize = numericCss(await paragraph.evaluate((element) => getComputedStyle(element).fontSize));
    const tableSize = numericCss(await tableCell.evaluate((element) => getComputedStyle(element).fontSize));
    const labelSize = numericCss(await label.evaluate((element) => getComputedStyle(element).fontSize));

    expect(paragraphSize).toBeGreaterThanOrEqual(16);
    expect(tableSize).toBeGreaterThanOrEqual(15);
    expect(labelSize).toBeGreaterThanOrEqual(12);
  });

  test("não usa bitmaps de baixa resolução nas referências do sistema", async ({ page }) => {
    await page.goto("/?secao=secao-3");
    const section = page.locator("#secao-3");

    await expect(section.locator(".editorial-system-reference img")).toHaveCount(0);
    await expect(section.locator('[data-system-command-preview="true"]')).toHaveCount(2);
  });

  test("recompõe a interface no mobile sem corte, sobreposição ou texto minúsculo", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?secao=secao-2");

    const chapter = page.locator('[data-editorial-chapter="secao-2"]');
    const title = chapter.locator(".editorial-chapter__title");
    const body = page.locator("#secao-2 .editorial-block p").first();

    await expect(chapter).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

    const [titleBox, chapterBox] = await Promise.all([title.boundingBox(), chapter.boundingBox()]);
    expect(titleBox).not.toBeNull();
    expect(chapterBox).not.toBeNull();
    expect(titleBox!.x).toBeGreaterThanOrEqual(chapterBox!.x - 1);
    expect(titleBox!.x + titleBox!.width).toBeLessThanOrEqual(chapterBox!.x + chapterBox!.width + 1);

    const bodySize = numericCss(await body.evaluate((element) => getComputedStyle(element).fontSize));
    expect(bodySize).toBeGreaterThanOrEqual(16);
  });
});