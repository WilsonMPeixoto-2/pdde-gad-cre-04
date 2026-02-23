import { useState, useEffect } from "react";
import { CheckCircle2, Circle, ClipboardCheck, FileCheck, AlertTriangle } from "lucide-react";

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

const STORAGE_KEY = "pdde-checklist-state-v3";

export const PDDEChecklist = () => {
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

  const resetChecklist = () => {
    setItems(initialItems);
  };

  const essenciais = items.filter(item => !item.complementar);
  const complementares = items.filter(item => item.complementar);

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
      <div className="mb-6">
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

      {/* Essenciais */}
      <div className="space-y-2 mb-6">
        {essenciais.map((item) => (
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

      {/* Complementares */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
          <FileCheck className="w-4 h-4" />
          Complementares (quando aplicável)
        </h3>
        <div className="space-y-2">
          {complementares.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 text-left group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
                item.checked
                  ? "bg-amber-50 dark:bg-amber-950/30 border-amber-300/50 hover:bg-amber-100/50"
                  : "bg-amber-50/30 dark:bg-amber-950/10 border-amber-200/30 hover:bg-amber-50/60 hover:border-amber-300/50"
              }`}
              aria-label={`${item.checked ? 'Desmarcar' : 'Marcar'} item complementar: ${item.text}`}
              aria-pressed={item.checked}
            >
              <div className="shrink-0 mt-0.5" aria-hidden="true">
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                ) : (
                  <Circle className="w-5 h-5 text-amber-400 group-hover:text-amber-600 transition-colors" />
                )}
              </div>
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <span className={`text-sm leading-relaxed ${
                  item.checked
                    ? "text-amber-700 dark:text-amber-400 line-through decoration-amber-400/50"
                    : "text-foreground"
                }`}>
                  {item.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Callout - Conferência do original */}
      <div className="p-4 bg-gradient-to-r from-sky-50 to-sky-100/50 dark:from-sky-950/40 dark:to-sky-900/20 border border-sky-200/60 dark:border-sky-800/40 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sky-800 dark:text-sky-300 text-sm mb-1">Conferência do original</p>
            <p className="text-sm text-sky-700 dark:text-sky-400 leading-relaxed">
              Quando houver documentos digitalizados, registre <strong>"CONFERE COM O ORIGINAL"</strong>, com assinatura do responsável, e mantenha os originais arquivados na UEx.
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
