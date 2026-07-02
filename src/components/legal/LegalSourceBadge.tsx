import type { NormativeLevel, NormativeStatus } from "@/lib/normativeSources";
import { cn } from "@/lib/utils";

const levelLabels: Record<NormativeLevel, string> = {
  federal: "REGRA FEDERAL",
  municipal: "PROCEDIMENTO MUNICIPAL",
  local: "ORIENTAÇÃO OPERACIONAL",
};

const levelStyles: Record<NormativeLevel, string> = {
  federal: "border-blue-200 bg-blue-50 text-blue-700",
  municipal: "border-teal-200 bg-teal-50 text-teal-700",
  local: "border-violet-200 bg-violet-50 text-violet-700",
};

const statusLabels: Record<NormativeStatus, string> = {
  verified: "verificada",
  "pending-local-validation": "pendente",
  superseded: "superada",
  "historical-reference": "histórica",
};

type LegalSourceBadgeProps = {
  level: NormativeLevel;
  status: NormativeStatus;
  issuingBody?: string;
  className?: string;
};

export const LegalSourceBadge = ({
  level,
  status,
  issuingBody,
  className,
}: LegalSourceBadgeProps) => {
  const suffix = issuingBody ? ` · ${issuingBody}` : "";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em]",
        levelStyles[level],
        className,
      )}
    >
      {levelLabels[level]}
      {suffix}
      <span className="ml-1.5 normal-case tracking-normal opacity-75">({statusLabels[status]})</span>
    </span>
  );
};
