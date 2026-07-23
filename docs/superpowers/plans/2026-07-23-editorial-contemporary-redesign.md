# Editorial Contemporary Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reestruturar visual e editorialmente todo o Guia PDDE no SEI!RIO segundo a direção editorial contemporânea aprovada, sem alterar conteúdo normativo, rotas ou funcionalidades.

**Architecture:** A implementação será transversal: uma nova camada de tokens e estilos editoriais será aplicada aos componentes compartilhados (`HeroCover`, `PopHeader`, `PopSidebar`, `SectionDivider`, `SectionLead`) e aos padrões existentes de cartões, tabelas, alertas e transições. Imagens otimizadas serão tratadas como ativos editoriais e associadas às seções por metadados, preservando lazy loading e impressão.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Lucide React, Playwright, Axe.

## Global Constraints

- Preservar integralmente o significado do conteúdo normativo e das orientações operacionais.
- Preservar todas as âncoras, parâmetros `?secao=`, busca, impressão, modo guiado e persistência local.
- Não introduzir dependência sem benefício mensurável; preferir recursos nativos e bibliotecas existentes.
- Não usar texto em gradiente, efeitos promocionais, movimento vertical em cartões de leitura ou cores decorativas sem função.
- Manter Public Sans para corpo/interface, Plus Jakarta Sans para hierarquia de interface e Source Serif 4 para títulos editoriais seletivos.
- Manter Lucide como família de ícones.
- Garantir desktop, tablet, mobile, modo escuro, `prefers-reduced-motion` e impressão.
- Executar `npm run check:ci` antes de considerar a entrega pronta.

---

### Task 1: Linha de base e testes de contrato editorial

**Files:**
- Modify: `e2e/visual-system.spec.ts`
- Modify: `e2e/accessibility.spec.ts`
- Modify: `e2e/print.spec.ts`

**Interfaces:**
- Consumes: seletores e contratos atuais da capa, cabeçalho, sumário, divisores e mapa de etapas.
- Produces: contratos E2E para `data-editorial-*`, mídia editorial, grupos de navegação e comportamento de impressão.

- [ ] **Step 1: Adicionar testes que falham para a nova gramática editorial**

Adicionar verificações para:

```ts
await expect(page.locator('[data-editorial-hero="true"]')).toBeVisible();
await expect(page.locator('[data-editorial-media="hero"] img')).toBeVisible();
await expect(page.locator('[data-editorial-chapter]')).toHaveCount(7);
await expect(page.locator('[data-sidebar-group="process"]')).toBeVisible();
await expect(page.locator('.editorial-section-lead').first()).toBeVisible();
```

- [ ] **Step 2: Verificar que os testes falham antes da implementação**

Run: `npx playwright test e2e/visual-system.spec.ts`

Expected: FAIL porque os novos atributos e elementos ainda não existem.

- [ ] **Step 3: Manter os contratos anteriores relevantes**

Preservar testes de ausência de `.bg-clip-text`, `.animate-pulse`, `.btn-premium`, presença de compartilhamento e seis etapas do mapa.

- [ ] **Step 4: Commit**

```bash
git add e2e/visual-system.spec.ts e2e/accessibility.spec.ts e2e/print.spec.ts
git commit -m "test: definir contratos do sistema editorial"
```

---

### Task 2: Tokens, superfícies e ritmo editorial global

**Files:**
- Create: `src/styles/editorial-contemporary.css`
- Modify: `src/main.tsx`
- Modify: `src/styles/institutional-polish.css`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: variáveis HSL existentes e utilitários Tailwind.
- Produces: classes `.editorial-*`, tokens `--editorial-*` e regras compartilhadas usadas pelas tarefas seguintes.

- [ ] **Step 1: Importar a nova camada após os estilos institucionais**

```ts
import "@/styles/editorial-contemporary.css";
```

- [ ] **Step 2: Definir tokens de cor, largura, tipografia, mídia e transição**

A nova folha deve definir, no mínimo:

```css
:root {
  --editorial-navy: 215 72% 20%;
  --editorial-blue: 211 82% 42%;
  --editorial-teal: 178 72% 32%;
  --editorial-ink: 218 38% 13%;
  --editorial-paper: 210 25% 98%;
  --editorial-rule: 214 24% 86%;
  --editorial-reading-width: 72ch;
  --editorial-shell: 1320px;
}
```

