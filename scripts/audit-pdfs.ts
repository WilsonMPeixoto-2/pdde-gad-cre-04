import path from "node:path";
import { pdfAssetManifest } from "../src/generated/pdfManifest.ts";
import { pddeModels } from "../src/lib/pddeModels.ts";
import { analyzePdfFile } from "./lib/pdfAnalysis.ts";
import { pdfAuditCatalog } from "./lib/pdfAuditCatalog.ts";

const formatFinding = (fileName: string, message: string) => `${fileName}: ${message}`;

const main = async () => {
  const findings: string[] = [];
  const summaries: string[] = [];

  for (const [fileName, manifestEntry] of Object.entries(pdfAssetManifest)) {
    const auditRule = (pdfAuditCatalog as Record<string, (typeof pdfAuditCatalog)[keyof typeof pdfAuditCatalog]>)[fileName];

    if (!auditRule) {
      findings.push(formatFinding(fileName, "arquivo sem regra de auditoria editorial."));
      continue;
    }

    const analysis = await analyzePdfFile(path.resolve("public/models", fileName));

    if (analysis.bytes !== manifestEntry.bytes) {
      findings.push(
        formatFinding(
          fileName,
          `manifesto com bytes desatualizados (${manifestEntry.bytes} esperado, ${analysis.bytes} encontrado). Rode npm run sync:pdf-manifest.`,
        ),
      );
    }

    if (analysis.pageCount !== manifestEntry.pageCount) {
      findings.push(
        formatFinding(
          fileName,
          `manifesto com contagem de páginas desatualizada (${manifestEntry.pageCount} esperada, ${analysis.pageCount} encontrada). Rode npm run sync:pdf-manifest.`,
        ),
      );
    }

    if (analysis.sha256 !== manifestEntry.sha256) {
      findings.push(
        formatFinding(
          fileName,
          "manifesto com hash desatualizado. Rode npm run sync:pdf-manifest antes de publicar o acervo.",
        ),
      );
    }

    if (analysis.pageCount !== auditRule.expectedPageCount) {
      findings.push(
        formatFinding(
          fileName,
          `quantidade de páginas divergente da revisão aprovada (${auditRule.expectedPageCount} esperadas, ${analysis.pageCount} encontradas).`,
        ),
      );
    }

    if (analysis.sha256 !== auditRule.approvedSha256) {
      findings.push(
        formatFinding(
          fileName,
          "o binário mudou desde a última revisão editorial aprovada; revise o PDF e atualize scripts/lib/pdfAuditCatalog.ts.",
        ),
      );
    }

    for (const snippet of auditRule.expectedSnippets) {
      if (!analysis.normalizedText.includes(snippet)) {
        findings.push(formatFinding(fileName, `não contém o sinal textual esperado "${snippet}".`));
      }
    }

    summaries.push(
      `${fileName}: ${analysis.pageLabel}, ${manifestEntry.sizeLabel}, revisão ${auditRule.reviewMethod} em ${auditRule.reviewedAt}${analysis.metadataTitle ? `, título PDF "${analysis.metadataTitle}"` : ""}${analysis.metadataAuthor ? `, autor "${analysis.metadataAuthor}"` : ""}.`,
    );
  }

  for (const model of pddeModels) {
    if (!(model.fileName in pdfAuditCatalog)) {
      findings.push(formatFinding(model.fileName, `o catálogo do modelo ${model.id} não possui regra de auditoria.`));
    }
  }

  if (findings.length > 0) {
    console.error("Foram encontrados problemas na auditoria editorial dos PDFs:");
    for (const finding of findings) {
      console.error(`- ${finding}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Acervo PDF auditado com sucesso.");
  for (const summary of summaries) {
    console.log(`- ${summary}`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
