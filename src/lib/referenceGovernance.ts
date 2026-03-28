import { GUIDE_ANCHORS, GUIDE_VERSION } from "@/lib/guideContent";
import { externalResources, referenceGovernanceIds, type ExternalResourceId } from "@/lib/externalResources";

export interface ReferenceGovernanceEntry {
  id: ExternalResourceId;
  title: string;
  shortLabel: string;
  href: string;
  categoryLabel: string;
  issuingBody: string;
  appliesTo: string;
  whyItMatters: string;
  userWhenToUse: string;
  lastVerifiedText: string;
}

const categoryLabelMap = {
  norma: "Norma",
  comunicado: "Comunicado",
  sistema: "Sistema ou material operacional",
  servico: "Serviço institucional",
} as const;

export const referenceGovernanceEntries: ReferenceGovernanceEntry[] = referenceGovernanceIds.map((resourceId) => {
  const resource = externalResources[resourceId];

  return {
    id: resourceId,
    title: resource.title,
    shortLabel: resource.shortLabel,
    href: resource.href,
    categoryLabel: categoryLabelMap[resource.category],
    issuingBody: resource.issuingBody ?? "Órgão emissor não informado",
    appliesTo: resource.appliesTo ?? "Escopo não informado",
    whyItMatters: resource.whyItMatters ?? "Importância não informada",
    userWhenToUse: resource.userWhenToUse ?? "Uso sugerido não informado",
    lastVerifiedText: resource.lastVerifiedText ?? "Sem data de verificação registrada",
  };
});

export const REFERENCE_GOVERNANCE_DOC_PATH = "docs/MAPA_REFERENCIAS_OFICIAIS.md";

export const REFERENCE_GOVERNANCE_PRIMARY_ANCHOR = GUIDE_ANCHORS.referenceGovernance;

export const getReferenceGovernanceSummary = () =>
  [
    `Mapa de referências oficiais verificadas do guia PDDE no SEI!RIO — ${GUIDE_VERSION.shortLabel}`,
    "",
    "O projeto hoje informa, para as fontes prioritárias do anexo:",
    "- quem emitiu a referência",
    "- para que tipo de dúvida ela serve",
    "- por que ela importa no fluxo da prestação de contas",
    "- quando a checagem foi revalidada nesta versão",
    "",
    "Esse mapa ajuda a comunicar ao usuário que a base normativa e operacional do guia não está apenas listada: ela está rastreada e contextualizada.",
  ].join("\n");

export const getReferenceGovernanceMarkdown = () => {
  const lines = [
    "# Mapa de referências oficiais do guia PDDE no SEI!RIO",
    "",
    `- Versão do guia: ${GUIDE_VERSION.shortLabel}`,
    `- Ciclo editorial: ${GUIDE_VERSION.cycleLabel}`,
    `- Última atualização da base: ${GUIDE_VERSION.lastUpdatedText}`,
    "",
    "## Para que serve este documento",
    "",
    "Este registro documenta as fontes oficiais mais importantes usadas pelo guia e indica, de forma rastreável, o órgão emissor, o escopo, a razão de uso e a data da última verificação editorial.",
    "",
    "## Resumo rápido para comunicação",
    "",
    getReferenceGovernanceSummary(),
    "",
    "## Referências rastreadas",
    "",
  ];

  for (const entry of referenceGovernanceEntries) {
    lines.push(`### ${entry.title}`);
    lines.push("");
    lines.push(`- Categoria: ${entry.categoryLabel}`);
    lines.push(`- Órgão emissor: ${entry.issuingBody}`);
    lines.push(`- Aplicação principal: ${entry.appliesTo}`);
    lines.push(`- Por que importa: ${entry.whyItMatters}`);
    lines.push(`- Quando consultar: ${entry.userWhenToUse}`);
    lines.push(`- Última verificação registrada: ${entry.lastVerifiedText}`);
    lines.push(`- Link oficial: ${entry.href}`);
    lines.push("");
  }

  lines.push("## Observação de governança");
  lines.push("");
  lines.push(
    "Sempre que uma referência prioritária for alterada, substituída ou revalidada, atualize a base em `src/lib/externalResources.ts` e regenere este arquivo com `npm run sync:reference-governance`.",
  );

  return lines.join("\n");
};

export const getReferenceGovernanceFileName = () =>
  `GUIA_REFERENCIAS_OFICIAIS_PDDE_${GUIDE_VERSION.publishedIsoDate}.md`;
