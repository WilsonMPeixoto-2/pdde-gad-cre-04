import { GUIDE_ANCHORS, GUIDE_VERSION } from "@/lib/guideContent";

export type GuideRecentUpdateIconKey = "operations" | "trust" | "foundation";

export interface GuideRecentUpdateItem {
  title: string;
  description: string;
  userImpact: string;
  anchor: string;
}

export interface GuideRecentUpdateGroup {
  id: string;
  dateLabel: string;
  windowLabel: string;
  title: string;
  description: string;
  outcome: string;
  iconKey: GuideRecentUpdateIconKey;
  items: GuideRecentUpdateItem[];
}

export const guideRecentUpdateGroups: GuideRecentUpdateGroup[] = [
  {
    id: "march-28",
    dateLabel: "28 de março de 2026",
    windowLabel: "Últimas horas publicadas",
    title: "O guia virou uma área de trabalho operacional",
    description:
      "As publicações do dia 28 transformaram a etapa 2 em um núcleo persistente de apoio à conferência, ao handoff e à continuidade do caso.",
    outcome:
      "Agora o usuário consegue montar, conferir, retomar e compartilhar o andamento do processo dentro do próprio guia.",
    iconKey: "operations",
    items: [
      {
        title: "Central operacional com dados persistentes",
        description:
          "A etapa 2 passou a reunir dados do processo, checklist, kit de nomes, diagnóstico e ações de continuidade em um único ecossistema.",
        userImpact:
          "Reduz retrabalho e evita ficar pulando entre anotações soltas, arquivos avulsos e memória pessoal.",
        anchor: GUIDE_ANCHORS.commandCenter,
      },
      {
        title: "Resumo compartilhável e relatório premium",
        description:
          "Entraram briefing executivo, assunto sugerido, pacote textual de handoff e versão pronta para impressão ou PDF.",
        userImpact:
          "Facilita repasse por e-mail ou WhatsApp e melhora a formalização da conferência antes da remessa.",
        anchor: GUIDE_ANCHORS.sharePack,
      },
      {
        title: "Memória local do caso e retomada do trabalho",
        description:
          "O site passou a salvar a última seção útil, notas do caso, próxima checagem e contexto operacional relevante.",
        userImpact:
          "Ajuda quando o processo fica parado, muda de mãos ou precisa ser retomado depois sem perda de contexto.",
        anchor: GUIDE_ANCHORS.caseNotes,
      },
      {
        title: "Carregamento mais leve e navegação mais rápida",
        description:
          "Os blocos operacionais da etapa 2 foram quebrados em partes sob demanda, com navegação preparada para âncoras e atalhos.",
        userImpact:
          "A página abre mais leve e o usuário chega mais rápido ao recurso que realmente precisa usar.",
        anchor: GUIDE_ANCHORS.commandCenter,
      },
      {
        title: "Registro claro das capacidades e novidades",
        description:
          "O projeto passou a manter uma base explícita do que já oferece e do que mudou recentemente para os usuários.",
        userImpact:
          "Facilita comunicação institucional, onboarding de equipe e apresentação do guia para novos públicos.",
        anchor: GUIDE_ANCHORS.capabilities,
      },
    ],
  },
  {
    id: "march-27",
    dateLabel: "27 de março de 2026",
    windowLabel: "Publicações de 27 de março",
    title: "A base editorial e documental ficou mais confiável",
    description:
      "A revisão saiu do campo apenas visual e passou a conferir conteúdo, acervo e coerência estrutural com muito mais rigor.",
    outcome:
      "O usuário final ganha mais confiança de que texto, links, referências e arquivos realmente batem com o uso esperado.",
    iconKey: "trust",
    items: [
      {
        title: "Auditoria de links, âncoras e referências oficiais",
        description:
          "Foram criadas verificações para integridade do índice, âncoras, manifesto e links normativos centrais do guia.",
        userImpact:
          "Diminui o risco de instruções quebradas, navegação inconsistente e referências oficiais fora do ar passarem despercebidas.",
        anchor: "anexo",
      },
      {
        title: "Auditoria do acervo PDF e coerência dos modelos",
        description:
          "Os modelos e referências documentais passaram a ser conferidos por metadados, hash e sinais reais de conteúdo.",
        userImpact:
          "Reduz a chance de baixar arquivo trocado, equivocado ou incoerente com a explicação do site.",
        anchor: GUIDE_ANCHORS.models,
      },
      {
        title: "Limpeza de legado e alinhamento editorial",
        description:
          "Foram removidos resquícios de clone temático, dependências mortas e pedaços de conteúdo que ainda destoavam do PDDE.",
        userImpact:
          "O guia ficou mais coeso, com menos sensação de colagem e menos ruído para quem usa pela primeira vez.",
        anchor: "introducao",
      },
      {
        title: "Leitura mais clara e informação mais bem distribuída",
        description:
          "Os blocos ganharam melhor hierarquia visual, blocos curtos, destaques úteis e direção de arte mais profissional.",
        userImpact:
          "A leitura ficou menos cansativa e a informação mais fácil de localizar mesmo em sessões longas de conferência.",
        anchor: "introducao",
      },
    ],
  },
  {
    id: "march-26",
    dateLabel: "26 de março de 2026",
    windowLabel: "Publicações de 26 de março",
    title: "Fluxo, mobile e identidade visual foram reconstruídos",
    description:
      "Essa foi a rodada que tirou o projeto do estado de clone adaptado e o colocou em um caminho institucional consistente.",
    outcome:
      "O uso ficou mais confiável em desktop e mobile, com navegação coerente, visual profissional e conteúdo mais alinhado ao tema real.",
    iconKey: "foundation",
    items: [
      {
        title: "Fluxo principal realinhado ao PDDE no SEI!RIO",
        description:
          "Sidebar, busca, hero, wizard, checklist e etapas principais deixaram de apontar para trechos divergentes ou herdados de outro contexto.",
        userImpact:
          "O usuário passou a seguir um roteiro mais coerente, sem contradições entre o que a página mostra e o que a navegação promete.",
        anchor: "secao-1",
      },
      {
        title: "Responsividade e navegação mobile saneadas",
        description:
          "Foram corrigidos overflow horizontal, sobreposição de botões, menu mobile e conflitos de navegação em telas menores.",
        userImpact:
          "Quem consulta o guia no celular ou em tela reduzida hoje navega com muito menos atrito.",
        anchor: "introducao",
      },
      {
        title: "Tipografia, cards e hierarquia visual profissionalizados",
        description:
          "A página ganhou tratamento tipográfico melhor, organização mais limpa de blocos e estética mais institucional.",
        userImpact:
          "O guia passou a transmitir mais credibilidade e a apoiar melhor a leitura operacional no dia a dia.",
        anchor: "introducao",
      },
      {
        title: "Base de conteúdo centralizada para evitar incoerência futura",
        description:
          "Títulos, âncoras, rótulos e referências principais passaram a obedecer uma base central, reduzindo divergências internas.",
        userImpact:
          "Isso ajuda a manter consistência em futuras revisões e evita que o usuário veja mensagens conflitantes em partes diferentes do site.",
        anchor: GUIDE_ANCHORS.capabilities,
      },
    ],
  },
];

