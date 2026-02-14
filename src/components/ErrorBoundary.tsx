import { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: unknown;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: { componentStack: string }) {
    // Surface the full component stack in console logs so we can pinpoint the exact offender.
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary] Caught render error:", error);
      console.error("[ErrorBoundary] Component stack:", info.componentStack);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen bg-background text-foreground">
        <section className="container mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h1 className="text-2xl font-heading font-bold">Ocorreu um erro ao carregar a página</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Já registramos detalhes técnicos no console para identificar o componente exato.
            </p>
            <button
              onClick={this.handleReload}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Recarregar
            </button>
          </div>
        </section>
      </main>
    );
  }
}
