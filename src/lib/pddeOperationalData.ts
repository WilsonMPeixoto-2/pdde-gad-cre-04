import {
  GAD_UNIT,
  GUIDE_ANCHORS,
  processFlowSteps,
  type ProcessFlowStep,
} from "@/lib/guideContent";

export interface ChecklistItemDefinition {
  id: number;
  text: string;
  complementar?: boolean;
}

export interface ChecklistItemState extends ChecklistItemDefinition {
  checked: boolean;
}

export interface ProcessWorkspaceProfile {
  schoolName: string;
  uexCnpj: string;
  exercise: string;
  seiProcessNumber: string;
  responsibleName: string;
  updatedAt: string | null;
}

export type WorkspaceFieldKey = keyof Omit<ProcessWorkspaceProfile, "updatedAt">;
export type WorkspaceFieldStatus = "empty" | "valid" | "warning";

export interface WorkspaceFieldValidation {
  status: WorkspaceFieldStatus;
  badge: string;
  hint: string;
}

export interface OperationalCaseNotes {
  pendingIssue: string;
  lastAction: string;
  nextCheckpoint: string;
  handoffOwner: string;
  observations: string;
  updatedAt: string | null;
}

export interface OperationalSnapshot {
  checklist: ChecklistItemState[];
  journey: string[];
  workspace: ProcessWorkspaceProfile;
  notes: OperationalCaseNotes;
}

export interface OperationalBackupFile {
  schemaVersion: 1;
  exportedAt: string;
  snapshot: OperationalSnapshot;
}

export type OperationalStatus = "submitted" | "ready" | "flow" | "blocked";
export type OperationalTone = "danger" | "warning" | "success" | "info";

export interface OperationalNextAction {
  anchor: string;
  title: string;
  description: string;
  ctaLabel: string;
}

export interface OperationalReadinessReport {
  status: OperationalStatus;
  essentialItems: ChecklistItemState[];
  complementaryItems: ChecklistItemState[];
  essentialPending: ChecklistItemState[];
  complementaryPending: ChecklistItemState[];
  pendingJourney: ProcessFlowStep[];
  essentialProgress: number;
  journeyProgress: number;
  workspaceCompletedFields: number;
  workspaceTotalFields: number;
  missingWorkspaceFields: typeof processWorkspaceFieldDefinitions;
  remittanceDone: boolean;
  nextAction: OperationalNextAction;
}

export interface ProcessWorkspaceFieldDefinition {
  key: WorkspaceFieldKey;
  label: string;
  placeholder: string;
  helperText: string;
  autoComplete?: string;
}

export interface DocumentNamingSuggestion {
  id: string;
  title: string;
  category: string;
  fileName: string;
  treeName: string;
  note: string;
}

export interface OperationalTextBundle {
  diagnostic: string;
  shareSummary: string;
  executiveBrief: string;
  fileName: string;
}

export const PDDE_STORAGE_KEYS = {
  checklist: "pdde-checklist-state-v5",
  journey: "pdde-journey-progress-v1",
  workspace: "pdde-process-workspace-v1",
  notes: "pdde-case-notes-v1",
  templates: "pdde-smart-templates-v1",
} as const;

export const PDDE_STORAGE_EVENT = "pdde-storage-sync";

export const checklistItemDefinitions: ChecklistItemDefinition[] = [
  { id: 1, text: "Rol de materiais, bens e serviços priorizados (planejamento do gasto aprovado pelo Conselho/CEC)" },
  { id: 2, text: "Consolidação das pesquisas de preços — 3 orçamentos quando viável, ou justificativa idônea para quantidade inferior / uso documentado de SRP" },
  { id: 3, text: "Demonstrativo/registro federal da execução da receita, da despesa e dos pagamentos, conforme a ferramenta exigida pelo FNDE no exercício" },
  { id: 4, text: "Extratos bancários da conta do PDDE e das aplicações financeiras (período integral do exercício)" },
  { id: 5, text: "Conciliação bancária (obrigatória quando houver divergência entre extrato e demonstrativo, ou saldo em 31/12)" },
  { id: 6, text: "Documentos comprobatórios das despesas (NF/DANFE/cupom fiscal/recibos/RPA), com atesto do recebimento/execução e comprovantes de pagamento" },
  { id: 7, text: "Atas de aprovação do plano de gastos e da prestação de contas pelo Conselho Escolar/CEC" },
  { id: 8, text: "Evidência complementar de entrega/execução (declaração, fotos, laudo ou termo específico), quando o objeto exigir comprovação material adicional", complementar: true },
  { id: 9, text: "Relação de bens adquiridos ou produzidos, quando houver despesa de capital ou bem patrimonializável", complementar: true },
  { id: 10, text: "Controle patrimonial — providência de incorporação/registro do bem conforme a rotina da EEx ou do patrimônio escolar", complementar: true },
  { id: 11, text: "Comprovante de devolução/recolhimento de saldo ao FNDE (quando houver restituição)", complementar: true },
  { id: 12, text: "Comprovante do registro federal aplicável ao exercício (por exemplo, BB Gestão Ágil e rotinas correlatas), se exigido pela EEx ou pelo controle interno", complementar: true },
  { id: 13, text: "Termo de doação ou instrumento patrimonial equivalente, quando exigido pela EEx ou pelo controle patrimonial local", complementar: true },
  { id: 14, text: "Declaração de autenticidade ou peça interna equivalente, se ainda exigida no fluxo vigente da CRE/SME para documentos digitalizados", complementar: true },
];

export const processWorkspaceFieldDefinitions: readonly ProcessWorkspaceFieldDefinition[] = [
  {
    key: "schoolName",
    label: "Unidade escolar",
    placeholder: "Ex.: E.M. João Barbalho",
    helperText: "Use a designação oficial da unidade para manter coerência entre autos, modelos e análise.",
    autoComplete: "organization",
  },
  {
    key: "uexCnpj",
    label: "CNPJ do CEC/UEx",
    placeholder: "00.000.000/0001-00",
    helperText: "Informe o CNPJ completo da UEx/CEC no formato documental.",
    autoComplete: "off",
  },
  {
    key: "exercise",
    label: "Exercício",
    placeholder: "2026",
    helperText: "Use o exercício exato da prestação de contas para evitar mistura entre anos.",
    autoComplete: "off",
  },
  {
    key: "seiProcessNumber",
    label: "Processo SEI!RIO",
    placeholder: "E/4a.CRE/000000/2026",
    helperText: "Mantenha o número do processo no padrão adotado pela rede e pela árvore do SEI!RIO.",
    autoComplete: "off",
  },
  {
    key: "responsibleName",
    label: "Responsável pela conferência",
    placeholder: "Nome de quem está montando ou conferindo a pasta",
    helperText: "Identifique quem está conduzindo a conferência para facilitar retomada e comunicação.",
    autoComplete: "name",
  },
];

