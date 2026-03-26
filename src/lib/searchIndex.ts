import {
  GAD_UNIT,
  GUIDE_ANCHORS,
  PROCESS_CLASSIFICATION_LABEL,
  PROCESS_TYPE_LABEL,
  guideSectionsById,
} from "@/lib/guideContent";

export interface SearchItem {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  section: string;
  anchor: string;
}

const sectionTitle = (sectionId: string) => guideSectionsById[sectionId].title;

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
    id: "modelos",
    title: "Modelos e Referências de Documentos",
    content: "PDFs de apoio visual para ofício, pesquisa de preços, demonstrativo e peças complementares, sem substituir o núcleo mínimo federal.",
    keywords: ["modelos", "referências", "pdf", "ofício", "pesquisa de preços", "parecer", "demonstrativo", "artigo 33"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.models,
  },
  {
    id: "templates",
    title: "Preenchimento Rápido",
    content: "Modelos editáveis para gerar textos padronizados e copiar para o SEI!RIO.",
    keywords: ["template", "preenchimento rápido", "copiar", "ofício", "despacho"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.templates,
  },
  {
    id: "jornada",
    title: "Mapa da Jornada Processual",
    content: "Fluxo interativo com dependências entre abertura, instrução, autenticação e remessa.",
    keywords: ["jornada", "fluxo", "etapas", "mapa", "processo"],
    section: sectionTitle("secao-2"),
    anchor: GUIDE_ANCHORS.journey,
  },
  {
    id: "documentos-externos",
    title: "Inclusão de Documentos Externos",
    content: "Como cadastrar PDFs digitalizados e nato-digitais com nomes claros na árvore do processo.",
    keywords: ["documento externo", "pdf", "árvore", "digitalizado", "nato-digital"],
    section: sectionTitle("secao-3"),
    anchor: "secao-3",
  },
  {
    id: "autenticacao",
    title: "Autenticação de Documentos",
    content: "Autentique os documentos digitalizados com a expressão 'confere com o original'.",
    keywords: ["autenticação", "confere com o original", "digitalizado", "selo", "fé pública"],
    section: sectionTitle("secao-4"),
    anchor: "secao-4",
  },
  {
    id: "bloco-assinatura",
    title: "Bloco de Assinatura",
    content: "Crie o bloco, inclua apenas documentos internos e acompanhe a conclusão das assinaturas.",
    keywords: ["bloco de assinatura", "assinar", "documento interno", "disponibilizar"],
    section: sectionTitle("secao-5"),
    anchor: "secao-5",
  },
  {
    id: "remessa-gad",
    title: "Remessa para a GAD",
    content: `Envie o processo para ${GAD_UNIT.fullLabel} após concluir as assinaturas.`,
    keywords: ["enviar", "tramitar", "gad", "10729", "remessa", "finalização"],
    section: sectionTitle("secao-6"),
    anchor: "secao-6",
  },
  {
    id: "sigpc",
    title: "BB Gestão Ágil e SiGPC",
    content: "Ferramentas federais que precisam ser distinguidas na comprovação da execução e no acompanhamento da prestação de contas do PDDE, com BB Gestão Ágil adotado para repasses a partir de 2023.",
    keywords: ["bb gestão ágil", "sigpc", "contas online", "fnde", "demonstrativo", "prestação", "2023", "2024", "eex", "uex"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "prazos",
    title: "Prazos da Prestação de Contas",
    content: "Prazo local da UEx para a EEx, prazo federal da EEx ao FNDE e orientação atual sobre saldos remanescentes.",
    keywords: ["prazos", "cronograma", "eex", "uex", "30 de abril", "saldos", "2027", "comunicado 01/2026", "resolução 18/2025"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "legislacao",
    title: "Legislação de Referência",
    content: "Base rápida de conferência para não ensinar procedimento errado: Resolução nº 15/2021, atos operacionais vigentes e sistemas federais aplicáveis ao exercício.",
    keywords: ["legislação", "resolução 15/2021", "resolução 7/2024", "resolução 22/2024", "resolução 18/2025", "comunicado 47/2024", "comunicado 01/2026", "fnde", "normativos", "escopo"],
    section: sectionTitle("anexo"),
    anchor: "anexo",
  },
  {
    id: "norma-municipal",
    title: "Fluxo Municipal SME-RJ",
    content: "Manual, circulares internas e SEI!RIO organizam o rito local de conferência, saneamento e remessa sem substituir a regra federal do PDDE.",
    keywords: ["manual", "sme-rj", "cre", "gad", "circulares", "prazo interno", "sei-rio", "rito local", "cec"],
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
