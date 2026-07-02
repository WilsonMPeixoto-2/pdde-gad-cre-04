import {
  Building2,
  CalendarClock,
  ClipboardList,
  Fingerprint,
  FolderOpen,
  NotebookPen,
  Save,
  Users,
} from "lucide-react";
import { SeiMockup } from "./SeiMockup";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";
import { UiLabelChip } from "./UiLabelChip";
import { AnimatedReveal } from "./AnimatedReveal";
import {
  GAD_UNIT,
  INTERNAL_PROCESS_TRACKER_LABEL,
  PROCESS_CLASSIFICATION_LABEL,
  PROCESS_TYPE_LABEL,
} from "@/lib/guideContent";

type SectionOneProps = {
  renderId?: boolean;
};

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
  <div className="rounded-xl border border-border/50 bg-gradient-to-b from-card to-secondary/30 p-4 shadow-sm" style={{ boxShadow: "var(--shadow-card-rest)" }}>
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/8 text-accent border border-accent/15">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          {eyebrow}
        </p>
        <h4 className="mt-1 font-heading text-sm font-bold tracking-tight text-foreground/90">
          {title}
        </h4>
        <div className="mt-4">{children}</div>
        {note ? <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{note}</p> : null}
      </div>
    </div>
  </div>
);

const ProcessCreationResultPreview = () => (
  <Callout variant="success" title="Processo criado com sucesso">
    <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-foreground/80">
      <p>
        Após salvar, o sistema exibirá o <strong className="text-foreground">NUP</strong> (Número
        Único de Protocolo) que identificará formalmente o processo. Exemplo:
      </p>
      <code className="block rounded-lg bg-background/60 border border-border/40 px-3 py-2 text-sm font-semibold text-foreground data-code">
        000704.000123/2026-45
      </code>
      <p>
        O NUP passa a identificar formalmente o processo para consulta, controle interno e
        tramitação posterior.
      </p>
    </div>
  </Callout>
);

