import { useCallback, useState } from "react";

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

const waitForPrintDomReadiness = async () => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    await waitForNextPaint();

    const hasSkeletons = document.querySelector(".skeleton-shimmer") !== null;
    const slotsReady = Array.from(
      document.querySelectorAll<HTMLElement>("[data-guide-section-slot]"),
    ).every((slot) => slot.dataset.guideSectionStatus === "ready");

    if (!hasSkeletons && slotsReady) return;
  }
};

export const useGuidePrintCoordinator = (
  activateAllDeferredSections: () => Promise<void>,
) => {
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  const handlePrint = useCallback(async () => {
    if (isPreparingPrint) return;

    const originalTitle = document.title;
    const printTitle = "PDDE_PRESTACAO_DE_CONTAS_GAD_4_CRE";

    setIsPreparingPrint(true);

    try {
      await activateAllDeferredSections();
      await document.fonts?.ready;
      await waitForPrintDomReadiness();

      document.documentElement.classList.add("print-prepared");
      document.title = printTitle;
      window.print();
    } catch (error) {
      console.error("Falha ao preparar o guia completo para impressão.", error);
    } finally {
      document.documentElement.classList.remove("print-prepared");
      document.title = originalTitle;
      setIsPreparingPrint(false);
    }
  }, [activateAllDeferredSections, isPreparingPrint]);

  return { handlePrint, isPreparingPrint };
};
