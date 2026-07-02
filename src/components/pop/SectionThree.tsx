import {
  AlertCircle,
  ExternalLink,
  FileImage,
  FileText,
  FolderTree,
  Upload,
} from "lucide-react";
import seiChooseDocType from "@/assets/sei-choose-doc-type.png";
import seiIncludeDocIcon from "@/assets/sei-include-doc-icon.png";
import { externalResources } from "@/lib/externalResources";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";
import { AnimatedReveal } from "./AnimatedReveal";

const classificationRows = [
  {
    label: "Origem",
    digitalizado: "Arquivo produzido a partir da digitalização de documento em papel.",
    natoDigital: "Arquivo criado ou recebido originalmente por meio eletrônico.",
  },
  {
    label: "Exemplos no processo",
    digitalizado: "Ata originalmente assinada em papel, recibo físico escaneado, nota impressa e digitalizada.",
    natoDigital: "NF-e ou DANFE recebido eletronicamente, extrato bancário baixado do banco, comprovante eletrônico, PDF emitido por sistema oficial.",
  },
  {
    label: "Como entra no SEI!RIO",
    digitalizado: "Documento Externo com formato Digitalizado nesta unidade.",
    natoDigital: "Documento Externo como original eletrônico.",
  },
  {
    label: "Tipo de conferência",
    digitalizado: "Informar documento original, cópia autenticada administrativamente, cópia autenticada por cartório ou cópia simples, conforme o documento apresentado.",
    natoDigital: "Não exige tipo de conferência de documento em papel.",
  },
];

const conferenceTypes = [
  "Documento original",
  "Cópia autenticada administrativamente",
  "Cópia autenticada por cartório",
  "Cópia simples",
] as const;

const attachmentCare = [
  {
    title: "Um arquivo, uma peça",
    description: "Evite juntar vários documentos diferentes no mesmo PDF quando eles puderem ser identificados separadamente na árvore.",
  },
  {
    title: "Nome na Árvore claro",
    description: "Use identificação que permita localizar a peça depois: tipo do documento, emissor ou referência e período quando necessário.",
  },
  {
    title: "Metadados sem improviso",
    description: "Preencha número e data apenas quando essas informações constarem do próprio documento.",
  },
  {
    title: "Legibilidade mínima",
    description: "Antes de anexar, confira se o PDF está legível e se todas as páginas importantes foram incluídas.",
  },
] as const;

