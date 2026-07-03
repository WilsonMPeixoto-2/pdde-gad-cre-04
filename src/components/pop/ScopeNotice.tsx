import { ExternalLink, ShieldCheck } from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { normativeSources } from "@/lib/normativeSources";
import { ProcessJourneyMap } from "./ProcessJourneyMap";

const sourceLinks = [
  normativeSources.resolution15_2021,
  normativeSources.resolution7_2024,
] as const;

export const ScopeNotice = () => (
  <div className="space-y-8">
    <section
      className="section-card border-l-4 border-l-blue-700 bg-blue-50/85 p-5 text-slate-800 sm:p-6 dark:border-l-blue-400 dark:bg-blue-950/22 dark:text-slate-100"
      aria-labelledby="scope-notice-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/45 dark:text-blue-200">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <span className="meta-pill border-blue-200 bg-white/70 text-blue-700 dark:border-blue-700/50 dark:bg-blue-950/40 dark:text-blue-200">
            ESCOPO DO GUIA
          </span>

          <h3 id="scope-notice-title" className="mt-3 text-xl font-bold leading-tight text-slate-950 sm:text-2xl dark:text-white">
            Escopo e limites deste guia
          </h3>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-[0.98rem] dark:text-slate-200">
            <p>
              Este material orienta a autuação, a instrução, a assinatura e a tramitação, no SEI!RIO,
              do processo local de prestação de contas do PDDE das UEx/CEC vinculadas à 4ª CRE.
            </p>
            <p>
              O processo administrativo municipal não substitui os registros, as classificações, os
              documentos ou os procedimentos exigidos pelo FNDE na Solução BB Gestão Ágil, no SiGPC ou
              em outro ambiente federal aplicável ao exercício.
            </p>
            <p>
              Em matéria de execução e prestação de contas dos recursos federais, prevalecem as normas
              do FNDE e os normativos específicos de cada ação integrada. Os prazos internos de remessa
              à GAD serão aqueles formalmente comunicados pela SME-Rio ou pela 4ª CRE para cada ciclo.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              Tipo processual, classificação, código da GAD, interessados, padrão de especificação, uso
              do CNPJ em observações e peças de encaminhamento são referências operacionais locais.
              Antes de tratá-las como obrigação definitiva, confirme a configuração atual do SEI!RIO e
              a orientação formal vigente da SME-Rio ou da 4ª CRE.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 border-t border-blue-200/80 pt-4 text-xs font-semibold text-blue-800 dark:border-blue-800/55 dark:text-blue-200">
            {sourceLinks.map((source) => (
              <a
                key={source.officialUrl}
                href={source.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline focus-visible:underline"
              >
                {source.title}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div id={GUIDE_ANCHORS.journey} className="scroll-mt-28">
      <ProcessJourneyMap />
    </div>
  </div>
);
