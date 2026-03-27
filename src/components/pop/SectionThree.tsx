import {
  Upload,
  FileImage,
  FileText,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  FilePlus2,
  ArrowRight,
  ExternalLink,
  FileDown,
  Scissors,
  Image,
  Scale,
  Landmark,
} from "lucide-react";
import seiIncludeDocIcon from "@/assets/sei-include-doc-icon.png";
import seiChooseDocType from "@/assets/sei-choose-doc-type.png";
import { externalResources } from "@/lib/externalResources";
import { ProfileCallout } from "./ProfileCallout";

const typeCards = [
  {
    title: "Digitalizados",
    accent:
      "border-sky-200/70 bg-linear-to-br from-sky-50 to-sky-100/50 dark:border-sky-800/40 dark:from-sky-950/30 dark:to-sky-900/15",
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
    iconColor: "text-sky-700 dark:text-sky-300",
    icon: FileImage,
    concept:
      "Documento originalmente físico que foi convertido em arquivo digital por escaneamento.",
    legal:
      "Base federal: Decreto nº 8.539/2015, art. 2º, II, b. Base municipal: Decreto Rio nº 57.250/2025, arts. 23 e 24.",
    practical:
      "No SEI!RIO, esse arquivo entra como documento externo digitalizado e, quando inserido pela unidade, exige conferência/autenticação administrativa.",
  },
  {
    title: "Nato-digitais",
    accent:
      "border-emerald-200/70 bg-linear-to-br from-emerald-50 to-emerald-100/50 dark:border-emerald-800/40 dark:from-emerald-950/40 dark:to-emerald-900/20",
    iconBg: "bg-emerald-100 dark:bg-emerald-800/60",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    icon: FileText,
    concept:
      "Documento criado originariamente em meio eletrônico, como NF-e, comprovante bancário emitido no portal do banco ou PDF exportado por sistema oficial.",
    legal:
      "Base federal: Decreto nº 8.539/2015, art. 2º, II, a e art. 10. Base municipal: Decreto Rio nº 57.250/2025, art. 22.",
    practical:
      "No fluxo do SEI!RIO, o nato-digital é juntado como original. A autenticação administrativa não é a etapa cabível para esse arquivo.",
  },
] as const;

