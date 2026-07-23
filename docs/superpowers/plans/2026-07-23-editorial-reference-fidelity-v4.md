# Redesign Editorial com Fidelidade às Referências — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir o Guia PDDE no SEI!RIO com fidelidade composicional às referências editoriais aprovadas, preservando conteúdo, regras, rotas e funcionalidades.

**Architecture:** A implementação substituirá a camada visual reprovada por um sistema único de fidelidade editorial importado por último. A estrutura funcional existente será preservada, mas capa, aberturas, visão geral, referências do sistema e densidade tipográfica serão recompostas. A validação combinará contratos automatizados e capturas lado a lado em desktop, mobile, modo escuro e impressão.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, CSS modular por camada, Lucide React, Playwright, Axe, Vite, GitHub Actions e Vercel.

## Global Constraints

- A referência aprovada é contrato visual vinculante, não inspiração abstrata.
- Corpo de texto entre 16 e 18 px; rótulos nunca menores que 12 px.
- Nenhuma imagem rasterizada de baixa resolução.
- Nenhuma sobreposição textual ou visual.
- Nenhum título monumental que reduza a área útil de conteúdo.
- Cores devem ter função semântica e contraste WCAG AA.
- Funcionalidades, âncoras, rotas, impressão, PWA e persistência devem ser preservadas.

---

### Task 1: Contratos visuais de fidelidade

**Files:**
- Modify: `e2e/visual-system.spec.ts`
- Create: `e2e/editorial-fidelity.spec.ts`

**Interfaces:**
- Consumes: seletores `data-editorial-hero`, `data-editorial-chapter`, `data-editorial-role` e IDs das seções.
- Produces: contratos permanentes de legibilidade, proporção, ausência de sobreposição e responsividade.

- [ ] Criar testes que falhem quando títulos ultrapassarem o contêiner, corpo ficar abaixo de 16 px ou imagens forem ampliadas além da dimensão natural.
- [ ] Criar testes de bounding boxes para impedir colisões entre título, mapa, foto, controles e cards.
- [ ] Criar testes mobile em 390 × 844 sem overflow horizontal.
- [ ] Executar a suíte e confirmar as falhas na implementação atual.
- [ ] Commitar os testes.

### Task 2: Capa integrada e shell institucional

**Files:**
- Modify: `src/components/pop/HeroCover.tsx`
- Modify: `src/components/pop/PopSidebar.tsx`
- Modify: `src/components/pop/PopHeader.tsx`
- Modify: `src/pages/Index.tsx`
- Create: `src/styles/editorial-fidelity-v4.css`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: `editorialMedia.hero`, `guideSections`, callbacks de navegação e impressão.
- Produces: shell com sidebar fixa, topbar compacta e capa integrada sem sobreposição.

- [ ] Reorganizar a capa para duas colunas equilibradas e uma faixa de metadados legível.
- [ ] Limitar o título a no máximo três linhas e remover elementos redundantes.
- [ ] Fixar a sidebar no desktop desde o topo, com largura previsível.
- [ ] Ajustar topbar e conteúdo para respeitar a largura da sidebar.
- [ ] Executar contratos de desktop e mobile.
- [ ] Commitar a nova capa e shell.

### Task 3: Abertura de etapa fiel à referência

**Files:**
- Modify: `src/components/pop/SectionDivider.tsx`
- Modify: `src/components/visual/EditorialChapterVisual.tsx`
- Modify: `src/styles/editorial-fidelity-v4.css`

**Interfaces:**
- Consumes: `GuideSectionId`, título, subtítulo, ícone e URL de compartilhamento.
- Produces: cabeçalho compacto em dois painéis, mapa de quatro ou cinco movimentos e resumo semântico.

- [ ] Substituir a tipografia monumental por hierarquia compacta.
- [ ] Ampliar os mapas para quatro ou cinco movimentos com texto legível.
- [ ] Reposicionar resultado esperado e ponto de atenção.
- [ ] Garantir que nenhum título quebre em palavras isoladas por falta de largura.
- [ ] Validar desktop, mobile, modo escuro e impressão.
- [ ] Commitar as aberturas.

### Task 4: Referências do SEI!RIO em vetor

**Files:**
- Create: `src/components/visual/SystemCommandPreview.tsx`
- Modify: `src/components/pop/SectionThree.tsx`
- Modify: `src/styles/editorial-fidelity-v4.css`

**Interfaces:**
- Consumes: variante `include-document` ou `external-document`.
- Produces: mockup HTML/CSS nítido, acessível e responsivo, sem bitmap de baixa resolução.

- [ ] Remover imports dos PNGs de baixa qualidade.
- [ ] Implementar os dois mockups vetoriais.
- [ ] Garantir texto alternativo e descrição visível.
- [ ] Validar escala em 100%, 125% e mobile.
- [ ] Commitar a substituição.

### Task 5: Sistema de conteúdo e legibilidade

**Files:**
- Modify: `src/styles/editorial-fidelity-v4.css`
- Modify: `src/styles/editorial-reference-components.css`
- Modify: `src/styles/editorial-reference-support.css`

**Interfaces:**
- Consumes: classes existentes de cards, tabelas, regras, processos, checklists, contatos e fontes.
- Produces: módulos funcionalmente distintos, tipografia confortável e grids sem vazios arbitrários.

- [ ] Definir corpo mínimo de 16 px e entrelinha mínima de 1,6.
- [ ] Aumentar tabelas, listas, rótulos e metadados críticos.
- [ ] Diferenciar visualmente comparação, processo, decisão, regra, controle e fontes.
- [ ] Reduzir sombras, aumentar contraste de bordas e preservar respiro funcional.
- [ ] Ajustar controles flutuantes para não cobrirem conteúdo.
- [ ] Executar Axe e testes de overflow.
- [ ] Commitar a camada de conteúdo.

### Task 6: Mobile, modo escuro e impressão

**Files:**
- Modify: `src/styles/editorial-fidelity-v4.css`
- Modify: `src/styles/editorial-reference-fixes.css`

**Interfaces:**
- Consumes: variáveis semânticas e classes da nova composição.
- Produces: equivalência visual em 390 px, tema escuro e PDF A4.

- [ ] Reorganizar todos os grids em uma coluna no mobile.
- [ ] Garantir corpo de 16 px e botões com áreas de toque adequadas.
- [ ] Ajustar variantes luminosas no modo escuro.
- [ ] Preservar cabeçalhos e módulos semânticos na impressão.
- [ ] Gerar PDF nativo e inspecionar as páginas críticas.
- [ ] Commitar as correções de equivalência.

### Task 7: Homologação visual e encerramento

**Files:**
- Create temporarily: `e2e/editorial-fidelity-review.spec.ts`
- Update: `docs/audits/2026-07-editorial-redesign.md`
- Update: `docs/design/VISUAL_SYSTEM.md`

**Interfaces:**
- Consumes: preview da branch e referência aprovada.
- Produces: evidências de desktop, mobile, tema escuro e PDF; documentação final.

- [ ] Capturar capa, etapa 1, etapa 2, conteúdo operacional, tabela, checklist, contatos e fontes.
- [ ] Comparar lado a lado com as referências aprovadas.
- [ ] Corrigir qualquer diferença de escala, densidade, alinhamento ou legibilidade.
- [ ] Remover o teste temporário.
- [ ] Executar `npm run check:ci` integralmente.
- [ ] Abrir novo PR em rascunho e encerrar o PR reprovado sem merge.