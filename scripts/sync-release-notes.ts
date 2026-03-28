import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  GUIDE_RECENT_UPDATES_DOC_PATH,
  getGuideRecentUpdatesMarkdown,
} from "../src/lib/guideRecentUpdates";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const releaseNotesPath = path.resolve(projectRoot, GUIDE_RECENT_UPDATES_DOC_PATH);

await mkdir(path.dirname(releaseNotesPath), { recursive: true });
await writeFile(releaseNotesPath, `${getGuideRecentUpdatesMarkdown()}\n`, "utf8");

console.log(`Histórico recente sincronizado em ${path.relative(projectRoot, releaseNotesPath)}.`);