- [ ] **Step 3: Criar classes estruturais**

Implementar `.editorial-shell`, `.editorial-prose`, `.editorial-band`, `.editorial-media-frame`, `.editorial-section-lead`, `.editorial-chapter`, `.editorial-callout`, `.editorial-transition` e variantes semânticas.

- [ ] **Step 4: Reduzir cartões aninhados e elevação decorativa**

Sob a nova camada, remover transformações de hover em blocos de leitura, limitar sombras e abrir visualmente grupos de conteúdo.

- [ ] **Step 5: Verificar build e typecheck**

Run: `npm run typecheck && npm run build`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/styles/editorial-contemporary.css src/styles/institutional-polish.css src/index.css src/main.tsx
git commit -m "feat: criar fundação editorial contemporânea"
```

---

### Task 3: Ativos visuais editoriais

**Files:**
- Create: `public/editorial/hero-pdde.webp`
- Create: `public/editorial/chapter-process.webp`
- Create: `public/editorial/chapter-documents.webp`
- Create: `public/editorial/chapter-authentication.webp`
- Create: `public/editorial/chapter-follow-up.webp`
- Create: `src/lib/editorialMedia.ts`

**Interfaces:**
- Produces:

```ts
export type EditorialMediaKey = "hero" | "process" | "documents" | "authentication" | "follow-up";
export const editorialMedia: Record<EditorialMediaKey, { src: string; alt: string; position: string }>;
export const editorialMediaBySection: Record<GuideSectionId, EditorialMediaKey>;
```

- [ ] **Step 1: Gerar fotografia editorial de capa**

Cena: ambiente escolar público contemporâneo, equipe administrativa trabalhando com documentos e computador, luz natural, sem marcas, sem texto rasterizado, composição horizontal e espaço negativo para título.

- [ ] **Step 2: Gerar quatro ilustrações editoriais coerentes**

Temas: abertura/processo, organização documental, autenticação/segurança e acompanhamento/suporte. Usar azul e teal, fundo limpo, sem texto, consistência de traço.

- [ ] **Step 3: Otimizar para WebP**

Largura máxima: 1600 px para hero e 1200 px para capítulos. Qualidade alvo: 78–84. Cada arquivo deve ter dimensões explícitas no componente consumidor.

- [ ] **Step 4: Criar catálogo tipado**

Mapear as seções 1–6, contatos e anexo para as mídias apropriadas sem alterar `guideContent.ts`.

- [ ] **Step 5: Commit**

```bash
git add public/editorial src/lib/editorialMedia.ts
git commit -m "feat: adicionar mídia editorial do guia"
```

---

### Task 4: Capa editorial contemporânea

**Files:**
- Modify: `src/components/pop/HeroCover.tsx`
- Test: `e2e/visual-system.spec.ts`

**Interfaces:**
- Consumes: `editorialMedia.hero`.
- Produces: `data-editorial-hero="true"`, `data-editorial-media="hero"` e a ação existente `Iniciar guia`.

- [ ] **Step 1: Executar teste da capa e confirmar falha**

Run: `npx playwright test e2e/visual-system.spec.ts -g "capa"`

Expected: FAIL por ausência da nova mídia e atributos.

- [ ] **Step 2: Reestruturar a capa em grid editorial**

- lado textual com órgão, H1, descrição e ação;
- lado visual com fotografia, forma gráfica e legenda editorial curta;
- resumo de seis etapas e três camadas em faixa inferior;
- fundo claro, títulos em navy, teal como acento;
- imagem com `width`, `height`, `fetchPriority="high"` e `decoding="async"`.

- [ ] **Step 3: Preservar acessibilidade e comportamento**

Manter H1 com nome acessível, botão de início, foco visível e navegação suave. A imagem deverá possuir `alt` descritivo.

- [ ] **Step 4: Rodar teste específico**

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/pop/HeroCover.tsx e2e/visual-system.spec.ts
git commit -m "feat: redesenhar capa editorial do guia"
```

---

