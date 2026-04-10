import React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* ── Variant palettes ─────────────────────────────────────────── */
const palettes = {
  default: {
    border: "border-border/60",
    bg: "bg-card",
    titleColor: "text-foreground",
    iconWrap: "bg-primary/10 text-primary",
  },
  sky: {
    border: "border-sky-200/60 dark:border-sky-800/40",
    bg: "bg-gradient-to-br from-sky-50/60 to-sky-100/30 dark:from-sky-950/30 dark:to-sky-900/15",
    titleColor: "text-sky-900 dark:text-sky-100",
    iconWrap: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
  },
  amber: {
    border: "border-amber-200/60 dark:border-amber-800/40",
    bg: "bg-gradient-to-br from-amber-50/60 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/15",
    titleColor: "text-amber-900 dark:text-amber-100",
    iconWrap: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  },
  emerald: {
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    bg: "bg-gradient-to-br from-emerald-50/60 to-emerald-100/30 dark:from-emerald-950/30 dark:to-emerald-900/15",
    titleColor: "text-emerald-900 dark:text-emerald-100",
    iconWrap: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  primary: {
    border: "border-primary/15",
    bg: "bg-gradient-to-br from-primary/5 via-background to-primary/3",
    titleColor: "text-foreground",
    iconWrap: "bg-primary/10 text-primary",
  },
} as const;

type Palette = keyof typeof palettes;

/* ── Props ────────────────────────────────────────────────────── */
interface ContentBlockProps {
  /** Visible heading */
  title: string;
  /** Optional uppercase kicker above the title */
  kicker?: string;
  /** Lucide icon rendered in a rounded badge */
  icon?: LucideIcon;
  /** Color palette */
  palette?: Palette;
  /** Extra wrapper classes */
  className?: string;
  /** Optional footer slot rendered below children, separated by a divider */
  footer?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Premium content block for long-form institutional text.
 * Provides clear visual separation: kicker → title → body → footer,
 * each zone with consistent spacing, contrast and hierarchy.
 */
export const ContentBlock = ({
  title,
  kicker,
  icon: Icon,
  palette = "default",
  className,
  footer,
  children,
}: ContentBlockProps) => {
  const p = palettes[palette];

  return (
    <article
      className={cn(
        "rounded-[1.6rem] border p-5 sm:p-6 transition-all duration-300",
        "shadow-[0_3px_10px_-5px_hsl(221_31%_20%/0.05),0_24px_56px_-40px_hsl(221_31%_20%/0.10),inset_0_1px_0_0_hsl(0_0%_100%/0.45)]",
        "hover:shadow-[0_10px_24px_-18px_hsl(221_31%_20%/0.09),0_22px_46px_-34px_hsl(221_31%_20%/0.14),inset_0_1px_0_0_hsl(0_0%_100%/0.55)]",
        "hover:-translate-y-0.5",
        p.border,
        p.bg,
        className,
      )}
    >
      {/* ── Header zone ─────────────────────────────────────── */}
      <div className="flex items-start gap-3.5 sm:gap-4">
        {Icon && (
          <div
            className={cn(
              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
              p.iconWrap,
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-1">
          {kicker && (
            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {kicker}
            </span>
          )}
          <h3
            className={cn(
              "font-heading text-[1.05rem] font-bold leading-snug sm:text-[1.15rem]",
              p.titleColor,
            )}
            style={{ letterSpacing: "-0.02em" }}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* ── Body zone ───────────────────────────────────────── */}
      <div className="mt-4 space-y-4 text-[0.94rem] leading-[1.85] text-foreground/82 [&_p]:text-pretty [&_p]:hyphens-auto [&_strong]:text-foreground [&_strong]:font-semibold [&_ul]:space-y-2.5 [&_li]:leading-[1.8]">
        {children}
      </div>

      {/* ── Footer zone (optional) ──────────────────────────── */}
      {footer && (
        <>
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <div className="text-sm text-muted-foreground">{footer}</div>
        </>
      )}
    </article>
  );
};
