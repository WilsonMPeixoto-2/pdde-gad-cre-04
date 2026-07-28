# Saneamento técnico integral do Guia PDDE — Design

## Contexto

Este documento define a rodada de saneamento do repositório `WilsonMPeixoto-2/pdde-gad-cre-04`, correspondente ao Guia PDDE no SEI!RIO da 4ª CRE. A base é a `main` no commit `d8e8dc335f3543d0d262f0f1fa57a61cc5fc1269`, já publicada em produção após o PR nº 10.

A rodada não altera conteúdo normativo, não redesenha as Etapas 1 a 6 e não introduz backend. O objetivo é eliminar riscos técnicos identificados, fortalecer governança, desempenho, acessibilidade e manutenção, preservando integralmente a experiência editorial aprovada.

## Objetivos

1. Corrigir vulnerabilidades e dependências desnecessárias.
2. Padronizar Node.js, npm e arquivos de lock.
3. Sincronizar versão, datas e documentação da edição publicada.
4. Encerrar artefatos de desenvolvimento substituídos.
5. Adicionar métricas permanentes de desempenho e tamanho do bundle.
6. Reforçar acessibilidade estática e redução de movimento.
7. Melhorar progressivamente a tipagem TypeScript sem reescrita ampla.
8. Reduzir fragilidade arquitetural em metadados e coordenação da página principal.
9. Manter a camada gráfica própria e evitar bibliotecas sem caso de uso concreto.

## Restrições globais

- Não adicionar Supabase, Firebase, banco de dados ou autenticação.
- Não instalar Recharts, Chart.js, D3, React Flow, Mermaid ou Motion nesta rodada.
- Não alterar textos institucionais e normativos, exceto metadados de versão/data.
- Não substituir o mapa processual, os mockups vetoriais, a busca, o checklist ou o modo guiado.
- Não mesclar automaticamente na `main` antes da validação completa e revisão do PR.
- Usar npm como único gerenciador oficial.
- Padronizar Node.js 24 no projeto, CI e documentação.
- Preservar funcionamento em desktop, mobile, modo escuro, impressão, PWA e navegação offline.

## Arquitetura da solução

### 1. Dependências e cadeia de build

- Atualizar PostCSS para uma versão corrigida da linha 8.
- Remover `date-fns`, pois não possui uso localizado no código.
- Remover `bun.lock`, consolidando `package-lock.json` como fonte única.
- Declarar `packageManager` e `engines` no `package.json`.
- Atualizar Playwright e dependências de baixo risco em lotes controlados, sem migrações maiores.

### 2. Governança de versão

A rodada adotará a versão `2.7.0`, pois reúne uma nova edição técnica e editorial publicada em julho de 2026. Serão sincronizados:

- `package.json`;
- `package-lock.json`;
- `src/lib/guideVersion.ts`;
- metadados estruturados gerados no build;
- documentação de release;
- README.

A data de modificação será `2026-07-27`, sem alterar a data original de primeira publicação.

### 3. Qualidade contínua

Serão adicionados:

- `knip`, inicialmente em modo de relatório;
- `rollup-plugin-visualizer`, gerando relatório de bundle apenas quando solicitado;
- `@lhci/cli`, com configuração de linha de base e metas conservadoras;
- `eslint-plugin-jsx-a11y`, integrado ao lint;
- auditoria npm no CI, com evidência gerada antes do gate.

### 4. Acessibilidade e movimento

- O confete do checklist não será executado com `prefers-reduced-motion: reduce`.
- O skeleton inicial respeitará redução de movimento antes da hidratação React.
- Cartões de leitura deixarão de se deslocar verticalmente no hover, alinhando código e sistema visual.
- O feedback textual de conclusão continuará independente da animação.

### 5. Desempenho

- O build continuará com carregamento diferido das seções.
- Lighthouse CI medirá a página principal em produção local do build.
- O bundle visualizer permitirá rastrear crescimento do JS e CSS.
- Será criado orçamento inicial de tamanho baseado na linha de base atual, sem metas artificiais que bloqueiem o projeto por diferenças mínimas.

### 6. Robustez de código

- A geração de JSON-LD deixará de analisar `guideContent.ts` por expressão regular e consumirá dados estruturados diretamente.
- A coordenação de carregamento diferido e impressão será progressivamente extraída de `Index.tsx` para hooks focados, sem alterar comportamento público.
- A primeira etapa de TypeScript estrito ativará `strictNullChecks` e `noFallthroughCasesInSwitch`, corrigindo os erros reais encontrados. As demais flags ficarão para rodadas posteriores se gerarem refatoração desproporcional.

### 7. Segurança HTTP

- A política CSP será introduzida inicialmente em `Content-Security-Policy-Report-Only`.
- A política permitirá os recursos locais atualmente usados e não bloqueará service worker, fontes, imagens, JSON-LD ou estilos críticos.
- A conversão para CSP bloqueante ficará condicionada à observação sem regressões.

## Pacotes gráficos

A camada gráfica existente é suficiente e será preservada. `lucide-react` permanece como biblioteca oficial de ícones. O mapa processual, os componentes visuais próprios e os mockups HTML/CSS continuam sendo a solução preferencial.

Nenhuma biblioteca de gráficos ou diagramas será instalada sem requisito de conteúdo concreto. A única adição relacionada a visualização será `rollup-plugin-visualizer`, destinada ao diagnóstico técnico do bundle, não à interface do usuário.

## Testes e validação

A rodada será considerada tecnicamente concluída somente quando forem aprovados:

- ESLint;
- TypeScript;
- build Vite;
- auditoria estrutural de conteúdo;
- auditoria normativa;
- auditoria de PDFs;
- Playwright E2E;
- Axe;
- impressão;
- PWA;
- auditoria npm sem vulnerabilidade alta conhecida não justificada;
- Knip sem dependências não utilizadas confirmadas;
- Lighthouse CI dentro das metas definidas;
- inspeção do relatório de bundle.

## Fora de escopo

- redesign das Etapas 1 a 6;
- alteração de regras PDDE ou SEI!RIO;
- sincronização em nuvem;
- telemetria de usuários;
- analytics;
- autenticação;
- gráficos estatísticos;
- migração para React Router 8;
- ativação integral de `strict: true` em uma única rodada;
- CSP bloqueante imediata.

## Critério de sucesso

O projeto deve sair desta rodada com dependências saneadas, versão coerente, cadeia de build reproduzível, métricas permanentes de qualidade, acessibilidade consistente e arquitetura menos frágil, sem regressão visual, normativa ou funcional.