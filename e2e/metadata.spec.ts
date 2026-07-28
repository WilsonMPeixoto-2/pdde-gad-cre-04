import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

type HowToStep = {
  "@type": string;
  position: number;
  name: string;
  text: string;
};

type HowToStructuredData = {
  "@type"?: string;
  datePublished?: string;
  dateModified?: string;
  step?: HowToStep[];
};

test.describe("Metadados estruturados", () => {
  test("gera os seis passos e as datas vigentes a partir dos registros estruturados", async ({ request }) => {
    const response = await request.get("/");
    expect(response.ok()).toBe(true);

    const html = await response.text();
    expect(html).not.toContain("__GUIDE_HOW_TO_STEPS__");
    expect(html).not.toContain("__GUIDE_PUBLISHED_ISO_DATE__");

    const scriptMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    expect(scriptMatch).not.toBeNull();

    const structuredData = JSON.parse(scriptMatch?.[1] ?? "{}") as HowToStructuredData;

    expect(structuredData["@type"]).toBe("HowTo");
    expect(structuredData.datePublished).toBe("2026-03-28");
    expect(structuredData.dateModified).toBe("2026-07-27");
    expect(structuredData.step).toHaveLength(6);
    expect(structuredData.step?.map((step) => step.position)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(structuredData.step?.[5]).toEqual({
      "@type": "HowToStep",
      position: 6,
      name: "Acompanhamento Posterior à Remessa",
      text: "Acompanhamento da análise, atendimento de diligências e providências formalmente comunicadas",
    });
  });
});
