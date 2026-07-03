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
  <section className="space-y-8">
    <SectionLead
      step="4"
      eyebrow="Conferência da origem documental"
      title="Autentique somente os documentos que vieram do papel"
      description="A classificação entre digitalizado e nato-digital já foi definida na Etapa 3. Aqui, o objetivo é autenticar os arquivos digitalizados, registrar o tipo de conferência adequado e confirmar o resultado na árvore."
      icon={Shield}
    />

    <section className="section-card" aria-labelledby="authentication-scope-title">
      <h3 id="authentication-scope-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        O que entra e o que não entra nesta etapa
      </h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-blue-300 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/25">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-sky-300">
              <ScanLine className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-blue-800 dark:text-sky-300">Autenticar</p>
              <h4 className="mt-1 text-base font-bold text-foreground">Documento digitalizado</h4>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-blue-950 dark:text-blue-100">
            É o arquivo produzido a partir de documento em papel. A autenticação deve refletir o tipo de conferência informado no momento da inclusão.
          </p>
        </article>

        <article className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/25">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              <FileDigit className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-emerald-800 dark:text-emerald-300">Não autenticar</p>
              <h4 className="mt-1 text-base font-bold text-foreground">Documento nato-digital</h4>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            É o arquivo criado ou recebido originalmente em meio eletrônico. Ele permanece juntado como original eletrônico e não recebe conferência de documento em papel.
          </p>
        </article>
      </div>
    </section>

    <section className="section-card" aria-labelledby="authentication-procedure-title">
      <h3 id="authentication-procedure-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        Procedimento de autenticação
      </h3>
      <div className="mt-6 space-y-4">
        {authenticationSteps.map((step, index) => (
          <article key={step} className="grid gap-4 rounded-xl border border-slate-300 bg-slate-50 p-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] dark:border-slate-700 dark:bg-slate-900/55">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">{step}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-300 pt-6 dark:border-slate-700">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
          Exemplo do formulário
        </p>
        <SeiMockup variant="document-form" />
      </div>
    </section>

    <section className="section-card" aria-labelledby="authentication-check-title">
      <h3 id="authentication-check-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        Conferência antes de prosseguir
      </h3>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {finalChecks.map((item) => (
          <article key={item} className="rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/55">
            <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{item}</p>
          </article>
        ))}
      </div>

      <Callout variant="info" icon={Shield} className="mt-6" title="Distinção entre os procedimentos">
        <p className="text-sm leading-7">
          Documento interno do SEI!RIO é assinado. Documento externo digitalizado é autenticado. Documento externo nato-digital é juntado como original eletrônico.
        </p>
      </Callout>

      <Callout variant="warning" icon={AlertCircle} className="mt-4" title="Limite desta etapa">
        <p className="text-sm leading-7">
          A autenticação trata da correspondência entre o arquivo e o documento apresentado. Ela não substitui a análise material do conteúdo, da despesa ou da regularidade da prestação de contas.
        </p>
      </Callout>
    </section>
  </section>
);
