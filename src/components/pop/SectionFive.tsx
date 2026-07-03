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
  <section className="space-y-8">
    <SectionLead
      step="5"
      eyebrow="Documentos internos e remessa"
      title="Conclua as assinaturas antes de encaminhar o processo"
      description="O bloco de assinatura reúne somente documentos internos do SEI!RIO. Depois das assinaturas, faça a conferência final e tramite o processo para a unidade competente conforme o fluxo formal vigente."
      icon={FileSignature}
    />

    <section className="section-card" aria-labelledby="signature-block-definition-title">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-sky-300">
          <PenLine className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 id="signature-block-definition-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Função do bloco de assinatura
          </h3>
          <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
            O bloco permite reunir documentos internos que precisam de assinatura eletrônica. Ele pode ser utilizado para assinatura na própria unidade ou disponibilizado a outra unidade quando o fluxo formal exigir participação externa.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Callout variant="success" title="Podem integrar o bloco">
          <ul className="space-y-3 text-sm leading-6">
            {includedDocuments.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Callout>

        <Callout variant="danger" title="Não integram o bloco">
          <ul className="space-y-3 text-sm leading-6">
            {excludedDocuments.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700 dark:text-red-300" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Callout>
      </div>
    </section>

    <section className="section-card" aria-labelledby="signature-block-procedure-title">
      <h3 id="signature-block-procedure-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        Montagem e acompanhamento do bloco
      </h3>
      <div className="mt-6 space-y-4">
        {blockSteps.map((step, index) => (
          <article key={step.title} className="grid gap-4 rounded-xl border border-slate-300 bg-slate-50 p-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] dark:border-slate-700 dark:bg-slate-900/55">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
              {index + 1}
            </span>
            <div>
              <h4 className="text-base font-bold text-foreground">{step.title}</h4>
              <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">{step.description}</p>
            </div>
          </article>
        ))}
      </div>

      <Callout variant="info" title="Descrição de referência" className="mt-5">
        <code className="block rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
          Assinatura — Prestação de Contas PDDE — Exercício AAAA — Nome da Unidade Escolar
        </code>
      </Callout>

      <div className="mt-6 border-t border-slate-300 pt-6 dark:border-slate-700">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
          Exemplo do bloco
        </p>
        <SeiMockup variant="signature-block" />
      </div>
    </section>

    <section className="section-card" aria-labelledby="forwarding-document-title">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <Send className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 id="forwarding-document-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Peça de encaminhamento e remessa
          </h3>
          <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
            Quando o fluxo formal exigir ofício ou despacho, a peça deve identificar o processo e registrar o encaminhamento sem antecipar decisão, aprovação ou conclusão de regularidade.
          </p>
        </div>
      </div>

      <Callout variant="warning" title="Validação local necessária" className="mt-5">
        <p className="text-sm leading-7">
          A obrigatoriedade, o tipo documental, o signatário, o conteúdo e a unidade de destino dependem de orientação institucional vigente. As minutas disponíveis no guia são apenas apoio de redação.
        </p>
      </Callout>

      <div className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
          Unidade apresentada como referência local
        </p>
        <p className="mt-2 text-sm font-bold text-foreground">{GAD_UNIT.fullLabel}</p>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
          Confirme no SEI!RIO se o código e a denominação permanecem vigentes antes da tramitação.
        </p>
      </div>
    </section>

    <section className="section-card" aria-labelledby="remittance-check-title">
      <h3 id="remittance-check-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        Conferência final antes da remessa
      </h3>
      <ul className="mt-5 divide-y divide-slate-300 border-y border-slate-300 dark:divide-slate-700 dark:border-slate-700">
        {remittanceChecks.map((item) => (
          <li key={item} className="flex items-start gap-3 py-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-semibold leading-6 text-foreground">
        Não tramite o processo enquanto houver documento interno obrigatório sem assinatura ou pendência conhecida de instrução.
      </p>
    </section>
  </section>
);
