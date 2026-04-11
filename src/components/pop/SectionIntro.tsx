export const SectionIntro = () => {
  return (
    <section className="animate-fade-in">
      <div className="section-card">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] xl:items-start">
          <div className="min-w-0">
            <span className="article-kicker">Apresentação institucional</span>
            <h2
              className="mt-4 text-[2rem] text-foreground sm:text-[2.4rem]"
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: "1.02",
                letterSpacing: "-0.04em",
              }}
            >
              Prezados(as) Diretores(as),
            </h2>

            <div className="editorial-hairline mt-5" />

            <div className="content-spacing prose-institutional mt-6">
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
          </div>

          <aside className="grid gap-4">
            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Compromisso assumido
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/82">
                Orientação clara, apoio contínuo e maior previsibilidade para a rotina administrativa da unidade escolar.
              </p>
            </div>

            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Assinam esta apresentação
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[1.2rem] border border-border/55 bg-background/80 px-4 py-4">
                  <p className="font-semibold text-foreground">Fátima das Graças Lima Barros</p>
                  <p className="mt-1 text-sm text-muted-foreground">Coordenadora – E/4ª CRE</p>
                </div>
                <div className="rounded-[1.2rem] border border-border/55 bg-background/80 px-4 py-4">
                  <p className="font-semibold text-foreground">Bianca Barreto da Fonseca Coelho</p>
                  <p className="mt-1 text-sm text-muted-foreground">Gerente – E/4ª CRE/GAD</p>
                </div>
              </div>
            </div>

            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Créditos
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/78">
                Elaborado por <span className="font-semibold text-foreground">Wilson M. Peixoto</span> · SME/RJ
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
