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
  number: "2.5.1",
  shortLabel: "V. 2.5.1",
  cycleLabel: "Julho/2026",
  lastUpdatedText: "2 de julho de 2026",
  publishedIsoDate: "2026-07-02",
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
    subtitle: "Checklist mínimo, regras operacionais, modelos e continuidade do fluxo",
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
    subtitle: "Criação do bloco, despacho de encaminhamento, conferência final e remessa",
    icon: PenTool,
  },
  {
    id: "secao-6",
    number: "6",
    title: "Despacho e Finalização",
    shortTitle: "Despacho e Finalização",
    subtitle: "Análise pela GAD, aprovação e etapas finais do processo",
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
    number: "8",
    title: "Referências Normativas",
    shortTitle: "Referências",
    subtitle: "Fontes oficiais prioritárias para consulta rápida",
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
  [GUIDE_ANCHORS.journey]: "secao-2",
};

export const contentSections = guideSections.filter((section): section is (typeof guideSections)[number] & { subtitle: string } => "subtitle" in section);
export const guideSectionIds = guideSections.map((section) => section.id);
export const guideSectionsById = Object.fromEntries(
  guideSections.map((section) => [section.id, section])
) as Record<GuideSectionId, GuideSectionMeta>;

export const guideHowToSteps = contentSections
  .filter((section) => /^[1-6]$/.test(section.number))
  .map((section, index) => ({
    position: index + 1,
    name: section.title,
    text: section.subtitle,
  }));

export const seiProcessTreeDocuments = [
  { name: "Ofício de encaminhamento da unidade escolar", statusLabel: "Assinado", tone: "signed" as const },
  { name: "Despacho de encaminhamento da prestação de contas", statusLabel: "Assinado", tone: "signed" as const },
  { name: "Ata do CEC digitalizada", statusLabel: "Autenticado", tone: "authenticated" as const },
  { name: "Extrato bancário do exercício", statusLabel: "Autenticado", tone: "authenticated" as const },
  { name: "Demonstrativo ou registro federal aplicável ao exercício", statusLabel: "Autenticado", tone: "authenticated" as const },
];

export const signatureActionExamples = [
  { label: "Ofício de encaminhamento da unidade escolar", action: "Assinar", tone: "signature" as const },
  { label: "Despacho de encaminhamento da prestação de contas", action: "Assinar", tone: "signature" as const },
  { label: "Ata do CEC digitalizada", action: "Autenticar", tone: "authentication" as const },
  { label: "Nota fiscal em PDF ou escaneada", action: "Autenticar", tone: "authentication" as const },
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
      "Usar especificação sem exercício, unidade escolar ou CNPJ",
    ],
    nextStep: "Instrução processual com o checklist mínimo da prestação de contas",
  },
  {
    id: "instrucao",
    number: 2,
    title: "Instrução Processual",
    description: "Conferir o checklist mínimo, organizar as peças e separar o que seguirá para inclusão no SEI!RIO.",
    sectionId: "secao-2",
    sectionAnchor: "secao-2",
    icon: FileText,
    dependencies: ["abertura"],
    criticalNote: "Pesquisa de preços com 3 orçamentos como rotina; número inferior só com justificativa idônea ou uso documentado de SRP.",
    whatToDo: [
      "Conferir o checklist mínimo previsto para a prestação de contas",
      "Separar documentos externos, peças internas e comprovantes complementares por ordem lógica",
      "Registrar apenas as regras operacionais que impactam a instrução do processo",
      "Consultar modelos e minutas apenas quando isso ajudar a completar a instrução",
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
    description: "Criar o bloco, concluir as assinaturas internas, gerar o despacho de encaminhamento e remeter o processo à GAD.",
    sectionId: "secao-5",
    sectionAnchor: "secao-5",
    icon: PenTool,
    dependencies: ["autenticacao"],
    criticalNote: "No bloco entram apenas documentos internos do SEI!RIO.",
    whatToDo: [
      "Criar ou alimentar o bloco de assinatura com as peças internas obrigatórias",
      "Acompanhar a conclusão das assinaturas antes de prosseguir",
      "Incluir e assinar o despacho de encaminhamento da prestação de contas",
      `Conferir a árvore final e tramitar o processo para ${GAD_UNIT.fullLabel}`,
    ],
    documents: [
      "Ofício de encaminhamento da unidade escolar",
      "Despacho de encaminhamento da prestação de contas",
    ],
    commonErrors: [
      "Adicionar documento externo ao bloco de assinatura",
      "Encaminhar o processo sem confirmar todas as assinaturas pendentes",
      "Enviar o processo sem o despacho de encaminhamento assinado",
    ],
    nextStep: "Acompanhamento da análise da GAD, de eventuais diligências e da finalização do processo",
  },
  {
    id: "finalizacao",
    number: 6,
    title: "Despacho e Finalização",
    description: "Acompanhar a análise da GAD, atender diligências e aguardar as etapas finais de aprovação.",
    sectionId: "secao-6",
    sectionAnchor: "secao-6",
    icon: Send,
    dependencies: ["assinatura"],
    criticalNote: "Após a remessa, acompanhe o processo no SEI!RIO e trate rapidamente qualquer devolução ou diligência.",
    whatToDo: [
      "Acompanhar a análise da GAD no SEI!RIO",
      "Atender diligências ou devoluções com rapidez, quando houver",
      "Aguardar o despacho de aprovação e a formalização final da autoridade competente",
      "Observar o fluxo patrimonial quando houver despesa de capital",
    ],
    documents: [
      "Processo já remetido à GAD, com histórico íntegro das peças juntadas",
    ],
    commonErrors: [
      "Deixar de acompanhar o processo após a remessa",
      "Não atender diligência no prazo indicado",
      "Ignorar providências patrimoniais quando houver aquisição de bens permanentes",
    ],
    nextStep: "Registrar o encerramento do fluxo e manter a documentação de apoio organizada para conferências futuras",
  },
];