export const SectionOne = ({ renderId = true }: SectionOneProps) => {
  const preflightCards = [
    {
      title: "Exercício de referência",
      description: "Confirme o ano da prestação de contas antes de autuar o processo e preencher a especificação.",
      icon: CalendarClock,
    },
    {
      title: "CNPJ do CEC/UEx",
      description: "Tenha o CNPJ correto em mãos para evitar inconsistência na observação da unidade e na conferência posterior.",
      icon: Fingerprint,
    },
    {
      title: "Identificação da unidade escolar",
      description: "Use a designação correta da unidade escolar para manter coerência entre processo, peças anexadas e análise regional.",
      icon: Building2,
    },
  ];

  return (
    <section id={renderId ? "secao-1" : undefined} className="scroll-mt-20">
      <div className="space-y-8">
        <AnimatedReveal delay={100} duration={600}>
          <div className="section-card chapter-opening">
            <div className="chapter-grid">
              <div aria-hidden="true" className="select-none">
                <span className="chapter-index">01</span>
                <span className="chapter-index-label">Primeira etapa</span>
              </div>

              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary">
                  <ClipboardList className="h-4 w-4" aria-hidden="true" />
                  1.1. Sobre esta etapa
                </div>
                <h3 className="chapter-title">Abertura do Processo</h3>
                <p className="chapter-lead mt-5 text-left sm:text-justify">
                  A etapa inicial compreende a autuação do processo administrativo eletrônico em que
                  serão registrados os dados básicos da prestação de contas, definidos os campos de
                  identificação e criada a base formal sobre a qual a instrução seguirá nas etapas
                  posteriores.
                </p>

                <div className="mt-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_17rem]">
                  <ProfileCallout visibleFor="diretor" variant="info">
                    <p>
                      Certifique-se de ter em mãos o <strong className="text-foreground">CNPJ do CEC</strong>,
                      a <strong className="text-foreground">designação da escola</strong> e o{" "}
                      <strong className="text-foreground">exercício de referência</strong> antes de iniciar a
                      autuação.
                    </p>
                  </ProfileCallout>

                  <ProfileCallout visibleFor="gad" variant="warning">
                    <p>
                      Ao receber o processo, verifique se a{" "}
                      <strong className="text-foreground">especificação</strong> segue o padrão obrigatório e
                      se a <strong className="text-foreground">GAD consta como interessada</strong>. Processos
                      fora do padrão devem ser devolvidos para correção.
                    </p>
                  </ProfileCallout>
                </div>
              </div>
            </div>

            <div className="preflight-grid mt-8 border border-border/50 bg-border/40">
              {preflightCards.map((card, idx) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="preflight-card hover:bg-card/40 transition-colors"
                  >
                    <div className="preflight-icon">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold tracking-tight text-foreground sm:text-base">
                        {card.title}
                      </h4>
                      <p className="mt-2 text-left text-sm leading-relaxed text-muted-foreground sm:text-justify">
                        {card.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card process-spread">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.94fr)_minmax(22rem,1.06fr)] xl:items-start">
              <div className="content-spacing">
                <div className="mb-5 flex items-end gap-4 border-b border-primary/18 pb-4">
                  <span className="font-display text-[3.4rem] font-bold leading-none text-primary/18 select-none" aria-hidden="true">
                    02
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary">
                      1.2. Primeira ação no SEI!RIO
                    </p>
                    <h3 className="font-display text-[1.9rem] font-bold leading-[1.04] text-foreground sm:text-[2.35rem]">
                      Iniciando o Processo
                    </h3>
                  </div>
                </div>
                <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                  Para abrir um novo processo no SEI!RIO, localize no menu lateral o comando{" "}
                  <UiLabelChip className="mx-1 align-middle">Iniciar Processo</UiLabelChip> e use esse
                  atalho para começar a autuação.
                </p>

                <Callout variant="info" title="Orientação essencial">
                  <p className="text-sm leading-7 text-foreground/82">
                    Nesta etapa, o importante é identificar corretamente a entrada de criação do
                    processo. A conferência dos campos obrigatórios virá nas subseções seguintes.
                  </p>
                </Callout>
              </div>

              <div className="space-y-3">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-primary/75">
                  Visualização do sistema
                </p>
                <SeiMockup variant="menu" highlight="iniciar" />
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card">
            <h3 className="section-heading">1.3. Escolha do tipo correto de processo</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.96fr)_minmax(22rem,1.04fr)] xl:items-start">
              <div className="content-spacing">
                <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                  Ao acessar a criação do processo, o sistema solicitará a seleção do tipo processual.
                  Use o tipo padronizado da prestação de contas do CEC, evitando resultados de busca
                  semelhantes, porém estranhos a este fluxo.
                </p>

                <Callout variant="info" title="Tipo de Processo Correto">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <p className="flex-1 text-sm font-semibold text-foreground sm:text-base text-pretty">
                      {PROCESS_TYPE_LABEL}
                    </p>
                    <CopyButton
                      text={PROCESS_TYPE_LABEL}
                      label="Copiado!"
                      className="self-end sm:self-auto"
                    />
                  </div>
                </Callout>
              </div>

              <div className="space-y-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Visualização da busca
                </p>
                <SeiMockup variant="type-selection" />
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card">
            <h3 className="section-heading">1.4. Classificação por Assuntos</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.98fr)_minmax(20rem,1.02fr)] xl:items-start">
              <div className="content-spacing">
                <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                  A classificação por assuntos decorre do tipo de processo escolhido na etapa anterior.
                  Ela deve permanecer coerente com a autuação e não precisa ser reinventada pelo
                  cadastrante quando o tipo correto já tiver sido selecionado.
                </p>

                <Callout variant="success" title="Classificação automática esperada">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <code className="flex-1 rounded-lg bg-background/50 px-3 py-2 text-sm text-foreground whitespace-normal wrap-break-word data-code">
                      {PROCESS_CLASSIFICATION_LABEL}
                    </code>
                    <CopyButton
                      text={PROCESS_CLASSIFICATION_LABEL}
                      label="Copiado!"
                      className="self-end sm:self-auto"
                    />
                  </div>
                </Callout>
              </div>

              <ProcessFieldPanel
                icon={<FolderOpen className="h-5 w-5" aria-hidden="true" />}
                eyebrow="Campo do cadastro"
                title="Classificação preenchida no formulário"
                note="O campo deve refletir exatamente o tipo de processo utilizado na abertura."
              >
                <div className="rounded-xl border border-border bg-secondary/35 px-4 py-3 text-sm font-semibold text-foreground/80 data-code">
                  {PROCESS_CLASSIFICATION_LABEL}
                </div>
              </ProcessFieldPanel>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card">
            <h3 className="section-heading">1.5. Padrão de identificação do processo (SEI!RIO)</h3>
            <div className="content-spacing">
              <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                Para fins de triagem, busca e padronização interna da{" "}
                <strong className="text-foreground">4ª CRE/GAD</strong>, o cadastrante deverá digitar
                a especificação seguindo o padrão abaixo, incluindo sempre o{" "}
                <strong className="text-sky-600 dark:text-sky-400">EXERCÍCIO</strong> (ano de
                referência) e a <strong className="text-sky-600 dark:text-sky-400">AÇÃO do PDDE</strong>{" "}
                quando aplicável.
              </p>

              <div className="overflow-x-auto">
                <table className="table-institutional w-full text-sm">
                  <thead>
                    <tr>
                      <th className="w-44 rounded-tl-lg">Se a situação for</th>
                      <th className="rounded-tr-lg">Use este padrão</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold text-foreground">1 ação do PDDE</td>
                      <td className="text-muted-foreground">Formato básico</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-foreground">Mais de uma ação</td>
                      <td className="text-muted-foreground">Formato com ações integradas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Callout variant="success" title="Padrão adotado pela 4ª CRE/GAD">
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold text-muted-foreground">Formato básico:</p>
                    <code className="block rounded-lg bg-background/50 px-3 py-2 text-sm text-foreground whitespace-normal wrap-break-word data-code">
                      PDDE — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA UNIDADE ESCOLAR — CNPJ da
                      UEx/CEC
                    </code>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold text-muted-foreground">
                      Com mais de uma ação:
                    </p>
                    <code className="block rounded-lg bg-background/50 px-3 py-2 text-sm text-foreground whitespace-normal wrap-break-word data-code">
                      PDDE (Básico + Ações Integradas) — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA
                      UNIDADE ESCOLAR — CNPJ
                    </code>
                  </div>
                </div>
              </Callout>

              <Callout variant="info" title="Exemplo prático" className="mt-4">
                <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                  <code className="flex-1 rounded-lg bg-background/50 px-3 py-2 text-sm text-foreground whitespace-normal wrap-break-word data-code">
                    PDDE — Exercício 2025 — E/CRE (04.30.502) — Ciep Elis Regina — 00.000.000/0001-00
                  </code>
                  <CopyButton
                    text="PDDE — Exercício 2025 — E/CRE (04.30.502) — Ciep Elis Regina — 00.000.000/0001-00"
                    label="Copiado!"
                    className="self-end sm:self-auto"
                  />
                </div>
              </Callout>

              <p className="mt-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] dark:bg-amber-500/[0.04] p-4 text-sm text-muted-foreground leading-relaxed">
                <strong className="text-amber-700 dark:text-amber-400">Finalidade da padronização.</strong>{" "}
                Essa padronização interna evita confusão entre anos, ações e prestações de contas
                diferentes, sem pretensão de fixar nomenclatura única para toda a SME.
              </p>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card">
            <h3 className="section-heading">1.6. Publicidade do processo e definição do nível de acesso</h3>
            <div className="content-spacing">
              <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                A definição do nível de acesso não é um gesto meramente mecânico do cadastro. Trata-se
                de decisão administrativa relacionada à publicidade do processo, à transparência da
                prestação de contas, à rastreabilidade do fluxo e à proteção de dados pessoais quando a
                documentação exigir tratamento específico.
              </p>

              <div className="overflow-x-auto">
                <table className="table-institutional w-full text-sm">
                  <thead>
                    <tr>
                      <th className="w-28 rounded-tl-lg sm:w-32">Nível</th>
                      <th className="rounded-tr-lg">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-bold text-accent">Público</td>
                      <td className="leading-relaxed text-muted-foreground">
                        Acessível aos usuários internos do SEI!RIO, sem prejuízo das regras de
                        consulta e transparência aplicáveis.
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-warning">Restrito</td>
                      <td className="leading-relaxed text-muted-foreground">
                        Acessível à unidade que criou o processo e às unidades que o recebam para
                        participar da instrução. A restrição deve possuir fundamento legal.
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-destructive">Sigiloso</td>
                      <td className="leading-relaxed text-muted-foreground">
                        Reservado a informações cuja proteção exija credencial individual de acesso.
                        Processos e documentos sigilosos possuem fluxo específico e não tramitam pelo
                        procedimento ordinário.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Callout variant="info" title="Diretriz para decidir corretamente" className="mt-6">
                <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
                  <p>
                    O nível de acesso deve ser definido de acordo com o conteúdo efetivo do processo
                    ou documento e com o fundamento jurídico aplicável.
                  </p>
                  <p>
                    Documentos com dados pessoais, dados bancários, endereços residenciais, assinaturas
                    ou outras informações legalmente protegidas exigem avaliação específica e, quando
                    cabível, restrição de acesso.
                  </p>
                  <p>
                    <strong className="text-foreground">Boa prática:</strong> mantenha públicos os
                    documentos que possam ser amplamente consultados sem risco e restrinja apenas os
                    anexos que realmente demandem proteção.
                  </p>
                  <p className="font-semibold text-foreground">
                    Use a expressão "dados pessoais sensíveis" apenas nas hipóteses específicas da
                    LGPD. Para os demais casos, prefira "dados pessoais ou informações legalmente
                    protegidas".
                  </p>
                </div>
              </Callout>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card">
            <h3 className="section-heading">1.7. Interessados do processo</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.98fr)_minmax(20rem,1.02fr)] xl:items-start">
              <div className="content-spacing">
                <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                  Este campo registra as unidades ou entidades que possuem interesse direto no
                  processo. Para o fluxo da prestação de contas do PDDE, a GAD e a unidade escolar
                  devem constar desde a abertura, permitindo consulta, tramitação e conferência
                  institucional adequadas.
                </p>
                <Callout variant="success" title="Adicione a GAD como interessada">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <code className="flex-1 rounded-lg bg-background/50 px-3 py-2 text-sm text-foreground whitespace-normal wrap-break-word data-code">
                      {GAD_UNIT.displayLabel}
                    </code>
                    <CopyButton
                      text={GAD_UNIT.displayLabel}
                      label="Código copiado!"
                      className="self-end sm:self-auto"
                    />
                  </div>
                </Callout>
                <Callout variant="info" title="Inclua também a unidade escolar" className="mt-4">
                  <p className="text-sm leading-7 text-foreground/82">
                    Busque pela <strong className="text-foreground">designação oficial</strong> da
                    unidade escolar para adicioná-la como interessada no cadastro inicial do processo.
                  </p>
                </Callout>
                <Callout variant="warning" title="Cuidado com o campo Interessados" className="mt-4">
                  <p className="text-sm leading-7 text-foreground/82">
                    As informações inseridas nesse campo podem aparecer na pesquisa pública do
                    sistema. Não inclua CPF, dados bancários, matrícula funcional, endereço residencial
                    ou outros dados pessoais desnecessários.
                  </p>
                </Callout>
              </div>

              <ProcessFieldPanel
                icon={<Users className="h-5 w-5" aria-hidden="true" />}
                eyebrow="Campo do cadastro"
                title="Interessados registrados na abertura"
                note="A presença simultânea da GAD e da unidade escolar reduz devoluções por cadastro incompleto."
              >
                <div className="space-y-2">
                  <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground/80 data-code">
                    {GAD_UNIT.displayLabel}
                  </div>
                  <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground italic">
                    Designação oficial da unidade escolar
                  </div>
                </div>
              </ProcessFieldPanel>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card">
            <h3 className="section-heading">1.8. Observações da unidade</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.96fr)_minmax(20rem,1.04fr)] xl:items-start">
              <div className="content-spacing">
                <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                  O campo <strong className="text-foreground">Observações desta unidade</strong> deve
                  registrar a informação padronizada utilizada pela 4ª CRE para identificar a entidade
                  executora associada ao processo. O preenchimento precisa ser objetivo e uniforme.
                </p>
                <Callout variant="success" title="Observação desta Unidade" className="mt-4">
                  <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <code className="flex-1 rounded-lg bg-background/50 px-3 py-2 text-sm text-foreground whitespace-normal wrap-break-word data-code">
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
                title="Preenchimento institucional da observação"
                note="Evite inserir observações paralelas ou comentários extensos neste campo da autuação inicial."
              >
                <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground/80 data-code">
                  INSERIR CNPJ DO CEC DA UNIDADE (00.000.000/0001-00)
                </div>
              </ProcessFieldPanel>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={600}>
          <div className="section-card">
            <h3 className="section-heading">1.9. Salvar, confirmar a criação e registrar o NUP</h3>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)] xl:items-start">
              <div className="content-spacing">
                <p className="text-left text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-justify">
                  Após revisar os campos de cadastro, conclua a autuação pelo botão{" "}
                  <UiLabelChip tone="success" className="mx-1 align-middle">Salvar</UiLabelChip>. Com
                  essa ação, o sistema cria o processo e passa a exibir o número único que identificará
                  formalmente o expediente no SEI!RIO.
                </p>

                <div className="rounded-xl border border-border/50 bg-gradient-to-b from-card via-card to-secondary/35 p-4 shadow-sm" style={{ boxShadow: "var(--shadow-card-rest)" }}>
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Ação final do cadastro
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/85 px-4 py-2 text-xs font-semibold text-foreground/70">
                      <Save className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      Salvar
                    </span>
                    <span className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground">
                      Voltar
                    </span>
                  </div>
                </div>

                <Callout variant="info" title="Providência após a criação" className="mt-4">
                  <p className="text-sm leading-7 text-foreground/82">
                    Registre o <strong className="text-foreground">NUP</strong> no{" "}
                    <UiLabelChip className="mx-1 align-middle">{INTERNAL_PROCESS_TRACKER_LABEL}</UiLabelChip>
                    utilizado para controle interno da GCGR, de modo a manter a rastreabilidade do
                    processo desde a abertura.
                  </p>
                </Callout>
              </div>

              <div className="space-y-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Esquema ilustrativo do estado após salvar
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
