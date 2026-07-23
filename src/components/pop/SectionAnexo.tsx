import {
  ExternalLink,
  Gavel,
  MapPinned,
  Scale,
} from "lucide-react";
import { ApplicabilityMatrix } from "@/components/legal/ApplicabilityMatrix";
import { SectionLead } from "@/components/visual/SectionLead";
import { localOperationalRules } from "@/lib/localOperationalRules";
import { normativeSources, type NormativeSourceId } from "@/lib/normativeSources";

const federalSourceIds = [
  "resolution15_2021",
  "resolution7_2024",
  "comunicado47_2024",
  "comunicado01_2026",
  "bbGestaoAgilFaq",
] as const satisfies readonly NormativeSourceId[];

const municipalSourceIds = [
  "decretoRio47769_2020",
  "seiRioCriarProcesso",
  "seiRioIncluirDocumentos",
  "seiRioBlocoAssinatura",
] as const satisfies readonly NormativeSourceId[];

const SourceCard = ({ sourceId, level, index }: { sourceId: NormativeSourceId; level: "federal" | "municipal"; index: number }) => {
  const source = normativeSources[sourceId];
  const levelLabel = level === "federal" ? "Fonte federal" : "Fonte municipal";
  const Icon = level === "federal" ? Gavel : Scale;

  return (
    <a
      href={source.officialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="editorial-source-card"
      data-level={level}
    >
      <div className="editorial-source-card__index">{String(index).padStart(2, "0")}</div>
      <div className="editorial-source-card__icon">
        <Icon aria-hidden="true" />
      </div>
      <div className="editorial-source-card__body">
        <span>{levelLabel}</span>
        <h4>{source.title}</h4>
        <p>{source.issuingBody}</p>
      </div>
      <ExternalLink aria-hidden="true" />
    </a>
  );
};

export const SectionAnexo = () => (
  <section id="anexo" className="scroll-mt-20 space-y-8 editorial-section" data-editorial-section="references">
    <SectionLead
      eyebrow="Consulta de referência"
      title="Fontes oficiais, vigência e aplicabilidade"
      description="Esta seção reúne a matriz temporal e os documentos oficiais utilizados pelo guia. A explicação das peças permanece na Etapa 2; aqui ficam as fontes necessárias para verificar fundamento, vigência e alcance."
      icon={Scale}
    />

    <section className="section-card editorial-block" data-editorial-role="applicability" aria-labelledby="applicability-title">
      <header className="editorial-block__heading editorial-block__heading--compact">
        <div>
          <p className="editorial-block__eyebrow">Recorte temporal</p>
          <h3 id="applicability-title">Aplicabilidade por exercício</h3>
          <p>Utilize a matriz para identificar quais orientações estão verificadas e quais ainda dependem de validação específica antes de serem aplicadas ao processo.</p>
        </div>
      </header>
      <div className="editorial-applicability-frame">
        <ApplicabilityMatrix />
      </div>
    </section>

    <section className="section-card editorial-block" data-editorial-role="sources" aria-labelledby="federal-sources-title">
      <header className="editorial-source-section-heading" data-level="federal">
        <div>
          <span>Camada normativa federal</span>
          <h3 id="federal-sources-title">Fontes federais prioritárias</h3>
          <p>Consulte a resolução-base, seus atos modificadores e as orientações específicas do exercício ou do ambiente federal utilizado.</p>
        </div>
      </header>
      <div className="editorial-source-card-grid">
        {federalSourceIds.map((sourceId, index) => (
          <SourceCard key={sourceId} sourceId={sourceId} level="federal" index={index + 1} />
        ))}
      </div>
    </section>

    <section className="section-card editorial-block" data-editorial-role="sources" aria-labelledby="municipal-sources-title">
      <header className="editorial-source-section-heading" data-level="municipal">
        <div>
          <span>Camada operacional municipal</span>
          <h3 id="municipal-sources-title">Fontes municipais e guias do SEI!RIO</h3>
          <p>Estas referências orientam o tratamento documental e o uso do sistema, sem substituir as regras federais do PDDE.</p>
        </div>
      </header>
      <div className="editorial-source-card-grid">
        {municipalSourceIds.map((sourceId, index) => (
          <SourceCard key={sourceId} sourceId={sourceId} level="municipal" index={index + 1} />
        ))}
      </div>
    </section>

    <aside className="editorial-validation-notice" aria-labelledby="local-validation-title">
      <div className="editorial-validation-notice__icon">
        <MapPinned aria-hidden="true" />
      </div>
      <div>
        <span>Governança e homologação</span>
        <h3 id="local-validation-title">Orientações locais ainda dependem de fonte formal</h3>
        <p>
          O registro de governança contém {localOperationalRules.length} referências operacionais locais pendentes de fonte ou validação formal. Enquanto permanecerem nesse estado, elas devem ser apresentadas como referência provisória, e não como obrigação institucional definitiva.
        </p>
      </div>
    </aside>
  </section>
);
