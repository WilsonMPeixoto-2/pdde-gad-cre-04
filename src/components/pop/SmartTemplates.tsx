import { useState, useCallback, useEffect } from "react";
import { FileText, Copy, Check, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useClipboardAction } from "@/hooks/useClipboardAction";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  emptyProcessWorkspaceProfile,
  PDDE_STORAGE_EVENT,
  PDDE_STORAGE_KEYS,
  readStorageJson,
  sanitizeWorkspaceProfile,
  writeStorageJson,
  type ProcessWorkspaceProfile,
} from "@/lib/pddeOperationalData";

interface TemplateField {
  key: string;
  label: string;
  placeholder: string;
  type?: "text" | "date" | "number";
}

interface Template {
  id: string;
  title: string;
  description: string;
  fields: TemplateField[];
  generate: (values: Record<string, string>) => string;
}

const templates: Template[] = [
  {
    id: "oficio",
    title: "Ofício de Encaminhamento",
    description: "Ofício padrão para encaminhamento da prestação de contas PDDE",
    fields: [
      { key: "escola", label: "Nome da Unidade Escolar", placeholder: "E.M. João da Silva" },
      { key: "cnpj", label: "CNPJ da UEx", placeholder: "00.000.000/0001-00" },
      { key: "exercicio", label: "Exercício Financeiro", placeholder: "2025" },
      { key: "diretor", label: "Nome do(a) Diretor(a)", placeholder: "Maria Oliveira" },
      { key: "matricula", label: "Matrícula", placeholder: "12/345.678-9" },
    ],
    generate: (v) =>
      `OFÍCIO Nº ____/${v.exercicio || "____"}\n\n` +
      `${v.escola || "[NOME DA UNIDADE ESCOLAR]"}\n` +
      `CNPJ: ${v.cnpj || "[CNPJ]"}\n\n` +
      `À Gerência de Administração — GAD\n` +
      `4ª Coordenadoria Regional de Educação\n\n` +
      `Assunto: Encaminhamento da Prestação de Contas do PDDE — Exercício ${v.exercicio || "[ANO]"}\n\n` +
      `Senhor(a) Gerente,\n\n` +
      `Encaminho, para análise e aprovação, a prestação de contas referente aos recursos do ` +
      `Programa Dinheiro Direto na Escola (PDDE), exercício ${v.exercicio || "[ANO]"}, ` +
      `da unidade escolar ${v.escola || "[NOME DA UNIDADE ESCOLAR]"}, CNPJ ${v.cnpj || "[CNPJ]"}, ` +
      `conforme documentação acostada aos autos.\n\n` +
      `Atenciosamente,\n\n` +
      `${v.diretor || "[NOME DO(A) DIRETOR(A)]"}\n` +
      `Matrícula: ${v.matricula || "[MATRÍCULA]"}\n` +
      `Diretor(a) da unidade escolar ${v.escola || "[NOME DA UNIDADE ESCOLAR]"}`,
  },
  {
    id: "despacho",
    title: "Despacho de Conferência",
    description: "Despacho padrão da GAD para conferência de documentos",
    fields: [
      { key: "processo", label: "Nº do Processo SEI", placeholder: "SEI-000000/000000/2025" },
      { key: "escola", label: "Nome da Unidade Escolar", placeholder: "E.M. João da Silva" },
      { key: "exercicio", label: "Exercício Financeiro", placeholder: "2025" },
      { key: "servidor", label: "Nome do Servidor GAD", placeholder: "Carlos Souza" },
    ],
    generate: (v) =>
      `DESPACHO\n\n` +
      `Processo: ${v.processo || "[Nº PROCESSO SEI]"}\n` +
      `Assunto: Prestação de Contas PDDE — ${v.escola || "[UNIDADE ESCOLAR]"} — Exercício ${v.exercicio || "[ANO]"}\n\n` +
      `Trata-se de prestação de contas dos recursos do PDDE, exercício ${v.exercicio || "[ANO]"}, ` +
      `encaminhada pela unidade escolar ${v.escola || "[UNIDADE ESCOLAR]"}.\n\n` +
      `Após análise da documentação constante nos autos, verificou-se que:\n\n` +
      `( ) A prestação de contas está REGULAR, com os documentos essenciais apresentados e sem inconsistência aparente em relação aos registros federais aplicáveis.\n` +
      `( ) A prestação de contas apresenta PENDÊNCIA(S), conforme apontamentos abaixo.\n\n` +
      `Observações:\n` +
      `_______________________________________________\n\n` +
      `${v.servidor || "[NOME DO SERVIDOR]"}\n` +
      `Gerência de Administração — GAD\n` +
      `4ª Coordenadoria Regional de Educação`,
  },
  {
    id: "termo-doacao",
    title: "Termo de Doação (Bens de Capital)",
    description: "Minuta de apoio para doação de bens móveis permanentes adquiridos pelo CEC; conferir com o modelo institucional vigente antes da utilização.",
    fields: [
      { key: "escola", label: "Nome da Unidade Escolar", placeholder: "E.M. João da Silva" },
      { key: "cnpj", label: "CNPJ da UEx", placeholder: "00.000.000/0001-00" },
      { key: "exercicio", label: "Exercício Financeiro", placeholder: "2025" },
      { key: "diretor", label: "Nome do(a) Diretor(a)", placeholder: "Maria Oliveira" },
      { key: "matricula", label: "Matrícula", placeholder: "12/345.678-9" },
      { key: "notaFiscal", label: "Nº da Nota Fiscal", placeholder: "1234" },
      { key: "dataNota", label: "Data de Emissão da NF", placeholder: "29/08/2025" },
      { key: "fornecedor", label: "Fornecedor / Razão Social", placeholder: "Kalunga S.A." },
      { key: "descricaoBem", label: "Descrição Detalhada do Bem", placeholder: "05 computadores marca X, modelo Y" },
      { key: "valorTotal", label: "Valor Total (R$)", placeholder: "15.000,00" },
    ],
    generate: (v) =>
      `TERMO DE DOAÇÃO DE BENS MÓVEIS\n\n` +
      `Pelo presente instrumento, o CONSELHO ESCOLA COMUNIDADE (CEC) da unidade escolar ${v.escola || "[NOME DA UNIDADE ESCOLAR]"}, ` +
      `CNPJ: ${v.cnpj || "[CNPJ]"}, neste ato representado por seu Diretor Executivo ${v.diretor || "[NOME DO(A) DIRETOR(A)]"}, ` +
      `matrícula: ${v.matricula || "[MATRÍCULA]"}, resolve DOAR à Secretaria Municipal de Educação do Rio de Janeiro (SME/RJ), ` +
      `para incorporação ao patrimônio público municipal e uso exclusivo da referida unidade de ensino, os bens patrimoniais abaixo descritos, ` +
      `adquiridos com recursos do Programa Dinheiro Direto na Escola (PDDE) — Exercício ${v.exercicio || "[ANO]"}, conforme Nota(s) Fiscal(is) nº ` +
      `${v.notaFiscal || "[NÚMERO DA NF-e]"} emitida em ${v.dataNota || "[DATA]"} por ${v.fornecedor || "[FORNECEDOR]"}:\n\n` +
      `1. Especificação do(s) bem(ns):\n` +
      `   - Descrição: ${v.descricaoBem || "[DESCRIÇÃO COMPLETA DOS BENS E MARCA]"}\n` +
      `   - Valor Total da Doação: R$ ${v.valorTotal || "[VALOR TOTAL]"}\n\n` +
      `Os bens acima mencionados foram recebidos em perfeitas condições de uso e funcionamento e passam a integrar o acervo patrimonial ` +
      `do Município do Rio de Janeiro, sob a responsabilidade e guarda desta Unidade Escolar.\n\n` +
      `Rio de Janeiro, [DATA]\n\n` +
      `______________________________________________\n` +
      `${v.diretor || "[NOME DO(A) DIRETOR(A)]"}\n` +
      `Diretor(a) Executivo(a) do CEC`,
  },
];

