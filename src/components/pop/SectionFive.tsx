import { AlertCircle, CircleCheck, FileCheck, FolderTree, PenTool, Users } from "lucide-react";
import { Callout } from "./Callout";
import { InfoDrawer, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";
import { ProfileCallout } from "./ProfileCallout";
import { SeiMockup } from "./SeiMockup";

const blockDocuments = [
  "Ofício de encaminhamento da escola gerado no SEI!RIO",
  "Despachos ou declarações internas produzidas pela unidade",
  "Qualquer outra peça interna que exija assinatura eletrônica antes da remessa",
];

const externalDocuments = [
  "Notas fiscais, DANFE, recibos e comprovantes de pagamento",
  "Atas, extratos bancários e demais documentos apenas digitalizados",
  "Arquivos externos já autenticados ou nato-digitais recebidos de outros sistemas",
];

const finalChecks = [
  "Todos os documentos internos do bloco retornaram assinados",
  "Documentos externos permanecem corretamente autenticados, sem entrar no bloco",
  "A árvore do processo está organizada e sem duplicidades antes da remessa",
];

export const SectionFive = () => {
  return (
    <section id="secao-5" className="scroll-mt-20 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="section-number">5</div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Bloco de Assinatura
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Criação do bloco, assinatura da unidade escolar e conferência final antes da remessa
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="section-card p-5 sm:p-6 border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0">
              <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">O objetivo desta etapa</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-justify">
                Depois que toda a documentação estiver inserida e autenticada, a unidade escolar deve
                concluir as <strong className="text-foreground">peças internas</strong> do processo e
                disponibilizá-las em bloco para assinatura eletrônica. O foco aqui não é anexar novos PDFs,
                e sim <strong className="text-foreground">garantir a assinatura correta do que foi produzido
                dentro do SEI!RIO</strong>.
              </p>
            </div>
          </div>
        </div>

        <Callout variant="warning" title="Regra-chave desta etapa">
          No bloco de assinatura entram apenas <strong className="text-foreground">documentos internos</strong>.
          Documentos externos permanecem fora do bloco e, quando digitalizados, devem estar
          <strong className="text-foreground"> autenticados</strong>.
        </Callout>

        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-5">5.1. Montagem e disponibilização do bloco</h3>

          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Criar o bloco no processo",
                description:
                  "Abra o processo no SEI!RIO, crie um bloco de assinatura vinculado aos autos e dê um nome que facilite a conferência pela unidade escolar.",
              },
              {
                step: "2",
                title: "Adicionar apenas as peças internas",
                description:
                  "Inclua no bloco somente documentos produzidos dentro do SEI!RIO, como ofícios e despachos. PDFs externos não devem ser enviados para assinatura eletrônica.",
              },
              {
                step: "3",
                title: "Disponibilizar e acompanhar o retorno",
                description:
                  "Envie o bloco para a unidade escolar responsável e acompanhe a devolução até que todas as assinaturas estejam concluídas antes da remessa à GAD.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed text-justify">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="section-card p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-success/10">
                <FileCheck className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Entram no bloco</h3>
            </div>

            <div className="space-y-3">
              {blockDocuments.map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-success/5 border border-success/20">
                  <CircleCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-foreground">Ficam fora do bloco</h3>
            </div>

            <div className="space-y-3">
              {externalDocuments.map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-card p-5 sm:p-6">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <h3 className="font-semibold text-foreground">5.2. Conferência antes da remessa</h3>
            <InfoDrawer title="Assinatura vs Autenticação" triggerLabel="Entenda a diferença">
              <AutenticacaoVsAssinaturaContent />
            </InfoDrawer>
          </div>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed text-justify">
            Assim que a unidade escolar devolver o bloco concluído, faça uma última leitura da árvore do
            processo. O ideal é que os documentos internos apareçam como assinados e que os documentos
            externos permaneçam organizados, legíveis e autenticados quando necessário.
          </p>

          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-4 items-start">
            <div className="min-w-0">
              <SeiMockup variant="process-tree" />
            </div>

            <div className="space-y-3">
              {finalChecks.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15">
                  <FolderTree className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProfileCallout visibleFor="diretor" variant="success">
          <p>
            Antes de liberar a remessa, confira se o bloco voltou totalmente assinado pela unidade e se o
            ofício interno aparece corretamente na árvore do processo.
          </p>
        </ProfileCallout>

        <ProfileCallout visibleFor="gad" variant="warning">
          <p>
            Ao receber o processo, verifique se a escola utilizou o bloco apenas para peças internas.
            Quando nota fiscal ou ata digitalizada aparece como documento assinado, isso costuma indicar
            uso incorreto do fluxo.
          </p>
        </ProfileCallout>

        <Callout variant="info" title="Pronto para a próxima etapa" icon={Users}>
          Se a árvore estiver íntegra, as autenticações válidas e o bloco concluído, o processo já pode
          seguir para a <strong className="text-foreground">remessa à GAD/4ª CRE</strong>.
        </Callout>
      </div>
    </section>
  );
};
