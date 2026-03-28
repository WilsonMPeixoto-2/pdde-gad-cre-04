import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getReferenceGovernanceMarkdown,
  REFERENCE_GOVERNANCE_DOC_PATH,
} from "../src/lib/referenceGovernance";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.resolve(projectRoot, REFERENCE_GOVERNANCE_DOC_PATH);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${getReferenceGovernanceMarkdown()}\n`, "utf8");

console.log(`Mapa de referências sincronizado em ${path.relative(projectRoot, outputPath)}.`);
