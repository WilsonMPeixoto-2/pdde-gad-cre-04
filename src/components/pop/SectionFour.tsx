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
import { AnimatedReveal } from "./AnimatedReveal";

const documentRules = [
  {
    title: "Documento digitalizado",
    icon: ScanLine,
    iconBg: "bg-sky-500/10 text-sky-500 border border-sky-500/20",
    accent: "border-[rgba(2,132,199,0.15)] bg-gradient-to-br from-[rgba(2,132,199,0.02)] to-[rgba(2,132,199,0.005)]",
    badge: "Autenticar",
    badgeClass: "gov-badge-sei",
    description:
      "Arquivo produzido a partir de documento em papel. Ao incluir no SEI!RIO, informe o tipo de conferência que corresponde ao documento apresentado.",
  },
  {
    title: "Documento nato-digital",
    icon: FileDigit,
    iconBg: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    accent: "border-[rgba(16,185,129,0.15)] bg-gradient-to-br from-[rgba(16,185,129,0.02)] to-[rgba(16,185,129,0.005)]",
    badge: "Não autenticar",
    badgeClass: "gov-badge-municipal",
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
    <section className="space-y-6">
      <AnimatedReveal delay={50} duration={600}>
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a escola">
            Autentique o documento digitalizado logo após a inclusão. Isso reduz o risco de avançar com
            peça externa pendente.
          </ProfileCallout>

          <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção — GAD">
            Confirme se os documentos digitalizados exibem autenticação e se não houve autenticação
            indevida de arquivo nato-digital.
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
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-lg font-bold text-foreground">4.1. Regra central da autenticação</h3>
                <InfoDrawer title="Classificação rápida" triggerLabel="Ver quadro comparativo">
                  <NatoDigitalVsDigitalizadoContent />
                </InfoDrawer>
              </div>

              <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
                No fluxo do SEI!RIO, a autenticação administrativa se aplica ao
                <strong className="text-foreground"> documento digitalizado nesta unidade</strong> e
                deve refletir o tipo de conferência informado no ato de inclusão.
              </p>
              <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
                Quando o arquivo é <strong className="text-foreground">nato-digital</strong>, ele já
                ingressa como original eletrônico. Nesse caso, a etapa correta é apenas a juntada como
                documento externo.
              </p>
            </div>
          </div>
        </div>
      </AnimatedReveal>

      <div className="grid gap-4 md:grid-cols-2">
        {documentRules.map((rule, idx) => {
          const Icon = rule.icon;

          return (
            <AnimatedReveal key={rule.title} delay={150 + idx * 80} duration={600}>
              <article
                className={`rounded-xl border p-5 shadow-sm h-full ${rule.accent}`}
                style={{ boxShadow: "var(--shadow-card-rest)" }}
              >
                <div className="flex items-center justify-between gap-3 border-b border-border/30 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${rule.iconBg}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground font-heading">{rule.title}</h4>
                  </div>
                  <span className={rule.badgeClass}>
                    {rule.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">{rule.description}</p>
              </article>
            </AnimatedReveal>
          );
        })}
      </div>

      <AnimatedReveal delay={200} duration={650}>
        <div className="section-card p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-heading text-base font-bold text-foreground">4.2. Procedimento de autenticação do digitalizado</h3>
            <InfoDrawer title="Autenticação x assinatura" triggerLabel="Diferença funcional">
              <AutenticacaoVsAssinaturaContent />
            </InfoDrawer>
          </div>

          <div className="space-y-4">
            {authenticationSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-start gap-4 rounded-xl border border-border/50 bg-gradient-to-b from-card to-secondary/35 p-5 shadow-xs"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-border/30 pt-6">
            <p className="mb-3 text-[0.82rem] font-bold uppercase tracking-wider text-muted-foreground">Exemplo de formulário do documento externo</p>
            <SeiMockup variant="document-form" />
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={250} duration={650}>
        <div className="section-card p-5 sm:p-6">
          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-xl bg-primary/8 p-3 text-primary border border-primary/15">
              <FolderTree className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-base font-bold text-foreground">4.3. O que conferir após autenticar</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Antes de seguir para o bloco de assinatura, faça uma conferência rápida do resultado na
                árvore do processo.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "O documento continua identificado corretamente na árvore.",
              "A autenticação ficou visível no item digitalizado.",
              "Nenhum documento nato-digital foi autenticado por engano.",
            ].map((item, idx) => (
              <div
                key={item}
                className="rounded-xl border border-border/50 bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-xs"
                style={{ boxShadow: "var(--shadow-card-rest)" }}
              >
                {item}
              </div>
            ))}
          </div>

          <Callout variant="info" icon={Shield} className="mt-6">
            <p className="font-bold">Regra final desta etapa</p>
            <p className="mt-1 text-sm">
              Documento interno do SEI!RIO é assinado; documento externo digitalizado é autenticado;
              documento externo nato-digital é apenas juntado como original eletrônico.
            </p>
          </Callout>

          <Callout variant="warning" icon={AlertCircle} className="mt-4">
            <p className="font-bold">Fora do escopo deste tópico</p>
            <p className="mt-1 text-sm">
              Esta etapa treats do procedimento no sistema. A análise material do conteúdo do documento
              ou do mérito da despesa pertence a outras orientações.
            </p>
          </Callout>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={300} duration={600}>
        <div className="rounded-xl border border-success/30 bg-success/8 p-5 text-center">
          <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-success" />
          <p className="font-bold text-success font-heading">Autenticação concluída com critério</p>
          <p className="text-sm text-success/80 mt-1">
            Com os documentos externos corretamente classificados e autenticados, o processo pode
            avançar para assinatura interna e remessa.
          </p>
        </div>
      </AnimatedReveal>
    </section>
  );
};