### Task 5: Aberturas de capítulos e leads internos

**Files:**
- Modify: `src/components/pop/SectionDivider.tsx`
- Modify: `src/components/visual/SectionLead.tsx`
- Test: `e2e/visual-system.spec.ts`

**Interfaces:**
- Consumes: `editorialMediaBySection`, `editorialMedia` e propriedades atuais.
- Produces: `[data-editorial-chapter]` e `.editorial-section-lead`.

- [ ] **Step 1: Confirmar falha dos contratos de capítulo**

Run: `npx playwright test e2e/visual-system.spec.ts -g "divisores"`

- [ ] **Step 2: Reestruturar `SectionDivider`**

Usar grid com número editorial, título/subtítulo, mídia temática e botão de compartilhamento. Preservar `section-divider-print`, `IconTile`, `buildGuideShareUrl` e mensagens de toast.

- [ ] **Step 3: Reestruturar `SectionLead`**

Transformar em cabeçalho interno aberto, sem cartão, com trilho vertical teal, rótulo curto, título de leitura e descrição. Não repetir uma segunda imagem.

- [ ] **Step 4: Ajustar impressão**

Na impressão, ocultar a imagem do divisor e preservar número, título e subtítulo em fundo branco.

- [ ] **Step 5: Testar e commit**

```bash
git add src/components/pop/SectionDivider.tsx src/components/visual/SectionLead.tsx e2e/visual-system.spec.ts
git commit -m "feat: criar aberturas editoriais de capítulos"
```

---

### Task 6: Cabeçalho e navegação editorial

**Files:**
- Modify: `src/components/pop/PopHeader.tsx`
- Modify: `src/components/pop/PopSidebar.tsx`
- Modify: `src/lib/guideContent.ts` only if metadata grouping cannot be derived locally
- Test: `e2e/visual-system.spec.ts`
- Test: `e2e/accessibility.spec.ts`

**Interfaces:**
- Preserva: callbacks `onPrint`, `onOpenMenu`, `onSectionClick`, estado ativo e progresso.
- Produces: `data-sidebar-group="intro|process|support"`.

- [ ] **Step 1: Criar agrupamento sem alterar IDs**

Classificar visualmente:

```ts
const navigationGroups = [
  { id: "intro", title: "Visão geral", sections: ["introducao"] },
  { id: "process", title: "Etapas do processo", sections: ["secao-1", "secao-2", "secao-3", "secao-4", "secao-5", "secao-6"] },
  { id: "support", title: "Apoio e referências", sections: ["contatos", "anexo"] },
] as const;
```

- [ ] **Step 2: Refinar cabeçalho**

Criar barra clara/azul profunda mais editorial, reduzir molduras desnecessárias, manter busca, tema, PDF e progresso. Não alterar rótulos acessíveis.

- [ ] **Step 3: Refinar sidebar desktop/mobile**

Adicionar títulos de grupos, item ativo com trilho teal, número e ícone, progresso discreto e maior clareza de leitura. Manter Escape, `inert`, overlay e preload.

- [ ] **Step 4: Rodar Axe nos estados desktop e mobile**

Run: `npx playwright test e2e/accessibility.spec.ts`

Expected: PASS sem violações críticas/sérias.

- [ ] **Step 5: Commit**

```bash
git add src/components/pop/PopHeader.tsx src/components/pop/PopSidebar.tsx e2e/visual-system.spec.ts e2e/accessibility.spec.ts
git commit -m "feat: reorganizar navegação editorial"
```

---

### Task 7: Composição do corpo, componentes semânticos e transições

**Files:**
- Modify: `src/styles/editorial-contemporary.css`
- Modify: `src/pages/Index.tsx`
- Modify selectively: `src/components/pop/SectionOne.tsx` through `SectionSix.tsx`
- Modify selectively: `src/components/pop/SectionContacts.tsx`, `SectionAnexo.tsx`, `ScopeNotice.tsx`, `DeadlinesCalculator.tsx`

**Interfaces:**
- Preserva todos os componentes funcionais e dados existentes.
- Produces classes semânticas consistentes e ritmo variável entre seções.

- [ ] **Step 1: Aplicar shell e bandas editoriais no `Index`**

