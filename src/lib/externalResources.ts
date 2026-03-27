interface ExternalResource {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  href: string;
  citation?: string;
  category: "norma" | "comunicado" | "sistema" | "servico";
}

export const externalResources = {
  resolution15: {
    id: "resolution15",
    title: "Resolução CD/FNDE nº 15/2021",
    shortLabel: "Resolução nº 15/2021",
    description: "Norma principal do PDDE e base do núcleo mínimo da prestação de contas.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/view",
    citation: "Resolução CD/FNDE nº 15/2021",
    category: "norma",
  },
  comunicado47_2024: {
    id: "comunicado47_2024",
    title: "Comunicado PDDE nº 47/2024",
    shortLabel: "Comunicado nº 47/2024",
    description: "Orientação operacional específica para os recursos recebidos em 2024.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2024-1/Comunicadon.47_2024Orientaesparaaprestaodecontasdosrecursosrecebidosem2024.pdf",
    citation: "Comunicado PDDE nº 47/2024",
    category: "comunicado",
  },
  comunicado01_2026: {
    id: "comunicado01_2026",
    title: "Comunicado PDDE nº 01/2026",
    shortLabel: "Comunicado nº 01/2026",
    description: "Esclarecimento oficial do FNDE sobre saldos, estorno e aplicabilidade a partir de 2027.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2026/comunicado-n-01_2026-alteracoes-na-resolucao-cd-fnde-no-7-2024-estorno-de-recurso.pdf",
    citation: "Comunicado PDDE nº 01/2026",
    category: "comunicado",
  },
  bbGestaoAgilFaq: {
    id: "bbGestaoAgilFaq",
    title: "Perguntas e Respostas PDDE (BB Gestão Ágil)",
    shortLabel: "FAQ BB Gestão Ágil",
    description: "Material oficial do FNDE sobre o recorte dos recursos de 2023 e 2024 e a convivência com o SiGPC.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/area-para-gestores/bb-gestao-agil/PerguntaseRespostasPDDE.pdf",
    category: "sistema",
  },
  bbGestaoAgilHub: {
    id: "bbGestaoAgilHub",
    title: "BB Gestão Ágil",
    shortLabel: "BB Gestão Ágil",
    description: "Página oficial do FNDE com manual e orientações da ferramenta.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/area-para-gestores/bb-gestao-agil",
    category: "sistema",
  },
  pddeResolucoes: {
    id: "pddeResolucoes",
    title: "Resoluções e Formulários do PDDE",
    shortLabel: "Resoluções e Formulários",
    description: "Repositório oficial para acompanhar normas e materiais vigentes do programa.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/resolucoes-e-formularios",
    category: "norma",
  },
  decreto8539_2015: {
    id: "decreto8539_2015",
    title: "Decreto nº 8.539/2015",
    shortLabel: "Decreto nº 8.539/2015",
    description: "Marco federal sobre processos eletrônicos e distinção entre documento nato-digital e digitalizado.",
    href: "https://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2015/Decreto/D8539.htm",
    citation: "Decreto nº 8.539/2015",
    category: "norma",
  },
  decretoSeiRio_57250_2025: {
    id: "decretoSeiRio_57250_2025",
    title: "Decreto Rio nº 57.250/2025",
    shortLabel: "Decreto Rio nº 57.250/2025",
    description: "Norma municipal sobre tramitação eletrônica, assinatura e validade documental no SEI!RIO.",
    href: "https://comlurb.prefeitura.rio/wp-content/uploads/sites/74/2025/11/Decreto-SEI-57250.pdf",
    citation: "Decreto Rio nº 57.250/2025",
    category: "norma",
  },
  seiRioPortal: {
    id: "seiRioPortal",
    title: "SEI!RIO",
    shortLabel: "SEI!RIO",
    description: "Acesso ao sistema oficial.",
    href: "https://sei.rio/",
    category: "servico",
  },
  seiRioUserGuide: {
    id: "seiRioUserGuide",
    title: "Guia do Usuário Interno",
    shortLabel: "Guia do Usuário Interno",
    description: "Manual oficial do SEI!RIO para uso interno.",
    href: "https://sei.rio/servidor/guias-e-ambiente-de-teste/guia-do-usuario-interno/",
    category: "servico",
  },
  seiRioSupport: {
    id: "seiRioSupport",
    title: "Portal de Atendimento",
    shortLabel: "Portal de Atendimento",
    description: "Canal oficial de suporte técnico do SEI!RIO.",
    href: "https://sei.rio/servidor/atendimento/",
    category: "servico",
  },
} as const satisfies Record<string, ExternalResource>;

export type ExternalResourceId = keyof typeof externalResources;

export const officialReferenceIds: ExternalResourceId[] = [
  "resolution15",
  "comunicado47_2024",
  "bbGestaoAgilFaq",
  "comunicado01_2026",
  "bbGestaoAgilHub",
  "pddeResolucoes",
];

export const externalResourceList = Object.values(externalResources);
