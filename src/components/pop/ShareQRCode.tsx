import { useEffect, useState } from "react";
import { QrCode, Copy, Download, Check, Share2 } from "lucide-react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ShareQRCodeProps {
  sectionId?: string;
  sectionTitle?: string;
}

export function ShareQRCode({ sectionId, sectionTitle = "POP PDDE no SEI!RIO" }: ShareQRCodeProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const shareUrl = sectionId 
    ? `${window.location.origin}${window.location.pathname}#${sectionId}`
    : window.location.href;

  useEffect(() => {
    let isActive = true;

    QRCode.toDataURL(shareUrl, {
      width: 240,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#0369a1",
        light: "#ffffff",
      },
    })
      .then((dataUrl) => {
        if (isActive) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (isActive) {
          setQrDataUrl("");
          toast.error("Nao foi possivel gerar o QR Code.");
        }
      });

    return () => {
      isActive = false;
    };
  }, [shareUrl]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar link");
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = `qr-pdde-${sectionId || 'guia'}.png`;
    link.href = qrDataUrl;
    link.click();
    toast.success("QR Code baixado!");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sectionTitle,
          text: `Confira: ${sectionTitle}`,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error("Erro ao compartilhar");
        }
      }
    } else {
      copyLink();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          aria-label="Compartilhar via QR Code"
        >
          <QrCode className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Compartilhar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" aria-hidden="true" />
            Compartilhar
          </DialogTitle>
          <DialogDescription>
            {sectionTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* QR Code display */}
          <div className="p-4 bg-white rounded-xl shadow-md">
            {qrDataUrl ? (
              <img 
                src={qrDataUrl} 
                alt="QR Code para compartilhar"
                className="w-48 h-48"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-muted rounded">
                <QrCode className="h-12 w-12 text-muted-foreground animate-pulse" />
              </div>
            )}
          </div>

          {/* URL display */}
          <div className="w-full p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground truncate font-mono">
              {shareUrl}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={copyLink}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copiado!" : "Copiar Link"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={downloadQR}
            >
              <Download className="h-4 w-4" />
              Baixar QR
            </Button>
          </div>

          {navigator.share && (
            <Button
              className="w-full gap-2 btn-premium"
              onClick={shareNative}
            >
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