const loadSavedValues = (): Record<string, Record<string, string>> => {
  try {
    return readStorageJson(PDDE_STORAGE_KEYS.templates, {});
  } catch {
    return {};
  }
};

const getWorkspaceTemplateDefaults = (templateId: string, workspace: ProcessWorkspaceProfile) => {
  switch (templateId) {
    case "oficio":
      return {
        escola: workspace.schoolName,
        cnpj: workspace.uexCnpj,
        exercicio: workspace.exercise,
        diretor: workspace.responsibleName,
      };
    case "despacho":
      return {
        processo: workspace.seiProcessNumber,
        escola: workspace.schoolName,
        exercicio: workspace.exercise,
        servidor: workspace.responsibleName,
      };
    case "termo-doacao":
      return {
        escola: workspace.schoolName,
        cnpj: workspace.uexCnpj,
        exercicio: workspace.exercise,
        diretor: workspace.responsibleName,
      };
    default:
      return {};
  }
};

export const SmartTemplates = () => {
  const [savedValues] = useState(loadSavedValues);
  const [values, setValues] = useState<Record<string, Record<string, string>>>(savedValues);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<ProcessWorkspaceProfile>(() =>
    sanitizeWorkspaceProfile(readStorageJson(PDDE_STORAGE_KEYS.workspace, emptyProcessWorkspaceProfile())),
  );
  const { copiedValue: copiedId, copyText: copyTemplateToClipboard } = useClipboardAction<string>();

  useEffect(() => {
    const syncWorkspace = () =>
      setWorkspace(sanitizeWorkspaceProfile(readStorageJson(PDDE_STORAGE_KEYS.workspace, emptyProcessWorkspaceProfile())));

    const handleCustomSync = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (detail?.key === PDDE_STORAGE_KEYS.workspace) {
        syncWorkspace();
      }
    };

    window.addEventListener(PDDE_STORAGE_EVENT, handleCustomSync as EventListener);
    window.addEventListener("storage", syncWorkspace);

    return () => {
      window.removeEventListener(PDDE_STORAGE_EVENT, handleCustomSync as EventListener);
      window.removeEventListener("storage", syncWorkspace);
    };
  }, []);

  const resolveTemplateValues = useCallback(
    (templateId: string) => ({
      ...getWorkspaceTemplateDefaults(templateId, workspace),
      ...(values[templateId] || {}),
    }),
    [values, workspace],
  );

  const updateField = useCallback((templateId: string, key: string, value: string) => {
    setValues(prev => {
      const next = {
        ...prev,
        [templateId]: { ...prev[templateId], [key]: value },
      };
      writeStorageJson(PDDE_STORAGE_KEYS.templates, next);
      return next;
    });
  }, []);

  const resetTemplate = useCallback((templateId: string) => {
    setValues(prev => {
      const next = { ...prev };
      delete next[templateId];
      writeStorageJson(PDDE_STORAGE_KEYS.templates, next);
      return next;
    });
    toast.success("Campos limpos");
  }, []);

  const copyText = useCallback((template: Template) => {
    const text = template.generate(resolveTemplateValues(template.id));
    void copyTemplateToClipboard(template.id, text).then((didCopy) => {
      if (didCopy) {
        toast.success("Texto copiado para a área de transferência!");
        return;
      }

      toast.error("Erro ao copiar texto.");
    });
  }, [copyTemplateToClipboard, resolveTemplateValues]);

  return (
    <div className="section-card border-l-[3px] border-l-accent/75 smart-templates">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-accent/10">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="font-bold text-foreground text-base sm:text-lg">
            Modelos de texto de apoio
          </h2>
          <p className="text-xs text-muted-foreground">Preencha os campos necessários, visualize o texto e copie a minuta para uso no processo.</p>
        </div>
      </div>

      <div className="space-y-4">
        {templates.map(template => {
          const isActive = activeTemplate === template.id;
          const templateValues = values[template.id] || {};
          const effectiveValues = resolveTemplateValues(template.id);
          const isPreviewing = showPreview === template.id;

          return (
            <div
              key={template.id}
              className="overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/15 hover:shadow-soft"
            >
              {/* Header */}
              <button
                onClick={() => setActiveTemplate(isActive ? null : template.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden"
                aria-expanded={isActive}
              >
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{template.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{template.description}</p>
                </div>
                <span className={`text-muted-foreground transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {/* Body */}
              {isActive && (
                <div className="px-4 pb-4 pt-1 border-t border-border/40 animate-fade-in">
                  {/* Fields */}
                  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {template.fields.map(field => (
                      <div key={field.key}>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                          {field.label}
                        </label>
                        <input
                          type={field.type || "text"}
                          value={templateValues[field.key] || ""}
                          onChange={e => updateField(template.id, field.key, e.target.value)}
                          placeholder={(effectiveValues[field.key] as string) || field.placeholder}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border/60 bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all outline-hidden placeholder:text-muted-foreground/50"
                        />
                      </div>
                    ))}
                  </div>

                  {Object.values(getWorkspaceTemplateDefaults(template.id, workspace)).some(Boolean) && (
                    <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                      Se houver informações já registradas neste equipamento, os campos em branco poderão ser aproveitados automaticamente como referência.
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowPreview(isPreviewing ? null : template.id)}
                            className="gap-1.5 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            {isPreviewing ? "Ocultar" : "Visualizar"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Preview do texto gerado</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button
                      size="sm"
                      onClick={() => copyText(template)}
                      className="gap-1.5 text-xs"
                    >
                      {copiedId === template.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedId === template.id ? "Copiado!" : "Copiar texto"}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => resetTemplate(template.id)}
                      className="gap-1.5 text-xs text-muted-foreground"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Limpar
                    </Button>
                  </div>

                  {/* Preview */}
                  {isPreviewing && (
                    <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border/40 animate-fade-in">
                      <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                        {template.generate(effectiveValues)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
