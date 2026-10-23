import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileSearch,
  Plus,
  ShieldAlert,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/visual/IconTile";
import { downloadTextFile } from "@/lib/clientFileExports";
import {
  analysisFindingSeverityMeta,
  analysisFindingStatusMeta,
  analysisReviewStatusMeta,
  buildAnalysisSummaryText,
  createAnalysisFinding,
  deriveAnalysisMetrics,
  getAnalysisNextAction,
  readAnalysisSnapshot,
  updateAnalysisReview,
  writeAnalysisSnapshot,
  type AnalysisCaseProfile,
  type AnalysisFindingSeverity,
  type AnalysisFindingStatus,
  type AnalysisReviewStatus,
  type AnalysisSnapshot,
} from "@/lib/pddeAnalysisData";
import {
  PDDE_STORAGE_CLEAR_ALL_KEY,
  PDDE_STORAGE_EVENT,
  checklistItemDefinitions,
  normalizeWorkspaceFieldValue,
} from "@/lib/pddeOperationalData";
import { DataPersistenceNotice } from "./DataPersistenceNotice";

type ReviewFilter = "all" | AnalysisReviewStatus;

const statusTone: Record<AnalysisReviewStatus, string> = {
  not_reviewed:
    "border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300",
  conform:
    "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/25 dark:text-emerald-200",
  pending:
    "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/25 dark:text-amber-200",
  not_applicable:
    "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-800 dark:bg-violet-950/25 dark:text-violet-200",
};

const findingSeverityTone: Record<AnalysisFindingSeverity, string> = {
  info:
    "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/25 dark:text-blue-200",
  warning:
    "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/25 dark:text-amber-200",
  critical:
    "border-red-300 bg-red-50 text-red-950 dark:border-red-800 dark:bg-red-950/25 dark:text-red-200",
};

const caseFields: {
  key: keyof Pick<
    AnalysisCaseProfile,
    | "schoolName"
    | "uexCnpj"
    | "exercise"
    | "seiProcessNumber"
    | "programAction"
    | "analystName"
  >;
  label: string;
  placeholder: string;
  helper: string;
}[] = [
  {
    key: "schoolName",
    label: "Unidade escolar",
    placeholder: "Ex.: E.M. João Barbalho",
    helper: "Use a designação oficial da unidade.",
  },
  {
    key: "uexCnpj",
    label: "CNPJ do CEC/UEx",
    placeholder: "00.000.000/0001-00",
    helper: "Identifica a unidade executora analisada.",
  },
  {
    key: "exercise",
    label: "Exercício",
    placeholder: "2026",
    helper: "Evita mistura entre ciclos diferentes.",
  },
  {
    key: "programAction",
    label: "Programa / ação",
    placeholder: "Ex.: PDDE Básico, Educação Conectada",
    helper: "Define o recorte material da análise.",
  },
  {
    key: "seiProcessNumber",
    label: "NUP do processo no SEI!RIO",
    placeholder: "000704.000123/2026-45",
    helper: "O NUP fica somente na sessão atual do navegador.",
  },
  {
    key: "analystName",
    label: "Responsável pela análise",
    placeholder: "Nome do servidor responsável",
    helper: "Registra quem está conduzindo a conferência.",
  },
];

const normalizeCaseValue = (
  key: (typeof caseFields)[number]["key"],
  value: string,
) => {
  if (key === "schoolName") return normalizeWorkspaceFieldValue("schoolName", value);
  if (key === "uexCnpj") return normalizeWorkspaceFieldValue("uexCnpj", value);
  if (key === "exercise") return normalizeWorkspaceFieldValue("exercise", value);
  if (key === "seiProcessNumber")
    return normalizeWorkspaceFieldValue("seiProcessNumber", value);
  if (key === "analystName")
    return normalizeWorkspaceFieldValue("responsibleName", value);
  return value.trimStart().slice(0, 140);
};

