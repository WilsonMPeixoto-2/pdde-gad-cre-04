import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, Circle, ClipboardCheck, FileCheck, AlertTriangle, Filter, Copy, Check, Download } from "lucide-react";
import { toast } from "sonner";
import { IconTile } from "@/components/visual/IconTile";
import { downloadTextFile } from "@/lib/clientFileExports";
import { externalResources } from "@/lib/externalResources";
import { useClipboardAction } from "@/hooks/useClipboardAction";
import {
  createChecklistItems,
  hydrateChecklistItems,
  PDDE_STORAGE_CLEAR_ALL_KEY,
  PDDE_STORAGE_EVENT,
  PDDE_STORAGE_KEYS,
  readStorageJson,
  writeStorageJson,
  type ChecklistItemState,
} from "@/lib/pddeOperationalData";

type FilterType = 'todos' | 'pendentes' | 'concluidos' | 'essenciais' | 'complementares';

let confettiModulePromise: Promise<typeof import("canvas-confetti")> | null = null;

const loadConfetti = () => {
  confettiModulePromise ??= import("canvas-confetti");
  return confettiModulePromise;
};

export const PDDEChecklist = () => {
  const hasConfettiFired = useRef(false);
  const [filter, setFilter] = useState<FilterType>('todos');
  const [items, setItems] = useState<ChecklistItemState[]>(() =>
    hydrateChecklistItems(readStorageJson(PDDE_STORAGE_KEYS.checklist, createChecklistItems())),
  );
  const { copiedValue: copiedKey, copyText } = useClipboardAction<"pending-summary">();

  useEffect(() => {
    writeStorageJson(PDDE_STORAGE_KEYS.checklist, items);
  }, [items]);

  useEffect(() => {
    const syncChecklist = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (detail?.key === PDDE_STORAGE_CLEAR_ALL_KEY) {
        setItems(hydrateChecklistItems(readStorageJson(PDDE_STORAGE_KEYS.checklist, createChecklistItems())));
        hasConfettiFired.current = false;
      }
    };

    window.addEventListener(PDDE_STORAGE_EVENT, syncChecklist as EventListener);
    return () => window.removeEventListener(PDDE_STORAGE_EVENT, syncChecklist as EventListener);
  }, []);

  const toggleItem = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const essenciaisCount = items.filter(item => !item.complementar).length;
  const essenciaisCompleted = items.filter(item => !item.complementar && item.checked).length;
  const completedCount = items.filter(item => item.checked).length;
  const progressPercent = (essenciaisCompleted / essenciaisCount) * 100;

  // Fire confetti when all essential items are completed
  useEffect(() => {
    let isActive = true;

    if (essenciaisCompleted === essenciaisCount && essenciaisCount > 0 && !hasConfettiFired.current) {
      hasConfettiFired.current = true;
      const end = Date.now() + 800;

      void loadConfetti().then(({ default: confetti }) => {
        if (!isActive) return;

        const fire = () => {
          confetti({
            particleCount: 30,
            angle: 60 + Math.random() * 60,
            spread: 55,
            origin: { x: Math.random(), y: 0.6 },
            colors: ['#2563eb', '#10b981', '#f59e0b'],
            zIndex: 9999,
          });
          if (Date.now() < end) requestAnimationFrame(fire);
        };

        fire();
      });
    }
    if (essenciaisCompleted < essenciaisCount) {
      hasConfettiFired.current = false;
    }

    return () => {
      isActive = false;
    };
  }, [essenciaisCompleted, essenciaisCount]);

  const resetChecklist = () => {
    setItems(createChecklistItems());
    hasConfettiFired.current = false;
  };

  // Filter logic
  const getFilteredItems = useCallback(() => {
    switch (filter) {
      case 'pendentes':
        return items.filter(item => !item.checked);
      case 'concluidos':
        return items.filter(item => item.checked);
      case 'essenciais':
        return items.filter(item => !item.complementar);
      case 'complementares':
        return items.filter(item => item.complementar);
      default:
        return items;
    }
  }, [items, filter]);

  const filteredItems = getFilteredItems();
  const essenciaisFiltered = filteredItems.filter(item => !item.complementar);
  const complementaresFiltered = filteredItems.filter(item => item.complementar);

  // Generate summary of pending items
  const generateSummary = useCallback(() => {
    const pending = items.filter(item => !item.checked);
    if (pending.length === 0) {
      toast.success("Todos os itens foram concluídos!");
      return;
    }

    const essenciaisPending = pending.filter(i => !i.complementar);
    const complementaresPending = pending.filter(i => i.complementar);

    let text = "Resumo dos itens pendentes — Prestação de Contas PDDE\n\n";

    if (essenciaisPending.length > 0) {
      text += "Bloco A — documentos federais mínimos:\n";
      essenciaisPending.forEach(item => {
        text += `- ${item.id}. ${item.text}\n`;
      });
      text += "\n";
    }

    if (complementaresPending.length > 0) {
      text += "Bloco B — INSTRUÇÃO LOCAL · SEI!RIO / SME-RIO:\n";
      complementaresPending.forEach(item => {
        text += `- ${item.text}\n`;
      });
    }

    text += `\nTotal pendente: ${pending.length} item(ns) — ${essenciaisPending.length} essencial(is), ${complementaresPending.length} complementar(es)`;

    void copyText("pending-summary", text).then((didCopy) => {
      if (didCopy) {
        toast.success("Resumo copiado para a área de transferência!");
        return;
      }

      toast.error("Erro ao copiar resumo");
    });
  }, [copyText, items]);

  const downloadSummary = useCallback(() => {
    const pending = items.filter((item) => !item.checked);
    const content = pending.length === 0
      ? "Checklist PDDE — todos os itens estão marcados como concluídos."
      : [
          "Checklist PDDE — itens pendentes",
          "",
          ...pending.map((item) => `- ${item.complementar ? "[Complementar]" : `[${item.id}]`} ${item.text}`),
        ].join("\n");

    downloadTextFile(content, "PDDE_CHECKLIST_PENDENCIAS.txt");
      toast.success("Lista baixada com sucesso.");
  }, [items]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'pendentes', label: `Pendentes (${items.filter(i => !i.checked).length})` },
    { key: 'concluidos', label: `Concluídos (${completedCount})` },
    { key: 'essenciais', label: 'Essenciais' },
    { key: 'complementares', label: 'Complementares' },
  ];

  const pendingCount = items.filter(i => !i.checked).length;

  return (
    <div className="section-card">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 border-b border-slate-300 pb-5 sm:flex-row sm:items-start sm:justify-between dark:border-slate-700">
        <div className="flex items-start gap-4">
          <IconTile icon={ClipboardCheck} size="lg" />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
              Conferência mínima
            </p>
            <h3 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
              Checklist mínimo — Prestação de Contas do PDDE (SEI!RIO)
            </h3>
            <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
              Use este quadro para separar o núcleo documental essencial dos anexos complementares e
              retomar a conferência sem perder o contexto do processo.
            </p>
          </div>
        </div>
        <button
          onClick={resetChecklist}
          className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-300"
          aria-label="Limpar todas as marcações do checklist"
        >
          Limpar
        </button>
      </div>

      {/* Intro */}
      <p className="mb-6 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
        O <strong className="text-foreground">Bloco A</strong> destaca o núcleo documental federal mínimo e as peças nucleares da comprovação. O <strong className="text-foreground">Bloco B</strong> reúne documentos complementares úteis para a instrução no <strong className="text-foreground">SEI!RIO</strong> e para o controle interno da CRE/SME. Pesquisa de preços admite exceções justificadas, e itens adicionais podem variar conforme a ação do PDDE, o exercício e as orientações locais vigentes.
      </p>

      {/* Progress Bar */}
      <div className="mb-5 rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/55">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Bloco A — base federal mínima</span>
          <span className="font-semibold text-primary">
            {essenciaisCompleted} de {essenciaisCount} ({Math.round(progressPercent)}%)
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-blue-700 transition-[width] duration-500 ease-out dark:bg-sky-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              filter === f.key
                ? 'border-blue-700 bg-blue-700 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950'
                : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-300'
            }`}
            aria-pressed={filter === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Summary Button */}
      {pendingCount > 0 && (
        <div className="mb-5 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={generateSummary}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800 transition-colors hover:border-blue-500 hover:bg-blue-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-blue-800 dark:bg-blue-950/25 dark:text-sky-300"
            aria-label={`Copiar resumo dos ${pendingCount} itens pendentes`}
          >
            <Copy className="w-4 h-4" aria-hidden="true" />
            {copiedKey === "pending-summary"
              ? "Resumo copiado"
              : `Copiar resumo do que falta (${pendingCount} ${pendingCount === 1 ? "item" : "itens"})`}
          </button>
          <button
            onClick={downloadSummary}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-blue-400 hover:text-blue-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-sky-600 dark:hover:text-sky-300"
            aria-label="Baixar resumo dos itens pendentes"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Baixar lista
          </button>
        </div>
      )}

      {/* Essenciais */}
      {essenciaisFiltered.length > 0 && (
        <div className="mb-7 space-y-3">
          <div className="mb-3">
            <h3 className="mb-1 flex items-center gap-2 text-base font-bold text-foreground">
            <FileCheck className="w-4 h-4" />
            Bloco A — Base documental federal da UEx
            </h3>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
              Núcleo da comprovação da execução e da prestação de contas, sem prejuízo de atos operacionais do exercício.
            </p>
          </div>
          {essenciaisFiltered.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
                className={`group flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  item.checked
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/25"
                    : "border-slate-300 bg-slate-50 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900/55 dark:hover:border-sky-600"
              }`}
              aria-label={`${item.checked ? 'Desmarcar' : 'Marcar'} item ${item.id}: ${item.text}`}
              aria-pressed={item.checked}
            >
              <div className="shrink-0 mt-0.5" aria-hidden="true">
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <span className={`font-semibold text-xs shrink-0 ${
                  item.checked ? "text-success" : "text-primary"
                }`}>
                  {item.id}.
                </span>
                <span className={`text-sm leading-relaxed ${
                  item.checked
                    ? "text-success line-through decoration-success/50"
                    : "text-foreground"
                }`}>
                  {item.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Complementares */}
      {complementaresFiltered.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-foreground">
            <FileCheck className="w-4 h-4" />
            Bloco B — INSTRUÇÃO LOCAL · SEI!RIO / SME-RIO
          </h3>
          <p className="mb-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
            Inclua quando o objeto, o fluxo local ou a rotina patrimonial/documental da CRE/SME exigir reforço da instrução.
          </p>
          <div className="space-y-2">
            {complementaresFiltered.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`group flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  item.checked
                    ? "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/25"
                    : "border-slate-300 bg-slate-50 hover:border-amber-400 dark:border-slate-700 dark:bg-slate-900/55 dark:hover:border-amber-700"
                }`}
                aria-label={`${item.checked ? 'Desmarcar' : 'Marcar'} item complementar: ${item.text}`}
                aria-pressed={item.checked}
              >
                <div className="shrink-0 mt-0.5" aria-hidden="true">
                  {item.checked ? (
                    <CheckCircle2 className="w-5 h-5 text-warning" />
                  ) : (
                    <Circle className="w-5 h-5 text-warning/50 group-hover:text-warning transition-colors" />
                  )}
                </div>
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className={`text-sm leading-relaxed ${
                    item.checked
                      ? "text-warning line-through decoration-warning/50"
                      : "text-foreground"
                  }`}>
                    {item.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state for filters */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Check className="w-8 h-8 mx-auto mb-2 text-success" />
          <p className="text-sm font-medium">Nenhum item nesta categoria.</p>
        </div>
      )}

      {/* Contextual Warnings */}
      {items.find(i => i.id === 10 && !i.checked) && (
        <div className="p-3.5 bg-warning/5 border border-warning/20 rounded-xl mb-4 flex items-start gap-3 animate-fade-in">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div>
                      <p className="mb-0.5 text-xs font-semibold text-amber-800 dark:text-amber-200">
                        Documentação patrimonial aplicável
                      </p>
                      <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Quando houver bem permanente, junte a documentação patrimonial cabível e observe o
              procedimento local formalmente validado.
            </p>
          </div>
        </div>
      )}

      {items.find(i => i.id === 4 && !i.checked) && essenciaisCompleted >= 4 && (
        <div className="p-3.5 bg-destructive/5 border border-destructive/20 rounded-xl mb-4 flex items-start gap-3 animate-fade-in">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-destructive text-xs mb-0.5">Extrato bancário pendente</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A ausência de extratos bancários do período integral do exercício é um dos principais motivos de <strong className="text-foreground">glosa</strong>. Providencie antes de avançar.
            </p>
          </div>
        </div>
      )}

      {/* Callout - Autenticação de digitalizados */}
      <div className="rounded-xl border border-blue-300 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/25">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary text-sm mb-1">Documento digitalizado e tipo de conferência</p>
            <p className="text-sm leading-7 text-blue-950 dark:text-blue-100">
              Documentos produzidos a partir de papel devem ser classificados como digitalizados no
              SEI!RIO e receber o tipo de conferência correspondente ao documento apresentado. Os
              originais físicos, quando houver, devem permanecer arquivados na unidade pelo prazo
              aplicável da{" "}
              <a
                href={externalResources.resolution15.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Resolução CD/FNDE nº 15/2021
              </a>
              . Para a classificação detalhada entre digitalizado e nato-digital, consulte o Tópico
              3.2.
            </p>
          </div>
        </div>
      </div>
      {/* Completion Message */}
      {essenciaisCompleted === essenciaisCount && (
        <div className="mt-6 animate-fade-in rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-center dark:border-emerald-800 dark:bg-emerald-950/25">
          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="font-semibold text-success">Itens essenciais completos!</p>
          <p className="text-sm text-success/80">Verifique os itens complementares quando aplicável.</p>
        </div>
      )}
    </div>
  );
};