export const SectionThree = () => {
  return (
    <section id="secao-3" className="scroll-mt-20 animate-fade-in">
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a Escola" className="mb-6">
        Digitalize preferencialmente em PDF com <strong className="text-foreground">200 a 300 dpi</strong>, preservando a legibilidade. Organize seus arquivos em pasta local, mas lembre que, no SEI!RIO, a identificação relevante será dada pelo preenchimento correto do <strong className="text-foreground">Nome na Árvore</strong>.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-6">
        Confirme se a unidade classificou corretamente cada item como <strong className="text-foreground">digitalizado</strong> ou <strong className="text-foreground">nato-digital</strong> e se o Nome na Árvore permite busca inequívoca no SEI!RIO.
      </ProfileCallout>

      <div className="space-y-5">
        <div className="section-card border-l-4 border-l-sky-500 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-sky-100 p-3 dark:bg-sky-900/50">
              <Upload className="h-5 w-5 text-sky-600 dark:text-sky-400 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">3.1. Conceito e enquadramento</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-left sm:text-justify">
                Documento externo é todo arquivo que <strong className="text-foreground">não foi produzido diretamente dentro do SEI!RIO</strong> e que precisa ser encartado ao processo administrativo como elemento de instrução. No plano federal, o Decreto nº 8.539, de <strong className="text-foreground">8 de outubro de 2015</strong>, distingue documento <strong className="text-foreground">nato-digital</strong> e documento <strong className="text-foreground">digitalizado</strong>; no plano municipal, o Decreto Rio nº <strong className="text-foreground">57.250, de 19 de novembro de 2025</strong>, disciplina como esses documentos entram no SEI!RIO.
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={externalResources.decreto8539_2015.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/12"
                >
                  <Scale className="h-3.5 w-3.5" />
                  Decreto nº 8.539/2015
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={externalResources.decretoSeiRio_57250_2025.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-800/40 dark:bg-sky-950/30 dark:text-sky-300"
                >
                  <Landmark className="h-3.5 w-3.5" />
                  Decreto Rio nº 57.250/2025
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card p-5 sm:p-6">
          <h3 className="mb-4 font-semibold text-foreground">3.2. Classificação do documento externo</h3>

          <div className="grid gap-4 xl:grid-cols-2">
            {typeCards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className={`rounded-[1.4rem] border p-5 shadow-soft ${card.accent}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`rounded-xl p-2.5 ${card.iconBg}`}>
                      <Icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                    <h4 className="text-base font-bold text-foreground">{card.title}</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-border/50 bg-background/75 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Conceito
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{card.concept}</p>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-background/75 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Base normativa
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{card.legal}</p>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-background/75 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Efeito prático no SEI!RIO
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{card.practical}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="section-card border border-primary/20 bg-linear-to-br from-primary/5 via-background to-sky-50/40 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-primary/10 p-3">
              <AlertCircle className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">3.3. Regra de preferência para documentos assináveis</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-left sm:text-justify">
                Nos processos digitais, os atos devem ser praticados em meio eletrônico, salvo inviabilidade técnica, indisponibilidade relevante do sistema ou exceção normativa. Por isso, quando a peça <strong className="text-foreground">precisar ser criada e assinada pela própria unidade</strong>, a orientação preferencial é produzi-la dentro do SEI!RIO, para assinatura eletrônica.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-left sm:text-justify">
                O uso de assinatura física seguida de digitalização fica reservado às hipóteses em que a elaboração e a assinatura no sistema <strong className="text-foreground">não sejam possíveis</strong> ou precisem ocorrer externamente de forma imediata. Essa lógica decorre do art. 20, do art. 23 e do art. 26, § 2º, do Decreto Rio nº 57.250/2025.
              </p>
            </div>
          </div>
        </div>

        <div className="section-card border-l-4 border-l-primary p-5 sm:p-6">
          <h3 className="mb-4 font-semibold text-foreground">
            3.4. Procedimento de{" "}
            <span className="inline-flex items-center gap-2 rounded-lg border border-sky-300 bg-sky-100 px-3 py-1 dark:border-sky-700 dark:bg-sky-900/50">
              <FilePlus2 className="h-5 w-5 text-sky-700 dark:text-sky-300" />
              <span className="text-lg font-bold text-sky-700 dark:text-sky-300">Incluir Documento</span>
            </span>{" "}
            no SEI!RIO
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                1
              </div>
              <div className="flex-1">
                <h4 className="mb-1 font-semibold text-foreground">Acessar o processo</h4>
                <p className="mb-3 text-sm text-muted-foreground">
                  Com o processo de prestação de contas aberto, clique no ícone{" "}
                  <span className="inline-flex items-center gap-2 rounded border border-sky-300 bg-sky-100 px-2 py-0.5 dark:border-sky-700 dark:bg-sky-900/50">
                    <FilePlus2 className="h-4 w-4 text-sky-700 dark:text-sky-300" />
                    <strong className="text-sky-700 dark:text-sky-300">Incluir Documento</strong>
                  </span>{" "}
                  na barra de ferramentas.
                </p>
                <div className="inline-block rounded-lg border border-border bg-card p-2 shadow-xs">
                  <img
                    src={seiIncludeDocIcon}
                    alt="Ícone Incluir Documento no SEI!RIO"
                    className="h-8 object-contain"
                    width={177}
                    height={32}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                2
              </div>
              <div className="flex-1">
                <h4 className="mb-1 font-semibold text-foreground">Selecionar a opção “Externo”</h4>
                <p className="mb-3 text-sm text-muted-foreground">
                  Na tela de seleção de tipo de documento, escolha <strong className="text-foreground">“Externo”</strong> para indicar que o arquivo não foi produzido dentro do SEI!RIO.
                </p>
                <div className="inline-block rounded-lg border border-border bg-card p-2 shadow-xs">
                  <img
                    src={seiChooseDocType}
                    alt="Escolha o Tipo do Documento Externo no SEI!RIO"
                    className="max-w-full rounded object-contain sm:max-w-md"
                    width={448}
                    height={187}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border-2 border-dashed border-emerald-300 bg-linear-to-r from-emerald-50 to-emerald-100/60 p-4 dark:border-emerald-700 dark:from-emerald-950/40 dark:to-emerald-900/20">
              <div className="shrink-0 rounded-xl bg-emerald-100 p-2 dark:bg-emerald-800">
                <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                  Orientação prática
                </h4>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  Se o arquivo veio de fora do sistema, a porta de entrada correta é “Documento Externo”.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-sky-200 bg-linear-to-r from-sky-50 to-sky-100/50 p-4 text-center dark:border-sky-800 dark:from-sky-950/40 dark:to-sky-900/20">
              <p className="font-medium text-sky-800 dark:text-sky-300">Após selecionar “Externo”, o sistema abrirá a tela</p>
              <p className="mt-1 text-lg font-bold text-sky-700 dark:text-sky-400">“Registrar Documento Externo”</p>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                3
              </div>
              <div className="flex-1">
                <h4 className="mb-3 font-semibold text-foreground">Preencher os metadados</h4>

                <div className="space-y-4">
                  {[
                    {
                      code: "A",
                      title: "Tipo de Documento",
                      text: "Selecione o tipo que melhor identifica a peça (nota fiscal, extrato, recibo, nota de empenho, ata etc.).",
                    },
                    {
                      code: "B",
                      title: "Número",
                      text: "Informe o número do documento quando houver identificação numérica útil. Se não existir forma segura de identificar numericamente a peça, deixe o campo em branco.",
                      tip: "Evite preencher com dado improvisado apenas para completar o campo.",
                    },
                    {
                      code: "C",
                      title: "Data do Documento",
                      text: "Informe a data de emissão que consta no próprio documento, sempre que essa informação estiver disponível.",
                    },
                  ].map((item) => (
                    <div key={item.code} className="rounded-xl border-l-4 border-l-sky-400 bg-muted/50 p-4">
                      <h5 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                          {item.code}
                        </span>
                        {item.title}
                      </h5>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                      {item.tip ? (
                        <div className="mt-3 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
                          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">{item.tip}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <div className="rounded-xl border-l-4 border-l-primary bg-muted/50 p-4">
                    <h5 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                        D
                      </span>
                      Nome na Árvore
                    </h5>

                    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                      <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Função do campo
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                          Este campo é o principal identificador do documento na árvore do processo e nas pesquisas futuras do SEI!RIO.
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                          A nomeação deve permitir reconhecer <strong className="text-foreground">o que é o documento</strong> e <strong className="text-foreground">qual dado o singulariza</strong>.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Estrutura sugerida
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                          <span className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-foreground">Tipo do documento</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <span className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-foreground">Emissor ou finalidade</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <span className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-foreground">Mês, parcela ou referência</span>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                          Não há, nesta data, nomenclatura única oficial para todos os documentos. O critério recomendável é que o nome seja <strong className="text-foreground">informativo e identificador</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                        Exemplos recomendados
                      </p>
                      <ul className="mt-2 space-y-2">
                        {[
                          "NF-e 1234 — Papelaria Alfa — jan/2025",
                          "Nota de Empenho 2025NE001043 — GAD 4ª CRE",
                          "Extrato aplicação — conta PDDE — dez/2025",
                        ].map((example) => (
                          <li key={example} className="flex items-start gap-2 text-sm text-foreground/85">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <code className="rounded bg-background px-2 py-0.5 text-foreground">{example}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                4
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-foreground">Anexar o arquivo</h4>
                <p className="text-sm text-muted-foreground">
                  Clique em <strong className="text-foreground">“Escolher arquivo”</strong>, selecione o documento no computador e conclua em <strong className="text-foreground">“Confirmar Dados”</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card border border-sky-200 bg-linear-to-br from-sky-50/50 to-transparent p-5 sm:p-6 dark:border-sky-800 dark:from-sky-950/30">
          <div className="mb-5 flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-sky-100 p-3 dark:bg-sky-900/50">
              <Lightbulb className="h-5 w-5 text-sky-600 dark:text-sky-400 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">3.5. Orientações práticas de digitalização e anexação</h3>
              <p className="text-sm text-muted-foreground">
                Para preservar legibilidade, rastreabilidade e compatibilidade com o SEI!RIO, observe as orientações a seguir.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
              <div className="mb-2 flex items-center gap-2">
                <Image className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-foreground">Qualidade da digitalização</h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Certifique-se de que o documento físico esteja legível antes de digitalizar. Trabalhe, preferencialmente, com <strong className="text-foreground">200 a 300 dpi</strong>, elevando a resolução apenas quando necessário para preservar a leitura.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
              <div className="mb-2 flex items-center gap-2">
                <FileDown className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-foreground">Nome do arquivo x Nome na Árvore</h4>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                O nome local do arquivo no computador pode ajudar a organização da escola, mas a identificação útil no SEI!RIO decorre do preenchimento dos metadados, sobretudo do <strong className="text-foreground">Nome na Árvore</strong>.
              </p>
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/40">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  Preencha os campos com exatidão: é isso que vai facilitar a busca futura na árvore do processo.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
              <div className="mb-2 flex items-center gap-2">
                <Scissors className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-foreground">Tamanho do arquivo</h4>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Se o SEI!RIO bloquear o anexo por excesso de tamanho, reduza a resolução, compacte o PDF ou divida documentos muito extensos em partes menores.
              </p>
              <p className="text-sm text-muted-foreground">
                Ferramenta útil:{" "}
                <a
                  href="https://www.ilovepdf.com/pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  iLovePDF
                  <ExternalLink className="ml-1 inline h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
