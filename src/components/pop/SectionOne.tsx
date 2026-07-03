import {
  Building2,
  CalendarClock,
  ClipboardList,
  Fingerprint,
  FolderOpen,
  NotebookPen,
  Save,
  ShieldAlert,
  Users,
} from "lucide-react";
import { SectionLead } from "@/components/visual/SectionLead";
import { IconTile } from "@/components/visual/IconTile";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";
import { SeiMockup } from "./SeiMockup";
import { UiLabelChip } from "./UiLabelChip";
import {
  GAD_UNIT,
  INTERNAL_PROCESS_TRACKER_LABEL,
  PROCESS_CLASSIFICATION_LABEL,
  PROCESS_TYPE_LABEL,
} from "@/lib/guideContent";

type SectionOneProps = {
  renderId?: boolean;
};

const preparationItems = [
  {
    title: "Exercício de referência",
    description: "Confirme o ano da prestação de contas antes de autuar o processo.",
    icon: CalendarClock,
  },
  {
    title: "CNPJ do CEC/UEx",
    description: "Utilize o CNPJ que consta na documentação da unidade executora.",
    icon: Fingerprint,
  },
  {
    title: "Designação da unidade escolar",
    description: "Adote a denominação oficial utilizada nas peças que instruirão o processo.",
    icon: Building2,
  },
] as const;

const accessLevels = [
  {
    level: "Público",
    description: "Para conteúdo que possa ser amplamente consultado.",
    className: "text-blue-800 dark:text-sky-300",
  },
  {
    level: "Restrito",
    description: "Quando houver fundamento legal e informação protegida.",
    className: "text-amber-800 dark:text-yellow-300",
  },
  {
    level: "Sigiloso",
    description: "Somente nas hipóteses específicas que exijam credencial individual.",
    className: "text-red-700 dark:text-red-300",
  },
] as const;

const LocalValidationNotice = () => (
  <aside className="flex items-start gap-3 rounded-xl border border-amber-400/70 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-700 dark:bg-amber-950/25 dark:text-amber-100">
    <ShieldAlert className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
    <p>
      <strong>Referências operacionais locais:</strong> tipo processual, classificação, especificação,
      interessados, código da GAD e uso do campo Observações devem ser confirmados no ambiente vigente
      do SEI!RIO e na orientação formal da SME-Rio ou da 4ª CRE antes de serem tratados como requisitos definitivos.
    </p>
  </aside>
);

