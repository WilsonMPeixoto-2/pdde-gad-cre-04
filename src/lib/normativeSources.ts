export type NormativeLevel = "federal" | "municipal" | "local";

export type NormativeStatus =
  | "verified"
  | "pending-local-validation"
  | "superseded"
  | "historical-reference";

export interface NormativeSource {
  id: string;
  title: string;
  issuingBody: string;
  level: NormativeLevel;
  officialUrl: string;
  publishedAt?: string;
  publishedPeriod?: string;
  lastVerifiedAt: string;
  status: NormativeStatus;
  notes?: string;
}

export interface LegalReference {
  sourceId: string;
  articles?: string[];
  sections?: string[];
}

export interface NormativeRule {
  id: string;
  title: string;
  summary: string;
  practicalGuidance: string[];
  prohibitedActions?: string[];
  legalReferences: LegalReference[];
  appliesTo: Array<"EEx" | "UEx" | "EM" | "CEC" | "GAD">;
  applicableExercises?: string[];
  actionScope?: string[];
  level: NormativeLevel;
  status: NormativeStatus;
  validFrom?: string;
  validUntil?: string;
  lastVerifiedAt: string;
  reviewedBy?: string;
}

export const normativeSources = {
  resolution15_2021: {
    id: "resolution15_2021",
    title: "Resolução CD/FNDE nº 15/2021",
    issuingBody: "FNDE",
    level: "federal",
    officialUrl:
      "https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/%40%40download/file",
    publishedAt: "2021-09-16",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
    notes: "Norma-base federal do PDDE; alterações posteriores devem ser relacionadas separadamente.",
  },
  resolution7_2024: {
    id: "resolution7_2024",
    title: "Resolução CD/FNDE nº 7/2024",
    issuingBody: "FNDE",
    level: "federal",
    officialUrl:
      "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/RESOLUOCD_FNDEN7DE2DEMAIODE2024RESOLUOCD_FNDEN7DE2DEMAIODE2024DOUImprensaNacional.pdf",
    publishedAt: "2024-05-02",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
  },
  comunicado47_2024: {
    id: "comunicado47_2024",
    title: "Comunicado PDDE nº 47/2024",
    issuingBody: "FNDE",
    level: "federal",
    officialUrl:
      "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2024-1/Comunicadon.47_2024Orientaesparaaprestaodecontasdosrecursosrecebidosem2024.pdf",
    publishedAt: "2024-12-18",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
    notes: "Orientação operacional específica para recursos recebidos em 2024.",
  },
  comunicado01_2026: {
    id: "comunicado01_2026",
    title: "Comunicado PDDE nº 01/2026",
    issuingBody: "FNDE",
    level: "federal",
    officialUrl:
      "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2026/comunicado-n-01_2026-alteracoes-na-resolucao-cd-fnde-no-7-2024-estorno-de-recurso.pdf",
    publishedPeriod: "2026-01",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
    notes:
      "O documento informa apenas Brasília, janeiro de 2026. Ele referencia a Resolução CD/FNDE nº 18, de 27 de novembro de 2025, e esclarece os efeitos sobre saldos e estornos a partir de 2027.",
  },
  bbGestaoAgilFaq: {
    id: "bbGestaoAgilFaq",
    title: "Perguntas e Respostas PDDE - BB Gestão Ágil",
    issuingBody: "FNDE",
    level: "federal",
    officialUrl:
      "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/area-para-gestores/bb-gestao-agil/PerguntaseRespostasPDDE.pdf",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
  },
  decreto8539_2015: {
    id: "decreto8539_2015",
    title: "Decreto nº 8.539/2015",
    issuingBody: "Presidência da República",
    level: "federal",
    officialUrl: "https://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2015/Decreto/D8539.htm",
    publishedAt: "2015-10-08",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
  },
  decretoRio47769_2020: {
    id: "decretoRio47769_2020",
    title: "Decreto Rio nº 47.769/2020",
    issuingBody: "Município do Rio de Janeiro",
    level: "municipal",
    officialUrl: "https://doweb.rio.rj.gov.br/apifront/portal/edicoes/publicacoes_ver_conteudo/671238",
    publishedAt: "2020-07-14",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
  },
  seiRioCriarProcesso: {
    id: "seiRioCriarProcesso",
    title: "SEI!RIO - Criar um processo",
    issuingBody: "Prefeitura do Rio de Janeiro",
    level: "municipal",
    officialUrl: "https://sei.rio/servidor/guias-e-ambiente-de-teste/guia-do-usuario-interno/?idpost=3208",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
  },
  seiRioIncluirDocumentos: {
    id: "seiRioIncluirDocumentos",
    title: "SEI!RIO - Incluir documentos",
    issuingBody: "Prefeitura do Rio de Janeiro",
    level: "municipal",
    officialUrl: "https://sei.rio/servidor/guias-e-ambiente-de-teste/guia-do-usuario-interno/?idpost=5713",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
  },
  seiRioBlocoAssinatura: {
    id: "seiRioBlocoAssinatura",
    title: "SEI!RIO - Bloco de Assinatura",
    issuingBody: "Prefeitura do Rio de Janeiro",
    level: "municipal",
    officialUrl: "https://sei.rio/servidor/guias-e-ambiente-de-teste/guia-do-usuario-interno/?idpost=4982",
    lastVerifiedAt: "2026-07-02",
    status: "verified",
  },
} as const satisfies Record<string, NormativeSource>;

export type NormativeSourceId = keyof typeof normativeSources;

export const normativeSourceList = Object.values(normativeSources);
