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
  <section className="space-y-8">
    <SectionLead
      step="6"
      eyebrow="Após a remessa"
      title="Acompanhe a análise e responda somente ao que for formalmente solicitado"
      description="A remessa não encerra automaticamente o processo. A unidade deve acompanhar a tramitação, atender diligências e observar a providência registrada pela unidade competente, sem presumir aprovação ou encerramento."
      icon={FileSearch}
    />

    <section className="section-card" aria-labelledby="post-remittance-steps-title">
      <h3 id="post-remittance-steps-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        Sequência de acompanhamento
      </h3>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {followUpSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article key={step.number} className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
                  {step.number}
                </span>
                <Icon className="h-5 w-5 text-blue-800 dark:text-sky-300" aria-hidden="true" />
              </div>
              <h4 className="mt-4 text-base font-bold text-foreground">{step.title}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>

    <aside className="section-card border-l-4 border-l-amber-700" aria-labelledby="post-remittance-limit-title">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-400 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-yellow-300">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 id="post-remittance-limit-title" className="text-base font-bold text-foreground">
            Limite desta orientação
          </h3>
          <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
            Este guia não define autoridade decisória, manifestação conclusiva ou procedimento de arquivamento sem fonte formal. Essas etapas devem seguir a orientação vigente da SME-Rio e da 4ª CRE.
          </p>
        </div>
      </div>
    </aside>

    <aside className="section-card border-l-4 border-l-teal-700" aria-labelledby="patrimonial-follow-up-title">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-400 bg-teal-100 text-teal-900 dark:border-teal-700 dark:bg-teal-950/30 dark:text-teal-300">
          <PackageCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 id="patrimonial-follow-up-title" className="text-base font-bold text-foreground">
            Despesa de capital
          </h3>
          <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
            Quando houver bem permanente, acompanhe também a documentação de doação, incorporação e controle patrimonial exigida pelo procedimento formal aplicável. O fluxo completo do sistema patrimonial municipal permanece fora do escopo deste guia.
          </p>
        </div>
      </div>
    </aside>
  </section>
);
