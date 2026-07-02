import type { NormativeStatus } from "@/lib/normativeSources";
import { cn } from "@/lib/utils";

const statusCopy: Record<NormativeStatus, string> = {
  verified: "Verificado",
  "pending-local-validation": "Pendente de validação local",
  superseded: "Superado",
  "historical-reference": "Referência histórica",
};

type NormativeReviewStampProps = {
  lastVerifiedAt: string;
  status: NormativeStatus;
  reviewedBy?: string;
  className?: string;
};

export const NormativeReviewStamp = ({
  lastVerifiedAt,
  status,
  reviewedBy,
  className,
}: NormativeReviewStampProps) => {
  const verifiedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${lastVerifiedAt}T00:00:00Z`));

  return (
    <span className={cn("text-xs font-semibold text-slate-500", className)}>
      {statusCopy[status]} em {verifiedDate}
      {reviewedBy ? ` · ${reviewedBy}` : ""}
    </span>
  );
};
