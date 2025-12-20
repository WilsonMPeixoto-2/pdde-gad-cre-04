import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const CopyButton = ({ text, label = "Copiado!", className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(label, {
        duration: 2000,
        position: "bottom-center",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Erro ao copiar");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-lg hover:bg-primary/10 transition-colors ${className}`}
      title="Copiar para área de transferência"
    >
      {copied ? (
        <Check className="w-4 h-4 text-success" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground hover:text-primary" />
      )}
    </button>
  );
};
