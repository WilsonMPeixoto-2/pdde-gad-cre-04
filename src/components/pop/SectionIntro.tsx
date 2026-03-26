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
            A rotina de uma gestão escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas 
            e urgências do dia a dia, sabemos que a organização administrativa exige tempo, atenção e, 
            muitas vezes, decisões rápidas. Por isso, a 4ª Coordenadoria Regional de Educação, por meio 
            da Gerência de Administração (GAD), reafirma aqui um compromisso simples e objetivo: 
            <strong className="text-foreground font-semibold"> estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.</strong>
          </p>
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base [text-wrap:pretty]">
            A chegada do SEI!RIO representa uma mudança importante na forma como registramos, 
            acompanhamos e formalizamos os processos administrativos. Toda transição traz desafios — 
            e é exatamente nesse momento que a parceria entre CRE e escolas faz diferença. 
            Este material foi pensado para facilitar o caminho, reduzir inseguranças, evitar retrabalho 
            e dar mais previsibilidade às rotinas.
          </p>
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base [text-wrap:pretty]">
            Este guia tem um objetivo prático e delimitado: orientar a <strong className="text-foreground font-semibold">instrução processual da prestação de contas do PDDE no SEI!RIO</strong>. Ele não se propõe a esgotar todas as regras do programa, mas a mostrar, de forma executável, <strong className="text-foreground font-semibold">quais documentos reunir, como preencher as peças mais usuais e como organizar corretamente os autos</strong>.
          </p>
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base [text-wrap:pretty]">
            Este é o primeiro de uma série de documentos de orientação que a 4ª CRE está construindo 
            para apoiar as direções, tanto nos procedimentos de gestão escolar quanto no uso do novo 
            sistema processual SEI!RIO. A cada novo guia, nossa intenção é a mesma: transformar regras 
            e etapas em rotinas mais simples, seguras e executáveis, respeitando o contexto real de cada unidade.
          </p>
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base [text-wrap:pretty]">
            Conte com a 4ª CRE/GAD. Seguimos à disposição para orientar, ouvir e aprimorar continuamente 
            esses materiais, em parceria com vocês.
          </p>
        </div>

        {/* Signatures */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8 pt-6 border-t border-border">
          <div className="rounded-[1.4rem] border border-border/60 bg-gradient-to-br from-secondary/60 to-background p-5 text-center shadow-soft dark:from-secondary/30 dark:to-background sm:p-6">
            <p className="font-heading text-sm font-bold text-foreground sm:text-base">Fátima das Graças Lima Barros</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Coordenadora – E/4ª CRE</p>
          </div>
          <div className="rounded-[1.4rem] border border-border/60 bg-gradient-to-br from-secondary/60 to-background p-5 text-center shadow-soft dark:from-secondary/30 dark:to-background sm:p-6">
            <p className="font-heading text-sm font-bold text-foreground sm:text-base">Bianca Barreto da Fonseca Coelho</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Gerente – E/4ª CRE/GAD</p>
          </div>
        </div>
      </div>
    </section>
  );
};
