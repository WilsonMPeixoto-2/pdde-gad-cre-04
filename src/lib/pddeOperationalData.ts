import { processFlowSteps } from "@/lib/guideContent";

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
    schoolName: typeof value.schoolName === "string" ? value.schoolName : fallback.schoolName,
    uexCnpj: typeof value.uexCnpj === "string" ? value.uexCnpj : fallback.uexCnpj,
    exercise: typeof value.exercise === "string" ? value.exercise : fallback.exercise,
    seiProcessNumber:
      typeof value.seiProcessNumber === "string" ? value.seiProcessNumber : fallback.seiProcessNumber,
    responsibleName:
      typeof value.responsibleName === "string" ? value.responsibleName : fallback.responsibleName,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : fallback.updatedAt,
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
