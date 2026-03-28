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

export interface OperationalSnapshot {
  checklist: ChecklistItemState[];
  journey: string[];
  workspace: ProcessWorkspaceProfile;
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

export const PDDE_STORAGE_KEYS = {
  checklist: "pdde-checklist-state-v5",
  journey: "pdde-journey-progress-v1",
  workspace: "pdde-process-workspace-v1",
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

export const sanitizeOperationalSnapshot = (saved: unknown): OperationalSnapshot => {
  if (!saved || typeof saved !== "object") return emptyOperationalSnapshot();

  const value = saved as Partial<OperationalSnapshot>;

  return {
    checklist: hydrateChecklistItems(value.checklist),
    journey: sanitizeJourneyProgress(value.journey),
    workspace: sanitizeWorkspaceProfile(value.workspace),
  };
};

export const getOperationalSnapshot = (): OperationalSnapshot => ({
  checklist: hydrateChecklistItems(readStorageJson(PDDE_STORAGE_KEYS.checklist, createChecklistItems())),
  journey: sanitizeJourneyProgress(readStorageJson(PDDE_STORAGE_KEYS.journey, [])),
  workspace: sanitizeWorkspaceProfile(
    readStorageJson(PDDE_STORAGE_KEYS.workspace, emptyProcessWorkspaceProfile()),
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

export const formatOperationalTimestamp = (isoDate?: string | null) => {
  if (!isoDate) return "Ainda não registrado";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Data inválida";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};
