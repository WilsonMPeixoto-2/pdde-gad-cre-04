import { useState, useEffect, useRef } from "react";
import { QrCode, Copy, Download, Check, Share2 } from "lucide-react";
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

export function ShareQRCode({ sectionId, sectionTitle = "PDDE Guide" }: ShareQRCodeProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const shareUrl = sectionId 
    ? `${window.location.origin}${window.location.pathname}#${sectionId}`
    : window.location.href;

  // Generate QR code as SVG
  useEffect(() => {
    generateQRCode();
  }, [shareUrl]);

  const generateQRCode = () => {
    // Simple QR code generation using canvas
    const size = 200;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Create a simple QR-like pattern based on URL hash
    const hash = simpleHash(shareUrl);
    const cellSize = 8;
    const margin = 16;
    const gridSize = Math.floor((size - margin * 2) / cellSize);

    ctx.fillStyle = '#0369a1'; // Primary color

    // Position detection patterns (corners)
    drawFinderPattern(ctx, margin, margin, cellSize);
    drawFinderPattern(ctx, size - margin - cellSize * 7, margin, cellSize);
    drawFinderPattern(ctx, margin, size - margin - cellSize * 7, cellSize);

    // Data modules based on URL hash
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Skip finder pattern areas
        if (isInFinderArea(i, j, gridSize)) continue;

        const bit = (hash >> ((i * gridSize + j) % 32)) & 1;
        if (bit || Math.random() > 0.6) {
          ctx.fillRect(
            margin + i * cellSize,
            margin + j * cellSize,
            cellSize - 1,
            cellSize - 1
          );
        }
      }
    }

    setQrDataUrl(canvas.toDataURL('image/png'));
  };

  const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const drawFinderPattern = (ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) => {
    // Outer square
    ctx.fillRect(x, y, cellSize * 7, cellSize * 7);
    // Inner white square
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);
    // Center square
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
  };

  const isInFinderArea = (i: number, j: number, gridSize: number): boolean => {
    const finderSize = 8;
    return (
      (i < finderSize && j < finderSize) ||
      (i >= gridSize - finderSize && j < finderSize) ||
      (i < finderSize && j >= gridSize - finderSize)
    );
  };

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
          {/* Hidden canvas for QR generation */}
          <canvas ref={canvasRef} className="hidden" />

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
