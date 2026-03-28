import { useMemo } from "react";
import { CheckCircle2, Copy, Download, MessageSquareShare, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import {
  buildOperationalReport,
  buildOperationalTextBundle,
  buildSubmissionSubjectLine,
  operationalStatusCopy,
} from "@/lib/pddeOperationalData";
import { useOperationalSnapshot } from "@/hooks/useOperationalSnapshot";

const downloadTextFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
};

export const OperationalSharePack = () => {
  const snapshot = useOperationalSnapshot();
  const report = useMemo(() => buildOperationalReport(snapshot), [snapshot]);
  const statusCopy = operationalStatusCopy[report.status];
  const textBundle = useMemo(() => buildOperationalTextBundle(snapshot, report), [report, snapshot]);
  const subjectLine = useMemo(() => buildSubmissionSubjectLine(snapshot.workspace), [snapshot.workspace]);

  const copyText = async (content: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(successMessage);
    } catch {
      toast.error("Não foi possível copiar o conteúdo.");
    }
  };

  const downloadSharePack = () => {
    const fileName = textBundle.fileName.replace("PDDE_DIAGNOSTICO_GAD", "PDDE_RESUMO_OPERACIONAL");
    const content = [
      subjectLine,
      "",
      textBundle.shareSummary,
      "",
      "Diagnóstico completo",
      textBundle.diagnostic,
    ].join("\n");

    downloadTextFile(content, fileName);
    toast.success("Resumo compartilhável baixado em .txt.");
  };

  return (
    <section
      id={GUIDE_ANCHORS.sharePack}
      aria-labelledby="resumo-compartilhavel-conferencia"
      className="scroll-mt-28 section-card border-l-4 border-l-primary/70 bg-linear-to-br from-background via-background to-primary/6"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Resumo compartilhável</span>
          <div className="space-y-2">
            <h2
              id="resumo-compartilhavel-conferencia"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Gere um handoff claro da conferência
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Este bloco monta um resumo curto para e-mail, WhatsApp ou passagem interna de tarefa, sem
              perder a trilha do diagnóstico completo.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {statusCopy.badge}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div className="rounded-[1.5rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-xs">
              <MessageSquareShare className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Resumo curto
              </p>
              <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                Ideal para repassar o estado do processo sem anexar o relatório inteiro. O texto já sai com
                situação, processo, próxima ação e travas remanescentes.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[1.35rem] border border-border/60 bg-background px-4 py-4">
            <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed text-foreground/85">
              {textBundle.shareSummary}
            </pre>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <button
              type="button"
              onClick={() => void copyText(textBundle.shareSummary, "Resumo curto copiado.")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Copy className="h-4 w-4" />
              Copiar resumo curto
            </button>

            <button
              type="button"
              onClick={() => void copyText(textBundle.diagnostic, "Diagnóstico completo copiado.")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Copy className="h-4 w-4" />
              Copiar diagnóstico completo
            </button>

            <button
              type="button"
              onClick={downloadSharePack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Download className="h-4 w-4" />
              Baixar pacote .txt
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Assunto sugerido
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">{subjectLine}</p>
            <button
              type="button"
              onClick={() => void copyText(subjectLine, "Assunto sugerido copiado.")}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 px-3.5 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <SendHorizontal className="h-3.5 w-3.5" />
              Copiar assunto
            </button>
          </div>

          <div className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Quando usar
            </p>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Para repassar o processo entre quem monta, confere e despacha.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Para registrar o estado atual antes de trocar de computador ou encerrar o dia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Para mandar um panorama rápido sem perder o diagnóstico detalhado do caso.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
