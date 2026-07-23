import { forwardRef, useCallback } from "react";
import { Check, Link2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/visual/IconTile";
import { useClipboardAction } from "@/hooks/useClipboardAction";
import { buildGuideShareUrl } from "@/lib/guideRoutes";
import type { GuideSectionId } from "@/lib/guideContent";
import { editorialMedia, editorialMediaBySection } from "@/lib/editorialMedia";

interface SectionDividerProps {
  sectionId: GuideSectionId;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

const subtitleOverrides: Partial<Record<GuideSectionId, string>> = {
  "secao-2": "Função dos documentos, regras aplicáveis, organização dos autos e conferência final",
  "secao-3": "Classificação, inclusão, metadados e identificação dos documentos externos",
  "secao-4": "Autenticação dos arquivos digitalizados e conferência do registro na árvore",
  "secao-5": "Documentos internos, assinaturas, conferência final e remessa do processo",
  "secao-6": "Acompanhamento da análise, diligências e providências posteriores formalmente comunicadas",
};

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ sectionId, number, title, subtitle, icon }, ref) => {
    const { copiedValue, copyText } = useClipboardAction<GuideSectionId>();
    const displaySubtitle = subtitleOverrides[sectionId] ?? subtitle;
    const mediaKey = editorialMediaBySection[sectionId] ?? "process";
    const media = editorialMedia[mediaKey];

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
        className="section-divider-print editorial-chapter"
        data-editorial-chapter={sectionId}
        aria-labelledby={`${sectionId}-chapter-title`}
      >
        <div className="editorial-chapter__grid">
          <div className="editorial-chapter__content">
            <div className="editorial-chapter__number" aria-hidden="true">
              {number.padStart(2, "0")}
            </div>

            <div className="editorial-chapter__meta">
              <div className="editorial-chapter__label">
                <IconTile icon={icon} size="lg" />
                <span>Etapa {number}</span>
              </div>

              <h2 id={`${sectionId}-chapter-title`} className="editorial-chapter__title">
                {title}
              </h2>
              <p className="editorial-chapter__subtitle">{displaySubtitle}</p>

              <div className="editorial-chapter__actions no-print">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void handleCopySectionLink()}
                  aria-label={`Copiar link da seção ${number}: ${title}`}
                  className="border-blue-900/20 bg-white/80 text-blue-950 hover:bg-blue-50 dark:border-white/15 dark:bg-slate-950/40 dark:text-white dark:hover:bg-white/10"
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

          <div className="editorial-chapter__media" data-editorial-media="chapter">
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: media.position }}
            />
          </div>
        </div>
      </header>
    );
  },
);

SectionDivider.displayName = "SectionDivider";
