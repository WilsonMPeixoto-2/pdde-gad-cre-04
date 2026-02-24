import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, Circle, ClipboardCheck, FileCheck, AlertTriangle, Filter, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
  complementar?: boolean;
}

const initialItems: ChecklistItem[] = [
  // Rol mínimo/essencial (Resolução CD/FNDE nº 15/2021, Art. 33)
  { id: 1, text: "Rol de materiais, bens e serviços priorizados (planejamento do gasto aprovado pelo Conselho/CEC)", checked: false },
  { id: 2, text: "Consolidação das pesquisas de preços — mínimo 3 cotações por item (ou justificativa pela não realização / uso de SRP)", checked: false },
  { id: 3, text: "Demonstrativo de execução da receita e da despesa e de pagamentos efetuados — gerado pelo SiGPC/Contas Online", checked: false },
  { id: 4, text: "Extratos bancários da conta do PDDE e das aplicações financeiras (período integral do exercício)", checked: false },
  { id: 5, text: "Conciliação bancária (obrigatória quando houver divergência entre extrato e demonstrativo, ou saldo em 31/12)", checked: false },
  { id: 6, text: "Documentos comprobatórios das despesas (NF/DANFE/cupom fiscal/recibos/RPA) + comprovantes de pagamento", checked: false },
  { id: 7, text: "Atas de aprovação do plano de gastos e da prestação de contas pelo Conselho Escolar/CEC", checked: false },
  // Complementares (quando aplicável)
  { id: 8, text: "Atesto/termo de recebimento e/ou evidência de entrega/execução (carimbo/declaração/fotos)", checked: false, complementar: true },
  { id: 9, text: "Relação de bens adquiridos ou produzidos (obrigatório quando houver despesa de capital)", checked: false, complementar: true },
  { id: 10, text: "Controle patrimonial — providência de incorporação dos bens ao patrimônio da escola (despesas de capital)", checked: false, complementar: true },
  { id: 11, text: "Comprovante de devolução/recolhimento de saldo ao FNDE (quando houver restituição)", checked: false, complementar: true },
  { id: 12, text: "Comprovante/protocolo de envio/registro no SiGPC/Contas Online (print ou recibo do sistema)", checked: false, complementar: true },
  { id: 13, text: "Termo de doação (quando houver doação de bens à escola pública vinculada)", checked: false, complementar: true },
];

type FilterType = 'todos' | 'pendentes' | 'concluidos' | 'essenciais' | 'complementares';

const STORAGE_KEY = "pdde-checklist-state-v3";

export const PDDEChecklist = () => {
  const hasConfettiFired = useRef(false);
  const [filter, setFilter] = useState<FilterType>('todos');
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialItems;
        }
      }
    }
    return initialItems;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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
    if (essenciaisCompleted === essenciaisCount && essenciaisCount > 0 && !hasConfettiFired.current) {
      hasConfettiFired.current = true;
      const end = Date.now() + 800;
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
    }
    if (essenciaisCompleted < essenciaisCount) {
      hasConfettiFired.current = false;
    }
  }, [essenciaisCompleted, essenciaisCount]);

  const resetChecklist = () => {
    setItems(initialItems);
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

    let text = "📋 RESUMO — Itens pendentes da Prestação de Contas PDDE\n\n";

    if (essenciaisPending.length > 0) {
      text += "⚠️ ESSENCIAIS (obrigatórios):\n";
      essenciaisPending.forEach(item => {
        text += `  ☐ ${item.id}. ${item.text}\n`;
      });
      text += "\n";
    }

    if (complementaresPending.length > 0) {
      text += "📎 COMPLEMENTARES (quando aplicável):\n";
      complementaresPending.forEach(item => {
        text += `  ☐ ${item.text}\n`;
      });
    }

    text += `\nTotal pendente: ${pending.length} item(ns) — ${essenciaisPending.length} essencial(is), ${complementaresPending.length} complementar(es)`;

    navigator.clipboard.writeText(text).then(() => {
      toast.success("Resumo copiado para a área de transferência!");
    }).catch(() => {
      toast.error("Erro ao copiar resumo");
    });
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
      <div className="flex items-center justify-between mb-4">
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
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none rounded px-1"
          aria-label="Limpar todas as marcações do checklist"
        >
          Limpar
        </button>
      </div>

      {/* Intro */}
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        Este é o <strong className="text-foreground">rol MÍNIMO/ESSENCIAL</strong> de documentos conforme <strong className="text-foreground">Resolução CD/FNDE nº 15/2021 (Art. 33)</strong>. Podem existir peças complementares conforme a ação do PDDE e orientações do FNDE.
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Itens essenciais</span>
          <span className="font-semibold text-primary">
            {essenciaisCompleted} de {essenciaisCount} ({Math.round(progressPercent)}%)
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
              filter === f.key
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
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
        <button
          onClick={generateSummary}
          className="w-full flex items-center justify-center gap-2 mb-5 py-2.5 px-4 rounded-lg border border-primary/30 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label={`Copiar resumo dos ${pendingCount} itens pendentes`}
        >
          <Copy className="w-4 h-4" aria-hidden="true" />
          Copiar resumo do que falta ({pendingCount} {pendingCount === 1 ? 'item' : 'itens'})
        </button>
      )}

      {/* Essenciais */}
      {essenciaisFiltered.length > 0 && (
        <div className="space-y-2 mb-6">
          {essenciaisFiltered.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 text-left group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
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
            Complementares (quando aplicável)
          </h3>
          <div className="space-y-2">
            {complementaresFiltered.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 text-left group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
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
            <p className="font-semibold text-warning text-xs mb-0.5">Despesa de capital detectada?</p>
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

      {/* Callout - Conferência do original */}
      <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary text-sm mb-1">Conferência do original</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quando houver documentos digitalizados, registre <strong className="text-foreground">"CONFERE COM O ORIGINAL"</strong>, com assinatura do responsável, e mantenha os originais arquivados na UEx.
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
