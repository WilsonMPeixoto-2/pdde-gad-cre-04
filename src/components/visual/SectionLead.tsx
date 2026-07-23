import type { LucideIcon } from "lucide-react";
import { IconTile } from "./IconTile";
import { cn } from "@/lib/utils";

type SectionLeadProps = {
  step?: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export const SectionLead = ({
  step,
  eyebrow,
  title,
  description,
  icon,
  className,
}: SectionLeadProps) => (
  <header className={cn("editorial-section-lead", className)}>
    <div className="editorial-section-lead__row">
      <IconTile icon={icon} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="editorial-section-lead__labels">
          {step ? <span>Etapa {step}</span> : null}
          <span>{eyebrow}</span>
        </div>
        <h2 className="editorial-section-lead__title">{title}</h2>
        <p className="editorial-section-lead__description">{description}</p>
      </div>
    </div>
  </header>
);
