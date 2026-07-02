import type { NormativeRule } from "./normativeSources";

export const normativeRules = [
  {
    id: "guide-scope-federal-systems",
    title: "Escopo do guia local",
    summary:
      "O processo municipal no SEI!RIO não substitui registros, documentos ou procedimentos exigidos em ambientes federais.",
    practicalGuidance: [
      "Distinguir sempre tramitação local no SEI!RIO de comprovação e registro federal.",
      "Indicar a fonte federal quando a orientação envolver FNDE, BB Gestão Ágil ou SiGPC.",
      "Não apresentar fluxo municipal como substituto de exigência federal.",
    ],
    legalReferences: [
      { sourceId: "resolution15_2021", articles: ["33"] },
      { sourceId: "resolution7_2024", sections: ["comprovação da execução financeira"] },
      { sourceId: "bbGestaoAgilFaq", sections: ["perguntas e respostas oficiais"] },
    ],
    appliesTo: ["UEx", "CEC", "EEx", "GAD"],
    applicableExercises: ["2023", "2024", "2025", "2026"],
    actionScope: ["SEI!RIO", "BB Gestão Ágil", "SiGPC"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "deadlines-internal-remittance",
    title: "Prazos internos dependem de comunicação formal",
    summary:
      "A data de encerramento do exercício financeiro não define automaticamente prazo interno de remessa da UEx/CEC à GAD.",
    practicalGuidance: [
      "Tratar 31 de dezembro como marco de encerramento do exercício financeiro.",
      "Publicar prazo interno apenas quando houver comunicação formal da SME-Rio ou da 4ª CRE.",
      "Para 2026, informar que o FNDE esclareceu a possibilidade de reprogramação de saldos financeiros existentes.",
    ],
    prohibitedActions: [
      "Apresentar 31 de dezembro como prazo automático de envio dos autos à GAD.",
      "Gerar marcos internos fixos sem fonte formal do ciclo.",
    ],
    legalReferences: [
      { sourceId: "resolution15_2021", articles: ["24", "32"] },
      { sourceId: "comunicado01_2026", sections: ["saldos e estornos"] },
    ],
    appliesTo: ["UEx", "CEC", "EEx", "GAD"],
    applicableExercises: ["2026"],
    actionScope: ["prazos", "prestação de contas"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "price-research-three-best-quotes",
    title: "Pesquisa e consolidação de preços",
    summary:
      "A consolidação deve registrar os três melhores orçamentos obtidos e o critério de escolha da proposta.",
    practicalGuidance: [
      "Considerar o valor efetivo da aquisição ou contratação, incluindo frete, seguro e custos não gratuitos.",
      "Justificar nos autos a determinação de preço com menos de três orçamentos quando excepcionalmente cabível.",
      "Utilizar sorteio em ato público em caso de empate, quando aplicável.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["23", "27"] }],
    appliesTo: ["UEx", "CEC", "EM"],
    actionScope: ["pesquisa de preços", "contratação"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "personnel-spending-vs-service-contracting",
    title: "Gastos com pessoal e contratação de serviços",
    summary:
      "Gastos com pessoal e contratação de fornecedor ou prestador privado não são conceitos equivalentes.",
    practicalGuidance: [
      "Tratar como vedados os gastos com pessoal e os pagamentos proibidos pela norma federal.",
      "Admitir contratação de fornecedor ou prestador privado quando vinculada às finalidades do PDDE ou da ação integrada.",
      "Exigir observância dos procedimentos de escolha, documentação, execução e pagamento.",
    ],
    prohibitedActions: [
      "Incluir prestadores genericamente na vedação de gastos com pessoal.",
      "Autorizar contratação sem vínculo com a finalidade do programa ou ação integrada.",
    ],
    legalReferences: [
      { sourceId: "resolution15_2021", articles: ["4", "17"] },
    ],
    appliesTo: ["UEx", "CEC", "EM"],
    actionScope: ["vedações", "contratação", "pagamento"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "individual-service-tax-consultation",
    title: "Contratação de pessoa física exige consulta prévia",
    summary:
      "O guia não define isoladamente documento fiscal, tratamento previdenciário, retenções ou obrigações acessórias de pessoa física.",
    practicalGuidance: [
      "Consultar a GAD ou a área contábil competente antes da contratação.",
      "Observar a legislação tributária, previdenciária, trabalhista e municipal aplicável ao caso concreto.",
      "Exigir documento comprobatório válido segundo a legislação à qual a entidade estiver sujeita.",
    ],
    prohibitedActions: [
      "Classificar automaticamente pessoa física como caso de recibo comum ou RPA.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["17", "26"] }],
    appliesTo: ["UEx", "CEC"],
    actionScope: ["contratação", "tributação", "comprovação da despesa"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
] as const satisfies readonly NormativeRule[];
