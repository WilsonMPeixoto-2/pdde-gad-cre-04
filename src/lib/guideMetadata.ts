export const GUIDE_PROCESS_SECTIONS = [
  {
    id: "secao-1",
    number: "1",
    title: "Abertura e Identificação do Processo",
    shortTitle: "Abertura do Processo",
    subtitle: "Preparação dos dados, autuação, preenchimento do cadastro e registro do NUP",
  },
  {
    id: "secao-2",
    number: "2",
    title: "Preparação e Instrução dos Autos",
    shortTitle: "Instrução dos Autos",
    subtitle: "Função dos documentos, regras aplicáveis, organização e conferência final",
  },
  {
    id: "secao-3",
    number: "3",
    title: "Inclusão de Documentos Externos",
    shortTitle: "Documentos Externos",
    subtitle: "Classificação, inclusão, metadados e identificação dos arquivos no SEI!RIO",
  },
  {
    id: "secao-4",
    number: "4",
    title: "Autenticação de Documentos Digitalizados",
    shortTitle: "Autenticação",
    subtitle: "Autenticação dos arquivos originados em papel e conferência do registro na árvore",
  },
  {
    id: "secao-5",
    number: "5",
    title: "Assinaturas e Remessa do Processo",
    shortTitle: "Assinaturas e Remessa",
    subtitle: "Documentos internos, bloco de assinatura, conferência final e tramitação",
  },
  {
    id: "secao-6",
    number: "6",
    title: "Acompanhamento Posterior à Remessa",
    shortTitle: "Acompanhamento",
    subtitle: "Acompanhamento da análise, atendimento de diligências e providências formalmente comunicadas",
  },
] as const;

export type GuideProcessSection = (typeof GUIDE_PROCESS_SECTIONS)[number];

export const guideHowToSteps = GUIDE_PROCESS_SECTIONS.map((section, index) => ({
  position: index + 1,
  name: section.title,
  text: section.subtitle,
}));
