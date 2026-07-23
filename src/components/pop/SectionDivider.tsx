import { forwardRef, useCallback } from "react";
import { Check, Link2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EditorialChapterVisual } from "@/components/visual/EditorialChapterVisual";
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
  "secao-1": "Prepare os dados da unidade, autue o processo e preserve o Número Único de Protocolo.",
  "secao-2": "Compreenda a função das peças, relacione regras e evidências e confira a instrução ao final.",
  "secao-3": "Classifique a origem, preencha os metadados e identifique cada documento externo na árvore.",
  "secao-4": "Autentique somente arquivos digitalizados e confirme o registro produzido no sistema.",
  "secao-5": "Conclua documentos internos, assinaturas, revisão final e remessa à unidade competente.",
  "secao-6": "Acompanhe a análise, responda diligências formais e preserve a rastreabilidade das providências.",
};

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ sectionId, number, title, subtitle, icon: Icon }, ref) => {
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
            <div className="editorial-chapter__identity">
              <div className="editorial-chapter__index" aria-hidden="true">
                <span>{number.padStart(2, "0")}</span>
                <span>Etapa</span>
              </div>

              <div className="editorial-chapter__label">
                <span className="editorial-chapter__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span>Capítulo operacional</span>
              </div>
            </div>

            <div className="editorial-chapter__meta">
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
                      Copiar link da etapa
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