import { ExternalLink } from "lucide-react";
import { normativeSources, type LegalReference } from "@/lib/normativeSources";
import { cn } from "@/lib/utils";

type SourceCitationProps = {
  reference: LegalReference;
  className?: string;
};

const formatReferenceParts = (reference: LegalReference) => {
  const parts = [
    reference.articles?.length ? `arts. ${reference.articles.join(", ")}` : "",
    reference.sections?.length ? reference.sections.join(", ") : "",
  ].filter(Boolean);

  return parts.join(" · ");
};

export const SourceCitation = ({ reference, className }: SourceCitationProps) => {
  const source = normativeSources[reference.sourceId as keyof typeof normativeSources];
  if (!source) return null;

  const detail = formatReferenceParts(reference);

  return (
    <a
      href={source.officialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline focus-visible:underline dark:text-slate-300 dark:hover:text-white",
        className,
      )}
    >
      {source.title}
      {detail ? ` · ${detail}` : ""}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
};
