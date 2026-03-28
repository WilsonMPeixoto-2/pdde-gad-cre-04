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

export const GUIDE_VERSION = {
  number: "2.1",
  shortLabel: "V. 2.1",
  cycleLabel: "Março/2026",
  lastUpdatedText: "28 de março de 2026",
  publishedIsoDate: "2026-03-28",
} as const;

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
  readingSupport: "retomada-conforto-pdde",
  capabilities: "capacidades-do-guia-pdde",
  recentUpdates: "novidades-recentes-guia-pdde",
  referenceGovernance: "rastreabilidade-fontes-oficiais-pdde",
  commandCenter: "central-operacional-pdde",
  workspace: "dados-processo-operacional",
  naming: "kit-nomenclatura-pdde",
  sharePack: "resumo-compartilhavel-pdde",
  caseNotes: "notas-operacionais-pdde",
  checklist: "checklist-documentos",
  readiness: "diagnostico-remessa-gad",
  models: "modelos-documentos",
  templates: "templates-rapidos",
  journey: "mapa-jornada",
} as const;

export const guideAnchorParentSections: Record<string, string> = {
  [GUIDE_ANCHORS.readingSupport]: "introducao",
  [GUIDE_ANCHORS.capabilities]: "introducao",
  [GUIDE_ANCHORS.recentUpdates]: "introducao",
  [GUIDE_ANCHORS.referenceGovernance]: "anexo",
  [GUIDE_ANCHORS.commandCenter]: "secao-2",
  [GUIDE_ANCHORS.workspace]: "secao-2",
  [GUIDE_ANCHORS.naming]: "secao-2",
  [GUIDE_ANCHORS.sharePack]: "secao-2",
  [GUIDE_ANCHORS.caseNotes]: "secao-2",
  [GUIDE_ANCHORS.checklist]: "secao-2",
  [GUIDE_ANCHORS.readiness]: "secao-2",
  [GUIDE_ANCHORS.models]: "secao-2",
  [GUIDE_ANCHORS.templates]: "secao-2",
  [GUIDE_ANCHORS.journey]: "secao-2",
};

export interface GuideSectionMeta {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle?: string;
  icon: LucideIcon;
}

export const guideSections: GuideSectionMeta[] = [
  {
    id: "introducao",
    number: "0",
    title: "Apresentação",
    shortTitle: "Apresentação",
    icon: FileText,
  },
  {
    id: "secao-1",
    number: "1",
    title: "Abertura do Processo",
    shortTitle: "Abertura do Processo",
    subtitle: "Acesso ao SEI!RIO, criação do processo, numeração e identificação",
    icon: ClipboardList,
  },
  {
    id: "secao-2",
    number: "2",
    title: "Instrução Processual",
    shortTitle: "Instrução Processual",
    subtitle: "Checklist mínimo, modelos e organização documental",
    icon: FileText,
  },
  {
    id: "secao-3",
    number: "3",
    title: "Inclusão de Documentos Externos",
    shortTitle: "Inclusão de Documentos",
    subtitle: "Como incluir documentos digitalizados e nato-digitais no SEI!RIO",
    icon: Upload,
  },
  {
    id: "secao-4",
    number: "4",
    title: "Autenticação de Documentos",
    shortTitle: "Autenticação de Documentos",
    subtitle: "Procedimento para autenticar documentos externos no SEI!RIO",
    icon: Shield,
  },
  {
    id: "secao-5",
    number: "5",
    title: "Bloco de Assinatura",
    shortTitle: "Bloco de Assinatura",
    subtitle: "Criação do bloco, assinatura da unidade escolar e conferência final",
    icon: PenTool,
  },
  {
    id: "secao-6",
    number: "6",
    title: "Despacho e Finalização",
    shortTitle: "Despacho e Finalização",
    subtitle: "Remessa à GAD e etapas finais de análise e aprovação",
    icon: Send,
  },
  {
    id: "contatos",
    number: "7",
    title: "Contatos",
    shortTitle: "Contatos",
    subtitle: "Canais de atendimento e suporte da GAD/4ª CRE",
    icon: Phone,
  },
  {
    id: "anexo",
    number: "A",
    title: "Anexo",
    shortTitle: "Anexo - Legislação",
    subtitle: "Escopo do guia, sistemas federais e marcos rápidos de conferência",
    icon: Scale,
  },
];

