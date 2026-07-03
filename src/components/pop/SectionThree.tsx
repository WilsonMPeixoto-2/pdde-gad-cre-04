import {
  AlertCircle,
  ExternalLink,
  FileImage,
  FileText,
  FolderTree,
  Upload,
} from "lucide-react";
import seiChooseDocType from "@/assets/sei-choose-doc-type.png";
import seiIncludeDocIcon from "@/assets/sei-include-doc-icon.png";
import { SectionLead } from "@/components/visual/SectionLead";
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
    digitalizado: "Documento externo classificado como digitalizado nesta unidade.",
    natoDigital: "Documento externo juntado como original eletrônico.",
  },
  {
    label: "Tipo de conferência",
    digitalizado: "Deve refletir o documento apresentado: original, cópia autenticada ou cópia simples.",
    natoDigital: "Não recebe conferência de documento em papel.",
  },
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
  <section className="space-y-8">
    <SectionLead
      step="3"
      eyebrow="Juntada no SEI!RIO"
      title="Inclua cada documento com classificação e identificação adequadas"
      description="Esta etapa trata exclusivamente da inclusão dos arquivos externos. A distinção entre documento digitalizado e nato-digital deve ser definida aqui, pois ela determinará se haverá autenticação na etapa seguinte."
      icon={Upload}
    />

    <section className="section-card" aria-labelledby="external-document-definition-title">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-sky-300">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 id="external-document-definition-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Documento externo e classificação do arquivo
          </h3>
          <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
            Documento externo é a peça que não foi produzida diretamente no SEI!RIO. Antes da juntada, identifique se o arquivo nasceu em papel e foi digitalizado ou se já foi criado e recebido em meio eletrônico.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
            <a
              href={externalResources.decreto8539_2015.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-foreground hover:border-blue-500 dark:border-slate-700 dark:bg-slate-900"
            >
              Decreto nº 8.539/2015
              <ExternalLink className="h-3.5 w-3.5 text-blue-800 dark:text-sky-300" aria-hidden="true" />
            </a>
            <a
              href={externalResources.decretoProcessoRio_47769_2020.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-foreground hover:border-blue-500 dark:border-slate-700 dark:bg-slate-900"
            >
              Decreto Rio nº 47.769/2020
              <ExternalLink className="h-3.5 w-3.5 text-blue-800 dark:text-sky-300" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
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
                <td className="text-slate-700 dark:text-slate-300">{row.digitalizado}</td>
                <td className="text-slate-700 dark:text-slate-300">{row.natoDigital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout variant="info" icon={AlertCircle} className="mt-5" title="Síntese operacional">
        <p className="text-sm leading-7">
          Papel escaneado é documento digitalizado. Arquivo criado ou recebido eletronicamente é nato-digital. Essa classificação deve ser definida antes de avançar para a autenticação.
        </p>
      </Callout>
    </section>

    <section className="section-card" aria-labelledby="external-document-procedure-title">
      <h3 id="external-document-procedure-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
        Procedimento de inclusão
      </h3>
      <div className="mt-6 space-y-4">
        {inclusionSteps.map((step, index) => (
          <article key={step.title} className="grid gap-4 rounded-xl border border-slate-300 bg-slate-50 p-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] dark:border-slate-700 dark:bg-slate-900/55">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
              {index + 1}
            </span>
            <div>
              <h4 className="text-base font-bold text-foreground">{step.title}</h4>
              <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-300">{step.description}</p>
              {index === 0 ? (
                <div className="mt-4 max-w-md rounded-lg border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
                  <img src={seiIncludeDocIcon} alt="Ícone Incluir Documento no SEI!RIO" className="h-10 w-auto object-contain" width={177} height={32} />
                </div>
              ) : null}
              {index === 1 ? (
                <div className="mt-4 max-w-2xl overflow-hidden rounded-lg border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
                  <img src={seiChooseDocType} alt="Seleção do tipo Documento Externo no SEI!RIO" className="max-h-[220px] w-auto object-contain" width={448} height={187} />
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="section-card" aria-labelledby="attachment-quality-title">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <FolderTree className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 id="attachment-quality-title" className="text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Qualidade da árvore documental
          </h3>
          <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
            A árvore deve permitir que qualquer pessoa identifique a peça sem abrir vários arquivos para descobrir seu conteúdo.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {attachmentCare.map((item) => (
          <article key={item.title} className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55">
            <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  </section>
);
