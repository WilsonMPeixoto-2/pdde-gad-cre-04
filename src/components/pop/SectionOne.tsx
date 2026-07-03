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
import { SeiMockup } from "./SeiMockup";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";
import { UiLabelChip } from "./UiLabelChip";
import { AnimatedReveal } from "./AnimatedReveal";
import { IconTile } from "@/components/visual/IconTile";
import {
  GAD_UNIT,
  INTERNAL_PROCESS_TRACKER_LABEL,
  PROCESS_CLASSIFICATION_LABEL,
  PROCESS_TYPE_LABEL,
} from "@/lib/guideContent";

type SectionOneProps = {
  renderId?: boolean;
};

const LocalValidationNotice = () => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-400/60 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/25 dark:text-amber-100">
    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
    <p>
      <strong>Referência operacional local:</strong> confirme a configuração vigente do SEI!RIO e a
      orientação formal da SME-Rio ou da 4ª CRE antes de tratar esta indicação como requisito definitivo.
    </p>
  </div>
);

const ProcessFieldPanel = ({
  icon,
  title,
  eyebrow,
  children,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  note?: string;
}) => (
  <aside className="rounded-xl border border-slate-300 bg-slate-100/85 p-4 dark:border-slate-700 dark:bg-slate-900/55">
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/45 dark:text-sky-300">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
          {eyebrow}
        </p>
        <h4 className="mt-1 text-sm font-bold tracking-tight text-foreground sm:text-base">{title}</h4>
        <div className="mt-4">{children}</div>
        {note ? <p className="mt-3 text-xs leading-6 text-slate-700 dark:text-slate-300">{note}</p> : null}
      </div>
    </div>
  </aside>
);

const ProcessCreationResultPreview = () => (
  <Callout variant="success" title="Processo criado com sucesso">
    <div className="space-y-3 text-sm leading-7 text-foreground/85">
      <p>
        Após salvar, o sistema exibirá o <strong className="text-foreground">NUP</strong> (Número Único
        de Protocolo), que identificará formalmente o processo. Exemplo:
      </p>
      <code className="block rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-semibold text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
        000704.000123/2026-45
      </code>
      <p>Registre o NUP no controle interno aplicável para manter a rastreabilidade do expediente.</p>
    </div>
  </Callout>
);

