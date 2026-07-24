import {
  BookOpenCheck,
  FileText,
  Route,
  ShieldCheck,
} from "lucide-react";

const coverMetrics = [
  {
    number: "01",
    label: "Finalidade",
    title: "Orientar a tramitação",
    description: "Da autuação ao acompanhamento da análise.",
    icon: Route,
  },
  {
    number: "02",
    label: "Público",
    title: "Direções e equipes gestoras",
    description: "Uso institucional nas unidades da 4ª CRE.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    label: "Estrutura",
    title: "Consulta por etapa",
    description: "Documentos, regras, ações e evidências.",
    icon: BookOpenCheck,
  },
  {
    number: "04",
    label: "Resultado esperado",
    title: "Processo rastreável",
    description: "Mais segurança e menos retrabalho.",
    icon: FileText,
  },
] as const;

const presentationParagraphs = [
  <>
    A rotina de uma gestão escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas e urgências do
    dia a dia, sabemos que a organização administrativa exige tempo, atenção e, muitas vezes, decisões rápidas.
    Por isso, a 4ª Coordenadoria Regional de Educação, por meio da Gerência de Administração (GAD), reafirma
    aqui um compromisso simples e objetivo:
    <strong> estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.</strong>
  </>,
  <>
    A chegada do SEI!RIO representa uma mudança importante na forma como registramos, acompanhamos e
    formalizamos os processos administrativos. Toda transição traz desafios — e é exatamente nesse momento que
    a parceria entre CRE e escolas faz diferença. Este material foi pensado para facilitar o caminho, reduzir
    inseguranças, evitar retrabalho e dar mais previsibilidade às rotinas.
  </>,
  <>
    Este é o primeiro de uma série de documentos de orientação que a 4ª CRE está construindo para apoiar as
    direções, tanto nos procedimentos de gestão escolar quanto no uso do novo sistema processual SEI!RIO. A cada
    novo guia, nossa intenção é a mesma: transformar regras e etapas em rotinas mais simples, seguras e
    executáveis, respeitando o contexto real de cada unidade.
  </>,
  <>
    Conte com a 4ª CRE/GAD. Seguimos à disposição para orientar, ouvir e aprimorar continuamente esses
    materiais, em parceria com vocês.
  </>,
] as const;

export const SectionIntro = () => {
  return (
    <div className="cover-intro-v5" data-cover-intro-version="5">
      <section
        id="hero-cover"
        className="cover-intro-v5__cover"
        aria-labelledby="cover-intro-v5-title"
      >
        <div className="cover-intro-v5__feature">
          <div className="cover-intro-v5__copy">
            <p className="cover-intro-v5__institution">
              4ª Coordenadoria Regional de Educação · GAD
            </p>

            <h1 id="cover-intro-v5-title" className="cover-intro-v5__title">
              <span>Prestação de</span>
              <span>contas do PDDE</span>
              <span className="cover-intro-v5__title-accent">no SEI!RIO</span>
            </h1>

            <p className="cover-intro-v5__deck">
              Um guia operacional para transformar normas, documentos e registros em uma rotina segura,
              rastreável e executável pela unidade escolar.
            </p>

            <div className="cover-intro-v5__orientation" aria-label="Orientação de leitura inicial">
              <span>Leitura inicial</span>
              <strong>Apresentação institucional e escopo do guia</strong>
            </div>
          </div>

          <figure className="cover-intro-v5__visual">
            <img
              src="https://images.pexels.com/photos/5905486/pexels-photo-5905486.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1853&fit=crop"
              alt="Educadora acompanha estudante durante uma atividade de registro e organização escolar."
              width={2400}
              height={1853}
              fetchPriority="high"
              decoding="async"
            />
            <span className="cover-intro-v5__photo-shape" aria-hidden="true" />
            <figcaption className="cover-intro-v5__photo-caption">
              <strong>Orientação para a rotina real da unidade escolar</strong>
              <span>Conteúdo técnico organizado para apoiar decisões, conferências e registros.</span>
              <small>Foto: Katerina Holmes/Pexels.</small>
            </figcaption>
          </figure>
        </div>

        <div className="cover-intro-v5__metrics" aria-label="Síntese do guia">
          {coverMetrics.map(({ number, label, title, description, icon: Icon }) => (
            <article key={number} className="cover-intro-v5__metric">
              <span className="cover-intro-v5__metric-number" aria-hidden="true">{number}</span>
              <span className="cover-intro-v5__metric-icon" aria-hidden="true"><Icon /></span>
              <div>
                <span className="cover-intro-v5__metric-label">{label}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cover-intro-v5__introduction" aria-labelledby="cover-intro-v5-intro-title">
        <header className="cover-intro-v5__intro-heading">
          <div>
            <p className="cover-intro-v5__section-label">Apresentação institucional</p>
            <h2 id="cover-intro-v5-intro-title">Prezados(as)<br />Diretores(as),</h2>
          </div>
          <blockquote>
            Estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.
          </blockquote>
        </header>

        <div className="cover-intro-v5__intro-spread">
          <article className="cover-intro-v5__letter" aria-label="Texto integral da apresentação institucional">
            {presentationParagraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "cover-intro-v5__drop-cap" : undefined}>
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="cover-intro-v5__intro-rail" aria-label="Síntese e assinatura institucional">
            <div className="cover-intro-v5__commitment">
              <span>Compromisso institucional</span>
              <p>Orientação clara, apoio contínuo e diálogo com as equipes gestoras.</p>
            </div>

            <div className="cover-intro-v5__reading-path" aria-label="Como ler esta abertura">
              <span>Como ler esta abertura</span>
              <ol>
                <li><b>1</b><span>Compreenda o contexto da transição.</span></li>
                <li><b>2</b><span>Consulte o escopo e os limites.</span></li>
                <li><b>3</b><span>Visualize o percurso completo.</span></li>
              </ol>
            </div>

            <div className="cover-intro-v5__signatures" aria-label="Assinam esta apresentação">
              <span>Assinam esta apresentação</span>
              <div>
                <strong>Fátima das Graças Lima Barros</strong>
                <small>Coordenadora – E/4ª CRE</small>
              </div>
              <div>
                <strong>Bianca Barreto da Fonseca Coelho</strong>
                <small>Gerente – E/4ª CRE/GAD</small>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
