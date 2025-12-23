import { useState, useEffect } from "react";
import { CheckCircle2, Circle, ClipboardCheck } from "lucide-react";

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

const initialItems: ChecklistItem[] = [
  { id: 1, text: "Ofício de Prestação de Contas PDDE - Programa - CEC XXXX", checked: false },
  { id: 2, text: "Demonstrativo da Execução Financeira Anual - caso haja mais de um programa por conta bancária", checked: false },
  { id: 3, text: "Demonstrativo da Execução da Receita e da Despesa e de Pagamentos Efetuados", checked: false },
  { id: 4, text: "Conciliação Bancária Conta XXX", checked: false },
  { id: 5, text: "Extratos Conta Corrente", checked: false },
  { id: 6, text: "Extratos de Aplicações", checked: false },
  { id: 7, text: "Comprovantes de Despesas", checked: false },
  { id: 8, text: "Consolidação de Pesquisa de Preços", checked: false },
  { id: 9, text: "Planejamentos ou Planos de Ação com Ata", checked: false },
  { id: 10, text: "Cópia de Ata e/ou Justificativa, para situações excepcionais (não-execução de programa, depósito em conta e etc.)", checked: false },
  { id: 11, text: "Declaração da consulta a empresa de contabilidade", checked: false },
  { id: 12, text: "Declaração de lançamento no BB ágil", checked: false },
  { id: 13, text: "Parecer do Conselho Fiscal", checked: false },
  { id: 14, text: "Declaração do presidente do CEC da autenticidade dos documentos", checked: false },
  { id: 15, text: "Despacho da GAD para o Coordenador da CRE", checked: false },
  { id: 16, text: "Despacho do Coordenador da CRE com o publique-se", checked: false },
  { id: 17, text: "Lauda do D.O com a publicação da aprovação/aprovação com ressalvas/reprovação", checked: false },
  { id: 18, text: "Incluir o Relacionamento do processo de inventário", checked: false },
];

const STORAGE_KEY = "pdde-checklist-state";

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

  const completedCount = items.filter(item => item.checked).length;
  const progressPercent = (completedCount / items.length) * 100;

  const resetChecklist = () => {
    setItems(initialItems);
  };

  return (
    <div className="section-card border-l-4 border-l-primary">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base sm:text-lg">
              Checklist de Documentos - PDDE
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Marque os documentos já incluídos no processo
            </p>
          </div>
        </div>
        <button
          onClick={resetChecklist}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Limpar
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-semibold text-primary">
            {completedCount} de {items.length} ({Math.round(progressPercent)}%)
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 text-left group ${
              item.checked
                ? "bg-success/10 border-success/30 hover:bg-success/15"
                : "bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-primary/30"
            }`}
          >
            <div className="shrink-0 mt-0.5">
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
                {String(item.id).padStart(2, "0")}º
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

      {/* Completion Message */}
      {completedCount === items.length && (
        <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-xl text-center animate-fade-in">
          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="font-semibold text-success">Checklist Completo!</p>
          <p className="text-sm text-success/80">Todos os documentos foram marcados.</p>
        </div>
      )}
    </div>
  );
};
