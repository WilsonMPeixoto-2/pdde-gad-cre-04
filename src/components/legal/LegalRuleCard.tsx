import { Ban, BookOpenCheck, CheckCircle2 } from "lucide-react";
import type { NormativeRule } from "@/lib/normativeSources";
import { LegalSourceBadge } from "./LegalSourceBadge";
import { NormativeReviewStamp } from "./NormativeReviewStamp";
import { SourceCitation } from "./SourceCitation";

export const LegalRuleCard = ({ rule }: { rule: NormativeRule }) => {
  const hasProhibitions = Boolean(rule.prohibitedActions?.length);

  return (
    <article className="legal-rule-card" data-level={rule.level} data-status={rule.status}>
      <header className="legal-rule-card__header">
        <div className="legal-rule-card__metadata">
          <LegalSourceBadge level={rule.level} status={rule.status} />
          <NormativeReviewStamp
            lastVerifiedAt={rule.lastVerifiedAt}
            status={rule.status}
            reviewedBy={rule.reviewedBy}
          />
        </div>

        <div className="legal-rule-card__title-block">
          <span>Critério aplicável</span>
          <h3>{rule.title}</h3>
          <p>{rule.summary}</p>
        </div>
      </header>

      <div className="legal-rule-card__guidance" data-columns={hasProhibitions ? "2" : "1"}>
        <section className="legal-rule-card__panel legal-rule-card__panel--correct" aria-label="Conduta correta">
          <div className="legal-rule-card__panel-heading">
            <CheckCircle2 aria-hidden="true" />
            <div>
              <span>Conduta correta</span>
              <strong>O que fazer</strong>
            </div>
          </div>
          <ul>
            {rule.practicalGuidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {hasProhibitions ? (
          <section className="legal-rule-card__panel legal-rule-card__panel--prohibited" aria-label="Conduta vedada">
            <div className="legal-rule-card__panel-heading">
              <Ban aria-hidden="true" />
              <div>
                <span>Conduta vedada</span>
                <strong>O que não fazer</strong>
              </div>
            </div>
            <ul>
              {rule.prohibitedActions?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <footer className="legal-rule-card__evidence">
        <div className="legal-rule-card__evidence-label">
          <BookOpenCheck aria-hidden="true" />
          <div>
            <span>Leitura de auditoria</span>
            <strong>Base normativa e localização</strong>
          </div>
        </div>
        <div className="legal-rule-card__citations">
          {rule.legalReferences.map((reference) => (
            <SourceCitation
              key={`${reference.sourceId}-${reference.articles?.join(".") ?? ""}-${reference.sections?.join(".") ?? ""}`}
              reference={reference}
            />
          ))}
        </div>
      </footer>
    </article>
  );
};
