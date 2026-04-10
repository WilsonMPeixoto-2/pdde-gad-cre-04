import { BadgeCheck, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

export const SectionIntro = () => {
  return (
    <section id="introducao" className="scroll-mt-20 animate-fade-in">
      {/* Welcome Message */}
      <div className="section-card">
        <span className="kicker-label mb-4">
          <HeartHandshake className="h-3.5 w-3.5" />
          Mensagem de abertura
        </span>
        <h2 className="section-heading text-xl sm:text-2xl">
          Prezados(as) Diretores(as),
        </h2>
        <div className="prose-institutional">
          <p className="lead-text drop-cap text-left sm:text-justify">
            A rotina de uma unidade escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas 
            e urgências do dia a dia, sabemos que a organização administrativa exige tempo, atenção e, 
            muitas vezes, decisões rápidas.
          </p>
          
          <div className="info-panel my-6">
            <p className="info-panel-title text-primary">
              <ShieldCheck className="h-4 w-4" />
              Compromisso institucional
            </p>
            <p className="info-panel-copy text-left sm:text-center">
              A <strong className="text-primary font-bold">4ª Coordenadoria Regional de Educação</strong>, por
              meio da Gerência de Administração (GAD), reafirma seu compromisso de{" "}
              <strong className="text-foreground">estar ao lado das equipes gestoras</strong> com orientação
              clara, apoio contínuo e diálogo.
            </p>
          </div>

          <p className="text-left sm:text-justify">
            A chegada do <strong>SEI!RIO</strong> representa uma mudança importante na forma como registramos, 
            acompanhamos e formalizamos os processos administrativos. Toda transição traz desafios, 
            e é exatamente nesse momento que a parceria entre a CRE e as unidades escolares faz diferença. 
          </p>

          <div className="divider-soft" />
          
          <p className="text-left sm:text-justify">
            Este documento foi pensado para facilitar seu caminho. Nossa intenção é transformar regras e 
            etapas sistêmicas em rotinas mais simples, prevendo:
          </p>
          
          <ul className="grid gap-3 sm:grid-cols-2 mt-4 mb-6 !pl-0 list-none !space-y-0">
            <li className="info-panel flex items-start gap-3 !p-4 !leading-normal !text-inherit">
              <div className="mt-0.5 shrink-0 rounded-xl bg-success/12 p-2 text-success">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground !mb-0">Redução de inseguranças</p>
                <p className="mt-1 text-sm leading-6 text-foreground/72 !mb-0 !max-w-none">
                  Orientações mais claras para executar cada etapa com menos dúvidas.
                </p>
              </div>
            </li>
            <li className="info-panel flex items-start gap-3 !p-4 !leading-normal !text-inherit">
              <div className="mt-0.5 shrink-0 rounded-xl bg-success/12 p-2 text-success">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground !mb-0">Evitar retrabalho comum</p>
                <p className="mt-1 text-sm leading-6 text-foreground/72 !mb-0 !max-w-none">
                  Menos correções posteriores por falhas de instrução e padronização.
                </p>
              </div>
            </li>
            <li className="info-panel flex items-start gap-3 !p-4 !leading-normal !text-inherit">
              <div className="mt-0.5 shrink-0 rounded-xl bg-success/12 p-2 text-success">
                <BadgeCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground !mb-0">Maior previsibilidade de rotinas</p>
                <p className="mt-1 text-sm leading-6 text-foreground/72 !mb-0 !max-w-none">
                  Um fluxo mais estável para consulta, conferência e remessa processual.
                </p>
              </div>
            </li>
            <li className="info-panel flex items-start gap-3 !p-4 !leading-normal !text-inherit">
              <div className="mt-0.5 shrink-0 rounded-xl bg-success/12 p-2 text-success">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground !mb-0">Execução respeitando seu contexto</p>
                <p className="mt-1 text-sm leading-6 text-foreground/72 !mb-0 !max-w-none">
                  Aplicação prática pensada para a realidade cotidiana das unidades escolares.
                </p>
              </div>
            </li>
          </ul>

          <div className="rule-card mt-6 pl-5">
            <p className="italic text-foreground/85 text-sm sm:text-base text-left sm:text-justify !mb-0">
              Conte com a 4ª CRE/GAD. Seguimos à disposição para orientar, ouvir e aprimorar continuamente 
              esses materiais, em parceria com vocês.
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-8 border-t border-border/55 pt-6">
          <p className="subsection-title mb-4">
            Assinaturas institucionais
          </p>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="info-panel">
              <p className="font-heading text-sm font-bold text-foreground sm:text-base">Fátima das Graças Lima Barros</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Coordenadora – E/4ª CRE</p>
            </div>
            <div className="info-panel">
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
