import {
  AlertCircle,
  CheckCircle2,
  FolderTree,
  PenLine,
  Send,
} from "lucide-react";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";
import { InfoDrawer, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";
import { ProfileCallout } from "./ProfileCallout";
import { SeiMockup } from "./SeiMockup";
import { AnimatedReveal } from "./AnimatedReveal";

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
    <section className="space-y-6">
      <AnimatedReveal delay={50} duration={600}>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-extrabold text-white shadow-sm">
            5
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
              Bloco de Assinatura
            </h2>
            <p className="text-sm text-muted-foreground">
              Criação do bloco, despacho de encaminhamento, conferência final e remessa
            </p>
          </div>
        </div>
      </AnimatedReveal>

      <div className="space-y-6">
        <AnimatedReveal delay={100} duration={650}>
          <div className="section-card border-l-4 border-l-primary" style={{ borderLeftWidth: "4px" }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/8 text-primary border border-primary/15 shrink-0">
                <PenLine className="w-5.5 h-5.5" />
              </div>
              <div className="content-spacing flex-1 min-w-0">
                <h3 className="font-heading text-lg font-bold text-foreground">5.1. O que é o Bloco de Assinatura</h3>
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
        </AnimatedReveal>

        <AnimatedReveal delay={150} duration={650}>
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
                <code className="block rounded-lg border border-border/60 bg-background/55 px-4 py-3 text-sm data-code text-foreground break-all">
                  Assinatura — Prestação de Contas PDDE — Exercício AAAA — Nome da Escola
                </code>
              </Callout>

              <div className="mt-6 border-t border-border/30 pt-6">
                <p className="text-sm font-bold text-foreground mb-3 font-heading">Exemplo ilustrativo do bloco:</p>
                <SeiMockup variant="signature-block" />
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={200} duration={650}>
          <div className="section-card">
            <h3 className="section-heading">5.3. Quais documentos incluir no Bloco</h3>

            <div className="grid gap-4 lg:grid-cols-2">
              <Callout variant="success" title="Entram no bloco">
                <ul className="space-y-2">
                  {signedDocuments.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.88rem]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-1 text-success animate-pulse" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Callout>

              <Callout variant="danger" title="Não entram no bloco">
                <ul className="space-y-2">
                  {excludedDocuments.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.88rem]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-1 text-destructive animate-pulse" />
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
        </AnimatedReveal>

        <AnimatedReveal delay={250} duration={650}>
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
        </AnimatedReveal>

        <AnimatedReveal delay={300} duration={655}>
          <div className="section-card">
            <h3 className="section-heading">5.5. Despacho de Encaminhamento</h3>
            <div className="content-spacing">
              <p>
                O Despacho de Encaminhamento é o documento interno que formaliza o envio da prestação de contas à GAD.
                Aqui, o fluxo é registrar corretamente a peça no processo, e não ensinar em profundidade toda a elaboração material da prestação de contas.
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
                  <div key={item.step} className="flex items-start gap-4 p-5 bg-card border border-border/50 rounded-xl timeline-step shadow-xs" style={{ boxShadow: "var(--shadow-card-rest)" }}>
                    <div className="step-indicator shrink-0 text-sm font-extrabold">{item.step}</div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Callout variant="info" title="Formato de especificação">
                <code className="block rounded-lg border border-border/60 bg-background/55 px-4 py-3 text-sm data-code text-foreground break-all">
                  PDDE — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA ESCOLA
                </code>
              </Callout>

              <div className="space-y-5 border-t border-border/30 pt-6 mt-6">
                <div className="overflow-x-auto">
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
                      <tr className="font-semibold bg-accent/8">
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

                <div className="overflow-x-auto pt-4">
                  <p className="mb-3 text-sm font-bold text-foreground font-heading">
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
                      <tr className="font-semibold bg-accent/8">
                        <td className="text-foreground">Saldo total final em 31/12/2025</td>
                        <td className="text-right data-code">663,27</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={350} duration={650}>
          <div className="section-card">
            <h3 className="section-heading">5.6. Conferência final e remessa à GAD</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-card to-secondary/45 rounded-xl border border-border/50">
                <div className="step-indicator shrink-0 bg-success text-sm font-extrabold shadow-sm">
                  <FolderTree className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground font-heading mb-2">Checklist pré-envio</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <li className="relative pl-4 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">Todos os documentos exigidos estão na árvore, com identificação clara.</li>
                    <li className="relative pl-4 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">Os documentos digitalizados foram autenticados quando cabível.</li>
                    <li className="relative pl-4 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">Todos os documentos internos obrigatórios já foram assinados.</li>
                    <li className="relative pl-4 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">O despacho de encaminhamento está assinado e visível na árvore.</li>
                    <li className="relative pl-4 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">Os valores do despacho são coerentes com a documentação financeira juntada.</li>
                  </ul>

                  <div className="mt-4 border-t border-border/30 pt-4">
                    <SeiMockup variant="process-tree" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                <div className="p-3 rounded-xl bg-primary/8 text-primary border border-primary/15 shrink-0">
                  <Send className="w-5.5 h-5.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="font-bold text-foreground font-heading">Remessa à GAD</h4>
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
                            <span className={gad.highlight ? "font-bold" : ""}>
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

                  <div className="mt-4 bg-card p-4 rounded-xl border border-border/50 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-sm data-code text-primary break-all font-semibold">
                        10729 - Gerência de Administração (E/4a.CRE/GAD)
                      </code>
                      <CopyButton text="10729 - Gerência de Administração (E/4a.CRE/GAD)" label="Código copiado!" />
                    </div>
                    <p className="text-xs text-primary flex items-center gap-1.5 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Certifique-se de selecionar a GAD da 4ª CRE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="highlight-box mt-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5.5 h-5.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground font-heading mb-1">Alerta pré-envio</p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Após a remessa, ajustes no processo poderão depender de devolução ou nova atuação da GAD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={400} duration={650}>
          <div className="grid gap-4 md:grid-cols-2">
            <ProfileCallout visibleFor="diretor" variant="success">
              <p>Antes de enviar, peça a um colega que revise a árvore do processo. Um segundo par de olhos ajuda a evitar retrabalho.</p>
            </ProfileCallout>

            <ProfileCallout visibleFor="gad" variant="warning">
              <p>Na conferência do processo recebido, verifique: ordem das peças, autenticação dos documentos digitalizados, assinaturas dos documentos internos e coerência dos valores informados.</p>
            </ProfileCallout>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};