export const operationalStatusCopy: Record<
  OperationalStatus,
  {
    title: string;
    description: string;
    badge: string;
    tone: OperationalTone;
  }
> = {
  blocked: {
    title: "Pendências críticas antes da remessa",
    description:
      "Ainda existem itens essenciais do núcleo mínimo federal em aberto. Resolva essas pendências antes de tramitar para a GAD.",
    badge: "Núcleo mínimo incompleto",
    tone: "danger",
  },
  flow: {
    title: "Base documental pronta, fluxo ainda em andamento",
    description:
      "O núcleo documental mínimo já está reunido, mas a jornada processual ainda indica etapa operacional não concluída antes da remessa.",
    badge: "Fluxo pendente",
    tone: "warning",
  },
  ready: {
    title: "Pronto para remeter à GAD",
    description:
      "Checklist essencial concluído e fluxo operacional pré-remessa marcado. O processo pode seguir para a unidade destinatária da GAD.",
    badge: "Apto para remessa",
    tone: "success",
  },
  submitted: {
    title: "Remessa à GAD já registrada",
    description:
      "A jornada indica que a etapa de despacho e finalização já foi marcada. Acompanhe diligências, análise e despacho final da GAD.",
    badge: "Remessa marcada",
    tone: "info",
  },
};

export const createChecklistItems = (): ChecklistItemState[] =>
  checklistItemDefinitions.map((item) => ({
    ...item,
    checked: false,
  }));

export const emptyProcessWorkspaceProfile = (): ProcessWorkspaceProfile => ({
  schoolName: "",
  uexCnpj: "",
  exercise: "",
  seiProcessNumber: "",
  responsibleName: "",
  updatedAt: null,
});

export const emptyOperationalSnapshot = (): OperationalSnapshot => ({
  checklist: createChecklistItems(),
  journey: [],
  workspace: emptyProcessWorkspaceProfile(),
  notes: {
    pendingIssue: "",
    lastAction: "",
    nextCheckpoint: "",
    handoffOwner: "",
    observations: "",
    updatedAt: null,
  },
});

export const emptyOperationalCaseNotes = (): OperationalCaseNotes => ({
  pendingIssue: "",
  lastAction: "",
  nextCheckpoint: "",
  handoffOwner: "",
  observations: "",
  updatedAt: null,
});

const collapseInternalWhitespace = (value: string) => value.replace(/\s+/g, " ").trimStart();

const digitsOnly = (value: string) => value.replace(/\D/g, "");

const formatCnpjDigits = (value: string) => {
  const digits = digitsOnly(value).slice(0, 14);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 8),
    digits.slice(8, 12),
    digits.slice(12, 14),
  ];

  let formatted = parts[0] ?? "";
  if (parts[1]) formatted += `.${parts[1]}`;
  if (parts[2]) formatted += `.${parts[2]}`;
  if (parts[3]) formatted += `/${parts[3]}`;
  if (parts[4]) formatted += `-${parts[4]}`;
  return formatted;
};

const slugifyOperationalFileSegment = (value: string) =>
  value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
    .toUpperCase();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const joinHumanList = (items: string[]) => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
};

