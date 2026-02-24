import { useState, useCallback } from "react";
import { FileText, Copy, Check, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const STORAGE_KEY = "pdde-smart-templates-v1";

const templates: Template[] = [
  {
    id: "oficio",
    title: "Ofício de Encaminhamento",
    description: "Ofício padrão para encaminhamento da prestação de contas PDDE",
    fields: [
      { key: "escola", label: "Nome da Escola", placeholder: "E.M. João da Silva" },
      { key: "cnpj", label: "CNPJ da UEx", placeholder: "00.000.000/0001-00" },
      { key: "exercicio", label: "Exercício Financeiro", placeholder: "2024" },
      { key: "diretor", label: "Nome do(a) Diretor(a)", placeholder: "Maria Oliveira" },
      { key: "matricula", label: "Matrícula", placeholder: "12/345.678-9" },
    ],
    generate: (v) =>
      `OFÍCIO Nº ____/${v.exercicio || "____"}\n\n` +
      `${v.escola || "[NOME DA ESCOLA]"}\n` +
      `CNPJ: ${v.cnpj || "[CNPJ]"}\n\n` +
      `À Gerência de Administração — GAD\n` +
      `4ª Coordenadoria Regional de Educação\n\n` +
      `Assunto: Encaminhamento da Prestação de Contas do PDDE — Exercício ${v.exercicio || "[ANO]"}\n\n` +
      `Senhor(a) Gerente,\n\n` +
      `Encaminho, para análise e aprovação, a prestação de contas referente aos recursos do ` +
      `Programa Dinheiro Direto na Escola (PDDE), exercício ${v.exercicio || "[ANO]"}, ` +
      `da ${v.escola || "[NOME DA ESCOLA]"}, CNPJ ${v.cnpj || "[CNPJ]"}, ` +
      `conforme documentação acostada aos autos.\n\n` +
      `Atenciosamente,\n\n` +
      `${v.diretor || "[NOME DO(A) DIRETOR(A)]"}\n` +
      `Matrícula: ${v.matricula || "[MATRÍCULA]"}\n` +
      `Diretor(a) da ${v.escola || "[NOME DA ESCOLA]"}`,
  },
  {
    id: "despacho",
    title: "Despacho de Conferência",
    description: "Despacho padrão da GAD para conferência de documentos",
    fields: [
      { key: "processo", label: "Nº do Processo SEI", placeholder: "SEI-000000/000000/2024" },
      { key: "escola", label: "Nome da Escola", placeholder: "E.M. João da Silva" },
      { key: "exercicio", label: "Exercício Financeiro", placeholder: "2024" },
      { key: "servidor", label: "Nome do Servidor GAD", placeholder: "Carlos Souza" },
    ],
    generate: (v) =>
      `DESPACHO\n\n` +
      `Processo: ${v.processo || "[Nº PROCESSO SEI]"}\n` +
      `Assunto: Prestação de Contas PDDE — ${v.escola || "[ESCOLA]"} — Exercício ${v.exercicio || "[ANO]"}\n\n` +
      `Trata-se de prestação de contas dos recursos do PDDE, exercício ${v.exercicio || "[ANO]"}, ` +
      `encaminhada pela ${v.escola || "[ESCOLA]"}.\n\n` +
      `Após análise da documentação constante nos autos, verificou-se que:\n\n` +
      `( ) A prestação de contas está REGULAR e em conformidade com a Resolução CD/FNDE nº 15/2021.\n` +
      `( ) A prestação de contas apresenta PENDÊNCIA(S), conforme apontamentos abaixo.\n\n` +
      `Observações:\n` +
      `_______________________________________________\n\n` +
      `${v.servidor || "[NOME DO SERVIDOR]"}\n` +
      `Gerência de Administração — GAD\n` +
      `4ª Coordenadoria Regional de Educação`,
  },
];

const loadSavedValues = (): Record<string, Record<string, string>> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

export const SmartTemplates = () => {
  const [savedValues] = useState(loadSavedValues);
  const [values, setValues] = useState<Record<string, Record<string, string>>>(savedValues);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const updateField = useCallback((templateId: string, key: string, value: string) => {
    setValues(prev => {
      const next = {
        ...prev,
        [templateId]: { ...prev[templateId], [key]: value },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetTemplate = useCallback((templateId: string) => {
    setValues(prev => {
      const next = { ...prev };
      delete next[templateId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    toast.success("Campos limpos");
  }, []);

  const copyText = useCallback((template: Template) => {
    const text = template.generate(values[template.id] || {});
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(template.id);
      toast.success("Texto copiado para a área de transferência!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, [values]);

  return (
    <div className="section-card border-l-4 border-l-accent smart-templates">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-accent/10">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="font-bold text-foreground text-base sm:text-lg">
            Modelos com Preenchimento Rápido
          </h2>
          <p className="text-xs text-muted-foreground">Preencha, visualize e copie — seus dados ficam salvos no navegador</p>
        </div>
      </div>

      <div className="space-y-4">
        {templates.map(template => {
          const isActive = activeTemplate === template.id;
          const templateValues = values[template.id] || {};
          const isPreviewing = showPreview === template.id;

          return (
            <div
              key={template.id}
              className="rounded-xl border border-border/60 bg-card transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => setActiveTemplate(isActive ? null : template.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {template.fields.map(field => (
                      <div key={field.key}>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                          {field.label}
                        </label>
                        <input
                          type={field.type || "text"}
                          value={templateValues[field.key] || ""}
                          onChange={e => updateField(template.id, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border/60 bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all outline-none placeholder:text-muted-foreground/50"
                        />
                      </div>
                    ))}
                  </div>

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
                        {template.generate(templateValues)}
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
