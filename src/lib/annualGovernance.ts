import { externalResources, type ExternalResourceId } from "@/lib/externalResources";
import { GUIDE_ANCHORS, GUIDE_VERSION } from "@/lib/guideContent";

export type AnnualGovernanceTone = "success" | "warning" | "info";

export interface AnnualGovernanceHighlight {
  label: string;
  value: string;
  note: string;
}

export interface AnnualGovernanceSignal {
  id: string;
  title: string;
  resourceId?: ExternalResourceId;
  statusLabel: string;
  tone: AnnualGovernanceTone;
  exerciseScope: string;
  riskIfIgnored: string;
  userAction: string;
  nextReviewTrigger: string;
}

export const annualGovernanceHighlights: AnnualGovernanceHighlight[] = [
  {
    label: "Exercício-base desta versão",
    value: "2026",
    note: "A redação editorial, o mapa de novidades e a identidade desta versão foram consolidados para o ciclo corrente de 2026.",
  },
  {
    label: "Próxima revisão recomendada",
    value: "Antes do ciclo 2027",
    note: "Revisar assim que o FNDE ou a EEx divulgarem novos atos, prazos ou orientações para o exercício seguinte.",
  },
  {
    label: "Regra de manutenção",
    value: "Revalidar por gatilho",
    note: "Nem tudo muda todo ano, mas itens sensíveis ao exercício precisam de checagem imediata quando houver ato novo.",
  },
];

export const annualGovernanceSignals: AnnualGovernanceSignal[] = [
  {
    id: "exercise-2024",
    resourceId: "comunicado47_2024",
    title: "Orientações específicas para recursos recebidos em 2024",
    statusLabel: "Consultar só em processos de 2024",
    tone: "warning",
    exerciseScope: "Material recortado ao exercício de 2024 e útil quando a pasta ou a análise ainda estiverem ligadas àquele ciclo.",
    riskIfIgnored: "Pode induzir o uso indevido de orientação antiga em exercício diferente.",
    userAction: "Aplique apenas quando o processo tratar efetivamente de recursos recebidos em 2024.",
    nextReviewTrigger: "Se o site passar a orientar exercícios passados adicionais ou se o FNDE revogar/substituir esse comunicado.",
  },
  {
    id: "transition-2027",
    resourceId: "comunicado01_2026",
    title: "Transição para efeitos sobre saldos, estorno e regras futuras",
    statusLabel: "Monitorar na virada para 2027",
    tone: "info",
    exerciseScope: "A comunicação foi emitida em 2026, mas seus efeitos interessam especialmente a dúvidas com projeção para 2027.",
    riskIfIgnored: "Pode levar a orientação equivocada sobre saldo remanescente, estorno e vigência das mudanças mais recentes.",
    userAction: "Releia este ponto quando a dúvida envolver saldo, reprogramação ou reflexos no exercício seguinte.",
    nextReviewTrigger: "Abrir novo ciclo anual ou surgir ato posterior do FNDE sobre saldos e estorno.",
  },
  {
    id: "bb-gestao-agil",
    resourceId: "bbGestaoAgilHub",
    title: "Ferramentas federais e BB Gestão Ágil",
    statusLabel: "Revalidar a cada novo ciclo",
    tone: "info",
    exerciseScope: "Os ambientes federais e manuais operacionais podem mudar de nome, fluxo ou convivência com outros sistemas.",
    riskIfIgnored: "O guia pode continuar visualmente correto, mas orientar o usuário para o ambiente federal errado ou desatualizado.",
    userAction: "Na abertura de cada exercício, confirme se o hub, o FAQ e o ambiente federal aplicável continuam os mesmos.",
    nextReviewTrigger: "Novo manual do FNDE, nova FAQ do BB Gestão Ágil ou alteração na convivência com SiGPC e análise da EEx.",
  },
  {
    id: "local-rite",
    resourceId: "decretoSeiRio_57250_2025",
    title: "Rito local, SEI!RIO e exigências internas",
    statusLabel: "Revisar quando a SME/CRE mudar o rito",
    tone: "warning",
    exerciseScope: "Os passos locais podem receber despacho interno, circular ou ajuste de procedimento sem alterar a norma federal do PDDE.",
    riskIfIgnored: "A pasta pode ficar tecnicamente bem instruída, mas desajustada ao rito operacional vigente da rede.",
    userAction: "Revalide quando houver circular da SME, ajuste do Comitê Regional, mudança na GAD ou atualização relevante do SEI!RIO.",
    nextReviewTrigger: "Novo ato municipal, nova circular interna, nova rotina de assinatura/remessa ou alteração do portal SEI!RIO.",
  },
  {
    id: "permanent-foundation",
    resourceId: "resolution15",
    title: "Base permanente do PDDE e núcleo mínimo documental",
    statusLabel: "Base contínua do guia",
    tone: "success",
    exerciseScope: "A Resolução nº 15/2021 permanece como eixo da conferência, salvo superveniência de norma que a altere ou substitua.",
    riskIfIgnored: "O usuário perde o referencial mínimo para distinguir obrigação permanente de detalhe operacional passageiro.",
    userAction: "Mantenha esta base como referência central e só troque o eixo quando houver ato federal superveniente claro.",
    nextReviewTrigger: "Nova resolução do FNDE, alteração formal da disciplina material do PDDE ou atualização do núcleo mínimo exigido.",
  },
];

