import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzePdfFile } from "./lib/pdfAnalysis.ts";

const modelsDir = path.resolve("public/models");
const outputFile = path.resolve("src/generated/pdfManifest.ts");

const main = async () => {
  const entries = (await readdir(modelsDir))
    .filter((entry) => entry.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  const manifestEntries = await Promise.all(
    entries.map(async (fileName) => {
      const filePath = path.join(modelsDir, fileName);
      const analysis = await analyzePdfFile(filePath);

      return `  ${JSON.stringify(fileName)}: {\n    bytes: ${analysis.bytes},\n    href: ${JSON.stringify(`/models/${fileName}`)},\n    pageCount: ${analysis.pageCount},\n    pageLabel: ${JSON.stringify(analysis.pageLabel)},\n    sha256: ${JSON.stringify(analysis.sha256)},\n    sizeLabel: ${JSON.stringify(analysis.sizeLabel)},\n  },`;
    }),
  );

  const fileContents = [
    "export const pdfAssetManifest = {",
    ...manifestEntries,
    "} as const;",
    "",
    "export type PdfAssetKey = keyof typeof pdfAssetManifest;",
    "",
  ].join("\n");

  await writeFile(outputFile, fileContents, "utf8");
  console.log(`Manifesto atualizado em ${path.relative(process.cwd(), outputFile)}.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
