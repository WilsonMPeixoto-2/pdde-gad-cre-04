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
  /* ══ Government Spheres — Legal Design System v3 ══ */
  federal: {
    border: "border-[rgba(29,78,216,0.18)] dark:border-[rgba(29,78,216,0.3)]",
    bg: "bg-gradient-to-br from-[rgba(29,78,216,0.03)] to-[rgba(29,78,216,0.005)] dark:from-[rgba(29,78,216,0.08)] dark:to-[rgba(29,78,216,0.02)]",
    titleColor: "text-[hsl(var(--gov-federal))] dark:text-blue-300",
    iconWrap: "bg-[rgba(29,78,216,0.08)] text-[hsl(var(--gov-federal))] dark:bg-[rgba(29,78,216,0.2)] dark:text-blue-300",
  },
  municipal: {
    border: "border-[rgba(15,118,110,0.18)] dark:border-[rgba(15,118,110,0.3)]",
    bg: "bg-gradient-to-br from-[rgba(15,118,110,0.03)] to-[rgba(15,118,110,0.005)] dark:from-[rgba(15,118,110,0.08)] dark:to-[rgba(15,118,110,0.02)]",
    titleColor: "text-[hsl(var(--gov-municipal))] dark:text-teal-300",
    iconWrap: "bg-[rgba(15,118,110,0.08)] text-[hsl(var(--gov-municipal))] dark:bg-[rgba(15,118,110,0.2)] dark:text-teal-300",
  },
  local: {
    border: "border-[rgba(109,40,217,0.18)] dark:border-[rgba(109,40,217,0.3)]",
    bg: "bg-gradient-to-br from-[rgba(109,40,217,0.03)] to-[rgba(109,40,217,0.005)] dark:from-[rgba(109,40,217,0.08)] dark:to-[rgba(109,40,217,0.02)]",
    titleColor: "text-[hsl(var(--gov-local))] dark:text-violet-300",
    iconWrap: "bg-[rgba(109,40,217,0.08)] text-[hsl(var(--gov-local))] dark:bg-[rgba(109,40,217,0.2)] dark:text-violet-300",
  },
  sei: {
    border: "border-[rgba(2,132,199,0.18)] dark:border-[rgba(2,132,199,0.3)]",
    bg: "bg-gradient-to-br from-[rgba(2,132,199,0.03)] to-[rgba(2,132,199,0.005)] dark:from-[rgba(2,132,199,0.08)] dark:to-[rgba(2,132,199,0.02)]",
    titleColor: "text-[hsl(var(--gov-sei))] dark:text-sky-300",
    iconWrap: "bg-[rgba(2,132,199,0.08)] text-[hsl(var(--gov-sei))] dark:bg-[rgba(2,132,199,0.2)] dark:text-sky-300",
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
        "rounded-xl border p-5 transition-all duration-300 sm:p-6",
        "shadow-sm",
        p.border,
        p.bg,
        className,
      )}
      style={{
        boxShadow: "var(--shadow-card-rest)",
      }}
    >
      {/* ── Header zone ─────────────────────────────────────── */}
      <div className="flex items-start gap-3.5 sm:gap-4">
        {Icon && (
          <div
            className={cn(
              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20",
              p.iconWrap,
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-1">
          {kicker && (
            <span className="block text-[0.67rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {kicker}
            </span>
          )}
          <h3
            className={cn(
              "font-heading text-[1.05rem] font-bold leading-snug sm:text-[1.15rem]",
              p.titleColor,
            )}
            style={{ letterSpacing: "-0.012em" }}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* ── Body zone ───────────────────────────────────────── */}
      <div className="mt-4 space-y-4 text-[0.92rem] leading-relaxed text-foreground/80 [&_p]:text-pretty [&_p]:hyphens-auto [&_strong]:text-foreground [&_strong]:font-semibold [&_ul]:space-y-2.5 [&_li]:leading-[1.78]">
        {children}
      </div>

      {/* ── Footer zone (optional) ──────────────────────────── */}
      {footer && (
        <>
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <div className="text-xs text-muted-foreground">{footer}</div>
        </>
      )}
    </article>
  );
};
