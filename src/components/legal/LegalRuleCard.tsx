import { Ban, BookOpenCheck, CheckCircle2, ChevronDown } from "lucide-react";
import type { NormativeRule } from "@/lib/normativeSources";
import { LegalSourceBadge } from "./LegalSourceBadge";
import { NormativeReviewStamp } from "./NormativeReviewStamp";
import { SourceCitation } from "./SourceCitation";

type LegalRuleCardProps = {
  rule: NormativeRule;
};

export const LegalRuleCard = ({ rule }: LegalRuleCardProps) => {
  const hasProhibitions = Boolean(rule.prohibitedActions?.length);

  return (
    <details className="legal-rule-card group rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/55">
      <summary className="cursor-pointer list-none p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset dark:focus-visible:ring-sky-400 [&::-webkit-details-marker]:hidden">
        <span className="flex flex-wrap items-center gap-2">
          <LegalSourceBadge level={rule.level} status={rule.status} />
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">
            Critério aplicável
          </span>
        </span>

        <span className="mt-4 block text-base font-bold tracking-[-0.015em] text-foreground sm:text-lg">
          {rule.title}
        </span>
        <span className="mt-2 block text-sm leading-7 text-slate-700 dark:text-slate-300">
          {rule.summary}
        </span>

        <span className="mt-4 flex items-center justify-between gap-3 border-t border-slate-300 pt-3 text-sm font-bold text-blue-800 dark:border-slate-700 dark:text-sky-300">
          <span className="group-open:hidden">Ver orientação</span>
          <span className="hidden group-open:inline">Ocultar orientação</span>
          <ChevronDown
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>

      <div className="legal-rule-card__details border-t border-slate-300 px-5 pb-5 pt-5 dark:border-slate-700">
        <div className={`grid gap-4 ${hasProhibitions ? "xl:grid-cols-2" : ""}`}>
          <section
            className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/25"
            aria-label="Conduta correta"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-emerald-800 dark:text-emerald-300">
                  Conduta correta
                </p>
                <h4 className="mt-1 text-sm font-bold text-emerald-950 dark:text-emerald-100">
                  O que fazer
                </h4>
              </div>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-950 dark:text-emerald-100">
              {rule.practicalGuidance.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700 dark:bg-emerald-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {hasProhibitions ? (
            <section
              className="rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20"
              aria-label="Conduta vedada"
            >
              <div className="flex items-start gap-3">
                <Ban className="mt-0.5 h-5 w-5 shrink-0 text-red-700 dark:text-red-300" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-red-700 dark:text-red-300">
                    Conduta vedada
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-red-950 dark:text-red-100">
                    O que não fazer
                  </h4>
                </div>
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-red-950 dark:text-red-100">
                {rule.prohibitedActions?.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700 dark:bg-red-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <footer className="mt-5 border-t border-slate-300 pt-4 dark:border-slate-700">
          <div className="flex items-start gap-3">
            <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-800 dark:text-sky-300" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">
                  Base normativa e localização
                </p>
                <NormativeReviewStamp
                  lastVerifiedAt={rule.lastVerifiedAt}
                  status={rule.status}
                  reviewedBy={rule.reviewedBy}
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {rule.legalReferences.map((reference) => (
                  <SourceCitation
                    key={`${reference.sourceId}-${reference.articles?.join(".") ?? ""}-${reference.sections?.join(".") ?? ""}`}
                    reference={reference}
                  />
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </details>
  );
};
