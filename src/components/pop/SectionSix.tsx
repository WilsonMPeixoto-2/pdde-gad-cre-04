import { CheckCircle2, FileText, Package, Send, UserCheck } from "lucide-react";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";

const finalizationSteps = [
  {
    number: "1",
    title: "Análise pela GAD",
    description:
      "A GAD verifica a conformidade dos documentos e informações do processo. Se houver pendência, o processo poderá ser devolvido para complementação ou correção.",
    icon: Send,
  },
  {
    number: "2",
    title: "Despacho de Aprovação",
    description:
      "Se a instrução estiver regular, a GAD emite o despacho de aprovação da prestação de contas.",
    icon: FileText,
  },
  {
    number: "3",
    title: "Despacho do Coordenador",
    description:
      "Após a aprovação, o processo segue para a manifestação da autoridade competente, com a formalização final cabível.",
    icon: CheckCircle2,
  },
  {
    number: "4",
    title: "Controle Patrimonial — PDDE Capital",
    description:
      "Quando houver aquisição de bens permanentes com recursos de capital do PDDE, a unidade deve incluir a relação de bens no processo e seguir o encaminhamento patrimonial indicado pela GAD.",
    icon: Package,
  },
] as const;

export const SectionSix = () => {
  return (
    <section className="scroll-mt-20 space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Fluxo pós-envio
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Após a remessa do processo pela unidade escolar, a GAD realiza a análise da prestação de
          contas. Havendo conformidade, o processo segue para aprovação e formalização final.
        </p>
      </div>

      <div className="section-card">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" />
          Etapas da finalização
        </h4>

        <div className="space-y-4">
          {finalizationSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="flex gap-4 rounded-xl bg-muted/30 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">{step.number}</span>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {step.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Callout variant="info" icon={UserCheck}>
        <p className="font-medium">Acompanhamento do processo</p>
        <p className="mt-1 text-sm">
          A unidade escolar deve acompanhar a tramitação no SEI!RIO e atender tempestivamente
          eventual diligência ou devolução.
        </p>
      </Callout>

      <ProfileCallout visibleFor="diretor" variant="info">
        <p>
          Após o envio, acompanhe o processo no SEI!RIO. Havendo diligência, regularize o que for
          solicitado com rapidez para evitar atraso na conclusão.
        </p>
      </ProfileCallout>

      <ProfileCallout visibleFor="gad" variant="info">
        <p>
          Na análise, registre com objetividade o resultado da conferência e as pendências
          identificadas. Processos com despesa de capital exigem verificação patrimonial adicional.
        </p>
      </ProfileCallout>

      <Callout variant="warning" icon={Package} title="Nota sobre controle patrimonial">
        <span className="block text-left sm:text-justify">
          O procedimento completo de incorporação patrimonial está fora do escopo deste POP. Em
          caso de dúvida, siga a orientação específica da GAD.
        </span>
      </Callout>
    </section>
  );
};
