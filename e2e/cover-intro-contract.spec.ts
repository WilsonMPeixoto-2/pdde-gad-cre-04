import { expect, test, type Locator, type Page } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

const presentationParagraphs = [
  "A rotina de uma gestão escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas e urgências do dia a dia, sabemos que a organização administrativa exige tempo, atenção e, muitas vezes, decisões rápidas. Por isso, a 4ª Coordenadoria Regional de Educação, por meio da Gerência de Administração (GAD), reafirma aqui um compromisso simples e objetivo: estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.",
  "A chegada do SEI!RIO representa uma mudança importante na forma como registramos, acompanhamos e formalizamos os processos administrativos. Toda transição traz desafios — e é exatamente nesse momento que a parceria entre CRE e escolas faz diferença. Este material foi pensado para facilitar o caminho, reduzir inseguranças, evitar retrabalho e dar mais previsibilidade às rotinas.",
  "Este é o primeiro de uma série de documentos de orientação que a 4ª CRE está construindo para apoiar as direções, tanto nos procedimentos de gestão escolar quanto no uso do novo sistema processual SEI!RIO. A cada novo guia, nossa intenção é a mesma: transformar regras e etapas em rotinas mais simples, seguras e executáveis, respeitando o contexto real de cada unidade.",
  "Conte com a 4ª CRE/GAD. Seguimos à disposição para orientar, ouvir e aprimorar continuamente esses materiais, em parceria com vocês.",
] as const;

const scopeParagraphs = [
  "Este material orienta a autuação, a instrução, a assinatura e a tramitação, no SEI!RIO, do processo local de prestação de contas do PDDE das UEx/CEC vinculadas à 4ª CRE.",
  "O processo administrativo municipal não substitui os registros, as classificações, os documentos ou os procedimentos exigidos pelo FNDE na Solução BB Gestão Ágil, no SiGPC ou em outro ambiente federal aplicável ao exercício.",
  "Em matéria de execução e prestação de contas dos recursos federais, prevalecem as normas do FNDE e os normativos específicos de cada ação integrada. Os prazos internos de remessa à GAD serão aqueles formalmente comunicados pela SME-Rio ou pela 4ª CRE para cada ciclo.",
  "Tipo processual, classificação, código da GAD, interessados, padrão de especificação, uso do CNPJ em observações e peças de encaminhamento são referências operacionais locais. Antes de tratá-las como obrigação definitiva, confirme a configuração atual do SEI!RIO e a orientação formal vigente da SME-Rio ou da 4ª CRE.",
] as const;

const journeyTitles = [
  "Abertura e identificação do processo",
  "Preparação e instrução dos autos",
  "Inclusão de documentos externos",
  "Autenticação de documentos digitalizados",
  "Assinaturas e remessa do processo",
  "Acompanhamento posterior à remessa",
] as const;

const normalize = (value: string | null | undefined) =>
  (value ?? "").replace(/\s+/g, " ").trim();

const sourcePhysicalWidth = (currentSrc: string) => {
  const match = /hero-pdde-(\d+)\.(?:avif|webp|jpe?g)(?:$|\?)/i.exec(currentSrc);
  return match ? Number(match[1]) : 0;
};

const expectNoHorizontalOverflow = async (page: Page) => {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
};

const expectNoOverlap = async (first: Locator, second: Locator) => {
  const [a, b] = await Promise.all([first.boundingBox(), second.boundingBox()]);
  expect(a).not.toBeNull();
  expect(b).not.toBeNull();

  const separated =
    a!.x + a!.width <= b!.x + 0.5 ||
    b!.x + b!.width <= a!.x + 0.5 ||
    a!.y + a!.height <= b!.y + 0.5 ||
    b!.y + b!.height <= a!.y + 0.5;

  expect(separated).toBe(true);
};