export const contentSections = guideSections.filter((section) => section.subtitle);
export const guideSectionIds = guideSections.map((section) => section.id);
export const guideSectionsById = Object.fromEntries(
  guideSections.map((section) => [section.id, section])
) as Record<string, GuideSectionMeta>;

export const guideHowToSteps = contentSections
  .filter((section) => /^[1-6]$/.test(section.number))
  .map((section, index) => ({
    position: index + 1,
    name: section.title,
    text: section.subtitle ?? "",
  }));

export const seiProcessTreeDocuments = [
  { name: "Ofício de encaminhamento da escola", statusLabel: "Assinado", tone: "signed" as const },
  { name: "Demonstrativo ou registro federal aplicável ao exercício", statusLabel: "Assinado", tone: "signed" as const },
  { name: "Ata do CEC digitalizada", statusLabel: "Autenticado", tone: "authenticated" as const },
  { name: "Extrato bancário do exercício", statusLabel: "Autenticado", tone: "authenticated" as const },
  { name: "Notas fiscais e comprovantes", statusLabel: "Autenticado", tone: "authenticated" as const },
];

export const signatureActionExamples = [
  { label: "Ofício de encaminhamento da escola", action: "Assinar", tone: "signature" as const },
  { label: "Despacho de análise ou aprovação da GAD", action: "Assinar", tone: "signature" as const },
  { label: "Ata do CEC digitalizada", action: "Autenticar", tone: "authentication" as const },
  { label: "Nota fiscal em PDF ou escaneada", action: "Autenticar", tone: "authentication" as const },
];