export const GadAnalysisWorkspace = () => {
  const [snapshot, setSnapshot] = useState<AnalysisSnapshot>(() => readAnalysisSnapshot());
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const [findingTitle, setFindingTitle] = useState("");
  const [findingDescription, setFindingDescription] = useState("");
  const [findingSeverity, setFindingSeverity] =
    useState<AnalysisFindingSeverity>("warning");
  const [findingChecklistId, setFindingChecklistId] = useState<string>("");

  useEffect(() => {
    writeAnalysisSnapshot(snapshot);
  }, [snapshot]);

  useEffect(() => {
    const handleStorageReset = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (detail?.key === PDDE_STORAGE_CLEAR_ALL_KEY) {
        setSnapshot(readAnalysisSnapshot());
      }
    };

    window.addEventListener(PDDE_STORAGE_EVENT, handleStorageReset as EventListener);
    return () =>
      window.removeEventListener(PDDE_STORAGE_EVENT, handleStorageReset as EventListener);
  }, []);

  const metrics = useMemo(() => deriveAnalysisMetrics(snapshot), [snapshot]);
  const nextAction = useMemo(
    () => getAnalysisNextAction(snapshot, metrics),
    [snapshot, metrics],
  );

  const visibleReviews = useMemo(
    () =>
      snapshot.reviews.filter(
        (review) => reviewFilter === "all" || review.status === reviewFilter,
      ),
    [reviewFilter, snapshot.reviews],
  );

  const updateCaseField = (
    key: (typeof caseFields)[number]["key"],
    value: string,
  ) => {
    setSnapshot((current) => ({
      ...current,
      caseProfile: {
        ...current.caseProfile,
        [key]: normalizeCaseValue(key, value),
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const setReviewStatus = (itemId: number, status: AnalysisReviewStatus) => {
    setSnapshot((current) => updateAnalysisReview(current, itemId, { status }));
  };

  const setReviewNote = (itemId: number, note: string) => {
    setSnapshot((current) =>
      updateAnalysisReview(current, itemId, { note: note.slice(0, 1200) }),
    );
  };

  const addFinding = () => {
    const title = findingTitle.trim();
    if (!title) return;

    const finding = createAnalysisFinding({
      title,
      description: findingDescription.trim(),
      severity: findingSeverity,
      status: "open",
      checklistItemId: findingChecklistId ? Number(findingChecklistId) : null,
    });

    setSnapshot((current) => ({
      ...current,
      findings: [finding, ...current.findings],
    }));

    setFindingTitle("");
    setFindingDescription("");
    setFindingSeverity("warning");
    setFindingChecklistId("");
  };

  const updateFindingStatus = (
    findingId: string,
    status: AnalysisFindingStatus,
  ) => {
    setSnapshot((current) => ({
      ...current,
      findings: current.findings.map((finding) =>
        finding.id === findingId
          ? {
              ...finding,
              status,
              updatedAt: new Date().toISOString(),
            }
          : finding,
      ),
    }));
  };

  const exportSummary = () => {
    const school =
      snapshot.caseProfile.schoolName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .toUpperCase() || "UNIDADE";
    const exercise = snapshot.caseProfile.exercise || "SEM_EXERCICIO";

    downloadTextFile(
      buildAnalysisSummaryText(snapshot, metrics),
      `PDDE_ANALISE_GAD_${exercise}_${school}.txt`,
    );
  };

  return (
    <main
      id="mesa-analise-gad"
      className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:py-10"
      aria-labelledby="gad-analysis-title"
      data-testid="gad-analysis-workspace"
    >
      <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <header className="border-b border-slate-300 p-5 sm:p-6 dark:border-slate-700">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <IconTile icon={FileSearch} size="lg" />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
                  Modo GAD · fiscalização
                </p>
                <h1
                  id="gad-analysis-title"
                  className="mt-1.5 text-2xl font-extrabold tracking-[-0.04em] text-foreground sm:text-3xl"
                >
                  Mesa de Análise da Prestação de Contas
                </h1>
                <p className="mt-3 max-w-[78ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                  Registre o caso, classifique cada item da conferência e transforme inconsistências em apontamentos rastreáveis. O guia continua disponível abaixo como referência normativa e operacional.
                </p>
              </div>
            </div>

            <Button variant="outline" className="gap-2" onClick={exportSummary}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Exportar resumo
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-2 border-b border-slate-300 xl:grid-cols-4 dark:border-slate-700">
          {[
            {
              id: "reviewed",
              label: "Conferidos",
              value: `${metrics.reviewedItems}/${metrics.totalItems}`,
              detail: `${metrics.progressPercent}% da matriz`,
              tone: "text-blue-800 dark:text-sky-300",
            },
            {
              id: "pending",
              label: "Pendências",
              value: String(metrics.pendingItems),
              detail: "itens classificados",
              tone: "text-amber-800 dark:text-amber-300",
            },
            {
              id: "findings",
              label: "Apontamentos",
              value: String(metrics.openFindings),
              detail: "ainda abertos",
              tone: "text-violet-800 dark:text-violet-300",
            },
            {
              id: "critical",
              label: "Críticos",
              value: String(metrics.criticalOpenFindings),
              detail: "exigem atenção",
              tone: "text-red-800 dark:text-red-300",
            },
          ].map((metric, index) => (
            <div
              key={metric.id}
              data-testid={`analysis-metric-${metric.id}`}
              className={[
                "p-4 sm:p-5",
                index % 2 === 0 ? "border-r border-slate-300 dark:border-slate-700" : "",
                index < 2 ? "border-b border-slate-300 xl:border-b-0 dark:border-slate-700" : "",
                index === 2 ? "xl:border-r xl:border-slate-300 dark:xl:border-slate-700" : "",
              ].join(" ")}
            >
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                {metric.label}
              </span>
              <strong className={`mt-2 block text-2xl font-extrabold tracking-[-0.04em] ${metric.tone}`}>
                {metric.value}
              </strong>
              <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-300">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="grid gap-0 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <section
            className="border-b border-slate-300 p-5 sm:p-6 xl:border-b-0 xl:border-r dark:border-slate-700"
            aria-labelledby="analysis-case-title"
          >
            <div className="flex items-center gap-3">
              <UserRoundCheck className="h-5 w-5 text-blue-800 dark:text-sky-300" aria-hidden="true" />
              <h2 id="analysis-case-title" className="text-lg font-bold text-foreground">
                Identificação do caso
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {caseFields.map((field) => (
                <label key={field.key} className="block">
                  <span className="text-sm font-bold text-foreground">{field.label}</span>
                  <input
                    value={snapshot.caseProfile[field.key]}
                    onChange={(event) => updateCaseField(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-500"
                  />
                  <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {field.helper}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <aside className="p-5 sm:p-6" aria-labelledby="analysis-next-action-title">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
              Próxima ação
            </p>
            <h2 id="analysis-next-action-title" className="mt-2 text-lg font-bold text-foreground">
              {nextAction.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {nextAction.description}
            </p>

            <div className="mt-5">
              <DataPersistenceNotice />
            </div>
          </aside>
        </div>
      </section>

      <section
        className="mt-8 rounded-xl border border-slate-300 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-950"
        aria-labelledby="analysis-matrix-title"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
              Matriz de conferência
            </p>
            <h2 id="analysis-matrix-title" className="mt-1.5 text-xl font-bold text-foreground sm:text-2xl">
              Classifique cada item pelo resultado da análise
            </h2>
            <p className="mt-2 max-w-[76ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
              A presença do documento não equivale a conformidade. Registre o resultado e use a observação para indicar a evidência ou a inconsistência encontrada.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Filtros da matriz de análise">
            {([
              ["all", "Todos"],
              ["not_reviewed", "Não conferidos"],
              ["conform", "Conformes"],
              ["pending", "Pendências"],
              ["not_applicable", "Não se aplica"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setReviewFilter(key)}
                className={[
                  "rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                  reviewFilter === key
                    ? "border-blue-700 bg-blue-700 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950"
                    : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-300",
                ].join(" ")}
                aria-pressed={reviewFilter === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4" data-testid="analysis-review-list">
          {visibleReviews.map((review) => {
            const definition = checklistItemDefinitions.find((item) => item.id === review.id);
            if (!definition) return null;

            return (
              <article
                key={review.id}
                className={`rounded-xl border p-4 sm:p-5 ${statusTone[review.status]}`}
                data-testid="analysis-review-item"
              >
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-current/20 bg-white/60 text-sm font-bold dark:bg-slate-950/30">
                        {review.id}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold leading-6">{definition.text}</h3>
                        <p className="mt-1 text-xs leading-5 opacity-80">
                          {definition.complementar
                            ? "Peça complementar do processo local"
                            : "Núcleo documental de referência"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(analysisReviewStatusMeta) as AnalysisReviewStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setReviewStatus(review.id, status)}
                          className={[
                            "rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                            review.status === status
                              ? "border-current bg-current/10"
                              : "border-current/20 bg-white/60 hover:bg-white dark:bg-slate-950/30 dark:hover:bg-slate-950/60",
                          ].join(" ")}
                          aria-pressed={review.status === status}
                          aria-label={`Item ${review.id}: ${analysisReviewStatusMeta[status].label}`}
                        >
                          {analysisReviewStatusMeta[status].shortLabel}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <label className="mt-4 block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] opacity-80">
                    Evidência / observação
                  </span>
                  <textarea
                    value={review.note}
                    onChange={(event) => setReviewNote(review.id, event.target.value)}
                    rows={2}
                    placeholder={
                      review.status === "pending"
                        ? "Descreva objetivamente a inconsistência encontrada."
                        : "Registre a evidência conferida ou uma observação útil."
                    }
                    className="mt-1.5 w-full resize-y rounded-lg border border-current/20 bg-white/80 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </label>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="mt-8 rounded-xl border border-slate-300 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-950"
        aria-labelledby="analysis-findings-title"
      >
        <div className="flex items-start gap-4">
          <IconTile icon={ShieldAlert} size="lg" tone="warning" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">
              Apontamentos
            </p>
            <h2 id="analysis-findings-title" className="mt-1.5 text-xl font-bold text-foreground sm:text-2xl">
              Registre o problema como entidade rastreável
            </h2>
            <p className="mt-2 max-w-[76ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
              Um apontamento pode permanecer aberto, aguardar resposta e depois ser marcado como resolvido. Isso preserva a história da análise em vez de substituir a anotação anterior.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-xl border border-slate-300 bg-slate-50 p-4 lg:grid-cols-2 dark:border-slate-700 dark:bg-slate-900/55">
          <label>
            <span className="text-sm font-bold text-foreground">Título do apontamento</span>
            <input
              value={findingTitle}
              onChange={(event) => setFindingTitle(event.target.value)}
              placeholder="Ex.: Pesquisa de preços incompleta"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>

          <label>
            <span className="text-sm font-bold text-foreground">Vincular ao item da matriz</span>
            <select
              value={findingChecklistId}
              onChange={(event) => setFindingChecklistId(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="">Sem vínculo específico</option>
              {checklistItemDefinitions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}. {item.text}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm font-bold text-foreground">Gravidade</span>
            <select
              value={findingSeverity}
              onChange={(event) =>
                setFindingSeverity(event.target.value as AnalysisFindingSeverity)
              }
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
            >
              {(Object.keys(analysisFindingSeverityMeta) as AnalysisFindingSeverity[]).map(
                (severity) => (
                  <option key={severity} value={severity}>
                    {analysisFindingSeverityMeta[severity].label}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="lg:row-span-2">
            <span className="text-sm font-bold text-foreground">Descrição</span>
            <textarea
              value={findingDescription}
              onChange={(event) => setFindingDescription(event.target.value)}
              rows={5}
              placeholder="Descreva o fato observado de forma objetiva, sem antecipar a conclusão final."
              className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>

          <div className="flex items-end">
            <Button onClick={addFinding} disabled={!findingTitle.trim()} className="gap-2">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Registrar apontamento
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-4" data-testid="analysis-findings-list">
          {snapshot.findings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-900/45">
              <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold text-foreground">
                Nenhum apontamento registrado.
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                Isso significa apenas que não há apontamentos cadastrados nesta análise, não uma declaração de regularidade.
              </p>
            </div>
          ) : (
            snapshot.findings.map((finding) => {
              const linkedItem = finding.checklistItemId
                ? checklistItemDefinitions.find((item) => item.id === finding.checklistItemId)
                : null;

              return (
                <article
                  key={finding.id}
                  className={`rounded-xl border p-4 sm:p-5 ${findingSeverityTone[finding.severity]}`}
                  data-testid="analysis-finding"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-current/20 bg-white/60 px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] dark:bg-slate-950/30">
                          {analysisFindingSeverityMeta[finding.severity].label}
                        </span>
                        <span className="text-xs font-semibold opacity-80">
                          {analysisFindingStatusMeta[finding.status].label}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-bold">{finding.title}</h3>
                      {finding.description ? (
                        <p className="mt-2 max-w-[78ch] whitespace-pre-wrap text-sm leading-7">
                          {finding.description}
                        </p>
                      ) : null}
                      {linkedItem ? (
                        <p className="mt-3 text-xs font-semibold opacity-80">
                          Vinculado a: {linkedItem.id}. {linkedItem.text}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(analysisFindingStatusMeta) as AnalysisFindingStatus[]).map(
                        (status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateFindingStatus(finding.id, status)}
                            className={[
                              "rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                              finding.status === status
                                ? "border-current bg-current/10"
                                : "border-current/20 bg-white/60 hover:bg-white dark:bg-slate-950/30 dark:hover:bg-slate-950/60",
                            ].join(" ")}
                            aria-pressed={finding.status === status}
                          >
                            {analysisFindingStatusMeta[status].label}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <aside className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/25">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-800 dark:text-amber-300" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-bold text-amber-950 dark:text-amber-100">
              Limite do MVP
            </h2>
            <p className="mt-1 text-sm leading-6 text-amber-950 dark:text-amber-100">
              Esta primeira mesa de análise organiza a conferência e os apontamentos no navegador. Ela ainda não substitui o registro oficial no SEI!RIO, não compartilha casos entre servidores e não representa manifestação conclusiva da Administração.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
};
