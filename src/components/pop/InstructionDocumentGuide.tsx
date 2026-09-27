import {
  Banknote,
  ClipboardList,
  FileCheck2,
  Landmark,
  PackageCheck,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import { SourceCitation } from "@/components/legal/SourceCitation";
import { IconTile } from "@/components/visual/IconTile";
import {
  instructionDocumentGroups,
  type InstructionDocumentIconKey,
} from "@/lib/instructionDocuments";

const documentGroupIcons: Record<InstructionDocumentIconKey, LucideIcon> = {
  planning: ClipboardList,
  financial: Landmark,
  expenses: ReceiptText,
  assets: PackageCheck,
};

const localItems = [
  "Peça de encaminhamento local, quando formalmente exigida",
  "Documentos internos assinados no SEI!RIO",
  "Autenticação dos documentos efetivamente digitalizados",
  "Identificação clara de cada peça na árvore do processo",
  "Outras peças formalmente requeridas pela SME-Rio ou pela CRE",
] as const;

export const InstructionDocumentGuide = () => (
  <section className="section-card" aria-labelledby="instruction-documents-title">
    <div className="flex items-start gap-4">
      <IconTile icon={FileCheck2} size="lg" />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
          2.1 · Entender os documentos
        </p>
        <h3
          id="instruction-documents-title"
          className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl"
        >
          O que cada grupo documental demonstra
        </h3>
        <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
          A instrução não deve começar pela simples marcação de uma lista. Primeiro, identifique a função de cada peça e verifique se ela se aplica ao exercício, à ação e à despesa analisada.
        </p>
      </div>
    </div>

    <div className="mt-7 space-y-5">
      {instructionDocumentGroups.map((group, groupIndex) => {
        const Icon = documentGroupIcons[group.iconKey];

        return (
          <article
            key={group.title}
            className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55"
          >
            <div className="flex items-start gap-3">
              <IconTile
                icon={Icon}
                size="md"
                tone={groupIndex === instructionDocumentGroups.length - 1 ? "warning" : "primary"}
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-bold tracking-[-0.015em] text-foreground">
                  {group.title}
                </h4>
                <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {group.description}
                </p>
              </div>
            </div>

            <dl className="mt-5 divide-y divide-slate-300 border-y border-slate-300 dark:divide-slate-700 dark:border-slate-700">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-1 py-3 sm:grid-cols-[minmax(13rem,0.8fr)_minmax(0,1.2fr)] sm:gap-5"
                >
                  <dt className="text-sm font-bold leading-6 text-foreground">{item.name}</dt>
                  <dd className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {item.purpose}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4">
              <SourceCitation reference={group.reference} />
            </div>
          </article>
        );
      })}
    </div>

    <aside className="mt-6 rounded-xl border border-blue-300 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/25">
      <div className="flex items-start gap-3">
        <Banknote
          className="mt-0.5 h-5 w-5 shrink-0 text-blue-800 dark:text-sky-300"
          aria-hidden="true"
        />
        <div>
          <h4 className="text-sm font-bold text-blue-950 dark:text-sky-100">
            Peças complementares do processo local
          </h4>
          <p className="mt-1.5 text-sm leading-6 text-blue-950 dark:text-blue-100">
            Além da base federal, o processo pode exigir peças administrativas do SEI!RIO. Elas não devem ser confundidas com o rol documental federal e só devem ser tratadas como obrigatórias quando houver orientação formal vigente.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-blue-950 sm:grid-cols-2 dark:text-blue-100">
            {localItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700 dark:bg-sky-300"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  </section>
);
