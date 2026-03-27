import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const modelsDir = path.resolve("public/models");
const outputFile = path.resolve("src/generated/pdfManifest.ts");

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(1)} ${units[unitIndex]}`;
};

const main = async () => {
  const entries = (await readdir(modelsDir))
    .filter((entry) => entry.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  const manifestEntries = await Promise.all(
    entries.map(async (fileName) => {
      const filePath = path.join(modelsDir, fileName);
      const fileStat = await stat(filePath);

      return `  ${JSON.stringify(fileName)}: {\n    bytes: ${fileStat.size},\n    href: ${JSON.stringify(`/models/${fileName}`)},\n    sizeLabel: ${JSON.stringify(formatBytes(fileStat.size))},\n  },`;
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