const validateCnpj = (value: string) => {
  const digits = digitsOnly(value);

  if (digits.length !== 14 || /^(\d)\1+$/.test(digits)) {
    return false;
  }

  const calcDigit = (base: string, factors: number[]) => {
    const sum = factors.reduce((accumulator, factor, index) => accumulator + Number(base[index]) * factor, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcDigit(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const digit2 = calcDigit(digits.slice(0, 12) + digit1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return digits.endsWith(`${digit1}${digit2}`);
};

export const normalizeWorkspaceFieldValue = (key: WorkspaceFieldKey, value: string) => {
  switch (key) {
    case "schoolName":
    case "responsibleName":
      return collapseInternalWhitespace(value);
    case "uexCnpj":
      return formatCnpjDigits(value);
    case "exercise":
      return digitsOnly(value).slice(0, 4);
    case "seiProcessNumber":
      return value
        .toUpperCase()
        .replace(/\\/g, "/")
        .replace(/\s*\/\s*/g, "/")
        .replace(/\s{2,}/g, " ")
        .trimStart();
    default:
      return value;
  }
};

export const getWorkspaceFieldValidation = (
  key: WorkspaceFieldKey,
  rawValue: string,
): WorkspaceFieldValidation => {
  const value = rawValue.trim();

  if (!value) {
    return {
      status: "empty",
      badge: "Preencher",
      hint: "Este campo melhora os modelos, o diagnóstico e a retomada do processo.",
    };
  }

  switch (key) {
    case "schoolName":
      return value.length >= 6
        ? {
            status: "valid",
            badge: "OK",
            hint: "A identificação da unidade já está adequada para os resumos e modelos rápidos.",
          }
        : {
            status: "warning",
            badge: "Revisar",
            hint: "Use a designação completa da unidade para evitar abreviações ambíguas.",
          };
    case "uexCnpj":
      return validateCnpj(value)
        ? {
            status: "valid",
            badge: "Válido",
            hint: "CNPJ formatado e consistente para uso em ofícios, relatórios e conferência.",
          }
        : {
            status: "warning",
            badge: "Conferir",
            hint: "Confira os 14 dígitos do CNPJ da UEx/CEC antes de seguir.",
          };
    case "exercise":
      return /^\d{4}$/.test(value)
        ? {
            status: "valid",
            badge: "Ano OK",
            hint: "Exercício identificado com quatro dígitos.",
          }
        : {
            status: "warning",
            badge: "Revisar",
            hint: "Use o exercício com quatro dígitos, como 2026.",
          };
    case "seiProcessNumber":
      return /.+\/.+\/\d{1,6}\/\d{4}$/.test(value)
        ? {
            status: "valid",
            badge: "Padrão OK",
            hint: "A numeração já está apta para reaproveitamento nos textos e diagnósticos.",
          }
        : {
            status: "warning",
            badge: "Formato",
            hint: "Revise o padrão do processo, por exemplo: E/4A.CRE/000000/2026.",
          };
    case "responsibleName":
      return value.split(" ").filter(Boolean).length >= 2
        ? {
            status: "valid",
            badge: "Identificado",
            hint: "O responsável já pode aparecer nos modelos e no diagnóstico.",
          }
        : {
            status: "warning",
            badge: "Completar",
            hint: "Prefira nome e sobrenome para facilitar conferência e contato.",
          };
    default:
      return {
        status: "valid",
        badge: "OK",
        hint: "Campo preenchido.",
      };
  }
};

export const buildWorkspaceIdentitySummary = (workspace: ProcessWorkspaceProfile) =>
  [
    "Identificação resumida do processo PDDE",
    `Unidade escolar: ${workspace.schoolName.trim() || "Não informado"}`,
    `CNPJ do CEC/UEx: ${workspace.uexCnpj.trim() || "Não informado"}`,
    `Exercício: ${workspace.exercise.trim() || "Não informado"}`,
    `Processo SEI!RIO: ${workspace.seiProcessNumber.trim() || "Não informado"}`,
    `Responsável pela conferência: ${workspace.responsibleName.trim() || "Não informado"}`,
  ].join("\n");

export const buildSubmissionSubjectLine = (workspace: ProcessWorkspaceProfile) => {
  const school = workspace.schoolName.trim() || "[UNIDADE ESCOLAR]";
  const exercise = workspace.exercise.trim() || "[EXERCÍCIO]";
  return `Prestação de Contas PDDE - ${school} - Exercício ${exercise}`;
};

export const getOperationalDiagnosticFileName = (workspace: ProcessWorkspaceProfile) => {
  const exercise = workspace.exercise.trim() || "sem-exercicio";
  const school = slugifyOperationalFileSegment(workspace.schoolName) || "UNIDADE";
  return `PDDE_DIAGNOSTICO_GAD_${exercise}_${school}.txt`;
};

export const getOperationalPremiumReportFileName = (workspace: ProcessWorkspaceProfile) => {
  const exercise = workspace.exercise.trim() || "sem-exercicio";
  const school = slugifyOperationalFileSegment(workspace.schoolName) || "UNIDADE";
  return `PDDE_RELATORIO_OPERACIONAL_${exercise}_${school}.html`;
};

const documentNamingBlueprints = [
  {
    id: "oficio",
    order: "01",
    title: "Ofício de encaminhamento",
    category: "Documento interno",
    treeLabel: "Ofício de encaminhamento da escola",
    fileLabel: "OFICIO_ENCAMINHAMENTO_PDDE",
    note: "Use para a peça principal de remessa assinada pela unidade escolar.",
  },
  {
    id: "pesquisa-precos",
    order: "02",
    title: "Pesquisa de preços",
    category: "Comprovação de mercado",
    treeLabel: "Pesquisa de preços / consolidação de orçamentos",
    fileLabel: "PESQUISA_PRECOS_PDDE",
    note: "Se houver SRP, substitua pela ata ou acordo correspondente.",
  },
  {
    id: "registro-federal",
    order: "03",
    title: "Registro ou demonstrativo federal",
    category: "Registro do exercício",
    treeLabel: "Demonstrativo ou registro federal aplicável ao exercício",
    fileLabel: "REGISTRO_FEDERAL_PDDE",
    note: "Ajuste o título conforme BB Gestão Ágil, SiGPC ou sistema do exercício.",
  },
  {
    id: "extratos",
    order: "04",
    title: "Extratos bancários",
    category: "Comprovação financeira",
    treeLabel: "Extratos bancários da conta do PDDE",
    fileLabel: "EXTRATOS_BANCARIOS_PDDE",
    note: "Reúna conta corrente e aplicações do período integral do exercício.",
  },
  {
    id: "comprovantes",
    order: "05",
    title: "Notas fiscais e comprovantes",
    category: "Comprovação da despesa",
    treeLabel: "Notas fiscais, atestos e comprovantes de pagamento",
    fileLabel: "COMPROVANTES_DESPESA_PDDE",
    note: "Separe por lote ou por conjunto lógico quando o volume for grande.",
  },
  {
    id: "atas",
    order: "06",
    title: "Atas do Conselho / CEC",
    category: "Governança da UEx",
    treeLabel: "Atas de aprovação do CEC",
    fileLabel: "ATAS_CEC_PDDE",
    note: "Use para ata do plano de gastos e ata de aprovação da prestação de contas.",
  },
] as const;

export const getDocumentNamingSuggestions = (
  workspace: ProcessWorkspaceProfile,
): DocumentNamingSuggestion[] => {
  const exercise = workspace.exercise.trim() || "XXXX";
  const schoolSlug = slugifyOperationalFileSegment(workspace.schoolName) || "UNIDADE_ESCOLAR";

  return documentNamingBlueprints.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    fileName: `${item.order}_${item.fileLabel}_${exercise}_${schoolSlug}`,
    treeName: `${item.treeLabel} - ${exercise}`,
    note: item.note,
  }));
};

export const readStorageJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorageJson = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(
    new CustomEvent(PDDE_STORAGE_EVENT, {
      detail: { key },
    }),
  );
};

export const hydrateChecklistItems = (saved: unknown): ChecklistItemState[] => {
  const checkedById = new Map<number, boolean>();

  if (Array.isArray(saved)) {
    for (const item of saved) {
      if (
        item &&
        typeof item === "object" &&
        "id" in item &&
        typeof item.id === "number" &&
        "checked" in item
      ) {
        checkedById.set(item.id, Boolean(item.checked));
      }
    }
  }

  return checklistItemDefinitions.map((item) => ({
    ...item,
    checked: checkedById.get(item.id) ?? false,
  }));
};

export const sanitizeJourneyProgress = (saved: unknown) => {
  const allowedIds = new Set(processFlowSteps.map((step) => step.id));

  if (!Array.isArray(saved)) return [] as string[];

  return saved.filter((value): value is string => typeof value === "string" && allowedIds.has(value));
};

