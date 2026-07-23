import {
  BookOpenCheck,
  CheckCircle2,
  FileCheck2,
  Files,
  Route,
  Search,
  ShieldCheck,
} from "lucide-react";
import { editorialMedia } from "@/lib/editorialMedia";

const heroStats = [
  {
    icon: Route,
    label: "Tempo de leitura",
    title: "Consulta por etapa",
    description: "Acesse diretamente a rotina necessária.",
  },
  {
    icon: Files,
    label: "Conteúdo",
    title: "Documentos e modelos",
    description: "Função das peças, exemplos e ferramentas.",
  },
  {
    icon: ShieldCheck,
    label: "Segurança",
    title: "Regras e evidências",
    description: "Fundamentos e cuidados no ponto de uso.",
  },
  {
    icon: BookOpenCheck,
    label: "Resultado",
    title: "Processo rastreável",
    description: "Instrução coerente e encaminhamento seguro.",
  },
] as const;

const overviewSteps = [
  { label: "Abrir", description: "Criar e identificar o processo." },
  { label: "Preparar", description: "Organizar documentos e fundamentos." },
  { label: "Incluir", description: "Registrar arquivos e metadados." },
  { label: "Conferir", description: "Autenticar, assinar e revisar." },
  { label: "Acompanhar", description: "Remeter e monitorar a análise." },
] as const;

const quickLinks = [
  { href: "?secao=secao-2", label: "Documentos e regras", icon: Files },
  { href: "?secao=checklist", label: "Checklist", icon: FileCheck2 },
  { href: "?secao=anexo", label: "Fontes oficiais", icon: Search },
] as const;

export const HeroCover = () => {
  const heroMedia = editorialMedia.hero;

  return (
    <section
      id="hero-cover"
      className="editorial-hero"
      data-editorial-hero="true"
      aria-labelledby="hero-cover-title"
    >
      <div className="editorial-hero__inner">
        <div className="editorial-hero__feature">
          <div className="editorial-hero__copy">
            <p className="editorial-hero__kicker">
              <ShieldCheck aria-hidden="true" />
              4ª Coordenadoria Regional de Educação · GAD
            </p>

            <div className="editorial-hero__tags" aria-label="Características do documento">
              <span>Guia operacional</span>
              <span>Prestação de contas</span>
            </div>

            <h1
              id="hero-cover-title"
              aria-label="Prestação de Contas PDDE no SEI!RIO"
              className="editorial-hero__title"
            >
              Prestação de Contas
              <span>PDDE no SEI!RIO</span>
            </h1>

            <p className="editorial-hero__lead">
              Organize os autos, compreenda a função de cada peça e registre os documentos com clareza,
              segurança e rastreabilidade.
            </p>
          </div>

          <figure className="editorial-hero__visual" data-editorial-media="hero">
            <div className="editorial-hero__photo">
              <img
                src={heroMedia.src}
                alt={heroMedia.alt}
                width={heroMedia.width}
                height={heroMedia.height}
                fetchPriority="high"
                decoding="async"
                style={{ objectPosition: heroMedia.position }}
              />
            </div>
            <figcaption className="editorial-hero__caption">
              <strong>Orientação para a rotina real da unidade escolar</strong>
              <span>Conteúdo técnico transformado em percurso prático de conferência e registro.</span>
            </figcaption>
          </figure>
        </div>

        <aside className="editorial-hero__overview" aria-label="Visão geral do percurso">
          <header>
            <span>Visão geral do percurso</span>
            <h2>Da abertura ao acompanhamento da análise</h2>
          </header>

          <ol className="editorial-hero__steps">
            {overviewSteps.map((step, index) => (
              <li key={step.label}>
                <span className="editorial-hero__step-number" aria-hidden="true">{index + 1}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="editorial-hero__quick-access">
            <span>Acesso rápido</span>
            <div>
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className="editorial-hero__summary" aria-label="Estrutura do guia">
          {heroStats.map(({ icon: Icon, label, title, description }) => (
            <article key={title} className="editorial-hero__stat">
              <span className="editorial-hero__stat-icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <span className="editorial-hero__stat-label">{label}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="editorial-hero__orientation" aria-label="Orientação de leitura">
          <CheckCircle2 aria-hidden="true" />
          <p>
            Leia a visão geral da etapa antes do detalhamento. Utilize modelos e checklists depois de compreender
            a finalidade de cada documento e a regra aplicável.
          </p>
        </div>
      </div>
    </section>
  );
};