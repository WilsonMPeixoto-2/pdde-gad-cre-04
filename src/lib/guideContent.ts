import {
  ClipboardList,
  FileText,
  FolderOpen,
  PenTool,
  Phone,
  Scale,
  Send,
  Shield,
  type LucideIcon,
  Upload,
} from "lucide-react";
import { GUIDE_VERSION } from "@/lib/guideVersion";

export { GUIDE_VERSION };

export const PROCESS_TYPE_LABEL =
  "GESTÃO DOS CONSELHOS MUNICIPAIS DE EDUCAÇÃO: PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC";

export const PROCESS_CLASSIFICATION_LABEL =
  "03.04.01.02 - PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC";

export const GAD_UNIT = {
  code: "10729",
  shortLabel: "E/4a.CRE/GAD",
  displayLabel: "10729 - E/4a.CRE/GAD",
  fullLabel: "10729 - Gerência de Administração (E/4a.CRE/GAD)",
} as const;

export const INTERNAL_PROCESS_TRACKER_LABEL = "Controle de processos 2026";

export const GUIDE_ANCHORS = {
  checklist: "checklist-documentos",
  rules: "regras-operacionais",
  models: "modelos-documentos",
  templates: "templates-rapidos",
  journey: "mapa-jornada",
} as const;

export type GuideNestedAnchorId = (typeof GUIDE_ANCHORS)[keyof typeof GUIDE_ANCHORS];

export interface GuideSectionMeta {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle?: string;
  icon: LucideIcon;
}

export const guideSections = [
  {
    id: "introducao",
    number: "0",
    title: "Apresentação e Visão Geral",
    shortTitle: "Apresentação",
    icon: FileText,
  },
  {
    id: "secao-1",
    number: "1",
    title: "Abertura e Identificação do Processo",
    shortTitle: "Abertura do Processo",
    subtitle: "Preparação dos dados, autuação, preenchimento do cadastro e registro do NUP",
    icon: ClipboardList,
  },
  {
    id: "secao-2",
    number: "2",
    title: "Preparação e Instrução dos Autos",
    shortTitle: "Instrução dos Autos",
    subtitle: "Função dos documentos, regras aplicáveis, organização e conferência final",
    icon: FileText,
  },
  {
    id: "secao-3",
    number: "3",
    title: "Inclusão de Documentos Externos",
    shortTitle: "Documentos Externos",
    subtitle: "Classificação, inclusão, metadados e identificação dos arquivos no SEI!RIO",
    icon: Upload,
  },
  {
    id: "secao-4",
    number: "4",
    title: "Autenticação de Documentos Digitalizados",
    shortTitle: "Autenticação",
    subtitle: "Autenticação dos arquivos originados em papel e conferência do registro na árvore",
    icon: Shield,
  },
  {
    id: "secao-5",
    number: "5",
    title: "Assinaturas e Remessa do Processo",
    shortTitle: "Assinaturas e Remessa",
    subtitle: "Documentos internos, bloco de assinatura, conferência final e tramitação",
    icon: PenTool,
  },
  {
    id: "secao-6",
    number: "6",
    title: "Acompanhamento Posterior à Remessa",
    shortTitle: "Acompanhamento",
    subtitle: "Acompanhamento da análise, atendimento de diligências e providências formalmente comunicadas",
    icon: Send,
  },
  {
    id: "contatos",
    number: "7",
    title: "Atendimento e Suporte",
    shortTitle: "Atendimento",
    subtitle: "Canais da GAD e recursos oficiais de suporte do SEI!RIO",
    icon: Phone,
  },
  {
    id: "anexo",
    number: "8",
    title: "Fontes e Aplicabilidade",
    shortTitle: "Referências",
    subtitle: "Matriz temporal, fontes oficiais e situação das orientações locais",
    icon: Scale,
  },
] as const satisfies readonly GuideSectionMeta[];

export type GuideSectionId = (typeof guideSections)[number]["id"];
export type GuideAnchorId = GuideSectionId | GuideNestedAnchorId;

export const guideAnchorParentSections: Record<GuideNestedAnchorId, GuideSectionId> = {
  [GUIDE_ANCHORS.checklist]: "secao-2",
  [GUIDE_ANCHORS.rules]: "secao-2",
  [GUIDE_ANCHORS.models]: "secao-2",
  [GUIDE_ANCHORS.templates]: "secao-2",
  [GUIDE_ANCHORS.journey]: "introducao",
};