Trocar o espaçamento uniforme por agrupamentos com respiro de capítulo, conteúdo e transição, sem alterar lazy loading.

- [ ] **Step 2: Classificar painéis semanticamente**

Mapear orientações para teal/azul, cautelas para âmbar, erros/vedações para vermelho, sucesso para verde e conteúdo neutro para cinza frio. Sempre manter ícone/rótulo além da cor.

- [ ] **Step 3: Reduzir aninhamento visual**

Remover `section-card` de wrappers que apenas agrupam outros cartões; usar bordas inferiores, faixas e grids abertos.

- [ ] **Step 4: Refinar transições de próxima etapa**

Aplicar `.editorial-transition` aos blocos existentes, mantendo textos e destinos.

- [ ] **Step 5: Validar conteúdo**

Run: `npm run check:content && npm run check:normative`

Expected: PASS, sem mudanças materiais de texto normativo.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Index.tsx src/components/pop src/styles/editorial-contemporary.css
git commit -m "refactor: aplicar arquitetura editorial ao conteúdo"
```

---

### Task 8: Responsividade, modo escuro, movimento e impressão

**Files:**
- Modify: `src/styles/editorial-contemporary.css`
- Modify: `src/styles/light-contrast.css`
- Modify: `src/index.css`
- Test: `e2e/print.spec.ts`
- Test: `e2e/smoke.spec.ts`

**Interfaces:**
- Preserva o fluxo de preparação de impressão e o modo escuro existente.

- [ ] **Step 1: Testar viewports**

Verificar 1440×1000, 1280×800, 768×1024 e 390×844.

- [ ] **Step 2: Corrigir colapso editorial mobile**

- capa em uma coluna;
- mídia com proporção estável;
- divisores com imagem abaixo do título;
- sidebar com áreas de toque mínimas de 44 px;
- títulos sem corte;
- nenhum overflow horizontal.

- [ ] **Step 3: Refinar modo escuro**

Garantir superfícies, bordas, teal, azul, alertas e imagens com contraste adequado, sem aplicar filtro global às imagens.

- [ ] **Step 4: Respeitar redução de movimento**

Desativar transições não essenciais em `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Refinar impressão**

Ocultar mídia decorativa e grandes fundos, preservar títulos e conteúdo, evitar quebras inadequadas e confirmar que todas as seções diferidas estão prontas.

- [ ] **Step 6: Executar testes**

Run: `npx playwright test e2e/smoke.spec.ts e2e/print.spec.ts`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/styles e2e/print.spec.ts e2e/smoke.spec.ts
git commit -m "fix: concluir responsividade e impressão editorial"
```

---

### Task 9: Verificação final, documentação e publicação em preview

**Files:**
- Modify: `docs/design/VISUAL_SYSTEM.md`
- Create: `docs/audits/2026-07-editorial-redesign.md`

**Interfaces:**
- Produces registro de decisões, evidências e desvios intencionais.

- [ ] **Step 1: Executar pipeline completo**

Run: `npm run check:ci`

Expected: lint, typecheck, build, auditorias e Playwright aprovados.

- [ ] **Step 2: Capturar evidências visuais**

Capturar capa, introdução, capítulo 2, capítulo 5, contatos e anexo em desktop e mobile, além do modo escuro e preview de impressão.

- [ ] **Step 3: Comparar com a direção B aprovada**

Registrar pelo menos cinco pontos: hierarquia, paleta, mídia, densidade, navegação, mobile e impressão. Corrigir divergências materiais.

- [ ] **Step 4: Atualizar documentação**

Documentar tokens, mídia, agrupamentos de navegação, regras semânticas, responsividade e impressão.

- [ ] **Step 5: Abrir PR em rascunho e aguardar CI**

PR base `main`, head `design/editorial-contemporaneo-v3`.

- [ ] **Step 6: Publicar preview Vercel**

Validar URL de preview antes de qualquer merge ou promoção a produção.

- [ ] **Step 7: Commit**

```bash
git add docs/design/VISUAL_SYSTEM.md docs/audits/2026-07-editorial-redesign.md
git commit -m "docs: registrar validação do redesign editorial"
```