export const annualGovernanceReviewTriggers = [
  "Abertura de novo exercício da prestação de contas.",
  "Publicação de nova resolução, comunicado ou FAQ do FNDE.",
  "Mudança operacional do BB Gestão Ágil, SiGPC ou fluxos federais correlatos.",
  "Nova circular interna da SME/CRE, ajuste regional da GAD ou mudança relevante no SEI!RIO.",
  "Substituição de modelos, anexos ou peças de apoio no acervo do projeto.",
];

export const ANNUAL_GOVERNANCE_DOC_PATH = "docs/GOVERNANCA_ANUAL_GUIA.md";
export const ANNUAL_GOVERNANCE_PRIMARY_ANCHOR = GUIDE_ANCHORS.annualGovernance;

const toneSummary = {
  success: "base contínua",
  warning: "revisão sensível",
  info: "monitoramento anual",
} as const;

const getResourceTitle = (resourceId?: ExternalResourceId) =>
  resourceId ? externalResources[resourceId].title : "Base editorial do próprio guia";

export const getAnnualGovernanceSummary = () =>
  [
    `Resumo de vigência anual do guia PDDE no SEI!RIO — ${GUIDE_VERSION.shortLabel}`,
    "",
    "Este registro mostra o que precisa ser revalidado quando o exercício muda, quando surgem novos comunicados do FNDE ou quando o rito local é alterado.",
    "",
    ...annualGovernanceSignals.map(
      (item) =>
        `- ${item.title}: ${item.statusLabel}; revisão acionada por ${item.nextReviewTrigger.toLowerCase()}.`,
    ),
    "",
    "Use este resumo para explicar a usuários e revisores que o guia tem base estável, mas trata explicitamente os pontos que envelhecem por exercício.",
  ].join("\n");

export const getAnnualGovernanceMarkdown = () => {
  const lines = [
    "# Governança anual do guia PDDE no SEI!RIO",
    "",
    `- Versão do guia: ${GUIDE_VERSION.shortLabel}`,
    `- Ciclo editorial: ${GUIDE_VERSION.cycleLabel}`,
    `- Última atualização da base: ${GUIDE_VERSION.lastUpdatedText}`,
    "",
    "## Para que serve este documento",
    "",
    "Este registro documenta os pontos do guia que dependem do exercício, de atos supervenientes do FNDE ou de mudanças no rito local. Ele ajuda a manter o projeto atualizado sem perder a base normativa permanente.",
    "",
    "## Visão rápida",
    "",
  ];

  for (const highlight of annualGovernanceHighlights) {
    lines.push(`- **${highlight.label}:** ${highlight.value}. ${highlight.note}`);
  }

  lines.push("");
  lines.push("## Pontos sensíveis por exercício");
  lines.push("");

  for (const signal of annualGovernanceSignals) {
    lines.push(`### ${signal.title}`);
    lines.push("");
    lines.push(`- Status editorial: ${signal.statusLabel} (${toneSummary[signal.tone]})`);
    lines.push(`- Base relacionada: ${getResourceTitle(signal.resourceId)}`);
    lines.push(`- Escopo temporal: ${signal.exerciseScope}`);
    lines.push(`- Risco se ignorado: ${signal.riskIfIgnored}`);
    lines.push(`- O que fazer: ${signal.userAction}`);
    lines.push(`- Quando revisar de novo: ${signal.nextReviewTrigger}`);

    if (signal.resourceId) {
      lines.push(`- Link oficial relacionado: ${externalResources[signal.resourceId].href}`);
      lines.push(`- Última verificação registrada na fonte: ${externalResources[signal.resourceId].lastVerifiedText}`);
    }

    lines.push("");
  }

  lines.push("## Gatilhos de revisão do projeto");
  lines.push("");

  for (const item of annualGovernanceReviewTriggers) {
    lines.push(`- ${item}`);
  }

  lines.push("");
  lines.push("## Observação de governança");
  lines.push("");
  lines.push(
    "Sempre que a base anual mudar, atualize `src/lib/annualGovernance.ts`, `src/lib/externalResources.ts` e regenere este arquivo com `npm run sync:annual-governance`.",
  );

  return lines.join("\n");
};

export const getAnnualGovernanceFileName = () =>
  `GUIA_GOVERNANCA_ANUAL_PDDE_${GUIDE_VERSION.publishedIsoDate}.md`;
