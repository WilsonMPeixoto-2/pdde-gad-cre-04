import {
  AlertCircle,
  ExternalLink,
  FileImage,
  FilePlus2,
  FileText,
  FolderTree,
  Upload,
} from "lucide-react";
import seiChooseDocType from "@/assets/sei-choose-doc-type.png";
import seiIncludeDocIcon from "@/assets/sei-include-doc-icon.png";
import { externalResources } from "@/lib/externalResources";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";

const classificationRows = [
  {
    label: "Origem",
    digitalizado: "Arquivo produzido a partir da digitalização de documento em papel.",
    natoDigital: "Arquivo criado ou recebido originalmente por meio eletrônico.",
  },
  {
    label: "Exemplos no processo",
    digitalizado: "Ata originalmente assinada em papel, recibo físico escaneado, nota impressa e digitalizada.",
    natoDigital: "NF-e ou DANFE recebido eletronicamente, extrato bancário baixado do banco, comprovante eletrônico, PDF emitido por sistema oficial.",
  },
  {
    label: "Como entra no SEI!RIO",
    digitalizado: "Documento Externo com formato Digitalizado nesta unidade.",
    natoDigital: "Documento Externo como original eletrônico.",
  },
  {
    label: "Tipo de conferência",
    digitalizado: "Informar documento original, cópia autenticada administrativamente, cópia autenticada por cartório ou cópia simples, conforme o documento apresentado.",
    natoDigital: "Não exige tipo de conferência de documento em papel.",
  },
];

const conferenceTypes = [
  "Documento original",
  "Cópia autenticada administrativamente",
  "Cópia autenticada por cartório",
  "Cópia simples",
] as const;

const attachmentCare = [
  {
    title: "Um arquivo, uma peça",
    description: "Evite juntar vários documentos diferentes no mesmo PDF quando eles puderem ser identificados separadamente na árvore.",
  },
  {
    title: "Nome na Árvore claro",
    description: "Use identificação que permita localizar a peça depois: tipo do documento, emissor ou referência e período quando necessário.",
  },
  {
    title: "Metadados sem improviso",
    description: "Preencha número e data apenas quando essas informações constarem do próprio documento.",
  },
  {
    title: "Legibilidade mínima",
    description: "Antes de anexar, confira se o PDF está legível e se todas as páginas importantes foram incluídas.",
  },
] as const;