export const sanitizeWorkspaceProfile = (saved: unknown): ProcessWorkspaceProfile => {
  const fallback = emptyProcessWorkspaceProfile();

  if (!saved || typeof saved !== "object") return fallback;

  const value = saved as Partial<ProcessWorkspaceProfile>;

  return {
    schoolName:
      typeof value.schoolName === "string"
        ? normalizeWorkspaceFieldValue("schoolName", value.schoolName)
        : fallback.schoolName,
    uexCnpj:
      typeof value.uexCnpj === "string"
        ? normalizeWorkspaceFieldValue("uexCnpj", value.uexCnpj)
        : fallback.uexCnpj,
    exercise:
      typeof value.exercise === "string"
        ? normalizeWorkspaceFieldValue("exercise", value.exercise)
        : fallback.exercise,
    seiProcessNumber:
      typeof value.seiProcessNumber === "string"
        ? normalizeWorkspaceFieldValue("seiProcessNumber", value.seiProcessNumber)
        : fallback.seiProcessNumber,
    responsibleName:
      typeof value.responsibleName === "string"
        ? normalizeWorkspaceFieldValue("responsibleName", value.responsibleName)
        : fallback.responsibleName,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : fallback.updatedAt,
  };
};

export const sanitizeOperationalCaseNotes = (saved: unknown): OperationalCaseNotes => {
  const fallback = emptyOperationalCaseNotes();

  if (!saved || typeof saved !== "object") return fallback;

  const value = saved as Partial<OperationalCaseNotes>;

  return {
    pendingIssue:
      typeof value.pendingIssue === "string" ? collapseInternalWhitespace(value.pendingIssue) : fallback.pendingIssue,
    lastAction:
      typeof value.lastAction === "string" ? collapseInternalWhitespace(value.lastAction) : fallback.lastAction,
    nextCheckpoint:
      typeof value.nextCheckpoint === "string" ? collapseInternalWhitespace(value.nextCheckpoint) : fallback.nextCheckpoint,
    handoffOwner:
      typeof value.handoffOwner === "string" ? collapseInternalWhitespace(value.handoffOwner) : fallback.handoffOwner,
    observations:
      typeof value.observations === "string" ? collapseInternalWhitespace(value.observations) : fallback.observations,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : fallback.updatedAt,
  };
};

export const sanitizeOperationalSnapshot = (saved: unknown): OperationalSnapshot => {
  if (!saved || typeof saved !== "object") return emptyOperationalSnapshot();

  const value = saved as Partial<OperationalSnapshot>;

  return {
    checklist: hydrateChecklistItems(value.checklist),
    journey: sanitizeJourneyProgress(value.journey),
    workspace: sanitizeWorkspaceProfile(value.workspace),
    notes: sanitizeOperationalCaseNotes(value.notes),
  };
};

export const getOperationalSnapshot = (): OperationalSnapshot => ({
  checklist: hydrateChecklistItems(readStorageJson(PDDE_STORAGE_KEYS.checklist, createChecklistItems())),
  journey: sanitizeJourneyProgress(readStorageJson(PDDE_STORAGE_KEYS.journey, [])),
  workspace: sanitizeWorkspaceProfile(
    readStorageJson(PDDE_STORAGE_KEYS.workspace, emptyProcessWorkspaceProfile()),
  ),
  notes: sanitizeOperationalCaseNotes(
    readStorageJson(PDDE_STORAGE_KEYS.notes, emptyOperationalCaseNotes()),
  ),
});

export const createOperationalBackup = (
  snapshot: OperationalSnapshot = getOperationalSnapshot(),
): OperationalBackupFile => ({
  schemaVersion: 1,
  exportedAt: new Date().toISOString(),
  snapshot: sanitizeOperationalSnapshot(snapshot),
});

export const parseOperationalBackup = (saved: unknown): OperationalBackupFile | null => {
  if (!saved || typeof saved !== "object") return null;

  const value = saved as Partial<OperationalBackupFile> & {
    checklist?: unknown;
    journey?: unknown;
    workspace?: unknown;
  };

  if ("snapshot" in value) {
    return {
      schemaVersion: 1,
      exportedAt: typeof value.exportedAt === "string" ? value.exportedAt : new Date().toISOString(),
      snapshot: sanitizeOperationalSnapshot(value.snapshot),
    };
  }

  if ("checklist" in value || "journey" in value || "workspace" in value) {
    return {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      snapshot: sanitizeOperationalSnapshot(value),
    };
  }

  return null;
};

export const applyOperationalSnapshot = (snapshot: OperationalSnapshot) => {
  const sanitizedSnapshot = sanitizeOperationalSnapshot(snapshot);

  writeStorageJson(PDDE_STORAGE_KEYS.checklist, sanitizedSnapshot.checklist);
  writeStorageJson(PDDE_STORAGE_KEYS.journey, sanitizedSnapshot.journey);
  writeStorageJson(PDDE_STORAGE_KEYS.workspace, sanitizedSnapshot.workspace);
  writeStorageJson(PDDE_STORAGE_KEYS.notes, sanitizedSnapshot.notes);
};

export const getOperationalBackupFileName = (snapshot: OperationalSnapshot) => {
  const exercise = snapshot.workspace.exercise.trim() || "sem-exercicio";
  const school = slugifyOperationalFileSegment(snapshot.workspace.schoolName) || "UNIDADE";

  return `PDDE_PROGRESSO_${exercise}_${school}.json`;
};

export const countCompletedWorkspaceFields = (workspace: ProcessWorkspaceProfile) =>
  processWorkspaceFieldDefinitions.filter(({ key }) => workspace[key].trim().length > 0).length;

