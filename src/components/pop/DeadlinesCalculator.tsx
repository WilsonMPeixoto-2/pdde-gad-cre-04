import { useState, useMemo } from "react";
import { Calendar, Clock, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { format, differenceInDays, parseISO, isAfter, isBefore, startOfYear, endOfYear } from "date-fns";
import { ptBR } from "date-fns/locale";

export const DeadlinesCalculator = () => {
  const [creditDateStr, setCreditDateStr] = useState<string>(() => {
    const today = new Date();
    return format(today, "yyyy-MM-dd");
  });

  const calculations = useMemo(() => {
    if (!creditDateStr) return null;

    try {
      const creditDate = parseISO(creditDateStr);
      const year = creditDate.getFullYear();
      
      // Official FNDE Deadline: 31st of December of the reference year
      const deadlineDate = endOfYear(creditDate);
      const today = new Date();
      
      // Sub-milestones based on GAD 4th CRE operational recommendation
      const purchaseLimitDate = new Date(year, 10, 30); // 30th of November
      const processAssemblyDate = new Date(year, 11, 15); // 15th of December

      const daysToDeadline = differenceInDays(deadlineDate, today);
      const isPast = isAfter(today, deadlineDate);

      // Progress calculation of the year from credit date to deadline
      const totalDays = differenceInDays(deadlineDate, creditDate);
      const elapsedDays = differenceInDays(today, creditDate);
      let progressPercent = 0;
      
      if (totalDays > 0) {
        progressPercent = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
      }

      let status: "info" | "success" | "warning" | "danger" = "success";
      let statusLabel = "Prazo Regular";
      let statusDesc = "Há tempo suficiente para organizar a instrução processual.";

      if (isPast) {
        status = "danger";
        statusLabel = "Vencido";
        statusDesc = "O prazo legal de entrega já expirou. Providencie a prestação de contas imediatamente.";
      } else if (daysToDeadline <= 30) {
        status = "danger";
        statusLabel = "Crítico";
        statusDesc = "Menos de 30 dias restantes! Organize as atas e remeta o processo com urgência.";
      } else if (daysToDeadline <= 60) {
        status = "warning";
        statusLabel = "Atenção";
        statusDesc = "Faltam menos de 60 dias. Verifique se há pendências nos extratos ou atas.";
      }

      return {
        year,
        creditDateFormatted: format(creditDate, "dd/MM/yyyy"),
        deadlineDateFormatted: format(deadlineDate, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
        purchaseLimitFormatted: format(purchaseLimitDate, "dd/MM/yyyy"),
        assemblyLimitFormatted: format(processAssemblyDate, "dd/MM/yyyy"),
        daysToDeadline,
        isPast,
        progressPercent,
        status,
        statusLabel,
        statusDesc,
      };
    } catch (e) {
      console.error("Erro ao calcular prazos:", e);
      return null;
    }
  }, [creditDateStr]);

  const resetToToday = () => {
    setCreditDateStr(format(new Date(), "yyyy-MM-dd"));
  };

  return (
    <div className="section-card border-l-4 border-l-sky-500 bg-linear-to-br from-secondary/40 via-background to-sky-50/20 p-5 sm:p-6 dark:from-secondary/15 dark:to-sky-950/15">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950/50">
            <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base sm:text-lg">
              Calculadora de Prazos Operacionais
            </h3>
            <p className="text-xs text-muted-foreground">
              Planeje as etapas do processo com base na data de crédito da verba
            </p>
          </div>
        </div>
        <button
          onClick={resetToToday}
          className="inline-flex items-center gap-1.5 self-start md:self-auto rounded-full border border-border/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition duration-200"
        >
          <RefreshCw className="w-3 h-3" />
          Hoje
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Input Pane */}
        <div className="space-y-4 rounded-2xl border border-border/60 bg-background/60 p-4 shadow-inner">
          <div>
            <label htmlFor="credit-date-input" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Data do Crédito em Conta
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                id="credit-date-input"
                type="date"
                value={creditDateStr}
                onChange={(e) => setCreditDateStr(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-background pl-10 pr-3 py-2 text-sm text-foreground focus:border-sky-500 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground leading-normal">
              Consulte no extrato do Banco do Brasil a data em que o recurso do PDDE Básico ou Integral foi creditado.
            </p>
          </div>
        </div>

        {/* Results Pane */}
        {calculations && (
          <div className="space-y-5">
            {/* Status Alert */}
            <div className={`flex items-start gap-3 rounded-2xl border p-4 ${
              calculations.status === "danger" 
                ? "border-red-200 bg-red-50/50 text-red-900 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300"
                : calculations.status === "warning"
                ? "border-amber-200 bg-amber-50/50 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300"
                : "border-emerald-200 bg-emerald-50/50 text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300"
            }`}>
              {calculations.status === "danger" ? (
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    {calculations.statusLabel}
                  </span>
                  {!calculations.isPast && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-background/80 shadow-xs">
                      {calculations.daysToDeadline} dias restantes
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed opacity-90">
                  {calculations.statusDesc}
                </p>
              </div>
            </div>

            {/* Timeline Progress */}
            {!calculations.isPast && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground font-semibold">
                  <span>Início do Planejamento</span>
                  <span>{Math.round(calculations.progressPercent)}% do prazo transcorrido</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      calculations.status === "danger" ? "bg-red-500" : calculations.status === "warning" ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${calculations.progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Sub-Milestones */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/50 bg-background/40 p-3 shadow-xs">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                  1. Executar Compras
                </span>
                <span className="font-semibold text-sm text-foreground">
                  Até {calculations.purchaseLimitFormatted}
                </span>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Prazo recomendado de encerramento das cotações e faturamento.
                </p>
              </div>

              <div className="rounded-xl border border-border/50 bg-background/40 p-3 shadow-xs">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                  2. Montar Processo
                </span>
                <span className="font-semibold text-sm text-foreground">
                  Até {calculations.assemblyLimitFormatted}
                </span>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Prazo recomendado para organizar a árvore e atas do CEC no SEI.
                </p>
              </div>

              <div className="rounded-xl border border-sky-200/50 bg-sky-50/30 p-3 shadow-xs dark:border-sky-800/40">
                <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider block mb-1">
                  3. Remessa Final
                </span>
                <span className="font-bold text-sm text-sky-600 dark:text-sky-400">
                  Até 31/12/{calculations.year}
                </span>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Data limite oficial para envio dos autos eletrônicos à GAD.
                </p>
              </div>
            </div>

            {/* Official Date Display */}
            <div className="border-t border-border/60 pt-4 flex flex-col sm:flex-row sm:justify-between text-xs text-muted-foreground gap-2">
              <span>Exercício de Referência: <strong>{calculations.year}</strong></span>
              <span className="sm:text-right">Data limite: <strong>{calculations.deadlineDateFormatted}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