export const contentSections = guideSections.filter(
  (section): section is (typeof guideSections)[number] & { subtitle: string } =>
    "subtitle" in section,
);
export const guideSectionIds = guideSections.map((section) => section.id);
export const guideSectionsById = Object.fromEntries(
  guideSections.map((section) => [section.id, section]),
) as Record<GuideSectionId, GuideSectionMeta>;

export const guideHowToSteps = contentSections
  .filter((section) => /^[1-6]$/.test(section.number))
  .map((section, index) => ({
    position: index + 1,
    name: section.title,
    text: section.subtitle,
  }));

export const seiProcessTreeDocuments = [
  {
    name: "Peça interna de encaminhamento, quando aplicável",
    statusLabel: "Assinada",
    tone: "signed" as const,
  },
  {
    name: "Ata do CEC assinada em papel e escaneada",
    statusLabel: "Conferência informada",
    tone: "authenticated" as const,
  },
  {
    name: "Extrato bancário baixado do Banco do Brasil",
    statusLabel: "Nato-digital",
    tone: "authenticated" as const,
  },
  {
    name: "Demonstrativo ou registro federal emitido por sistema oficial",
    statusLabel: "Nato-digital",
    tone: "authenticated" as const,
  },
];

export const signatureActionExamples = [
  {
    label: "Peça interna de encaminhamento, quando aplicável",
    action: "Assinar",
    tone: "signature" as const,
  },
  {
    label: "Extrato bancário baixado do Banco do Brasil",
    action: "Juntar como original eletrônico",
    tone: "authentication" as const,
  },
  {
    label: "Ata do CEC assinada em papel e escaneada",
    action: "Informar o tipo de conferência",
    tone: "authentication" as const,
  },
];

export interface ProcessFlowStep {
  id: string;
  number: number;
  title: string;
  description: string;
  sectionId: GuideSectionId;
  sectionAnchor: GuideAnchorId;
  icon: LucideIcon;
  dependencies: string[];
  criticalNote?: string;
  whatToDo: string[];
  documents: string[];
  commonErrors: string[];
  nextStep: string;
}

