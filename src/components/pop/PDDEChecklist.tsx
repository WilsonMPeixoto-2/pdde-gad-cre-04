import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, Circle, ClipboardCheck, FileCheck, AlertTriangle, Filter, Copy, Check, Download } from "lucide-react";
import { toast } from "sonner";
import { downloadTextFile } from "@/lib/clientFileExports";
import { externalResources } from "@/lib/externalResources";
import {
  createChecklistItems,
  hydrateChecklistItems,
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

  useEffect(() => {
    writeStorageJson(PDDE_STORAGE_KEYS.checklist, items);
  }, [items]);

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
      text += "Bloco B — instrução complementar no SEI!RIO / controle interno:\n";
      complementaresPending.forEach(item => {
        text += `- ${item.text}\n`;
      });
    }

    text += `\nTotal pendente: ${pending.length} item(ns) — ${essenciaisPending.length} essencial(is), ${complementaresPending.length} complementar(es)`;

    navigator.clipboard.writeText(text).then(() => {
      toast.success("Resumo copiado para a área de transferência!");
    }).catch(() => {
      toast.error("Erro ao copiar resumo");
    });
  }, [items]);

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
    <div className="section-card border-l-4 border-l-primary">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground text-base sm:text-lg">
              Checklist mínimo — Prestação de Contas do PDDE (SEI!RIO)
            </h2>
          </div>
        </div>
        <button
          onClick={resetChecklist}
          className="inline-flex items-center justify-center rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Limpar todas as marcações do checklist"
        >
          Limpar
        </button>
      </div>

      {/* Intro */}
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        O <strong className="text-foreground">Bloco A</strong> destaca o núcleo documental federal mínimo e as peças nucleares da comprovação. O <strong className="text-foreground">Bloco B</strong> reúne documentos complementares úteis para a instrução no <strong className="text-foreground">SEI!RIO</strong> e para o controle interno da CRE/SME. Pesquisa de preços admite exceções justificadas, e itens adicionais podem variar conforme a ação do PDDE, o exercício e as orientações locais vigentes.
      </p>

      {/* Progress Bar */}
      <div className="mb-4 rounded-[1.35rem] border border-border/50 bg-secondary/35 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Bloco A — base federal mínima</span>
          <span className="font-semibold text-primary">
            {essenciaisCompleted} de {essenciaisCount} ({Math.round(progressPercent)}%)
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
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
            className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              filter === f.key
                ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                : 'bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground'
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
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Copiar resumo dos ${pendingCount} itens pendentes`}
          >
            <Copy className="w-4 h-4" aria-hidden="true" />
            Copiar resumo do que falta ({pendingCount} {pendingCount === 1 ? 'item' : 'itens'})
          </button>
          <button
            onClick={downloadSummary}
            className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Baixar resumo dos itens pendentes"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Baixar lista
          </button>
        </div>
      )}

      {/* Essenciais */}
      {essenciaisFiltered.length > 0 && (
        <div className="space-y-2 mb-6">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Bloco A — Documentos federais mínimos
            </h3>
            <p className="text-xs text-muted-foreground">
              Núcleo da comprovação da execução e da prestação de contas, sem prejuízo de atos operacionais do exercício.
            </p>
          </div>
          {essenciaisFiltered.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
                className={`group flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  item.checked
                    ? "bg-success/10 border-success/30 hover:bg-success/15"
                    : "bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-primary/30"
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
          <h3 className="text-sm font-semibold text-warning dark:text-warning mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            Bloco B — Instrução complementar no SEI!RIO / controle interno
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Inclua quando o objeto, o fluxo local ou a rotina patrimonial/documental da CRE/SME exigir reforço da instrução.
          </p>
          <div className="space-y-2">
            {complementaresFiltered.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`group flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  item.checked
                    ? "bg-warning/10 border-warning/30 hover:bg-warning/15"
                    : "bg-warning/5 border-warning/20 hover:bg-warning/10 hover:border-warning/40"
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
      {items.find(i => i.id === 9 && !i.checked) && items.find(i => i.id === 6 && i.checked) && (
        <div className="p-3.5 bg-warning/5 border border-warning/20 rounded-xl mb-4 flex items-start gap-3 animate-fade-in">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div>
                      <p className="font-semibold text-warning text-xs mb-0.5">Despesa de capital identificada</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Se houver despesa de capital, lembre-se de preencher a <strong className="text-foreground">Relação de bens</strong> e providenciar a <strong className="text-foreground">incorporação patrimonial</strong>.
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
      <div className="p-4 bg-linear-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary text-sm mb-1">Autenticação de documento digitalizado</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
                Quando o documento externo tiver sido <strong className="text-foreground">assinado ou carimbado em meio físico e depois digitalizado</strong>, a autenticação deve ser feita no momento da inserção do anexo por quem o encartar no processo, declarando que a cópia digital <strong className="text-foreground">"confere com o original"</strong>. Os originais e comprovantes devem permanecer arquivados na sede da UEx/unidade escolar pelo prazo de <strong className="text-foreground">5 anos</strong>, nos termos dos arts. 28 e 33, § 1º, I, da{" "}
                <a
                  href={externalResources.resolution15.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4"
              >
                Resolução CD/FNDE nº 15/2021
              </a>
              . Se o fluxo vigente da CRE/SME ainda exigir <strong className="text-foreground">declaração de autenticidade</strong> ou peça interna equivalente, inclua esse complemento nos autos.
            </p>
          </div>
        </div>
      </div>
      {/* Completion Message */}
      {essenciaisCompleted === essenciaisCount && (
        <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-xl text-center animate-fade-in">
          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="font-semibold text-success">Itens essenciais completos!</p>
          <p className="text-sm text-success/80">Verifique os itens complementares quando aplicável.</p>
        </div>
      )}
    </div>
  );
};
