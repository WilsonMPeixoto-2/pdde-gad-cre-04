import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  ClipboardCheck,
  Download,
  FileSearch,
  Link2,
  ListChecks,
  MessageSquareWarning,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataPersistenceNotice } from "@/components/pop/DataPersistenceNotice";
import {
  buildGadAnalysisSummary,
  getAnalysisMetrics,
  getAnalysisNextAction,
  loadGadAnalysisState,
  saveGadAnalysisState,
  type AnalysisFindingSeverity,
  type AnalysisReviewStatus,
  type GadAnalysisFinding,
  type GadAnalysisState,
} from "@/lib/gadAnalysisData";
import {
  normalizeWorkspaceFieldValue,
} from "@/lib/pddeOperationalData";
import { downloadTextFile } from "@/lib/clientFileExports";
import {
  requestGuideAnchorPreload,
  scrollToGuideAnchor,
} from "@/lib/guideNavigation";

type WorkbenchTab = "documents" | "findings";
type ReviewFilter = "all" | AnalysisReviewStatus;

const reviewStatusOptions: {
  value: AnalysisReviewStatus;
  label: string;
}[] = [
  { value: "not-reviewed", label: "Não conferido" },
  { value: "conform", label: "Conforme" },
  { value: "issue", label: "Pendência" },
  { value: "not-applicable", label: "Não se aplica" },
];

const severityOptions: {
  value: AnalysisFindingSeverity;
  label: string;
}[] = [
  { value: "necessary", label: "Ajuste necessário" },
  { value: "recommended", label: "Ajuste recomendável" },
  { value: "observation", label: "Observação" },
];

const statusClasses: Record<AnalysisReviewStatus, string> = {
  "not-reviewed":
    "border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300",
  conform:
    "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/25 dark:text-emerald-200",
  issue:
    "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/25 dark:text-red-200",
  "not-applicable":
    "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-800 dark:bg-violet-950/25 dark:text-violet-200",
};

const severityClasses: Record<AnalysisFindingSeverity, string> = {
  necessary:
    "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/25 dark:text-red-200",
  recommended:
    "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/25 dark:text-amber-200",
  observation:
    "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/25 dark:text-blue-200",
};

const buildSummaryFileName = (state: GadAnalysisState) => {
  const exercise = state.case.exercise.trim() || "sem-exercicio";
  const school =
    state.case.schoolName
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .toUpperCase() || "UNIDADE";

  return `PDDE_ANALISE_GAD_${exercise}_${school}.txt`;
};

