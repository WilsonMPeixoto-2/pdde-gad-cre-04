import {
  AlertCircle,
  CheckCircle2,
  FileDigit,
  ScanLine,
  Shield,
} from "lucide-react";
import { SectionLead } from "@/components/visual/SectionLead";
import { SeiMockup } from "./SeiMockup";
import { Callout } from "./Callout";

const authenticationSteps = [
  "Localize na árvore o documento externo que foi classificado como digitalizado.",
  "Acione o comando de autenticação somente para esse arquivo.",
  "Confirme se o tipo de conferência corresponde ao documento efetivamente apresentado.",
  "Finalize a operação e verifique se o registro ficou visível na árvore do processo.",
] as const;

const finalChecks = [
  "O documento continua identificado corretamente na árvore.",
  "A autenticação está vinculada ao item digitalizado.",
  "Nenhum arquivo nato-digital foi autenticado indevidamente.",
] as const;

export const SectionFour = () => (
  <section className="space-y-8 editorial-section" data-editorial-section="authentication">
    <SectionLead
      step="4"
      eyebrow="Conferência da origem documental"
      title="Autentique somente os documentos que vieram do papel"
      description="A classificação entre digitalizado e nato-digital já foi definida na Etapa 3. Aqui, o objetivo é autenticar os arquivos digitalizados, registrar o tipo de conferência adequado e confirmar o resultado na árvore."
      icon={Shield}
    />

    <section className="section-card editorial-block" data-editorial-role="scope" aria-labelledby="authentication-scope-title">
      <header className="editorial-block__heading editorial-block__heading--compact">
        <div>
          <p className="editorial-block__eyebrow">Escopo da etapa</p>
          <h3 id="authentication-scope-title">O que entra e o que não entra nesta etapa</h3>
          <p>A origem do arquivo determina o procedimento. A distinção deve permanecer explícita também sem depender apenas da cor.</p>
        </div>
      </header>

      <div className="editorial-binary-choice">
        <article data-state="apply">
          <div className="editorial-binary-choice__icon">
            <ScanLine aria-hidden="true" />
          </div>
          <span>Autenticar</span>
          <h4>Documento digitalizado</h4>
          <p>É o arquivo produzido a partir de documento em papel. A autenticação deve refletir o tipo de conferência informado no momento da inclusão.</p>
        </article>

        <article data-state="exclude">
          <div className="editorial-binary-choice__icon">
            <FileDigit aria-hidden="true" />
          </div>
          <span>Não autenticar</span>
          <h4>Documento nato-digital</h4>
          <p>É o arquivo criado ou recebido originalmente em meio eletrônico. Ele permanece juntado como original eletrônico e não recebe conferência de documento em papel.</p>
        </article>
      </div>
    </section>

    <section className="section-card editorial-block" data-editorial-role="process" aria-labelledby="authentication-procedure-title">
      <header className="editorial-block__heading editorial-block__heading--compact">
        <div>
          <p className="editorial-block__eyebrow">Fluxo operacional</p>
          <h3 id="authentication-procedure-title">Procedimento de autenticação</h3>
          <p>Execute a sequência sem alterar a classificação definida na etapa anterior.</p>
        </div>
      </header>

      <ol className="editorial-process-list">
        {authenticationSteps.map((step, index) => (
          <li key={step} className="editorial-process-step">
            <span className="editorial-process-step__number">{index + 1}</span>
            <div className="editorial-process-step__content">
              <p>{step}</p>
            </div>
          </li>
        ))}
      </ol>

      <figure className="editorial-system-reference editorial-system-reference--wide">
        <SeiMockup variant="document-form" />
        <figcaption>Referência visual do formulário utilizado para o registro da conferência.</figcaption>
      </figure>
    </section>

    <section className="section-card editorial-block" data-editorial-role="control" aria-labelledby="authentication-check-title">
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="teal">
          <CheckCircle2 aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Controle antes do prosseguimento</p>
          <h3 id="authentication-check-title">Conferência final da autenticação</h3>
          <p>O registro somente está concluído quando o documento, a origem e a autenticação permanecem coerentes na árvore.</p>
        </div>
      </header>

      <div className="editorial-control-grid">
        {finalChecks.map((item, index) => (
          <article key={item} data-index={index + 1}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>

      <div className="editorial-callout-pair">
        <Callout variant="info" icon={Shield} title="Distinção entre os procedimentos">
          <p className="text-sm leading-7">
            Documento interno do SEI!RIO é assinado. Documento externo digitalizado é autenticado. Documento externo nato-digital é juntado como original eletrônico.
          </p>
        </Callout>

        <Callout variant="warning" icon={AlertCircle} title="Limite desta etapa">
          <p className="text-sm leading-7">
            A autenticação trata da correspondência entre o arquivo e o documento apresentado. Ela não substitui a análise material do conteúdo, da despesa ou da regularidade da prestação de contas.
          </p>
        </Callout>
      </div>
    </section>
  </section>
);
