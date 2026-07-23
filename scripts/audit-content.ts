import { access, stat } from "node:fs/promises";
import path from "node:path";
import { externalResourceList, externalResources, referenceGovernanceIds } from "../src/lib/externalResources.ts";
import { pdfAssetManifest } from "../src/generated/pdfManifest.ts";
import { GUIDE_ANCHORS, guideSectionIds } from "../src/lib/guideContent.ts";
import { pddeModels } from "../src/lib/pddeModels.ts";
import { PROJECT_BRANDING } from "../src/lib/projectBranding.ts";
import { searchIndex } from "../src/lib/searchIndex.ts";

const httpTimeoutMs = 20000;
const externalLinkRetryAttempts = 3;

const externalLinkHealthFallbacks = new Map<string, string>([
  [
    "https://sei.rio/servidor/guias-e-ambiente-de-teste/guia-do-usuario-interno/",
    "https://sei.rio/servidor/",
  ],
  ["https://sei.rio/servidor/atendimento/", "https://sei.rio/servidor/"],
]);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ensurePdfAssetsMatch = async () => {
  const findings: string[] = [];

  for (const [fileName, manifestEntry] of Object.entries(pdfAssetManifest)) {
    const filePath = path.resolve("public/models", fileName);

    try {
      await access(filePath);
      const fileStat = await stat(filePath);

      if (fileStat.size !== manifestEntry.bytes) {
        findings.push(
          `Manifesto desatualizado para ${fileName}: esperado ${manifestEntry.bytes} bytes, encontrado ${fileStat.size}. Rode npm run sync:pdf-manifest.`,
        );
      }
    } catch {
      findings.push(`Arquivo PDF ausente: ${path.relative(process.cwd(), filePath)}`);
    }
  }

  for (const model of pddeModels) {
    if (!(model.fileName in pdfAssetManifest)) {
      findings.push(`Modelo ${model.id} referencia ${model.fileName}, mas esse arquivo não está no manifesto.`);
    }
  }

  return findings;
};

const ensureBrandAssetsExist = async () => {
  const findings: string[] = [];
  const assetPaths = Object.values(PROJECT_BRANDING.assetPaths).map((assetPath) =>
    path.resolve("public", assetPath.replace(/^\//, "")),
  );

  for (const assetPath of assetPaths) {
    try {
      await access(assetPath);
    } catch {
      findings.push(`Ativo de identidade ausente: ${path.relative(process.cwd(), assetPath)}`);
    }
  }

  return findings;
};

const ensureAnchorsStayAligned = () => {
  const allowedAnchors = new Set([...guideSectionIds, ...Object.values(GUIDE_ANCHORS)]);
  const findings: string[] = [];

  for (const item of searchIndex) {
    if (!allowedAnchors.has(item.anchor)) {
      findings.push(`Âncora não reconhecida no índice de busca: ${item.id} -> ${item.anchor}`);
    }
  }

  return findings;
};

const ensureReferenceGovernanceMetadata = () => {
  const findings: string[] = [];
  const requiredFields = [
    "issuingBody",
    "appliesTo",
    "whyItMatters",
    "userWhenToUse",
    "lastVerifiedText",
  ] as const;

  for (const resourceId of referenceGovernanceIds) {
    const resource = externalResources[resourceId];

    for (const field of requiredFields) {
      if (!resource[field] || String(resource[field]).trim().length === 0) {
        findings.push(`Metadado obrigatório ausente em ${resource.title}: ${field}`);
      }
    }
  }

  return findings;
};

const fetchStatus = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), httpTimeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        accept: "text/html,application/pdf,*/*",
      },
    });

    return response.status;
  } finally {
    clearTimeout(timeout);
  }
};

const fetchStatusWithRetry = async (url: string) => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= externalLinkRetryAttempts; attempt += 1) {
    try {
      const status = await fetchStatus(url);

      if (status < 500 || attempt === externalLinkRetryAttempts) {
        return status;
      }

      lastError = new Error(`HTTP ${status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < externalLinkRetryAttempts) {
      await sleep(500 * attempt);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
};

const ensureExternalLinksRespond = async () => {
  const findings: string[] = [];

  for (const resource of externalResourceList) {
    try {
      const status = await fetchStatusWithRetry(resource.href);
      if (status < 400) continue;

      const fallbackUrl = externalLinkHealthFallbacks.get(resource.href);
      if (fallbackUrl) {
        const fallbackStatus = await fetchStatusWithRetry(fallbackUrl);
        if (fallbackStatus < 400) {
          console.warn(
            `Aviso: a rota específica retornou ${status}, mas o portal institucional está disponível: ${resource.title} -> ${resource.href}`,
          );
          continue;
        }
      }

      findings.push(`Link externo com falha (${status}): ${resource.title} -> ${resource.href}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isCiNetworkFailure =
        process.env.CI === "true" &&
        (/fetch failed/i.test(message) || /aborted/i.test(message));

      if (isCiNetworkFailure) {
        console.warn(
          `Aviso: link externo não verificado no CI por falha de rede: ${resource.title} -> ${resource.href} (${message})`,
        );
        continue;
      }

      findings.push(`Link externo inacessível: ${resource.title} -> ${resource.href} (${message})`);
    }
  }

  return findings;
};

const main = async () => {
  const findings = [
    ...(await ensureBrandAssetsExist()),
    ...(await ensurePdfAssetsMatch()),
    ...ensureAnchorsStayAligned(),
    ...ensureReferenceGovernanceMetadata(),
    ...(await ensureExternalLinksRespond()),
  ];

  if (findings.length === 0) {
    console.log("Conteúdo auditado sem inconsistências estruturais.");
    return;
  }

  console.error("Foram encontrados problemas na auditoria de conteúdo:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exitCode = 1;
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
