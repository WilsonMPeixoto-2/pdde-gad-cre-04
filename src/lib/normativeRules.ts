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
    id: "price-research-srp-use",
    title: "Utilização de Ata de Registro de Preços",
    summary:
      "A utilização documentada de ata de registro de preços pode substituir os procedimentos ordinários de pesquisa quando a hipótese for cabível.",
    practicalGuidance: [
      "Confirmar a validade da ata, a possibilidade de utilização e a disponibilidade para entrega do bem ou execução do serviço.",
      "Verificar a compatibilidade dos preços registrados com os valores praticados no mercado.",
      "Juntar aos autos a ata, o instrumento firmado com o fornecedor e os documentos que demonstrem a utilização regular do procedimento.",
    ],
    prohibitedActions: [
      "Apresentar o registro de preços apenas como dispensa informal de cotação.",
      "Utilizar ata sem demonstrar vigência, possibilidade de adesão ou compatibilidade do preço.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["23"] }],
    appliesTo: ["UEx", "CEC", "EM"],
    actionScope: ["registro de preços", "pesquisa de preços", "contratação"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-03",
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
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["4", "17"] }],
    appliesTo: ["UEx", "CEC", "EM"],
    actionScope: ["vedações", "contratação", "pagamento"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "allowed-expense-categories",
    title: "Categorias de aplicação dos recursos",
    summary:
      "Os recursos do PDDE e das Ações Integradas possuem categorias positivas de aplicação condicionadas à finalidade, ação e categoria econômica.",
    practicalGuidance: [
      "Verificar a finalidade do programa ou ação integrada antes da execução.",
      "Não confundir possibilidade normativa com aprovação automática da despesa.",
      "Conferir custeio, capital e eventual normativo específico da ação.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["4"] }],
    appliesTo: ["UEx", "CEC", "EM", "EEx"],
    actionScope: ["execução", "despesa", "custeio", "capital"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "general-federal-prohibitions",
    title: "Vedações federais gerais",
    summary:
      "O rol federal geral de vedações não deve ser ampliado por inferência para itens que dependem de ação, exercício ou orientação específica.",
    practicalGuidance: [
      "Apresentar como vedações gerais apenas as hipóteses expressas na norma federal.",
      "Tratar internet, alimentação, intervenção predial e objeto não usual como dúvidas de enquadramento quando não houver fonte específica.",
      "Publicar vedação local adicional somente com fonte formal, aplicação e vigência.",
    ],
    prohibitedActions: [
      "Publicar internet como vedação federal genérica sem fonte específica.",
      "Publicar gêneros alimentícios como vedação federal genérica sem recorte normativo específico.",
      "Apresentar toda intervenção predial como obra ou reforma estrutural vedada sem fonte específica.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["4"] }],
    appliesTo: ["UEx", "CEC", "EM"],
    actionScope: ["vedações", "despesa", "enquadramento"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "payment-movement-identifiable-beneficiary",
    title: "Movimentação e pagamento com favorecido identificado",
    summary:
      "A movimentação dos recursos deve permitir a identificação do favorecido e permanecer vinculada à conta específica do programa.",
    practicalGuidance: [
      "Manter os recursos na conta específica do programa.",
      "Utilizar meio eletrônico que identifique o favorecido sempre que aplicável.",
      "Tratar cheque nominativo e pagamento em espécie como hipóteses excepcionais condicionadas à norma.",
    ],
    prohibitedActions: [
      "Efetuar pagamentos por conta particular.",
      "Usar forma de pagamento que impeça a identificação do favorecido.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["17"] }],
    appliesTo: ["UEx", "CEC", "EM"],
    actionScope: ["pagamento", "movimentação financeira"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "exercise-financial-availability",
    title: "Disponibilidade financeira e vinculação ao exercício",
    summary:
      "A análise temporal da despesa deve considerar o conjunto de recursos disponíveis e sua vinculação, e não apenas a data de um crédito recebido no exercício.",
    practicalGuidance: [
      "Considerar repasses do exercício, saldos reprogramados e rendimentos de aplicação financeira.",
      "Verificar a conta específica, o programa ou ação, a categoria econômica e a rastreabilidade do pagamento.",
      "Confirmar a compatibilidade da despesa com a finalidade do recurso e com a disponibilidade financeira existente.",
    ],
    prohibitedActions: [
      "Invalidar automaticamente a despesa apenas porque sua data é anterior a um crédito específico, sem analisar saldos e rendimentos disponíveis.",
    ],
    legalReferences: [
      { sourceId: "resolution15_2021", articles: ["24"] },
      { sourceId: "comunicado01_2026", sections: ["reprogramação de saldos"] },
    ],
    appliesTo: ["UEx", "CEC", "EEx", "GAD"],
    applicableExercises: ["2026"],
    actionScope: ["disponibilidade financeira", "exercício", "saldos", "pagamento"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-03",
  },
  {
    id: "expense-voucher-minimum-elements",
    title: "Elementos mínimos dos comprovantes",
    summary:
      "As despesas devem ser comprovadas por documentos fiscais originais ou equivalentes admitidos pela legislação aplicável.",
    practicalGuidance: [
      "Emitir o comprovante em nome da UEx/CEC, EEx ou EM responsável.",
      "Registrar FNDE, PDDE e ação integrada quando aplicável.",
      "Vincular documento fiscal, atesto, quitação, pagamento e objeto executado.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["26"] }],
    appliesTo: ["UEx", "CEC", "EM", "EEx"],
    actionScope: ["comprovantes", "documento fiscal", "pagamento"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "accountability-document-set",
    title: "Núcleo documental da prestação de contas",
    summary:
      "O rol federal da prestação de contas deve ser distinguido das peças locais de instrução e da documentação patrimonial aplicável.",
    practicalGuidance: [
      "Organizar separadamente o rol de materiais, a pesquisa de preços, o demonstrativo aplicável, os extratos, a conciliação quando houver saldo, os comprovantes e as atas de aprovação do plano e de sua execução.",
      "Tratar a documentação patrimonial de bens permanentes com fundamento próprio no art. 47.",
      "Identificar peças locais do SEI!RIO sem apresentá-las como integrantes automáticos do rol federal.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["33"] }],
    appliesTo: ["UEx", "CEC", "EEx", "GAD"],
    actionScope: ["prestação de contas", "documentos", "checklist"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "permanent-goods-incorporation",
    title: "Aquisição e incorporação de bens permanentes",
    summary:
      "Bens permanentes adquiridos ou produzidos com recursos do PDDE devem ser incorporados ao patrimônio da EEx e destinados à unidade escolar beneficiária.",
    practicalGuidance: [
      "Preencher e encaminhar o Termo de Doação no momento do recebimento do bem.",
      "Aguardar o tombamento pela EEx e o respectivo número de registro patrimonial.",
      "Tratar detalhes de SISBENS como fluxo local pendente de validação formal quando não houver fonte municipal registrada.",
    ],
    legalReferences: [{ sourceId: "resolution15_2021", articles: ["47"] }],
    appliesTo: ["UEx", "CEC", "EEx"],
    actionScope: ["patrimônio", "bens permanentes", "capital"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "external-document-format-classification",
    title: "Classificação de documento externo no SEI!RIO",
    summary:
      "Documento nato-digital e documento digitalizado nesta unidade devem ser classificados conforme a origem real do arquivo.",
    practicalGuidance: [
      "Classificar como nato-digital arquivo criado ou recebido por meio eletrônico.",
      "Classificar como digitalizado nesta unidade arquivo produzido a partir de documento em papel.",
      "Informar o tipo de conferência somente quando o documento for digitalizado.",
    ],
    legalReferences: [
      {
        sourceId: "seiRioIncluirDocumentos",
        sections: ["Documento Externo", "Formato", "Tipo de conferência"],
      },
    ],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "documento externo", "autenticação"],
    level: "municipal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
  {
    id: "individual-service-tax-consultation",
    title: "Contratação de pessoa física — consulta prévia obrigatória",
    summary:
      "Este guia não define, isoladamente, o documento fiscal, o tratamento previdenciário, as retenções ou as obrigações acessórias aplicáveis à contratação de pessoa física.",
    practicalGuidance: [
      "Consultar a GAD ou a área contábil competente antes da contratação.",
      "Observar a legislação tributária, previdenciária, trabalhista e municipal aplicável ao caso concreto.",
      "Exigir documento comprobatório válido segundo a legislação à qual a entidade estiver sujeita.",
    ],
    prohibitedActions: ["Classificar automaticamente pessoa física como caso de recibo comum ou RPA."],
    legalReferences: [
      { sourceId: "resolution15_2021", articles: ["6º, IV, ‘k’", "17", "26"] },
    ],
    appliesTo: ["UEx", "CEC"],
    actionScope: ["contratação", "tributação", "comprovação da despesa"],
    level: "federal",
    status: "verified",
    lastVerifiedAt: "2026-07-02",
  },
] as const satisfies readonly NormativeRule[];
