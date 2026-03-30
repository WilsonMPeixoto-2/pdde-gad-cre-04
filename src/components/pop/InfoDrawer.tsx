import React, { ReactNode } from "react";
import { HelpCircle, FileDigit, ScanLine, PenLine, ShieldCheck, FileCheck, LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signatureActionExamples } from "@/lib/guideContent";

interface InfoDrawerProps {
  trigger?: ReactNode;
  triggerLabel?: string;
  title: string;
  children: ReactNode;
}

export const InfoDrawer = React.forwardRef<HTMLDivElement, InfoDrawerProps>(
  ({ trigger, triggerLabel = "Entenda a Regra", title, children }, ref) => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          {trigger || (
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/15 rounded-full transition-all duration-200 border border-primary/20 hover:border-primary/30 group">
              <HelpCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>{triggerLabel}</span>
            </button>
          )}
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-md overflow-y-auto bg-linear-to-b from-background to-secondary/20"
        >
          <SheetHeader className="pb-4 border-b border-border/50">
            <SheetTitle className="text-xl font-heading flex items-center gap-2.5 tracking-tight">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              {title}
            </SheetTitle>
            <SheetDescription>
              Painel de apoio com contexto complementar para a etapa atual do POP.
            </SheetDescription>
          </SheetHeader>
          <div ref={ref} className="mt-6 space-y-6">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
);

InfoDrawer.displayName = "InfoDrawer";

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
      Entender essa distinção evita dois erros comuns no SEI!RIO: autenticar arquivo que já é original eletrônico e tratar como nato-digital um documento que, na verdade, veio do papel.
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
      description="Criado originalmente em meio eletrônico. Quando a peça puder ser produzida no SEI!RIO e precisar de assinatura da própria unidade, a preferência é elaborá-la no sistema para assinatura eletrônica."
      variant="primary"
    />

    <InfoBlock
      icon={ScanLine}
      title="Documento Digitalizado"
      description="Documento originalmente em papel, assinado ou carimbado fisicamente, que foi escaneado e transformado em PDF. Ao ser inserido no processo, exige autenticação administrativa para declarar que confere com o original."
      variant="success"
    />

    <InfoQuote
      text="Considera-se documento nato-digital o documento produzido originariamente em meio eletrônico e documento digitalizado aquele obtido a partir da conversão de um documento não digital."
      source="Decreto nº 8.539/2015, art. 2º, II"
    />

    <InfoQuote
      text="Apenas os documentos produzidos no sistema poderão ser assinados eletronicamente no SEI.Rio."
      source="Decreto Rio nº 57.250/2025, art. 26, § 2º"
    />

    <InfoHighlight variant="warning">
      Documento em papel digitalizado = anexar e autenticar | Documento nato-digital = anexar como original
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
      description="Usada para documento externo digitalizado. Atesta que a cópia digital confere com o original físico mantido pela unidade. Ícone: selo preto com check."
      variant="success"
    />

    <div className="p-4 bg-card rounded-xl border border-border/50">
      <h4 className="font-semibold text-foreground mb-3">Uso adequado de cada procedimento</h4>
      <div className="space-y-2 text-sm">
        {signatureActionExamples.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <FileCheck className={`w-4 h-4 ${item.tone === "signature" ? "text-primary" : "text-success"}`} />
            <span className="text-foreground"><strong>{item.label}:</strong> {item.action}</span>
          </div>
        ))}
      </div>
    </div>

    <InfoHighlight variant="info">
      Documento interno do SEI = assinatura | Documento externo digitalizado = autenticação | Documento externo nato-digital = juntada como original
    </InfoHighlight>
  </>
);

export const NaturezasDespesaContent = () => (
  <>
    <p className="text-muted-foreground text-sm leading-relaxed">
      O PDDE divide os recursos em duas categorias principais de despesa.
    </p>

    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow-md">
            Custeio
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Exemplos:</strong> Material de consumo, pequenos reparos, manutenção, serviços de terceiros, material pedagógico.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-success/10 border border-success/30">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-success text-success-foreground font-bold shadow-md">
            Capital
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Exemplos:</strong> Equipamentos, mobiliário e outros bens permanentes sujeitos a incorporação/controle patrimonial.
        </p>
      </div>
    </div>

    <InfoHighlight variant="warning">
      Verifique sempre o enquadramento correto antes de registrar a despesa! Consulte as orientações do FNDE.
    </InfoHighlight>
  </>
);
