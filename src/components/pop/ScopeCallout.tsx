import { AlertTriangle } from "lucide-react";

export const ScopeCallout = () => {
  return (
    <section className="article-intro-panel">
      <div className="min-w-0">
        <span className="article-kicker">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          Escopo do POP
        </span>
        <h3
          className="mt-4 text-[1.75rem] text-foreground sm:text-[2.1rem]"
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: "1.02",
            letterSpacing: "-0.035em",
          }}
        >
          Escopo da orientação processual
        </h3>
        <div className="content-spacing mt-5 text-justify">
          <p>
            Este <strong className="text-foreground">POP (Procedimento Operacional Padrão)</strong>
            orienta a instrução processual e a organização documental da prestação de contas do PDDE
            no SEI!RIO, com foco em padronização administrativa, formalização dos registros,
            rastreabilidade da informação, transparência e controle interno no âmbito da 4ª CRE/GAD.
          </p>
          <p>
            As orientações aqui reunidas se restringem ao fluxo de autuação, instrução, juntada,
            autenticação administrativa, assinatura eletrônica e remessa do processo, em consonância
            com as normas federais do PDDE e com os normativos municipais aplicáveis à publicidade,
            integridade e rastreabilidade da informação administrativa.
          </p>
          <p className="text-[0.97rem] text-foreground/74">
            As principais referências normativas utilizadas como fundamento deste procedimento estão
            reunidas ao final do manual.
          </p>
        </div>
      </div>
    </section>
  );
};
