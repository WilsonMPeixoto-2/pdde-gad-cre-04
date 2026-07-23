import { BookOpenCheck, Files, Route, ShieldCheck } from "lucide-react";
import { editorialMedia } from "@/lib/editorialMedia";

const heroStats = [
  {
    icon: Route,
    label: "Percurso",
    title: "6 etapas operacionais",
    description: "Da abertura do processo ao acompanhamento posterior à remessa.",
  },
  {
    icon: Files,
    label: "Conteúdo",
    title: "Documentos e modelos",
    description: "Função das peças, exemplos, checklists e ferramentas de apoio.",
  },
  {
    icon: ShieldCheck,
    label: "Segurança",
    title: "Regras e evidências",
    description: "Fontes, aplicabilidade, cuidados e rastreabilidade no mesmo percurso.",
  },
  {
    icon: BookOpenCheck,
    label: "Uso recomendado",
    title: "Síntese antes do detalhe",
    description: "Aberturas orientam a leitura; o corpo técnico aprofunda cada decisão.",
  },
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
        <div className="editorial-hero__copy">
          <p className="editorial-hero__kicker">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            4ª Coordenadoria Regional de Educação · Gerência de Administração
          </p>

          <div className="editorial-hero__tags" aria-label="Características do documento">
            <span>Guia operacional</span>
            <span>PDDE</span>
            <span>SEI!RIO</span>
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
            Um guia operacional para organizar os autos, compreender a função de cada peça, registrar os
            documentos corretamente e encaminhar o processo com segurança, clareza e rastreabilidade.
          </p>

          <div className="editorial-hero__orientation" aria-label="Orientação de leitura">
            <span>Como usar</span>
            <p>
              Comece pela visão geral de cada etapa, avance para o conteúdo técnico e utilize checklists e
              modelos somente depois de compreender a finalidade das peças.
            </p>
          </div>
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
            <span>
              Conteúdo organizado para apoiar decisões, conferências e registros ao longo de todo o fluxo.
            </span>
          </figcaption>
        </figure>

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
      </div>
    </section>
  );
};
