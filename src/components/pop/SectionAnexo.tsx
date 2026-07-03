import {
  ExternalLink,
  Gavel,
  MapPinned,
  Scale,
} from "lucide-react";
import { ApplicabilityMatrix } from "@/components/legal/ApplicabilityMatrix";
import { SectionLead } from "@/components/visual/SectionLead";
import { localOperationalRules } from "@/lib/localOperationalRules";
import { normativeSources, type NormativeSourceId } from "@/lib/normativeSources";

const federalSourceIds = [
  "resolution15_2021",
  "resolution7_2024",
  "comunicado47_2024",
  "comunicado01_2026",
  "bbGestaoAgilFaq",
] as const satisfies readonly NormativeSourceId[];

const municipalSourceIds = [
  "decretoRio47769_2020",
  "seiRioCriarProcesso",
  "seiRioIncluirDocumentos",
  "seiRioBlocoAssinatura",
] as const satisfies readonly NormativeSourceId[];

const SourceCard = ({ sourceId, level }: { sourceId: NormativeSourceId; level: "federal" | "municipal" }) => {
  const source = normativeSources[sourceId];
  const levelLabel = level === "federal" ? "Fonte federal" : "Fonte municipal";
  const Icon = level === "federal" ? Gavel : Scale;

  return (
    <a
      href={source.officialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-xl border border-slate-300 bg-slate-50 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/55 dark:hover:border-sky-500 dark:hover:bg-slate-900"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-sky-300">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">
          {levelLabel}
        </p>
        <p className="mt-1 text-sm font-bold leading-6 text-foreground">{source.title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">{source.issuingBody}</p>
      </div>
      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-blue-800 dark:text-sky-300" aria-hidden="true" />
    </a>
  );
};

export const SectionAnexo = () => (
  <section id="anexo" className="scroll-mt-20 space-y-8">
    <SectionLead
      eyebrow="Consulta de referência"
      title="Fontes oficiais e aplicabilidade"
      description="Esta seção reúne a matriz temporal e os documentos oficiais utilizados pelo guia. A explicação das peças permanece na Etapa 2; aqui ficam somente as fontes necessárias para verificar fundamento, vigência e alcance."
      icon={Scale}
    />

    <section className="section-card" aria-labelledby="applicability-title">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
          Recorte temporal
        </p>
        <h3 id="applicability-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
          Aplicabilidade por exercício
        </h3>
        <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
          Utilize a matriz para identificar quais orientações estão verificadas e quais ainda dependem de validação específica antes de serem aplicadas ao processo.
        </p>
      </div>
      <ApplicabilityMatrix />
    </section>

    <section className="section-card" aria-labelledby="federal-sources-title">
      <header className="border-b border-slate-300 pb-4 dark:border-slate-700">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
          Programa e sistemas federais
        </p>
        <h3 id="federal-sources-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
          Fontes federais prioritárias
        </h3>
        <p className="mt-2 max-w-[72ch] text-sm leading-6 text-slate-700 dark:text-slate-300">
          Consulte a resolução-base, seus atos modificadores e as orientações específicas do exercício ou do ambiente federal utilizado.
        </p>
      </header>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {federalSourceIds.map((sourceId) => (
          <SourceCard key={sourceId} sourceId={sourceId} level="federal" />
        ))}
      </div>
    </section>

    <section className="section-card" aria-labelledby="municipal-sources-title">
      <header className="border-b border-slate-300 pb-4 dark:border-slate-700">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-800 dark:text-teal-300">
          Processo eletrônico municipal
        </p>
        <h3 id="municipal-sources-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
          Fontes municipais e guias do SEI!RIO
        </h3>
        <p className="mt-2 max-w-[72ch] text-sm leading-6 text-slate-700 dark:text-slate-300">
          Estas referências orientam o tratamento documental e o uso do sistema, sem substituir as regras federais do PDDE.
        </p>
      </header>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {municipalSourceIds.map((sourceId) => (
          <SourceCard key={sourceId} sourceId={sourceId} level="municipal" />
        ))}
      </div>
    </section>

    <aside className="section-card border-l-4 border-l-amber-700" aria-labelledby="local-validation-title">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-400 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-yellow-300">
          <MapPinned className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 id="local-validation-title" className="text-base font-bold text-foreground">
            Orientações locais ainda dependem de homologação
          </h3>
          <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
            O registro de governança contém {localOperationalRules.length} referências operacionais locais pendentes de fonte ou validação formal. Enquanto permanecerem nesse estado, elas devem ser apresentadas como referência provisória, e não como obrigação institucional definitiva.
          </p>
        </div>
      </div>
    </aside>
  </section>
);
