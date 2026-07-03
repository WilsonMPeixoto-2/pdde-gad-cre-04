import { ArrowDown, Compass, FileText, ShieldCheck } from "lucide-react";

const scrollToIntroduction = () => {
  const introduction = document.getElementById("introducao");
  if (!introduction) return;
  introduction.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const HeroCover = () => {
  return (
    <section
      id="hero-cover"
      className="relative isolate flex min-h-[74vh] items-center overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 72% 25%, hsl(201 90% 42% / 0.16), transparent 30%), radial-gradient(circle at 18% 78%, hsl(214 86% 44% / 0.12), transparent 34%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-[10%] w-px bg-white/6"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-[10%] w-px bg-white/6"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2.5 rounded-[0.55rem] border border-white/12 bg-white/[0.045] px-3.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-white/82">
            <ShieldCheck className="h-4 w-4 text-sky-300" aria-hidden="true" />
            4ª Coordenadoria Regional de Educação
          </div>

          <div className="mt-10 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-sky-300">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Guia operacional
          </div>

          <h1
            aria-label="Prestação de Contas PDDE no SEI!RIO"
            className="mt-4 max-w-4xl text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.06em] text-white sm:text-[4.4rem] lg:text-[5.35rem]"
          >
            Prestação de Contas
            <span className="mt-2 block text-sky-300">PDDE no SEI!RIO</span>
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
            Orientações para autuação, organização documental, autenticação, assinatura e remessa do
            processo local, com separação clara entre o fluxo municipal e as exigências federais do PDDE.
          </p>

          <button
            type="button"
            onClick={scrollToIntroduction}
            className="mt-9 inline-flex h-11 items-center justify-center gap-2 rounded-[0.65rem] border border-sky-400/35 bg-sky-500 px-5 text-sm font-bold text-slate-950 shadow-[0_10px_30px_-18px_hsl(199_89%_48%/0.75)] transition-[background-color,border-color,box-shadow] duration-150 hover:border-sky-300 hover:bg-sky-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Iniciar guia
          </button>
        </div>

        <aside className="border-t border-white/12 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/46">
            Estrutura do conteúdo
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-1">
            <div>
              <dt className="text-2xl font-extrabold tracking-[-0.04em] text-white">6</dt>
              <dd className="mt-0.5 text-sm text-white/62">etapas operacionais</dd>
            </div>
            <div>
              <dt className="text-2xl font-extrabold tracking-[-0.04em] text-white">3</dt>
              <dd className="mt-0.5 text-sm text-white/62">camadas de orientação</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-sky-300">Federal · Municipal · Local</dt>
              <dd className="mt-1 text-sm leading-6 text-white/62">fontes e aplicabilidade identificadas</dd>
            </div>
          </dl>
        </aside>
      </div>

      <button
        type="button"
        onClick={scrollToIntroduction}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-white/48 transition-colors hover:text-white/78 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-300 lg:inline-flex"
        aria-label="Ir para a apresentação"
      >
        Continuar
        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </section>
  );
};
