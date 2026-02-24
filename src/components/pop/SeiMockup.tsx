import { Menu, FileText, Search, ChevronDown, Check, User, Eye, Printer, Download } from "lucide-react";
import { SeiIncluirIcon, SeiAssinarIcon, SeiEnviarIcon, SeiPastaIcon, SeiIniciarProcessoIcon, SeiInteressadosIcon } from "./SeiIcons";

interface SeiMockupProps {
  variant: "menu" | "process-tree" | "document-form" | "type-selection" | "icons";
  highlight?: string;
}

// Professional SEI-style icon button with animations
const SeiIconButton = ({ icon, label, active = false }: { icon: React.ReactNode; label?: string; active?: boolean }) => (
  <div role="button" aria-label={label ? `Ação SEI: ${label}` : 'Ação SEI'} aria-pressed={active} className={`
    flex flex-col items-center gap-1 p-1.5 rounded cursor-pointer 
    transition-all duration-200 ease-out
    hover:scale-110 hover:shadow-md
    active:scale-95
    ${active 
      ? 'bg-gradient-to-b from-[#e8f4fd] to-[#d0e8f9] shadow-sm border border-[#b8d4ea]' 
      : 'hover:bg-gradient-to-b hover:from-[#f5f8fa] hover:to-[#e8eef2]'
    }
  `}>
    <div className={`
      w-6 h-6 flex items-center justify-center transition-transform duration-200
      ${active ? 'text-[#1565C0]' : 'text-[#546E7A] hover:text-[#37474F]'}
    `}>
      {icon}
    </div>
    {label && (
      <span className={`text-[10px] transition-colors duration-200 ${active ? 'text-[#1565C0] font-medium' : 'text-[#78909C]'}`}>
        {label}
      </span>
    )}
  </div>
);

