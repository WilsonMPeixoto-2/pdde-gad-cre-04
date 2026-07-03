import { expect, test } from "@playwright/test";
import { externalResources } from "../src/lib/externalResources";
import { normativeSources, type NormativeSourceId } from "../src/lib/normativeSources";

const sharedResources = [
  ["resolution15", "resolution15_2021"],
  ["resolution7_2024", "resolution7_2024"],
  ["comunicado47_2024", "comunicado47_2024"],
  ["comunicado01_2026", "comunicado01_2026"],
  ["bbGestaoAgilFaq", "bbGestaoAgilFaq"],
  ["decreto8539_2015", "decreto8539_2015"],
  ["decretoProcessoRio_47769_2020", "decretoRio47769_2020"],
] as const satisfies ReadonlyArray<readonly [keyof typeof externalResources, NormativeSourceId]>;

test.describe("Consistência do catálogo de fontes", () => {
  test("recursos compartilhados herdam título, URL e órgão do catálogo normativo", () => {
    for (const [resourceId, sourceId] of sharedResources) {
      const resource = externalResources[resourceId];
      const source = normativeSources[sourceId];

      expect(resource.title).toBe(source.title);
      expect(resource.href).toBe(source.officialUrl);
      expect(resource.issuingBody).toBe(source.issuingBody);
      expect(resource.lastVerifiedText).toContain("Verificado em");
    }
  });
});