export const buildOperationalReport = (snapshot: OperationalSnapshot): OperationalReadinessReport => {
  const essentialItems = snapshot.checklist.filter((item) => !item.complementar);
  const complementaryItems = snapshot.checklist.filter((item) => item.complementar);
  const essentialPending = essentialItems.filter((item) => !item.checked);
  const complementaryPending = complementaryItems.filter((item) => !item.checked);
  const completedJourney = new Set(snapshot.journey);
  const remittanceStep = processFlowSteps.find((step) => step.id === "finalizacao");
  const preRemittanceSteps = processFlowSteps.filter((step) => step.id !== "finalizacao");
  const pendingJourney = preRemittanceSteps.filter((step) => !completedJourney.has(step.id));
  const missingWorkspaceFields = processWorkspaceFieldDefinitions.filter(
    ({ key }) => snapshot.workspace[key].trim().length === 0,
  );

  const essentialProgress =
    essentialItems.length === 0
      ? 0
      : Math.round((100 * (essentialItems.length - essentialPending.length)) / essentialItems.length);

  const journeyProgress =
    preRemittanceSteps.length === 0
      ? 0
      : Math.round((100 * (preRemittanceSteps.length - pendingJourney.length)) / preRemittanceSteps.length);

  const workspaceCompletedFields = countCompletedWorkspaceFields(snapshot.workspace);
  const workspaceTotalFields = processWorkspaceFieldDefinitions.length;
  const remittanceDone = remittanceStep ? completedJourney.has(remittanceStep.id) : false;

  let status: OperationalStatus = "blocked";

  if (remittanceDone) {
    status = "submitted";
  } else if (essentialPending.length === 0 && pendingJourney.length === 0) {
    status = "ready";
  } else if (essentialPending.length === 0) {
    status = "flow";
  }

  const nextAction =
    missingWorkspaceFields.length > 0
      ? {
          anchor: GUIDE_ANCHORS.workspace,
          title: "Completar os dados base do processo",
          description: `Preencha ${missingWorkspaceFields
            .slice(0, 2)
            .map((field) => field.label.toLowerCase())
            .join(" e ")} para melhorar os modelos rápidos e o diagnóstico de remessa.`,
          ctaLabel: "Ir ao painel do processo",
        }
      : essentialPending.length > 0
        ? {
            anchor: GUIDE_ANCHORS.checklist,
            title: "Fechar o núcleo mínimo documental",
            description: `Ainda faltam ${essentialPending.length} item(ns) essencial(is) antes da remessa para ${GAD_UNIT.shortLabel}.`,
            ctaLabel: "Revisar checklist",
          }
        : pendingJourney.length > 0
          ? {
              anchor: GUIDE_ANCHORS.journey,
              title: "Concluir a sequência operacional pré-remessa",
              description: `A próxima trava do fluxo está em "${pendingJourney[0]?.title}". Marque a jornada antes de tramitar o processo.`,
              ctaLabel: "Abrir mapa da jornada",
            }
          : complementaryPending.length > 0
            ? {
                anchor: GUIDE_ANCHORS.readiness,
                title: "Revisar alertas complementares antes de enviar",
                description: `O processo já está apto no núcleo mínimo, mas ainda há ${complementaryPending.length} alerta(s) complementar(es) para avaliar conforme o caso.`,
                ctaLabel: "Abrir diagnóstico",
              }
            : remittanceDone
              ? {
                  anchor: GUIDE_ANCHORS.readiness,
                  title: "Acompanhar análise e diligências da GAD",
                  description: "A remessa já foi marcada. Use o diagnóstico e o despacho final para acompanhar pendências supervenientes.",
                  ctaLabel: "Revisar situação atual",
                }
              : {
                  anchor: GUIDE_ANCHORS.readiness,
                  title: "Gerar o diagnóstico final da remessa",
                  description: "Checklist essencial e jornada pré-remessa estão completos. Agora vale exportar o diagnóstico antes de tramitar.",
                  ctaLabel: "Gerar diagnóstico",
                };

  return {
    status,
    essentialItems,
    complementaryItems,
    essentialPending,
    complementaryPending,
    pendingJourney,
    essentialProgress,
    journeyProgress,
    workspaceCompletedFields,
    workspaceTotalFields,
    missingWorkspaceFields,
    remittanceDone,
    nextAction,
  };
};

export const buildOperationalDiagnosticText = (
  snapshot: OperationalSnapshot,
  report: OperationalReadinessReport = buildOperationalReport(snapshot),
) => {
  const statusCopy = operationalStatusCopy[report.status];
  const generatedAt = new Date().toLocaleString("pt-BR");
  const preRemittanceSteps = processFlowSteps.filter((step) => step.id !== "finalizacao");
  const lines = [
    "Diagnóstico operacional — Prestação de Contas PDDE",
    "",
    `Gerado em: ${generatedAt}`,
    `Situação: ${statusCopy.title}`,
    `Destino da remessa: ${GAD_UNIT.fullLabel}`,
    "",
    "Dados do processo",
    `- Unidade escolar: ${snapshot.workspace.schoolName || "Não informado"}`,
    `- CNPJ do CEC/UEx: ${snapshot.workspace.uexCnpj || "Não informado"}`,
    `- Exercício: ${snapshot.workspace.exercise || "Não informado"}`,
    `- Processo SEI!RIO: ${snapshot.workspace.seiProcessNumber || "Não informado"}`,
    `- Responsável pela conferência: ${snapshot.workspace.responsibleName || "Não informado"}`,
    `- Última atualização do painel: ${formatOperationalTimestamp(snapshot.workspace.updatedAt)}`,
    "",
  "Indicadores",
    `- Checklist essencial: ${report.essentialItems.length - report.essentialPending.length}/${report.essentialItems.length} (${report.essentialProgress}%)`,
    `- Checklist complementar: ${report.complementaryItems.length - report.complementaryPending.length}/${report.complementaryItems.length}`,
    `- Jornada pré-remessa: ${preRemittanceSteps.length - report.pendingJourney.length}/${preRemittanceSteps.length} (${report.journeyProgress}%)`,
    `- Dados base do processo: ${report.workspaceCompletedFields}/${report.workspaceTotalFields}`,
    "",
    "Próxima ação recomendada",
    `- ${report.nextAction.title}: ${report.nextAction.description}`,
    "",
  ];

  const notes = snapshot.notes;
  const hasNotes = [
    notes.pendingIssue,
    notes.lastAction,
    notes.nextCheckpoint,
    notes.handoffOwner,
    notes.observations,
  ].some((value) => value.trim().length > 0);

  if (hasNotes) {
    lines.push("Notas operacionais do caso");
    if (notes.pendingIssue.trim()) lines.push(`- Pendência focal: ${notes.pendingIssue}`);
    if (notes.lastAction.trim()) lines.push(`- Último andamento: ${notes.lastAction}`);
    if (notes.nextCheckpoint.trim()) lines.push(`- Próxima checagem: ${notes.nextCheckpoint}`);
    if (notes.handoffOwner.trim()) lines.push(`- Responsável / handoff: ${notes.handoffOwner}`);
    if (notes.observations.trim()) lines.push(`- Observações: ${notes.observations}`);
    lines.push("");
  }

  if (report.essentialPending.length > 0) {
    lines.push("Pendências essenciais");
    for (const item of report.essentialPending) {
      lines.push(`- ${item.id}. ${item.text}`);
    }
    lines.push("");
  }

  if (report.pendingJourney.length > 0) {
    lines.push("Etapas operacionais ainda não marcadas");
    for (const step of report.pendingJourney) {
      lines.push(`- Etapa ${step.number}: ${step.title}`);
    }
    lines.push("");
  }

  if (report.complementaryPending.length > 0) {
    lines.push("Itens complementares em aberto");
    for (const item of report.complementaryPending) {
      lines.push(`- ${item.text}`);
    }
    lines.push("");
  }

  lines.push("Leitura orientativa");
  lines.push(`- ${statusCopy.description}`);

  return lines.join("\n");
};

