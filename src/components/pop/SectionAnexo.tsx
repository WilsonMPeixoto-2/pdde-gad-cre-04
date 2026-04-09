import { ExternalLink, ShieldCheck } from "lucide-react";
import { externalResources, officialReferenceIds } from "@/lib/externalResources";

export const SectionAnexo = () => {
  const officialLinks = officialReferenceIds.map((resourceId) => externalResources[resourceId]);

  return (
    <section className="scroll-mt-28 section-card p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-2xl bg-primary/10 p-3">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Fontes oficiais prioritárias para consulta rápida
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {officialLinks.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-[1.75rem] border border-border/60 bg-linear-to-br from-background via-background to-secondary/45 px-5 py-5 transition-all duration-300 hover:border-primary/35 hover:shadow-[0_18px_36px_-30px_rgba(8,32,76,0.2)]"
          >
            <div className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/8 text-primary">
              <ExternalLink className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold leading-tight text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-left sm:text-justify">{item.description}</p>
            </div>

            <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
          </a>
        ))}
      </div>
    </section>
  );
};
