import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ANNUAL_GOVERNANCE_DOC_PATH,
  getAnnualGovernanceMarkdown,
} from "../src/lib/annualGovernance";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const registryPath = path.resolve(projectRoot, ANNUAL_GOVERNANCE_DOC_PATH);

await mkdir(path.dirname(registryPath), { recursive: true });
await writeFile(registryPath, `${getAnnualGovernanceMarkdown()}\n`, "utf8");

console.log(`Governança anual sincronizada em ${path.relative(projectRoot, registryPath)}.`);