export const buildOperationalShareSummary = (
  snapshot: OperationalSnapshot,
  report: OperationalReadinessReport = buildOperationalReport(snapshot),
) => {
  const statusCopy = operationalStatusCopy[report.status];
  const pendingJourneyLabel =
    report.pendingJourney.length > 0
      ? report.pendingJourney
          .slice(0, 2)
          .map((step) => `Etapa ${step.number}: ${step.title}`)
          .join("; ")
      : "Fluxo pré-remessa marcado";

  return [
    "Resumo operacional — Prestação de Contas PDDE",
    `Situação: ${statusCopy.title}`,
    `Unidade: ${snapshot.workspace.schoolName || "Não informado"}`,
    `Exercício: ${snapshot.workspace.exercise || "Não informado"}`,
    `Processo SEI!RIO: ${snapshot.workspace.seiProcessNumber || "Não informado"}`,
    `Responsável: ${snapshot.workspace.responsibleName || "Não informado"}`,
    `Próxima ação: ${report.nextAction.title}`,
    `Pendências essenciais: ${report.essentialPending.length}`,
    `Etapas pendentes: ${pendingJourneyLabel}`,
    `Pendência focal: ${snapshot.notes.pendingIssue.trim() || "Sem observação registrada"}`,
    `Último andamento: ${snapshot.notes.lastAction.trim() || "Não registrado"}`,
    `Responsável / handoff: ${snapshot.notes.handoffOwner.trim() || "Não informado"}`,
    `Destino: ${GAD_UNIT.fullLabel}`,
  ].join("\n");
};

export const buildOperationalExecutiveHighlights = (
  snapshot: OperationalSnapshot,
  report: OperationalReadinessReport = buildOperationalReport(snapshot),
) => {
  const pendingJourneyLabels = report.pendingJourney
    .slice(0, 2)
    .map((step) => `etapa ${step.number} (${step.title})`);
  const missingFields = report.missingWorkspaceFields
    .slice(0, 3)
    .map((field) => field.label.toLowerCase());

  const highlights = [
    `Situação atual: ${operationalStatusCopy[report.status].title}.`,
    `Checklist essencial em ${report.essentialItems.length - report.essentialPending.length}/${report.essentialItems.length} (${report.essentialProgress}%).`,
    report.pendingJourney.length > 0
      ? `Fluxo pré-remessa ainda depende de ${joinHumanList(pendingJourneyLabels)}.`
      : "Fluxo pré-remessa já está marcado até o ponto de remessa.",
    report.missingWorkspaceFields.length > 0
      ? `Dados base ainda incompletos: ${joinHumanList(missingFields)}.`
      : "Dados base do processo preenchidos para reaproveitamento em modelos, relatórios e handoff.",
    `Próxima ação recomendada: ${report.nextAction.title}. ${report.nextAction.description}`,
  ];

  if (snapshot.notes.pendingIssue.trim()) {
    highlights.push(`Pendência focal registrada: ${snapshot.notes.pendingIssue.trim()}.`);
  }

  if (snapshot.notes.nextCheckpoint.trim()) {
    highlights.push(`Próxima checagem prevista: ${snapshot.notes.nextCheckpoint.trim()}.`);
  }

  return highlights;
};

export const buildOperationalExecutiveBrief = (
  snapshot: OperationalSnapshot,
  report: OperationalReadinessReport = buildOperationalReport(snapshot),
) =>
  [
    "Briefing executivo — Prestação de Contas PDDE",
    "",
    ...buildOperationalExecutiveHighlights(snapshot, report).map((item) => `- ${item}`),
  ].join("\n");

