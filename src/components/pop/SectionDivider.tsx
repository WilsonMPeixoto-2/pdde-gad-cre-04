import { forwardRef, useCallback } from "react";
import { Check, Link2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EditorialChapterVisual } from "@/components/visual/EditorialChapterVisual";
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
            <div className="editorial-chapter__index" aria-hidden="true">
              <span>{number.padStart(2, "0")}</span>
              <span>Etapa</span>
            </div>

            <div className="editorial-chapter__meta">
              <div className="editorial-chapter__label">
                <IconTile icon={icon} size="lg" />
                <span>Capítulo operacional</span>
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
                  className="editorial-chapter__share"
                >
                  {copiedValue === sectionId ? (
                    <>
                      <Check aria-hidden="true" />
                      Link copiado
                    </>
                  ) : (
                    <>
                      <Link2 aria-hidden="true" />
                      Copiar link desta etapa
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <EditorialChapterVisual sectionId={sectionId} />
        </div>
      </header>
    );
  },
);

SectionDivider.displayName = "SectionDivider";
