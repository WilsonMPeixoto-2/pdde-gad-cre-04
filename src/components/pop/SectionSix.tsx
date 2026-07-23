import {
  AlertCircle,
  FileSearch,
  PackageCheck,
  Reply,
  Send,
} from "lucide-react";
import { SectionLead } from "@/components/visual/SectionLead";

const followUpSteps = [
  {
    number: "1",
    title: "Acompanhar a tramitação",
    description:
      "Consulte o processo no SEI!RIO após a remessa e verifique se houve recebimento, devolução ou solicitação de complementação.",
    icon: FileSearch,
  },
  {
    number: "2",
    title: "Atender eventual diligência",
    description:
      "Quando houver pendência formalmente registrada, complemente ou corrija a instrução e mantenha a resposta vinculada ao mesmo processo.",
    icon: Reply,
  },
  {
    number: "3",
    title: "Observar a providência comunicada",
    description:
      "A manifestação, a autoridade competente e o encerramento devem seguir o fluxo formal vigente para o respectivo ciclo.",
    icon: Send,
  },
] as const;

export const SectionSix = () => (
  <section className="space-y-8 editorial-section" data-editorial-section="follow-up">
    <SectionLead
      step="6"
      eyebrow="Após a remessa"
      title="Acompanhe a análise e responda somente ao que for formalmente solicitado"
      description="A remessa não encerra automaticamente o processo. A unidade deve acompanhar a tramitação, atender diligências e observar a providência registrada pela unidade competente, sem presumir aprovação ou encerramento."
      icon={FileSearch}
    />

    <section
      className="section-card editorial-block"
      data-editorial-role="process"
      aria-labelledby="post-remittance-steps-title"
    >
      <header className="editorial-block__heading editorial-block__heading--compact">
        <div>
          <p className="editorial-block__eyebrow">Fluxo de acompanhamento</p>
          <h3 id="post-remittance-steps-title">Sequência de acompanhamento</h3>
          <p>
            A unidade permanece responsável por acompanhar o processo e responder às comunicações formais sem criar etapas, conclusões ou exigências não registradas.
          </p>
        </div>
      </header>

      <ol className="editorial-follow-up-flow">
        {followUpSteps.map((step) => {
          const Icon = step.icon;
          return (
            <li key={step.number}>
              <div className="editorial-follow-up-flow__marker">
                <span>{step.number}</span>
                <Icon aria-hidden="true" />
              </div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>

    <section className="editorial-boundary-grid" aria-label="Limites e providências complementares">
      <article className="editorial-boundary-card" data-tone="amber" aria-labelledby="post-remittance-limit-title">
        <div className="editorial-boundary-card__heading">
          <AlertCircle aria-hidden="true" />
          <div>
            <span>Limite da orientação</span>
            <h3 id="post-remittance-limit-title">Decisão e encerramento</h3>
          </div>
        </div>
        <p>
          Este guia não define autoridade decisória, manifestação conclusiva ou procedimento de arquivamento sem fonte formal. Essas etapas devem seguir a orientação vigente da SME-Rio e da 4ª CRE.
        </p>
      </article>

      <article className="editorial-boundary-card" data-tone="teal" aria-labelledby="patrimonial-follow-up-title">
        <div className="editorial-boundary-card__heading">
          <PackageCheck aria-hidden="true" />
          <div>
            <span>Providência complementar</span>
            <h3 id="patrimonial-follow-up-title">Despesa de capital</h3>
          </div>
        </div>
        <p>
          Quando houver bem permanente, acompanhe também a documentação de doação, incorporação e controle patrimonial exigida pelo procedimento formal aplicável. O fluxo completo do sistema patrimonial municipal permanece fora do escopo deste guia.
        </p>
      </article>
    </section>
  </section>
);
