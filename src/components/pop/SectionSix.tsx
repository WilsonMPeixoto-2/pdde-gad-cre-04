import { FileText, Package, Send, UserCheck } from "lucide-react";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";

const finalizationSteps = [
  {
    number: "1",
    title: "Análise pela GAD",
    description:
      "A GAD analisará a instrução e poderá solicitar complementação, devolver o processo para correção ou emitir a manifestação cabível, conforme o fluxo interno vigente.",
    icon: Send,
  },
  {
    number: "2",
    title: "Providência cabível",
    description:
      "A manifestação registrada deverá observar a orientação formal da SME-Rio e da 4ª CRE em vigor para o respectivo ciclo.",
    icon: FileText,
  },
  {
    number: "3",
    title: "Etapas subsequentes",
    description:
      "A autoridade responsável pela decisão final e os procedimentos de arquivamento ou encaminhamento dependem do fluxo local formalmente vigente.",
    icon: UserCheck,
  },
  {
    number: "4",
    title: "Controle Patrimonial — PDDE Capital",
    description:
      "Quando houver aquisição de bens permanentes com recursos de capital do PDDE, a unidade deve incluir a documentação patrimonial cabível e seguir o procedimento local formalmente validado.",
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
          Após a remessa, a GAD analisará a instrução e poderá solicitar complementação, devolver o
          processo para correção ou emitir a manifestação cabível, conforme o fluxo interno vigente.
          As etapas subsequentes devem seguir orientação formal da SME-Rio e da 4ª CRE para o ciclo.
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
