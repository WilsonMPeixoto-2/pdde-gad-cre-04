export const pdfAssetManifest = {
  "CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf": {
    bytes: 108927,
    href: "/models/CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    sizeLabel: "106.4 KB",
  },
  "DEMONSTRATIVO_DE_DESPESA.pdf": {
    bytes: 88067,
    href: "/models/DEMONSTRATIVO_DE_DESPESA.pdf",
    sizeLabel: "86.0 KB",
  },
  "EXTRATO_APLICACAO.pdf": {
    bytes: 908589,
    href: "/models/EXTRATO_APLICACAO.pdf",
    sizeLabel: "887.3 KB",
  },
  "EXTRATO_CONTA_CORRENTE.pdf": {
    bytes: 1471185,
    href: "/models/EXTRATO_CONTA_CORRENTE.pdf",
    sizeLabel: "1.4 MB",
  },
  "MODELO_DE_OFICIO_PDDE.pdf": {
    bytes: 2542,
    href: "/models/MODELO_DE_OFICIO_PDDE.pdf",
    sizeLabel: "2.5 KB",
  },
  "NOTA_FISCAL_ELETRONICA_DANFE.pdf": {
    bytes: 1615315,
    href: "/models/NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    sizeLabel: "1.5 MB",
  },
  "PARECER_DO_CONSELHO.pdf": {
    bytes: 267193,
    href: "/models/PARECER_DO_CONSELHO.pdf",
    sizeLabel: "260.9 KB",
  },
  "PLANEJAMENTO_COM_ATA.pdf": {
    bytes: 761700,
    href: "/models/PLANEJAMENTO_COM_ATA.pdf",
    sizeLabel: "743.8 KB",
  },
} as const;

export type PdfAssetKey = keyof typeof pdfAssetManifest;
