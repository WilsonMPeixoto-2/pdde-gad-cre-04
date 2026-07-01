export const SectionIntro = () => {
  return (
    <section className="animate-fade-in">
      <div className="editorial-letter">
        <div className="editorial-spread">
          <div className="min-w-0">
          <span className="article-kicker">Apresentação institucional</span>
          <h2
            className="mt-5 font-display text-[2.55rem] font-bold text-foreground sm:text-[3.25rem] lg:text-[3.75rem]"
            style={{
              lineHeight: "1.02",
              letterSpacing: "0",
            }}
          >
            Prezados(as) Diretores(as),
          </h2>

          <div className="editorial-hairline mt-6" />

          <div className="content-spacing prose-institutional mt-7 text-justify">
            <p className="drop-cap lead-text">
              A rotina de uma gestão escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas
              e urgências do dia a dia, sabemos que a organização administrativa exige tempo, atenção e,
              muitas vezes, decisões rápidas. Por isso, a 4ª Coordenadoria Regional de Educação, por meio
              da Gerência de Administração (GAD), reafirma aqui um compromisso simples e objetivo:
              <strong className="text-foreground font-semibold"> estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.</strong>
            </p>
            <p>
              A chegada do SEI!RIO representa uma mudança importante na forma como registramos,
              acompanhamos e formalizamos os processos administrativos. Toda transição traz desafios —
              e é exatamente nesse momento que a parceria entre CRE e escolas faz diferença.
              Este material foi pensado para facilitar o caminho, reduzir inseguranças, evitar retrabalho
              e dar mais previsibilidade às rotinas.
            </p>
            <p>
              Este é o primeiro de uma série de documentos de orientação que a 4ª CRE está construindo
              para apoiar as direções, tanto nos procedimentos de gestão escolar quanto no uso do novo
              sistema processual SEI!RIO. A cada novo guia, nossa intenção é a mesma: transformar regras
              e etapas em rotinas mais simples, seguras e executáveis, respeitando o contexto real de cada unidade.
            </p>
            <p>
              Conte com a 4ª CRE/GAD. Seguimos à disposição para orientar, ouvir e aprimorar continuamente
              esses materiais, em parceria com vocês.
            </p>
          </div>

          <div className="mt-10 border-t border-border/60 pt-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Assinam esta apresentação
            </p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div className="border-t border-border/55 pt-4">
                <p className="font-semibold text-foreground">Fátima das Graças Lima Barros</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">Coordenadora – E/4ª CRE</p>
              </div>
              <div className="border-t border-border/55 pt-4">
                <p className="font-semibold text-foreground">Bianca Barreto da Fonseca Coelho</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">Gerente – E/4ª CRE/GAD</p>
              </div>
            </div>
          </div>
          </div>

          <aside className="editorial-aside hidden lg:block" aria-label="Síntese institucional">
            <span className="editorial-quote-mark" aria-hidden="true">“</span>
            <p className="editorial-quote">
              Estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.
            </p>
            <p className="editorial-aside-caption">4ª Coordenadoria Regional de Educação</p>

            <div className="mt-16 border-l border-border/75 pl-4">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary">
                Sobre este guia
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Guia prático para a tramitação da Prestação de Contas do PDDE no SEI!RIO.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
