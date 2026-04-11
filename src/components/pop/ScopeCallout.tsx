import { Callout } from "./Callout";

export const ScopeCallout = () => {
  return (
    <Callout variant="warning" title="IMPORTANTE — O que este POP cobre">
      <p className="text-sm text-muted-foreground leading-relaxed text-left sm:text-justify">
        Este POP orienta a <strong className="text-foreground">AUTUAÇÃO</strong> e a <strong className="text-foreground">INSTRUÇÃO</strong> do processo administrativo no SEI!RIO para fins de controle interno, rastreabilidade e acompanhamento pela 4ª CRE/GAD. Ele <strong className="text-foreground">NÃO substitui</strong> a prestação de contas federal do PDDE nos sistemas oficiais do FNDE (SiGPC/Contas Online) e <strong className="text-foreground">NÃO altera</strong> prazos e exigências definidos pelo FNDE. O dossiê no SEI!RIO deve refletir fielmente o que foi executado e registrado para o PDDE.
      </p>
    </Callout>
  );
};
