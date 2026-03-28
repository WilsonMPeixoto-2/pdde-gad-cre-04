import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getDocument, VerbosityLevel } from "pdfjs-dist/legacy/build/pdf.mjs";

const require = createRequire(import.meta.url);
const pdfjsDistRoot = path.dirname(require.resolve("pdfjs-dist/package.json"));
const standardFontDataUrl = `${pathToFileURL(path.join(pdfjsDistRoot, "standard_fonts")).href}/`;

export interface PdfAnalysis {
  bytes: number;
  pageCount: number;
  pageLabel: string;
  sha256: string;
  sizeLabel: string;
  text: string;
  normalizedText: string;
}

export const formatBytes = (bytes: number) => {
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

export const formatPageLabel = (pageCount: number) =>
  `${pageCount} ${pageCount === 1 ? "página" : "páginas"}`;

export const normalizePdfAuditText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

export const analyzePdfFile = async (filePath: string): Promise<PdfAnalysis> => {
  const buffer = await readFile(filePath);
  const bytes = buffer.byteLength;
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  const loadingTask = getDocument({
    data: new Uint8Array(buffer),
    standardFontDataUrl,
    verbosity: VerbosityLevel.ERRORS,
  });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    text += `${content.items.map((item) => ("str" in item ? item.str : "")).join(" ")}\n`;
  }

  return {
    bytes,
    pageCount: pdf.numPages,
    pageLabel: formatPageLabel(pdf.numPages),
    sha256,
    sizeLabel: formatBytes(bytes),
    text,
    normalizedText: normalizePdfAuditText(text),
  };
};
