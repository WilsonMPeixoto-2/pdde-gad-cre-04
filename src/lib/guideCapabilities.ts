import { GUIDE_ANCHORS, GUIDE_VERSION } from "@/lib/guideContent";

export type GuideCapabilityIconKey =
  | "workflow"
  | "workspace"
  | "handoff"
  | "trust"
  | "reading";

export interface GuideCapabilityItem {
  title: string;
  description: string;
  userValue: string;
  anchor: string;
}

export interface GuideCapabilityGroup {
  id: string;
  title: string;
  description: string;
  audience: string;
  iconKey: GuideCapabilityIconKey;
  items: GuideCapabilityItem[];
}

export const guideCapabilityGroups: GuideCapabilityGroup[] = [
  {
    id: "workflow-guidance",
    title: "Orientação operacional guiada",
    description:
      "O guia não entrega só texto explicativo: ele organiza o fluxo e ajuda a executar o processo com menos improviso.",
    audience: "Direção escolar, apoio administrativo e equipes que precisam seguir o rito do SEI!RIO com mais segurança.",
    iconKey: "workflow",
    items: [
      {
        title: "Roteiro completo por etapas",
        description: "Mostra a sequência das 6 etapas principais da prestação de contas no SEI!RIO, com pontos de atenção e erros recorrentes.",
        userValue: "Reduz retrabalho e ajuda quem está aprendendo ou retomando o fluxo.",
        anchor: "secao-1",
      },
      {
        title: "Checklist mínimo e complementar",
        description: "Separa o núcleo documental essencial dos itens complementares, com progresso visual e filtros rápidos.",
        userValue: "Ajuda a saber o que já foi reunido e o que ainda falta antes da remessa.",
        anchor: GUIDE_ANCHORS.checklist,
      },
      {
        title: "Kit de nomenclatura documental",
        description: "Sugere nomes consistentes para PDFs e para a árvore do processo, considerando unidade e exercício.",
        userValue: "Melhora a legibilidade da pasta e reduz exigências por organização ruim.",
        anchor: GUIDE_ANCHORS.naming,
      },
    ],
  },
  {
    id: "operational-workspace",
    title: "Painel operacional do caso",
    description:
      "A etapa 2 virou uma área de trabalho com dados persistentes do processo e apoio direto à montagem dos autos.",
    audience: "Quem está montando, conferindo, retomando ou repassando o processo para outra pessoa.",
    iconKey: "workspace",
    items: [
      {
        title: "Painel do processo com dados reaproveitáveis",
        description: "Salva unidade escolar, CNPJ, exercício, número do processo e responsável da conferência.",
        userValue: "Evita redigitar os mesmos dados em vários blocos do guia.",
        anchor: GUIDE_ANCHORS.workspace,
      },
      {
        title: "Diagnóstico de prontidão para a GAD",
        description: "Cruza checklist, jornada e dados do processo para mostrar a situação atual e a próxima ação recomendada.",
        userValue: "Mostra de forma objetiva se a pasta está bloqueada, em fluxo, pronta ou já remetida.",
        anchor: GUIDE_ANCHORS.readiness,
      },
      {
        title: "Memória local do caso",
        description: "Permite registrar pendência focal, último andamento, próxima checagem, handoff e observações.",
        userValue: "Evita perder contexto quando o processo passa de mão ou é retomado depois.",
        anchor: GUIDE_ANCHORS.caseNotes,
      },
    ],
  },
  {
    id: "handoff-outputs",
    title: "Saídas prontas para comunicação e handoff",
    description:
      "O guia agora gera materiais práticos para repasse interno, impressão e continuidade do trabalho em outros contextos.",
    audience: "Equipes que precisam comunicar situação, compartilhar andamento ou gerar material de conferência.",
    iconKey: "handoff",
    items: [
      {
        title: "Resumo compartilhável da conferência",
        description: "Gera resumo curto, assunto sugerido e pacote textual com diagnóstico completo.",
        userValue: "Serve para e-mail, WhatsApp, registro de fechamento do dia e transição entre pessoas.",
        anchor: GUIDE_ANCHORS.sharePack,
      },
      {
        title: "Relatório premium para impressão/PDF",
        description: "Abre uma versão limpa, com métricas, notas do caso e pendências organizadas em layout pronto para PDF.",
        userValue: "Facilita conferência formal, anexação em PDF e documentação interna da análise.",
        anchor: GUIDE_ANCHORS.sharePack,
      },
      {
        title: "Exportações assinadas com identidade do projeto",
        description: "Os arquivos gerados pelo guia saem com crédito do criador, nota autoral e metadados de identidade do projeto.",
        userValue: "Preserva autoria, reforça a procedência do material e ajuda a manter o crédito em circulações internas.",
        anchor: GUIDE_ANCHORS.sharePack,
      },
      {
        title: "Exportação e importação de progresso",
        description: "Permite salvar o andamento em JSON e restaurar o caso em outro computador.",
        userValue: "Protege a continuidade do trabalho sem depender do mesmo navegador ou máquina.",
        anchor: GUIDE_ANCHORS.commandCenter,
      },
    ],
  },
  {
    id: "trust-and-governance",
    title: "Confiabilidade editorial e governança",
    description:
      "A base do guia passou a ter mecanismos objetivos de verificação para conteúdo, anexos e coerência estrutural.",
    audience: "Gestores do conteúdo, revisores editoriais e quem responde institucionalmente pelo material.",
    iconKey: "trust",
    items: [
      {
        title: "Auditoria estrutural de conteúdo",
        description: "Valida âncoras, integridade do índice, manifesto e coerência de referências centrais.",
        userValue: "Ajuda a evitar incoerências invisíveis entre texto, navegação e apoio documental.",
        anchor: "anexo",
      },
      {
        title: "Mapa de rastreabilidade das fontes oficiais",
        description: "Mostra órgão emissor, aplicação, razão de uso e última checagem das referências prioritárias do anexo.",
        userValue: "Aumenta a confiança do usuário sobre a base normativa e operacional usada pelo guia.",
        anchor: GUIDE_ANCHORS.referenceGovernance,
      },
      {
        title: "Governança anual por exercício",
        description: "Explica o que precisa ser revalidado quando o exercício muda, quando surge novo comunicado do FNDE ou quando o rito local é alterado.",
        userValue: "Ajuda o usuário a distinguir regra permanente de orientação sensível ao ano ou ao contexto.",
        anchor: GUIDE_ANCHORS.annualGovernance,
      },
      {
        title: "Auditoria do acervo PDF",
        description: "Confere metadados, hash e sinais de conteúdo dos modelos e referências publicados.",
        userValue: "Reduz risco de arquivo errado, trocado ou desatualizado passar despercebido.",
        anchor: GUIDE_ANCHORS.models,
      },
      {
        title: "CI remoto no GitHub Actions",
        description: "O repositório agora tem pipeline remoto de qualidade para rodar a mesma esteira do ambiente local.",
        userValue: "Diminui o risco de publicar regressões sem verificação automática.",
        anchor: "introducao",
      },
    ],
  },
  {
    id: "reading-and-accessibility",
    title: "Leitura assistida e retomada",
    description:
      "Além de orientar o processo, o site passou a ajudar o usuário a retomar o trabalho com menos fricção.",
    audience: "Usuários que alternam tarefas, trocam de contexto ou precisam de mais conforto de leitura.",
    iconKey: "reading",
    items: [
      {
        title: "Retomada da última seção útil",
        description: "Salva o ponto útil de trabalho para continuar sem caçar onde parou.",
        userValue: "Acelera a volta ao fluxo e reduz esforço cognitivo na reabertura do guia.",
        anchor: GUIDE_ANCHORS.readingSupport,
      },
      {
        title: "Texto maior e movimento reduzido",
        description: "Oferece preferências persistentes de leitura diretamente na interface.",
        userValue: "Melhora conforto visual e acessibilidade para perfis diferentes de uso.",
        anchor: GUIDE_ANCHORS.readingSupport,
      },
      {
        title: "Instalação como aplicativo com ícones próprios",
        description: "Permite instalar o guia no celular e no Windows com ícone, atalhos e telas de instalação personalizados do projeto.",
        userValue: "Facilita acesso recorrente e faz o guia parecer uma ferramenta institucional dedicada, não só um site aberto no navegador.",
        anchor: GUIDE_ANCHORS.installApp,
      },
      {
        title: "Busca e atalhos rápidos",
        description: "Permite chegar mais rápido aos blocos operacionais e recursos mais usados.",
        userValue: "Diminui o tempo de navegação e facilita uso por demanda.",
        anchor: GUIDE_ANCHORS.commandCenter,
      },
    ],
  },
];