export const SectionThree = () => {
  return (
    <section className="space-y-6">
      <AnimatedReveal delay={50} duration={600}>
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a escola">
            Antes de anexar, nomeie o arquivo de forma descritiva. Isso facilita a conferência e evita
            árvore com peças genéricas demais.
          </ProfileCallout>

          <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção — GAD">
            Confira se os documentos externos foram classificados corretamente e se o nome na árvore
            permite identificar a peça sem abrir vários arquivos.
          </ProfileCallout>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={100} duration={650}>
        <div className="section-card border-l-4 border-l-accent p-5 sm:p-6" style={{ borderLeftWidth: "4px" }}>
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-accent/8 p-3 text-accent border border-accent/15">
              <Upload className="h-5.5 w-5.5" />
            </div>
            <div className="space-y-3 flex-1 min-w-0">
              <h3 className="font-heading text-lg font-bold text-foreground">3.1. Documento externo no processo</h3>
              <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
                Documento externo é a peça que não foi produzida diretamente dentro do SEI!RIO e
                precisa ser juntada ao processo como elemento de instrução. Para a montagem correta
                dos autos, o ponto decisivo é classificar corretamente o formato do documento:
                <strong className="text-foreground"> nato-digital</strong> ou{" "}
                <strong className="text-foreground">digitalizado nesta unidade</strong>.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1.5">
                <a
                  href={externalResources.decreto8539_2015.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground/80 hover:bg-secondary/45 transition"
                >
                  Decreto nº 8.539/2015
                  <ExternalLink className="h-3 w-3 text-accent" />
                </a>
                <a
                  href={externalResources.decretoProcessoRio_47769_2020.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground/80 hover:bg-secondary/45 transition"
                >
                  Decreto Rio nº 47.769/2020
                  <ExternalLink className="h-3 w-3 text-accent" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={150} duration={650}>
        <div className="section-card p-5 sm:p-6">
          <h3 className="mb-4 font-heading text-base font-bold text-foreground">
            3.2. Como classificar o formato do documento externo
          </h3>

          <div className="overflow-x-auto w-full max-w-full">
            <table className="table-institutional min-w-[42rem]">
              <thead>
                <tr>
                  <th>Critério</th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <FileImage className="h-4 w-4 text-sky-400" />
                      Digitalizado
                    </span>
                  </th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-400" />
                      Nato-digital
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {classificationRows.map((row) => (
                  <tr key={row.label}>
                    <td className="font-semibold text-foreground">{row.label}</td>
                    <td className="text-muted-foreground">{row.digitalizado}</td>
                    <td className="text-muted-foreground">{row.natoDigital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout variant="info" icon={AlertCircle} className="mt-5">
            <p className="font-bold">Regra prática</p>
            <p className="mt-1 text-sm">
              Documento em papel escaneado entra como <strong>Digitalizado nesta unidade</strong>.
              Documento criado ou recebido por meio eletrônico entra como <strong>Nato-digital</strong>.
            </p>
          </Callout>

          <Callout variant="warning" icon={AlertCircle} className="mt-4">
            <p className="font-bold">Tipo de conferência do digitalizado</p>
            <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
              {conferenceTypes.map((type) => (
                <li key={type} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-warning">
                  {type}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm">
              A opção escolhida deve refletir o documento efetivamente apresentado. Não use uma
              declaração genérica quando o caso exigir outro tipo de conferência.
            </p>
          </Callout>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={200} duration={650}>
        <div className="section-card border-l-4 border-l-primary p-5 sm:p-6" style={{ borderLeftWidth: "4px" }}>
          <h3 className="mb-5 font-heading text-base font-bold text-foreground">3.3. Inclusão do documento externo no SEI!RIO</h3>

          <div className="space-y-4.5">
            {/* Step 1 */}
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-gradient-to-b from-card to-secondary/35 p-5 shadow-xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm">
                1
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                <div>
                  <h4 className="font-bold text-foreground font-heading">Acessar “Incluir Documento”</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Com o processo aberto, use o comando de inclusão de documento na barra de
                    ferramentas.
                  </p>
                </div>
                <div className="mockup-frame max-w-md p-4">
                  <div className="rounded-xl border border-border/60 bg-background/90 p-4 shadow-xs">
                    <div className="inline-flex items-center gap-3.5 rounded-xl border border-sky-200/50 bg-sky-500/[0.03] px-4 py-3 dark:border-sky-800/40">
                      <div className="rounded-lg border border-sky-200/70 bg-card p-2 shadow-inner dark:border-sky-800/40">
                        <img
                          src={seiIncludeDocIcon}
                          alt="Ícone Incluir Documento no SEI!RIO"
                          className="h-10 w-auto object-contain"
                          width={177}
                          height={32}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Atalho do sistema
                        </p>
                        <p className="text-sm font-bold text-foreground">Incluir Documento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-gradient-to-b from-card to-secondary/35 p-5 shadow-xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm">
                2
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                <div>
                  <h4 className="font-bold text-foreground font-heading">Selecionar “Documento Externo”</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Use a opção de documento externo sempre que a peça não tiver sido produzida dentro
                    do próprio SEI!RIO.
                  </p>
                </div>
                <div className="mockup-frame max-w-2xl p-4">
                  <div className="overflow-hidden rounded-xl border border-border/60 bg-white dark:bg-slate-950/80 shadow-xs">
                    <div className="flex justify-center bg-linear-to-b from-white via-white to-slate-50/80 px-4 py-3">
                      <img
                        src={seiChooseDocType}
                        alt="Escolha do tipo de documento externo no SEI!RIO"
                        className="max-h-[220px] w-auto object-contain"
                        width={448}
                        height={187}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-gradient-to-b from-card to-secondary/35 p-5 shadow-xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm">
                3
              </div>
              <div>
                <h4 className="font-bold text-foreground font-heading">Preencher os metadados essenciais</h4>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent">Selecione o tipo do documento que melhor identifica a peça.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent">Informe número e data apenas quando constarem do documento.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent">
                    No <strong className="text-foreground">Nome na Árvore</strong>, use identificação
                    clara e singular.
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-gradient-to-b from-card to-secondary/35 p-5 shadow-xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm">
                4
              </div>
              <div>
                <h4 className="font-bold text-foreground font-heading">Anexar o arquivo e confirmar</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Escolha o arquivo, confira os campos preenchidos e confirme a inclusão do documento
                  nos autos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={250} duration={650}>
        <div className="section-card p-5 sm:p-6">
          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-xl bg-primary/8 p-3 text-primary border border-primary/15">
              <FolderTree className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">3.4. Cuidados de anexação</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Pequenos cuidados nesta etapa evitam árvore confusa, retrabalho e dificuldade de
                conferência na GAD.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {attachmentCare.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/50 bg-card p-5 shadow-xs transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5"
                style={{ boxShadow: "var(--shadow-card-rest)" }}
              >
                <h4 className="font-heading text-sm font-bold text-foreground/90">{item.title}</h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
};
