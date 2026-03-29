import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Landmark,
  Laptop,
  ListChecks,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { externalResources, officialReferenceIds } from "@/lib/externalResources";
import { AnnualGovernancePanel } from "./AnnualGovernancePanel";
import { ReferenceGovernancePanel } from "./ReferenceGovernancePanel";
import { ProfileCallout } from "./ProfileCallout";

const scopePoints = [
  "orientar quais documentos inserir no processo de prestação de contas",
  "apoiar o preenchimento das peças mais usuais da instrução",
  "mostrar como organizar, autenticar, assinar e remeter os autos no SEI!RIO",
];

const federalFoundation = [
  "Constituição Federal, art. 70, parágrafo único, e Lei nº 11.947/2009, como base legal do dever de prestar contas.",
  "Resolução CD/FNDE nº 15/2021, como norma geral de execução, monitoramento, fiscalização e prestação de contas do PDDE.",
  "Atos complementares do FNDE aplicáveis ao exercício, inclusive os relacionados à Solução BB Gestão Ágil e ao sistema federal de análise e consolidação das contas.",
  "Guias, comunicados e orientações operacionais vigentes do FNDE para o exercício correspondente.",
];

const municipalFoundation = [
  "Portaria Conjunta E/SUBG/CP-E/SUBG/CGG nº 01/2016, que estabelece procedimentos internos para a prestação de contas do PDDE e ações agregadas no âmbito da SME.",
  "Decreto Rio nº 57.250/2025, para tramitação eletrônica, assinatura e validade documental no SEI!RIO.",
  "Orientações complementares da SME/SUBG e dos Comitês Regionais de Análise e Avaliação dos Programas Federais.",
  "Despachos e atos de aprovação publicados pela autoridade competente, conforme o fluxo regional vigente.",
];

const systemCards = [
  {
    title: "Execução do gasto",
    description:
      "A regularidade material da despesa continua subordinada à legislação federal do PDDE, especialmente à Lei nº 11.947/2009 e à Resolução CD/FNDE nº 15/2021.",
  },
  {
    title: "Registro em sistemas federais",
    description:
      "O exercício pode exigir BB Gestão Ágil, SiGPC e outros atos operacionais do FNDE em combinação. Para recursos repassados a partir de 2023, o FNDE passou a usar o BB Gestão Ágil no fluxo do PDDE, mantendo etapas de análise, julgamento e consolidação pela EEx quando cabíveis.",
  },
  {
    title: "Controle interno no Rio",
    description:
      "O processo no SEI!RIO organiza a instrução local, o saneamento e a análise regional. Ele não substitui a prestação de contas federal nem altera a disciplina material do FNDE.",
  },
];

const checkpoints = [
  {
    title: "Prazos do exercício",
    text:
      "Os marcos de entrega, análise, lançamento e consolidação devem seguir a regulamentação do FNDE válida para o exercício e as orientações complementares da SME/SUBG e da CRE.",
  },
  {
    title: "Prazo UEx -> EEx",
    text:
      "A entrega da pasta pela UEx deve observar o calendário definido pela EEx e o rito interno vigente. Não trate datas históricas como se fossem prazo nacional imutável.",
  },
  {
    title: "Prazo EEx -> FNDE",
    text:
      "O marco federal de 30 de abril continua como referência estruturante da EEx ao FNDE, salvo ajuste superveniente do exercício por ato específico.",
  },
  {
    title: "Saldos remanescentes",
    text:
      "Regras de reprogramação, estorno e uso de saldo exigem leitura conjunta da norma do exercício, de suas alterações e dos comunicados operacionais do FNDE.",
  },
];

export const SectionAnexo = () => {
  const officialLinks = officialReferenceIds.map((resourceId) => externalResources[resourceId]);

  return (
    <section>
      <ProfileCallout visibleFor="diretor" variant="info" title="Como usar este anexo" className="mb-6">
        Use este bloco apenas como <strong>base rápida de conferência</strong>. O foco do guia continua sendo a instrução processual no SEI!RIO, e não um estudo exaustivo da legislação do PDDE.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-6">
        Na análise, confirme se o processo reflete três planos sem misturá-los: <strong>execução do gasto</strong>, <strong>registro federal aplicável ao exercício</strong> e <strong>rito interno da SME-RJ</strong>.
      </ProfileCallout>

      <div className="section-card mb-6 border-l-4 border-l-primary bg-linear-to-br from-card via-card to-primary/5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-primary/10 p-3 shrink-0">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <div>
            <span className="lede-chip mb-3">Base rápida de conferência</span>
            <h3 className="mb-2 text-xl font-heading font-bold tracking-tight text-foreground sm:text-2xl">
              Normas, sistemas e marcos que evitam orientar o procedimento errado
            </h3>
            <p className="leading-relaxed text-muted-foreground text-left sm:text-justify text-pretty">
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

        <div className="mt-5 rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-primary/5 p-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground">
              Regra prática: o dossiê no <strong className="text-primary">SEI!RIO</strong> deve refletir fielmente o que foi executado, comprovado e registrado no <strong className="text-primary">ambiente federal aplicável ao exercício</strong>, sem confundir controle interno com prestação de contas ao FNDE.
            </p>
          </div>
        </div>
      </div>

      <div className="section-card mb-6 p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Landmark className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Base normativa essencial</h3>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.2rem] border border-border/50 bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Base federal</h4>
            </div>
            <div className="space-y-3">
              {federalFoundation.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/70" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-border/50 bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Base municipal e institucional</h4>
            </div>
            <div className="space-y-3">
              {municipalFoundation.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/70" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
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

      <AnnualGovernancePanel />

      <ReferenceGovernancePanel />

      <div className="section-card p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Fontes oficiais prioritárias para consulta rápida</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {officialLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card group flex items-center gap-4 rounded-xl border-2 border-border bg-linear-to-r from-secondary to-secondary/50 p-4 transition-all duration-300 hover:border-primary/40 hover:from-primary/10 hover:to-primary/5"
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

        <div className="mt-5 rounded-xl border border-primary/20 bg-linear-to-r from-primary/5 to-primary/10 p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground">
              Este anexo resume apenas o <strong className="text-primary">necessário para orientar corretamente a instrução processual</strong>. Sempre que houver comunicado anual, manual interno atualizado ou caso atípico, prevalece a disciplina vigente do exercício.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-success/25 bg-success/10 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <p className="text-sm leading-relaxed text-foreground">
              Fazer o processo no <strong className="text-success">SEI!RIO</strong> não equivale, por si só, a prestar contas ao FNDE. Se houver conflito entre um costume local e a disciplina material do programa, <strong className="text-success">prevalece a norma federal vigente</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
