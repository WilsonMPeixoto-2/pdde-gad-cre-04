import type { NormativeRule } from "./normativeSources";

export type LocalOperationalRule = NormativeRule & {
  publishInProduction: boolean;
  validationRequired: string;
};

const pendingLocalRule = (
  rule: Omit<LocalOperationalRule, "level" | "status" | "lastVerifiedAt" | "publishInProduction">,
): LocalOperationalRule => ({
  ...rule,
  level: "local",
  status: "pending-local-validation",
  lastVerifiedAt: "2026-07-03",
  publishInProduction: false,
});

export const localOperationalRules = [
  pendingLocalRule({
    id: "local-process-type",
    title: "Tipo processual utilizado para a prestação de contas do CEC",
    summary: "A denominação exata depende do cadastro vigente do SEI!RIO e de confirmação formal da SME-Rio ou da 4ª CRE.",
    practicalGuidance: [
      "Confirmar a denominação no ambiente atual do SEI!RIO antes de apresentá-la como obrigação.",
      "Registrar evidência do cadastro, data de verificação e unidade responsável pela validação.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "autuação", "tipo processual"],
    validationRequired: "Cadastro oficial do SEI!RIO, manual institucional ou orientação formal da SME-Rio/4ª CRE.",
  }),
  pendingLocalRule({
    id: "local-process-classification",
    title: "Classificação por assuntos vinculada ao tipo processual",
    summary: "O código e a descrição da classificação devem corresponder à configuração oficial vigente do SEI!RIO.",
    practicalGuidance: [
      "Não publicar código de classificação sem conferência no sistema ou tabela oficial.",
      "Revalidar a classificação quando houver alteração do tipo processual.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "classificação por assuntos"],
    validationRequired: "Tabela oficial, configuração documentada do SEI!RIO ou orientação formal da área competente.",
  }),
  pendingLocalRule({
    id: "local-gad-unit-code",
    title: "Código e denominação da GAD no SEI!RIO",
    summary: "O código da unidade administrativa deve ser confirmado na relação oficial vigente do sistema.",
    practicalGuidance: [
      "Conferir código e denominação antes de orientar interessados, tramitação ou bloco de assinatura.",
      "Evitar replicar códigos de outras CREs sem fonte oficial atualizada.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "unidade administrativa", "tramitação"],
    validationRequired: "Relação oficial de unidades do SEI!RIO ou confirmação formal da administração do sistema.",
  }),
  pendingLocalRule({
    id: "local-process-specification-pattern",
    title: "Padrão textual de especificação do processo",
    summary: "O formato de identificação adotado pela 4ª CRE depende de homologação local e não constitui padrão geral da SME-Rio.",
    practicalGuidance: [
      "Tratar o formato como referência operacional interna enquanto não houver ato formal.",
      "Registrar exercício, ação, unidade escolar e CNPJ apenas após validação do padrão local.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "especificação", "padronização local"],
    validationRequired: "Circular, despacho, manual ou homologação formal da 4ª CRE/GAD.",
  }),
  pendingLocalRule({
    id: "local-interested-gad",
    title: "Inclusão da GAD como interessada",
    summary: "A inclusão da GAD no campo Interessados depende do desenho formal do fluxo local.",
    practicalGuidance: [
      "Não apresentar a inclusão como obrigação geral do SEI!RIO sem fonte local.",
      "Confirmar os efeitos de publicidade e pesquisa pública do campo antes da orientação definitiva.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "interessados"],
    validationRequired: "Orientação formal da SME-Rio ou da 4ª CRE sobre o fluxo de interessados.",
  }),
  pendingLocalRule({
    id: "local-interested-school",
    title: "Inclusão da unidade escolar como interessada",
    summary: "A inclusão da unidade escolar no campo Interessados depende de validação do fluxo local e da configuração do sistema.",
    practicalGuidance: [
      "Usar a designação oficial da unidade somente após confirmação da rotina local.",
      "Evitar inserir dados pessoais desnecessários no campo.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "interessados", "unidade escolar"],
    validationRequired: "Orientação formal da SME-Rio ou da 4ª CRE sobre o fluxo de interessados.",
  }),
  pendingLocalRule({
    id: "local-observation-cnpj",
    title: "Registro do CNPJ no campo Observações desta unidade",
    summary: "O uso do campo Observações para identificar o CNPJ é uma rotina local que exige validação formal.",
    practicalGuidance: [
      "Não apresentar o preenchimento como requisito geral do SEI!RIO.",
      "Confirmar necessidade, formato e efeitos de publicidade antes da publicação definitiva.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "observações", "CNPJ"],
    validationRequired: "Orientação formal da GAD/4ª CRE ou manual institucional aplicável.",
  }),
  pendingLocalRule({
    id: "local-forwarding-letter",
    title: "Ofício de encaminhamento da unidade escolar",
    summary: "A obrigatoriedade e o conteúdo do ofício dependem de modelo ou orientação institucional formalmente aprovada.",
    practicalGuidance: [
      "Tratar o texto disponível no site como minuta de apoio.",
      "Não inserir o ofício no rol federal mínimo nem exigir sua utilização sem fonte local.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "ofício", "encaminhamento"],
    validationRequired: "Ato, circular ou modelo institucional aprovado pela SME-Rio/4ª CRE.",
  }),
  pendingLocalRule({
    id: "local-forwarding-dispatch",
    title: "Despacho de encaminhamento ou conferência",
    summary: "A obrigatoriedade, o signatário e o teor do despacho dependem do fluxo decisório formal vigente.",
    practicalGuidance: [
      "Tratar o texto disponível no site como minuta de apoio.",
      "Não antecipar conclusão de regularidade, autoridade decisória ou providência final sem fonte formal.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    actionScope: ["SEI!RIO", "despacho", "análise", "encaminhamento"],
    validationRequired: "Ato, circular, modelo institucional ou orientação formal sobre o fluxo decisório.",
  }),
  pendingLocalRule({
    id: "local-gad-codes",
    title: "Relação de códigos das GADs",
    summary: "Códigos de unidades administrativas podem ser alterados e dependem de relação oficial atualizada.",
    practicalGuidance: [
      "Não publicar lista de códigos sem data de verificação.",
      "Restringir o guia ao código efetivamente necessário e formalmente confirmado.",
    ],
    legalReferences: [],
    appliesTo: ["GAD"],
    actionScope: ["SEI!RIO", "unidades administrativas"],
    validationRequired: "Relação oficial atualizada de unidades do SEI!RIO.",
  }),
  pendingLocalRule({
    id: "local-process-tracker",
    title: "Uso do controle interno de processos",
    summary: "A planilha ou ferramenta de controle interno é rotina administrativa local e não obrigação normativa da unidade escolar.",
    practicalGuidance: [
      "Não apresentar o controle interno como etapa obrigatória para a UEx/CEC.",
      "Registrar responsável, finalidade, acesso e ciclo de atualização da ferramenta.",
    ],
    legalReferences: [],
    appliesTo: ["GAD"],
    applicableExercises: ["2026"],
    actionScope: ["controle interno", "acompanhamento"],
    validationRequired: "Rotina administrativa interna formalizada pela 4ª CRE/GAD.",
  }),
  pendingLocalRule({
    id: "local-internal-remittance-deadline",
    title: "Prazo interno de remessa das UEx/CEC à GAD",
    summary: "A data local do ciclo depende de comunicação formal da SME-Rio ou da 4ª CRE.",
    practicalGuidance: [
      "Não publicar data interna como obrigação até que a comunicação formal esteja identificada.",
      "Registrar fonte, exercício, data de verificação e unidade emissora antes de exibir o prazo.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "GAD"],
    applicableExercises: ["2026"],
    actionScope: ["prazos internos", "remessa"],
    validationRequired: "Comunicação formal da SME-Rio ou da 4ª CRE para o ciclo.",
  }),
  pendingLocalRule({
    id: "local-sisbens-flow",
    title: "Rotina municipal de incorporação no SISBENS",
    summary: "O fluxo local de registro patrimonial depende de fonte formal da área patrimonial competente.",
    practicalGuidance: [
      "Separar a obrigação federal de tombamento/incorporação da rotina municipal específica.",
      "Publicar passos do SISBENS somente após validação formal da SME-Rio ou da área patrimonial.",
    ],
    legalReferences: [],
    appliesTo: ["UEx", "CEC", "EEx", "GAD"],
    actionScope: ["patrimônio", "SISBENS"],
    validationRequired: "Ato, manual, circular ou orientação formal da área patrimonial competente.",
  }),
  pendingLocalRule({
    id: "local-final-authority",
    title: "Autoridade e fluxo de decisão após a análise da GAD",
    summary: "A autoridade competente, a manifestação conclusiva e as providências posteriores dependem do fluxo formal vigente.",
    practicalGuidance: [
      "Não presumir aprovação, regularidade ou encerramento por autoridade não identificada.",
      "Manter a redação do guia neutra até que o fluxo decisório esteja formalmente validado.",
    ],
    legalReferences: [],
    appliesTo: ["EEx", "GAD"],
    actionScope: ["análise", "decisão", "pós-remessa"],
    validationRequired: "Ato ou orientação formal da SME-Rio/4ª CRE que identifique autoridade e sequência decisória.",
  }),
] as const satisfies readonly LocalOperationalRule[];
