import {
  Banknote,
  ClipboardList,
  FileCheck2,
  Landmark,
  PackageCheck,
  ReceiptText,
} from "lucide-react";
import { SourceCitation } from "@/components/legal/SourceCitation";
import { IconTile } from "@/components/visual/IconTile";

const documentGroups = [
  {
    title: "Planejamento e aprovação das prioridades",
    description: "Documentos que demonstram o que foi priorizado, como a decisão foi aprovada e de que forma os preços foram pesquisados.",
    icon: ClipboardList,
    tone: "blue",
    items: [
      {
        name: "Rol de materiais, bens e serviços prioritários",
        purpose: "Registra as necessidades definidas para utilização dos recursos do programa ou da ação.",
      },
      {
        name: "Ata de aprovação do plano de gastos",
        purpose: "Demonstra que as prioridades e o planejamento foram apreciados e aprovados pelo colegiado competente.",
      },
      {
        name: "Consolidação da pesquisa de preços ou justificativa cabível",
        purpose: "Evidencia a comparação realizada, a escolha do fornecedor e eventual justificativa para quantidade inferior de propostas ou utilização documentada de registro de preços.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["23", "27", "33"] },
  },
  {
    title: "Movimentação financeira e posição da conta",
    description: "Documentos que permitem reconstruir entradas, aplicações, pagamentos e saldos do exercício.",
    icon: Landmark,
    tone: "teal",
    items: [
      {
        name: "Demonstrativo ou registro federal aplicável ao exercício",
        purpose: "Consolida a execução financeira conforme o sistema e o procedimento federal aplicáveis ao período analisado.",
      },
      {
        name: "Extratos da conta específica",
        purpose: "Comprovam os créditos, pagamentos, transferências e saldos da conta vinculada ao recurso.",
      },
      {
        name: "Extratos das aplicações financeiras",
        purpose: "Comprovam rendimentos, resgates e movimentações dos valores aplicados.",
      },
      {
        name: "Conciliação bancária, quando aplicável",
        purpose: "Explica diferenças entre registros e saldo bancário quando houver saldo em 31 de dezembro ou outra situação que exija conciliação.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["24", "33"] },
  },
  {
    title: "Comprovação das despesas",
    description: "Peças que demonstram o objeto adquirido ou contratado, o pagamento e a relação da despesa com o planejamento aprovado.",
    icon: ReceiptText,
    tone: "amber",
    items: [
      {
        name: "Documentos comprobatórios da destinação dos recursos",
        purpose: "Incluem notas fiscais, recibos válidos, comprovantes de pagamento e demais documentos necessários para demonstrar a despesa.",
      },
      {
        name: "Ata de aprovação da execução do plano de gastos",
        purpose: "Registra a apreciação da execução e das contas pelo colegiado, conforme o procedimento aplicável.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["26", "33"] },
  },
  {
    title: "Patrimônio, quando houver bem permanente",
    description: "Documentação adicional exigida somente quando a execução envolver aquisição de bens permanentes.",
    icon: PackageCheck,
    tone: "violet",
    items: [
      {
        name: "Documentação patrimonial cabível",
        purpose: "Comprova a doação, incorporação, identificação e controle do bem, conforme o procedimento patrimonial formalmente vigente.",
      },
    ],
    reference: { sourceId: "resolution15_2021", articles: ["47"] },
  },
] as const;

const localItems = [
  "Peça de encaminhamento local, quando formalmente exigida",
  "Documentos internos assinados no SEI!RIO",
  "Autenticação dos documentos efetivamente digitalizados",
  "Identificação clara de cada peça na árvore do processo",
  "Outras peças formalmente requeridas pela SME-Rio ou pela CRE",
] as const;

export const InstructionDocumentGuide = () => (
  <section className="section-card editorial-block" data-editorial-role="evidence" aria-labelledby="instruction-documents-title">
    <header className="editorial-block__heading">
      <IconTile icon={FileCheck2} size="lg" />
      <div>
        <p className="editorial-block__eyebrow">Antes da conferência</p>
        <h3 id="instruction-documents-title">O que cada grupo documental demonstra</h3>
        <p>
          A instrução não deve começar pela simples marcação de uma lista. Primeiro, identifique a função de cada peça e verifique se ela se aplica ao exercício, à ação e à despesa analisada.
        </p>
      </div>
    </header>

    <div className="document-function-grid">
      {documentGroups.map((group) => {
        const Icon = group.icon;
        return (
          <article key={group.title} className="document-function-card" data-tone={group.tone}>
            <header className="document-function-card__header">
              <IconTile icon={Icon} size="md" />
              <div>
                <span>Função documental</span>
                <h4>{group.title}</h4>
                <p>{group.description}</p>
              </div>
            </header>

            <dl className="document-function-card__list">
              {group.items.map((item) => (
                <div key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{item.purpose}</dd>
                </div>
              ))}
            </dl>

            <footer className="document-function-card__source">
              <span>Fundamento</span>
              <SourceCitation reference={group.reference} />
            </footer>
          </article>
        );
      })}
    </div>

    <aside className="editorial-scope-band" aria-label="Peças complementares do processo local">
      <div className="editorial-scope-band__heading">
        <Banknote aria-hidden="true" />
        <div>
          <span>Escopo e aplicabilidade</span>
          <h4>Peças complementares do processo local</h4>
        </div>
      </div>
      <p>
        Além da base federal, o processo pode exigir peças administrativas do SEI!RIO. Elas não devem ser confundidas com o rol documental federal e só devem ser tratadas como obrigatórias quando houver orientação formal vigente.
      </p>
      <ul>
        {localItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  </section>
);