export const SectionOne = ({ renderId = true }: SectionOneProps) => {
  const preflightCards = [
    {
      title: "Exercício de referência",
      description: "Confirme o ano da prestação de contas antes de autuar o processo.",
      icon: CalendarClock,
    },
    {
      title: "CNPJ do CEC/UEx",
      description: "Tenha o CNPJ correto em mãos para evitar inconsistências na identificação.",
      icon: Fingerprint,
    },
    {
      title: "Unidade escolar",
      description: "Utilize a designação oficial que consta nas peças da prestação de contas.",
      icon: Building2,
    },
  ];

  return (
    <section id={renderId ? "secao-1" : undefined} className="scroll-mt-20">
      <div className="space-y-8">
        <AnimatedReveal delay={100} duration={400}>
          <div className="section-card chapter-opening">
            <div className="chapter-grid">
              <div aria-hidden="true" className="select-none">
                <span className="block text-[5rem] font-extrabold leading-none tracking-[-0.07em] text-blue-700 dark:text-sky-300">
                  01
                </span>
                <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
                  Primeira etapa
                </span>
              </div>

              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-800 dark:text-sky-300">
                  <ClipboardList className="h-4 w-4" aria-hidden="true" />
                  1.1. Sobre esta etapa
                </div>
                <h3 className="chapter-title">Abertura do Processo</h3>
                <p className="chapter-lead mt-5 text-left">
                  A etapa inicial compreende a autuação do processo administrativo eletrônico, o registro
                  dos dados básicos e a criação da base formal sobre a qual a instrução seguirá.
                </p>

                <div className="mt-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_17rem]">
                  <ProfileCallout visibleFor="diretor" variant="info">
                    <p>
                      Tenha em mãos o <strong className="text-foreground">CNPJ do CEC</strong>, a
                      <strong className="text-foreground"> designação da escola</strong> e o
                      <strong className="text-foreground"> exercício de referência</strong>.
                    </p>
                  </ProfileCallout>

                  <ProfileCallout visibleFor="gad" variant="warning">
                    <p>
                      Na análise, confira a coerência entre cadastro, documentos e identificação da unidade,
                      sem presumir obrigatoriedade local ainda não formalizada.
                    </p>
                  </ProfileCallout>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-slate-300 bg-slate-300 sm:grid-cols-3 dark:border-slate-700 dark:bg-slate-700">
              {preflightCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="bg-slate-50 p-4 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                      <IconTile icon={Icon} size="sm" />
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{card.title}</h4>
                        <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={120} duration={400}>
          <div className="section-card process-spread">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.94fr)_minmax(22rem,1.06fr)] xl:items-start">
              <div className="content-spacing">
                <div className="mb-5 flex items-end gap-4 border-b border-slate-300 pb-4 dark:border-slate-700">
                  <span className="text-[3.4rem] font-extrabold leading-none text-blue-700 dark:text-sky-300" aria-hidden="true">
                    02
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800 dark:text-sky-300">
                      1.2. Primeira ação no SEI!RIO
                    </p>
                    <h3 className="text-[1.9rem] font-bold leading-tight tracking-[-0.035em] text-foreground sm:text-[2.35rem]">
                      Iniciando o Processo
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                  Localize no menu lateral o comando <UiLabelChip className="mx-1 align-middle">Iniciar Processo</UiLabelChip>
                  e utilize essa entrada para começar a autuação.
                </p>
                <Callout variant="info" title="Orientação essencial">
                  <p className="text-sm leading-7 text-foreground/85">
                    Nesta etapa, concentre-se em abrir o formulário correto. A conferência dos campos ocorre nas subseções seguintes.
                  </p>
                </Callout>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
                  Visualização do sistema
                </p>
                <SeiMockup variant="menu" highlight="iniciar" />
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={140} duration={400}>
          <div className="section-card">
            <h3 className="section-heading">1.3. Tipo de processo</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.96fr)_minmax(22rem,1.04fr)] xl:items-start">
              <div className="content-spacing space-y-4">
                <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                  O SEI!RIO solicitará a seleção do tipo processual. A denominação abaixo é a referência operacional atualmente apresentada no guia.
                </p>
                <LocalValidationNotice />
                <Callout variant="info" title="Referência de tipo processual">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <p className="flex-1 text-sm font-semibold text-foreground sm:text-base">{PROCESS_TYPE_LABEL}</p>
                    <CopyButton text={PROCESS_TYPE_LABEL} label="Copiado!" className="self-end sm:self-auto" />
                  </div>
                </Callout>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
                  Visualização da busca
                </p>
                <SeiMockup variant="type-selection" />
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={160} duration={400}>
          <div className="section-card">
            <h3 className="section-heading">1.4. Classificação por assuntos</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.98fr)_minmax(20rem,1.02fr)] xl:items-start">
              <div className="content-spacing space-y-4">
                <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                  A classificação deve corresponder ao tipo escolhido e à configuração vigente do sistema.
                </p>
                <LocalValidationNotice />
                <Callout variant="success" title="Classificação apresentada como referência">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <code className="flex-1 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
                      {PROCESS_CLASSIFICATION_LABEL}
                    </code>
                    <CopyButton text={PROCESS_CLASSIFICATION_LABEL} label="Copiado!" className="self-end sm:self-auto" />
                  </div>
                </Callout>
              </div>

              <ProcessFieldPanel
                icon={<FolderOpen className="h-5 w-5" aria-hidden="true" />}
                eyebrow="Campo do cadastro"
                title="Classificação exibida no formulário"
                note="Confirme no sistema se o código permanece vinculado ao tipo processual utilizado."
              >
                <div className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-foreground data-code dark:border-slate-700 dark:bg-slate-950">
                  {PROCESS_CLASSIFICATION_LABEL}
                </div>
              </ProcessFieldPanel>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={180} duration={400}>
          <div className="section-card">
            <h3 className="section-heading">1.5. Identificação do processo</h3>
            <div className="content-spacing space-y-5">
              <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                Para facilitar triagem e busca, a 4ª CRE utiliza uma referência textual que inclui
                <strong className="text-sky-800 dark:text-sky-300"> EXERCÍCIO</strong> e
                <strong className="text-sky-800 dark:text-sky-300"> AÇÃO do PDDE</strong>, quando aplicável.
              </p>
              <LocalValidationNotice />

              <div className="overflow-x-auto">
                <table className="table-institutional w-full text-sm">
                  <thead>
                    <tr>
                      <th className="w-44 rounded-tl-lg">Situação</th>
                      <th className="rounded-tr-lg">Referência textual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold text-foreground">Uma ação do PDDE</td>
                      <td className="text-slate-700 dark:text-slate-300">Formato básico</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-foreground">Mais de uma ação</td>
                      <td className="text-slate-700 dark:text-slate-300">Formato com ações integradas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Callout variant="success" title="Referências textuais atualmente utilizadas">
                <div className="mt-2 space-y-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-700 dark:text-slate-300">Formato básico</p>
                    <code className="block rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
                      PDDE — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA UNIDADE ESCOLAR — CNPJ da UEx/CEC
                    </code>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-700 dark:text-slate-300">Com ações integradas</p>
                    <code className="block rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
                      PDDE (Básico + Ações Integradas) — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA UNIDADE ESCOLAR — CNPJ
                    </code>
                  </div>
                </div>
              </Callout>

              <Callout variant="info" title="Exemplo prático">
                <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                  <code className="flex-1 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
                    PDDE — Exercício 2025 — E/CRE (04.30.502) — Ciep Elis Regina — 00.000.000/0001-00
                  </code>
                  <CopyButton
                    text="PDDE — Exercício 2025 — E/CRE (04.30.502) — Ciep Elis Regina — 00.000.000/0001-00"
                    label="Copiado!"
                    className="self-end sm:self-auto"
                  />
                </div>
              </Callout>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={400}>
          <div className="section-card">
            <h3 className="section-heading">1.6. Nível de acesso</h3>
            <div className="content-spacing space-y-5">
              <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                O nível de acesso deve considerar publicidade, transparência e proteção de dados. Não o escolha apenas por hábito.
              </p>

              <div className="overflow-x-auto">
                <table className="table-institutional w-full text-sm">
                  <thead>
                    <tr>
                      <th className="w-32 rounded-tl-lg">Nível</th>
                      <th className="rounded-tr-lg">Aplicação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-bold text-blue-800 dark:text-sky-300">Público</td>
                      <td className="text-slate-700 dark:text-slate-300">Para conteúdo que possa ser amplamente consultado.</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-amber-800 dark:text-yellow-300">Restrito</td>
                      <td className="text-slate-700 dark:text-slate-300">Quando houver fundamento legal e informação protegida.</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-red-700 dark:text-red-300">Sigiloso</td>
                      <td className="text-slate-700 dark:text-slate-300">Somente nas hipóteses específicas que exijam credencial individual.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Callout variant="info" title="Diretriz para decidir corretamente">
                <div className="space-y-3 text-sm leading-7 text-foreground/85">
                  <p>Considere o conteúdo efetivo do processo e o fundamento jurídico aplicável.</p>
                  <p>Dados bancários, endereços residenciais, assinaturas e outras informações protegidas exigem avaliação específica.</p>
                  <p><strong className="text-foreground">Boa prática:</strong> restrinja apenas o que realmente demande proteção.</p>
                </div>
              </Callout>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={220} duration={400}>
          <div className="section-card">
            <h3 className="section-heading">1.7. Interessados do processo</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.98fr)_minmax(20rem,1.02fr)] xl:items-start">
              <div className="content-spacing space-y-4">
                <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                  O campo registra unidades ou entidades com interesse direto no processo. O guia apresenta a GAD e a unidade escolar como referência do fluxo local.
                </p>
                <LocalValidationNotice />
                <Callout variant="success" title="Referência de unidade interessada">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <code className="flex-1 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
                      {GAD_UNIT.displayLabel}
                    </code>
                    <CopyButton text={GAD_UNIT.displayLabel} label="Código copiado!" className="self-end sm:self-auto" />
                  </div>
                </Callout>
                <Callout variant="info" title="Unidade escolar">
                  <p className="text-sm leading-7 text-foreground/85">Utilize a designação oficial da unidade escolar quando a rotina local estiver confirmada.</p>
                </Callout>
                <Callout variant="warning" title="Cuidado com o campo Interessados">
                  <p className="text-sm leading-7 text-foreground/85">
                    Não inclua CPF, dados bancários, matrícula funcional, endereço residencial ou outros dados pessoais desnecessários.
                  </p>
                </Callout>
              </div>

              <ProcessFieldPanel
                icon={<Users className="h-5 w-5" aria-hidden="true" />}
                eyebrow="Campo do cadastro"
                title="Interessados apresentados como referência"
                note="Confirme a orientação vigente antes de concluir a autuação."
              >
                <div className="space-y-2">
                  <div className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-foreground data-code dark:border-slate-700 dark:bg-slate-950">
                    {GAD_UNIT.displayLabel}
                  </div>
                  <div className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm italic text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                    Designação oficial da unidade escolar
                  </div>
                </div>
              </ProcessFieldPanel>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={240} duration={400}>
          <div className="section-card">
            <h3 className="section-heading">1.8. Observações da unidade</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.96fr)_minmax(20rem,1.04fr)] xl:items-start">
              <div className="content-spacing space-y-4">
                <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                  O uso do campo para registrar o CNPJ é uma referência operacional local e deve ser confirmado antes da utilização.
                </p>
                <LocalValidationNotice />
                <Callout variant="success" title="Referência apresentada no guia">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <code className="flex-1 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-foreground data-code dark:border-slate-700 dark:bg-slate-900">
                      INSERIR CNPJ DO CEC DA UNIDADE (00.000.000/0001-00)
                    </code>
                    <CopyButton
                      text="INSERIR CNPJ DO CEC DA UNIDADE (00.000.000/0001-00)"
                      label="Copiado!"
                      className="self-end sm:self-auto"
                    />
                  </div>
                </Callout>
              </div>

              <ProcessFieldPanel
                icon={<NotebookPen className="h-5 w-5" aria-hidden="true" />}
                eyebrow="Campo do cadastro"
                title="Exemplo de preenchimento"
                note="Não insira dados pessoais ou comentários extensos neste campo."
              >
                <div className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-foreground data-code dark:border-slate-700 dark:bg-slate-950">
                  INSERIR CNPJ DO CEC DA UNIDADE (00.000.000/0001-00)
                </div>
              </ProcessFieldPanel>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={260} duration={400}>
          <div className="section-card">
            <h3 className="section-heading">1.9. Salvar e registrar o NUP</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)] xl:items-start">
              <div className="content-spacing space-y-5">
                <p className="text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
                  Após revisar os campos, conclua a autuação pelo botão
                  <UiLabelChip tone="success" className="mx-1 align-middle">Salvar</UiLabelChip>. O sistema passará a exibir o NUP.
                </p>

                <div className="rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">Ação final do cadastro</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md border border-slate-400 bg-white px-4 py-2 text-xs font-semibold text-foreground dark:border-slate-600 dark:bg-slate-950">
                      <Save className="h-3.5 w-3.5 text-blue-700 dark:text-sky-300" aria-hidden="true" />
                      Salvar
                    </span>
                    <span className="inline-flex items-center rounded-md border border-slate-400 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-300">
                      Voltar
                    </span>
                  </div>
                </div>

                <Callout variant="info" title="Providência após a criação">
                  <p className="text-sm leading-7 text-foreground/85">
                    Registre o <strong className="text-foreground">NUP</strong> no
                    <UiLabelChip className="mx-1 align-middle">{INTERNAL_PROCESS_TRACKER_LABEL}</UiLabelChip>
                    somente quando essa rotina interna estiver vigente e aplicável à equipe responsável.
                  </p>
                </Callout>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
                  Estado após salvar
                </p>
                <ProcessCreationResultPreview />
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};
