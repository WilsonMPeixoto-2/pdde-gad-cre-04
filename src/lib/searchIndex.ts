import {
  GAD_UNIT,
  GUIDE_ANCHORS,
  PROCESS_CLASSIFICATION_LABEL,
  PROCESS_TYPE_LABEL,
  type GuideAnchorId,
  type GuideSectionId,
  guideSectionsById,
} from "@/lib/guideContent";
import { normativeRules } from "@/lib/normativeRules";

export interface SearchItem {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  section: string;
  anchor: GuideAnchorId;
}

const sectionTitle = (sectionId: GuideSectionId) => guideSectionsById[sectionId].title;

const baseSearchIndex: SearchItem[] = [
  {
    id: "intro",
    title: "Apresentação do guia",
    content: "Escopo, limites, visão geral do fluxo e finalidade do guia local da prestação de contas do PDDE.",
    keywords: ["introdução", "apresentação", "guia", "4ª cre", "escopo", "fluxo"],
    section: sectionTitle("introducao"),
    anchor: "introducao",
  },
  {
    id: "jornada",
    title: "Mapa das etapas do processo",
    content: "Visão geral da sequência entre abertura, instrução, inclusão, autenticação, assinatura, remessa e acompanhamento.",
    keywords: ["jornada", "fluxo", "etapas", "mapa", "processo"],
    section: sectionTitle("introducao"),
    anchor: GUIDE_ANCHORS.journey,
  },
  {
    id: "tipo-processo",
    title: "Tipo de processo no SEI!RIO",
    content: `Referência operacional atualmente apresentada no guia: ${PROCESS_TYPE_LABEL}. Confirme a denominação no sistema e na orientação local vigente antes de utilizar.`,
    keywords: ["tipo de processo", "cec", "gestão dos conselhos", "prestação de contas", "sei", "validação local"],
    section: sectionTitle("secao-1"),
    anchor: "secao-1",
  },
  {
    id: "classificacao",
    title: "Classificação por assuntos",
    content: `Referência operacional apresentada no guia: ${PROCESS_CLASSIFICATION_LABEL}. A classificação depende da configuração vigente do SEI!RIO.`,
    keywords: ["classificação", "assuntos", "03.04.01.02", "cec", "validação local"],
    section: sectionTitle("secao-1"),
    anchor: "secao-1",
  },
  {
    id: "interessados",
    title: "Interessados do processo",
    content: `O guia apresenta ${GAD_UNIT.displayLabel} e a unidade escolar como referência operacional local. Confirme a vigência do fluxo antes da autuação.`,
    keywords: ["gad", "interessados", "10729", "unidade escolar", "validação local"],
    section: sectionTitle("secao-1"),
    anchor: "secao-1",
  },
  {
    id: "checklist",
    title: "Checklist de documentos",
    content: "Instrumento de conferência final da base federal e das peças complementares aplicáveis ao processo local.",
    keywords: ["checklist", "documentos", "rol mínimo", "verificação", "prestação de contas"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.checklist,
  },
  {
    id: "regras-operacionais",
    title: "Regras aplicadas à instrução",
    content: "Orientações com fonte, aplicabilidade e status de revisão que afetam a preparação dos documentos.",
    keywords: ["regras operacionais", "pesquisa de preços", "srp", "vedações", "compras", "instrução"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.rules,
  },
  {
    id: "modelos",
    title: "Modelos e referências de documentos",
    content: "PDFs de apoio visual, sem substituição do núcleo federal nem atribuição automática de caráter oficial.",
    keywords: ["modelos", "referências", "pdf", "ofício", "pesquisa de preços", "demonstrativo"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.models,
  },
  {
    id: "templates",
    title: "Minutas de texto de apoio",
    content: "Minutas editáveis sujeitas à adequação ao caso concreto e à validação do fluxo institucional vigente.",
    keywords: ["template", "modelo de texto", "minuta", "copiar", "ofício", "despacho"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.templates,
  },
  {
    id: "documentos-externos",
    title: "Inclusão de documentos externos",
    content: "Classificação, metadados, inclusão e identificação de PDFs digitalizados e nato-digitais no SEI!RIO.",
    keywords: ["documento externo", "pdf", "árvore", "nome na árvore", "digitalizado", "nato-digital"],
    section: sectionTitle("secao-3"),
    anchor: "secao-3",
  },
  {
    id: "autenticacao",
    title: "Autenticação de documentos digitalizados",
    content: "Documentos digitalizados exigem tipo de conferência compatível; nato-digitais entram como original eletrônico.",
    keywords: ["autenticação", "tipo de conferência", "digitalizado", "nato-digital", "original eletrônico"],
    section: sectionTitle("secao-4"),
    anchor: "secao-4",
  },
  {
    id: "bloco-assinatura",
    title: "Bloco de assinatura",
    content: "Inclua apenas documentos internos e conclua as assinaturas antes da remessa.",
    keywords: ["bloco de assinatura", "assinar", "documento interno", "disponibilizar"],
    section: sectionTitle("secao-5"),
    anchor: "secao-5",
  },
  {
    id: "remessa-gad",
    title: "Remessa do processo",
    content: `A tramitação para ${GAD_UNIT.fullLabel} deve observar o fluxo local formal vigente e a conclusão das etapas anteriores.`,
    keywords: ["enviar", "tramitar", "gad", "10729", "remessa", "encaminhamento", "validação local"],
    section: sectionTitle("secao-5"),
    anchor: "secao-5",
  },
  {
    id: "pos-envio-gad",
    title: "Acompanhamento posterior à remessa",
    content: "Acompanhe a tramitação e eventuais diligências sem presumir aprovação, autoridade decisória ou conclusão não formalizada.",
    keywords: ["pós-envio", "gad", "análise", "diligência", "manifestação", "fluxo local"],
    section: sectionTitle("secao-6"),
    anchor: "secao-6",
  },
  {
    id: "sigpc",
    title: "BB Gestão Ágil e SiGPC",
    content: "SEI!RIO, BB Gestão Ágil e SiGPC cumprem funções distintas; o ambiente federal não substitui a documentação exigida.",
    keywords: ["bb gestão ágil", "sigpc", "registro federal", "fnde", "2023", "2024", "eex", "uex"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "prazos",
    title: "Prazos da prestação de contas",
    content: "Os prazos devem seguir os atos do exercício e as orientações formalmente publicadas pela SME-Rio ou pela CRE.",
    keywords: ["prazos", "cronograma", "eex", "uex", "atos do exercício", "saldos", "2027", "comunicado 01/2026"],
    section: sectionTitle("introducao"),
    anchor: "introducao",
  },
  {
    id: "legislacao",
    title: "Legislação de referência",
    content: "Resolução nº 15/2021, Resolução nº 7/2024, Comunicado PDDE nº 01/2026 e atos específicos das ações integradas.",
    keywords: ["legislação", "resolução 15/2021", "resolução 7/2024", "resolução 18/2025", "comunicado 01/2026", "fnde"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "norma-municipal",
    title: "Processo eletrônico municipal",
    content: "SEI!RIO, Decreto Rio nº 47.769/2020 e guias oficiais organizam o rito municipal sem substituir a regra federal.",
    keywords: ["manual", "decreto rio 47.769/2020", "sme-rj", "cre", "gad", "sei-rio", "rito local"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "contatos",
    title: "Atendimento e suporte",
    content: "Canais da GAD/4ª CRE e recursos oficiais de suporte do SEI!RIO.",
    keywords: ["contatos", "telefone", "email", "suporte", "gad", "sei"],
    section: sectionTitle("contatos"),
    anchor: "contatos",
  },
];

const getNormativeRuleAnchor = (ruleId: string): GuideAnchorId => {
  if (ruleId === "external-document-format-classification") return "secao-3";
  if (ruleId === "guide-scope-federal-systems" || ruleId === "deadlines-internal-remittance") return "introducao";
  return GUIDE_ANCHORS.rules;
};

const normativeSearchItems: SearchItem[] = normativeRules.map((rule) => {
  const anchor = getNormativeRuleAnchor(rule.id);
  const parentSection: GuideSectionId =
    anchor === GUIDE_ANCHORS.rules
      ? "secao-2"
      : anchor === "secao-3"
        ? "secao-3"
        : "introducao";

  return {
    id: `normative-${rule.id}`,
    title: rule.title,
    content: `${rule.summary} ${rule.practicalGuidance.join(" ")}`,
    keywords: [...(rule.actionScope ?? []), ...rule.appliesTo, ...(rule.applicableExercises ?? [])],
    section: sectionTitle(parentSection),
    anchor,
  };
});

export const searchIndex: SearchItem[] = [...baseSearchIndex, ...normativeSearchItems];

const normalizeSearchText = (value: string) =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function searchItems(query: string): SearchItem[] {
  if (!query.trim()) return [];

  const normalizedQuery = normalizeSearchText(query);

  return searchIndex.filter((item) => {
    const normalizedTitle = normalizeSearchText(item.title);
    const normalizedContent = normalizeSearchText(item.content);
    const normalizedKeywords = item.keywords.map(normalizeSearchText);

    return (
      normalizedTitle.includes(normalizedQuery) ||
      normalizedContent.includes(normalizedQuery) ||
      normalizedKeywords.some((keyword) => keyword.includes(normalizedQuery))
    );
  });
}

export function getQuickSuggestions(): SearchItem[] {
  const quickSuggestionIds = ["tipo-processo", "checklist", "bloco-assinatura", "remessa-gad", "contatos"];

  return quickSuggestionIds
    .map((id) => searchIndex.find((item) => item.id === id))
    .filter((item): item is SearchItem => Boolean(item));
}
