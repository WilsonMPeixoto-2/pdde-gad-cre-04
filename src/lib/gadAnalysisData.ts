import {
  GUIDE_ANCHORS,
  type GuideAnchorId,
} from "@/lib/guideContent";
import {
  checklistItemDefinitions,
  PDDE_STORAGE_KEYS,
  readStorageJson,
  writeStorageJson,
} from "@/lib/pddeOperationalData";

export type AnalysisReviewStatus =
  | "not-reviewed"
  | "conform"
  | "issue"
  | "not-applicable";

export type AnalysisFindingSeverity =
  | "necessary"
  | "recommended"
  | "observation";

export type AnalysisFindingStatus = "open" | "resolved";

export interface GadAnalysisCase {
  schoolName: string;
  uexCnpj: string;
  exercise: string;
  programAction: string;
  seiProcessNumber: string;
  analystName: string;
}

export interface GadDocumentReview {
  id: string;
  title: string;
  group: string;
  guideAnchor: GuideAnchorId;
  status: AnalysisReviewStatus;
  note: string;
}

export interface GadAnalysisFinding {
  id: string;
  targetReviewId: string | null;
  title: string;
  description: string;
  severity: AnalysisFindingSeverity;
  status: AnalysisFindingStatus;
  createdAt: string;
  resolvedAt: string | null;
}

export interface GadAnalysisState {
  case: GadAnalysisCase;
  reviews: GadDocumentReview[];
  findings: GadAnalysisFinding[];
  updatedAt: string | null;
}

const reviewBlueprints = [
  { itemId: 1, group: "Planejamento", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 2, group: "Pesquisa de preços", guideAnchor: GUIDE_ANCHORS.rules },
  { itemId: 3, group: "Execução financeira", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 4, group: "Execução financeira", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 5, group: "Execução financeira", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 6, group: "Execução financeira", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 7, group: "Comprovação da despesa", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 8, group: "Governança da UEx", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 9, group: "Governança da UEx", guideAnchor: GUIDE_ANCHORS.documents },
  { itemId: 10, group: "Patrimônio", guideAnchor: GUIDE_ANCHORS.rules },
] as const;

const checklistById = new Map(checklistItemDefinitions.map((item) => [item.id, item]));

export const createDefaultDocumentReviews = (): GadDocumentReview[] =>
  reviewBlueprints.map((blueprint) => ({
    id: `document-${blueprint.itemId}`,
    title:
      checklistById.get(blueprint.itemId)?.text ??
      `Documento ${blueprint.itemId}`,
    group: blueprint.group,
    guideAnchor: blueprint.guideAnchor,
    status: "not-reviewed",
    note: "",
  }));

export const emptyGadAnalysisCase = (): GadAnalysisCase => ({
  schoolName: "",
  uexCnpj: "",
  exercise: "",
  programAction: "",
  seiProcessNumber: "",
  analystName: "",
});

export const emptyGadAnalysisState = (): GadAnalysisState => ({
  case: emptyGadAnalysisCase(),
  reviews: createDefaultDocumentReviews(),
  findings: [],
  updatedAt: null,
});

const reviewStatuses = new Set<AnalysisReviewStatus>([
  "not-reviewed",
  "conform",
  "issue",
  "not-applicable",
]);

const severities = new Set<AnalysisFindingSeverity>([
  "necessary",
  "recommended",
  "observation",
]);

const findingStatuses = new Set<AnalysisFindingStatus>(["open", "resolved"]);

const normalizeText = (value: unknown) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trimStart() : "";

export const sanitizeGadAnalysisState = (saved: unknown): GadAnalysisState => {
  const fallback = emptyGadAnalysisState();
  if (!saved || typeof saved !== "object") return fallback;

  const value = saved as Partial<GadAnalysisState>;
  const savedCase =
    value.case && typeof value.case === "object"
      ? (value.case as Partial<GadAnalysisCase>)
      : {};

  const caseState: GadAnalysisCase = {
    schoolName: normalizeText(savedCase.schoolName),
    uexCnpj: normalizeText(savedCase.uexCnpj),
    exercise: normalizeText(savedCase.exercise).slice(0, 4),
    programAction: normalizeText(savedCase.programAction),
    seiProcessNumber: normalizeText(savedCase.seiProcessNumber),
    analystName: normalizeText(savedCase.analystName),
  };

  const reviewMap = new Map<string, Partial<GadDocumentReview>>();
  if (Array.isArray(value.reviews)) {
    for (const review of value.reviews) {
      if (!review || typeof review !== "object") continue;
      const candidate = review as Partial<GadDocumentReview>;
      if (typeof candidate.id !== "string") continue;
      reviewMap.set(candidate.id, candidate);
    }
  }

  const reviews = createDefaultDocumentReviews().map((base) => {
    const savedReview = reviewMap.get(base.id);
    const status =
      savedReview?.status && reviewStatuses.has(savedReview.status)
        ? savedReview.status
        : base.status;

    return {
      ...base,
      status,
      note: normalizeText(savedReview?.note),
    };
  });

  const validReviewIds = new Set(reviews.map((review) => review.id));
  const findings = Array.isArray(value.findings)
    ? value.findings.flatMap((finding, index) => {
        if (!finding || typeof finding !== "object") return [];
        const candidate = finding as Partial<GadAnalysisFinding>;
        const title = normalizeText(candidate.title);
        const description = normalizeText(candidate.description);
        if (!title && !description) return [];

        const severity =
          candidate.severity && severities.has(candidate.severity)
            ? candidate.severity
            : "necessary";
        const status =
          candidate.status && findingStatuses.has(candidate.status)
            ? candidate.status
            : "open";
        const targetReviewId =
          typeof candidate.targetReviewId === "string" &&
          validReviewIds.has(candidate.targetReviewId)
            ? candidate.targetReviewId
            : null;

        return [
          {
            id:
              typeof candidate.id === "string" && candidate.id.trim()
                ? candidate.id
                : `finding-${index + 1}`,
            targetReviewId,
            title: title || "Apontamento sem título",
            description,
            severity,
            status,
            createdAt:
              typeof candidate.createdAt === "string"
                ? candidate.createdAt
                : new Date().toISOString(),
            resolvedAt:
              typeof candidate.resolvedAt === "string"
                ? candidate.resolvedAt
                : null,
          } satisfies GadAnalysisFinding,
        ];
      })
    : [];

  return {
    case: caseState,
    reviews,
    findings,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : null,
  };
};