// SEI Action Icons Bar with professional styling
export const SeiIconsBar = () => (
  <div className="flex items-center gap-0.5 p-2 bg-gradient-to-b from-[#fafbfc] to-[#f0f3f5] border border-[#d0d7de] rounded-lg overflow-x-auto shadow-sm">
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
  <div className="sei-mockup-header-pro">
    {/* Green bar */}
    <div className="bg-gradient-to-r from-[#006633] to-[#00802b] text-white text-[10px] px-3 py-1 font-medium tracking-wide">
      PREFEITURA DA CIDADE DO RIO DE JANEIRO
    </div>
    {/* SEI bar */}
    <div className="bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] border-b border-[#dee2e6] px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-baseline">
            <span className="text-[#006633] font-black text-lg italic tracking-tight" style={{ fontFamily: 'Arial Black, sans-serif' }}>sei</span>
            <span className="text-[#006633] font-black text-lg italic" style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>!</span>
          </div>
          {showLogo && (
            <span className="text-[10px] text-[#6c757d] ml-1 hidden sm:inline">SEI - Prefeitura da Cidade do Rio de Janeiro</span>
          )}
          {title && (
            <span className="text-xs font-semibold text-[#495057] ml-2">{title}</span>
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
      <div className="bg-white border border-[#dee2e6] rounded-xl overflow-hidden shadow-lg max-w-sm">
        <SeiHeader showLogo />
        
        {/* Menu Items */}
        <div className="p-3 space-y-0.5 bg-gradient-to-b from-white to-[#f8f9fa]">
          {[
            { icon: <Search className="w-4 h-4" />, label: "Pesquisar no Menu", key: "search" },
            { icon: <Menu className="w-4 h-4" />, label: "Estatísticas", key: "stats" },
            { icon: <SeiPastaIcon size={16} />, label: "Favoritos", key: "favs" },
            { icon: <SeiIniciarProcessoIcon size={18} />, label: "Iniciar Processo", key: "iniciar" },
          ].map((item) => (
            <div 
              key={item.key}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer
                transition-all duration-200 ease-out
                ${highlight === item.key 
                  ? "bg-gradient-to-r from-[#1565C0] to-[#1976D2] text-white font-semibold shadow-md transform scale-[1.02]" 
                  : "text-[#495057] hover:bg-[#e9ecef] hover:translate-x-1"
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
      <div className="bg-white border border-[#dee2e6] rounded-xl overflow-hidden shadow-lg">
        <SeiHeader title="Árvore do Processo" />
        
        <div className="p-3 text-sm bg-gradient-to-b from-white to-[#fafbfc]">
          {/* Process Root */}
          <div className="flex items-center gap-2 px-2 py-2 font-semibold text-[#212529] bg-[#e3f2fd] rounded-lg mb-2">
            <ChevronDown className="w-4 h-4 text-[#1565C0]" />
            <SeiPastaIcon size={18} />
            <span>Processo 04.xx.xxx/2025</span>
          </div>
          
          {/* Documents */}
          <div className="ml-4 space-y-0.5 border-l-2 border-[#e0e0e0] pl-3">
            {[
              { name: "Despacho de Encaminhamento", signed: true },
              { name: "Demonstrativo - ND 435", signed: true },
              { name: "Demonstrativo - ND 441", signed: true },
              { name: "NF - Empresa Alpha", signed: true },
              { name: "NF - Fornecedor Beta", signed: true },
            ].map((doc, i) => (
              <div 
                key={i} 
                className="
                  flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer group
                  transition-all duration-200 ease-out
                  hover:bg-[#f5f5f5] hover:translate-x-1 hover:shadow-sm
                "
              >
                <FileText className="w-4 h-4 text-[#90a4ae] group-hover:text-[#546e7a] transition-colors" />
                <span className="text-[#616161] group-hover:text-[#212529] text-xs sm:text-sm truncate transition-colors">
                  {doc.name}
                </span>
                {doc.signed && (
                  <div className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-[#e8f5e9] rounded-full">
                    <Check className="w-3 h-3 text-[#4CAF50]" />
                    <span className="text-[10px] text-[#2e7d32] font-medium">Assinado</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "type-selection") {
    return (
      <div className="bg-white border border-[#dee2e6] rounded-xl overflow-hidden shadow-lg">
        <SeiHeader title="Escolha o Tipo de Processo" />
        
        <div className="p-4 space-y-3 bg-gradient-to-b from-white to-[#fafbfc]">
          <div className="flex items-center gap-2 text-sm">
            <Search className="w-4 h-4 text-[#6c757d]" />
            <input 
              type="text" 
              placeholder="pdde" 
              className="bg-white border border-[#ced4da] rounded-lg px-3 py-2 text-[#495057] w-full focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 transition-all outline-none"
              defaultValue="pdde"
            />
          </div>
          
          <div className="space-y-1">
            {[
              { label: "Devolução de Prestação de Contas", active: false },
              { label: "EXECUÇÃO FINANCEIRA: PROGRAMA DINHEIRO DIRETO NA ESCOLA - PDDE", active: true },
              { label: "Prestação de Contas de Suprimento de Fundos", active: false },
            ].map((item, i) => (
              <div 
                key={i}
                className={`
                  px-3 py-2.5 rounded-lg text-sm cursor-pointer
                  transition-all duration-200 ease-out
                  ${item.active 
                    ? "bg-gradient-to-r from-[#1565C0] to-[#1976D2] text-white font-semibold shadow-md" 
                    : "text-[#495057] hover:bg-[#e9ecef] hover:translate-x-1"
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
      <div className="bg-white border border-[#dee2e6] rounded-xl overflow-hidden shadow-lg">
        <SeiHeader title="Registrar Documento Externo" />
        
        <div className="p-4 space-y-4 text-sm bg-gradient-to-b from-white to-[#fafbfc]">
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
                font-semibold text-xs sm:text-sm px-2 py-1 rounded transition-all duration-200
                ${field.highlight 
                  ? "text-[#1565C0] bg-[#e3f2fd]" 
                  : "text-[#212529] group-hover:bg-[#f5f5f5]"
                }
              `}>
                {field.value}
              </span>
            </div>
          ))}
          
          <div className="pt-3 flex items-center gap-3 border-t border-[#e9ecef]">
            <button className="
              px-5 py-2.5 bg-gradient-to-b from-[#1976D2] to-[#1565C0] text-white rounded-lg text-xs font-semibold 
              cursor-pointer shadow-md
              transition-all duration-200 ease-out
              hover:shadow-lg hover:from-[#1e88e5] hover:to-[#1976D2] hover:scale-105
              active:scale-95
            ">
              Confirmar
            </button>
            <button className="
              px-5 py-2.5 bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] text-[#424242] rounded-lg text-xs font-semibold 
              cursor-pointer border border-[#bdbdbd]
              transition-all duration-200 ease-out
              hover:from-[#eeeeee] hover:to-[#e0e0e0] hover:scale-105
              active:scale-95
            ">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "icons") {
    return <SeiIconsBar />;
  }

  return null;
};