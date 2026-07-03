import type { NormativeLevel, NormativeStatus } from "@/lib/normativeSources";
import { cn } from "@/lib/utils";

const levelLabels: Record<NormativeLevel, string> = {
  federal: "REGRA FEDERAL",
  municipal: "DIRETRIZ MUNICIPAL",
  local: "ORIENTAÇÃO OPERACIONAL",
};

const levelStyles: Record<NormativeLevel, string> = {
  federal: "gov-badge-federal",
  municipal: "gov-badge-municipal",
  local: "gov-badge-local",
};

const levelMarkerStyles: Record<NormativeLevel, string> = {
  federal: "bg-blue-700 dark:bg-blue-300",
  municipal: "bg-teal-700 dark:bg-teal-300",
  local: "bg-violet-700 dark:bg-violet-300",
};

const statusLabels: Record<NormativeStatus, string> = {
  verified: "Vigente",
  "pending-local-validation": "Pendente de Homologação",
  superseded: "Revogada",
  "historical-reference": "Histórico",
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
    <span className={cn(levelStyles[level], className)}>
      <span className="flex shrink-0 items-center gap-1.5">
        <span
          className={cn("h-2 w-2 rounded-sm", levelMarkerStyles[level])}
          aria-hidden="true"
        />
        {levelLabels[level]}
        {suffix}
      </span>
      <span className="ml-2 border-l border-current/30 pl-2 font-semibold normal-case tracking-normal">
        {statusLabels[status]}
      </span>
    </span>
  );
};
