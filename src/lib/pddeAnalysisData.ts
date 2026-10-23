import {
  PDDE_ANALYSIS_NUP_SESSION_KEY,
  PDDE_STORAGE_KEYS,
  checklistItemDefinitions,
  normalizeWorkspaceFieldValue,
  readStorageJson,
  writeStorageJson,
} from "@/lib/pddeOperationalData";

export type AnalysisReviewStatus =
  | "not_reviewed"
  | "conform"
  | "pending"
  | "not_applicable";

export type AnalysisFindingSeverity = "info" | "warning" | "critical";
export type AnalysisFindingStatus = "open" | "awaiting_response" | "resolved";

export interface AnalysisCaseProfile {
  schoolName: string;
  uexCnpj: string;
  exercise: string;
  seiProcessNumber: string;
  programAction: string;
  analystName: string;
  updatedAt: string | null;
}

export interface AnalysisReviewItem {
  id: number;
  status: AnalysisReviewStatus;
  note: string;
  updatedAt: string | null;
}

export interface AnalysisFinding {
  id: string;
  title: string;
  description: string;
  severity: AnalysisFindingSeverity;
  status: AnalysisFindingStatus;
  checklistItemId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisSnapshot {
  caseProfile: AnalysisCaseProfile;
  reviews: AnalysisReviewItem[];
  findings: AnalysisFinding[];
}

export interface AnalysisMetrics {
  totalItems: number;
  reviewedItems: number;
  unreviewedItems: number;
  conformItems: number;
  pendingItems: number;
  notApplicableItems: number;
  openFindings: number;
  criticalOpenFindings: number;
  resolvedFindings: number;
  progressPercent: number;
}

export interface AnalysisNextAction {
  kind: "identify" | "review" | "resolve" | "conclude";
  title: string;
  description: string;
}


const nowIso = () => new Date().toISOString();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

export const analysisReviewStatusMeta: Record<
  AnalysisReviewStatus,
  { label: string; shortLabel: string }
> = {
  not_reviewed: { label: "Não conferido", shortLabel: "Não conferido" },
  conform: { label: "Conforme", shortLabel: "Conforme" },
  pending: { label: "Pendência", shortLabel: "Pendência" },
  not_applicable: { label: "Não se aplica", shortLabel: "N/A" },
};

export const analysisFindingSeverityMeta: Record<
  AnalysisFindingSeverity,
  { label: string }
> = {
  info: { label: "Observação" },
  warning: { label: "Ajuste necessário" },
  critical: { label: "Crítica" },
};

export const analysisFindingStatusMeta: Record<
  AnalysisFindingStatus,
  { label: string }
> = {
  open: { label: "Aberto" },
  awaiting_response: { label: "Aguardando resposta" },
  resolved: { label: "Resolvido" },
};

export const emptyAnalysisCaseProfile = (): AnalysisCaseProfile => ({
  schoolName: "",
  uexCnpj: "",
  exercise: "",
  seiProcessNumber: "",
  programAction: "",
  analystName: "",
  updatedAt: null,
});

export const createAnalysisReviewItems = (): AnalysisReviewItem[] =>
  checklistItemDefinitions.map((item) => ({
    id: item.id,
    status: "not_reviewed",
    note: "",
    updatedAt: null,
  }));

export const emptyAnalysisSnapshot = (): AnalysisSnapshot => ({
  caseProfile: emptyAnalysisCaseProfile(),
  reviews: createAnalysisReviewItems(),
  findings: [],
});

const sanitizeCaseProfile = (saved: unknown): AnalysisCaseProfile => {
  const fallback = emptyAnalysisCaseProfile();
  if (!isRecord(saved)) return fallback;

  return {
    schoolName:
      typeof saved.schoolName === "string"
        ? normalizeWorkspaceFieldValue("schoolName", saved.schoolName)
        : fallback.schoolName,
    uexCnpj:
      typeof saved.uexCnpj === "string"
        ? normalizeWorkspaceFieldValue("uexCnpj", saved.uexCnpj)
        : fallback.uexCnpj,
    exercise:
      typeof saved.exercise === "string"
        ? normalizeWorkspaceFieldValue("exercise", saved.exercise)
        : fallback.exercise,
    seiProcessNumber:
      typeof saved.seiProcessNumber === "string"
        ? normalizeWorkspaceFieldValue("seiProcessNumber", saved.seiProcessNumber)
        : fallback.seiProcessNumber,
    programAction:
      typeof saved.programAction === "string" ? saved.programAction.trimStart().slice(0, 140) : "",
    analystName:
      typeof saved.analystName === "string"
        ? normalizeWorkspaceFieldValue("responsibleName", saved.analystName)
        : "",
    updatedAt: typeof saved.updatedAt === "string" ? saved.updatedAt : null,
  };
};

const sanitizeReviewItems = (saved: unknown): AnalysisReviewItem[] => {
  const source = Array.isArray(saved) ? saved : [];
  const byId = new Map<number, AnalysisReviewItem>();

  for (const entry of source) {
    if (!isRecord(entry) || typeof entry.id !== "number") continue;
    const status =
      entry.status === "conform" ||
      entry.status === "pending" ||
      entry.status === "not_applicable"
        ? entry.status
        : "not_reviewed";

    byId.set(entry.id, {
      id: entry.id,
      status,
      note: typeof entry.note === "string" ? entry.note.trimStart().slice(0, 1200) : "",
      updatedAt: typeof entry.updatedAt === "string" ? entry.updatedAt : null,
    });
  }

  return checklistItemDefinitions.map((definition) => {
    const existing = byId.get(definition.id);
    return (
      existing ?? {
        id: definition.id,
        status: "not_reviewed",
        note: "",
        updatedAt: null,
      }
    );
  });
};

const sanitizeFindings = (saved: unknown): AnalysisFinding[] => {
  if (!Array.isArray(saved)) return [];

  return saved.flatMap((entry): AnalysisFinding[] => {
    if (!isRecord(entry) || typeof entry.id !== "string") return [];

    const severity: AnalysisFindingSeverity =
      entry.severity === "critical" || entry.severity === "info" ? entry.severity : "warning";
    const status: AnalysisFindingStatus =
      entry.status === "resolved" || entry.status === "awaiting_response"
        ? entry.status
        : "open";

    return [
      {
        id: entry.id,
        title: typeof entry.title === "string" ? entry.title.trim().slice(0, 180) : "Apontamento",
        description:
          typeof entry.description === "string"
            ? entry.description.trim().slice(0, 4000)
            : "",
        severity,
        status,
        checklistItemId:
          typeof entry.checklistItemId === "number" ? entry.checklistItemId : null,
        createdAt:
          typeof entry.createdAt === "string" ? entry.createdAt : nowIso(),
        updatedAt:
          typeof entry.updatedAt === "string" ? entry.updatedAt : nowIso(),
      },
    ];
  });
};

export const sanitizeAnalysisSnapshot = (saved: unknown): AnalysisSnapshot => {
  if (!isRecord(saved)) return emptyAnalysisSnapshot();

  return {
    caseProfile: sanitizeCaseProfile(saved.caseProfile),
    reviews: sanitizeReviewItems(saved.reviews),
    findings: sanitizeFindings(saved.findings),
  };
};

export const readAnalysisSnapshot = (): AnalysisSnapshot => {
  const saved = sanitizeAnalysisSnapshot(
    readStorageJson(PDDE_STORAGE_KEYS.analysis, emptyAnalysisSnapshot()),
  );

  try {
    const sessionNup = window.sessionStorage.getItem(PDDE_ANALYSIS_NUP_SESSION_KEY);
    if (sessionNup) {
      saved.caseProfile.seiProcessNumber = normalizeWorkspaceFieldValue(
        "seiProcessNumber",
        sessionNup,
      );
    }
  } catch {
    // Session storage is optional; the analysis still works without it.
  }

  return saved;
};

export const writeAnalysisSnapshot = (snapshot: AnalysisSnapshot) => {
  const sanitized = sanitizeAnalysisSnapshot(snapshot);
  const nup = sanitized.caseProfile.seiProcessNumber;
  const localSnapshot: AnalysisSnapshot = {
    ...sanitized,
    caseProfile: {
      ...sanitized.caseProfile,
      seiProcessNumber: "",
      updatedAt: nowIso(),
    },
  };

  writeStorageJson(PDDE_STORAGE_KEYS.analysis, localSnapshot);

  try {
    if (nup.trim()) {
      window.sessionStorage.setItem(PDDE_ANALYSIS_NUP_SESSION_KEY, nup);
    } else {
      window.sessionStorage.removeItem(PDDE_ANALYSIS_NUP_SESSION_KEY);
    }
  } catch {
    // Session storage is optional.
  }
};

export const updateAnalysisReview = (
  snapshot: AnalysisSnapshot,
  itemId: number,
  patch: Partial<Pick<AnalysisReviewItem, "status" | "note">>,
): AnalysisSnapshot => ({
  ...snapshot,
  reviews: snapshot.reviews.map((item) =>
    item.id === itemId
      ? {
          ...item,
          ...patch,
          updatedAt: nowIso(),
        }
      : item,
  ),
});

export const createAnalysisFinding = (
  input: Omit<AnalysisFinding, "id" | "createdAt" | "updatedAt">,
): AnalysisFinding => {
  const timestamp = nowIso();
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10);

