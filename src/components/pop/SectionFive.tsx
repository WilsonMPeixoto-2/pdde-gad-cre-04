import {
  AlertCircle,
  CheckCircle2,
  FileSignature,
  PenLine,
  Send,
} from "lucide-react";
import { SectionLead } from "@/components/visual/SectionLead";
import { GAD_UNIT } from "@/lib/guideContent";
import { Callout } from "./Callout";
import { SeiMockup } from "./SeiMockup";

const includedDocuments = [
  "Documentos internos produzidos no SEI!RIO que exijam assinatura eletrônica",
  "Peça interna de encaminhamento, quando formalmente prevista no fluxo",
  "Outras manifestações internas cuja assinatura seja necessária antes da remessa",
] as const;

const excludedDocuments = [
  "Notas fiscais, extratos, atas e demais documentos externos",
  "Arquivos nato-digitais juntados como original eletrônico",
  "Documentos digitalizados já autenticados na etapa anterior",
] as const;

const blockSteps = [
  {
    title: "Selecionar um documento interno",
    description: "Abra uma peça interna ainda pendente de assinatura e utilize a ação de inclusão em bloco.",
  },
  {
    title: "Criar ou selecionar o bloco",
    description: "Utilize descrição objetiva, vinculada ao exercício e à unidade escolar, e inclua os demais documentos internos necessários.",
  },
  {
    title: "Concluir as assinaturas",
    description: "Acompanhe o bloco até que todas as assinaturas obrigatórias estejam registradas.",
  },
  {
    title: "Retornar ao processo",
    description: "Confirme na árvore se as peças internas estão assinadas antes de iniciar a remessa.",
  },
] as const;

const remittanceChecks = [
  "Documentos externos incluídos e identificados corretamente",
  "Arquivos digitalizados autenticados quando necessário",
  "Documentos internos obrigatórios assinados",
  "Peça de encaminhamento revisada, quando aplicável",
  "Unidade de destino confirmada no ambiente vigente do SEI!RIO",
] as const;

export const SectionFive = () => (
  <section className="space-y-8 editorial-section" data-editorial-section="signature">
    <SectionLead
      step="5"
      eyebrow="Documentos internos e remessa"
      title="Conclua as assinaturas antes de encaminhar o processo"
      description="O bloco de assinatura reúne somente documentos internos do SEI!RIO. Depois das assinaturas, faça a conferência final e tramite o processo para a unidade competente conforme o fluxo formal vigente."
      icon={FileSignature}
    />

    <section className="section-card editorial-block" data-editorial-role="decision" aria-labelledby="signature-block-definition-title">
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="amber">
          <PenLine aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Critério de inclusão</p>
          <h3 id="signature-block-definition-title">O que integra o bloco de assinatura</h3>
          <p>O bloco reúne documentos internos que precisam de assinatura eletrônica. Arquivos externos permanecem fora dele, ainda que façam parte do mesmo processo.</p>
        </div>
      </header>

      <div className="editorial-binary-choice editorial-binary-choice--signature">
        <article data-state="apply">
          <div className="editorial-binary-choice__icon">
            <CheckCircle2 aria-hidden="true" />
          </div>
          <span>Integram o bloco</span>
          <h4>Documentos internos</h4>
          <ul>
            {includedDocuments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article data-state="exclude">
          <div className="editorial-binary-choice__icon">
            <AlertCircle aria-hidden="true" />
          </div>
          <span>Não integram o bloco</span>
          <h4>Documentos externos</h4>
          <ul>
            {excludedDocuments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>

    <section className="section-card editorial-block" data-editorial-role="process" aria-labelledby="signature-block-procedure-title">
      <header className="editorial-block__heading editorial-block__heading--compact">
        <div>
          <p className="editorial-block__eyebrow">Fluxo de assinatura</p>
          <h3 id="signature-block-procedure-title">Montagem e acompanhamento do bloco</h3>
          <p>A montagem deve permitir identificar o exercício, a unidade e os documentos pendentes sem depender de explicação oral.</p>
        </div>
      </header>

      <ol className="editorial-process-list">
        {blockSteps.map((step, index) => (
          <li key={step.title} className="editorial-process-step">
            <span className="editorial-process-step__number">{index + 1}</span>
            <div className="editorial-process-step__content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="editorial-reference-code">
        <span>Descrição de referência</span>
        <code>Assinatura — Prestação de Contas PDDE — Exercício AAAA — Nome da Unidade Escolar</code>
      </div>

      <figure className="editorial-system-reference editorial-system-reference--wide">
        <SeiMockup variant="signature-block" />
        <figcaption>Referência visual do bloco de assinatura no SEI!RIO.</figcaption>
      </figure>
    </section>

    <section className="section-card editorial-block" data-editorial-role="transition" aria-labelledby="forwarding-document-title">
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="blue">
          <Send aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Encaminhamento formal</p>
          <h3 id="forwarding-document-title">Peça de encaminhamento e remessa</h3>
          <p>Quando o fluxo formal exigir ofício ou despacho, a peça deve identificar o processo e registrar o encaminhamento sem antecipar decisão, aprovação ou conclusão de regularidade.</p>
        </div>
      </header>

      <div className="editorial-callout-pair">
        <Callout variant="warning" title="Validação local necessária">
          <p className="text-sm leading-7">
            A obrigatoriedade, o tipo documental, o signatário, o conteúdo e a unidade de destino dependem de orientação institucional vigente. As minutas disponíveis no guia são apenas apoio de redação.
          </p>
        </Callout>

        <article className="editorial-context-card">
          <span>Unidade apresentada como referência local</span>
          <h4>{GAD_UNIT.fullLabel}</h4>
          <p>Confirme no SEI!RIO se o código e a denominação permanecem vigentes antes da tramitação.</p>
        </article>
      </div>
    </section>

    <section className="section-card editorial-block" data-editorial-role="control" aria-labelledby="remittance-check-title">
      <header className="editorial-block__heading editorial-block__heading--compact">
        <div>
          <p className="editorial-block__eyebrow">Condição para prosseguir</p>
          <h3 id="remittance-check-title">Conferência final antes da remessa</h3>
          <p>Todos os critérios abaixo devem estar atendidos antes do envio à unidade competente.</p>
        </div>
      </header>

      <div className="editorial-check-list">
        {remittanceChecks.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>

      <p className="editorial-blocking-note">
        Não tramite o processo enquanto houver documento interno obrigatório sem assinatura ou pendência conhecida de instrução.
      </p>
    </section>
  </section>
);
