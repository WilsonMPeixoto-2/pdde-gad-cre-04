import { AlertTriangle, CalendarClock, ExternalLink } from "lucide-react";

export const DeadlinesCalculator = () => {
  return (
    <section
      className="section-card border p-5 text-slate-900 sm:p-6 dark:text-slate-100"
      style={{
        backgroundColor: "#FFFBEB",
        borderColor: "#F59E0B",
        fontFamily: "var(--font-sans)",
      }}
      aria-labelledby="deadlines-notice-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <CalendarClock className="h-5 w-5" aria-hidden="true" />
          <AlertTriangle className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#FFFBEB] text-amber-700" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h3
            id="deadlines-notice-title"
            className="text-xl font-bold leading-tight text-slate-950 sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prazos: consulte o calendário formal do ciclo
          </h3>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-800 sm:text-[0.98rem]">
            <p>
              A data de 31 de dezembro corresponde, no regime federal aplicável à execução de 2026,
              ao encerramento do exercício financeiro, não sendo automaticamente o prazo de
              encaminhamento da prestação de contas da UEx/CEC à GAD.
            </p>
            <p>
              O prazo interno de remessa será aquele formalmente comunicado pela SME-Rio ou pela 4ª
              CRE para o respectivo ciclo.
            </p>
            <p>
              Para os recursos referentes ao exercício de 2026, o FNDE esclareceu que permanece
              possível a reprogramação dos saldos financeiros existentes.
            </p>
            <p className="font-bold text-slate-950">
              Não utilize esta página para presumir um prazo interno que ainda não tenha sido
              formalmente comunicado.
            </p>
          </div>

          <div className="mt-5 border-t border-amber-300 pt-4 text-xs leading-6 text-slate-700">
            <p>Base federal: Resolução CD/FNDE nº 15/2021, arts. 24 e 32.</p>
            <p>Atualização para 2026: Comunicado PDDE nº 01/2026.</p>
            <p>Verificação normativa: 02/07/2026.</p>

            <div className="mt-3 flex flex-wrap gap-3 font-semibold text-amber-800">
              <a
                href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/%40%40download/file"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline focus-visible:underline"
              >
                Resolução CD/FNDE nº 15/2021
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2026/comunicado-n-01_2026-alteracoes-na-resolucao-cd-fnde-no-7-2024-estorno-de-recurso.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline focus-visible:underline"
              >
                Comunicado PDDE nº 01/2026
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
