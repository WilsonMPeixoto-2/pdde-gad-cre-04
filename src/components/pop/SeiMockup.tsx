import { Menu, FileText, Search, ChevronDown, Check, User, Eye, Printer, Download } from "lucide-react";
import { SeiIncluirIcon, SeiAssinarIcon, SeiEnviarIcon, SeiPastaIcon, SeiIniciarProcessoIcon } from "./SeiIcons";
import { PROCESS_TYPE_LABEL, seiProcessTreeDocuments } from "@/lib/guideContent";

interface SeiMockupProps {
  variant: "menu" | "process-tree" | "document-form" | "type-selection" | "icons" | "signature-block";
  highlight?: string;
}

const mockupShellClassName =
  "sei-mockup w-full max-w-full overflow-hidden rounded-2xl border border-[#d9e2ec] bg-linear-to-br from-white via-[#fbfcfd] to-[#eef3f7] shadow-xl";

// Professional SEI-style icon button with animations
const SeiIconButton = ({ icon, label, active = false }: { icon: React.ReactNode; label?: string; active?: boolean }) => (
  <div aria-hidden="true" className={`
    flex min-w-[64px] flex-col items-center gap-1.5 rounded-[1rem] px-2 py-1.5
    ${active 
      ? 'border border-[#b8d4ea] bg-linear-to-b from-[#eaf5fd] to-[#d8eaf8] shadow-[0_14px_24px_-18px_rgba(21,101,192,0.45),inset_0_1px_0_0_rgba(255,255,255,0.8)]' 
      : 'border border-transparent bg-transparent'
    }
  `}>
    <div className={`
      flex h-7 w-7 items-center justify-center rounded-xl
      ${active ? 'text-[#1565C0]' : 'text-[#546E7A]'}
    `}>
      {icon}
    </div>
    {label && (
      <span className={`text-[10px] tracking-[0.02em] ${active ? 'font-semibold text-[#1565C0]' : 'font-medium text-[#78909C]'}`}>
        {label}
      </span>
    )}
  </div>
);

