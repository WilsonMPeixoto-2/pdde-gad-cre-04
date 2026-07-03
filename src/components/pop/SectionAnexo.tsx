import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  FileText,
  Gavel,
  Scale,
} from "lucide-react";
import { ApplicabilityMatrix } from "@/components/legal/ApplicabilityMatrix";
import { SourceCitation } from "@/components/legal/SourceCitation";
import { normativeSources, type NormativeSourceId } from "@/lib/normativeSources";
import { checklistItemDefinitions } from "@/lib/pddeOperationalData";
import { ProfileCallout } from "./ProfileCallout";
import { AnimatedReveal } from "./AnimatedReveal";

const federalDocumentLabelOverrides: Partial<Record<number, string>> = {
  9: "Ata de aprovação da execução do plano de gastos",
};

const federalDocuments = checklistItemDefinitions
  .filter((item) => !item.complementar)
  .map((item) => ({
    ...item,
    text: federalDocumentLabelOverrides[item.id] ?? item.text,
    legalReference:
      item.id === 10
        ? { sourceId: "resolution15_2021", articles: ["47"] }
        : { sourceId: "resolution15_2021", articles: ["33"] },
    character: item.id === 6 || item.id === 10 ? "Quando aplicável" : "Núcleo federal",
  }));

const localInstruction = checklistItemDefinitions.filter((item) => item.complementar);

const federalSourceIds = [
  "resolution15_2021",
  "resolution7_2024",
  "comunicado01_2026",
  "bbGestaoAgilFaq",
] as const satisfies readonly NormativeSourceId[];

const municipalSourceIds = [
  "decretoRio47769_2020",
  "seiRioCriarProcesso",
  "seiRioIncluirDocumentos",
  "seiRioBlocoAssinatura",
] as const satisfies readonly NormativeSourceId[];

