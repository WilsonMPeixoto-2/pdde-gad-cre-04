import {
  GAD_UNIT,
  GUIDE_ANCHORS,
  PROCESS_CLASSIFICATION_LABEL,
  PROCESS_TYPE_LABEL,
  type GuideAnchorId,
  type GuideSectionId,
  guideSectionsById,
} from "@/lib/guideContent";


export interface SearchItem {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  section: string;
  anchor: GuideAnchorId;
}

const sectionTitle = (sectionId: GuideSectionId) => guideSectionsById[sectionId].title;

export const searchIndex: SearchItem[] = [
  {
    id: "intro",
    title: "Apresentação do POP",
    content: "Mensagem de abertura da 4ª CRE e escopo do guia da prestação de contas do PDDE.",
    keywords: ["introdução", "apresentação", "pop", "4ª cre", "escopo"],
    section: sectionTitle("introducao"),
    anchor: "introducao",
  },
  {
    id: "tipo-processo",
    title: "Tipo de Processo Correto",
    content: `Utilize o tipo ${PROCESS_TYPE_LABEL}.`,
    keywords: ["tipo de processo", "cec", "gestão dos conselhos", "prestação de contas", "sei"],
    section: sectionTitle("secao-1"),
    anchor: "secao-1",
  },
  {
    id: "classificacao",
    title: "Classificação por Assuntos",
    content: PROCESS_CLASSIFICATION_LABEL,
    keywords: ["classificação", "assuntos", "03.04.01.02", "cec"],
    section: sectionTitle("secao-1"),
    anchor: "secao-1",
  },
  {
    id: "interessados",
    title: "Interessados do Processo",
    content: `Inclua ${GAD_UNIT.displayLabel} e a unidade escolar como interessadas no processo.`,
    keywords: ["gad", "interessados", "10729", "unidade escolar"],
    section: sectionTitle("secao-1"),
    anchor: "secao-1",
  },
  {
    id: "checklist",
    title: "Checklist de Documentos",
    content: "Lista mínima e complementar para instrução processual da prestação de contas.",
    keywords: ["checklist", "documentos", "rol mínimo", "verificação", "prestação de contas"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.checklist,
  },
  {
    id: "regras-operacionais",
    title: "Regras Operacionais da Instrução",
    content:
      "Orientações curtas que afetam diretamente a montagem do processo no SEI!RIO, sem substituir o conteúdo completo sobre execução da verba.",
    keywords: [
      "regras operacionais",
      "pesquisa de preços",
      "srp",
      "vedações",
      "compras",
      "instrução",
      "sei-rio",
    ],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.rules,
  },
  {
    id: "modelos",
    title: "Modelos e Referências de Documentos",
    content: "PDFs de apoio visual para ofício, pesquisa de preços, demonstrativo e peças complementares, sem substituir o núcleo mínimo federal.",
    keywords: ["modelos", "referências", "pdf", "ofício", "pesquisa de preços", "parecer", "demonstrativo", "artigo 33"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.models,
  },
  {
    id: "templates",
    title: "Modelos de Texto de Apoio",
    content: "Modelos editáveis para gerar minutas padronizadas e copiar para o SEI!RIO.",
    keywords: ["template", "modelo de texto", "minuta", "copiar", "ofício", "despacho"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.templates,
  },
  {
    id: "jornada",
    title: "Mapa das Etapas do Processo",
    content: "Quadro de consulta para acompanhar a sequência entre abertura, instrução, autenticação e remessa.",
    keywords: ["jornada", "fluxo", "etapas", "mapa", "processo"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.journey,
  },
  {
    id: "documentos-externos",
    title: "Inclusão de Documentos Externos",
    content: "Como cadastrar PDFs digitalizados e nato-digitais no SEI!RIO, com preenchimento correto do Nome na Árvore.",
    keywords: ["documento externo", "pdf", "árvore", "nome na árvore", "digitalizado", "nato-digital"],
    section: sectionTitle("secao-3"),
    anchor: "secao-3",
  },
  {
    id: "autenticacao",
    title: "Autenticação de Documentos",
    content: "Documentos digitalizados exigem tipo de conferência compatível com o documento apresentado; nato-digitais entram como original eletrônico.",
    keywords: ["autenticação", "tipo de conferência", "digitalizado", "nato-digital", "original eletrônico"],
    section: sectionTitle("secao-4"),
    anchor: "secao-4",
  },
  {
    id: "bloco-assinatura",
    title: "Bloco de Assinatura",
    content:
      "Crie o bloco, inclua apenas documentos internos, acompanhe as assinaturas e conclua a conferência antes da remessa.",
    keywords: ["bloco de assinatura", "assinar", "documento interno", "disponibilizar", "despacho"],
    section: sectionTitle("secao-5"),
    anchor: "secao-5",
  },
  {
    id: "remessa-gad",
    title: "Remessa para a GAD",
    content: `Envie o processo para ${GAD_UNIT.fullLabel} somente após concluir as assinaturas e assinar o despacho de encaminhamento.`,
    keywords: ["enviar", "tramitar", "gad", "10729", "remessa", "despacho", "encaminhamento"],
    section: sectionTitle("secao-5"),
    anchor: "secao-5",
  },
  {
    id: "pos-envio-gad",
    title: "Análise e Providências Posteriores",
    content:
      "Depois da remessa, acompanhe a análise da GAD, eventuais diligências e a manifestação cabível conforme o fluxo local vigente.",
    keywords: ["pós-envio", "gad", "análise", "diligência", "manifestação", "fluxo local"],
    section: sectionTitle("secao-6"),
    anchor: "secao-6",
  },
  {
    id: "sigpc",
    title: "BB Gestão Ágil e SiGPC",
    content: "SEI!RIO, BB Gestão Ágil e SiGPC cumprem funções distintas; o BB Gestão Ágil não substitui a documentação exigida pela Resolução nº 15/2021.",
    keywords: ["bb gestão ágil", "sigpc", "contas online", "registro federal", "fnde", "demonstrativo", "prestação", "2023", "2024", "eex", "uex"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "prazos",
    title: "Prazos da Prestação de Contas",
    content: "Prazos e marcos da prestação de contas devem seguir os atos do exercício, o cronograma federal e as orientações complementares da SME/CRE.",
    keywords: ["prazos", "cronograma", "eex", "uex", "30 de abril", "atos do exercício", "saldos", "2027", "comunicado 01/2026", "resolução 18/2025"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "legislacao",
    title: "Legislação de Referência",
    content: "Base rápida de conferência: Lei nº 11.947/2009, Resolução nº 15/2021, Resolução nº 7/2024, Comunicado PDDE nº 01/2026 e normativos específicos das ações integradas.",
    keywords: ["legislação", "lei 11.947/2009", "resolução 15/2021", "resolução 7/2024", "resolução 22/2024", "resolução 18/2025", "comunicado 47/2024", "comunicado 01/2026", "fnde", "normativos", "escopo"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "norma-municipal",
    title: "Fluxo Municipal SME-RJ",
    content: "SEI!RIO, Decreto Rio nº 47.769/2020 e guias oficiais organizam o rito municipal sem substituir a regra federal do PDDE.",
    keywords: ["manual", "decreto rio 47.769/2020", "sme-rj", "cre", "gad", "circulares", "prazo interno", "sei-rio", "rito local", "cec"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "contatos",
    title: "Contatos Úteis",
    content: "Telefones e e-mails de suporte da GAD/4ª CRE para dúvidas sobre o processo.",
    keywords: ["contatos", "telefone", "email", "suporte", "gad"],
    section: sectionTitle("contatos"),
    anchor: "contatos",
  },
];

export function searchItems(query: string): SearchItem[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return searchIndex.filter((item) => {
    const normalizedTitle = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedContent = item.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedKeywords = item.keywords.map((keyword) =>
      keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    return (
      normalizedTitle.includes(normalizedQuery) ||
      normalizedContent.includes(normalizedQuery) ||
      normalizedKeywords.some((keyword) => keyword.includes(normalizedQuery))
    );
  });
}

export function getQuickSuggestions(): SearchItem[] {
  const quickSuggestionIds = [
    "tipo-processo",
    "checklist",
    "bloco-assinatura",
    "remessa-gad",
    "contatos",
  ];

  return quickSuggestionIds
    .map((id) => searchIndex.find((item) => item.id === id))
    .filter((item): item is SearchItem => Boolean(item));
}