export const GadAnalysisWorkbench = () => {
  const [state, setState] = useState<GadAnalysisState>(loadGadAnalysisState);
  const [tab, setTab] = useState<WorkbenchTab>("documents");
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const [findingDraft, setFindingDraft] = useState({
    targetReviewId: "",
    title: "",
    description: "",
    severity: "necessary" as AnalysisFindingSeverity,
  });

  const metrics = useMemo(() => getAnalysisMetrics(state), [state]);
  const nextAction = useMemo(() => getAnalysisNextAction(state), [state]);

  const visibleReviews = useMemo(
    () =>
      state.reviews.filter(
        (review) => reviewFilter === "all" || review.status === reviewFilter,
      ),
    [reviewFilter, state.reviews],
  );

  const commit = (updater: (current: GadAnalysisState) => GadAnalysisState) => {
    setState((current) => saveGadAnalysisState(updater(current)));
  };

  const updateCaseField = (
    key: keyof GadAnalysisState["case"],
    rawValue: string,
  ) => {
    let value = rawValue;

    if (key === "schoolName") {
      value = normalizeWorkspaceFieldValue("schoolName", rawValue);
    } else if (key === "uexCnpj") {
      value = normalizeWorkspaceFieldValue("uexCnpj", rawValue);
    } else if (key === "exercise") {
      value = normalizeWorkspaceFieldValue("exercise", rawValue);
    } else if (key === "seiProcessNumber") {
      value = normalizeWorkspaceFieldValue("seiProcessNumber", rawValue);
    } else if (key === "analystName") {
      value = normalizeWorkspaceFieldValue("responsibleName", rawValue);
    }

    commit((current) => ({
      ...current,
      case: {
        ...current.case,
        [key]: value,
      },
    }));
  };

  const updateReviewStatus = (
    reviewId: string,
    status: AnalysisReviewStatus,
  ) => {
    commit((current) => ({
      ...current,
      reviews: current.reviews.map((review) =>
        review.id === reviewId ? { ...review, status } : review,
      ),
    }));
  };

  const updateReviewNote = (reviewId: string, note: string) => {
    commit((current) => ({
      ...current,
      reviews: current.reviews.map((review) =>
        review.id === reviewId ? { ...review, note } : review,
      ),
    }));
  };

  const beginFinding = (reviewId?: string) => {
    const review = reviewId
      ? state.reviews.find((item) => item.id === reviewId)
      : undefined;

    setFindingDraft({
      targetReviewId: review?.id ?? "",
      title: review ? `Apontamento — ${review.title}` : "",
      description: review?.note ?? "",
      severity: "necessary",
    });
    setTab("findings");
    window.requestAnimationFrame(() => {
      document
        .getElementById("gad-finding-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const addFinding = () => {
    const title = findingDraft.title.trim();
    const description = findingDraft.description.trim();

    if (!title && !description) {
      toast.error("Descreva o apontamento antes de registrar.");
      return;
    }

    const finding: GadAnalysisFinding = {
      id: `finding-${Date.now()}`,
      targetReviewId: findingDraft.targetReviewId || null,
      title: title || "Apontamento sem título",
      description,
      severity: findingDraft.severity,
      status: "open",
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };

    commit((current) => ({
      ...current,
      findings: [finding, ...current.findings],
    }));

    setFindingDraft({
      targetReviewId: "",
      title: "",
      description: "",
      severity: "necessary",
    });
    toast.success("Apontamento registrado.");
  };

  const toggleFindingStatus = (findingId: string) => {
    commit((current) => ({
      ...current,
      findings: current.findings.map((finding) => {
        if (finding.id !== findingId) return finding;
        const resolved = finding.status === "open";
        return {
          ...finding,
          status: resolved ? "resolved" : "open",
          resolvedAt: resolved ? new Date().toISOString() : null,
        };
      }),
    }));
  };

  const jumpToNextAction = () => {
    if (nextAction.target === "findings") {
      setTab("findings");
      return;
    }

    if (nextAction.target === "summary") {
      document
        .getElementById("gad-analysis-summary")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setTab("documents");
    setReviewFilter("all");
    window.requestAnimationFrame(() => {
      document
        .getElementById(`gad-review-${nextAction.target}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const resetFilters = () => setReviewFilter("all");

  const exportSummary = () => {
    downloadTextFile(buildGadAnalysisSummary(state), buildSummaryFileName(state));
    toast.success("Resumo da análise preparado para download.");
  };

  const caseFields: {
    key: keyof GadAnalysisState["case"];
    label: string;
    placeholder: string;
  }[] = [
    {
      key: "schoolName",
      label: "Unidade escolar",
      placeholder: "Nome oficial da unidade",
    },
    {
      key: "uexCnpj",
      label: "CNPJ do CEC/UEx",
      placeholder: "00.000.000/0001-00",
    },
    {
      key: "exercise",
      label: "Exercício",
      placeholder: "2026",
    },
    {
      key: "programAction",
      label: "Programa / ação",
      placeholder: "Ex.: PDDE Básico",
    },
    {
      key: "seiProcessNumber",
      label: "NUP do processo",
      placeholder: "000704.000123/2026-45",
    },
    {
      key: "analystName",
      label: "Responsável pela análise",
      placeholder: "Nome do servidor",
    },
  ];

  const kpis: {
    key: ReviewFilter;
    label: string;
    value: number;
    detail: string;
    icon: typeof CircleDashed;
    tone: string;
  }[] = [
    {
      key: "not-reviewed",
      label: "Não conferidos",
      value: metrics.notReviewed,
      detail: "aguardando análise",
      icon: CircleDashed,
      tone: "text-slate-700 dark:text-slate-200",
    },
    {
      key: "conform",
      label: "Conformes",
      value: metrics.conform,
      detail: "marcados pelo analista",
      icon: CheckCircle2,
      tone: "text-emerald-800 dark:text-emerald-300",
    },
    {
      key: "issue",
      label: "Pendências",
      value: metrics.issue,
      detail: "itens com ressalva",
      icon: AlertTriangle,
      tone: "text-red-800 dark:text-red-300",
    },
    {
      key: "not-applicable",
      label: "Não se aplica",
      value: metrics.notApplicable,
      detail: "afastados no caso concreto",
      icon: ListChecks,
      tone: "text-violet-800 dark:text-violet-300",
    },
  ];

  return (
    <section
      id="gad-analysis-workbench"
      className="scroll-mt-20 space-y-6"
      aria-labelledby="gad-analysis-title"
    >
      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <header className="border-b border-slate-300 p-5 sm:p-6 dark:border-slate-700">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
                Modo GAD · fiscalização do caso
              </p>
              <h2
                id="gad-analysis-title"
                className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-foreground sm:text-3xl"
              >
                Mesa de Análise da Prestação de Contas
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                Registre a conferência documental do caso, os apontamentos e a próxima ação. O guia permanece disponível abaixo como base de consulta.
              </p>
            </div>

            <Button
              variant="outline"
              className="shrink-0 gap-2"
              onClick={exportSummary}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Exportar resumo
            </Button>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/25 dark:text-amber-100">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              <strong>Registro de apoio à análise.</strong> Os estados “Conforme”, “Pendência” e “Não se aplica” são marcações do usuário. O sistema não declara regularidade, aprovação ou conclusão decisória automaticamente.
            </p>
          </div>
        </header>

        <div className="grid gap-px bg-slate-300 sm:grid-cols-2 xl:grid-cols-6 dark:bg-slate-700">
          {caseFields.map((field) => (
            <label
              key={field.key}
              className="bg-white p-4 dark:bg-slate-950"
            >
              <span className="block text-xs font-bold uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300">
                {field.label}
              </span>
              <input
                value={state.case[field.key]}
                onChange={(event) =>
                  updateCaseField(field.key, event.target.value)
                }
                placeholder={field.placeholder}
                className="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-slate-400 focus:ring-0 dark:placeholder:text-slate-500"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-slate-300 bg-white xl:grid-cols-4 dark:border-slate-700 dark:bg-slate-950">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const active = reviewFilter === kpi.key;

          return (
            <button
              key={kpi.key}
              type="button"
              onClick={() =>
                setReviewFilter(active ? "all" : kpi.key)
              }
              className={[
                "min-w-0 p-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset dark:hover:bg-slate-900/70 dark:focus-visible:ring-sky-400",
                active ? "bg-blue-50 dark:bg-blue-950/25" : "",
                index % 2 === 0
                  ? "border-r border-slate-300 dark:border-slate-700"
                  : "",
                index < 2
                  ? "border-b border-slate-300 xl:border-b-0 dark:border-slate-700"
                  : "",
                index === 2
                  ? "xl:border-r xl:border-slate-300 dark:xl:border-slate-700"
                  : "",
              ].join(" ")}
              aria-pressed={active}
              aria-label={`Filtrar análise por ${kpi.label}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300">
                  {kpi.label}
                </span>
                <Icon className={`h-4 w-4 ${kpi.tone}`} aria-hidden="true" />
              </div>
              <strong className={`mt-2 block text-3xl font-extrabold tracking-[-0.04em] ${kpi.tone}`}>
                {kpi.value}
              </strong>
              <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-300">
                {kpi.detail}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="gad-analysis-summary"
        className="grid overflow-hidden rounded-xl border border-slate-300 bg-white lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] dark:border-slate-700 dark:bg-slate-950"
      >
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-blue-800 dark:text-sky-300">
            Próxima ação sugerida
          </p>
          <h3 className="mt-2 text-lg font-bold tracking-[-0.02em] text-foreground">
            {nextAction.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {nextAction.description}
          </p>
          <Button className="mt-4" size="sm" onClick={jumpToNextAction}>
            Continuar análise
          </Button>
        </div>

        <aside className="border-t border-slate-300 bg-slate-50 p-5 lg:border-l lg:border-t-0 dark:border-slate-700 dark:bg-slate-900/55">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
            Apontamentos
          </p>
          <strong className="mt-2 block text-2xl font-extrabold tracking-[-0.04em] text-red-800 dark:text-red-300">
            {metrics.openFindings} em aberto
          </strong>
          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
            {state.findings.length} registro(s) no histórico deste caso.
          </p>
        </aside>
      </div>

      <DataPersistenceNotice />

      <div className="rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950">
        <div className="flex flex-wrap gap-2 border-b border-slate-300 p-3 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setTab("documents")}
            className={[
              "inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors",
              tab === "documents"
                ? "bg-blue-700 text-white dark:bg-sky-400 dark:text-slate-950"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
            ].join(" ")}
            aria-pressed={tab === "documents"}
          >
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Conferência documental
          </button>
          <button
            type="button"
            onClick={() => setTab("findings")}
            className={[
              "inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors",
              tab === "findings"
                ? "bg-blue-700 text-white dark:bg-sky-400 dark:text-slate-950"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
            ].join(" ")}
            aria-pressed={tab === "findings"}
          >
            <MessageSquareWarning className="h-4 w-4" aria-hidden="true" />
            Apontamentos
            {metrics.openFindings > 0 ? (
              <span className="rounded-md bg-red-100 px-1.5 py-0.5 text-xs text-red-900 dark:bg-red-950/40 dark:text-red-200">
                {metrics.openFindings}
              </span>
            ) : null}
          </button>
        </div>

        {tab === "documents" ? (
          <div className="p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Matriz de análise documental
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  A presença do documento não implica conformidade. Registre o resultado da conferência e, se necessário, abra um apontamento.
                </p>
              </div>
              {reviewFilter !== "all" ? (
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Limpar filtro
                </Button>
              ) : null}
            </div>

            <div className="space-y-3">
              {visibleReviews.map((review) => (
                <article
                  key={review.id}
                  id={`gad-review-${review.id}`}
                  className={`scroll-mt-28 rounded-xl border p-4 sm:p-5 ${statusClasses[review.status]}`}
                  data-review-status={review.status}
                >
                  <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_13rem] xl:items-start">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.08em] opacity-75">
                        {review.group}
                      </p>
                      <h4 className="mt-1.5 text-base font-bold leading-6">
                        {review.title}
                      </h4>
                    </div>

                    <label>
                      <span className="sr-only">
                        Resultado da conferência de {review.title}
                      </span>
                      <select
                        value={review.status}
                        onChange={(event) =>
                          updateReviewStatus(
                            review.id,
                            event.target.value as AnalysisReviewStatus,
                          )
                        }
                        className="w-full rounded-lg border border-current/20 bg-white px-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-950 dark:text-slate-100"
                      >
                        {reviewStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <label>
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.08em] opacity-75">
                        Nota da análise
                      </span>
                      <textarea
                        rows={2}
                        value={review.note}
                        onChange={(event) =>
                          updateReviewNote(review.id, event.target.value)
                        }
                        placeholder="Registre apenas a observação necessária para sustentar a análise."
                        className="w-full resize-y rounded-lg border border-current/20 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onMouseEnter={() =>
                          requestGuideAnchorPreload(review.guideAnchor)
                        }
                        onFocus={() =>
                          requestGuideAnchorPreload(review.guideAnchor)
                        }
                        onClick={() =>
                          scrollToGuideAnchor(review.guideAnchor, {
                            focusHeading: true,
                          })
                        }
                      >
                        <Link2 className="h-4 w-4" aria-hidden="true" />
                        Consultar guia
                      </Button>

                      {review.status === "issue" ? (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => beginFinding(review.id)}
                        >
                          <MessageSquareWarning
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          Registrar apontamento
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}

              {visibleReviews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/45">
                  <p className="text-sm font-bold text-foreground">
                    Nenhum item corresponde ao filtro atual.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={resetFilters}
                  >
                    Mostrar todos
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <section
              id="gad-finding-form"
              className="border-b border-slate-300 p-4 sm:p-5 lg:border-b-0 lg:border-r dark:border-slate-700"
              aria-labelledby="gad-finding-form-title"
            >
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-blue-800 dark:text-sky-300">
                Novo registro
              </p>
              <h3
                id="gad-finding-form-title"
                className="mt-1.5 text-lg font-bold text-foreground"
              >
                Registrar apontamento
              </h3>

              <div className="mt-4 space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    Vincular a
                  </span>
                  <select
                    value={findingDraft.targetReviewId}
                    onChange={(event) =>
                      setFindingDraft((current) => ({
                        ...current,
                        targetReviewId: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="">Caso geral</option>
                    {state.reviews.map((review) => (
                      <option key={review.id} value={review.id}>
                        {review.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    Classificação
                  </span>
                  <select
                    value={findingDraft.severity}
                    onChange={(event) =>
                      setFindingDraft((current) => ({
                        ...current,
                        severity: event.target
                          .value as AnalysisFindingSeverity,
                      }))
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
                  >
                    {severityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    Título
                  </span>
                  <input
                    value={findingDraft.title}
                    onChange={(event) =>
                      setFindingDraft((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Ex.: Pesquisa de preços incompleta"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    Descrição
                  </span>
                  <textarea
                    rows={5}
                    value={findingDraft.description}
                    onChange={(event) =>
                      setFindingDraft((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Descreva o fato observado, sem antecipar conclusão além do que os autos permitem."
                    className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />
                </label>

                <Button className="w-full" onClick={addFinding}>
                  Registrar apontamento
                </Button>
              </div>
            </section>

            <section
              className="p-4 sm:p-5"
              aria-labelledby="gad-findings-list-title"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                    Histórico do caso
                  </p>
                  <h3
                    id="gad-findings-list-title"
                    className="mt-1.5 text-lg font-bold text-foreground"
                  >
                    Apontamentos registrados
                  </h3>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => beginFinding()}
                >
                  Novo
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {state.findings.map((finding) => {
                  const linkedReview = state.reviews.find(
                    (review) => review.id === finding.targetReviewId,
                  );

                  return (
                    <article
                      key={finding.id}
                      className="rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/55"
                      data-finding-status={finding.status}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`rounded-md border px-2 py-1 text-xs font-bold ${severityClasses[finding.severity]}`}
                            >
                              {
                                severityOptions.find(
                                  (option) =>
                                    option.value === finding.severity,
                                )?.label
                              }
                            </span>
                            <span
                              className={`rounded-md border px-2 py-1 text-xs font-bold ${
                                finding.status === "open"
                                  ? "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/25 dark:text-red-200"
                                  : "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/25 dark:text-emerald-200"
                              }`}
                            >
                              {finding.status === "open"
                                ? "Aberto"
                                : "Resolvido"}
                            </span>
                          </div>

                          <h4 className="mt-3 text-base font-bold text-foreground">
                            {finding.title}
                          </h4>
                          {linkedReview ? (
                            <p className="mt-1 text-xs font-semibold text-blue-800 dark:text-sky-300">
                              Vinculado a: {linkedReview.title}
                            </p>
                          ) : null}
                        </div>

                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => toggleFindingStatus(finding.id)}
                        >
                          {finding.status === "open"
                            ? "Marcar resolvido"
                            : "Reabrir"}
                        </Button>
                      </div>

                      {finding.description ? (
                        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                          {finding.description}
                        </p>
                      ) : null}
                    </article>
                  );
                })}

                {state.findings.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/45">
                    <FileSearch
                      className="mx-auto h-6 w-6 text-slate-500"
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-sm font-bold text-foreground">
                      Nenhum apontamento registrado.
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Registre apenas achados que precisem permanecer rastreáveis no caso.
                    </p>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  );
};