export const GUIDE_RECENT_UPDATES_DOC_PATH = "docs/NOVIDADES_RECENTES_GUIA.md";

export const GUIDE_RECENT_UPDATES_PRIMARY_ANCHOR = GUIDE_ANCHORS.recentUpdates;

export const getGuideRecentUpdatesSummary = () =>
  [
    `Resumo das novidades recentes do guia PDDE no SEI!RIO — ${GUIDE_VERSION.shortLabel}`,
    "",
    "Retrospectiva validada a partir das publicações em produção entre 26 e 28 de março de 2026.",
    "",
    "O que mudou de forma visível para o usuário final:",
    ...guideRecentUpdateGroups.flatMap((group) => [
      `${group.dateLabel} — ${group.title}: ${group.outcome}`,
      ...group.items.map((item) => `- ${item.title}: ${item.userImpact}`),
      "",
    ]),
    "Use este resumo para apresentar as melhorias recentes a diretores, equipes escolares e áreas de apoio que precisam saber o que o guia passou a permitir na prática.",
  ].join("\n");

export const getGuideRecentUpdatesMarkdown = () => {
  const lines = [
    "# Novidades recentes do guia PDDE no SEI!RIO",
    "",
    `- Versão do guia: ${GUIDE_VERSION.shortLabel}`,
    `- Ciclo editorial: ${GUIDE_VERSION.cycleLabel}`,
    `- Última atualização da base: ${GUIDE_VERSION.lastUpdatedText}`,
    "- Janela retroativa revisada: publicações em produção entre 26 e 28 de março de 2026",
    "",
    "## Para que serve este documento",
    "",
    "Este registro resume, em linguagem orientada ao usuário final, as melhorias mais relevantes publicadas nos últimos dias. Ele serve para comunicação institucional, onboarding e prestação de contas sobre a evolução concreta do projeto.",
    "",
    "## Resumo curto para comunicação",
    "",
    getGuideRecentUpdatesSummary(),
    "",
    "## Linha do tempo das melhorias publicadas",
    "",
  ];

  for (const group of guideRecentUpdateGroups) {
    lines.push(`### ${group.dateLabel} — ${group.title}`);
    lines.push("");
    lines.push(`- Janela de publicação: ${group.windowLabel}`);
    lines.push(`- Síntese: ${group.description}`);
    lines.push(`- Resultado para o usuário: ${group.outcome}`);
    lines.push("");

    for (const item of group.items) {
      lines.push(`- **${item.title}**`);
      lines.push(`  - O que mudou: ${item.description}`);
      lines.push(`  - Impacto percebido: ${item.userImpact}`);
    }

    lines.push("");
  }

  lines.push("## Relação com o registro de capacidades");
  lines.push("");
  lines.push(
    "Para uma visão consolidada do que o guia já oferece hoje, consulte também `docs/REGISTRO_CAPACIDADES_GUIA.md`.",
  );
  lines.push("");
  lines.push("## Observação de governança");
  lines.push("");
  lines.push(
    "Sempre que uma nova melhoria relevante for publicada em produção, atualize a base em `src/lib/guideRecentUpdates.ts` e regenere este arquivo com `npm run sync:release-notes`.",
  );

  return lines.join("\n");
};

export const getGuideRecentUpdatesFileName = () =>
  `GUIA_NOVIDADES_RECENTES_PDDE_${GUIDE_VERSION.publishedIsoDate}.md`;
