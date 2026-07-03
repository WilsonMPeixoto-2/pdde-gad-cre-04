import { ArrowRight, ClipboardList, FolderOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/visual/IconTile";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { requestGuideAnchorPreload, scrollToGuideAnchor } from "@/lib/guideNavigation";

const readinessItems = [
  "Acesso ao SEI!RIO",
  "Extratos do exercício",
  "Atas e peças para juntada",
  "Notas e comprovantes",
  "Demonstrativo do exercício",
  "Identificação da UEx",
] as const;

export const OperationalLanding = () => {
  return (
    <section id="entrada-operacional" className="article-intro-panel scroll-mt-20">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.88fr)] lg:items-start">
        <div className="min-w-0">
          <div className="flex items-start gap-4">
            <IconTile icon={ClipboardList} size="lg" />
            <div className="min-w-0">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-primary">
                Entrada operacional
              </p>
              <h3 className="mt-1.5 text-[1.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[2.15rem]">
                Onde começar quando a urgência é montar o processo no SEI!RIO
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-px overflow-hidden rounded-[0.8rem] border border-border/70 bg-border/70 sm:grid-cols-2">
            {[
              ["Para quem é este guia", "Diretores, secretários e equipes gestoras da 4ª CRE."],
              ["Quando usar", "Ao instruir o processo no SEI!RIO, da abertura à remessa."],
              ["O que este guia cobre", "Autuação, juntada, autenticação, assinatura e remessa."],
              ["O que este guia não substitui", "Registros e procedimentos federais exigidos pelo FNDE."],
            ].map(([title, copy]) => (
              <div key={title} className="bg-card px-4 py-4 sm:px-5">
                <p className="text-sm font-bold text-foreground">{title}</p>
                <p className="mt-1.5 text-sm leading-6 text-foreground/76">{copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={() => scrollToGuideAnchor("secao-1", { focusHeading: true })}
            >
              <FolderOpen aria-hidden="true" />
              Começar pela Etapa 1
              <ArrowRight aria-hidden="true" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onMouseEnter={() => requestGuideAnchorPreload(GUIDE_ANCHORS.checklist)}
              onFocus={() => requestGuideAnchorPreload(GUIDE_ANCHORS.checklist)}
              onClick={() => scrollToGuideAnchor(GUIDE_ANCHORS.checklist, { focusHeading: true })}
            >
              <ClipboardList aria-hidden="true" />
              Ir ao checklist
            </Button>
          </div>
        </div>

        <aside className="rounded-[0.8rem] border border-border/70 bg-card p-5 shadow-[0_1px_2px_hsl(218_28%_18%/0.04)]">
          <div className="flex items-start gap-3">
            <IconTile icon={ShieldCheck} tone="neutral" size="md" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Tenha em mãos
              </p>
              <p className="mt-1.5 text-sm leading-6 text-foreground/72">
                Organize estes elementos antes de iniciar a autuação.
              </p>
            </div>
          </div>

          <ul className="mt-4 divide-y divide-border/60 border-y border-border/60 text-sm text-foreground/82">
            {readinessItems.map((item) => (
              <li key={item} className="flex items-center gap-3 py-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};
