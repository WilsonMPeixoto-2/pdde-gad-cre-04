import { useState, useEffect, useCallback } from "react";
import { Menu, ClipboardList, FileText, Upload, CheckCircle, Phone, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PopHeader } from "@/components/pop/PopHeader";
import { PopSidebar } from "@/components/pop/PopSidebar";
import { HeroCover } from "@/components/pop/HeroCover";
import { SectionDivider } from "@/components/pop/SectionDivider";
import { SectionIntro } from "@/components/pop/SectionIntro";
import { ScopeCallout } from "@/components/pop/ScopeCallout";
import { SectionOne } from "@/components/pop/SectionOne";
import { SectionTwo } from "@/components/pop/SectionTwo";
import { SectionThree } from "@/components/pop/SectionThree";
import { SectionFour } from "@/components/pop/SectionFour";
import { SectionFive } from "@/components/pop/SectionFive";
import { SectionSix } from "@/components/pop/SectionSix";
import { SectionContacts } from "@/components/pop/SectionContacts";
import { SectionAnexo } from "@/components/pop/SectionAnexo";
import { BackToTop } from "@/components/pop/BackToTop";
import { ReadingProgressBar } from "@/components/pop/ReadingProgressBar";
import { AnimatedSection } from "@/components/pop/AnimatedSection";
import { DocumentFooter } from "@/components/pop/DocumentFooter";


const Index = () => {
  const [activeSection, setActiveSection] = useState("introducao");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  }, []);

  const handlePrint = useCallback(() => {
    const originalTitle = document.title;
    const printTitle = "PDDE_PRESTACAO_DE_CONTAS_GAD_4_CRE";

    const restoreTitle = () => {
      document.title = originalTitle;
    };

    // Keep the professional name while the print dialog is open.
    window.addEventListener("afterprint", restoreTitle, { once: true });

    // Set professional PDF filename.
    document.title = printTitle;

    // Let the browser apply the title change before opening the print dialog.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.print());
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introducao", "secao-1", "secao-2", "secao-3", "secao-4", "secao-5", "secao-6", "contatos", "anexo"];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Hero Cover */}
      <HeroCover />

      {/* Header */}
      <PopHeader onPrint={handlePrint} />

      <div className="flex">
        <PopSidebar
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 lg:ml-0">
          <div className="lg:hidden fixed bottom-4 left-4 z-40 no-print">
            <Button size="lg" className="rounded-full shadow-lg" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu de navegação">
              <Menu className="w-5 h-5 mr-2" aria-hidden="true" />
              Menu
            </Button>
          </div>

          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="space-y-8">
              <AnimatedSection>
                <SectionIntro />
              </AnimatedSection>

              <AnimatedSection delay={50}>
                <ScopeCallout />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="1" title="Abertura do Processo" subtitle="Acesso ao SEI!RIO, criação do processo, numeração e identificação" icon={ClipboardList} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionOne />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="2" title="Instrução Processual" subtitle="Documentos exigidos para a prestação de contas do PDDE" icon={FileText} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionTwo />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="3" title="Inclusão de Documentos Externos" subtitle="Como incluir documentos digitalizados e nato digitais no SEI!RIO" icon={Upload} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionThree />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="4" title="Autenticação de Documentos" subtitle="Procedimento para autenticar documentos externos no SEI!RIO" icon={FileText} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionFour />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="5" title="Bloco de Assinatura" subtitle="Criação do bloco de assinatura e disponibilização para a escola" icon={CheckCircle} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionFive />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="6" title="Despacho e Finalização" subtitle="Despachos da GAD e do Coordenador para aprovação" icon={FileText} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionSix />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="7" title="Contatos" subtitle="Canais de atendimento e suporte da GAD/4ª CRE" icon={Phone} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionContacts onPrint={handlePrint} />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <SectionDivider number="A" title="Anexo" subtitle="Legislação de referência e documentos exigidos" icon={Scale} />
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionAnexo />
              </AnimatedSection>

              {/* Document Footer */}
              <DocumentFooter />
            </div>

            <div className="print-only mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
              <p>Procedimento Operacional Padrão - Prestação de Contas PDDE</p>
              <p>4ª Coordenadoria Regional de Educação | GAD</p>
            </div>
          </div>
        </main>
      </div>
      <BackToTop />
      
    </div>
  );
};

export default Index;
