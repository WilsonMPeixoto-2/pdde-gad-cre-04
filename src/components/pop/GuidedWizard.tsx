import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, AlertTriangle, FileText, X, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WizardStep {
  id: string;
  number: number;
  title: string;
  description: string;
  whatToDo: string[];
  documents: string[];
  commonErrors: string[];
  nextStep: string;
  sectionAnchor: string;
}

const steps: WizardStep[] = [
  {
    id: "abertura",
    number: 1,
    title: "Abertura do Processo",
    description: "Criar o NUP no SEI!RIO e configurar o tipo de processo correto.",
    whatToDo: [
      "Acessar o SEI!RIO com login institucional",
      "Clicar em 'Iniciar Processo'",
      "Selecionar tipo: 'EXECUÇÃO FINANCEIRA: PROGRAMA DINHEIRO DIRETO NA ESCOLA - PDDE'",
      "Preencher os dados obrigatórios (especificação, interessados, nível de acesso)",
    ],
    documents: ["Despacho de encaminhamento"],
    commonErrors: [
      "Selecionar tipo de processo errado (ex.: 'Devolução' em vez de 'Execução Financeira')",
      "Esquecer de adicionar a escola como interessada",
      "Nível de acesso incorreto (deve ser Público)",
    ],
    nextStep: "Instrução processual com inclusão de documentos",
    sectionAnchor: "secao-1",
  },
  {
    id: "instrucao",
    number: 2,
    title: "Instrução Processual",
    description: "Reunir e organizar todos os documentos exigidos para a prestação de contas.",
    whatToDo: [
      "Verificar o checklist mínimo (Resolução CD/FNDE nº 15/2021)",
      "Reunir extratos bancários, notas fiscais, atas e demonstrativos",
      "Organizar documentos na ordem correta",
      "Conferir se todas as NFs possuem atesto de recebimento",
    ],
    documents: [
      "Consolidação de pesquisas de preços (mín. 3 cotações)",
      "Demonstrativo de execução (SiGPC/Contas Online)",
      "Extratos bancários (conta corrente + aplicação)",
      "Notas fiscais / DANFe / cupons fiscais",
      "Atas do Conselho Escolar / CEC",
    ],
    commonErrors: [
      "Falta de pesquisa de preços com 3 cotações",
      "Extratos incompletos (não cobrem o exercício inteiro)",
      "NF sem atesto de recebimento ou sem carimbo da escola",
    ],
    nextStep: "Inclusão dos documentos externos no SEI!RIO",
    sectionAnchor: "secao-2",
  },
  {
    id: "inclusao",
    number: 3,
    title: "Inclusão de Documentos Externos",
    description: "Incluir no SEI!RIO os documentos digitalizados e nato-digitais.",
    whatToDo: [
      "No processo, clicar em 'Incluir Documento'",
      "Selecionar 'Documento Externo'",
      "Preencher tipo, data, número e nome na árvore",
      "Fazer upload do arquivo (PDF, máximo 100MB)",
      "Repetir para cada documento",
    ],
    documents: [
      "Todos os documentos reunidos na etapa anterior",
      "Documentos digitalizados em PDF (resolução mínima legível)",
    ],
    commonErrors: [
      "Confundir 'documento externo' com 'gerar documento'",
      "Upload de arquivo corrompido ou ilegível",
      "Nome na árvore genérico (usar nome descritivo)",
      "Esquecer de classificar como nato digital vs digitalizado",
    ],
    nextStep: "Autenticação dos documentos",
    sectionAnchor: "secao-3",
  },
  {
    id: "autenticacao",
    number: 4,
    title: "Autenticação de Documentos",
    description: "Autenticar documentos digitalizados para garantir fé pública no SEI!RIO.",
    whatToDo: [
      "Selecionar o documento na árvore do processo",
      "Clicar no ícone 'Autenticar Documento'",
      "Para digitalizados: usar 'Autenticação' com menção 'CONFERE COM O ORIGINAL'",
      "Assinar eletronicamente cada autenticação",
    ],
    documents: [
      "Todos os documentos digitalizados já incluídos",
    ],
    commonErrors: [
      "Não autenticar documentos digitalizados",
      "Autenticar documento nato-digital (desnecessário)",
      "Esquecer de manter os originais arquivados na UEx",
    ],
    nextStep: "Criação do bloco de assinatura",
    sectionAnchor: "secao-4",
  },
  {
    id: "assinatura",
    number: 5,
    title: "Bloco de Assinatura",
    description: "Criar bloco de assinatura e disponibilizar para assinatura da direção.",
    whatToDo: [
      "Criar 'Bloco de Assinatura' no processo",
      "Incluir todos os documentos que precisam de assinatura",
      "Disponibilizar o bloco para a unidade escolar",
      "Acompanhar assinaturas pendentes",
    ],
    documents: [
      "Despachos e documentos internos gerados no SEI",
    ],
    commonErrors: [
      "Não incluir todos os documentos no bloco",
      "Disponibilizar para a unidade errada",
      "Não acompanhar se todas as assinaturas foram concluídas",
    ],
    nextStep: "Despacho e finalização",
    sectionAnchor: "secao-5",
  },
  {
    id: "finalizacao",
    number: 6,
    title: "Despacho e Finalização",
    description: "Criar despacho final e tramitar o processo para a GAD/4ª CRE.",
    whatToDo: [
      "Criar documento de despacho de encaminhamento",
      "Referenciar todos os documentos incluídos",
      "Assinar o despacho eletronicamente",
      "Tramitar o processo para a GAD/4ª CRE (enviar processo)",
    ],
    documents: [
      "Despacho de encaminhamento à GAD",
    ],
    commonErrors: [
      "Enviar processo sem todas as assinaturas",
      "Tramitar para setor errado",
      "Não referenciar documentos no despacho",
      "Esquecer de registrar no SiGPC/Contas Online",
    ],
    nextStep: "Aguardar análise da GAD/4ª CRE",
    sectionAnchor: "secao-6",
  },
];

