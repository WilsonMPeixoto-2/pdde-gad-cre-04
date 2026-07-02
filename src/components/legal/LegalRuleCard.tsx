import type { NormativeRule } from "@/lib/normativeSources";
import { LegalSourceBadge } from "./LegalSourceBadge";
import { NormativeReviewStamp } from "./NormativeReviewStamp";
import { SourceCitation } from "./SourceCitation";

type LegalRuleCardProps = {
  rule: NormativeRule;
};

export const LegalRuleCard = ({ rule }: LegalRuleCardProps) => {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LegalSourceBadge level={rule.level} status={rule.status} />
        <NormativeReviewStamp
          lastVerifiedAt={rule.lastVerifiedAt}
          status={rule.status}
          reviewedBy={rule.reviewedBy}
        />
      </div>

      <h3 className="mt-4 text-xl font-bold text-slate-950">{rule.title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{rule.summary}</p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">O que fazer</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {rule.practicalGuidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {rule.prohibitedActions?.length ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-red-700">Não faça</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {rule.prohibitedActions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Base normativa</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {rule.legalReferences.map((reference) => (
            <SourceCitation
              key={`${reference.sourceId}-${reference.articles?.join(".") ?? ""}-${reference.sections?.join(".") ?? ""}`}
              reference={reference}
            />
          ))}
        </div>
      </div>
    </article>
  );
};
