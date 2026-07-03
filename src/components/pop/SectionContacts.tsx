import {
  BookOpen,
  ExternalLink,
  Headset,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Printer,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLead } from "@/components/visual/SectionLead";
import { IconTile } from "@/components/visual/IconTile";
import { externalResources } from "@/lib/externalResources";
import { CopyButton } from "./CopyButton";

type SectionContactsProps = {
  onPrint?: () => void;
};

const gadContacts = [
  {
    label: "E-mail",
    value: "gadcre04@rioeduca.net",
    href: "mailto:gadcre04@rioeduca.net",
    icon: Mail,
  },
  {
    label: "Telefone",
    value: "(21) 2475-9209",
    href: "tel:+552124759209",
    icon: Phone,
  },
] as const;

const systemResources = [
  {
    title: "Acesso ao SEI!RIO",
    description: "Ambiente oficial do sistema.",
    href: externalResources.seiRioPortal.href,
    icon: Monitor,
  },
  {
    title: "Guia do Usuário Interno",
    description: "Manual oficial de utilização do SEI!RIO.",
    href: externalResources.seiRioUserGuide.href,
    icon: BookOpen,
  },
  {
    title: "Portal de Atendimento",
    description: "Canal oficial para suporte técnico do sistema.",
    href: externalResources.seiRioSupport.href,
    icon: Headset,
  },
] as const;

export const SectionContacts = ({ onPrint }: SectionContactsProps) => (
  <section className="space-y-8">
    <SectionLead
      eyebrow="Atendimento e suporte"
      title="Canais para orientação administrativa e apoio técnico"
      description="Utilize os canais da GAD para dúvidas sobre o fluxo da prestação de contas e os canais oficiais do SEI!RIO para dificuldades de acesso ou funcionamento do sistema."
      icon={Phone}
    />

    <section className="section-card" aria-labelledby="gad-contact-title">
      <div className="flex items-start gap-4">
        <IconTile icon={Mail} size="lg" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
            Orientação administrativa
          </p>
          <h3 id="gad-contact-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Gerência de Administração — 4ª CRE
          </h3>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {gadContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <article key={contact.label} className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55">
              <div className="flex items-start gap-3">
                <IconTile icon={Icon} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">
                    {contact.label}
                  </p>
                  <a href={contact.href} className="mt-1 block break-all text-base font-bold text-foreground underline-offset-4 hover:text-blue-800 hover:underline dark:hover:text-sky-300">
                    {contact.value}
                  </a>
                </div>
                <CopyButton text={contact.value} label={`${contact.label} copiado`} />
              </div>
            </article>
          );
        })}
      </div>

      <article className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55">
        <div className="flex items-start gap-3">
          <IconTile icon={MapPin} size="md" tone="neutral" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">Endereço</p>
            <p className="mt-1 text-sm font-semibold leading-7 text-foreground">
              Rua Professor Luís Rondelli, 150 — Olaria<br />
              Rio de Janeiro — RJ · CEP 21021-630
            </p>
          </div>
        </div>
      </article>
    </section>

    <section className="section-card" aria-labelledby="sei-support-title">
      <div className="flex items-start gap-4">
        <IconTile icon={Monitor} size="lg" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-800 dark:text-teal-300">
            Sistema municipal
          </p>
          <h3 id="sei-support-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Acesso, manual e suporte do SEI!RIO
          </h3>
          <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
            Questões técnicas de acesso, indisponibilidade ou funcionamento devem ser encaminhadas aos canais oficiais do sistema.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {systemResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <a
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-300 bg-slate-50 p-5 transition-colors hover:border-blue-500 hover:bg-blue-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/55 dark:hover:border-sky-500 dark:hover:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <IconTile icon={Icon} size="md" />
                <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-blue-800 dark:text-slate-300 dark:group-hover:text-sky-300" aria-hidden="true" />
              </div>
              <h4 className="mt-4 text-base font-bold text-foreground">{resource.title}</h4>
              <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">{resource.description}</p>
            </a>
          );
        })}
      </div>

      <aside className="mt-5 rounded-xl border border-slate-300 bg-slate-100 p-5 dark:border-slate-700 dark:bg-slate-900/70">
        <div className="flex items-start gap-3">
          <IconTile icon={Users} size="md" tone="neutral" />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-foreground">Administradores locais do SEI!RIO na SME-Rio</h4>
            <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Para orientações institucionais específicas: 
              <a className="font-semibold text-foreground underline underline-offset-4" href="mailto:sei.duvidas@rioeduca.net">sei.duvidas@rioeduca.net</a>
              {" · "}
              <a className="font-semibold text-foreground underline underline-offset-4" href="mailto:gaasme@rioeduca.net">gaasme@rioeduca.net</a>
            </p>
          </div>
        </div>
      </aside>
    </section>

    <section className="section-card no-print" aria-labelledby="print-guide-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <IconTile icon={Printer} size="lg" tone="neutral" />
          <div>
            <h3 id="print-guide-title" className="text-base font-bold text-foreground">Versão para impressão ou PDF</h3>
            <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Gere uma cópia integral do guia para consulta offline ou arquivamento.
            </p>
          </div>
        </div>
        <Button onClick={onPrint ?? (() => window.print())} className="shrink-0">
          <Printer aria-hidden="true" />
          Imprimir ou salvar em PDF
        </Button>
      </div>
    </section>
  </section>
);
