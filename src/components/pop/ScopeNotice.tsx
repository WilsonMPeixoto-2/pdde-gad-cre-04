import { AlertTriangle, ExternalLink, Scale, ShieldCheck } from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { normativeSources } from "@/lib/normativeSources";
import { ProcessJourneyMap } from "./ProcessJourneyMap";

const sourceLinks = [
  normativeSources.resolution15_2021,
  normativeSources.resolution7_2024,
] as const;

export const ScopeNotice = () => (
  <div className="cover-intro-v5__scope-stack">
    <section className="cover-intro-v5__scope" aria-labelledby="scope-notice-title">
      <header className="cover-intro-v5__scope-header">
        <span className="cover-intro-v5__scope-icon" aria-hidden="true"><ShieldCheck /></span>
        <div>
          <p>Escopo institucional</p>
          <h3 id="scope-notice-title">Escopo e limites deste guia</h3>
        </div>
      </header>

      <div className="cover-intro-v5__scope-grid">
        <article className="cover-intro-v5__scope-panel cover-intro-v5__scope-panel--guide">
          <span>O que este guia orienta</span>
          <p>
            Este material orienta a autuação, a instrução, a assinatura e a tramitação, no SEI!RIO,
            do processo local de prestação de contas do PDDE das UEx/CEC vinculadas à 4ª CRE.
          </p>
        </article>

        <article className="cover-intro-v5__scope-panel cover-intro-v5__scope-panel--boundary">
          <span>O que este guia não substitui</span>
          <p>
            O processo administrativo municipal não substitui os registros, as classificações, os
            documentos ou os procedimentos exigidos pelo FNDE na Solução BB Gestão Ágil, no SiGPC ou
            em outro ambiente federal aplicável ao exercício.
          </p>
        </article>
      </div>

      <div className="cover-intro-v5__normative-band">
        <span className="cover-intro-v5__normative-icon" aria-hidden="true"><Scale /></span>
        <div>
          <strong>Prevalência normativa</strong>
          <p>
            Em matéria de execução e prestação de contas dos recursos federais, prevalecem as normas
            do FNDE e os normativos específicos de cada ação integrada. Os prazos internos de remessa
            à GAD serão aqueles formalmente comunicados pela SME-Rio ou pela 4ª CRE para cada ciclo.
          </p>
        </div>
      </div>

      <div className="cover-intro-v5__local-reference">
        <span aria-hidden="true"><AlertTriangle /></span>
        <div>
          <strong>Referências operacionais locais</strong>
          <p>
            Tipo processual, classificação, código da GAD, interessados, padrão de especificação, uso
            do CNPJ em observações e peças de encaminhamento são referências operacionais locais.
            Antes de tratá-las como obrigação definitiva, confirme a configuração atual do SEI!RIO e
            a orientação formal vigente da SME-Rio ou da 4ª CRE.
          </p>
        </div>
      </div>

      <footer className="cover-intro-v5__scope-sources" aria-label="Fontes normativas relacionadas">
        <span>Fontes normativas relacionadas</span>
        <div>
          {sourceLinks.map((source) => (
            <a key={source.officialUrl} href={source.officialUrl} target="_blank" rel="noopener noreferrer">
              {source.title}
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </footer>
    </section>

    <div id={GUIDE_ANCHORS.journey} className="cover-intro-v5__journey scroll-mt-28">
      <ProcessJourneyMap />
    </div>
  </div>
);
