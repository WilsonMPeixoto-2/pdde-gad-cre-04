import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  GUIDE_CAPABILITY_DOC_PATH,
  getGuideCapabilitiesMarkdown,
} from "../src/lib/guideCapabilities";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const registryPath = path.resolve(projectRoot, GUIDE_CAPABILITY_DOC_PATH);

await mkdir(path.dirname(registryPath), { recursive: true });
await writeFile(registryPath, `${getGuideCapabilitiesMarkdown()}\n`, "utf8");

console.log(`Registro de capacidades sincronizado em ${path.relative(projectRoot, registryPath)}.`);
