import { ExternalLink, ShieldCheck } from "lucide-react";

const sourceLinks = [
  {
    label: "Resolução CD/FNDE nº 15/2021",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/%40%40download/file",
  },
  {
    label: "Resolução CD/FNDE nº 7/2024",
    href: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/RESOLUOCD_FNDEN7DE2DEMAIODE2024RESOLUOCD_FNDEN7DE2DEMAIODE2024DOUImprensaNacional.pdf",
  },
] as const;

export const ScopeNotice = () => {
  return (
    <section
      className="section-card border-l-4 border-l-blue-700 bg-blue-50/85 p-5 text-slate-800 sm:p-6 dark:border-l-blue-400 dark:bg-blue-950/22 dark:text-slate-100"
      aria-labelledby="scope-notice-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/45 dark:text-blue-200">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <span className="meta-pill border-blue-200 bg-white/70 text-blue-700 dark:border-blue-700/50 dark:bg-blue-950/40 dark:text-blue-200">
            ESCOPO DO GUIA
          </span>

          <h3
            id="scope-notice-title"
            className="mt-3 text-xl font-bold leading-tight text-slate-950 sm:text-2xl dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Escopo e limites deste guia
          </h3>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-[0.98rem] dark:text-slate-200">
            <p>
              Este material orienta a autuação, a instrução, a assinatura e a tramitação, no
              SEI!RIO, do processo local de prestação de contas do PDDE das UEx/CEC vinculadas à
              4ª CRE.
            </p>
            <p>
              O processo administrativo municipal não substitui os registros, as classificações, os
              documentos ou os procedimentos exigidos pelo FNDE na Solução BB Gestão Ágil, no SiGPC
              ou em outro ambiente federal aplicável ao exercício.
            </p>
            <p>
              Em matéria de execução e prestação de contas dos recursos federais, prevalecem as
              normas do FNDE e os normativos específicos de cada ação integrada. Os prazos internos
              de remessa à GAD serão aqueles formalmente comunicados pela SME-Rio ou pela 4ª CRE
              para cada ciclo.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 border-t border-blue-200/80 pt-4 text-xs font-semibold text-blue-800 dark:border-blue-800/55 dark:text-blue-200">
            {sourceLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline focus-visible:underline"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
