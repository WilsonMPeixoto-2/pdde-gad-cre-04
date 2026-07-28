import { useEffect } from "react";

type NotFoundProps = {
  pathname: string;
};

const NotFound = ({ pathname }: NotFoundProps) => {
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404: tentativa de acesso a uma rota inexistente:", pathname);
    }
  }, [pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="max-w-lg text-center">
        <p className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.18em] text-primary">
          Página não encontrada
        </p>
        <h1 className="mb-4 text-5xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg leading-8 text-muted-foreground">
          O endereço informado não corresponde a uma seção publicada do Guia PDDE.
        </p>
        <a
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Voltar ao guia
        </a>
      </div>
    </main>
  );
};

export default NotFound;