const WIZARD_STORAGE_KEY = "pdde-wizard-progress-v1";

export const GuidedWizard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch {
          return new Set();
        }
      }
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify([...completedSteps]));
  }, [completedSteps]);

  const toggleStepComplete = useCallback((stepIndex: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepIndex)) {
        next.delete(stepIndex);
      } else {
        next.add(stepIndex);
      }
      return next;
    });
  }, []);

  const goToSection = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const heading = el.querySelector('h2, h3') as HTMLElement;
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        setTimeout(() => heading.focus({ preventScroll: true }), 600);
      }
    }
  };

  const step = steps[currentStep];
  const completedCount = completedSteps.size;
  const progressPercent = (completedCount / steps.length) * 100;

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-40 no-print sm:bottom-auto sm:top-24 sm:left-auto sm:right-6">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-xl gap-2 px-5 py-3 h-auto text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)',
            boxShadow: '0 8px 32px -4px hsl(var(--primary) / 0.4)',
          }}
          aria-label="Abrir modo guiado da prestação de contas"
        >
          <Compass className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Modo Guiado</span>
          {completedCount > 0 && (
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              {completedCount}/{steps.length}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-4 sm:inset-auto sm:right-6 sm:top-24 sm:w-[420px] z-50 no-print">
      <div className="rounded-2xl border border-border/60 shadow-2xl overflow-hidden" style={{
        background: 'hsl(var(--card))',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40" style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 100%)'
        }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)',
            }}>
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground text-sm">Modo Guiado</h3>
              <p className="text-xs text-muted-foreground">{completedCount} de {steps.length} etapas concluídas</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Minimizar modo guiado"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="px-4 pt-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between px-4 py-3 gap-1">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                i === currentStep
                  ? "bg-primary text-primary-foreground shadow-md"
                  : completedSteps.has(i)
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
              aria-label={`Etapa ${i + 1}: ${s.title}${completedSteps.has(i) ? ' (concluída)' : ''}`}
              aria-current={i === currentStep ? 'step' : undefined}
            >
              {completedSteps.has(i) ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-4 pb-4 max-h-[50vh] overflow-y-auto scrollbar-thin">
          <h4 className="font-heading font-bold text-foreground text-base mb-1">
            {step.number}. {step.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

          {/* What to do */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">O que fazer agora</p>
            <ul className="space-y-1.5">
              {step.whatToDo.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Documentos envolvidos</p>
            <ul className="space-y-1">
              {step.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/60" aria-hidden="true" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Errors */}
          <div className="mb-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              Erros comuns
            </p>
            <ul className="space-y-1">
              {step.commonErrors.map((err, i) => (
                <li key={i} className="text-xs text-destructive/80 flex items-start gap-1.5">
                  <span className="shrink-0 mt-0.5">•</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next step preview */}
          <div className="p-2.5 rounded-lg bg-muted/50 border border-border/30">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Próximo passo:</strong> {step.nextStep}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between p-4 border-t border-border/40 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="gap-1 text-xs"
            aria-label="Etapa anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Anterior
          </Button>

          <Button
            variant={completedSteps.has(currentStep) ? "outline" : "default"}
            size="sm"
            onClick={() => toggleStepComplete(currentStep)}
            className={cn("gap-1.5 text-xs", completedSteps.has(currentStep) && "text-success border-success/30")}
            aria-pressed={completedSteps.has(currentStep)}
          >
            {completedSteps.has(currentStep) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Concluída
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5" />
                Marcar concluída
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              }
              goToSection(step.sectionAnchor);
            }}
            className="gap-1 text-xs"
            aria-label={currentStep < steps.length - 1 ? "Próxima etapa" : "Ir para seção"}
          >
            {currentStep < steps.length - 1 ? "Próxima" : "Ver seção"}
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