const FieldReference = ({
  icon,
  title,
  explanation,
  value,
  copyLabel = "Copiar",
  children,
}: {
  icon: React.ReactNode;
  title: string;
  explanation: string;
  value?: string;
  copyLabel?: string;
  children?: React.ReactNode;
}) => (
  <article className="grid gap-4 py-5 sm:grid-cols-[2.75rem_minmax(0,1fr)]">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-sky-300">
      {icon}
    </div>
    <div className="min-w-0">
      <h4 className="text-base font-bold text-foreground">{title}</h4>
      <p className="mt-1.5 max-w-[72ch] text-sm leading-6 text-slate-700 dark:text-slate-300">{explanation}</p>
      {value ? (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <code className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
            {value}
          </code>
          <CopyButton text={value} label={`${copyLabel} concluído`} className="self-end sm:self-auto" />
        </div>
      ) : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  </article>
);

export const SectionOne = ({ renderId = true }: SectionOneProps) => (
  <section id={renderId ? "secao-1" : undefined} className="scroll-mt-20 space-y-8">
    <SectionLead
      step="1"
      eyebrow="Autuação no SEI!RIO"
      title="Prepare os dados, preencha o cadastro e registre o NUP"
      description="A abertura cria a base formal do processo. Antes de iniciar, confirme os dados da unidade e do exercício; durante o preenchimento, diferencie regras gerais do sistema e referências operacionais locais."
      icon={ClipboardList}
    />

    <section className="section-card" aria-labelledby="opening-preparation-title">
      <h3 id="opening-preparation-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        Dados necessários antes da autuação
      </h3>
      <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-slate-300 bg-slate-300 sm:grid-cols-3 dark:border-slate-700 dark:bg-slate-700">
        {preparationItems.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="bg-slate-50 p-5 dark:bg-slate-900">
              <IconTile icon={Icon} size="sm" />
              <h4 className="mt-3 text-sm font-bold text-foreground">{item.title}</h4>
              <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>

    <section className="section-card" aria-labelledby="start-process-title">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] xl:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
            Primeira ação no sistema
          </p>
          <h3 id="start-process-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Iniciar o processo
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
            Com acesso ao SEI!RIO, localize no menu lateral o comando
            <UiLabelChip className="mx-1 align-middle">Iniciar Processo</UiLabelChip>
            e abra o formulário de cadastro.
          </p>
          <Callout variant="info" title="Objetivo desta ação" className="mt-5">
            <p className="text-sm leading-7">
              Nesta fase, apenas abra o formulário correto. A conferência dos campos ocorre no bloco seguinte.
            </p>
          </Callout>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
            Referência visual do sistema
          </p>
          <SeiMockup variant="menu" highlight="iniciar" />
        </div>
      </div>
    </section>

    <section className="section-card" aria-labelledby="process-registration-title">
      <div className="border-b border-slate-300 pb-5 dark:border-slate-700">
        <h3 id="process-registration-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
          Preenchimento do cadastro
        </h3>
        <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
          Preencha os campos com base na documentação disponível e na configuração atual do sistema. Evite inserir dados pessoais que não sejam necessários à identificação do processo.
        </p>
        <div className="mt-5">
          <LocalValidationNotice />
        </div>
      </div>

      <div className="divide-y divide-slate-300 dark:divide-slate-700">
        <FieldReference
          icon={<FolderOpen className="h-5 w-5" aria-hidden="true" />}
          title="Tipo de processo"
          explanation="Selecione a denominação disponível no cadastro vigente do SEI!RIO. O texto abaixo é a referência atualmente apresentada pelo guia."
          value={PROCESS_TYPE_LABEL}
        >
          <SeiMockup variant="type-selection" />
        </FieldReference>

        <FieldReference
          icon={<FolderOpen className="h-5 w-5" aria-hidden="true" />}
          title="Classificação por assuntos"
          explanation="A classificação deve permanecer vinculada ao tipo processual escolhido e corresponder à tabela vigente do sistema."
          value={PROCESS_CLASSIFICATION_LABEL}
        />

        <FieldReference
          icon={<NotebookPen className="h-5 w-5" aria-hidden="true" />}
          title="Especificação do processo"
          explanation="A identificação deve permitir pesquisa e triagem. Utilize exercício, unidade e programa ou ação somente conforme o padrão local formalmente validado."
          value="PDDE — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA UNIDADE ESCOLAR — CNPJ"
        />

        <FieldReference
          icon={<ShieldAlert className="h-5 w-5" aria-hidden="true" />}
          title="Nível de acesso"
          explanation="Defina o nível considerando publicidade, transparência e proteção de dados, e não apenas a prática habitual da unidade."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {accessLevels.map((item) => (
              <div key={item.level} className="rounded-lg border border-slate-300 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                <p className={`text-sm font-bold ${item.className}`}>{item.level}</p>
                <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </FieldReference>

        <FieldReference
          icon={<Users className="h-5 w-5" aria-hidden="true" />}
          title="Interessados"
          explanation="A inclusão da GAD e da unidade escolar depende do desenho formal do fluxo local. Não utilize este campo para dados pessoais desnecessários."
          value={GAD_UNIT.displayLabel}
        />

        <FieldReference
          icon={<NotebookPen className="h-5 w-5" aria-hidden="true" />}
          title="Observações da unidade"
          explanation="O registro do CNPJ neste campo é uma referência operacional local e deve ser confirmado antes da utilização."
          value="INSERIR CNPJ DO CEC DA UNIDADE (00.000.000/0001-00)"
        />
      </div>
    </section>

    <section className="section-card" aria-labelledby="save-process-title">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(20rem,1.05fr)] xl:items-start">
        <div>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Save className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 id="save-process-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
                Salvar e registrar o NUP
              </h3>
              <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                Revise os campos e conclua a autuação pelo botão
                <UiLabelChip tone="success" className="mx-1 align-middle">Salvar</UiLabelChip>.
                O sistema passará a exibir o Número Único de Protocolo.
              </p>
            </div>
          </div>

          <Callout variant="info" title="Controle interno" className="mt-5">
            <p className="text-sm leading-7">
              Registre o NUP no <strong>{INTERNAL_PROCESS_TRACKER_LABEL}</strong> somente quando essa rotina interna estiver formalmente vigente e for aplicável à equipe responsável.
            </p>
          </Callout>
        </div>

        <aside className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/25">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-300">
            Resultado esperado
          </p>
          <p className="mt-2 text-sm font-bold text-emerald-950 dark:text-emerald-100">Processo criado e identificado</p>
          <p className="mt-3 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            O NUP identifica formalmente o processo e deve ser preservado em todas as comunicações e controles relacionados.
          </p>
          <code className="mt-4 block rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-foreground data-code dark:border-emerald-800 dark:bg-slate-950">
            000704.000123/2026-45
          </code>
        </aside>
      </div>
    </section>
  </section>
);
