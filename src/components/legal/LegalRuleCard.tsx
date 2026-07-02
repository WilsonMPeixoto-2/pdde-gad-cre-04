import type { NormativeRule } from "@/lib/normativeSources";
import { LegalSourceBadge } from "./LegalSourceBadge";
import { NormativeReviewStamp } from "./NormativeReviewStamp";
import { SourceCitation } from "./SourceCitation";
import { cn } from "@/lib/utils";

type LegalRuleCardProps = {
  rule: NormativeRule;
};

export const LegalRuleCard = ({ rule }: LegalRuleCardProps) => {
  // Determine gradient border matching the normative level
  const borderLevelClass = 
    rule.level === "federal" 
      ? "hover:border-[hsl(var(--gov-federal)/0.4)]"
      : rule.level === "municipal"
        ? "hover:border-[hsl(var(--gov-municipal)/0.4)]"
        : "hover:border-[hsl(var(--gov-local)/0.4)]";

  return (
    <article 
      className={cn(
        "card-juridico relative flex flex-col justify-between h-full border border-border/60",
        borderLevelClass
      )}
    >
      <div>
        {/* Header Stamps & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/30 pb-3">
          <LegalSourceBadge level={rule.level} status={rule.status} />
          <NormativeReviewStamp
            lastVerifiedAt={rule.lastVerifiedAt}
            status={rule.status}
            reviewedBy={rule.reviewedBy}
          />
        </div>

        {/* Title & Summary */}
        <div className="mt-4">
          <h3 className="text-lg font-extrabold tracking-tight text-foreground/95 font-heading">
            {rule.title}
          </h3>
          <p className="mt-2 text-[0.88rem] leading-relaxed text-foreground/72">
            {rule.summary}
          </p>
        </div>

        {/* Practical Guidance lists */}
        <div className="mt-6 space-y-4">
          {/* Actionable To Do (O que fazer) */}
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] p-4">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
              Conduta Correta (O que fazer)
            </p>
            <ul className="mt-3.5 space-y-2 text-[0.85rem] leading-relaxed text-foreground/80 list-none">
              {rule.practicalGuidance.map((item) => (
                <li key={item} className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable To Dont (Não faça) */}
          {rule.prohibitedActions?.length ? (
            <div className="prohibition-card">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-destructive">
                Conduta Vedada (Não faça)
              </p>
              <ul className="mt-3.5 space-y-2 text-[0.85rem] leading-relaxed text-foreground/80 list-none">
                {rule.prohibitedActions.map((item) => (
                  <li key={item} className="relative pl-5 before:content-['⛔'] before:absolute before:left-0 before:text-[0.85rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {/* Normative Base section */}
      <div className="mt-6 border-t border-border/40 pt-4">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          Base Normativa & Artigos
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
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