export const SectionThree = () => {
  return (
    <section className="animate-fade-in space-y-5">
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a escola">
        Antes de anexar, nomeie o arquivo de forma descritiva. Isso facilita a conferência e evita
        árvore com peças genéricas demais.
      </ProfileCallout>

      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção — GAD">
        Confira se os documentos externos foram classificados corretamente e se o nome na árvore
        permite identificar a peça sem abrir vários arquivos.
      </ProfileCallout>

      <div className="section-card border-l-[3px] border-l-sky-500/75 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-xl bg-sky-100 p-3 dark:bg-sky-900/50">
            <Upload className="h-5 w-5 text-sky-600 dark:text-sky-400 sm:h-6 sm:w-6" />
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">3.1. Documento externo no processo</h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Documento externo é a peça que não foi produzida diretamente dentro do SEI!RIO e
              precisa ser juntada ao processo como elemento de instrução. Para a montagem correta
              dos autos, o ponto decisivo é classificar corretamente o formato do documento:
              <strong className="text-foreground"> nato-digital</strong> ou{" "}
              <strong className="text-foreground">digitalizado nesta unidade</strong>.
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href={externalResources.decreto8539_2015.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/12"
              >
                Decreto nº 8.539/2015
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={externalResources.decretoProcessoRio_47769_2020.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-800/40 dark:bg-sky-950/30 dark:text-sky-300"
              >
                Decreto Rio nº 47.769/2020
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card p-5 sm:p-6">
        <h3 className="mb-4 font-semibold text-foreground">
          3.2. Como classificar o formato do documento externo
        </h3>

        <div className="overflow-x-auto -mx-6 px-6 sm:-mx-8 sm:px-8">
          <table className="table-institutional min-w-[42rem]">
            <thead>
              <tr>
                <th>Critério</th>
                <th>
                  <span className="inline-flex items-center gap-2">
                    <FileImage className="h-4 w-4 text-sky-600" />
                    Digitalizado
                  </span>
                </th>
                <th>
                  <span className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-600" />
                    Nato-digital
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {classificationRows.map((row) => (
                <tr key={row.label}>
                  <td className="font-medium text-foreground">{row.label}</td>
                  <td className="text-muted-foreground">{row.digitalizado}</td>
                  <td className="text-muted-foreground">{row.natoDigital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout variant="info" icon={AlertCircle} className="mt-5">
          <p className="font-medium">Regra prática</p>
          <p className="mt-1 text-sm">
            Documento em papel escaneado entra como <strong>Digitalizado nesta unidade</strong>.
            Documento criado ou recebido por meio eletrônico entra como <strong>Nato-digital</strong>.
          </p>
        </Callout>

        <Callout variant="warning" icon={AlertCircle} className="mt-4">
          <p className="font-medium">Tipo de conferência do digitalizado</p>
          <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
            {conferenceTypes.map((type) => (
              <li key={type}>• {type}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm">
            A opção escolhida deve refletir o documento efetivamente apresentado. Não use uma
            declaração genérica quando o caso exigir outro tipo de conferência.
          </p>
        </Callout>
      </div>

      <div className="section-card border-l-[3px] border-l-primary/75 p-5 sm:p-6">
        <h3 className="mb-4 font-semibold text-foreground">3.3. Inclusão do documento externo no SEI!RIO</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
              1
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground">Acessar “Incluir Documento”</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Com o processo aberto, use o comando de inclusão de documento na barra de
                  ferramentas.
                </p>
              </div>
              <div className="mockup-frame max-w-md p-4">
                <div className="rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xs">
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-sky-200/70 bg-sky-50 px-4 py-3 shadow-xs dark:border-sky-800/40 dark:bg-sky-950/40">
                    <div className="rounded-xl border border-sky-200/70 bg-white p-2 shadow-inner dark:border-sky-800/40 dark:bg-slate-900/80">
                      <img
                        src={seiIncludeDocIcon}
                        alt="Ícone Incluir Documento no SEI!RIO"
                        className="h-10 w-auto object-contain"
                        width={177}
                        height={32}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Atalho do sistema
                      </p>
                      <p className="text-sm font-semibold text-foreground">Incluir Documento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
              2
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground">Selecionar “Documento Externo”</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Use a opção de documento externo sempre que a peça não tiver sido produzida dentro
                  do próprio SEI!RIO.
                </p>
              </div>
              <div className="mockup-frame max-w-2xl p-4">
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-xs dark:bg-slate-950/80">
                  <div className="flex justify-center bg-linear-to-b from-white via-white to-slate-50/80 px-4 py-3">
                    <img
                      src={seiChooseDocType}
                      alt="Escolha do tipo de documento externo no SEI!RIO"
                      className="max-h-[220px] w-auto object-contain"
                      width={448}
                      height={187}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
              3
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Preencher os metadados essenciais</h4>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>Selecione o tipo do documento que melhor identifica a peça.</li>
                <li>Informe número e data apenas quando constarem do documento.</li>
                <li>
                  No <strong className="text-foreground">Nome na Árvore</strong>, use identificação
                  clara e singular.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border bg-linear-to-r from-secondary to-secondary/50 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
              4
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Anexar o arquivo e confirmar</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Escolha o arquivo, confira os campos preenchidos e confirme a inclusão do documento
                nos autos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card p-5 sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <FolderTree className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">3.4. Cuidados de anexação</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Pequenos cuidados nesta etapa evitam árvore confusa, retrabalho e dificuldade de
              conferência na GAD.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {attachmentCare.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border/60 bg-card p-4 shadow-xs transition-colors hover:border-primary/25"
            >
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