test.describe("Contrato vinculante da capa e introdução v6", () => {
  test("preserva integralmente o conteúdo institucional, o escopo e as seis etapas", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas do PDDE/i })).toBeVisible();

    const introductionParagraphs = page.locator(
      [
        ".cover-intro-v5__opening-letter p",
        ".cover-intro-v5__transition-row article > p",
        ".cover-intro-v5__series-row > p",
        ".cover-intro-v5__closing-row > p",
      ].join(", "),
    );
    await expect(introductionParagraphs).toHaveCount(presentationParagraphs.length);
    for (const [index, paragraph] of presentationParagraphs.entries()) {
      expect(normalize(await introductionParagraphs.nth(index).textContent())).toBe(
        normalize(paragraph),
      );
    }

    await expect(page.getByText("Fátima das Graças Lima Barros", { exact: true })).toBeVisible();
    await expect(page.getByText("Bianca Barreto da Fonseca Coelho", { exact: true })).toBeVisible();

    const renderedScopeParagraphs = page.locator(".cover-intro-v5__scope-panel > p");
    await expect(renderedScopeParagraphs).toHaveCount(scopeParagraphs.length);
    for (const [index, paragraph] of scopeParagraphs.entries()) {
      expect(normalize(await renderedScopeParagraphs.nth(index).textContent())).toBe(
        normalize(paragraph),
      );
    }

    const journey = page.locator(".cover-intro-v5__journey");
    for (const title of journeyTitles) {
      await expect(journey.getByRole("heading", { level: 3, name: title, exact: true })).toBeVisible();
    }
  });

  test("usa somente variantes locais e nítidas da fotografia aprovada", async ({ page }) => {
    await page.goto("/");

    const image = page.locator(".cover-intro-v5__visual img");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", /^\/editorial\/hero-pdde\//);
    await expect(page.locator(".cover-intro-v5__visual source")).toHaveCount(2);

    const metrics = await image.evaluate((element: HTMLImageElement) => ({
      clientWidth: element.clientWidth,
      currentSrc: element.currentSrc,
      naturalHeight: element.naturalHeight,
      naturalWidth: element.naturalWidth,
      pixelRatio: window.devicePixelRatio,
    }));

    expect(new URL(metrics.currentSrc).origin).toBe(new URL(page.url()).origin);
    expect(sourcePhysicalWidth(metrics.currentSrc)).toBeGreaterThanOrEqual(
      Math.floor(metrics.clientWidth * metrics.pixelRatio * 0.95),
    );
    expect(metrics.naturalHeight).toBeGreaterThan(0);
  });

  test("mantém a proporção 16:9, a tipografia editorial e o grid sem colisões", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    const cover = page.locator(".cover-intro-v5__cover");
    const coverBox = await cover.boundingBox();
    expect(coverBox).not.toBeNull();
    expect(coverBox!.width / coverBox!.height).toBeCloseTo(16 / 9, 2);

    const typography = await page.locator(".cover-intro-v5__title").evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        family: style.fontFamily,
        size: Number.parseFloat(style.fontSize),
      };
    });
    expect(typography.family).toMatch(/Source Serif 4/i);
    expect(typography.size).toBeGreaterThanOrEqual(64);

    const introBodySize = await page
      .locator(".cover-intro-v5__opening-letter p")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    const scopeBodySize = await page
      .locator(".cover-intro-v5__scope-panel > p")
      .first()
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    const journeyBodySize = await page
      .locator(".journey-card__body > p")
      .first()
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

    expect(introBodySize).toBeGreaterThanOrEqual(17);
    expect(scopeBodySize).toBeGreaterThanOrEqual(17);
    expect(journeyBodySize).toBeGreaterThanOrEqual(16);

    await expectNoOverlap(
      page.locator(".cover-intro-v5__copy"),
      page.locator(".cover-intro-v5__visual"),
    );
    await expectNoOverlap(
      page.locator(".cover-intro-v5__opening-letter"),
      page.locator(".cover-intro-v5__commitment"),
    );

    const scopeGrid = page.locator(".cover-intro-v5__scope-grid");
    await scopeGrid.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 32));
    const guidedTrigger = page.locator('button[title="Abrir modo guiado"]');
    const backToTop = page.locator('button[title="Voltar ao topo"]');
    await expect(guidedTrigger).toBeVisible();
    await expect(backToTop).toBeVisible();
    await expectNoOverlap(guidedTrigger, scopeGrid);
    await expectNoOverlap(backToTop, scopeGrid);

    await expectNoHorizontalOverflow(page);
  });

  test("escala a composição para 4K sem cortar título ou ampliar a fotografia", async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await page.goto("/");

    const coverBox = await page.locator(".cover-intro-v5__cover").boundingBox();
    expect(coverBox).not.toBeNull();
    expect(coverBox!.width / coverBox!.height).toBeCloseTo(16 / 9, 2);

    const titleFits = await page.locator(".cover-intro-v5__title").evaluate((element) =>
      Array.from(element.children).every((child) => {
        const node = child as HTMLElement;
        return node.scrollWidth <= node.clientWidth + 1;
      }),
    );
    expect(titleFits).toBe(true);

    const imageMetrics = await page.locator(".cover-intro-v5__visual img").evaluate((element: HTMLImageElement) => ({
      currentSrc: element.currentSrc,
      renderedWidth: element.clientWidth,
    }));
    expect(sourcePhysicalWidth(imageMetrics.currentSrc)).toBeGreaterThanOrEqual(
      imageMetrics.renderedWidth,
    );
    await expectNoHorizontalOverflow(page);
  });

  test("recompõe a leitura mobile em 390 × 844 com densidade 3x", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      serviceWorkers: "block",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas do PDDE/i })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const mobileContract = await page.evaluate(() => {
      const title = document.querySelector<HTMLElement>(".cover-intro-v5__title");
      const image = document.querySelector<HTMLImageElement>(".cover-intro-v5__visual img");
      const caption = document.querySelector<HTMLElement>(".cover-intro-v5__photo-caption");
      const figure = document.querySelector<HTMLElement>(".cover-intro-v5__visual");
      const scopeColumns = getComputedStyle(document.querySelector(".cover-intro-v5__scope-grid")!).gridTemplateColumns;
      const journeyColumns = getComputedStyle(document.querySelector(".journey-list")!).gridTemplateColumns;
      const captionBox = caption?.getBoundingClientRect();
      const figureBox = figure?.getBoundingClientRect();

      return {
        captionInsideFigure:
          Boolean(captionBox && figureBox) &&
          captionBox!.left >= figureBox!.left &&
          captionBox!.right <= figureBox!.right &&
          captionBox!.bottom <= figureBox!.bottom,
        imageClientWidth: image?.clientWidth ?? 0,
        imageCurrentSrc: image?.currentSrc ?? "",
        journeyColumns,
        pixelRatio: window.devicePixelRatio,
        scopeColumns,
        titleSize: title ? Number.parseFloat(getComputedStyle(title).fontSize) : 0,
      };
    });

    expect(mobileContract.pixelRatio).toBe(3);
    expect(mobileContract.titleSize).toBeGreaterThanOrEqual(53);
    expect(mobileContract.captionInsideFigure).toBe(true);
    expect(sourcePhysicalWidth(mobileContract.imageCurrentSrc)).toBeGreaterThanOrEqual(
      mobileContract.imageClientWidth * mobileContract.pixelRatio * 0.9,
    );
    expect(mobileContract.scopeColumns.trim().split(/\s+/)).toHaveLength(1);
    expect(mobileContract.journeyColumns.trim().split(/\s+/)).toHaveLength(1);

    await context.close();
  });
});
