import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const assetsDir = path.resolve("dist/assets");
const files = await readdir(assetsDir);

const entries = await Promise.all(
  files.map(async (file) => ({
    file,
    bytes: (await stat(path.join(assetsDir, file))).size,
  })),
);

const largest = (extension: string) =>
  entries
    .filter((entry) => entry.file.endsWith(extension))
    .sort((a, b) => b.bytes - a.bytes)[0];

const mainJs = largest(".js");
const mainCss = largest(".css");

if (!mainJs || !mainCss) {
  throw new Error("Não foi possível localizar os bundles principais em dist/assets.");
}

const limits = {
  js: 550_000,
  css: 280_000,
};

console.log(`Bundle JS principal: ${mainJs.file} — ${mainJs.bytes} bytes`);
console.log(`Bundle CSS principal: ${mainCss.file} — ${mainCss.bytes} bytes`);

const violations: string[] = [];
if (mainJs.bytes > limits.js) violations.push(`JS principal excedeu ${limits.js} bytes.`);
if (mainCss.bytes > limits.css) violations.push(`CSS principal excedeu ${limits.css} bytes.`);

if (violations.length > 0) {
  throw new Error(violations.join(" "));
}
