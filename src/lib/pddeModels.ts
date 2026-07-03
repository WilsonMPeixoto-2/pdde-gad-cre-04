import {
  Building2,
  ClipboardList,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { pdfAssetManifest, type PdfAssetKey } from "@/generated/pdfManifest";
import { externalResources, type ExternalResourceId } from "@/lib/externalResources";

export interface PDDEModelResource {
  id: string;
  title: string;
  description: string;
  fileName: PdfAssetKey;
  icon: LucideIcon;
  category: "instrucao" | "financeiro" | "parecer";
  contentKind: "template" | "filled-example" | "visual-reference" | "complementary-reference";
  sourceKindLabel: "Base normativa" | "Fluxo operacional" | "Referência oficial";
  sourceIds: ExternalResourceId[];
  traceabilityNote: string;
}

export const pddeModels: PDDEModelResource[] = [
  {
    id: "oficio-pdde",
    title: "Ofício de Prestação de Contas PDDE",
    description: "Modelo editável de encaminhamento para remessa da prestação de contas à instância responsável.",
    fileName: "MODELO_DE_OFICIO_PDDE.pdf",
    icon: FileText,
    category: "instrucao",
    contentKind: "template",
    sourceKindLabel: "Base normativa",
    sourceIds: ["resolution15"],
    traceabilityNote: "Arquivo em formato de modelo. Foi revisado para remeter ao núcleo mínimo do art. 33 sem apresentar formulário federal como se fosse peça oficial do FNDE.",
  },
  {
    id: "planejamento-ata",
    title: "Planejamento com Ata",
    description: "Exemplo preenchido de registro da deliberação do CEC sobre prioridades e plano de gastos.",
    fileName: "PLANEJAMENTO_COM_ATA.pdf",
    icon: ClipboardList,
    category: "instrucao",
    contentKind: "filled-example",
    sourceKindLabel: "Base normativa",
    sourceIds: ["resolution15"],
    traceabilityNote: "Arquivo mantido como exemplo preenchido para leitura da estrutura documental. Não deve ser copiado literalmente como modelo em branco.",
  },
  {
    id: "consolidacao-pesquisa-precos",
    title: "Consolidação de Pesquisa de Preços",
    description: "Exemplo preenchido de consolidação de cotações para demonstrar a rotina de comparação de propostas.",
    fileName: "CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    icon: FileCheck,
    category: "instrucao",
    contentKind: "filled-example",
    sourceKindLabel: "Base normativa",
    sourceIds: ["resolution15"],
    traceabilityNote: "Serve como referência visual de preenchimento e organização da consolidação. A rotina padrão continua sendo comprovar 3 orçamentos, justificativa idônea ou documentação de SRP.",
  },
  {
    id: "demonstrativo-despesa",
    title: "Demonstrativo de Despesa",
    description: "Referência histórica preenchida para leitura do tipo de informação exigida no demonstrativo do exercício.",
    fileName: "DEMONSTRATIVO_DE_DESPESA.pdf",
    icon: FileSpreadsheet,
    category: "financeiro",
    contentKind: "filled-example",
    sourceKindLabel: "Fluxo operacional",
    sourceIds: ["resolution15", "comunicado47_2024"],
    traceabilityNote: "Mantido como exemplo visual. No exercício vigente, prevalece o registro federal efetivamente exigido pelo FNDE, inclusive BB Gestão Ágil e sistemas correlatos quando cabíveis.",
  },
  {
    id: "nota-fiscal-danfe",
    title: "Nota Fiscal Eletrônica — DANFE",
    description: "Referência visual para conferência dos elementos mínimos do documento fiscal e do atesto da despesa.",
    fileName: "NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    icon: Receipt,
    category: "financeiro",
    contentKind: "visual-reference",
    sourceKindLabel: "Base normativa",
    sourceIds: ["resolution15"],
    traceabilityNote: "Use para conferir campos essenciais da comprovação da despesa. Não é um formulário a ser preenchido, e sim um parâmetro visual do documento fiscal esperado.",
  },
  {
    id: "extrato-conta-corrente",
    title: "Extrato de Conta Corrente",
    description: "Referência visual do extrato bancário da conta específica do PDDE ao longo do exercício.",
    fileName: "EXTRATO_CONTA_CORRENTE.pdf",
    icon: Building2,
    category: "financeiro",
    contentKind: "visual-reference",
    sourceKindLabel: "Base normativa",
    sourceIds: ["resolution15"],
    traceabilityNote: "A conferência deve abranger o período integral do exercício e a coerência entre lançamentos, saldo e registro federal correspondente.",
  },
  {
    id: "extrato-aplicacao",
    title: "Extrato de Aplicação",
    description: "Referência visual do extrato de aplicação financeira, com foco em saldo, rendimento e compatibilidade com a conta do programa.",
    fileName: "EXTRATO_APLICACAO.pdf",
    icon: Building2,
    category: "financeiro",
    contentKind: "visual-reference",
    sourceKindLabel: "Base normativa",
    sourceIds: ["resolution15"],
    traceabilityNote: "Observe especialmente saldo em 31/12, rendimento financeiro e necessidade de conciliação quando houver divergência entre extratos e registro do exercício.",
  },
  {
    id: "parecer-conselho",
    title: "Parecer do Conselho",
    description: "Referência complementar de manifestação do colegiado, quando o fluxo local exigir peça própria além da ata.",
    fileName: "PARECER_DO_CONSELHO.pdf",
    icon: FileCheck,
    category: "parecer",
    contentKind: "complementary-reference",
    sourceKindLabel: "Base normativa",
    sourceIds: ["resolution15"],
    traceabilityNote: "Arquivo mantido apenas como referência complementar do rito local. Sua utilização depende da prática institucional efetivamente adotada pela CRE/CEC no caso concreto.",
  },
];

export const modelContentKindMeta = {
  template: {
    label: "Modelo editável",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  "filled-example": {
    label: "Exemplo preenchido",
    className: "bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-800/40",
  },
  "visual-reference": {
    label: "Referência visual",
    className: "bg-muted text-muted-foreground border-border/60",
  },
  "complementary-reference": {
    label: "Complementar local",
    className: "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/40",
  },
} as const;

export const modelCategoryMeta = {
  instrucao: {
    label: "Instrução Processual",
    color: "text-blue-800 dark:text-sky-300",
    bgColor: "bg-primary/8 dark:bg-accent/12",
    iconBg: "bg-linear-to-br from-primary/15 to-primary/5 dark:from-accent/20 dark:to-accent/5",
    iconColor: "text-blue-800 dark:text-sky-300",
    accent: "hsl(var(--primary))",
  },
  financeiro: {
    label: "Documentos Financeiros",
    color: "text-emerald-800 dark:text-emerald-300",
    bgColor: "bg-emerald-100/80 dark:bg-emerald-950/30",
    iconBg: "bg-linear-to-br from-emerald-200 to-emerald-50 dark:from-emerald-900/60 dark:to-emerald-950/20",
    iconColor: "text-emerald-800 dark:text-emerald-300",
    accent: "#047857",
  },
  parecer: {
    label: "Deliberação",
    color: "text-violet-800 dark:text-violet-300",
    bgColor: "bg-violet-100/80 dark:bg-violet-950/30",
    iconBg: "bg-linear-to-br from-violet-200 to-violet-50 dark:from-violet-900/60 dark:to-violet-950/20",
    iconColor: "text-violet-800 dark:text-violet-300",
    accent: "#6d28d9",
  },
} as const;

export const modelCategoryOrder: PDDEModelResource["category"][] = ["instrucao", "financeiro", "parecer"];

export const modelResourceSummary = {
  template: pddeModels.filter((item) => item.contentKind === "template").length,
  filledExample: pddeModels.filter((item) => item.contentKind === "filled-example").length,
  visualReference: pddeModels.filter((item) => item.contentKind === "visual-reference").length,
  complementaryReference: pddeModels.filter((item) => item.contentKind === "complementary-reference").length,
};

export const getPdfAssetMeta = (fileName: PdfAssetKey) => pdfAssetManifest[fileName];

export const getModelSourceLinks = (sourceIds: ExternalResourceId[]) =>
  sourceIds.map((sourceId) => externalResources[sourceId]);

export const openablePdfLinks = pddeModels.map((item) => getPdfAssetMeta(item.fileName).href);
