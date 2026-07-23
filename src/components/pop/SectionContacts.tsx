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
import { externalResources } from "@/lib/externalResources";
import { CopyButton } from "./CopyButton";

const gadContacts = [
  {
    label: "E-mail",
    value: "gadcre04@rioeduca.net",
    href: "mailto:gadcre04@rioeduca.net",
    icon: Mail,
    use: "Dúvidas sobre o fluxo, documentos, instrução e encaminhamento da prestação de contas.",
  },
  {
    label: "Telefone",
    value: "(21) 2475-9209",
    href: "tel:+552124759209",
    icon: Phone,
    use: "Orientação objetiva e alinhamento inicial quando o caso exigir contextualização imediata.",
  },
] as const;

const systemResources = [
  {
    title: "Acesso ao SEI!RIO",
    description: "Ambiente oficial do sistema.",
    action: "Entrar no sistema",
    href: externalResources.seiRioPortal.href,
    icon: Monitor,
  },
  {
    title: "Guia do Usuário Interno",
    description: "Manual oficial para dúvidas gerais de operação.",
    action: "Consultar o manual",
    href: externalResources.seiRioUserGuide.href,
    icon: BookOpen,
  },
  {
    title: "Portal de Atendimento",
    description: "Canal oficial para falhas técnicas e indisponibilidade.",
    action: "Solicitar suporte",
    href: externalResources.seiRioSupport.href,
    icon: Headset,
  },
] as const;

type SectionContactsProps = {
  onPrint?: () => void;
};

export const SectionContacts = ({ onPrint }: SectionContactsProps) => (
  <section className="space-y-8 editorial-section" data-editorial-section="support">
    <SectionLead
      eyebrow="Atendimento e suporte"
      title="Escolha o canal conforme a natureza da necessidade"
      description="Utilize os canais da GAD para orientação administrativa sobre a prestação de contas e os canais oficiais do SEI!RIO para dificuldades de acesso, indisponibilidade ou funcionamento do sistema."
      icon={Phone}
    />

    <section className="section-card editorial-block" data-editorial-role="service" aria-labelledby="gad-contact-title">
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="teal">
          <Mail aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Orientação administrativa</p>
          <h3 id="gad-contact-title">Gerência de Administração — 4ª CRE</h3>
          <p>Encaminhe a demanda com identificação da unidade, exercício, etapa do fluxo e dúvida objetiva para reduzir retrabalho na orientação.</p>
        </div>
      </header>

      <div className="editorial-contact-grid">
        {gadContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <article key={contact.label}>
              <div className="editorial-contact-grid__icon">
                <Icon aria-hidden="true" />
              </div>
              <div className="editorial-contact-grid__body">
                <span>{contact.label}</span>
                <a href={contact.href}>{contact.value}</a>
                <p>{contact.use}</p>
              </div>
              <CopyButton text={contact.value} label={`${contact.label} copiado`} />
            </article>
          );
        })}
      </div>

      <article className="editorial-address-band">
        <MapPin aria-hidden="true" />
        <div>
          <span>Atendimento presencial</span>
          <strong>Rua Professor Luís Rondelli, 150 — Olaria</strong>
          <p>Rio de Janeiro — RJ · CEP 21021-630</p>
        </div>
      </article>
    </section>

    <section className="section-card editorial-block" data-editorial-role="resources" aria-labelledby="sei-support-title">
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="blue">
          <Monitor aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Sistema municipal</p>
          <h3 id="sei-support-title">Acesso, manual e suporte do SEI!RIO</h3>
          <p>Questões técnicas de acesso, indisponibilidade ou funcionamento devem ser encaminhadas aos canais oficiais do sistema.</p>
        </div>
      </header>

      <div className="editorial-resource-grid">
        {systemResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <a key={resource.title} href={resource.href} target="_blank" rel="noopener noreferrer" data-index={index + 1}>
              <div className="editorial-resource-grid__icon">
                <Icon aria-hidden="true" />
              </div>
              <span>{resource.action}</span>
              <h4>{resource.title}</h4>
              <p>{resource.description}</p>
              <ExternalLink aria-hidden="true" />
            </a>
          );
        })}
      </div>

      <aside className="editorial-admin-band">
        <Users aria-hidden="true" />
        <div>
          <span>Orientação institucional específica</span>
          <h4>Administradores locais do SEI!RIO na SME-Rio</h4>
          <p>
            <a href="mailto:sei.duvidas@rioeduca.net">sei.duvidas@rioeduca.net</a>
            {" · "}
            <a href="mailto:gaasme@rioeduca.net">gaasme@rioeduca.net</a>
          </p>
        </div>
      </aside>
    </section>

    <section className="editorial-print-panel no-print" aria-labelledby="print-guide-title">
      <div className="editorial-print-panel__icon">
        <Printer aria-hidden="true" />
      </div>
      <div>
        <span>Consulta offline</span>
        <h3 id="print-guide-title">Versão para impressão ou PDF</h3>
        <p>Gere uma cópia integral do guia para consulta offline ou arquivamento.</p>
      </div>
      <Button onClick={onPrint ?? (() => window.print())}>
        <Printer aria-hidden="true" />
        Imprimir ou salvar em PDF
      </Button>
    </section>
  </section>
);
