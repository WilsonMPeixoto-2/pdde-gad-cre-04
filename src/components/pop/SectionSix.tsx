import { FileText, Send, UserCheck } from "lucide-react";
import { Callout } from "./Callout";

export const SectionSix = () => {
  return (
    <section id="secao-6" className="scroll-mt-20 space-y-6">
      {/* Introdução */}
      <div className="section-card">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Despacho da GAD e Finalização
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Após a instrução completa do processo pela escola, a GAD realizará a análise da prestação de contas.
          Em caso de aprovação, será elaborado o despacho de aprovação e o processo seguirá para o Coordenador
          para publicação.
        </p>
      </div>

      {/* Etapas do Despacho */}
      <div className="section-card">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" />
          Etapas da Finalização
        </h4>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Análise pela GAD</p>
              <p className="text-sm text-muted-foreground mt-1">
                A GAD verifica a conformidade de todos os documentos da prestação de contas.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Despacho de Aprovação</p>
              <p className="text-sm text-muted-foreground mt-1">
                Em caso de conformidade, a GAD elabora o despacho de aprovação da prestação de contas.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Despacho do Coordenador</p>
              <p className="text-sm text-muted-foreground mt-1">
                O Coordenador elabora despacho com "Publique-se" para oficialização da aprovação.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">4</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Relacionamento com Processo de Inventário</p>
              <p className="text-sm text-muted-foreground mt-1">
                Quando aplicável, o processo de prestação de contas é relacionado ao processo de inventário da escola.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Callout */}
      <Callout variant="info" icon={UserCheck}>
        <p className="font-medium">Acompanhamento do Processo</p>
        <p className="text-sm mt-1">
          A escola pode acompanhar o andamento do processo diretamente no SEI!RIO. 
          Em caso de pendências, a GAD entrará em contato para as devidas correções.
        </p>
      </Callout>
    </section>
  );
};
