import { AlertTriangle, CalendarClock, ExternalLink } from "lucide-react";
import { IconTile } from "@/components/visual/IconTile";

export const DeadlinesCalculator = () => {
  return (
    <section
      className="section-card border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/25"
      aria-labelledby="deadlines-notice-title"
    >
      <div className="flex items-start gap-4">
        <IconTile icon={CalendarClock} size="lg" tone="warning" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">
              Atenção aos prazos
            </p>
            <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-300" aria-hidden="true" />
          </div>

          <h3
            id="deadlines-notice-title"
            className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl"
          >
            Prazos: consulte o calendário formal do ciclo
          </h3>

          <div className="mt-4 max-w-[72ch] space-y-3 text-sm leading-7 text-amber-950 dark:text-amber-100">
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
            <p className="font-bold">
              Não utilize esta página para presumir um prazo interno que ainda não tenha sido
              formalmente comunicado.
            </p>
          </div>

          <div className="mt-5 border-t border-amber-300 pt-4 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:text-amber-200">
            <p>Base federal: Resolução CD/FNDE nº 15/2021, arts. 24 e 32.</p>
            <p>Atualização para 2026: Comunicado PDDE nº 01/2026.</p>
            <p>Verificação normativa: 02/07/2026.</p>

            <div className="mt-3 flex flex-wrap gap-3 font-semibold">
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
