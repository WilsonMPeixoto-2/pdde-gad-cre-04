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
  <header className={cn("editorial-section-lead", className)} data-step={step}>
    {step ? (
      <div className="editorial-section-lead__index" aria-hidden="true">
        <span>{step.padStart(2, "0")}</span>
      </div>
    ) : null}

    <div className="editorial-section-lead__body">
      <div className="editorial-section-lead__eyebrow">
        <IconTile icon={icon} size="md" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="editorial-section-lead__title">{title}</h2>
      <p className="editorial-section-lead__description">{description}</p>
    </div>
  </header>
);
