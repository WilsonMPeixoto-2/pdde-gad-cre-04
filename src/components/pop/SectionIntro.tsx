export const SectionIntro = () => {
  return (
    <section id="introducao" className="scroll-mt-20 animate-fade-in">
      {/* Welcome Message */}
      <div className="section-card">
        <h2 className="section-heading text-xl sm:text-2xl">
          Prezados(as) Diretores(as),
        </h2>
        <div className="content-spacing space-y-5">
          <p className="drop-cap text-foreground/90 leading-relaxed text-sm sm:text-base text-left sm:text-justify [text-wrap:pretty]">
            A rotina de uma unidade escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas 
            e urgências do dia a dia, sabemos que a organização administrativa exige tempo, atenção e, 
            muitas vezes, decisões rápidas. Por isso, a 4ª Coordenadoria Regional de Educação, por meio 
            da Gerência de Administração (GAD), reafirma aqui um compromisso simples e objetivo: 
            <strong className="text-foreground font-semibold"> estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.</strong>
          </p>
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base text-left sm:text-justify [text-wrap:pretty]">
            A chegada do SEI!RIO representa uma mudança importante na forma como registramos, 
            acompanhamos e formalizamos os processos administrativos. Toda transição traz desafios — 
            e é exatamente nesse momento que a parceria entre CRE e unidades escolares faz diferença. 
            Este material foi pensado para facilitar o caminho, reduzir inseguranças, evitar retrabalho 
            e dar mais previsibilidade às rotinas.
          </p>
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base text-left sm:text-justify [text-wrap:pretty]">
            Este é o primeiro de uma série de documentos de orientação que a 4ª CRE está construindo 
            para apoiar as direções, tanto nos procedimentos de gestão da unidade escolar quanto no uso do novo 
            sistema processual SEI!RIO. A cada novo guia, nossa intenção é a mesma: transformar regras 
            e etapas em rotinas mais simples, seguras e executáveis, respeitando o contexto real de cada unidade.
          </p>
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base text-left sm:text-justify [text-wrap:pretty]">
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