export const processFlowSteps: ProcessFlowStep[] = [
  {
    id: "abertura",
    number: 1,
    title: "Abertura e identificação do processo",
    description:
      "Preparar os dados da unidade, iniciar o processo, preencher o cadastro e registrar o NUP.",
    sectionId: "secao-1",
    sectionAnchor: "secao-1",
    icon: FolderOpen,
    dependencies: [],
    criticalNote:
      "Tipo processual, classificação, interessados e padrões locais devem ser confirmados no ambiente vigente antes da utilização definitiva.",
    whatToDo: [
      "Confirmar exercício, CNPJ e designação da unidade escolar",
      "Acessar o SEI!RIO e iniciar o processo",
      "Preencher os campos conforme a documentação e a configuração vigente",
      "Salvar e registrar o NUP no controle interno aplicável",
    ],
    documents: [
      "Dados oficiais da unidade escolar",
      "CNPJ do CEC/UEx",
      "Exercício de referência do PDDE",
    ],
    commonErrors: [
      "Utilizar referência local sem confirmar sua vigência",
      "Inserir dados pessoais desnecessários no cadastro",
      "Deixar de registrar o NUP após a autuação",
    ],
    nextStep: "Compreender e organizar os documentos que formarão a instrução",
  },
  {
    id: "instrucao",
    number: 2,
    title: "Preparação e instrução dos autos",
    description:
      "Compreender a função das peças, aplicar as regras pertinentes, organizar os autos e realizar a conferência final.",
    sectionId: "secao-2",
    sectionAnchor: "secao-2",
    icon: FileText,
    dependencies: ["abertura"],
    criticalNote:
      "O checklist é instrumento de conferência final e não substitui a análise de aplicabilidade, conteúdo e coerência documental.",
    whatToDo: [
      "Identificar o que cada grupo documental demonstra",
      "Separar a base federal das peças complementares do processo local",
      "Aplicar as regras de pesquisa, contratação, pagamento, comprovação e patrimônio",
      "Utilizar o checklist somente após organizar e compreender o conjunto",
    ],
    documents: [
      "Planejamento, atas e pesquisa de preços",
      "Extratos, demonstrativos e conciliação quando aplicável",
      "Documentos fiscais, pagamentos e demais comprovantes",
    ],
    commonErrors: [
      "Começar pela marcação do checklist sem compreender as peças",
      "Misturar documentos de exercícios ou ações diferentes",
      "Tratar peça local como integrante automático do rol federal",
    ],
    nextStep: "Incluir cada documento externo com classificação e identificação adequadas",
  },
  {
    id: "inclusao",
    number: 3,
    title: "Inclusão de documentos externos",
    description:
      "Classificar a origem do arquivo, preencher os metadados e identificá-lo claramente na árvore do processo.",
    sectionId: "secao-3",
    sectionAnchor: "secao-3",
    icon: Upload,
    dependencies: ["instrucao"],
    whatToDo: [
      "Distinguir documento digitalizado de documento nato-digital",
      "Utilizar a opção Documento Externo",
      "Preencher metadados verificáveis e nome descritivo",
      "Anexar o arquivo e conferir sua posição na árvore",
    ],
    documents: [
      "PDFs digitalizados legíveis",
      "Arquivos nato-digitais gerados ou recebidos eletronicamente",
    ],
    commonErrors: [
      "Classificar incorretamente a origem do arquivo",
      "Utilizar nomes genéricos na árvore",
      "Anexar arquivo ilegível, incompleto ou sem identificação",
    ],
    nextStep: "Autenticar somente os documentos originados em papel",
  },
  {
    id: "autenticacao",
    number: 4,
    title: "Autenticação de documentos digitalizados",
    description:
      "Autenticar os arquivos originados em papel, indicar o tipo de conferência e verificar o registro na árvore.",
    sectionId: "secao-4",
    sectionAnchor: "secao-4",
    icon: Shield,
    dependencies: ["inclusao"],
    criticalNote:
      "Documento nato-digital é juntado como original eletrônico e não recebe conferência de documento em papel.",
    whatToDo: [
      "Localizar cada documento classificado como digitalizado",
      "Acionar a autenticação e selecionar o tipo de conferência adequado",
      "Finalizar a operação",
      "Conferir se o registro ficou visível na árvore",
    ],
    documents: ["Documentos externos classificados como digitalizados nesta unidade"],
    commonErrors: [
      "Autenticar documento nato-digital",
      "Selecionar tipo de conferência incompatível com o documento apresentado",
      "Prosseguir sem verificar o registro da autenticação",
    ],
    nextStep: "Concluir as assinaturas dos documentos internos e preparar a remessa",
  },
  {
    id: "assinatura",
    number: 5,
    title: "Assinaturas e remessa do processo",
    description:
      "Reunir documentos internos, concluir assinaturas, conferir a instrução e tramitar o processo conforme o fluxo vigente.",
    sectionId: "secao-5",
    sectionAnchor: "secao-5",
    icon: PenTool,
    dependencies: ["autenticacao"],
    criticalNote:
      "O bloco de assinatura recebe somente documentos internos do SEI!RIO; peças externas permanecem fora do bloco.",
    whatToDo: [
      "Identificar os documentos internos que exigem assinatura",
      "Criar ou selecionar o bloco e acompanhar sua conclusão",
      "Revisar eventual peça de encaminhamento quando formalmente exigida",
      "Conferir o processo e confirmar a unidade de destino antes da tramitação",
    ],
    documents: [
      "Documentos internos que exijam assinatura",
      "Peça interna de encaminhamento, quando aplicável",
    ],
    commonErrors: [
      "Adicionar documento externo ao bloco de assinatura",
      "Tramitar o processo com assinatura interna pendente",
      "Presumir peça ou unidade de destino sem validação do fluxo local",
    ],
    nextStep: "Acompanhar a análise e atender eventuais diligências",
  },
  {
    id: "finalizacao",
    number: 6,
    title: "Acompanhamento posterior à remessa",
    description:
      "Acompanhar a tramitação, atender diligências e observar as providências formalmente comunicadas.",
    sectionId: "secao-6",
    sectionAnchor: "secao-6",
    icon: Send,
    dependencies: ["assinatura"],
    criticalNote:
      "A remessa não representa aprovação automática nem encerramento do processo.",
    whatToDo: [
      "Acompanhar o processo no SEI!RIO",
      "Verificar devoluções ou solicitações de complementação",
      "Atender diligências no mesmo processo",
      "Observar a manifestação e a providência comunicadas pela unidade competente",
    ],
    documents: ["Processo remetido, com histórico íntegro das peças e assinaturas"],
    commonErrors: [
      "Deixar de acompanhar o processo após a remessa",
      "Responder diligência fora do processo original",
      "Presumir aprovação, autoridade decisória ou encerramento não formalizado",
    ],
    nextStep: "Manter o processo acompanhado até a providência formal correspondente",
  },
];
