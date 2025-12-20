import { HelpCircle, FileDigit, ScanLine, PenLine, ShieldCheck, FileCheck, LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface InfoDrawerProps {
  trigger?: ReactNode;
  triggerLabel?: string;
  title: string;
  children: ReactNode;
}

export const InfoDrawer = ({ trigger, triggerLabel = "Entenda a Regra", title, children }: InfoDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-all duration-200 border border-primary/20 hover:border-primary/30 group">
            <HelpCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>{triggerLabel}</span>
          </button>
        )}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md overflow-y-auto bg-gradient-to-b from-background to-secondary/20"
      >
        <SheetHeader className="pb-4 border-b border-border/50">
          <SheetTitle className="text-xl font-heading flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Pre-built content blocks for common info sections
export const InfoBlock = ({ 
  icon: Icon, 
  title, 
  description, 
  variant = "default" 
}: { 
  icon: LucideIcon;
  title: string; 
  description: string;
  variant?: "default" | "success" | "warning" | "primary";
}) => {
  const variants = {
    default: "bg-card border-border/50",
    success: "bg-success/5 border-success/30",
    warning: "bg-warning/5 border-warning/30",
    primary: "bg-primary/5 border-primary/30",
  };

  const iconVariants = {
    default: "bg-muted text-foreground",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    primary: "bg-primary/10 text-primary",
  };

  return (
    <div className={`p-4 rounded-xl border ${variants[variant]}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl shrink-0 ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const InfoVisualCompare = ({
  item1,
  item2,
}: {
  item1: { icon: LucideIcon; label: string; description: string; color: string };
  item2: { icon: LucideIcon; label: string; description: string; color: string };
}) => {
  const Icon1 = item1.icon;
  const Icon2 = item2.icon;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className={`p-4 rounded-xl text-center ${item1.color}`}>
        <div className="flex justify-center mb-3">
          <Icon1 className="w-10 h-10" />
        </div>
        <p className="font-bold text-sm mb-1">{item1.label}</p>
        <p className="text-xs text-muted-foreground">{item1.description}</p>
      </div>
      <div className={`p-4 rounded-xl text-center ${item2.color}`}>
        <div className="flex justify-center mb-3">
          <Icon2 className="w-10 h-10" />
        </div>
        <p className="font-bold text-sm mb-1">{item2.label}</p>
        <p className="text-xs text-muted-foreground">{item2.description}</p>
      </div>
    </div>
  );
};

export const InfoQuote = ({ text, source }: { text: string; source?: string }) => (
  <blockquote className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-xl">
    <p className="text-sm text-muted-foreground italic leading-relaxed">{text}</p>
    {source && <cite className="text-xs text-primary font-medium mt-2 block not-italic">{source}</cite>}
  </blockquote>
);

export const InfoHighlight = ({ children, variant = "info" }: { children: ReactNode; variant?: "info" | "warning" | "success" }) => {
  const variants = {
    info: "bg-primary/10 border-primary/30 text-primary",
    warning: "bg-warning/10 border-warning/30 text-warning",
    success: "bg-success/10 border-success/30 text-success",
  };

  return (
    <div className={`p-3 rounded-lg border text-sm font-medium ${variants[variant]}`}>
      {children}
    </div>
  );
};

// Ready-to-use drawer contents
export const NatoDigitalVsDigitalizadoContent = () => (
  <>
    <p className="text-muted-foreground text-sm leading-relaxed">
      Entender a diferença entre esses dois tipos de documento é essencial para não cometer erros no SEI!RIO.
    </p>

    <InfoVisualCompare
      item1={{
        icon: FileDigit,
        label: "Nato-Digital",
        description: "Nasceu no computador",
        color: "bg-primary/10 text-primary border border-primary/20",
      }}
      item2={{
        icon: ScanLine,
        label: "Digitalizado",
        description: "Era papel, virou PDF",
        color: "bg-success/10 text-success border border-success/20",
      }}
    />

    <InfoBlock
      icon={FileDigit}
      title="Documento Nato-Digital"
      description="Criado diretamente no computador (PDF gerado pelo sistema, e-mail, planilha). NÃO IMPRIMA para assinar. Use a assinatura eletrônica do SEI."
      variant="primary"
    />

    <InfoBlock
      icon={ScanLine}
      title="Documento Digitalizado"
      description="Documento originalmente em papel que foi escaneado e transformado em PDF. Precisa de AUTENTICAÇÃO com 'Confere com o Original'."
      variant="success"
    />

    <InfoQuote
      text="Os documentos digitais produzidos no âmbito do SEI têm sua autoria, autenticidade e integridade asseguradas mediante utilização de assinatura eletrônica. Apenas os documentos produzidos no sistema poderão ser assinados eletronicamente."
      source="DECRETO RIO N° 57.250/2025, Art. 26"
    />

    <InfoHighlight variant="warning">
      Notas fiscais em papel = Digitalizar + Autenticar
    </InfoHighlight>
  </>
);

export const AutenticacaoVsAssinaturaContent = () => (
  <>
    <p className="text-muted-foreground text-sm leading-relaxed">
      Assinatura e Autenticação são procedimentos diferentes com finalidades distintas no SEI!RIO.
    </p>

    <InfoVisualCompare
      item1={{
        icon: PenLine,
        label: "Assinatura",
        description: "Valida autoria",
        color: "bg-primary/10 text-primary border border-primary/20",
      }}
      item2={{
        icon: ShieldCheck,
        label: "Autenticação",
        description: "Confere com original",
        color: "bg-success/10 text-success border border-success/20",
      }}
    />

    <InfoBlock
      icon={PenLine}
      title="Assinatura Eletrônica"
      description="Usada para documentos INTERNOS criados no SEI (despachos, ofícios). Valida a autoria do documento. Ícone: caneta preta."
      variant="primary"
    />

    <InfoBlock
      icon={ShieldCheck}
      title="Autenticação"
      description="Usada para documentos EXTERNOS (notas fiscais, recibos). Atesta que a cópia digital confere com o original. Ícone: selo preto com check."
      variant="success"
    />

    <div className="p-4 bg-card rounded-xl border border-border/50">
      <h4 className="font-semibold text-foreground mb-3">Quando usar cada um?</h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-primary" />
          <span><strong>Despacho de Encaminhamento:</strong> Assinar</span>
        </div>
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-primary" />
          <span><strong>Demonstrativo de Despesas:</strong> Assinar</span>
        </div>
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-success" />
          <span><strong>Nota Fiscal (PDF externo):</strong> Autenticar</span>
        </div>
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-success" />
          <span><strong>Comprovante de Pagamento:</strong> Autenticar</span>
        </div>
      </div>
    </div>

    <InfoHighlight variant="info">
      Documento interno = Assinatura | Documento externo = Autenticação
    </InfoHighlight>
  </>
);

export const NaturezasDespesaContent = () => (
  <>
    <p className="text-muted-foreground text-sm leading-relaxed">
      As naturezas de despesa classificam o tipo de gasto realizado pela unidade escolar.
    </p>

    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-bold data-code shadow-md">
            441
          </span>
          <div>
            <p className="font-bold text-foreground">Material de Consumo</p>
            <p className="text-xs text-muted-foreground">Materiais que se esgotam com o uso</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Exemplos:</strong> Material de limpeza, escritório, pedagógico, gêneros alimentícios.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-success/10 border border-success/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-success text-success-foreground font-bold data-code shadow-md">
            435
          </span>
          <div>
            <p className="font-bold text-foreground">Serviços de Terceiros</p>
            <p className="text-xs text-muted-foreground">Serviços prestados por PJ</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Exemplos:</strong> Manutenção predial, serviços de jardinagem, reparos elétricos.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-accent-foreground font-bold data-code shadow-md">
            434
          </span>
          <div>
            <p className="font-bold text-foreground">Outros Serviços</p>
            <p className="text-xs text-muted-foreground">Serviços não enquadrados nas demais</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Exemplos:</strong> Serviços específicos não classificados em outras naturezas.
        </p>
      </div>
    </div>

    <InfoHighlight variant="warning">
      Verifique sempre o enquadramento correto antes de registrar a despesa!
    </InfoHighlight>
  </>
);
