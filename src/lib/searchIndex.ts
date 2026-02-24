export interface SearchItem {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  section: string;
  anchor: string;
}

export const searchIndex: SearchItem[] = [
  {
    id: "intro",
    title: "Introdução ao PDDE",
    content: "Apresentação do Programa Dinheiro Direto na Escola e suas finalidades",
    keywords: ["pdde", "programa", "escola", "dinheiro", "introdução"],
    section: "Introdução",
    anchor: "introducao"
  },
  {
    id: "nup",
    title: "Abertura de NUP no SEI",
    content: "Procedimento para abertura do Número Único de Protocolo no SEI",
    keywords: ["nup", "sei", "protocolo", "abertura", "número"],
    section: "Seção 1",
    anchor: "secao-1"
  },
  {
    id: "despacho",
    title: "Criação de Despacho",
    content: "Como criar e configurar um despacho no sistema SEI",
    keywords: ["despacho", "sei", "documento", "criar"],
    section: "Seção 1",
    anchor: "secao-1"
  },
  {
    id: "gad",
    title: "Tramitação para GAD",
    content: "Encaminhamento do processo para a Gerência de Assistência ao Discente",
    keywords: ["gad", "tramitação", "encaminhar", "gerência", "discente"],
    section: "Seção 2",
    anchor: "secao-2"
  },
  {
    id: "cre",
    title: "Coordenação Regional de Ensino",
    content: "Procedimentos da CRE no fluxo do PDDE",
    keywords: ["cre", "coordenação", "regional", "ensino"],
    section: "Seção 2",
    anchor: "secao-2"
  },
  {
    id: "prestacao",
    title: "Prestação de Contas",
    content: "Documentação e procedimentos para prestação de contas do PDDE",
    keywords: ["prestação", "contas", "documentos", "comprovação"],
    section: "Seção 3",
    anchor: "secao-3"
  },
  {
    id: "documentos",
    title: "Documentos Obrigatórios",
    content: "Lista de documentos necessários para o processo PDDE",
    keywords: ["documentos", "obrigatórios", "lista", "anexos"],
    section: "Seção 4",
    anchor: "secao-4"
  },
  {
    id: "nota-fiscal",
    title: "Nota Fiscal Eletrônica",
    content: "Requisitos e modelo de nota fiscal eletrônica DANFE",
    keywords: ["nota", "fiscal", "danfe", "eletrônica", "nfe"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "extrato",
    title: "Extrato Bancário",
    content: "Extrato de conta corrente e aplicação financeira",
    keywords: ["extrato", "bancário", "conta", "corrente", "aplicação"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "parecer",
    title: "Parecer do Conselho",
    content: "Modelo de parecer do conselho escolar",
    keywords: ["parecer", "conselho", "escolar", "modelo"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "planejamento",
    title: "Planejamento com Ata",
    content: "Documento de planejamento e ata de reunião",
    keywords: ["planejamento", "ata", "reunião", "documento"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "oficio",
    title: "Modelo de Ofício",
    content: "Modelo padrão de ofício para o PDDE",
    keywords: ["ofício", "modelo", "documento", "padrão"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "pesquisa-precos",
    title: "Pesquisa de Preços",
    content: "Consolidação e documentação de pesquisa de preços",
    keywords: ["pesquisa", "preços", "cotação", "consolidação"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "despesa",
    title: "Demonstrativo de Despesa",
    content: "Modelo de demonstrativo de despesas realizadas",
    keywords: ["despesa", "demonstrativo", "gastos", "modelo"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "checklist",
    title: "Checklist de Documentos",
    content: "Lista de verificação de documentos do PDDE conforme Resolução CD/FNDE nº 15/2021",
    keywords: ["checklist", "verificação", "lista", "conferência", "sigpc", "contas online"],
    section: "Seção 5",
    anchor: "secao-5"
  },
  {
    id: "sigpc",
    title: "SiGPC / Contas Online",
    content: "Sistema de Gestão de Prestação de Contas do FNDE para registro e envio da prestação de contas do PDDE",
    keywords: ["sigpc", "contas online", "sistema", "fnde", "prestação"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "vedacoes",
    title: "Vedações do PDDE",
    content: "Despesas proibidas com recursos do PDDE conforme Resolução CD/FNDE nº 15/2021",
    keywords: ["vedações", "proibido", "vedado", "despesas proibidas"],
    section: "Anexos",
    anchor: "anexo"
  },
  {
    id: "contatos",
    title: "Contatos Úteis",
    content: "Telefones e e-mails para suporte ao PDDE",
    keywords: ["contatos", "telefone", "email", "suporte"],
    section: "Contatos",
    anchor: "contatos"
  },
  {
    id: "prazos",
    title: "Prazos e Cronograma",
    content: "Datas importantes e cronograma do PDDE",
    keywords: ["prazos", "cronograma", "datas", "calendário"],
    section: "Seção 6",
    anchor: "secao-6"
  },
  {
    id: "fluxo",
    title: "Fluxo do Processo",
    content: "Diagrama e explicação do fluxo completo do PDDE",
    keywords: ["fluxo", "processo", "etapas", "diagrama"],
    section: "Seção 1",
    anchor: "secao-1"
  }
];

export function searchItems(query: string): SearchItem[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  return searchIndex.filter(item => {
    const normalizedTitle = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedContent = item.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedKeywords = item.keywords.map(k => k.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    
    return (
      normalizedTitle.includes(normalizedQuery) ||
      normalizedContent.includes(normalizedQuery) ||
      normalizedKeywords.some(k => k.includes(normalizedQuery))
    );
  });
}

export function getQuickSuggestions(): SearchItem[] {
  return searchIndex.slice(0, 5);
}