export const loadGadAnalysisState = (): GadAnalysisState =>
  sanitizeGadAnalysisState(
    readStorageJson(PDDE_STORAGE_KEYS.gadAnalysis, emptyGadAnalysisState()),
  );

export const saveGadAnalysisState = (state: GadAnalysisState) => {
  const next = {
    ...state,
    updatedAt: new Date().toISOString(),
  };
  writeStorageJson(PDDE_STORAGE_KEYS.gadAnalysis, next);
  return next;
};

export const getAnalysisMetrics = (state: GadAnalysisState) => {
  const counts = {
    total: state.reviews.length,
    notReviewed: 0,
    conform: 0,
    issue: 0,
    notApplicable: 0,
    openFindings: state.findings.filter((finding) => finding.status === "open")
      .length,
  };

  for (const review of state.reviews) {
    switch (review.status) {
      case "conform":
        counts.conform += 1;
        break;
      case "issue":
        counts.issue += 1;
        break;
      case "not-applicable":
        counts.notApplicable += 1;
        break;
      default:
        counts.notReviewed += 1;
        break;
    }
  }

  return counts;
};

export const getAnalysisNextAction = (state: GadAnalysisState) => {
  const firstOpenFinding = state.findings.find(
    (finding) => finding.status === "open",
  );
  if (firstOpenFinding) {
    return {
      title: "Tratar apontamento em aberto",
      description: firstOpenFinding.title,
      target: "findings" as const,
    };
  }

  const firstIssue = state.reviews.find((review) => review.status === "issue");
  if (firstIssue) {
    return {
      title: "Formalizar a pendência identificada",
      description: firstIssue.title,
      target: firstIssue.id,
    };
  }

  const firstPending = state.reviews.find(
    (review) => review.status === "not-reviewed",
  );
  if (firstPending) {
    return {
      title: "Continuar a conferência documental",
      description: firstPending.title,
      target: firstPending.id,
    };
  }

  return {
    title: "Revisar a conclusão da conferência",
    description:
      "Todos os itens documentais receberam um estado. Revise os apontamentos antes de produzir a manifestação cabível.",
    target: "summary" as const,
  };
};

const reviewStatusLabels: Record<AnalysisReviewStatus, string> = {
  "not-reviewed": "Não conferido",
  conform: "Conforme",
  issue: "Pendência",
  "not-applicable": "Não se aplica",
};

const severityLabels: Record<AnalysisFindingSeverity, string> = {
  necessary: "Ajuste necessário",
  recommended: "Ajuste recomendável",
  observation: "Observação",
};

export const buildGadAnalysisSummary = (state: GadAnalysisState) => {
  const metrics = getAnalysisMetrics(state);
  const nextAction = getAnalysisNextAction(state);
  const lines = [
    "Resumo da análise documental — PDDE",
    "",
    `Unidade escolar: ${state.case.schoolName || "Não informado"}`,
    `CNPJ do CEC/UEx: ${state.case.uexCnpj || "Não informado"}`,
    `Exercício: ${state.case.exercise || "Não informado"}`,
    `Programa/Ação: ${state.case.programAction || "Não informado"}`,
    `Processo SEI!RIO: ${state.case.seiProcessNumber || "Não informado"}`,
    `Responsável pela análise: ${state.case.analystName || "Não informado"}`,
    "",
    "Indicadores da conferência",
    `- Conforme: ${metrics.conform}`,
    `- Pendência: ${metrics.issue}`,
    `- Não conferido: ${metrics.notReviewed}`,
    `- Não se aplica: ${metrics.notApplicable}`,
    `- Apontamentos em aberto: ${metrics.openFindings}`,
    "",
    "Documentos",
  ];

  for (const review of state.reviews) {
    lines.push(
      `- [${reviewStatusLabels[review.status]}] ${review.title}${review.note ? ` — ${review.note}` : ""}`,
    );
  }

  lines.push("", "Apontamentos");
  if (state.findings.length === 0) {
    lines.push("- Nenhum apontamento registrado.");
  } else {
    for (const finding of state.findings) {
      const review = state.reviews.find(
        (item) => item.id === finding.targetReviewId,
      );
      lines.push(
        `- [${severityLabels[finding.severity]} · ${finding.status === "open" ? "Aberto" : "Resolvido"}] ${finding.title}${review ? ` · ${review.title}` : ""}${finding.description ? ` — ${finding.description}` : ""}`,
      );
    }
  }

  lines.push(
    "",
    "Próxima ação sugerida",
    `- ${nextAction.title}: ${nextAction.description}`,
    "",
    "Observação",
    "- Este resumo registra a conferência realizada pelo usuário. O sistema não declara regularidade, aprovação ou conclusão decisória de forma automática.",
  );

  return lines.join("\n");
};
