export type InstructionDocumentIconKey =
  | "planning"
  | "financial"
  | "expenses"
  | "assets";

export interface InstructionDocumentItem {
  name: string;
  purpose: string;
}

export interface InstructionDocumentGroup {
  title: string;
  description: string;
  iconKey: InstructionDocumentIconKey;
  items: readonly InstructionDocumentItem[];
  reference: {
    sourceId: string;
    articles: readonly string[];
  };
}

export const instructionDocumentGroups = [
  {
    title: "Planejamento e aprovação das prioridades",
    description:
      "Documentos que demonstram o que foi priorizado, como a decisão foi aprovada e de que forma os preços foram pesquisados.",
    iconKey: "planning",
    items: [
      {
        name: "Rol de materiais, bens e serviços prioritários",
        purpose:
          "Registra as necessidades definidas para utilização dos recursos do programa ou da ação.",
      },
      {
        name: "Ata de aprovação do plano de gastos",
        purpose:
          "Demonstra que as prioridades e o planejamento foram apreciados e aprovados pelo colegiado competente.",
      },
      {
        name: "Consolidação da pesquisa de preços ou justificativa cabível",
        purpose:
          "Evidencia a comparação realizada, a escolha do fornecedor e eventual justificativa para quantidade inferior de propostas ou utilização documentada de registro de preços.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["23", "27", "33"] },
  },
  {
    title: "Movimentação financeira e posição da conta",
    description:
      "Documentos que permitem reconstruir entradas, aplicações, pagamentos e saldos do exercício.",
    iconKey: "financial",
    items: [
      {
        name: "Demonstrativo ou registro federal aplicável ao exercício",
        purpose:
          "Consolida a execução financeira conforme o sistema e o procedimento federal aplicáveis ao período analisado.",
      },
      {
        name: "Extratos da conta específica",
        purpose:
          "Comprovam os créditos, pagamentos, transferências e saldos da conta vinculada ao recurso.",
      },
      {
        name: "Extratos das aplicações financeiras",
        purpose:
          "Comprovam rendimentos, resgates e movimentações dos valores aplicados.",
      },
      {
        name: "Conciliação bancária, quando aplicável",
        purpose:
          "Explica diferenças entre registros e saldo bancário quando houver saldo em 31 de dezembro ou outra situação que exija conciliação.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["24", "33"] },
  },
  {
    title: "Comprovação das despesas",
    description:
      "Peças que demonstram o objeto adquirido ou contratado, o pagamento e a relação da despesa com o planejamento aprovado.",
    iconKey: "expenses",
    items: [
      {
        name: "Documentos comprobatórios da destinação dos recursos",
        purpose:
          "Incluem notas fiscais, recibos válidos, comprovantes de pagamento e demais documentos necessários para demonstrar a despesa.",
      },
      {
        name: "Ata de aprovação da execução do plano de gastos",
        purpose:
          "Registra a apreciação da execução e das contas pelo colegiado, conforme o procedimento aplicável.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["26", "33"] },
  },
  {
    title: "Patrimônio, quando houver bem permanente",
    description:
      "Documentação adicional exigida somente quando a execução envolver aquisição de bens permanentes.",
    iconKey: "assets",
    items: [
      {
        name: "Documentação patrimonial cabível",
        purpose:
          "Comprova a doação, incorporação, identificação e controle do bem, conforme o procedimento patrimonial formalmente vigente.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["47"] },
  },
] as const satisfies readonly InstructionDocumentGroup[];

export const instructionDocumentSummary = {
  groupCount: instructionDocumentGroups.length,
  federalItemCount: instructionDocumentGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  ),
} as const;
