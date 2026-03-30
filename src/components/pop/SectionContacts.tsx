import { Phone, Mail, MapPin, ExternalLink, Monitor, BookOpen, Printer, Calendar, Users, Headset, Search, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./CopyButton";
import { externalResources } from "@/lib/externalResources";
import { GUIDE_VERSION } from "@/lib/guideContent";

type SectionContactsProps = {
  onPrint?: () => void;
};

export const SectionContacts = ({ onPrint }: SectionContactsProps) => {
  return (
    <section className="animate-fade-in">
      <div className="space-y-5">
        {/* Main Contact Card */}
        <div className="section-card overflow-hidden">
          <div className="bg-linear-to-r from-primary via-primary to-primary/80 p-5 sm:p-6 text-primary-foreground relative overflow-hidden print:bg-primary print:from-primary print:to-primary">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50 print:hidden"></div>
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-heading font-bold mb-1 print:text-white print:text-white!">
                Gerência de Administração
              </h3>
              <p className="text-primary-foreground/80 print:text-white print:text-white! print:opacity-100">
                4ª Coordenadoria Regional de Educação
              </p>
            </div>
          </div>
          
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-linear-to-r from-secondary to-secondary/50 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">E-mail</p>
                <a 
                  href="mailto:gadcre04@rioeduca.net" 
                  className="text-base sm:text-lg font-semibold text-primary hover:underline break-all"
                >
                  gadcre04@rioeduca.net
                </a>
              </div>
              <CopyButton text="gadcre04@rioeduca.net" label="E-mail copiado!" />
            </div>

            <div className="flex items-center gap-4 p-4 bg-linear-to-r from-secondary to-secondary/50 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Telefone</p>
                <a 
                  href="tel:+552124759209" 
                  className="text-base sm:text-lg font-semibold text-primary hover:underline"
                >
                  (21) 2475-9209
                </a>
              </div>
              <CopyButton text="(21) 2475-9209" label="Telefone copiado!" />
            </div>

            <div className="flex items-start gap-4 p-4 bg-linear-to-r from-secondary to-secondary/50 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Endereço</p>
                <p className="text-foreground font-medium">
                  Rua Professor Luís Rondelli, 150<br />
                  Olaria, Rio de Janeiro - RJ<br />
                  CEP: 21021-630
                </p>
              </div>
              <CopyButton text="Rua Professor Luís Rondelli, 150, Olaria, Rio de Janeiro - RJ, CEP: 21021-630" label="Endereço copiado!" />
            </div>
          </div>
        </div>

        {/* SEI RIO Links */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            Acesso ao SEI!RIO
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={externalResources.seiRioPortal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">SEI!RIO</p>
                <p className="text-sm text-muted-foreground">Acesso ao sistema</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
            </a>

            <a
              href={externalResources.seiRioUserGuide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Guia do Usuário Interno</p>
                <p className="text-sm text-muted-foreground">Manual oficial SEI!RIO</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
            </a>
          </div>
        </div>

        {/* Support Info */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Headset className="w-5 h-5 text-primary" />
            Suporte ao SEI!RIO
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base text-left sm:text-justify leading-relaxed">
            Para questões técnicas relacionadas ao sistema SEI!RIO, entre em contato com 
            o suporte técnico da plataforma através dos canais oficiais da Prefeitura.
          </p>
          
          <a
            href={externalResources.seiRioSupport.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <Headset className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Portal de Atendimento</p>
              <p className="text-sm text-muted-foreground">Suporte técnico oficial SEI!RIO</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
          </a>
        </div>

        {/* Administradores Locais SEI!RIO */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Administradores Locais SEI!RIO
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base text-left sm:text-justify leading-relaxed">
            Para dúvidas específicas sobre o uso do SEI!RIO na Secretaria Municipal de Educação, 
            entre em contato com os administradores locais do sistema através dos e-mails abaixo.
          </p>
          
          <div className="flex items-center gap-4 p-4 bg-linear-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">E-mails de contato</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-4 sm:gap-y-1">
                <div className="flex items-center gap-1">
                  <a 
                    href="mailto:sei.duvidas@rioeduca.net" 
                    className="text-base font-semibold text-primary hover:underline break-all"
                  >
                    sei.duvidas@rioeduca.net
                  </a>
                  <CopyButton text="sei.duvidas@rioeduca.net" label="E-mail copiado!" />
                </div>
                <div className="flex items-center gap-1">
                  <a 
                    href="mailto:gaasme@rioeduca.net" 
                    className="text-base font-semibold text-primary hover:underline break-all"
                  >
                    gaasme@rioeduca.net
                  </a>
                  <CopyButton text="gaasme@rioeduca.net" label="E-mail copiado!" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="section-card p-5 sm:p-6 no-print">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Printer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Versão para Impressão</h4>
                <p className="text-sm text-muted-foreground">Imprima este guia para consulta offline</p>
              </div>
            </div>
            <Button
              onClick={onPrint ?? (() => window.print())}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimir Documento
            </Button>
          </div>
        </div>

        <div className="section-card p-5 sm:p-6 no-print">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
            <BookOpen className="w-5 h-5 text-primary" />
            Apoios rápidos de consulta
          </h3>
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base text-left sm:text-justify">
            Estes recursos ajudam a localizar informações, ajustar a leitura e preparar arquivos de apoio, mas não substituem a leitura integral do procedimento nem das referências oficiais.
          </p>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
            <div className="rounded-[1.4rem] border border-border/60 bg-linear-to-br from-background via-background to-secondary/55 p-5 shadow-soft">
              <div className="space-y-4">
                {[
                  {
                    icon: Search,
                    title: "Busca no guia",
                    text: "Use a busca do topo para localizar etapas, documentos e referências sem percorrer toda a página.",
                  },
                  {
                    icon: Printer,
                    title: "Impressão e PDF",
                    text: "O botão do topo abre a versão para impressão e também permite salvar o guia em PDF para consulta fora da internet.",
                  },
                  {
                    icon: Moon,
                    title: "Modo claro ou escuro",
                    text: "Você pode alternar o tema visual no topo para adequar a leitura ao ambiente de trabalho.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-3 border-b border-border/45 pb-4 last:border-b-0 last:pb-0">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-left sm:text-justify">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              href="https://compacta02.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[1.4rem] border border-primary/15 bg-linear-to-br from-primary/6 via-background to-emerald-50/65 p-5 shadow-soft transition-all duration-300 hover:border-primary/30 hover:shadow-[0_18px_36px_-28px_rgba(8,32,76,0.28)] dark:to-emerald-950/20"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/14">
                <ExternalLink className="h-5 w-5" />
              </div>
              <h4 className="font-heading text-lg font-bold tracking-tight text-foreground">
                Compacta.pdf
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-left sm:text-justify">
                Se for necessário compactar ou reunir PDFs antes da inserção no SEI!RIO, utilize o{" "}
                <span className="font-semibold text-primary">Compacta.pdf</span>.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Abrir ferramenta
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </p>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="rounded-[1.6rem] border border-border/50 bg-linear-to-br from-primary/10 via-primary/4 to-secondary p-6">
          <p className="text-center leading-relaxed text-muted-foreground">
            <strong className="text-base text-foreground sm:text-lg">Antes de solicitar apoio</strong><br />
            <span className="text-sm">
              Informe o número do processo SEI, o exercício de referência e, se houver, a pendência específica identificada pela unidade escolar ou pela CRE.
            </span><br />
            <span className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground/70">
              <Calendar className="w-3 h-3" />
              {`Última atualização: ${GUIDE_VERSION.lastUpdatedText}`}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
