import {
  AlertCircle,
  ExternalLink,
  FileImage,
  FileText,
  FolderTree,
  Upload,
} from "lucide-react";
import { SectionLead } from "@/components/visual/SectionLead";
import { SystemCommandPreview } from "@/components/visual/SystemCommandPreview";
import { externalResources } from "@/lib/externalResources";
import { Callout } from "./Callout";

const classificationRows = [
  {
    label: "Origem",
    digitalizado: "Arquivo produzido a partir da digitalização de documento em papel.",
    natoDigital: "Arquivo criado ou recebido originalmente em meio eletrônico.",
  },
  {
    label: "Exemplos",
    digitalizado: "Ata assinada em papel, recibo físico ou nota impressa e posteriormente escaneada.",
    natoDigital: "NF-e, extrato bancário baixado, comprovante eletrônico ou PDF emitido por sistema oficial.",
  },
  {
    label: "Registro no SEI!RIO",
    digitalizado: "Digitalizado nesta unidade.",
    natoDigital: "Documento externo juntado como original eletrônico.",
  },
  {
    label: "Tipo de conferência",
    digitalizado: "Deve refletir o documento apresentado: original, cópia autenticada ou cópia simples.",
    natoDigital: "Não recebe conferência de documento em papel.",
  },
] as const;

const conferenceTypes = [
  "Documento original",
  "Cópia autenticada administrativamente",
  "Cópia autenticada por cartório",
  "Cópia simples",
] as const;

const inclusionSteps = [
  {
    title: "Acessar Incluir Documento",
    description: "Com o processo aberto, utilize o comando de inclusão disponível na barra de ferramentas.",
  },
  {
    title: "Selecionar Documento Externo",
    description: "Escolha essa opção quando a peça não tiver sido produzida dentro do próprio SEI!RIO.",
  },
  {
    title: "Preencher os metadados",
    description: "Informe o tipo adequado, número e data quando constarem do documento e um nome claro para a árvore.",
  },
  {
    title: "Anexar e conferir",
    description: "Selecione o arquivo, revise os campos e confirme se a peça apareceu corretamente no processo.",
  },
] as const;

const attachmentCare = [
  {
    title: "Uma peça por arquivo",
    description: "Separe documentos diferentes quando cada um puder ser identificado individualmente na árvore.",
  },
  {
    title: "Nome descritivo",
    description: "Identifique tipo, emissor, referência e período quando essas informações forem necessárias.",
  },
  {
    title: "Metadados verificáveis",
    description: "Preencha número e data somente quando essas informações constarem da própria peça.",
  },
  {
    title: "Legibilidade",
    description: "Confirme se todas as páginas estão completas, orientadas corretamente e com leitura possível.",
  },
] as const;

export const SectionThree = () => (
  <section className="space-y-8 editorial-section" data-editorial-section="external-documents">
    <SectionLead
      step="3"
      eyebrow="Juntada no SEI!RIO"
      title="Inclua cada documento com classificação e identificação adequadas"
      description="Esta etapa trata exclusivamente da inclusão dos arquivos externos. A distinção entre documento digitalizado e nato-digital deve ser definida aqui, pois ela determinará se haverá autenticação na etapa seguinte."
      icon={Upload}
    />

    <section className="section-card editorial-block" data-editorial-role="comparison" aria-labelledby="external-document-definition-title">
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="blue">
          <FileText aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Critério de classificação</p>
          <h3 id="external-document-definition-title">Documento externo e classificação do arquivo</h3>
          <p>
            Documento externo é a peça que não foi produzida diretamente no SEI!RIO. Antes da juntada, identifique se o arquivo nasceu em papel e foi digitalizado ou se já foi criado e recebido em meio eletrônico.
          </p>
        </div>
      </header>

      <div className="editorial-source-links" aria-label="Fundamentos da classificação documental">
        <a href={externalResources.decreto8539_2015.href} target="_blank" rel="noopener noreferrer">
          Decreto nº 8.539/2015
          <ExternalLink aria-hidden="true" />
        </a>
        <a href={externalResources.decretoProcessoRio_47769_2020.href} target="_blank" rel="noopener noreferrer">
          Decreto Rio nº 47.769/2020
          <ExternalLink aria-hidden="true" />
        </a>
      </div>

      <div className="editorial-comparison-table">
        <table className="table-institutional min-w-[42rem]">
          <thead>
            <tr>
              <th>Critério</th>
              <th>
                <span className="inline-flex items-center gap-2">
                  <FileImage className="h-4 w-4" aria-hidden="true" />
                  Digitalizado
                </span>
              </th>
              <th>
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Nato-digital
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {classificationRows.map((row) => (
              <tr key={row.label}>
                <td className="font-semibold text-foreground">{row.label}</td>
                <td>{row.digitalizado}</td>
                <td>{row.natoDigital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="editorial-context-grid">
        <article data-tone="blue">
          <span>Documento digitalizado</span>
          <h4>Tipos de conferência admitidos</h4>
          <ul>
            {conferenceTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </article>
        <Callout variant="info" icon={AlertCircle} title="Síntese operacional">
          <p>
            Papel escaneado é documento digitalizado. Arquivo criado ou recebido eletronicamente é nato-digital. Essa classificação deve ser definida antes de avançar para a autenticação.
          </p>
        </Callout>
      </div>
    </section>

    <section className="section-card editorial-block" data-editorial-role="process" aria-labelledby="external-document-procedure-title">
      <header className="editorial-block__heading editorial-block__heading--compact">
        <div>
          <p className="editorial-block__eyebrow">Fluxo operacional</p>
          <h3 id="external-document-procedure-title">Procedimento de inclusão</h3>
          <p>A sequência abaixo preserva ordem, metadados e conferência final do arquivo inserido.</p>
        </div>
      </header>

      <ol className="editorial-process-list">
        {inclusionSteps.map((step, index) => (
          <li key={step.title} className="editorial-process-step">
            <span className="editorial-process-step__number">{index + 1}</span>
            <div className="editorial-process-step__content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
              {index === 0 ? (
                <figure className="editorial-system-reference">
                  <SystemCommandPreview variant="include-document" />
                  <figcaption>Referência vetorial do comando na barra de ações do processo.</figcaption>
                </figure>
              ) : null}
              {index === 1 ? (
                <figure className="editorial-system-reference editorial-system-reference--wide">
                  <SystemCommandPreview variant="external-document" />
                  <figcaption>Selecione Documento Externo quando a peça não tiver sido produzida no SEI!RIO.</figcaption>
                </figure>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="section-card editorial-block" data-editorial-role="control" aria-labelledby="attachment-quality-title">
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="teal">
          <FolderTree aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Controle e encontrabilidade</p>
          <h3 id="attachment-quality-title">Qualidade da árvore documental</h3>
          <p>A árvore deve permitir que qualquer pessoa identifique a peça sem abrir vários arquivos para descobrir seu conteúdo.</p>
        </div>
      </header>
      <div className="editorial-control-grid">
        {attachmentCare.map((item, index) => (
          <article key={item.title} data-index={index + 1}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  </section>
);