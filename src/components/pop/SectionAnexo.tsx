import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Laptop,
  ListChecks,
  Scale,
} from "lucide-react";
import { ProfileCallout } from "./ProfileCallout";

const scopePoints = [
  "orientar quais documentos inserir no processo de prestação de contas",
  "apoiar o preenchimento das peças mais usuais da instrução",
  "mostrar como organizar, autenticar, assinar e remeter os autos no SEI!RIO",
];

const systemCards = [
  {
    title: "Regra federal do gasto",
    description:
      "A base principal continua sendo a Lei nº 11.947/2009 e a Resolução CD/FNDE nº 15/2021. É essa camada que define o núcleo mínimo documental, a pesquisa de preços, os comprovantes e a prestação de contas.",
  },
  {
    title: "Registro federal do exercício",
    description:
      "O sistema federal pode variar conforme o exercício. Para recursos recebidos em 2024, o FNDE orientou que a UEx preencha o BB Gestão Ágil e que a EEx analise/julgue e consolide os dados no SiGPC.",
  },
  {
    title: "Rito local no Rio",
    description:
      "SEI!RIO, manual e circulares internas organizam a autuação, o saneamento, a análise e a remessa do processo. Eles estruturam o fluxo administrativo, mas não alteram a regra federal do PDDE.",
  },
];

const checkpoints = [
  {
    title: "Prazo UEx -> EEx",
    text:
      "Não há prazo nacional único fixado, de forma geral, para a UEx entregar a pasta à EEx. Esse marco deve seguir a orientação da própria EEx e, no Rio, o rito interno vigente.",
  },
  {
    title: "Prazo EEx -> FNDE",
    text:
      "O prazo federal estruturante permanece em 30 de abril do exercício subsequente para a EEx ou a entidade mantenedora encaminhar a prestação de contas ao FNDE.",
  },
  {
    title: "Saldos remanescentes",
    text:
      "A regra mais rígida de saldo zerado e estorno automático foi esclarecida pelo FNDE como aplicável a novos repasses somente a partir de fevereiro de 2027. Para o exercício de 2026, a reprogramação permanece possível.",
  },
];

const officialLinks = [
  {
    title: "Resolução CD/FNDE nº 15/2021",
    description: "Norma principal do PDDE e do núcleo mínimo da prestação de contas.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/view",
  },
  {
    title: "Comunicado PDDE nº 47/2024",
    description: "Orientação operacional do BB Gestão Ágil e do SiGPC para os recursos recebidos em 2024.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2024-1/Comunicadon.47_2024Orientaesparaaprestaodecontasdosrecursosrecebidosem2024.pdf",
  },
  {
    title: "Comunicado PDDE nº 01/2026",
    description: "Esclarecimento oficial do FNDE sobre saldos, estorno e aplicabilidade a partir de 2027.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2026/comunicado-n-01_2026-alteracoes-na-resolucao-cd-fnde-no-7-2024-estorno-de-recurso.pdf",
  },
  {
    title: "BB Gestão Ágil",
    description: "Página oficial do FNDE com manual e orientações da ferramenta.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/area-para-gestores/bb-gestao-agil",
  },
  {
    title: "Resoluções e Formulários do PDDE",
    description: "Repositório oficial para acompanhar normas e materiais vigentes do programa.",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/resolucoes-e-formularios",
  },
];

export const SectionAnexo = () => {
  return (
    <section id="anexo" className="scroll-mt-20">
      <ProfileCallout visibleFor="diretor" variant="info" title="Como usar este anexo" className="mb-6">
        Use este bloco apenas como <strong>base rápida de conferência</strong>. O foco do guia continua sendo a instrução processual no SEI!RIO, e não um estudo exaustivo da legislação do PDDE.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-6">
        Na análise, confirme se o processo reflete três planos sem misturá-los: <strong>execução do gasto</strong>, <strong>registro federal aplicável ao exercício</strong> e <strong>rito interno da SME-RJ</strong>.
      </ProfileCallout>

      <div className="section-card mb-6 border-l-4 border-l-primary bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-primary/10 p-3 shrink-0">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-heading font-bold tracking-tight text-foreground">
              Anexo — Base rápida de conferência
            </h2>
            <p className="leading-relaxed text-muted-foreground text-left sm:text-justify [text-wrap:pretty]">
              Este anexo existe apenas para <strong>não deixar o manual ensinar procedimento errado</strong>. Ele resume a regra federal mínima, separa os sistemas envolvidos e aponta os marcos que mais impactam a conferência da prestação de contas.
            </p>
          </div>
        </div>
      </div>

      <div className="section-card mb-6 p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <ListChecks className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Escopo deste guia</h3>
        </div>

        <div className="space-y-3">
          {scopePoints.map((item, index) => (
            <div key={item} className="flex items-start gap-3 rounded-[1.2rem] border border-border/50 bg-card p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Este manual foi feito para <strong className="text-foreground">{item}</strong>.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-amber-200/70 bg-amber-50/80 p-4 dark:border-amber-800/40 dark:bg-amber-950/25">
          <p className="text-sm leading-relaxed text-foreground">
            Ele <strong>não substitui</strong> a leitura da norma federal quando surgir caso incomum, dúvida sobre enquadramento de despesa, ação integrada específica ou situação excepcional de saldo.
          </p>
        </div>
      </div>

      <div className="section-card mb-6 p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Laptop className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Base mínima para não errar o procedimento</h3>
        </div>

        <div className="space-y-3">
          {systemCards.map((item) => (
            <div key={item.title} className="rounded-[1.2rem] border border-border/50 bg-card p-4">
              <p className="mb-1 font-semibold text-foreground">{item.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground">
              Regra prática: o dossiê no <strong className="text-primary">SEI!RIO</strong> deve refletir fielmente o que foi executado, comprovado e registrado no <strong className="text-primary">ambiente federal aplicável ao exercício</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="section-card mb-6 p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Marcos rápidos de conferência</h3>
        </div>

        <div className="space-y-3">
          {checkpoints.map((item) => (
            <div key={item.title} className="rounded-[1.2rem] border border-border/50 bg-card p-4">
              <p className="mb-1 font-semibold text-foreground">{item.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Fontes oficiais para consulta rápida</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {officialLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card group flex items-center gap-4 rounded-xl border-2 border-border bg-gradient-to-r from-secondary to-secondary/50 p-4 transition-all duration-300 hover:border-primary/40 hover:from-primary/10 hover:to-primary/5"
            >
              <div className="link-card-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="link-card-title text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ExternalLink className="link-card-arrow h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-success/25 bg-success/10 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <p className="text-sm leading-relaxed text-foreground">
              Se houver conflito entre um modelo local, um costume interno e a disciplina material do FNDE, <strong className="text-success">prevalece a norma federal vigente</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
