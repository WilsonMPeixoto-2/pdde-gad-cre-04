import { Table2, AlertCircle, FileSpreadsheet, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoDrawer, NaturezasDespesaContent } from "./InfoDrawer";

export const SectionThree = () => {
  return (
    <section id="secao-3" className="scroll-mt-20 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="section-number">3</div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Demonstrativo de Despesas
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Como gerar no SEI!RIO, conferência de dados e naturezas de despesa
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Intro */}
        <div className="section-card p-5 sm:p-6 border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0">
              <Table2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3.1. Demonstrativo de Despesas – Documento Interno</h3>
              <p className="text-muted-foreground text-sm sm:text-base text-justified leading-relaxed">
                Utilize o modelo abaixo como referência para preencher o demonstrativo de despesas 
                no sistema SEI!RIO. Este modelo contempla as naturezas de despesa 435, 441 e 434, 
                conforme orientações da CGM-RJ.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Table Template */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Demonstrativo de Pagamentos via Cartão/Boleto Bancário
          </h3>
          
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
            <table className="table-institutional text-sm">
              <thead>
                <tr>
                  <th className="rounded-tl-lg">Data da Nota</th>
                  <th>Tipo de Transação</th>
                  <th>Favorecido</th>
                  <th>Enquadramento</th>
                  <th>N.D</th>
                  <th className="text-right rounded-tr-lg">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted-foreground">DD/MM/AAAA</td>
                  <td className="text-muted-foreground">Cartão/Boleto</td>
                  <td className="text-muted-foreground">Nome</td>
                  <td className="text-muted-foreground">Art. 8, 9, 10</td>
                  <td className="data-code text-muted-foreground">435</td>
                  <td className="text-right data-code">R$ 0,00</td>
                </tr>
                <tr className="bg-primary/5">
                  <td colSpan={5} className="text-right font-semibold">Valor total:</td>
                  <td className="text-right data-code font-semibold">R$ 0,00</td>
                </tr>
                <tr className="bg-success/5">
                  <td colSpan={5} className="text-right font-semibold">Saldo disponível:</td>
                  <td className="text-right data-code font-semibold text-success">R$ 0,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Expense Natures */}
        <div className="section-card p-5 sm:p-6">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <h3 className="font-semibold text-foreground">Naturezas de Despesa</h3>
            <InfoDrawer title="Naturezas de Despesa" triggerLabel="Saiba mais">
              <NaturezasDespesaContent />
            </InfoDrawer>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md data-code">
                  441
                </span>
                <span className="font-bold text-foreground">Natureza 441</span>
              </div>
              <p className="text-sm text-muted-foreground">Material de Consumo</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border-l-4 border-l-success">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-success text-success-foreground font-bold text-sm shadow-md data-code">
                  435
                </span>
                <span className="font-bold text-foreground">Natureza 435</span>
              </div>
              <p className="text-sm text-muted-foreground">Serviços de Terceiros</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-[hsl(210,60%,50%)]/10 to-[hsl(210,60%,50%)]/5 rounded-xl border-l-4 border-l-[hsl(210,60%,50%)]">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(210,60%,50%)] text-primary-foreground font-bold text-sm shadow-md data-code">
                  434
                </span>
                <span className="font-bold text-foreground">Natureza 434</span>
              </div>
              <p className="text-sm text-muted-foreground">Outros Serviços</p>
            </div>
          </div>
        </div>

        {/* Excel Note with Download Button */}
        <div className="section-card p-5 sm:p-6 border border-success/30 bg-gradient-to-br from-success/5 to-transparent">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 rounded-xl bg-success/10 shrink-0">
              <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Planilha de Apoio</h3>
              <p className="text-muted-foreground text-sm sm:text-base text-justified leading-relaxed mb-4">
                O documento original editável em formato Excel (MAPA DE DESPESAS - NATUREZAS 435-441-434.xlsx) 
                segue como anexo a este POP para facilitar o preenchimento e adaptação às necessidades 
                de cada unidade escolar.
              </p>
              
              <a
                href="https://rioeduca-my.sharepoint.com/:x:/g/personal/wilson_mpeixoto_rioeduca_net/IQAgPn37Ap6PR4fGjfFcFY_3AZ7erJVwGFF7TvO5QrjTxTU?e=bSMVpy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl transition-all duration-300 gap-2">
                  <Download className="w-4 h-4" />
                  Baixar Modelo Editável (Excel)
                </Button>
              </a>
              
              <p className="text-xs text-muted-foreground mt-3">
                Clique para abrir o arquivo no SharePoint e baixar o modelo editável
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
