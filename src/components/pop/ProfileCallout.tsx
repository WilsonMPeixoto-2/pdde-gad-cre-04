import { useProfileMode, ProfileMode } from "@/contexts/ProfileModeContext";
import { Callout } from "./Callout";
import { School, ShieldCheck, LucideIcon } from "lucide-react";

interface ProfileCalloutProps {
  /** Which mode this callout is shown for */
  visibleFor: ProfileMode;
  /** Callout variant */
  variant?: "info" | "warning" | "success";
  /** Title */
  title?: string;
  /** Content */
  children: React.ReactNode;
  className?: string;
}

const modeConfig: Record<ProfileMode, { icon: LucideIcon; badge: string }> = {
  diretor: { icon: School, badge: "Dica para a Escola" },
  gad: { icon: ShieldCheck, badge: "Ponto de Atenção — GAD" },
};

export const ProfileCallout = ({ visibleFor, variant = "info", title, children, className }: ProfileCalloutProps) => {
  const { mode } = useProfileMode();

  if (mode !== visibleFor) return null;

  const config = modeConfig[visibleFor];

  return (
    <Callout variant={variant} title={title || config.badge} icon={config.icon} className={className}>
      {children}
    </Callout>
  );
};
