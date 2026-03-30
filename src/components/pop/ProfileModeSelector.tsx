import { School, ShieldCheck } from "lucide-react";
import { useProfileMode, ProfileMode } from "@/contexts/ProfileModeContext";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const modes: { value: ProfileMode; label: string; shortLabel: string; icon: typeof School; description: string }[] = [
  {
    value: "diretor",
    label: "Diretor(a) / Unidade Escolar",
    shortLabel: "Unidade Escolar",
    icon: School,
    description: "Foco em ações da unidade escolar, checklist e modelos",
  },
  {
    value: "gad",
    label: "GAD / CRE",
    shortLabel: "GAD",
    icon: ShieldCheck,
    description: "Foco em conferência, rastreabilidade e controle interno",
  },
];

export const ProfileModeSelector = () => {
  const { mode, setMode } = useProfileMode();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border/40 bg-background/70 p-1 shadow-xs backdrop-blur-sm">
      {modes.map((m) => {
        const isActive = mode === m.value;
        return (
          <Tooltip key={m.value}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setMode(m.value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-200",
                  isActive
                    ? "bg-background text-foreground shadow-xs border border-border/60"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
                aria-pressed={isActive}
                aria-label={`Modo ${m.label}`}
              >
                <m.icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{m.shortLabel}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px]">
              <p className="font-semibold text-xs">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
