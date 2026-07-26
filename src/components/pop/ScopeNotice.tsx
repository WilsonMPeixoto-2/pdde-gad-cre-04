import { ExternalLink } from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { normativeSources } from "@/lib/normativeSources";
import { ProcessJourneyMap } from "./ProcessJourneyMap";

const sourceLinks = [
  normativeSources.resolution15_2021,
  normativeSources.resolution7_2024,
] as const;

const scopeItems = [
  {
    number: "01",
    title: "Objeto do guia",
    tone: "blue",
    content:
      "Este material orienta a autuação, a instrução, a assinatura e a tramitação, no SEI!RIO, do processo local de prestação de contas do PDDE das UEx/CEC vinculadas à 4ª CRE.",
  },
  {
    number: "02",
    title: "Relação com os ambientes federais",
    tone: "violet",
    content:
      "O processo administrativo municipal não substitui os registros, as classificações, os documentos ou os procedimentos exigidos pelo FNDE na Solução BB Gestão Ágil, no SiGPC ou em outro ambiente federal aplicável ao exercício.",
  },
  {
    number: "03",
    title: "Prevalência normativa e prazos internos",
    tone: "teal",
    content:
      "Em matéria de execução e prestação de contas dos recursos federais, prevalecem as normas do FNDE e os normativos específicos de cada ação integrada. Os prazos internos de remessa à GAD serão aqueles formalmente comunicados pela SME-Rio ou pela 4ª CRE para cada ciclo.",
  },
  {
    number: "04",
    title: "Referências operacionais locais",
    tone: "amber",
    content:
      "Tipo processual, classificação, código da GAD, interessados, padrão de especificação, uso do CNPJ em observações e peças de encaminhamento são referências operacionais locais. Antes de tratá-las como obrigação definitiva, confirme a configuração atual do SEI!RIO e a orientação formal vigente da SME-Rio ou da 4ª CRE.",
  },
] as const;

export const ScopeNotice = () => (
  <div className="cover-intro-v5__scope-stack">
    <section className="cover-intro-v5__scope" aria-labelledby="scope-notice-title">
      <header className="cover-intro-v5__scope-header">
        <div>
          <p>Delimitação operacional</p>
          <h2 id="scope-notice-title">Escopo e limites<br />deste guia</h2>
        </div>

        <div
          className="cover-intro-v5__scope-index"
          role="img"
          aria-label="Quatro dimensões do escopo"
        >
          {scopeItems.map(({ number, tone }) => (
            <span key={number} data-tone={tone} aria-hidden="true">{number}</span>
          ))}
        </div>
      </header>

      <div className="cover-intro-v5__scope-grid">
        {scopeItems.map(({ number, title, tone, content }, index) => (
          <article
            key={number}
            className="cover-intro-v5__scope-panel"
            data-tone={tone}
          >
            <span className="cover-intro-v5__watermark" aria-hidden="true">{number}</span>
            <h3>{title}</h3>
            <p className={index === 3 ? "cover-intro-v5__scope-emphasis" : undefined}>
              {content}
            </p>

            {index === 2 ? (
              <footer className="cover-intro-v5__scope-sources" aria-label="Fontes normativas relacionadas">
                {sourceLinks.map((source) => (
                  <a
                    key={source.officialUrl}
                    href={source.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                    <ExternalLink aria-hidden="true" />
                  </a>
                ))}
              </footer>
            ) : null}
          </article>
        ))}
      </div>
    </section>

    <div id={GUIDE_ANCHORS.journey} className="cover-intro-v5__journey scroll-mt-28">
      <ProcessJourneyMap />
    </div>
  </div>
);
