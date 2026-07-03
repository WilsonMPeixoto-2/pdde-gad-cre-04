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
  <header className={cn("section-card", className)}>
    <div className="flex items-start gap-4 sm:gap-5">
      <IconTile icon={icon} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {step ? (
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
              Etapa {step}
            </span>
          ) : null}
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  </header>
);
