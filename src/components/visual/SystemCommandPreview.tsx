import {
  CheckCircle2,
  ChevronRight,
  FilePlus2,
  FileText,
  Search,
} from "lucide-react";

export type SystemCommandPreviewVariant = "include-document" | "external-document";

type SystemCommandPreviewProps = {
  variant: SystemCommandPreviewVariant;
};

const previewCopy = {
  "include-document": {
    eyebrow: "Barra de ações do processo",
    title: "Incluir Documento",
    description: "Com o processo aberto, utilize o comando de inclusão disponível na barra de ferramentas.",
  },
  "external-document": {
    eyebrow: "Escolha do tipo documental",
    title: "Documento Externo",
    description: "Selecione esta opção quando a peça não tiver sido produzida dentro do próprio SEI!RIO.",
  },
} as const;

export const SystemCommandPreview = ({ variant }: SystemCommandPreviewProps) => {
  const copy = previewCopy[variant];

  return (
    <div
      className="system-command-preview"
      data-system-command-preview="true"
      data-variant={variant}
      role="img"
      aria-label={`${copy.title}. ${copy.description}`}
    >
      <div className="system-command-preview__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>SEI!RIO</strong>
      </div>

      <div className="system-command-preview__body" aria-hidden="true">
        {variant === "include-document" ? (
          <>
            <div className="system-command-preview__toolbar">
              <div>
                <FilePlus2 />
                <span>Incluir Documento</span>
              </div>
              <div>
                <Search />
                <span>Pesquisar</span>
              </div>
              <div>
                <FileText />
                <span>Consultar</span>
              </div>
            </div>
            <div className="system-command-preview__focus">
              <FilePlus2 />
              <div>
                <span>{copy.eyebrow}</span>
                <strong>{copy.title}</strong>
              </div>
              <ChevronRight />
            </div>
          </>
        ) : (
          <>
            <div className="system-command-preview__search">
              <Search />
              <span>Pesquisar tipo de documento</span>
            </div>
            <div className="system-command-preview__option">
              <FileText />
              <div>
                <span>Tipo selecionado</span>
                <strong>{copy.title}</strong>
              </div>
              <CheckCircle2 />
            </div>
            <div className="system-command-preview__ghost-option">
              <FileText />
              <span>Outros tipos permanecem disponíveis no sistema</span>
            </div>
          </>
        )}
      </div>

      <div className="system-command-preview__caption">
        <span>{copy.eyebrow}</span>
        <strong>{copy.title}</strong>
        <p>{copy.description}</p>
      </div>
    </div>
  );
};