import { ArrowDown, Compass, FileText, ShieldCheck } from "lucide-react";
import { editorialMedia } from "@/lib/editorialMedia";

const scrollToIntroduction = () => {
  const introduction = document.getElementById("introducao");
  if (!introduction) return;
  introduction.scrollIntoView({ behavior: "smooth", block: "start" });
};

const heroStats = [
  {
    icon: Compass,
    title: "6 etapas operacionais",
    description: "Da abertura do processo ao acompanhamento posterior à remessa.",
  },
  {
    icon: FileText,
    title: "Conteúdo aplicado",
    description: "Documentos, regras, exemplos, checklists e ferramentas no mesmo percurso.",
  },
  {
    icon: ShieldCheck,
    title: "Leitura por aplicabilidade",
    description: "Orientações federais, municipais e locais identificadas no contexto de uso.",
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
        <div className="min-w-0">
          <p className="editorial-hero__kicker">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            4ª Coordenadoria Regional de Educação · GAD
          </p>

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
            documentos corretamente e encaminhar o processo com mais segurança, clareza e rastreabilidade.
          </p>

          <div className="editorial-hero__actions">
            <button type="button" onClick={scrollToIntroduction} className="editorial-hero__primary">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Iniciar guia
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-300">
              Consulte a apresentação antes de iniciar uma etapa específica.
            </span>
          </div>
        </div>

        <div className="editorial-hero__visual" data-editorial-media="hero">
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
          <div className="editorial-hero__caption">
            <strong>Orientação para a rotina real da unidade escolar</strong>
            <span>
              O conteúdo foi organizado para apoiar decisões, conferências e registros ao longo de todo o fluxo.
            </span>
          </div>
        </div>

        <div className="editorial-hero__summary" aria-label="Estrutura do guia">
          {heroStats.map(({ icon: Icon, title, description }) => (
            <div key={title} className="editorial-hero__stat">
              <span className="editorial-hero__stat-icon" aria-hidden="true">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