const buildOperationalPrintList = (items: string[], emptyMessage: string) => {
  if (items.length === 0) {
    return `<p class="empty-state">${escapeHtml(emptyMessage)}</p>`;
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};

export const buildOperationalPrintHtml = (
  snapshot: OperationalSnapshot,
  report: OperationalReadinessReport = buildOperationalReport(snapshot),
) => {
  const statusCopy = operationalStatusCopy[report.status];
  const highlights = buildOperationalExecutiveHighlights(snapshot, report);
  const generationLabel = formatOperationalTimestamp(new Date().toISOString());
  const checklistComplete = report.essentialItems.length - report.essentialPending.length;
  const journeyTotal = processFlowSteps.filter((step) => step.id !== "finalizacao").length;
  const journeyComplete = journeyTotal - report.pendingJourney.length;
  const complementaryComplete = report.complementaryItems.length - report.complementaryPending.length;
  const statusToneClass =
    statusCopy.tone === "danger"
      ? "status-danger"
      : statusCopy.tone === "warning"
        ? "status-warning"
        : statusCopy.tone === "success"
          ? "status-success"
          : "status-info";

  const noteRows = [
    ["Pendência focal", snapshot.notes.pendingIssue.trim() || "Sem registro atual"],
    ["Último andamento", snapshot.notes.lastAction.trim() || "Sem registro atual"],
    ["Próxima checagem", snapshot.notes.nextCheckpoint.trim() || "Sem registro atual"],
    ["Responsável / handoff", snapshot.notes.handoffOwner.trim() || "Sem registro atual"],
    ["Observações", snapshot.notes.observations.trim() || "Sem observação registrada"],
  ];

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Relatório operacional PDDE</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #102033;
        --muted: #5b6b7f;
        --line: #d8e0ea;
        --surface: #f5f8fb;
        --surface-strong: #ffffff;
        --primary: #0f5bd7;
        --primary-soft: rgba(15, 91, 215, 0.08);
        --success: #18794e;
        --success-soft: rgba(24, 121, 78, 0.1);
        --warning: #9a5b00;
        --warning-soft: rgba(154, 91, 0, 0.1);
        --danger: #b42318;
        --danger-soft: rgba(180, 35, 24, 0.08);
        --info: #0c6ac9;
        --info-soft: rgba(12, 106, 201, 0.08);
      }

      * { box-sizing: border-box; }
      html { background: #eef3f8; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at top right, rgba(15, 91, 215, 0.08), transparent 32%),
          linear-gradient(180deg, #f4f7fb 0%, #eef3f8 100%);
        color: var(--ink);
        font-family: "Segoe UI", "Inter", system-ui, sans-serif;
        line-height: 1.55;
      }

      .toolbar {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        gap: 12px;
        padding: 14px 18px;
        backdrop-filter: blur(12px);
        background: rgba(244, 247, 251, 0.88);
        border-bottom: 1px solid rgba(216, 224, 234, 0.9);
      }

      .toolbar button {
        border: 0;
        border-radius: 999px;
        padding: 11px 18px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        background: var(--primary);
        color: white;
      }

      .toolbar p {
        margin: 0;
        color: var(--muted);
        font-size: 13px;
        align-self: center;
      }

      main {
        max-width: 1024px;
        margin: 0 auto;
        padding: 28px 24px 48px;
      }

      .sheet {
        background: var(--surface-strong);
        border: 1px solid rgba(216, 224, 234, 0.9);
        border-radius: 28px;
        box-shadow: 0 22px 60px rgba(16, 32, 51, 0.08);
        overflow: hidden;
      }

      .cover {
        padding: 36px 36px 28px;
        background:
          linear-gradient(135deg, rgba(15, 91, 215, 0.08), rgba(15, 91, 215, 0.02)),
          linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
        border-bottom: 1px solid var(--line);
      }

      .eyebrow {
        margin: 0 0 10px;
        color: var(--primary);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        font-size: 34px;
        line-height: 1.1;
        letter-spacing: -0.03em;
      }

      .lede {
        max-width: 760px;
        margin: 16px 0 0;
        color: var(--muted);
        font-size: 16px;
      }

      .meta-grid,
      .metric-grid,
      .panel-grid,
      .detail-grid {
        display: grid;
        gap: 16px;
      }

      .meta-grid,
      .metric-grid {
        margin-top: 24px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }

      .panel-grid {
        padding: 28px 36px 0;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
      }

      .detail-grid {
        padding: 20px 36px 36px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .card,
      .status-card,
      .metric-card,
      .detail-card {
        border: 1px solid var(--line);
        border-radius: 22px;
        background: #fff;
      }

      .card,
      .detail-card {
        padding: 22px;
      }

      .status-card {
        padding: 22px;
      }

      .status-card strong {
        display: inline-flex;
        align-items: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .status-danger strong { color: var(--danger); background: var(--danger-soft); }
      .status-warning strong { color: var(--warning); background: var(--warning-soft); }
      .status-success strong { color: var(--success); background: var(--success-soft); }
      .status-info strong { color: var(--info); background: var(--info-soft); }

      .status-card p,
      .card p,
      .detail-card p,
      .detail-card li {
        margin: 0;
      }

      .status-card h2,
      .card h2,
      .detail-card h2 {
        margin: 12px 0 10px;
        font-size: 22px;
        line-height: 1.2;
      }

      .status-card .hint {
        color: var(--muted);
      }

      .metric-card {
        padding: 18px 20px;
        background: var(--surface);
      }

      .metric-card span {
        display: block;
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .metric-card strong {
        display: block;
        margin-top: 10px;
        font-size: 28px;
        line-height: 1;
      }

      .metric-card p {
        margin-top: 8px;
        color: var(--muted);
        font-size: 14px;
      }

      .section-label {
        margin: 0 0 10px;
        color: var(--primary);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .summary-list,
      ul {
        margin: 0;
        padding-left: 22px;
      }

      .summary-list li,
      ul li {
        margin-top: 10px;
      }

      .meta-list {
        display: grid;
        gap: 12px;
      }

      .meta-row {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px dashed rgba(216, 224, 234, 0.95);
        padding-bottom: 10px;
      }

      .meta-row:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }

      .meta-row span {
        color: var(--muted);
        font-weight: 600;
      }

      .meta-row strong {
        text-align: right;
        font-weight: 700;
      }

      .empty-state {
        color: var(--muted);
      }

      footer {
        padding: 0 36px 36px;
      }

      .footer-note {
        border-top: 1px solid var(--line);
        padding-top: 18px;
        color: var(--muted);
        font-size: 13px;
      }

      @media (max-width: 860px) {
        .panel-grid,
        .detail-grid {
          grid-template-columns: 1fr;
        }

        .cover,
        .panel-grid,
        .detail-grid,
        footer {
          padding-left: 20px;
          padding-right: 20px;
        }

        h1 {
          font-size: 28px;
        }

        .meta-row {
          flex-direction: column;
        }

        .meta-row strong {
          text-align: left;
        }
      }

      @media print {
        @page { margin: 14mm; size: A4; }

        html,
        body {
          background: #fff;
        }

        .toolbar {
          display: none;
        }

        main {
          max-width: none;
          padding: 0;
        }

        .sheet {
          border: 0;
          box-shadow: none;
          border-radius: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <button type="button" onclick="window.print()">Imprimir / salvar em PDF</button>
      <p>Versão limpa para conferência, anexação em PDF ou repasse interno.</p>
    </div>
    <main>
      <article class="sheet">
        <header class="cover">
          <p class="eyebrow">Guia PDDE • conferência operacional</p>
          <h1>Relatório operacional para conferência e remessa</h1>
          <p class="lede">
            Documento gerado a partir do estado salvo no guia para apoiar conferência interna,
            passagem de tarefa e preparação da remessa para ${escapeHtml(GAD_UNIT.fullLabel)}.
          </p>

          <div class="meta-grid">
            <div class="metric-card">
              <span>Unidade escolar</span>
              <strong>${escapeHtml(snapshot.workspace.schoolName || "Não informado")}</strong>
              <p>Gerado em ${escapeHtml(generationLabel)}</p>
            </div>
            <div class="metric-card">
              <span>Exercício</span>
              <strong>${escapeHtml(snapshot.workspace.exercise || "Não informado")}</strong>
              <p>Processo ${escapeHtml(snapshot.workspace.seiProcessNumber || "Não informado")}</p>
            </div>
            <div class="metric-card">
              <span>Responsável</span>
              <strong>${escapeHtml(snapshot.workspace.responsibleName || "Não informado")}</strong>
              <p>CNPJ ${escapeHtml(snapshot.workspace.uexCnpj || "Não informado")}</p>
            </div>
          </div>
        </header>

        <section class="panel-grid">
          <section class="status-card ${statusToneClass}">
            <strong>${escapeHtml(statusCopy.badge)}</strong>
            <h2>${escapeHtml(statusCopy.title)}</h2>
            <p class="hint">${escapeHtml(statusCopy.description)}</p>

            <div class="metric-grid">
              <div class="metric-card">
                <span>Checklist essencial</span>
                <strong>${checklistComplete}/${report.essentialItems.length}</strong>
                <p>${report.essentialProgress}% do núcleo mínimo federal.</p>
              </div>
              <div class="metric-card">
                <span>Jornada pré-remessa</span>
                <strong>${journeyComplete}/${journeyTotal}</strong>
                <p>${report.journeyProgress}% do fluxo operacional antes da remessa.</p>
              </div>
              <div class="metric-card">
                <span>Itens complementares</span>
                <strong>${complementaryComplete}/${report.complementaryItems.length}</strong>
                <p>${report.complementaryPending.length} ainda dependem de avaliação.</p>
              </div>
              <div class="metric-card">
                <span>Dados base do processo</span>
                <strong>${report.workspaceCompletedFields}/${report.workspaceTotalFields}</strong>
                <p>Campos aproveitados em modelos, relatórios e handoff.</p>
              </div>
            </div>
          </section>

          <section class="card">
            <p class="section-label">Próxima ação recomendada</p>
            <h2>${escapeHtml(report.nextAction.title)}</h2>
            <p>${escapeHtml(report.nextAction.description)}</p>

            <div class="card" style="margin-top: 18px; background: var(--surface);">
              <p class="section-label">Resumo executivo</p>
              <ul class="summary-list">
                ${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>
          </section>
        </section>

        <section class="detail-grid">
          <section class="detail-card">
            <p class="section-label">Dados do processo</p>
            <div class="meta-list">
              <div class="meta-row"><span>Unidade escolar</span><strong>${escapeHtml(snapshot.workspace.schoolName || "Não informado")}</strong></div>
              <div class="meta-row"><span>CNPJ do CEC/UEx</span><strong>${escapeHtml(snapshot.workspace.uexCnpj || "Não informado")}</strong></div>
              <div class="meta-row"><span>Exercício</span><strong>${escapeHtml(snapshot.workspace.exercise || "Não informado")}</strong></div>
              <div class="meta-row"><span>Processo SEI!RIO</span><strong>${escapeHtml(snapshot.workspace.seiProcessNumber || "Não informado")}</strong></div>
              <div class="meta-row"><span>Responsável pela conferência</span><strong>${escapeHtml(snapshot.workspace.responsibleName || "Não informado")}</strong></div>
              <div class="meta-row"><span>Última atualização do painel</span><strong>${escapeHtml(formatOperationalTimestamp(snapshot.workspace.updatedAt))}</strong></div>
            </div>
          </section>

          <section class="detail-card">
            <p class="section-label">Notas operacionais</p>
            <div class="meta-list">
              ${noteRows
                .map(
                  ([label, value]) =>
                    `<div class="meta-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`,
                )
                .join("")}
            </div>
          </section>

          <section class="detail-card">
            <p class="section-label">Pendências essenciais</p>
            ${buildOperationalPrintList(
              report.essentialPending.map((item) => `${item.id}. ${item.text}`),
              "Nenhuma pendência essencial em aberto.",
            )}
          </section>

          <section class="detail-card">
            <p class="section-label">Etapas ainda não marcadas</p>
            ${buildOperationalPrintList(
              report.pendingJourney.map((step) => `Etapa ${step.number}: ${step.title}`),
              "Fluxo pré-remessa já marcado integralmente.",
            )}
          </section>

          <section class="detail-card">
            <p class="section-label">Alertas complementares</p>
            ${buildOperationalPrintList(
              report.complementaryPending.map((item) => item.text),
              "Nenhum alerta complementar em aberto no momento.",
            )}
          </section>

          <section class="detail-card">
            <p class="section-label">Destino e uso recomendado</p>
            <ul>
              <li>Destino da remessa: ${escapeHtml(GAD_UNIT.fullLabel)}.</li>
              <li>Use este relatório para conferência interna, repasse entre equipes e geração de PDF institucional.</li>
              <li>Revise sempre o caso concreto, a norma do exercício e eventuais exigências locais antes de tramitar.</li>
            </ul>
          </section>
        </section>

        <footer>
          <p class="footer-note">
            Relatório gerado automaticamente pelo guia operacional PDDE. Este material apoia a conferência e
            a organização do processo, mas não substitui a análise normativa do caso concreto nem a verificação
            dos documentos originais e dos registros federais aplicáveis ao exercício.
          </p>
        </footer>
      </article>
    </main>
  </body>
</html>`;
};

export const buildOperationalTextBundle = (
  snapshot: OperationalSnapshot,
  report: OperationalReadinessReport = buildOperationalReport(snapshot),
): OperationalTextBundle => ({
  diagnostic: buildOperationalDiagnosticText(snapshot, report),
  shareSummary: buildOperationalShareSummary(snapshot, report),
  executiveBrief: buildOperationalExecutiveBrief(snapshot, report),
  fileName: getOperationalDiagnosticFileName(snapshot.workspace),
});

export const formatOperationalTimestamp = (isoDate?: string | null) => {
  if (!isoDate) return "Ainda não registrado";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Data inválida";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};
