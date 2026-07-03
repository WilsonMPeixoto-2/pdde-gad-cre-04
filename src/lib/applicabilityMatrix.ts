import type { NormativeSourceId, NormativeStatus } from "./normativeSources";

export interface ApplicabilityMatrixEntry {
  id: string;
  exerciseRange: string;
  uexApplicability: string;
  eexApplicability: string;
  siteGuidance: string;
  status: Extract<NormativeStatus, "verified" | "pending-local-validation" | "historical-reference">;
  sourceIds: NormativeSourceId[];
  lastVerifiedAt: string;
  publishAsDefinitive: boolean;
  validationRequired?: string;
}

export const applicabilityMatrix = [
  {
    id: "until-2011",
    exerciseRange: "Até 2011",
    uexApplicability: "Fluxo histórico por protocolo.",
    eexApplicability: "Fluxo histórico.",
    siteGuidance: "Tratar somente como referência histórica.",
    status: "historical-reference",
    sourceIds: ["resolution15_2021"],
    lastVerifiedAt: "2026-07-02",
    publishAsDefinitive: true,
  },
  {
    id: "2012-2022",
    exerciseRange: "2012-2022",
    uexApplicability: "Documentação à EEx.",
    eexApplicability: "Consolidação e SiGPC, conforme o regime aplicável.",
    siteGuidance: "Identificar expressamente como regime histórico.",
    status: "historical-reference",
    sourceIds: ["resolution15_2021"],
    lastVerifiedAt: "2026-07-02",
    publishAsDefinitive: true,
  },
  {
    id: "2023-2024",
    exerciseRange: "2023-2024",
    uexApplicability: "BB Gestão Ágil ou documentação à EEx, conforme orientação oficial do FNDE.",
    eexApplicability: "BB Gestão Ágil e consolidação pertinente.",
    siteGuidance: "Aplicar o FAQ oficial sem reproduzir a regra fora do exercício indicado.",
    status: "verified",
    sourceIds: ["bbGestaoAgilFaq", "resolution7_2024"],
    lastVerifiedAt: "2026-07-02",
    publishAsDefinitive: true,
  },
  {
    id: "2025-2026",
    exerciseRange: "2025-2026",
    uexApplicability: "Fluxo federal e apresentação à EEx ainda dependem de confirmação anual específica.",
    eexApplicability: "Conforme os atos federais e as orientações formais vigentes para o exercício.",
    siteGuidance: "Não utilizar esta linha como orientação operacional definitiva até a validação anual.",
    status: "pending-local-validation",
    sourceIds: ["resolution7_2024", "comunicado01_2026"],
    lastVerifiedAt: "2026-07-02",
    publishAsDefinitive: false,
    validationRequired:
      "Confirmar o fluxo aplicável às UEx do Município do Rio de Janeiro para 2025 e 2026 em orientação oficial do FNDE e da EEx.",
  },
  {
    id: "from-2027",
    exerciseRange: "2027 em diante",
    uexApplicability: "Regime de saldos e estorno sujeito aos atos federais vigentes no momento da execução.",
    eexApplicability: "Conforme atos federais vigentes.",
    siteGuidance: "Revisão normativa obrigatória antes de qualquer orientação operacional.",
    status: "pending-local-validation",
    sourceIds: ["comunicado01_2026"],
    lastVerifiedAt: "2026-07-02",
    publishAsDefinitive: false,
    validationRequired:
      "Revisar a Resolução CD/FNDE nº 18/2025, eventuais alterações posteriores e os atos do exercício antes da publicação.",
  },
] as const satisfies readonly ApplicabilityMatrixEntry[];
