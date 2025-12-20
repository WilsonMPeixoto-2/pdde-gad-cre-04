import { Phone, Mail, MapPin, Clock, ExternalLink, Monitor, BookOpen, Printer, Calendar, Users, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./CopyButton";

type SectionContactsProps = {
  onPrint?: () => void;
};

export const SectionContacts = ({ onPrint }: SectionContactsProps) => {
  return (
    <section id="contatos" className="scroll-mt-20 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="section-number">6</div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Contatos da GAD/4ª CRE
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Canais de atendimento e suporte
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Main Contact Card */}
        <div className="section-card overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-primary to-primary/80 p-5 sm:p-6 text-primary-foreground relative overflow-hidden print:bg-primary print:from-primary print:to-primary">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50 print:hidden"></div>
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-heading font-bold mb-1 print:text-white print:!text-white">
                Gerência de Administração
              </h3>
              <p className="text-primary-foreground/80 print:text-white print:!text-white print:opacity-100">
                4ª Coordenadoria Regional de Educação
              </p>
            </div>
          </div>
          
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl">
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

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl">
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

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl">
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
              href="https://sei.rio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
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
              href="https://sei.rio/servidor/guias-e-ambiente-de-teste/guia-do-usuario-interno/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
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
          <p className="text-muted-foreground mb-4 text-sm sm:text-base text-justified leading-relaxed">
            Para questões técnicas relacionadas ao sistema SEI!RIO, entre em contato com 
            o suporte técnico da plataforma através dos canais oficiais da Prefeitura.
          </p>
          
          <a
            href="https://sei.rio/servidor/atendimento/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group mb-4"
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
          <p className="text-muted-foreground mb-4 text-sm sm:text-base text-justified leading-relaxed">
            Para dúvidas específicas sobre o uso do SEI!RIO na Secretaria Municipal de Educação, 
            entre em contato com os administradores locais do sistema através dos e-mails abaixo.
          </p>
          
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
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

        {/* Footer Note */}
        <div className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary rounded-xl border border-border/50">
          <p className="text-center text-muted-foreground">
            <strong className="text-foreground text-lg">4ª Coordenadoria Regional de Educação</strong><br />
            <span className="text-sm">Gerência de Administração (GAD)</span><br />
            <span className="text-xs text-muted-foreground/70 mt-2 block flex items-center justify-center gap-2">
              <Calendar className="w-3 h-3" />
              Última atualização: 16 de dezembro de 2025
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
