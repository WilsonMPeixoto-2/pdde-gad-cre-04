import {
  Upload,
  Shield,
  AlertCircle,
  ScanLine,
  FileDigit,
  ExternalLink,
  FileText,
  FolderTree,
  Calendar,
  Hash,
} from "lucide-react";
import { SeiMockup } from "./SeiMockup";
import { InfoDrawer, NatoDigitalVsDigitalizadoContent, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";
import { ProfileCallout } from "./ProfileCallout";

const OFFICIAL_LINKS = {
  decreto8539:
    "https://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2015/Decreto/D8539.htm",
  decretoSeiRio:
    "https://comlurb.prefeitura.rio/wp-content/uploads/sites/74/2025/11/Decreto-SEI-57250.pdf",
} as const;

const documentRules = [
  {
    title: "Documento digitalizado",
    accent:
      "border-sky-200/80 bg-linear-to-br from-sky-50 to-sky-100/50 dark:border-sky-800/40 dark:from-sky-950/30 dark:to-sky-900/15",
    icon: ScanLine,
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
    iconColor: "text-sky-700 dark:text-sky-300",
    badge: "Autenticar",
    badgeClass:
      "border-sky-300 bg-sky-100 text-sky-800 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    description:
      "Arquivo derivado de original físico assinado, carimbado ou emitido em papel. Ao ser inserido no processo, deve receber conferência/autenticação administrativa.",
    practical:
      "Quem encarta o documento declara que a cópia digital confere com o original físico mantido na unidade.",
  },
  {
    title: "Documento nato-digital",
    accent:
      "border-emerald-200/80 bg-linear-to-br from-emerald-50 to-emerald-100/50 dark:border-emerald-800/40 dark:from-emerald-950/30 dark:to-emerald-900/15",
    icon: FileDigit,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    badge: "Não autenticar",
    badgeClass:
      "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    description:
      "Arquivo originalmente eletrônico, tratado como original no momento da juntada ao processo.",
    practical:
      "No fluxo do SEI!RIO, esse documento é anexado como original e não passa pela etapa de autenticação administrativa.",
  },
] as const;

const registrationCards = [
  {
    icon: FileText,
    title: "Tipo do Documento",
    description: "Selecione o tipo específico da peça externa, como nota fiscal, extrato, recibo ou fatura.",
  },
  {
    icon: Calendar,
    title: "Data do Documento",
    description: "Informe a data de emissão que consta no documento original ou no arquivo eletrônico.",
  },
  {
    icon: Hash,
    title: "Número",
    description: "Preencha apenas quando houver identificador numérico útil e confiável para a peça.",
  },
  {
    icon: FolderTree,
    title: "Nome na Árvore",
    description: "Use identificação singular e objetiva, permitindo localizar o documento com clareza na árvore do processo.",
  },
] as const;

export const SectionFour = () => {
  return (
    <section id="secao-4" className="scroll-mt-20 animate-fade-in">
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a Escola" className="mb-6">
        <strong className="text-foreground">Autentique apenas os documentos digitalizados.</strong> Arquivos nato-digitais já entram no processo como originais e não seguem essa etapa.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-6">
        Ao revisar os autos, confira se a autenticação foi aplicada somente a documentos <strong className="text-foreground">digitalizados</strong>. Documento nato-digital autenticado indevidamente costuma indicar classificação incorreta na etapa anterior.
      </ProfileCallout>

      <div className="mb-6 flex items-center gap-4">
        <div className="section-number">4</div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground sm:text-2xl">
            Autenticação de Documentos Externos
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Etapa destinada à conferência dos documentos externos digitalizados inseridos no processo.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="section-card border-l-4 border-l-primary p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-primary/10 p-3">
              <Upload className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-semibold text-foreground">4.1. Regra central da autenticação</h3>
                <InfoDrawer title="Nato-digital x digitalizado" triggerLabel="Quadro comparativo">
                  <NatoDigitalVsDigitalizadoContent />
                </InfoDrawer>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-left sm:text-justify">
                No fluxo do SEI!RIO, a autenticação administrativa serve para declarar que um <strong className="text-foreground">documento digitalizado</strong> confere com o original físico mantido pela unidade. Ela <strong className="text-foreground">não substitui a assinatura eletrônica</strong> dos documentos internos produzidos no sistema.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-left sm:text-justify">
                Quando o arquivo é <strong className="text-foreground">nato-digital</strong>, ele já ingressa como original eletrônico. Nesse caso, a etapa correta é apenas a juntada como documento externo; a autenticação administrativa não é o procedimento cabível.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {documentRules.map((rule) => {
            const Icon = rule.icon;

            return (
              <article key={rule.title} className={`rounded-[1.4rem] border p-5 shadow-soft ${rule.accent}`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-2.5 ${rule.iconBg}`}>
                      <Icon className={`h-5 w-5 ${rule.iconColor}`} />
                    </div>
                    <h4 className="text-base font-bold text-foreground">{rule.title}</h4>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${rule.badgeClass}`}>
                    {rule.badge}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Caracterização
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{rule.description}</p>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Consequência prática
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{rule.practical}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="section-card p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h3 className="font-semibold text-foreground">4.2. Procedimento de autenticação do digitalizado</h3>
            <InfoDrawer title="Autenticação x assinatura" triggerLabel="Diferença funcional">
              <AutenticacaoVsAssinaturaContent />
            </InfoDrawer>
          </div>

          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Localizar o documento já inserido",
                text: "Na árvore do processo, selecione o documento externo que foi classificado como digitalizado.",
              },
              {
                step: "2",
                title: "Acionar “Autenticar Documento”",
                text: "Use o comando de autenticação do SEI!RIO apenas nesse tipo de arquivo. O objetivo é validar a cópia digital inserida nos autos.",
              },
              {
                step: "3",
                title: "Declarar a conferência do original",
                text: "A autenticação corresponde à declaração administrativa de que o arquivo anexado confere com o original físico assinado, carimbado ou emitido em papel que permanece sob guarda da unidade.",
              },
              {
                step: "4",
                title: "Concluir a autenticação no sistema",
                text: "Finalize a operação com sua credencial de rede e confirme se a autenticação ficou registrada na árvore do processo.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-md">
                  {item.step}
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.35rem] border border-amber-200/80 bg-amber-50/80 p-4 dark:border-amber-800/40 dark:bg-amber-950/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" />
              <div className="space-y-2">
                <p className="font-semibold text-amber-900 dark:text-amber-200">Atenção operacional</p>
                <p className="text-sm leading-relaxed text-amber-900/85 dark:text-amber-200/85">
                  A autenticação é exigida quando o documento externo foi <strong>digitalizado</strong>. Quando o documento externo é <strong>nato-digital</strong>, o SEI!RIO o trata como original eletrônico e a autenticação administrativa deixa de ser a etapa adequada.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-sm font-medium text-foreground">Formulário de registro do documento externo:</p>
            <SeiMockup variant="document-form" />
          </div>
        </div>

        <div className="section-card p-5 sm:p-6">
          <h3 className="mb-4 font-semibold text-foreground">4.3. Campos do registro que merecem conferência</h3>

          <div className="grid gap-3 md:grid-cols-2">
            {registrationCards.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-xl border border-border/60 bg-card p-4 shadow-xs transition-colors hover:border-primary/25">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/10 p-2.5">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-[1.35rem] border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              Em documentos externos do PDDE sem conteúdo sigiloso, o nível de acesso costuma permanecer <strong className="text-foreground">público</strong>. Havendo dados pessoais sensíveis ou restrição específica, aplique a classificação compatível com a regra de acesso do processo.
            </p>
          </div>
        </div>

        <div className="section-card border-l-4 border-l-primary p-5 sm:p-6">
          <h3 className="mb-4 font-semibold text-foreground">4.4. Base normativa e fundamento procedimental</h3>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-[1.35rem] border border-border/60 bg-card p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Base federal
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                O Decreto nº 8.539/2015 diferencia documento <strong className="text-foreground">nato-digital</strong> e documento <strong className="text-foreground">digitalizado</strong>, e estrutura a prática de atos processuais em meio eletrônico.
              </p>
              <a
                href={OFFICIAL_LINKS.decreto8539}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-4"
              >
                Decreto nº 8.539/2015
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-[1.35rem] border border-border/60 bg-card p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                  Base municipal
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                O Decreto Rio nº 57.250/2025 organiza o SEI!RIO, prevê a tramitação eletrônica dos atos, disciplina a juntada de documento externo e estabelece que apenas <strong className="text-foreground">documentos produzidos no sistema</strong> podem ser assinados eletronicamente no SEI.Rio.
              </p>
              <a
                href={OFFICIAL_LINKS.decretoSeiRio}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-4"
              >
                Decreto Rio nº 57.250/2025
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-[1.35rem] border border-border/60 bg-secondary/35 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-foreground/80">
                Em termos práticos: <strong className="text-foreground">documento interno do SEI!RIO</strong> é assinado eletronicamente; <strong className="text-foreground">documento externo digitalizado</strong> é autenticado; <strong className="text-foreground">documento externo nato-digital</strong> é juntado como original.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
