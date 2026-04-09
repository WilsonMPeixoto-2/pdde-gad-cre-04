export const SectionIntro = () => {
  return (
    <section id="introducao" className="scroll-mt-20 animate-fade-in">
      {/* Welcome Message */}
      <div className="section-card">
        <h2 className="section-heading text-xl sm:text-2xl">
          Prezados(as) Diretores(as),
        </h2>
        <div className="content-spacing">
          <p className="drop-cap text-foreground/90 leading-relaxed text-sm sm:text-[15px] sm:leading-loose text-left sm:text-justify [text-wrap:pretty]">
            A rotina de uma unidade escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas 
            e urgências do dia a dia, sabemos que a organização administrativa exige tempo, atenção e, 
            muitas vezes, decisões rápidas.
          </p>
          
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border/50 shadow-xs my-6">
            <p className="text-foreground/90 font-medium text-sm sm:text-base leading-relaxed text-left sm:text-center [text-wrap:balance]">
              Por isso, a <strong className="text-primary font-bold">4ª Coordenadoria Regional de Educação</strong>, por meio 
              da Gerência de Administração (GAD), reafirma seu compromisso:
              <br className="hidden sm:block" />
              <span className="inline-block mt-2 sm:mt-3 px-4 py-1.5 rounded-lg bg-primary/10 text-primary-foreground/90 dark:text-primary-glow font-semibold border border-primary/20 text-sm">
                estar ao lado das equipes gestoras com orientação clara, apoio contínuo e diálogo.
              </span>
            </p>
          </div>

          <p className="text-foreground/85 leading-relaxed text-sm sm:text-[15px] sm:leading-loose text-left sm:text-justify [text-wrap:pretty]">
            A chegada do <strong className="font-semibold text-foreground">SEI!RIO</strong> representa uma mudança importante na forma como registramos, 
            acompanhamos e formalizamos os processos administrativos. Toda transição traz desafios, 
            e é exatamente nesse momento que a parceria entre a CRE e as unidades escolares faz diferença. 
          </p>
          
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-[15px] sm:leading-loose text-left sm:text-justify [text-wrap:pretty]">
            Este documento foi pensado para facilitar seu caminho. Nossa intenção é transformar regras e 
            etapas sistêmicas em rotinas mais simples, prevendo:
          </p>
          
          <ul className="grid gap-3 sm:grid-cols-2 mt-4 mb-6">
            <li className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-xs hover:border-primary/30 transition-colors">
              <div className="p-1.5 rounded-lg bg-success/10 text-success shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-sm font-medium text-foreground/80">Redução de inseguranças</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-xs hover:border-primary/30 transition-colors">
              <div className="p-1.5 rounded-lg bg-success/10 text-success shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-sm font-medium text-foreground/80">Evitar retrabalho comum</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-xs hover:border-primary/30 transition-colors">
              <div className="p-1.5 rounded-lg bg-success/10 text-success shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-sm font-medium text-foreground/80">Maior previsibilidade de rotinas</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-xs hover:border-primary/30 transition-colors">
              <div className="p-1.5 rounded-lg bg-success/10 text-success shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-sm font-medium text-foreground/80">Execução respeitando seu contexto</span>
            </li>
          </ul>

          <p className="text-foreground/85 italic leading-relaxed text-sm sm:text-base text-left sm:text-justify mt-6 border-l-2 border-primary/40 pl-4 py-1">
            Conte com a 4ª CRE/GAD. Seguimos à disposição para orientar, ouvir e aprimorar continuamente 
            esses materiais, em parceria com vocês.
          </p>
        </div>

        {/* Signatures */}
        <div className="mt-8 border-t border-border/55 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Assinaturas institucionais
          </p>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="rounded-[1.45rem] border border-border/60 bg-linear-to-br from-background via-background to-secondary/50 p-5 shadow-soft sm:p-6">
              <p className="font-heading text-sm font-bold text-foreground sm:text-base">Fátima das Graças Lima Barros</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Coordenadora – E/4ª CRE</p>
            </div>
            <div className="rounded-[1.45rem] border border-border/60 bg-linear-to-br from-background via-background to-secondary/50 p-5 shadow-soft sm:p-6">
              <p className="font-heading text-sm font-bold text-foreground sm:text-base">Bianca Barreto da Fonseca Coelho</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Gerente – E/4ª CRE/GAD</p>
            </div>
          </div>
        </div>

        {/* Subtle author byline */}
        <div className="mt-6 flex items-center justify-center gap-2 opacity-60 transition-opacity duration-500 hover:opacity-90 sm:justify-end">
          <div className="h-px flex-1 max-w-[60px]" style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--border)))'
          }} />
          <p className="text-[10px] tracking-wider text-muted-foreground">
            Elaborado por <span className="font-semibold">Wilson M. Peixoto</span> · SME/RJ
          </p>
        </div>
      </div>
    </section>
  );
};