export const GUIDE_CAPABILITY_DOC_PATH = "docs/REGISTRO_CAPACIDADES_GUIA.md";

export const getGuideCapabilitiesSummary = () =>
  [
    `Resumo das capacidades atuais do guia PDDE no SEI!RIO — ${GUIDE_VERSION.shortLabel}`,
    "",
    "O projeto hoje oferece:",
    ...guideCapabilityGroups.flatMap((group) => [
      `${group.title}: ${group.description}`,
      ...group.items.map((item) => `- ${item.title}: ${item.userValue}`),
      "",
    ]),
    "Use este resumo para apresentar o guia a diretores, equipes escolares e áreas de apoio que precisem entender rapidamente o que a plataforma já entrega.",
  ].join("\n");

export const getGuideCapabilitiesMarkdown = () => {
  const lines = [
    "# Registro de capacidades do guia PDDE no SEI!RIO",
    "",
    `- Versão do guia: ${GUIDE_VERSION.shortLabel}`,
    `- Ciclo editorial: ${GUIDE_VERSION.cycleLabel}`,
    `- Última atualização da base: ${GUIDE_VERSION.lastUpdatedText}`,
    "",
    "## Para que serve este registro",
    "",
    "Este documento consolida, em linguagem de comunicação e manutenção, as funções atualmente disponíveis no projeto. A ideia é apoiar apresentação a usuários, comunicação institucional e futuras revisões do produto.",
    "",
    "## Resumo rápido para comunicação",
    "",
    getGuideCapabilitiesSummary(),
    "",
    "## Capacidades organizadas por frente",
    "",
  ];

  for (const group of guideCapabilityGroups) {
    lines.push(`### ${group.title}`);
    lines.push("");
    lines.push(`- Público mais beneficiado: ${group.audience}`);
    lines.push(`- Síntese: ${group.description}`);
    lines.push("");

    for (const item of group.items) {
      lines.push(`- **${item.title}**`);
      lines.push(`  - O que faz: ${item.description}`);
      lines.push(`  - Valor para o usuário: ${item.userValue}`);
    }

    lines.push("");
  }

  lines.push("## Observação de governança");
  lines.push("");
  lines.push(
    "Para uma visão cronológica das melhorias publicadas recentemente, consulte também `docs/NOVIDADES_RECENTES_GUIA.md`.",
  );
  lines.push("");
  lines.push(
    `Sempre que uma nova função relevante for incorporada ao guia, atualize a base em \`src/lib/guideCapabilities.ts\` e regenere este arquivo com \`npm run sync:capabilities\`.`,
  );

  return lines.join("\n");
};

export const getGuideCapabilitiesFileName = () =>
  `GUIA_CAPACIDADES_PDDE_${GUIDE_VERSION.publishedIsoDate}.md`;

export const GUIDE_CAPABILITIES_PRIMARY_ANCHOR = GUIDE_ANCHORS.capabilities;
