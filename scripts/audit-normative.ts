import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { applicabilityMatrix } from "../src/lib/applicabilityMatrix.ts";
import { localOperationalRules } from "../src/lib/localOperationalRules.ts";
import {
  normativeSourceList,
  normativeSources,
  type LegalReference,
  type NormativeRule,
  type NormativeSource,
} from "../src/lib/normativeSources.ts";
import { normativeRules } from "../src/lib/normativeRules.ts";

const maxVerificationAgeDays = 180;
const now = new Date();

const officialHostAllowList = [
  "www.gov.br",
  "gov.br",
  "sei.rio",
  "doweb.rio.rj.gov.br",
  "www.planalto.gov.br",
  "planalto.gov.br",
];

const legacyComponentCitationAllowList = new Set(
  [
    "src/components/pop/DeadlinesCalculator.tsx",
    "src/components/pop/InfoDrawer.tsx",
    "src/components/pop/SectionAnexo.tsx",
    "src/components/pop/SectionTwo.tsx",
  ].map((value) => path.normalize(value)),
);

const dateAgeInDays = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return Math.floor((now.getTime() - date.getTime()) / 86_400_000);
};

const isOfficialUrl = (value: string) => {
  try {
    const url = new URL(value);
    return officialHostAllowList.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
};

const getReferenceLabel = (reference: LegalReference) =>
  [
    reference.sourceId,
    reference.articles?.length ? `arts. ${reference.articles.join(", ")}` : "",
    reference.sections?.length ? reference.sections.join(", ") : "",
  ]
    .filter(Boolean)
    .join(" · ");

const ensureSourcesAreValid = (sources: readonly NormativeSource[]) => {
  const findings: string[] = [];
  const ids = new Set<string>();

  for (const source of sources) {
    if (ids.has(source.id)) {
      findings.push(`Fonte normativa duplicada: ${source.id}`);
    }
    ids.add(source.id);

    if (!source.title.trim()) findings.push(`Fonte sem título: ${source.id}`);
    if (!source.issuingBody.trim()) findings.push(`Fonte sem órgão emissor: ${source.id}`);
    if (!isOfficialUrl(source.officialUrl)) {
      findings.push(`URL não oficial na fonte ${source.id}: ${source.officialUrl}`);
    }
    if (source.status === "verified" && dateAgeInDays(source.lastVerifiedAt) > maxVerificationAgeDays) {
      findings.push(`Fonte com verificação vencida: ${source.title} (${source.lastVerifiedAt})`);
    }
  }

  return findings;
};

const ensureRulesAreValid = (rules: readonly NormativeRule[]) => {
  const findings: string[] = [];
  const sourceIds = new Set(Object.keys(normativeSources));

  for (const rule of rules) {
    if (!rule.id.trim()) findings.push(`Regra sem id: ${rule.title}`);
    if (!rule.title.trim()) findings.push(`Regra sem título: ${rule.id}`);
    if (!rule.summary.trim()) findings.push(`Regra sem resumo: ${rule.id}`);
    if (rule.practicalGuidance.length === 0) findings.push(`Regra sem orientação prática: ${rule.id}`);
    if (rule.appliesTo.length === 0) findings.push(`Regra sem aplicabilidade: ${rule.id}`);
    if (rule.status === "superseded") findings.push(`Regra superada ainda publicada: ${rule.id}`);
    if (dateAgeInDays(rule.lastVerifiedAt) > maxVerificationAgeDays) {
      findings.push(`Regra com verificação vencida: ${rule.id} (${rule.lastVerifiedAt})`);
    }
    if (rule.legalReferences.length === 0) {
      findings.push(`Regra publicada sem fonte: ${rule.id}`);
    }

    for (const reference of rule.legalReferences) {
      if (!sourceIds.has(reference.sourceId)) {
        findings.push(`Regra ${rule.id} referencia fonte inexistente: ${reference.sourceId}`);
      }
      if (!reference.articles?.length && !reference.sections?.length) {
        findings.push(`Regra ${rule.id} possui referência sem artigo ou seção: ${getReferenceLabel(reference)}`);
      }
    }
  }

  return findings;
};

const ensureLocalRulesAreNotPublished = () => {
  const findings: string[] = [];

  for (const rule of localOperationalRules) {
    if (rule.status === "pending-local-validation" && rule.publishInProduction) {
      findings.push(`Regra local pendente marcada para publicação: ${rule.id}`);
    }
    if (rule.status === "pending-local-validation" && !rule.validationRequired.trim()) {
      findings.push(`Regra local pendente sem descrição de validação necessária: ${rule.id}`);
    }
  }

  return findings;
};

const ensureApplicabilityMatrixIsValid = () => {
  const findings: string[] = [];
  const sourceIds = new Set(Object.keys(normativeSources));

  for (const entry of applicabilityMatrix) {
    if (entry.sourceIds.length === 0) {
      findings.push(`Matriz de aplicabilidade sem fonte: ${entry.id}`);
    }
    for (const sourceId of entry.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        findings.push(`Matriz ${entry.id} referencia fonte inexistente: ${sourceId}`);
      }
    }
    if (dateAgeInDays(entry.lastVerifiedAt) > maxVerificationAgeDays) {
      findings.push(`Matriz com verificação vencida: ${entry.id} (${entry.lastVerifiedAt})`);
    }
  }

  return findings;
};

const listFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listFiles(fullPath);
      return fullPath;
    }),
  );

  return files.flat();
};

const ensureNoNewDirectLegalCitations = async () => {
  const findings: string[] = [];
  const componentRoot = path.resolve("src/components");
  const files = (await listFiles(componentRoot)).filter((file) => file.endsWith(".tsx"));
  const legalCitationPattern = /\b(?:[Aa]rt\.?|arts?\.)\s*\d/;

  for (const file of files) {
    const relativePath = path.normalize(path.relative(process.cwd(), file));
    if (legacyComponentCitationAllowList.has(relativePath)) {
      continue;
    }

    const source = await readFile(file, "utf8");
    if (legalCitationPattern.test(source)) {
      findings.push(`Componente contém citação jurídica direta fora da camada normativa: ${relativePath}`);
    }
  }

  return findings;
};

const ensureModelLabelsDoNotClaimOfficialStatus = async () => {
  const findings: string[] = [];
  const smartTemplates = await readFile(path.resolve("src/components/pop/SmartTemplates.tsx"), "utf8");

  if (/Termo oficial de doação/i.test(smartTemplates)) {
    findings.push("Modelo de Termo de Doação ainda se apresenta como oficial sem aprovação registrada.");
  }

  return findings;
};

const main = async () => {
  const publishedRules = [
    ...normativeRules,
    ...localOperationalRules.filter((rule) => rule.publishInProduction),
  ];

  const findings = [
    ...ensureSourcesAreValid(normativeSourceList),
    ...ensureRulesAreValid(publishedRules),
    ...ensureLocalRulesAreNotPublished(),
    ...ensureApplicabilityMatrixIsValid(),
    ...(await ensureNoNewDirectLegalCitations()),
    ...(await ensureModelLabelsDoNotClaimOfficialStatus()),
  ];

  if (findings.length === 0) {
    console.log("Auditoria técnica e estrutural concluída.");
    console.log("A validação normativa humana permanece obrigatória.");
    return;
  }

  console.error("Foram encontrados problemas na auditoria normativa:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exitCode = 1;
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