// SEI Action Icons Bar with professional styling
export const SeiIconsBar = () => (
  <div
    role="img"
    aria-label="Barra ilustrativa de ações do SEI!RIO com opções como incluir, enviar, visualizar e assinar."
    className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-[#d0d7de] bg-linear-to-b from-[#fbfcfd] via-white to-[#eef2f6] p-3 shadow-[0_22px_40px_-30px_rgba(15,23,42,0.34),inset_0_1px_0_0_rgba(255,255,255,0.6)]"
  >
    <SeiIconButton icon={<SeiIncluirIcon size={20} />} label="Incluir" active />
    <SeiIconButton icon={<SeiEnviarIcon size={20} />} label="Enviar" />
    <SeiIconButton icon={<Eye className="w-5 h-5" />} label="Visualizar" />
    <SeiIconButton icon={<SeiAssinarIcon size={20} />} label="Assinar" />
    <SeiIconButton icon={<SeiAssinarIcon size={20} />} label="Autenticar" />
    <SeiIconButton icon={<Printer className="w-5 h-5" />} label="Imprimir" />
    <SeiIconButton icon={<Download className="w-5 h-5" />} label="Download" />
  </div>
);

// Professional SEI Header Component
const SeiHeader = ({ title, showLogo = false }: { title?: string; showLogo?: boolean }) => (
  <div className="sei-mockup-header-pro border-b border-[#d9e2ec]">
    {/* Green bar */}
    <div className="bg-linear-to-r from-[#006633] to-[#00802b] px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-white">
      PREFEITURA DA CIDADE DO RIO DE JANEIRO
    </div>
    {/* SEI bar */}
    <div className="border-b border-[#dee2e6] bg-linear-to-b from-[#f8f9fa] via-white to-[#eceff2] px-3 py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-baseline">
            <span className="text-[#006633] font-black text-lg italic tracking-tight" style={{ fontFamily: 'Arial Black, sans-serif' }}>sei</span>
            <span className="text-[#006633] font-black text-lg italic" style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>!</span>
          </div>
          {showLogo && (
            <span className="ml-1 hidden text-[10px] font-medium tracking-[0.04em] text-[#6c757d] sm:inline">
              SEI - Prefeitura da Cidade do Rio de Janeiro
            </span>
          )}
          {title && (
            <span className="ml-2 text-xs font-semibold tracking-[0.01em] text-[#495057]">{title}</span>
          )}
        </div>
        <User className="w-4 h-4 text-[#6c757d]" />
      </div>
    </div>
  </div>
);

export const SeiMockup = ({ variant, highlight }: SeiMockupProps) => {
  if (variant === "menu") {
    return (
      <div
        role="img"
        aria-label="Exemplo ilustrativo do menu do SEI!RIO com destaque para a opção iniciar processo."
        className={`${mockupShellClassName} max-w-sm`}
      >
        <SeiHeader showLogo />
        
        {/* Menu Items */}
        <div className="space-y-1 bg-linear-to-b from-white to-[#f8f9fa] p-3">
          {[
            { icon: <Search className="w-4 h-4" />, label: "Pesquisar no Menu", key: "search" },
            { icon: <Menu className="w-4 h-4" />, label: "Estatísticas", key: "stats" },
            { icon: <SeiPastaIcon size={16} />, label: "Favoritos", key: "favs" },
            { icon: <SeiIniciarProcessoIcon size={18} />, label: "Iniciar Processo", key: "iniciar" },
          ].map((item) => (
            <div 
              key={item.key}
              className={`
                flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm
                ${highlight === item.key 
                  ? "bg-linear-to-r from-[#1565C0] to-[#1976D2] text-white font-semibold shadow-[0_16px_24px_-18px_rgba(21,101,192,0.75)]" 
                  : "bg-white/80 text-[#495057] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)]"
                }
              `}
            >
              <span className={highlight === item.key ? "text-white" : "text-[#6c757d]"}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "process-tree") {
    return (
      <div
        role="img"
        aria-label="Exemplo ilustrativo da árvore do processo no SEI!RIO com documentos autenticados e assinados."
        className={mockupShellClassName}
      >
        <SeiHeader title="Árvore do Processo" />
        
        <div className="bg-linear-to-b from-white to-[#fafbfc] p-3 text-sm">
          {/* Process Root */}
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-[#e3f2fd] px-3 py-2.5 font-semibold text-[#212529] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]">
            <ChevronDown className="w-4 h-4 text-[#1565C0]" />
            <SeiPastaIcon size={18} />
            <span>Processo 04.xx.xxx/2025</span>
          </div>
          
          {/* Documents */}
          <div className="ml-4 space-y-0.5 border-l-2 border-[#e0e0e0] pl-3">
            {seiProcessTreeDocuments.map((doc, i) => (
              <div 
                key={i} 
                className="
                  group flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] min-w-0 w-full
                "
              >
                <FileText className="h-4 w-4 text-[#78909C] shrink-0" />
                <span className="truncate text-xs text-[#616161] sm:text-sm min-w-0 flex-1">
                  {doc.name}
                </span>
                <div className={`ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full shrink-0 ${
                  doc.tone === "signed" ? "bg-[#e8f5e9]" : "bg-[#e3f2fd]"
                }`}>
                  <Check className={`w-3 h-3 ${doc.tone === "signed" ? "text-[#4CAF50]" : "text-[#1565C0]"}`} />
                  <span className={`text-[10px] font-medium ${
                    doc.tone === "signed" ? "text-[#2e7d32]" : "text-[#1565C0]"
                  }`}>{doc.statusLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "type-selection") {
    return (
      <div
        role="img"
        aria-label="Exemplo ilustrativo da busca pelo tipo correto de processo no SEI!RIO."
        className={mockupShellClassName}
      >
        <SeiHeader title="Escolha o Tipo de Processo" />
        
        <div className="p-4 space-y-3 bg-linear-to-b from-white to-[#fafbfc]">
          <div className="flex items-center gap-2 text-sm">
            <Search className="w-4 h-4 text-[#6c757d]" />
            <div
              aria-hidden="true"
              className="bg-white border border-[#ced4da] rounded-lg px-3 py-2 text-[#495057] w-full transition-all"
            >
              prestação de contas
            </div>
          </div>
          
          <div className="space-y-1">
            {[
              { label: PROCESS_TYPE_LABEL, active: true },
              { label: "Outros resultados da busca permanecem disponíveis no sistema.", active: false },
            ].map((item, i) => (
              <div 
                key={i}
                className={`
                  cursor-pointer rounded-xl px-3 py-2.5 text-sm
                  transition-all duration-200 ease-out
                  ${item.active 
                    ? "bg-linear-to-r from-[#1565C0] to-[#1976D2] text-white font-semibold shadow-[0_16px_24px_-18px_rgba(21,101,192,0.75)]" 
                    : "bg-white/80 text-[#495057] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)]"
                  }
                `}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "document-form") {
    return (
      <div
        role="img"
        aria-label="Exemplo ilustrativo do preenchimento de documento externo no SEI!RIO."
        className={mockupShellClassName}
      >
        <SeiHeader title="Registrar Documento Externo" />
        
        <div className="p-4 space-y-4 text-sm bg-linear-to-b from-white to-[#fafbfc]">
          {[
            { label: "Tipo do Documento", value: "Nota Fiscal" },
            { label: "Data do Documento", value: "15/12/2025" },
            { label: "Número", value: "NF-001234" },
            { label: "Nome na Árvore", value: "Empresa Alpha LTDA" },
            { label: "Nível de Acesso", value: "Público", highlight: true },
          ].map((field, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 group">
              <span className="text-[#6c757d] w-36 shrink-0 text-xs sm:text-sm font-medium">{field.label}:</span>
              <span className={`
                rounded-lg px-2.5 py-1.5 text-xs font-semibold sm:text-sm
                ${field.highlight 
                  ? "text-[#1565C0] bg-[#e3f2fd]" 
                  : "text-[#212529] bg-white/75 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)]"
                }
              `}>
                {field.value}
              </span>
            </div>
          ))}
          
          <div className="pt-3 flex items-center gap-3 border-t border-[#e9ecef]">
              <div aria-hidden="true" className="
              rounded-lg bg-linear-to-b from-[#1976D2] to-[#1565C0] px-5 py-2.5 text-xs font-semibold text-white shadow-md
            ">
              Confirmar
            </div>
            <div aria-hidden="true" className="
              rounded-lg border border-[#bdbdbd] bg-linear-to-b from-[#f5f5f5] to-[#e0e0e0] px-5 py-2.5 text-xs font-semibold text-[#424242]
            ">
              Cancelar
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "icons") {
    return <SeiIconsBar />;
  }

  if (variant === "signature-block") {
    return (
      <div
        role="img"
        aria-label="Exemplo ilustrativo de bloco de assinatura no SEI!RIO com documentos internos e status de assinatura."
        className={mockupShellClassName}
      >
        <SeiHeader title="Bloco de Assinatura" />

        <div className="space-y-4 bg-linear-to-b from-white to-[#fafbfc] p-4">
          <div className="rounded-2xl border border-[#d8e7f1] bg-[#eef7fd] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5f7285]">
                  Descrição do bloco
                </p>
                <p className="mt-1 text-sm font-semibold text-[#1f2937]">
                  Assinatura — Prestação de Contas PDDE — Exercício 2026 — Escola Exemplo
                </p>
              </div>
              <span className="rounded-full border border-[#b9d4e8] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1565C0]">
                Em andamento
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "Ofício de encaminhamento da unidade escolar", status: "Assinado" },
              { label: "Despacho de encaminhamento da prestação de contas", status: "Pendente" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-[#dde6ee] bg-white px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] min-w-0 w-full"
              >
                <FileText className="h-4 w-4 text-[#78909C] shrink-0" />
                <span className="flex-1 text-sm text-[#334155] truncate min-w-0">{item.label}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] shrink-0 ${
                    item.status === "Assinado"
                      ? "bg-[#e8f5e9] text-[#2e7d32]"
                      : "bg-[#fff4e5] text-[#c77700]"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-[#d9e2ec] bg-white px-4 py-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b7280]">
                Destino do bloco
              </p>
              <p className="mt-1 text-sm font-medium text-[#1f2937]">
                Própria unidade ou unidade destinatária da assinatura
              </p>
            </div>
            <span className="rounded-full border border-[#d8e7f1] bg-[#eef7fd] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1565C0]">
              Disponibilizado
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
