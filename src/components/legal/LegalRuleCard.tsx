import { Ban, BookOpenCheck, CheckCircle2 } from "lucide-react";
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
    <article className="flex h-full flex-col rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-300 pb-4 dark:border-slate-700">
        <LegalSourceBadge level={rule.level} status={rule.status} />
        <NormativeReviewStamp
          lastVerifiedAt={rule.lastVerifiedAt}
          status={rule.status}
          reviewedBy={rule.reviewedBy}
        />
      </div>

      <div className="pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
          Critério aplicável
        </p>
        <h3 className="mt-1.5 text-base font-bold tracking-[-0.015em] text-foreground sm:text-lg">
          {rule.title}
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
          {rule.summary}
        </p>
      </div>

      <div className={`mt-5 grid gap-4 ${hasProhibitions ? "xl:grid-cols-2" : ""}`}>
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
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">
              Base normativa e localização
            </p>
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
    </article>
  );
};
