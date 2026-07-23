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
    eyebrow: "Mapa do guia",
    title: "Um percurso único, da abertura ao acompanhamento",
    steps: [
      { label: "Compreender", description: "Objetivo, escopo e lógica do fluxo.", icon: BookOpenCheck },
      { label: "Executar", description: "Etapas e documentos no SEI!RIO.", icon: Route },
      { label: "Comprovar", description: "Conferência, fontes e rastreabilidade.", icon: BadgeCheck },
    ],
    outcome: "Visão geral do processo e das responsabilidades.",
    attention: "Cada etapa deve ser lida antes da execução correspondente.",
  },
  "secao-1": {
    tone: "blue",
    eyebrow: "Visão geral da etapa",
    title: "Abertura e identificação do processo",
    steps: [
      { label: "Preparar", description: "Confirmar exercício, CNPJ e unidade.", icon: ClipboardCheck },
      { label: "Autuar", description: "Selecionar tipo, classificação e interessados.", icon: FolderOpen },
      { label: "Registrar", description: "Salvar, conferir e anotar o NUP.", icon: BadgeCheck },
    ],
    outcome: "Processo criado, identificado e apto a receber os documentos.",
    attention: "Referências locais devem ser confirmadas no ambiente vigente.",
  },
  "secao-2": {
    tone: "violet",
    eyebrow: "Visão geral da etapa",
    title: "Preparação e instrução dos autos",
    steps: [
      { label: "Compreender", description: "Identificar a função de cada peça.", icon: FileSearch },
      { label: "Organizar", description: "Relacionar documentos, regras e evidências.", icon: Scale },
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
      { label: "Classificar", description: "Distinguir nato-digital e digitalizado.", icon: FileSearch },
      { label: "Inserir", description: "Preencher os metadados obrigatórios.", icon: FileInput },
      { label: "Identificar", description: "Nomear claramente a peça na árvore.", icon: BadgeCheck },
    ],
    outcome: "Arquivos incluídos com origem, tipo e identificação corretos.",
    attention: "Metadados incorretos comprometem autenticidade e encontrabilidade.",
  },
  "secao-4": {
    tone: "teal",
    eyebrow: "Visão geral da etapa",
    title: "Autenticação de documentos digitalizados",
    steps: [
      { label: "Reconhecer", description: "Confirmar se o arquivo veio do papel.", icon: FileSearch },
      { label: "Autenticar", description: "Aplicar a conferência no documento correto.", icon: ShieldCheck },
      { label: "Verificar", description: "Conferir o registro na árvore do processo.", icon: BadgeCheck },
    ],
    outcome: "Documento digitalizado com conferência formalmente registrada.",
    attention: "Documento nato-digital não deve receber autenticação de digitalização.",
  },
  "secao-5": {
    tone: "amber",
    eyebrow: "Visão geral da etapa",
    title: "Assinaturas e remessa do processo",
    steps: [
      { label: "Assinar", description: "Concluir documentos internos e blocos.", icon: FileSignature },
      { label: "Revisar", description: "Checar árvore, assinaturas e pendências.", icon: ClipboardCheck },
      { label: "Remeter", description: "Enviar à unidade competente.", icon: Send },
    ],
    outcome: "Processo completo e encaminhado à unidade de análise.",
    attention: "Remessa prematura amplia retrabalho e devoluções.",
  },
  "secao-6": {
    tone: "violet",
    eyebrow: "Visão geral da etapa",
    title: "Acompanhamento posterior à remessa",
    steps: [
      { label: "Monitorar", description: "Acompanhar andamento e comunicações.", icon: Route },
      { label: "Responder", description: "Tratar diligências formalmente recebidas.", icon: MessageCircleQuestion },
      { label: "Registrar", description: "Preservar decisões e providências adotadas.", icon: BadgeCheck },
    ],
    outcome: "Análise acompanhada e diligências atendidas com rastreabilidade.",
    attention: "A providência deve corresponder exatamente à comunicação formal.",
  },
  contatos: {
    tone: "teal",
    eyebrow: "Apoio e orientação",
    title: "Atendimento e suporte",
    steps: [
      { label: "Identificar", description: "Distinguir dúvida de mérito e falha técnica.", icon: FileSearch },
      { label: "Encaminhar", description: "Usar o canal competente para cada caso.", icon: Send },
      { label: "Registrar", description: "Preservar protocolo e resposta recebida.", icon: BadgeCheck },
    ],
    outcome: "Demanda direcionada ao canal adequado, com contexto suficiente.",
    attention: "Problemas técnicos do sistema não devem ser tratados como dúvida normativa.",
  },
  anexo: {
    tone: "slate",
    eyebrow: "Leitura de auditoria",
    title: "Fontes e aplicabilidade",
    steps: [
      { label: "Localizar", description: "Identificar a fonte oficial correspondente.", icon: Landmark },
      { label: "Interpretar", description: "Verificar escopo, vigência e aplicabilidade.", icon: Scale },
      { label: "Rastrear", description: "Registrar versão e data de verificação.", icon: BadgeCheck },
    ],
    outcome: "Fundamentos recuperáveis, atuais e vinculados ao conteúdo do guia.",
    attention: "A referência deve ser consultada no texto oficial antes de decisões críticas.",
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
