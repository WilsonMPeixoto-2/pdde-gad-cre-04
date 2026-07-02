export interface ApplicabilityMatrixEntry {
  id: string;
  exerciseRange: string;
  uexApplicability: string;
  eexApplicability: string;
  siteGuidance: string;
  status: "verified" | "pending-local-validation" | "historical-reference";
  sourceIds: string[];
  lastVerifiedAt: string;
}

export const applicabilityMatrix = [
  {
    id: "until-2011",
    exerciseRange: "Até 2011",
    uexApplicability: "Fluxo histórico por protocolo.",
    eexApplicability: "Fluxo histórico.",
    siteGuidance: "Tratar somente em guia histórico.",
    status: "historical-reference",
    sourceIds: ["resolution15_2021"],
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "2012-2022",
    exerciseRange: "2012-2022",
    uexApplicability: "Documentação à EEx.",
    eexApplicability: "Consolidação e SiGPC, conforme regime aplicável.",
    siteGuidance: "Identificar como regime histórico.",
    status: "historical-reference",
    sourceIds: ["resolution15_2021"],
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "2023-2024",
    exerciseRange: "2023-2024",
    uexApplicability: "BB Gestão Ágil ou documentação à EEx, conforme orientação oficial do FNDE.",
    eexApplicability: "BB Gestão Ágil e consolidação pertinente.",
    siteGuidance: "Aplicar o FAQ oficial, sem reproduzir regra fora do exercício.",
    status: "verified",
    sourceIds: ["bbGestaoAgilFaq", "resolution7_2024"],
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "2025-2026",
    exerciseRange: "2025-2026",
    uexApplicability: "BB Gestão Ágil e fluxo da EEx, conforme atos vigentes.",
    eexApplicability: "Conforme Resolução nº 7/2024 e atualizações oficiais.",
    siteGuidance: "Confirmar anualmente antes de publicar orientação operacional.",
    status: "pending-local-validation",
    sourceIds: ["resolution7_2024", "comunicado01_2026"],
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "from-2027",
    exerciseRange: "2027 em diante",
    uexApplicability: "Regime alterado de saldos e estorno, conforme atos vigentes.",
    eexApplicability: "Conforme atos federais vigentes.",
    siteGuidance: "Exigir nova revisão normativa antes da publicação.",
    status: "pending-local-validation",
    sourceIds: ["comunicado01_2026"],
    lastVerifiedAt: "2026-07-02",
  },
] as const satisfies readonly ApplicabilityMatrixEntry[];
