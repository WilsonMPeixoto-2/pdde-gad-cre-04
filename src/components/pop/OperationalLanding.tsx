import { ArrowRight, ClipboardList, FolderOpen, ShieldCheck } from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { requestGuideAnchorPreload, scrollToGuideAnchor } from "@/lib/guideNavigation";

const readinessItems = [
  "Acesso ao SEI!RIO",
  "Extratos bancários do exercício",
  "Atas e documentos que precisam ser juntados",
  "Notas fiscais e comprovantes",
  "Demonstrativo pertinente ao exercício",
  "Identificação da unidade executora, quando aplicável",
] as const;

export const OperationalLanding = () => {
  return (
    <section className="article-intro-panel">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start">
        <div className="min-w-0">
          <span className="article-kicker">
            <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
            Entrada operacional
          </span>
          <h3
            className="mt-4 text-[1.75rem] text-foreground sm:text-[2.05rem]"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: "1.02",
              letterSpacing: "-0.035em",
            }}
          >
            Onde começar quando a urgência é montar o processo no SEI!RIO
          </h3>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="article-summary-card">
              <p className="text-sm font-semibold text-foreground">Para quem é este guia</p>
              <p className="mt-2 text-sm leading-7 text-foreground/84">
                Diretores, secretários escolares e equipes gestoras das unidades da 4ª CRE.
              </p>
            </div>
            <div className="article-summary-card">
              <p className="text-sm font-semibold text-foreground">Quando usar</p>
              <p className="mt-2 text-sm leading-7 text-foreground/84">
                Ao instruir o processo de prestação de contas do PDDE no SEI!RIO, da abertura até a remessa à GAD.
              </p>
            </div>
            <div className="article-summary-card">
              <p className="text-sm font-semibold text-foreground">O que este guia cobre</p>
              <p className="mt-2 text-sm leading-7 text-foreground/84">
                Autuação, juntada de documentos, autenticação administrativa, assinatura eletrônica e remessa.
              </p>
            </div>
            <div className="article-summary-card">
              <p className="text-sm font-semibold text-foreground">O que este guia não cobre</p>
              <p className="mt-2 text-sm leading-7 text-foreground/84">
                A prestação de contas federal nos sistemas do FNDE nem a elaboração exaustiva de cada peça documental.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={() => scrollToGuideAnchor("secao-1", { focusHeading: true })}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/92 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <FolderOpen className="h-4 w-4" aria-hidden="true" />
              Começar pela Etapa 1
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>

            <button
              onMouseEnter={() => requestGuideAnchorPreload(GUIDE_ANCHORS.checklist)}
              onFocus={() => requestGuideAnchorPreload(GUIDE_ANCHORS.checklist)}
              onClick={() => scrollToGuideAnchor(GUIDE_ANCHORS.checklist, { focusHeading: true })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/65 bg-background/82 px-6 py-3.5 text-sm font-medium text-foreground/80 transition-all duration-300 hover:border-primary/25 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              Ir direto ao Checklist
            </button>
          </div>
        </div>

        <aside className="article-summary-card">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Tenha em mãos
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/84">
                {readinessItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
