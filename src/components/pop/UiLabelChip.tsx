import { cn } from "@/lib/utils";

type UiLabelChipProps = {
  children: React.ReactNode;
  tone?: "default" | "success";
  className?: string;
};

export const UiLabelChip = ({ children, tone = "default", className }: UiLabelChipProps) => {
  return (
    <span
      className={cn(
        "ui-label-chip",
        tone === "success" && "ui-label-chip--success",
        className,
      )}
    >
      {children}
    </span>
  );
};