export interface ProcessFlowStep {
  id: string;
  number: number;
  title: string;
  description: string;
  sectionId: string;
  sectionAnchor: string;
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
    title: "Abertura do Processo",
    description: "Criar o processo no SEI!RIO com tipo, especificação e interessados corretos.",
    sectionId: "secao-1",
    sectionAnchor: "secao-1",
    icon: FolderOpen,
    dependencies: [],
    whatToDo: [
      "Acessar o SEI!RIO com login institucional",
      "Clicar em 'Iniciar Processo'",
      `Selecionar o tipo '${PROCESS_TYPE_LABEL}'`,
      "Preencher especificação, interessados e nível de acesso conforme o padrão da 4ª CRE",
    ],
    documents: [
      "Dados da unidade escolar",
      "CNPJ do CEC/UEx",
      "Exercício de referência do PDDE",
    ],
    commonErrors: [
      "Selecionar tipo de processo diferente do fluxo de prestação de contas do CEC",
      "Não incluir a GAD e a unidade escolar como interessadas",
      "Usar especificação sem exercício, escola ou CNPJ",
    ],
    nextStep: "Instrução processual com o checklist mínimo da prestação de contas",
  },
  {
    id: "instrucao",
    number: 2,
    title: "Instrução Processual",
    description: "Reunir o checklist mínimo, modelos e evidências que instruem os autos.",
    sectionId: "secao-2",
    sectionAnchor: "secao-2",
    icon: FileText,
    dependencies: ["abertura"],
    criticalNote: "Pesquisa de preços com 3 orçamentos como rotina; número inferior só com justificativa idônea ou uso documentado de SRP.",
    whatToDo: [
      "Conferir o checklist mínimo previsto para a prestação de contas",
      "Reunir extratos, atas, notas fiscais e comprovantes de pagamento",
      "Separar documentos obrigatórios e complementares por ordem lógica",
      "Consultar modelos e preencher as peças padronizadas quando necessário",
    ],
    documents: [
      "Demonstrativo ou registro federal aplicável ao exercício",
      "Extratos bancários do exercício",
      "Notas fiscais, comprovantes de pagamento e atas do CEC",
    ],
    commonErrors: [
      "Anexar extratos incompletos ou fora do exercício",
      "Não comprovar a pesquisa de preços com 3 orçamentos, justificativa idônea para número inferior ou SRP documentado",
      "Misturar documentos de ações ou exercícios diferentes no mesmo processo",
    ],
    nextStep: "Inclusão dos documentos externos no SEI!RIO",
  },
  {
    id: "inclusao",
    number: 3,
    title: "Inclusão de Documentos Externos",
    description: "Registrar documentos digitalizados e nato-digitais com classificação correta e identificação clara na árvore do processo.",
    sectionId: "secao-3",
    sectionAnchor: "secao-3",
    icon: Upload,
    dependencies: ["instrucao"],
    whatToDo: [
      "Usar 'Incluir Documento' > 'Documento Externo'",
      "Definir tipo, data, número e nome na árvore com descrição objetiva",
      "Carregar o PDF e classificar corretamente como digitalizado ou nato-digital",
      "Repetir o procedimento até compor toda a árvore documental",
    ],
    documents: [
      "PDFs digitalizados legíveis",
      "Arquivos nato-digitais gerados por sistemas oficiais",
    ],
    commonErrors: [
      "Usar nomes genéricos na árvore do processo",
      "Enviar arquivo ilegível, corrompido ou sem identificação",
      "Confundir documento externo com documento interno do SEI!RIO",
    ],
    nextStep: "Autenticação dos documentos digitalizados",
  },
  {
    id: "autenticacao",
    number: 4,
    title: "Autenticação de Documentos",
    description: "Autenticar apenas os documentos digitalizados e preservar a distinção entre autenticação e assinatura eletrônica.",
    sectionId: "secao-4",
    sectionAnchor: "secao-4",
    icon: Shield,
    dependencies: ["inclusao"],
    criticalNote: "Documento digitalizado exige autenticação; documento nato-digital é juntado como original e não segue essa etapa.",
    whatToDo: [
      "Selecionar cada documento digitalizado na árvore",
      "Usar o comando de autenticação com a expressão 'confere com o original'",
      "Assinar eletronicamente as autenticações geradas pelo sistema",
      "Manter os originais físicos arquivados na unidade escolar",
    ],
    documents: [
      "Documentos digitalizados inseridos no processo",
    ],
    commonErrors: [
      "Deixar documento digitalizado sem autenticação",
      "Autenticar documento nato-digital desnecessariamente",
      "Prosseguir sem conferir se a autenticação ficou registrada na árvore",
    ],
    nextStep: "Criação e disponibilização do bloco de assinatura",
  },
  {
    id: "assinatura",
    number: 5,
    title: "Bloco de Assinatura",
    description: "Criar o bloco, incluir apenas documentos internos e acompanhar a conclusão das assinaturas.",
    sectionId: "secao-5",
    sectionAnchor: "secao-5",
    icon: PenTool,
    dependencies: ["autenticacao"],
    criticalNote: "No bloco entram apenas documentos internos do SEI!RIO.",
    whatToDo: [
      "Criar um bloco de assinatura vinculado ao processo",
      "Adicionar somente peças internas que exigem assinatura eletrônica",
      "Disponibilizar o bloco para a unidade escolar responsável",
      "Conferir o retorno das assinaturas antes de seguir para a remessa",
    ],
    documents: [
      "Ofício de encaminhamento da escola",
      "Despachos ou declarações internas produzidas no SEI!RIO",
    ],
    commonErrors: [
      "Adicionar documento externo ao bloco de assinatura",
      "Disponibilizar o bloco para unidade incorreta",
      "Encaminhar o processo sem confirmar todas as assinaturas pendentes",
    ],
    nextStep: "Encaminhamento do processo para a GAD e acompanhamento da análise final",
  },
  {
    id: "finalizacao",
    number: 6,
    title: "Despacho e Finalização",
    description: "Encaminhar à GAD, acompanhar a análise e registrar as etapas finais de aprovação.",
    sectionId: "secao-6",
    sectionAnchor: "secao-6",
    icon: Send,
    dependencies: ["assinatura"],
    criticalNote: `O destinatário correto da remessa é ${GAD_UNIT.displayLabel}.`,
    whatToDo: [
      "Conferir a integridade da árvore do processo após o bloco de assinatura",
      `Tramitar o processo para ${GAD_UNIT.fullLabel}`,
      "Registrar observações relevantes, quando necessário, antes da remessa",
      "Acompanhar diligências, despacho da GAD e despacho final do Coordenador",
    ],
    documents: [
      "Processo íntegro, com assinaturas concluídas e autenticações válidas",
    ],
    commonErrors: [
      "Tramitar o processo para unidade errada",
      "Enviar o processo com assinatura pendente",
      "Deixar de acompanhar as exigências apontadas após a remessa",
    ],
    nextStep: "Aguardar análise da GAD/4ª CRE e eventual publicação do ato final",
  },
];
