import { AlertCircle, Building2, CircleCheck, ClipboardCheck, Send, UserCheck } from "lucide-react";
import { Callout } from "./Callout";
import { CopyButton } from "./CopyButton";
import { ProfileCallout } from "./ProfileCallout";
import { GAD_UNIT } from "@/lib/guideContent";

const preSendChecks = [
  "O bloco de assinatura retornou concluído, sem pendências",
  "Documentos externos foram autenticados corretamente e permanecem legíveis",
  "A árvore do processo está organizada, sem arquivos duplicados ou fora de ordem",
];

const finalizationFlow = [
  {
    step: "1",
    title: "Tramitação para a GAD",
    description:
      "A escola encaminha o processo completo para a Gerência de Administração da 4ª CRE, encerrando a fase operacional da unidade.",
  },
  {
    step: "2",
    title: "Análise da GAD",
    description:
      "A GAD confere integridade documental, coerência entre pesquisa de preços, extratos, comprovantes, atestos e registros do processo.",
  },
  {
    step: "3",
    title: "Despacho técnico e aprovação",
    description:
      "Em caso de conformidade, a GAD registra o despacho correspondente e encaminha o processo para o despacho final do Coordenador.",
  },
  {
    step: "4",
    title: "Controle patrimonial e encerramento",
    description:
      "Quando houver despesa de capital, a incorporação patrimonial dos bens deve estar refletida nos autos antes do fechamento definitivo.",
  },
];

export const SectionSix = () => {
  return (
    <section id="secao-6" className="scroll-mt-20 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="section-number">6</div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Despacho e Finalização
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Remessa para a GAD, análise da CRE e etapas finais de aprovação do processo
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="section-card p-5 sm:p-6 border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10 shrink-0">
              <Send className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Encaminhamento e encerramento da fase escolar</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-left sm:text-justify">
                Com a assinatura eletrônica concluída, a escola deve tramitar o processo para a GAD/4ª CRE.
                A partir desse ponto, o fluxo passa para análise técnica da CRE, mas a unidade escolar precisa
                continuar acompanhando o andamento para responder eventuais exigências ou pedidos de complemento.
              </p>
            </div>
          </div>
        </div>

        <div className="section-card p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <ClipboardCheck className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">6.1. Conferência final e remessa para a GAD</h3>
          </div>

          <div className="space-y-4">
            <Callout variant="success" title="Destinatário correto da remessa" icon={Building2}>
              <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <code className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground whitespace-normal break-words data-code">
                  {GAD_UNIT.fullLabel}
                </code>
                <CopyButton text={GAD_UNIT.fullLabel} label="Código copiado!" className="self-end sm:self-auto" />
              </div>
            </Callout>

            <div className="space-y-3">
              {preSendChecks.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                  <CircleCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">
                  Se houver assinatura pendente ou documento essencial faltando, não faça a remessa. Corrigir
                  antes de enviar evita devolução do processo e retrabalho para a escola e para a GAD.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-5">6.2. O que acontece após o envio</h3>

          <div className="space-y-4">
            {finalizationFlow.map((item) => (
              <div key={item.step} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed text-left sm:text-justify">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Callout variant="info" title="Acompanhamento do processo" icon={UserCheck}>
          A escola pode acompanhar o andamento diretamente no SEI!RIO. Caso a GAD identifique pendências,
          o processo poderá retornar para ajuste documental, complementação ou correção de fluxo.
        </Callout>

        <ProfileCallout visibleFor="diretor" variant="info">
          <p>
            Após a remessa, acompanhe o processo periodicamente. Se houver exigência da GAD, responda no
            próprio fluxo do SEI!RIO e mantenha a documentação complementar organizada.
          </p>
        </ProfileCallout>

        <ProfileCallout visibleFor="gad" variant="warning">
          <p>
            No despacho técnico, registre de forma objetiva as pendências encontradas, a regularidade dos
            documentos e a situação de eventual despesa de capital para facilitar o fechamento do processo.
          </p>
        </ProfileCallout>
      </div>
    </section>
  );
};
