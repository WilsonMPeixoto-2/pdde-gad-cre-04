import {
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileInput,
  FileSearch,
  FileSignature,
  FolderOpen,
  Landmark,
  MessageCircleQuestion,
  Route,
  Scale,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { GuideSectionId } from "@/lib/guideContent";

type ChapterTone = "blue" | "teal" | "amber" | "violet" | "slate";

type ChapterVisualDefinition = {
  tone: ChapterTone;
  eyebrow: string;
  title: string;
  steps: readonly {
    label: string;
    description: string;
    icon: LucideIcon;
  }[];
  outcome: string;
  attention: string;
};

const chapterVisuals: Record<GuideSectionId, ChapterVisualDefinition> = {
  introducao: {
    tone: "blue",
    eyebrow: "Visão geral do guia",
    title: "Da organização inicial ao acompanhamento da análise",
    steps: [
      { label: "Compreender", description: "Conhecer objetivo, escopo e responsabilidades.", icon: BookOpenCheck },
      { label: "Preparar", description: "Reunir dados, documentos e referências.", icon: ClipboardCheck },
      { label: "Registrar", description: "Executar as ações no SEI!RIO.", icon: FileInput },
      { label: "Conferir", description: "Verificar conteúdo, forma e evidências.", icon: CheckCircle2 },
      { label: "Acompanhar", description: "Monitorar remessa e comunicações posteriores.", icon: Route },
    ],
    outcome: "Percurso compreendido antes da execução das rotinas.",
    attention: "A visão geral orienta; o conteúdo técnico fundamenta cada decisão.",
  },
  "secao-1": {
    tone: "blue",
    eyebrow: "Visão geral da etapa",
    title: "Abertura e identificação do processo",
    steps: [
      { label: "Preparar", description: "Confirmar exercício, CNPJ e unidade.", icon: ClipboardCheck },
      { label: "Iniciar", description: "Abrir o formulário correto no sistema.", icon: FolderOpen },
      { label: "Cadastrar", description: "Preencher tipo, classificação e interessados.", icon: FileInput },
      { label: "Conferir", description: "Revisar os campos antes da conclusão.", icon: FileSearch },
      { label: "Registrar", description: "Salvar o processo e preservar o NUP.", icon: BadgeCheck },
    ],
    outcome: "Processo criado, identificado e apto a receber os documentos.",
    attention: "Referências locais devem ser confirmadas no ambiente vigente.",
  },
  "secao-2": {
    tone: "violet",
    eyebrow: "Visão geral da etapa",
    title: "Preparação e instrução dos autos",
    steps: [
      { label: "Planejar", description: "Relacionar execução, aprovação e documentos.", icon: ClipboardCheck },
      { label: "Compreender", description: "Identificar a função de cada peça.", icon: FileSearch },
      { label: "Organizar", description: "Agrupar documentos por finalidade.", icon: FolderOpen },
      { label: "Aplicar", description: "Vincular regras, fontes e evidências.", icon: Scale },
      { label: "Conferir", description: "Usar o checklist somente ao final.", icon: CheckCircle2 },
    ],
    outcome: "Conjunto documental coerente, aplicável e pronto para inclusão.",
    attention: "Lista preenchida não substitui análise de conteúdo e aplicabilidade.",
  },
  "secao-3": {
    tone: "teal",
    eyebrow: "Visão geral da etapa",
    title: "Inclusão de documentos externos",
    steps: [
      { label: "Preparar", description: "Separar uma peça identificável por arquivo.", icon: ClipboardCheck },
      { label: "Selecionar", description: "Escolher Documento Externo no sistema.", icon: FolderOpen },
      { label: "Classificar", description: "Distinguir nato-digital e digitalizado.", icon: FileSearch },
      { label: "Anexar", description: "Preencher metadados e inserir o arquivo.", icon: FileInput },
      { label: "Conferir", description: "Verificar nome, origem e posição na árvore.", icon: BadgeCheck },
    ],
    outcome: "Arquivos incluídos com origem, tipo e identificação corretos.",
    attention: "Metadados incorretos comprometem autenticidade e encontrabilidade.",
  },
  "secao-4": {
    tone: "teal",
    eyebrow: "Visão geral da etapa",
    title: "Autenticação de documentos digitalizados",
    steps: [
      { label: "Identificar", description: "Confirmar se o arquivo veio do papel.", icon: FileSearch },
      { label: "Selecionar", description: "Localizar o documento correto na árvore.", icon: FolderOpen },
      { label: "Autenticar", description: "Aplicar a conferência correspondente.", icon: ShieldCheck },
      { label: "Verificar", description: "Checar o registro produzido no sistema.", icon: CheckCircle2 },
      { label: "Preservar", description: "Manter origem e identificação coerentes.", icon: BadgeCheck },
    ],
    outcome: "Documento digitalizado com conferência formalmente registrada.",
    attention: "Documento nato-digital não recebe autenticação de digitalização.",
  },
  "secao-5": {
    tone: "amber",
    eyebrow: "Visão geral da etapa",
    title: "Assinaturas e remessa do processo",
    steps: [
      { label: "Preparar", description: "Identificar documentos internos pendentes.", icon: ClipboardCheck },
      { label: "Assinar", description: "Concluir documentos e blocos de assinatura.", icon: FileSignature },
      { label: "Revisar", description: "Checar árvore, assinaturas e pendências.", icon: FileSearch },
      { label: "Remeter", description: "Enviar à unidade formalmente competente.", icon: Send },
      { label: "Registrar", description: "Preservar destino e confirmação da remessa.", icon: BadgeCheck },
    ],
    outcome: "Processo completo e encaminhado à unidade de análise.",
    attention: "Remessa prematura amplia retrabalho e devoluções.",
  },
  "secao-6": {
    tone: "violet",
    eyebrow: "Visão geral da etapa",
    title: "Acompanhamento posterior à remessa",
    steps: [
      { label: "Monitorar", description: "Acompanhar andamento e recebimento.", icon: Route },
      { label: "Identificar", description: "Ler a comunicação formal recebida.", icon: FileSearch },
      { label: "Responder", description: "Tratar exatamente a diligência registrada.", icon: MessageCircleQuestion },
      { label: "Comprovar", description: "Juntar evidências da providência adotada.", icon: ClipboardCheck },
      { label: "Registrar", description: "Preservar decisões e encaminhamentos.", icon: BadgeCheck },
    ],
    outcome: "Análise acompanhada e diligências atendidas com rastreabilidade.",
    attention: "A providência deve corresponder à comunicação formal do processo.",
  },
  contatos: {
    tone: "teal",
    eyebrow: "Apoio e orientação",
    title: "Atendimento e suporte",
    steps: [
      { label: "Identificar", description: "Distinguir dúvida de mérito e falha técnica.", icon: FileSearch },
      { label: "Escolher", description: "Usar o canal competente para cada necessidade.", icon: Route },
      { label: "Contextualizar", description: "Informar unidade, exercício e etapa.", icon: ClipboardCheck },
      { label: "Encaminhar", description: "Enviar a demanda de forma objetiva.", icon: Send },
      { label: "Registrar", description: "Preservar protocolo e resposta recebida.", icon: BadgeCheck },
    ],
    outcome: "Demanda direcionada ao canal adequado, com contexto suficiente.",
    attention: "Falhas do sistema e dúvidas normativas exigem canais diferentes.",
  },
  anexo: {
    tone: "slate",
    eyebrow: "Leitura de auditoria",
    title: "Fontes e aplicabilidade",
    steps: [
      { label: "Localizar", description: "Identificar a fonte oficial correspondente.", icon: Landmark },
      { label: "Verificar", description: "Conferir vigência, versão e órgão emissor.", icon: FileSearch },
      { label: "Interpretar", description: "Examinar escopo e aplicabilidade.", icon: Scale },
      { label: "Aplicar", description: "Vincular a fonte ao ponto de uso.", icon: ClipboardCheck },
      { label: "Rastrear", description: "Registrar versão e data de verificação.", icon: BadgeCheck },
    ],
    outcome: "Fundamentos recuperáveis, atuais e vinculados ao conteúdo do guia.",
    attention: "Consulte o texto oficial antes de decisões críticas.",
  },
};

type EditorialChapterVisualProps = {
  sectionId: GuideSectionId;
};

export const EditorialChapterVisual = ({ sectionId }: EditorialChapterVisualProps) => {
  const visual = chapterVisuals[sectionId];

  return (
    <aside className="editorial-map" data-tone={visual.tone} aria-label={`Visão geral: ${visual.title}`}>
      <div className="editorial-map__header">
        <span className="editorial-map__eyebrow">{visual.eyebrow}</span>
        <h3>{visual.title}</h3>
      </div>

      <ol className="editorial-map__steps">
        {visual.steps.map(({ label, description, icon: Icon }, index) => (
          <li key={label} className="editorial-map__step">
            <div className="editorial-map__marker" aria-hidden="true">
              <span>{index + 1}</span>
              <Icon />
            </div>
            <div>
              <strong>{label}</strong>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="editorial-map__summary">
        <div className="editorial-map__summary-item editorial-map__summary-item--outcome">
          <span>Resultado esperado</span>
          <strong>{visual.outcome}</strong>
        </div>
        <div className="editorial-map__summary-item editorial-map__summary-item--attention">
          <span>Ponto de atenção</span>
          <strong>{visual.attention}</strong>
        </div>
      </div>
    </aside>
  );
};