  return {
    ...input,
    id: `ap-${randomPart}`,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const deriveAnalysisMetrics = (snapshot: AnalysisSnapshot): AnalysisMetrics => {
  const reviewed = snapshot.reviews.filter((item) => item.status !== "not_reviewed");

  return {
    totalItems: snapshot.reviews.length,
    reviewedItems: reviewed.length,
    unreviewedItems: snapshot.reviews.length - reviewed.length,
    conformItems: snapshot.reviews.filter((item) => item.status === "conform").length,
    pendingItems: snapshot.reviews.filter((item) => item.status === "pending").length,
    notApplicableItems: snapshot.reviews.filter((item) => item.status === "not_applicable").length,
    openFindings: snapshot.findings.filter((finding) => finding.status !== "resolved").length,
    criticalOpenFindings: snapshot.findings.filter(
      (finding) => finding.status !== "resolved" && finding.severity === "critical",
    ).length,
    resolvedFindings: snapshot.findings.filter((finding) => finding.status === "resolved").length,
    progressPercent:
      snapshot.reviews.length === 0
        ? 0
        : Math.round((reviewed.length / snapshot.reviews.length) * 100),
  };
};

export const getAnalysisNextAction = (
  snapshot: AnalysisSnapshot,
  metrics: AnalysisMetrics = deriveAnalysisMetrics(snapshot),
): AnalysisNextAction => {
  const identityComplete = [
    snapshot.caseProfile.schoolName,
    snapshot.caseProfile.exercise,
    snapshot.caseProfile.programAction,
    snapshot.caseProfile.analystName,
  ].every((value) => value.trim().length > 0);

  if (!identityComplete) {
    return {
      kind: "identify",
      title: "Identificar o caso de análise",
      description:
        "Preencha unidade, exercício, programa/ação e responsável para que os apontamentos fiquem contextualizados.",
    };
  }

  if (metrics.criticalOpenFindings > 0) {
    return {
      kind: "resolve",
      title: "Tratar apontamento crítico antes de avançar",
      description: `Há ${metrics.criticalOpenFindings} apontamento(s) crítico(s) ainda aberto(s). Priorize o saneamento ou a diligência correspondente.`,
    };
  }

  if (metrics.unreviewedItems > 0) {
    return {
      kind: "review",
      title: "Continuar a conferência documental",
      description: `Ainda há ${metrics.unreviewedItems} item(ns) sem resultado de análise.`,
    };
  }

  if (metrics.openFindings > 0) {
    return {
      kind: "resolve",
      title: "Tratar apontamentos abertos",
      description: `Há ${metrics.openFindings} apontamento(s) ainda não resolvido(s), dos quais ${metrics.criticalOpenFindings} crítico(s).`,
    };
  }

  if (metrics.pendingItems > 0) {
    return {
      kind: "resolve",
      title: "Reavaliar itens ainda classificados como pendência",
      description: `Ainda há ${metrics.pendingItems} item(ns) marcado(s) como Pendência. Após o saneamento, registre o resultado da reanálise antes de concluir o caso.`,
    };
  }

  return {
    kind: "conclude",
    title: "Preparar a conclusão da análise",
    description:
      "Todos os itens foram classificados sem pendências remanescentes e não há apontamentos abertos. O caso está pronto para a manifestação conclusiva cabível.",
  };
};

export const buildAnalysisSummaryText = (
  snapshot: AnalysisSnapshot,
  metrics: AnalysisMetrics = deriveAnalysisMetrics(snapshot),
) => {
  const nextAction = getAnalysisNextAction(snapshot, metrics);
  const caseProfile = snapshot.caseProfile;

  const lines = [
    "Mesa de Análise GAD — Prestação de Contas PDDE",
    "",
    `Unidade escolar: ${caseProfile.schoolName || "Não informado"}`,
    `CNPJ do CEC/UEx: ${caseProfile.uexCnpj || "Não informado"}`,
    `Exercício: ${caseProfile.exercise || "Não informado"}`,
    `Programa/Ação: ${caseProfile.programAction || "Não informado"}`,
    `Processo SEI!RIO: ${caseProfile.seiProcessNumber || "Não informado"}`,
    `Responsável pela análise: ${caseProfile.analystName || "Não informado"}`,
    "",
    "Indicadores",
    `- Itens conferidos: ${metrics.reviewedItems}/${metrics.totalItems} (${metrics.progressPercent}%)`,
    `- Conformes: ${metrics.conformItems}`,
    `- Pendências documentais: ${metrics.pendingItems}`,
    `- Não aplicáveis: ${metrics.notApplicableItems}`,
    `- Apontamentos abertos: ${metrics.openFindings}`,
    `- Apontamentos críticos abertos: ${metrics.criticalOpenFindings}`,
    "",
    "Próxima ação",
    `- ${nextAction.title}: ${nextAction.description}`,
  ];

  const pendingReviews = snapshot.reviews.filter((item) => item.status === "pending");
  if (pendingReviews.length > 0) {
    lines.push("", "Itens com pendência");
    for (const review of pendingReviews) {
      const definition = checklistItemDefinitions.find((item) => item.id === review.id);
      lines.push(
        `- ${definition?.text ?? `Item ${review.id}`}${review.note ? `: ${review.note}` : ""}`,
      );
    }
  }

  if (snapshot.findings.length > 0) {
    lines.push("", "Apontamentos");
    for (const finding of snapshot.findings) {
      lines.push(
        `- [${analysisFindingSeverityMeta[finding.severity].label}] ${finding.title} — ${analysisFindingStatusMeta[finding.status].label}`,
      );
      if (finding.description) lines.push(`  ${finding.description}`);
    }
  }

  return lines.join("\n");
};


const analysisFileSegment = (value: string) =>
  value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
    .toUpperCase();

export const getAnalysisDiligenceFileName = (snapshot: AnalysisSnapshot) => {
  const exercise = snapshot.caseProfile.exercise.trim() || "SEM_EXERCICIO";
  const school = analysisFileSegment(snapshot.caseProfile.schoolName) || "UNIDADE";
  return `PDDE_MINUTA_DILIGENCIA_${exercise}_${school}.txt`;
};

export const buildAnalysisDiligenceDraft = (snapshot: AnalysisSnapshot) => {
  const openFindings = snapshot.findings.filter((finding) => finding.status !== "resolved");
  const caseProfile = snapshot.caseProfile;

  const lines = [
    "MINUTA DE APOIO — ADEQUAR AO CASO CONCRETO E AO FLUXO INSTITUCIONAL VIGENTE",
    "",
    "DILIGÊNCIA / SOLICITAÇÃO DE COMPLEMENTAÇÃO",
    "",
    `Processo: ${caseProfile.seiProcessNumber || "[NUP DO PROCESSO]"}`,
    `Unidade escolar: ${caseProfile.schoolName || "[UNIDADE ESCOLAR]"}`,
    `CNPJ do CEC/UEx: ${caseProfile.uexCnpj || "[CNPJ]"}`,
    `Exercício: ${caseProfile.exercise || "[EXERCÍCIO]"}`,
    `Programa/Ação: ${caseProfile.programAction || "[PROGRAMA/AÇÃO]"}`,
    "",
    "Após conferência da documentação disponível nos autos, registram-se os seguintes apontamentos para esclarecimento, correção ou complementação, conforme o caso:",
    "",
  ];

  if (openFindings.length === 0) {
    lines.push("[NENHUM APONTAMENTO ABERTO REGISTRADO NA MESA DE ANÁLISE]");
  } else {
    openFindings.forEach((finding, index) => {
      const linkedItem = finding.checklistItemId
        ? checklistItemDefinitions.find((item) => item.id === finding.checklistItemId)
        : null;

      lines.push(`${index + 1}. ${finding.title}`);
      lines.push(
        `   Classificação: ${analysisFindingSeverityMeta[finding.severity].label}`,
      );
      if (linkedItem) {
        lines.push(`   Item relacionado: ${linkedItem.id}. ${linkedItem.text}`);
      }
      if (finding.description.trim()) {
        lines.push(`   Descrição: ${finding.description.trim()}`);
      }
      lines.push("");
    });
  }

  lines.push(
    "Providência de referência:",
    "Apresentar os esclarecimentos ou documentos pertinentes no mesmo processo SEI!RIO, observando a orientação formal vigente e a competência da unidade responsável pela análise.",
    "",
    "Esta minuta é apoio de redação. Não define prazo, autoridade decisória, aprovação, rejeição ou encerramento do processo.",
  );

  return lines.join("\n");
};
