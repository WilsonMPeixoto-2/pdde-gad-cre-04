import type { PdfAssetKey } from "../../src/generated/pdfManifest.ts";

export interface PdfAuditRule {
  approvedSha256: string;
  expectedPageCount: number;
  expectedSnippets: string[];
  reviewMethod: "text-signal" | "binary-review";
  reviewSummary: string;
  reviewedAt: string;
}

export const pdfAuditCatalog: Record<PdfAssetKey, PdfAuditRule> = {
  "CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf": {
    approvedSha256: "33d7710cc436be0fe6e17624029c3ffa12fc94100b34fccc2d078ef0514c956d",
    expectedPageCount: 1,
    expectedSnippets: ["pdde basico", "apuracao das propostas", "identificacao da unidade executora propria"],
    reviewMethod: "text-signal",
    reviewSummary: "Exemplo preenchido de consolidação de cotações, com sinais textuais compatíveis com a finalidade descrita no guia.",
    reviewedAt: "2026-03-28",
  },
  "DEMONSTRATIVO_DE_DESPESA.pdf": {
    approvedSha256: "0e0a5f15a00288a20295ee41b442f1c248cac3031c180210a18a844621a5fc2e",
    expectedPageCount: 1,
    expectedSnippets: ["diretoria financeira", "prestacao de contas", "sintese da execucao da receita e da despesa"],
    reviewMethod: "text-signal",
    reviewSummary: "Referência histórica preenchida com estrutura textual compatível com demonstrativo de despesa do PDDE.",
    reviewedAt: "2026-03-28",
  },
  "EXTRATO_APLICACAO.pdf": {
    approvedSha256: "c54637038cb8e510241f36ececf312b6fb78c5537555a49859fe23d3d89a813c",
    expectedPageCount: 12,
    expectedSnippets: ["extratos - investimentos fundos - mensal", "bb rf cp automatico", "mes/ano referencia janeiro/2024"],
    reviewMethod: "text-signal",
    reviewSummary: "Extrato de aplicação financeira com sinais do Banco do Brasil e ciclo mensal coerentes com a descrição do catálogo.",
    reviewedAt: "2026-03-28",
  },
  "EXTRATO_CONTA_CORRENTE.pdf": {
    approvedSha256: "84ba6c360dd952282bd0efae2250f415e8e8063c5e1e9f782a2d89490b4d4a14",
    expectedPageCount: 12,
    expectedSnippets: ["extrato conta corrente", "banco do brasil", "conta corrente"],
    reviewMethod: "text-signal",
    reviewSummary: "Extrato de conta corrente com identificação bancária, conta específica e período anual compatíveis com o uso descrito.",
    reviewedAt: "2026-03-28",
  },
  "MODELO_DE_OFICIO_PDDE.pdf": {
    approvedSha256: "2aaa1fec1897d040fb9aa547d410da17af967fb88dc65baa53ef25c12caed4d0",
    expectedPageCount: 1,
    expectedSnippets: ["modelo de oficio de encaminhamento - pdde", "prestacao de contas do pdde", "art. 33 da resolucao"],
    reviewMethod: "text-signal",
    reviewSummary: "Modelo enxuto de ofício, coerente com o encaminhamento local e com remissão ao núcleo mínimo do art. 33 da Resolução 15/2021.",
    reviewedAt: "2026-03-28",
  },
  "NOTA_FISCAL_ELETRONICA_DANFE.pdf": {
    approvedSha256: "11b8f25275d88c6d41a746f8533d22b7ad958764444009255bb6a208be15e285",
    expectedPageCount: 5,
    expectedSnippets: ["smepro202501594v01", "8833920.84518992-5936", "processo.rio"],
    reviewMethod: "binary-review",
    reviewSummary: "Arquivo visualmente revisado como referência de DANFE anexada em processo administrativo; hash congelado para impedir substituição silenciosa do exemplo.",
    reviewedAt: "2026-03-28",
  },
  "PARECER_DO_CONSELHO.pdf": {
    approvedSha256: "3f27f01100e52a87471568e584411f41463c888233349ae25d44d6cdfc93892e",
    expectedPageCount: 1,
    expectedSnippets: ["smepro202501594v01", "8833920.84519134-7855", "processo.rio"],
    reviewMethod: "binary-review",
    reviewSummary: "Peça complementar revisada visualmente como parecer do colegiado no fluxo local; hash congelado para nova revisão sempre que o binário mudar.",
    reviewedAt: "2026-03-28",
  },
  "PLANEJAMENTO_COM_ATA.pdf": {
    approvedSha256: "1a397e48dfb4120727835f3046dd3602c522300f6d553321f92c09c62901eb57",
    expectedPageCount: 2,
    expectedSnippets: ["smepro202501594v01", "8833920.76685587-3518", "processo.rio"],
    reviewMethod: "binary-review",
    reviewSummary: "Exemplo preenchido de planejamento com ata, revisado no binário atual e fixado por hash para evitar trocas não auditadas.",
    reviewedAt: "2026-03-28",
  },
};
