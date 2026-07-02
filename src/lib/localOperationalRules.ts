import type { NormativeRule } from "./normativeSources";

export type LocalOperationalRule = NormativeRule & {
  publishInProduction: boolean;
  validationRequired: string;
};

export const localOperationalRules = [
  {
    id: "local-internal-remittance-deadline",
    title: "Prazo interno de remessa das UEx/CEC à GAD",
    summary: "Data local do ciclo ainda depende de comunicação formal da SME-Rio ou da 4ª CRE.",
    practicalGuidance: [
      "Não publicar data interna como obrigação até que a comunicação formal esteja identificada.",
      "Registrar fonte, exercício, data de verificação e unidade emissora antes de exibir como prazo.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    applicableExercises: ["2026"],
    actionScope: ["prazos internos", "remessa"],
    level: "local",
    status: "pending-local-validation",
    lastVerifiedAt: "2026-07-02",
    publishInProduction: false,
    validationRequired: "Comunicação formal da SME-Rio ou da 4ª CRE para o ciclo.",
  },
  {
    id: "local-sisbens-flow",
    title: "Rotina municipal de incorporação no SISBENS",
    summary: "Fluxo local de registro patrimonial depende de fonte formal da área patrimonial competente.",
    practicalGuidance: [
      "Separar obrigação federal de tombamento/incorporação da rotina municipal específica.",
      "Publicar passos do SISBENS somente após validação formal da SME-Rio ou área patrimonial.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "EEx", "GAD"],
    actionScope: ["patrimônio", "SISBENS"],
    level: "local",
    status: "pending-local-validation",
    lastVerifiedAt: "2026-07-02",
    publishInProduction: false,
    validationRequired: "Ato, manual, circular ou orientação formal da área patrimonial competente.",
  },
] as const satisfies readonly LocalOperationalRule[];
