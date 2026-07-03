import { AlertTriangle, ExternalLink } from "lucide-react";
import { applicabilityMatrix } from "@/lib/applicabilityMatrix";
import { normativeSources } from "@/lib/normativeSources";

const statusPresentation = {
  verified: {
    label: "Verificado",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-200",
  },
  "historical-reference": {
    label: "Referência histórica",
    className: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
  },
  "pending-local-validation": {
    label: "Em validação",
    className: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800/70 dark:bg-amber-950/35 dark:text-amber-100",
  },
} as const;

export const ApplicabilityMatrix = () => {
  const pendingEntries = applicabilityMatrix.filter((entry) => !entry.publishAsDefinitive);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="table-institutional table-responsive-cards w-full min-w-[920px] text-left text-sm">
          <thead>
            <tr>
              <th>Exercício</th>
              <th>Status</th>
              <th>UEx</th>
              <th>EEx/EM</th>
              <th>Orientação do site</th>
              <th>Fontes</th>
            </tr>
          </thead>
          <tbody>
            {applicabilityMatrix.map((entry) => {
              const status = statusPresentation[entry.status];

              return (
                <tr key={entry.id} data-applicability-status={entry.status}>
                  <td className="font-semibold text-foreground">{entry.exerciseRange}</td>
                  <td>
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{entry.uexApplicability}</td>
                  <td className="text-muted-foreground">{entry.eexApplicability}</td>
                  <td className="text-muted-foreground">
                    <p>{entry.siteGuidance}</p>
                    {entry.validationRequired ? (
                      <p className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-200">
                        Validação necessária: {entry.validationRequired}
                      </p>
                    ) : null}
                  </td>
                  <td>
                    <div className="flex flex-col items-start gap-2">
                      {entry.sourceIds.map((sourceId) => {
                        const source = normativeSources[sourceId];
                        return (
                          <a
                            key={sourceId}
                            href={source.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1.5 text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline"
                          >
                            <span>{source.title}</span>
                            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pendingEntries.length > 0 ? (
        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/35 dark:text-amber-100" role="note">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="leading-7">
            As linhas identificadas como <strong>Em validação</strong> são referências de controle e não
            constituem orientação operacional definitiva. Antes de utilizá-las, confirme os atos do
            exercício e a orientação formal aplicável à EEx.
          </p>
        </div>
      ) : null}
    </div>
  );
};