const SourceCard = ({ sourceId, tone }: { sourceId: NormativeSourceId; tone: "federal" | "municipal" }) => {
  const source = normativeSources[sourceId];
  const toneClass =
    tone === "federal"
      ? "hover:border-blue-400/60 text-blue-800 dark:text-blue-200"
      : "hover:border-teal-400/60 text-teal-800 dark:text-teal-200";

  return (
    <a
      href={source.officialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 rounded-xl border border-border/60 bg-background/55 px-4 py-4 transition-colors hover:bg-secondary/45 ${toneClass}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-current/15 bg-current/5">
        {tone === "federal" ? <Gavel className="h-5 w-5" /> : <Scale className="h-5 w-5" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground">{source.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{source.issuingBody}</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
};

export const SectionAnexo = () => {
  return (
    <section id="anexo" className="scroll-mt-20 space-y-6">
      <AnimatedReveal delay={50} duration={650}>
        <section className="article-intro-panel mb-2">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_minmax(18rem,0.86fr)] xl:items-start">
            <div className="min-w-0">
              <span className="article-kicker">
                <Scale className="h-3.5 w-3.5" aria-hidden="true" />
                Consulta normativa e operacional
              </span>
              <h2
                className="mt-4 text-[1.9rem] text-foreground sm:text-[2.45rem]"
                style={{ fontFamily: "var(--font-display)", lineHeight: "1.01", letterSpacing: "-0.04em" }}
              >
                Fontes oficiais prioritárias para consulta rápida
              </h2>
              <div className="editorial-hairline mt-5" />
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/82 sm:text-base">
                Este anexo separa a base federal do PDDE, o processo eletrônico municipal e as
                orientações locais. A Resolução nº 15/2021 deve ser lida em conjunto com seus atos
                modificadores e com os normativos específicos de cada ação e exercício.
              </p>
            </div>

            <aside className="grid gap-3">
              <div className="article-summary-card">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Quando consultar
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-foreground/80 sm:text-sm">
                  Antes da remessa, durante a conferência de pendências e sempre que houver dúvida sobre
                  documentação, prazo, pagamento ou vedação.
                </p>
              </div>
              <div className="article-summary-card">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Regra de leitura
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-foreground/80 sm:text-sm">
                  Não transforme cautela operacional, prática local ou referência histórica em obrigação
                  sem fonte e aplicabilidade identificadas.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </AnimatedReveal>

      <AnimatedReveal delay={100} duration={600}>
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileCallout visibleFor="diretor" variant="info" title="Leitura prática para a unidade escolar" className="h-full">
            Consulte a base documental abaixo e use o checklist interativo da Seção 2 para acompanhar a
            montagem do processo.
          </ProfileCallout>
          <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção para a conferência na GAD" className="h-full">
            Confronte a base documental federal com a árvore do SEI!RIO e trate as peças locais somente
            conforme orientação formal da SME-Rio ou da 4ª CRE.
          </ProfileCallout>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={150} duration={650}>
        <div className="section-card p-6 sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-lg border border-primary/15 bg-primary/8 p-2.5 text-primary">
                <FileText className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground font-heading">
                  Bloco A — Base documental federal da UEx
                </h3>
                <div className="mt-1">
                  <SourceCitation reference={{ sourceId: "resolution15_2021", articles: ["33", "47"] }} />
                </div>
              </div>
            </div>
            <a
              href="#checklist-documentos"
              className="inline-flex items-center gap-1.5 self-start rounded-lg bg-accent px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-accent/90 sm:self-auto"
            >
              Ir para o checklist interativo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="table-institutional table-responsive-cards w-full text-sm">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>Documento ou peça</th>
                  <th className="w-40">Caráter</th>
                  <th className="w-52">Fundamento</th>
                </tr>
              </thead>
              <tbody>
                {federalDocuments.map((item, index) => (
                  <tr key={item.id}>
                    <td className="font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")}</td>
                    <td className="font-bold text-foreground">{item.text}</td>
                    <td>
                      <span className="inline-flex rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                        {item.character}
                      </span>
                    </td>
                    <td>
                      <SourceCitation reference={item.legalReference} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            A documentação patrimonial de bens permanentes possui fundamento próprio no art. 47 e não
            deve ser apresentada como parte automática do rol do art. 33.
          </p>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={200} duration={650}>
        <div className="section-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="shrink-0 rounded-lg border border-primary/15 bg-primary/8 p-2.5 text-primary">
              <FileText className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading">
                Bloco B — Instrução local · SEI!RIO / SME-Rio
              </h3>
              <p className="text-xs text-muted-foreground">
                Peças administrativas locais, sem classificação automática como documentos federais.
              </p>
            </div>
          </div>
          <ul className="grid gap-3 text-sm leading-relaxed text-foreground/80 md:grid-cols-2">
            {localInstruction.map((item) => (
              <li key={item.id} className="rounded-xl border border-border/50 bg-card px-4 py-3 font-semibold">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={220} duration={650}>
        <div className="section-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="shrink-0 rounded-lg border border-primary/15 bg-primary/8 p-2.5 text-primary">
              <FileText className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading">
                Contratação de pessoa física — consulta prévia obrigatória
              </h3>
              <div className="mt-1">
                <SourceCitation
                  reference={{ sourceId: "resolution15_2021", articles: ["6º, IV, ‘k’", "17", "26"] }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>
              Este guia não define, isoladamente, o documento fiscal, o tratamento previdenciário, as
              retenções tributárias ou as obrigações acessórias decorrentes da contratação de pessoa
              física.
            </p>
            <p>
              Antes da contratação, a UEx/CEC deverá consultar a GAD ou a área contábil competente e
              observar a legislação tributária, previdenciária, trabalhista e municipal aplicável ao caso
              concreto.
            </p>
            <p>
              O documento comprobatório deverá ser válido segundo a legislação à qual a entidade estiver
              sujeita e conter os elementos exigidos para comprovação da despesa.
            </p>
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={250} duration={650}>
        <div className="section-card p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <div className="shrink-0 rounded-lg border border-primary/15 bg-primary/8 p-2.5 text-primary">
              <BookOpen className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground font-heading">Base normativa organizada por finalidade</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Os links abaixo são gerados pelo registro central de fontes do projeto.
              </p>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <div className="article-summary-card h-full">
              <h4 className="mb-4 border-b border-border/30 pb-3 text-base font-bold text-foreground font-heading">
                PDDE — fontes federais
              </h4>
              <div className="grid gap-3">
                {federalSourceIds.map((sourceId) => (
                  <SourceCard key={sourceId} sourceId={sourceId} tone="federal" />
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">
                O Comunicado nº 01/2026 referencia a Resolução CD/FNDE nº 18, de 27 de novembro de 2025,
                e esclarece que os efeitos sobre estorno e saldos zerados passam a ser exigidos a partir
                de fevereiro de 2027.
              </p>
            </div>

            <div className="article-summary-card h-full">
              <h4 className="mb-4 border-b border-border/30 pb-3 text-base font-bold text-foreground font-heading">
                Processo eletrônico municipal
              </h4>
              <div className="grid gap-3">
                {municipalSourceIds.map((sourceId) => (
                  <SourceCard key={sourceId} sourceId={sourceId} tone="municipal" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={300} duration={650}>
        <div className="section-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="shrink-0 rounded-lg border border-primary/15 bg-primary/8 p-2.5 text-primary">
              <FileText className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading">
                SEI!RIO, BB Gestão Ágil e SiGPC cumprem funções distintas
              </h3>
              <p className="text-xs text-muted-foreground">
                Matriz com status explícito para impedir generalizações entre exercícios.
              </p>
            </div>
          </div>
          <div className="mb-6 space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>O processo local no SEI!RIO organiza a instrução, a análise e a tramitação administrativa no Município.</p>
            <p>O BB Gestão Ágil recebe informações e documentos relacionados à comprovação da execução financeira no ambiente federal.</p>
            <p>O SiGPC permanece relacionado aos registros e consolidações cabíveis à EEx e ao FNDE.</p>
            <p>
              O BB Gestão Ágil não substitui a documentação exigida pela Resolução nº 15/2021 nem a
              necessidade de apresentação da prestação à EEx.
            </p>
          </div>
          <ApplicabilityMatrix />
        </div>
      </AnimatedReveal>
    </section>
  );
};
