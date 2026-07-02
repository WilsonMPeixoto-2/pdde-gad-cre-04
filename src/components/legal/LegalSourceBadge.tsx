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
    <span
      className={cn(
        levelStyles[level],
        className
      )}
    >
      <span className="shrink-0 flex items-center gap-1">
        {level === "federal" && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        )}
        {level === "municipal" && (
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
        )}
        {level === "local" && (
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        )}
        {levelLabels[level]}
        {suffix}
      </span>
      <span className="ml-1.5 pl-1.5 border-l border-current/20 normal-case tracking-normal opacity-85 font-medium">
        {statusLabels[status]}
      </span>
    </span>
  );
};
