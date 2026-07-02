import {
  AlertCircle,
  CheckCircle2,
  FileDigit,
  FolderTree,
  ScanLine,
  Shield,
  Upload,
} from "lucide-react";
import { SeiMockup } from "./SeiMockup";
import {
  AutenticacaoVsAssinaturaContent,
  InfoDrawer,
  NatoDigitalVsDigitalizadoContent,
} from "./InfoDrawer";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";

const documentRules = [
  {
    title: "Documento digitalizado",
    icon: ScanLine,
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
    iconColor: "text-sky-700 dark:text-sky-300",
    accent:
      "border-sky-200/80 bg-linear-to-br from-sky-50 to-sky-100/50 dark:border-sky-800/40 dark:from-sky-950/30 dark:to-sky-900/15",
    badge: "Autenticar",
    badgeClass:
      "border-sky-300 bg-sky-100 text-sky-800 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    description:
      "Arquivo produzido a partir de documento em papel. Ao incluir no SEI!RIO, informe o tipo de conferência que corresponde ao documento apresentado.",
  },
  {
    title: "Documento nato-digital",
    icon: FileDigit,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    accent:
      "border-emerald-200/80 bg-linear-to-br from-emerald-50 to-emerald-100/50 dark:border-emerald-800/40 dark:from-emerald-950/30 dark:to-emerald-900/15",
    badge: "Não autenticar",
    badgeClass:
      "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    description:
      "Arquivo criado ou recebido por meio eletrônico. Entra no processo como original eletrônico e não deve receber conferência de documento em papel.",
  },
] as const;

const authenticationSteps = [
  "Na árvore do processo, localize o documento externo que foi classificado como digitalizado.",
  "Acione o comando de autenticação do SEI!RIO apenas para esse tipo de arquivo.",
  "Confira se o tipo de conferência informado corresponde ao documento apresentado: documento original, cópia autenticada administrativamente, cópia autenticada por cartório ou cópia simples.",
  "Finalize a operação e confira se o registro da autenticação ficou visível na árvore do processo.",
] as const;

export const SectionFour = () => {
  return (
    <section className="animate-fade-in space-y-5">
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a escola">
        Autentique o documento digitalizado logo após a inclusão. Isso reduz o risco de avançar com
        peça externa pendente.
      </ProfileCallout>

      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção — GAD">
        Confirme se os documentos digitalizados exibem autenticação e se não houve autenticação
        indevida de arquivo nato-digital.
      </ProfileCallout>

      <div className="section-card border-l-[3px] border-l-primary/75 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <Upload className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-semibold text-foreground">4.1. Regra central da autenticação</h3>
              <InfoDrawer title="Classificação rápida" triggerLabel="Ver quadro comparativo">
                <NatoDigitalVsDigitalizadoContent />
              </InfoDrawer>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              No fluxo do SEI!RIO, a autenticação administrativa se aplica ao
              <strong className="text-foreground"> documento digitalizado nesta unidade</strong> e
              deve refletir o tipo de conferência informado no ato de inclusão.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Quando o arquivo é <strong className="text-foreground">nato-digital</strong>, ele já
              ingressa como original eletrônico. Nesse caso, a etapa correta é apenas a juntada como
              documento externo.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {documentRules.map((rule) => {
          const Icon = rule.icon;

          return (
            <article key={rule.title} className={`rounded-[1.4rem] border p-5 shadow-soft ${rule.accent}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${rule.iconBg}`}>
                    <Icon className={`h-5 w-5 ${rule.iconColor}`} />
                  </div>
                  <h4 className="text-base font-bold text-foreground">{rule.title}</h4>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${rule.badgeClass}`}
                >
                  {rule.badge}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{rule.description}</p>
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
          {authenticationSteps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-md">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="mb-3 text-sm font-medium text-foreground">Exemplo de formulário do documento externo</p>
          <SeiMockup variant="document-form" />
        </div>
      </div>

      <div className="section-card p-5 sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <FolderTree className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">4.3. O que conferir após autenticar</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Antes de seguir para o bloco de assinatura, faça uma conferência rápida do resultado na
              árvore do processo.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            "O documento continua identificado corretamente na árvore.",
            "A autenticação ficou visível no item digitalizado.",
            "Nenhum documento nato-digital foi autenticado por engano.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border/60 bg-card p-4 text-sm leading-7 text-muted-foreground shadow-xs"
            >
              {item}
            </div>
          ))}
        </div>

        <Callout variant="info" icon={Shield} className="mt-5">
          <p className="font-medium">Regra final desta etapa</p>
          <p className="mt-1 text-sm">
            Documento interno do SEI!RIO é assinado; documento externo digitalizado é autenticado;
            documento externo nato-digital é apenas juntado como original eletrônico.
          </p>
        </Callout>

        <Callout variant="warning" icon={AlertCircle} className="mt-4">
          <p className="font-medium">Fora do escopo deste tópico</p>
          <p className="mt-1 text-sm">
            Esta etapa trata do procedimento no sistema. A análise material do conteúdo do documento
            ou do mérito da despesa pertence a outras orientações.
          </p>
        </Callout>
      </div>

      <div className="rounded-[1.35rem] border border-success/30 bg-success/10 p-4 text-center animate-fade-in">
        <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-success" />
        <p className="font-semibold text-success">Autenticação concluída com critério</p>
        <p className="text-sm text-success/80">
          Com os documentos externos corretamente classificados e autenticados, o processo pode
          avançar para assinatura interna e remessa.
        </p>
      </div>
    </section>
  );
};
