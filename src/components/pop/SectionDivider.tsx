import { forwardRef, useCallback } from "react";
import { Check, Link2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/visual/IconTile";
import { useClipboardAction } from "@/hooks/useClipboardAction";
import { buildGuideShareUrl } from "@/lib/guideRoutes";
import type { GuideSectionId } from "@/lib/guideContent";

interface SectionDividerProps {
  sectionId: GuideSectionId;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ sectionId, number, title, subtitle, icon }, ref) => {
    const { copiedValue, copyText } = useClipboardAction<GuideSectionId>();

    const handleCopySectionLink = useCallback(async () => {
      const didCopy = await copyText(sectionId, buildGuideShareUrl(sectionId));

      if (didCopy) {
        toast.success("Link da seção copiado.");
        return;
      }

      toast.error("Não foi possível copiar o link desta seção.");
    }, [copyText, sectionId]);

    return (
      <header
        ref={ref}
        className="section-divider-print my-12 overflow-hidden rounded-[1rem] border border-border/75 bg-card shadow-[0_1px_2px_hsl(218_28%_18%/0.04),0_18px_42px_-32px_hsl(218_28%_18%/0.24)] sm:my-16"
      >
        <div className="grid md:grid-cols-[7rem_minmax(0,1fr)]">
          <div className="flex items-center justify-center border-b border-border/65 bg-secondary/45 px-5 py-7 md:border-b-0 md:border-r md:py-8">
            <div className="text-center" aria-hidden="true">
              <span className="block text-[0.64rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Seção
              </span>
              <span className="mt-1 block text-5xl font-extrabold tracking-[-0.07em] text-primary/45 sm:text-6xl">
                {number.padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <IconTile icon={icon} size="lg" />
                <div className="min-w-0">
                  <h2 className="text-xl font-bold tracking-[-0.03em] text-foreground sm:text-2xl lg:text-[1.8rem]">
                    {title}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-foreground/82 sm:text-[0.98rem]">
                    {subtitle}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void handleCopySectionLink()}
                className="no-print shrink-0 self-start"
                aria-label={`Copiar link da seção ${number}: ${title}`}
              >
                {copiedValue === sectionId ? (
                  <>
                    <Check className="text-success" aria-hidden="true" />
                    Link copiado
                  </>
                ) : (
                  <>
                    <Link2 aria-hidden="true" />
                    Compartilhar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  },
);

SectionDivider.displayName = "SectionDivider";
