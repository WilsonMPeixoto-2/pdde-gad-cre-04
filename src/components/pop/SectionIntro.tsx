const coverMetrics = [
  {
    number: "01",
    label: "Finalidade",
    title: "Orientar a tramitação",
    description: "Da autuação ao acompanhamento da análise.",
  },
  {
    number: "02",
    label: "Público",
    title: "Direções e equipes gestoras",
    description: "Uso institucional nas unidades da 4ª CRE.",
  },
  {
    number: "03",
    label: "Estrutura",
    title: "Consulta por etapa",
    description: "Documentos, regras, ações e evidências.",
  },
  {
    number: "04",
    label: "Resultado esperado",
    title: "Processo rastreável",
    description: "Mais segurança e menos retrabalho.",
  },
] as const;

const commitmentPhrase =
  "estar ao lado das equipes gestoras, com orientação clara, apoio contínuo e diálogo.";

const presentationParagraphs = [
  `A rotina de uma gestão escolar é intensa. Entre demandas pedagógicas, cuidado com pessoas e urgências do dia a dia, sabemos que a organização administrativa exige tempo, atenção e, muitas vezes, decisões rápidas. Por isso, a 4ª Coordenadoria Regional de Educação, por meio da Gerência de Administração (GAD), reafirma aqui um compromisso simples e objetivo: ${commitmentPhrase}`,
  "A chegada do SEI!RIO representa uma mudança importante na forma como registramos, acompanhamos e formalizamos os processos administrativos. Toda transição traz desafios — e é exatamente nesse momento que a parceria entre CRE e escolas faz diferença. Este material foi pensado para facilitar o caminho, reduzir inseguranças, evitar retrabalho e dar mais previsibilidade às rotinas.",
  "Este é o primeiro de uma série de documentos de orientação que a 4ª CRE está construindo para apoiar as direções, tanto nos procedimentos de gestão escolar quanto no uso do novo sistema processual SEI!RIO. A cada novo guia, nossa intenção é a mesma: transformar regras e etapas em rotinas mais simples, seguras e executáveis, respeitando o contexto real de cada unidade.",
  "Conte com a 4ª CRE/GAD. Seguimos à disposição para orientar, ouvir e aprimorar continuamente esses materiais, em parceria com vocês.",
] as const;

const workingModes = ["Registramos", "Acompanhamos", "Formalizamos"] as const;

const responsiveImageSizes =
  "(min-width: 2400px) 1600px, (min-width: 1500px) 45vw, (min-width: 901px) 42vw, calc(100vw - 36px)";

export const SectionIntro = () => {
  const firstParagraphPrefix = presentationParagraphs[0].slice(
    0,
    -commitmentPhrase.length,
  );

  return (
    <div className="cover-intro-v5" data-cover-intro-version="6">
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

            <h1
              id="cover-intro-v5-title"
              className="cover-intro-v5__title"
              aria-label="Prestação de contas do PDDE no SEI!RIO"
            >
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
            <picture>
              <source
                type="image/avif"
                srcSet={[
                  "/editorial/hero-pdde/hero-pdde-960.avif 960w",
                  "/editorial/hero-pdde/hero-pdde-1600.avif 1600w",
                  "/editorial/hero-pdde/hero-pdde-2400.avif 2400w",
                  "/editorial/hero-pdde/hero-pdde-3200.avif 3200w",
                ].join(", ")}
                sizes={responsiveImageSizes}
              />
              <source
                type="image/webp"
                srcSet={[
                  "/editorial/hero-pdde/hero-pdde-960.webp 960w",
                  "/editorial/hero-pdde/hero-pdde-1600.webp 1600w",
                  "/editorial/hero-pdde/hero-pdde-2400.webp 2400w",
                  "/editorial/hero-pdde/hero-pdde-3200.webp 3200w",
                ].join(", ")}
                sizes={responsiveImageSizes}
              />
              <img
                src="/editorial/hero-pdde/hero-pdde-2400.jpg"
                alt="Professora conversa com duas crianças durante uma atividade de escrita em sala de aula."
                width={2400}
                height={3600}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <span className="cover-intro-v5__photo-shape" aria-hidden="true" />
            <figcaption className="cover-intro-v5__photo-caption">
              <strong>Orientação para a rotina real da unidade escolar</strong>
              <span>Conteúdo técnico organizado para apoiar decisões, conferências e registros.</span>
              <small>Foto: Katerina Holmes/Pexels.</small>
            </figcaption>
          </figure>
        </div>

        <div className="cover-intro-v5__metrics" aria-label="Síntese do guia">
          {coverMetrics.map(({ number, label, title, description }) => (
            <article key={number} className="cover-intro-v5__metric">
              <span className="cover-intro-v5__metric-number" aria-hidden="true">{number}</span>
              <div>
                <span className="cover-intro-v5__metric-label">{label}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="cover-intro-v5__introduction"
        aria-labelledby="cover-intro-v5-intro-title"
      >
        <header className="cover-intro-v5__intro-heading">
          <div>
            <p className="cover-intro-v5__section-label">Apresentação institucional</p>
            <h2 id="cover-intro-v5-intro-title">Prezados(as)<br />Diretores(as),</h2>
          </div>
          <blockquote>{commitmentPhrase}</blockquote>
        </header>

        <div className="cover-intro-v5__intro-composition">
          <section className="cover-intro-v5__opening-row">
            <article
              className="cover-intro-v5__opening-letter"
              aria-label="Primeiro parágrafo da apresentação institucional"
            >
              <span className="cover-intro-v5__watermark" aria-hidden="true">01</span>
              <p className="cover-intro-v5__drop-cap">
                {firstParagraphPrefix}<strong>{commitmentPhrase}</strong>
              </p>
            </article>

            <aside className="cover-intro-v5__commitment" aria-label="Compromisso institucional">
              <span>Compromisso institucional</span>
              <p>“{commitmentPhrase}”</p>
              <small>4ª Coordenadoria Regional de Educação</small>
            </aside>
          </section>

          <section className="cover-intro-v5__transition-row">
            <header>
              <span className="cover-intro-v5__watermark" aria-hidden="true">02</span>
              <h3>A chegada<br />do SEI!RIO</h3>
            </header>
            <article aria-label="Segundo parágrafo da apresentação institucional">
              <p>{presentationParagraphs[1]}</p>
              <div className="cover-intro-v5__working-modes" aria-label="Formas de trabalho citadas no texto">
                {workingModes.map((mode, index) => (
                  <div key={mode} data-tone={index + 1}>
                    <span>Forma de trabalho</span>
                    <strong>{mode}</strong>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="cover-intro-v5__series-row">
            <header>
              <span className="cover-intro-v5__watermark" aria-hidden="true">03</span>
              <h3>Série de documentos de orientação</h3>
            </header>
            <p>{presentationParagraphs[2]}</p>
          </section>

          <section className="cover-intro-v5__closing-row">
            <p>{presentationParagraphs[3]}</p>
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
          </section>
        </div>
      </section>
    </div>
  );
};
