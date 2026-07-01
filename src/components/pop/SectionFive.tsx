import {
  AlertCircle,
  CheckCircle2,
  FileCheck,
  FileText,
  FolderTree,
  PenLine,
  Send,
} from "lucide-react";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";
import { InfoDrawer, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";
import { ProfileCallout } from "./ProfileCallout";
import { SeiMockup } from "./SeiMockup";

const gadCodes = [
  { code: "10714", name: "E/1a.CRE/GAD", highlight: false },
  { code: "10719", name: "E/2a.CRE/GAD", highlight: false },
  { code: "10724", name: "E/3a.CRE/GAD", highlight: false },
  { code: "10729", name: "E/4a.CRE/GAD", highlight: true },
  { code: "10734", name: "E/5a.CRE/GAD", highlight: false },
  { code: "10739", name: "E/6a.CRE/GAD", highlight: false },
  { code: "10709", name: "E/10a.CRE/GAD", highlight: false },
] as const;

const signedDocuments = [
  "Ofício de encaminhamento da unidade escolar",
  "Despacho de encaminhamento da prestação de contas",
  "Outras peças internas emitidas no próprio SEI!RIO, quando exigirem assinatura",
] as const;

const excludedDocuments = [
  "Notas fiscais, extratos, atas e demais documentos externos",
  "Documentos nato-digitais juntados como original",
  "Documentos digitalizados já autenticados na etapa anterior",
] as const;

export const SectionFive = () => {
  return (
    <section className="scroll-mt-20 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="section-number">5</div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Bloco de Assinatura
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Criação do bloco, despacho de encaminhamento, conferência final e remessa
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="section-card border-l-[3px] border-l-primary/75">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0">
              <PenLine className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="content-spacing">
              <h3 className="section-heading">5.1. O que é o Bloco de Assinatura</h3>
              <p>
                O Bloco de Assinatura é a funcionalidade do SEI!RIO usada para reunir documentos internos que precisam de assinatura eletrônica.
                Ele pode ser usado tanto para assinatura em lote na própria unidade quanto para disponibilização a outra unidade quando o fluxo exigir.
              </p>
              <p>
                <strong className="text-foreground">Regra fundamental:</strong> somente documentos internos do SEI!RIO entram no bloco.
                Documentos externos não são assinados no bloco; eles são juntados ao processo e, quando digitalizados, passam pela autenticação administrativa na etapa própria.
              </p>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">5.2. Como montar o Bloco de Assinatura</h3>
          <div className="content-spacing">
            <p>
              Com o processo aberto, use a ação de inclusão em bloco de assinatura a partir de um dos documentos internos que ainda precisa ser assinado.
              Se ainda não houver bloco criado, crie um novo bloco, preencha a descrição e salve. Depois, inclua os demais documentos internos necessários.
            </p>
            <p>
              Se o bloco for usado apenas para assinatura em lote na própria unidade, ele pode seguir sem disponibilização a outra unidade.
              Se a assinatura depender de outra unidade, aí sim o bloco deve ser disponibilizado ao destino correspondente.
            </p>
            <p>
              Em termos práticos: se a assinatura ficar na própria unidade, conclua as assinaturas no próprio bloco e avance para a conferência final.
              Se depender de outra unidade, disponibilize o bloco, acompanhe o retorno e só prossiga depois que todas as assinaturas obrigatórias estiverem concluídas.
            </p>
            <Callout variant="info" title="Sugestão de descrição do bloco">
              <code className="block rounded-lg border border-border bg-card px-4 py-3 text-sm data-code text-foreground break-all">
                Assinatura — Prestação de Contas PDDE — Exercício AAAA — Nome da Escola
              </code>
            </Callout>

            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-3">Exemplo ilustrativo do bloco:</p>
              <SeiMockup variant="signature-block" />
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">5.3. Quais documentos incluir no Bloco</h3>

          <div className="grid gap-4 lg:grid-cols-2">
            <Callout variant="success" title="Entram no bloco">
              <ul className="space-y-2">
                {signedDocuments.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-1 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Callout>

            <Callout variant="warning" title="Não entram no bloco">
              <ul className="space-y-2">
                {excludedDocuments.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-1 text-warning" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Callout>
          </div>

          <div className="mt-5">
            <InfoDrawer title="Assinatura x autenticação" triggerLabel="Diferença funcional">
              <AutenticacaoVsAssinaturaContent />
            </InfoDrawer>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">5.4. Como acompanhar as assinaturas</h3>
          <div className="content-spacing">
            <p>
              Depois de incluir os documentos no bloco, acompanhe o seu estado até a conclusão das assinaturas.
              Se o bloco tiver sido disponibilizado, o sistema indicará esse estado. Quando a assinatura em lote for feita na própria unidade, o acompanhamento ocorre no próprio bloco.
            </p>
            <p>
              <strong className="text-foreground">Regra de procedimento:</strong> não remeta o processo enquanto houver assinatura pendente em documento interno obrigatório.
            </p>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">5.5. Despacho de Encaminhamento</h3>
          <div className="content-spacing">
            <p>
              O Despacho de Encaminhamento é o documento interno que formaliza o envio da prestação de contas à GAD.
              Aqui, o foco é registrar corretamente a peça no processo, e não ensinar em profundidade toda a elaboração material da prestação de contas.
            </p>

            <div className="space-y-4 timeline-steps">
              {[
                {
                  step: "1",
                  title: "Incluir Documento",
                  text: "Clique no ícone Incluir Documento na barra de ferramentas do processo.",
                },
                {
                  step: "2",
                  title: "Selecionar o tipo documental padronizado",
                  text: "Escolha o tipo de documento de encaminhamento da prestação de contas disponível no ambiente.",
                },
                {
                  step: "3",
                  title: "Preencher a especificação",
                  text: "Siga o formato padronizado da unidade, sempre com o exercício de referência.",
                },
                {
                  step: "4",
                  title: "Assinar e conferir na árvore",
                  text: "Assine eletronicamente o despacho e confirme que ele apareceu corretamente na árvore do processo.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-5 bg-muted/50 rounded-xl timeline-step">
                  <div className="step-indicator shrink-0 text-sm">{item.step}</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Callout variant="info" title="Formato de especificação">
              <code className="block rounded-lg border border-border bg-card px-4 py-3 text-sm data-code text-foreground break-all">
                PDDE — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA ESCOLA
              </code>
            </Callout>

            <div className="space-y-4">
              <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                <table className="table-institutional text-sm w-full">
                  <thead>
                    <tr>
                      <th className="rounded-tl-lg">Saldos e Movimentações</th>
                      <th className="text-right w-32 rounded-tr-lg">Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-muted-foreground">Saldo total inicial em DD/MM/AAAA</td>
                      <td className="text-right data-code">—</td>
                    </tr>
                    <tr>
                      <td className="pl-6 sm:pl-8 text-muted-foreground">Saldo Custeio</td>
                      <td className="text-right data-code">—</td>
                    </tr>
                    <tr>
                      <td className="pl-6 sm:pl-8 text-muted-foreground">Saldo Capital</td>
                      <td className="text-right data-code">—</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground">Total dos Créditos (repasses)</td>
                      <td className="text-right data-code">—</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground">Despesas realizadas</td>
                      <td className="text-right data-code">—</td>
                    </tr>
                    <tr className="font-semibold bg-accent/10">
                      <td className="text-foreground">Saldo total final em DD/MM/AAAA</td>
                      <td className="text-right data-code">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Callout variant="info" title="Nota de preenchimento">
                <p>
                  Preencha a tabela com os valores reais do exercício, extraídos dos extratos bancários e dos demonstrativos pertinentes.
                </p>
              </Callout>

              <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                <p className="mb-3 text-sm font-semibold text-foreground">
                  Exemplo ilustrativo <span className="font-normal text-muted-foreground">(valores fictícios — não utilizar como referência real)</span>
                </p>
                <table className="table-institutional text-sm w-full">
                  <thead>
                    <tr>
                      <th className="rounded-tl-lg">Saldos e Movimentações</th>
                      <th className="text-right w-32 rounded-tr-lg">Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-muted-foreground">Saldo total inicial em 01/01/2025</td>
                      <td className="text-right data-code">1.247,53</td>
                    </tr>
                    <tr>
                      <td className="pl-6 sm:pl-8 text-muted-foreground">Saldo Custeio</td>
                      <td className="text-right data-code">982,18</td>
                    </tr>
                    <tr>
                      <td className="pl-6 sm:pl-8 text-muted-foreground">Saldo Capital</td>
                      <td className="text-right data-code">265,35</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground">Total dos Créditos (repasses)</td>
                      <td className="text-right data-code">8.550,00</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground">Despesas realizadas</td>
                      <td className="text-right data-code">9.134,26</td>
                    </tr>
                    <tr className="font-semibold bg-accent/10">
                      <td className="text-foreground">Saldo total final em 31/12/2025</td>
                      <td className="text-right data-code">663,27</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">5.6. Conferência final e remessa à GAD</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl">
              <div className="step-indicator shrink-0 bg-success text-sm">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Checklist pré-envio</h4>
                <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <li>Todos os documentos exigidos estão na árvore, com identificação clara.</li>
                  <li>Os documentos digitalizados foram autenticados quando cabível.</li>
                  <li>Todos os documentos internos obrigatórios já foram assinados.</li>
                  <li>O despacho de encaminhamento está assinado e visível na árvore.</li>
                  <li>Os valores do despacho são coerentes com a documentação financeira juntada.</li>
                </ul>

                <div className="mt-4">
                  <SeiMockup variant="process-tree" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="font-semibold text-foreground">Remessa à GAD</h4>
                  <InfoDrawer title="Códigos das GADs" triggerLabel="Ver outros códigos">
                    <div className="space-y-2">
                      {gadCodes.map((gad) => (
                        <div
                          key={gad.code}
                          className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm ${
                            gad.highlight
                              ? "border-primary/30 bg-primary/8 text-foreground"
                              : "border-border/50 bg-card text-foreground"
                          }`}
                        >
                          <span className={gad.highlight ? "font-semibold" : ""}>
                            {gad.code} - {gad.name}
                          </span>
                          <CopyButton
                            text={`${gad.code} - ${gad.name}`}
                            label="Código copiado!"
                            className={gad.highlight ? "hover:bg-primary/10" : ""}
                          />
                        </div>
                      ))}
                    </div>
                  </InfoDrawer>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Depois da conferência completa, clique no ícone de envio e selecione a unidade de destino da 4ª CRE.
                </p>

                <div className="mt-4 bg-card p-4 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm data-code text-primary break-all font-semibold">
                      10729 - Gerência de Administração (E/4a.CRE/GAD)
                    </code>
                    <CopyButton text="10729 - Gerência de Administração (E/4a.CRE/GAD)" label="Código copiado!" />
                  </div>
                  <p className="text-xs text-primary flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3" />
                    Certifique-se de selecionar a GAD da 4ª CRE
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="highlight-box mt-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">Alerta pré-envio</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Após a remessa, ajustes no processo poderão depender de devolução ou nova atuação da GAD.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ProfileCallout visibleFor="diretor" variant="success">
          <p>Antes de enviar, peça a um colega que revise a árvore do processo. Um segundo par de olhos ajuda a evitar retrabalho.</p>
        </ProfileCallout>

        <ProfileCallout visibleFor="gad" variant="warning">
          <p>Na conferência do processo recebido, verifique: ordem das peças, autenticação dos documentos digitalizados, assinaturas dos documentos internos e coerência dos valores informados.</p>
        </ProfileCallout>
      </div>
    </section>
  );
};
