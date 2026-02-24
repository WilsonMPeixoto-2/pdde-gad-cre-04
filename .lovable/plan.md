
# Plano de Refatoracao Premium — Awwwards Institucional

Este plano implementa as 3 frentes de melhoria sugeridas pela outra IA, organizadas em fases sequenciais.

---

## Fase 1: Motor de Scroll e Acessibilidade (Index.tsx + PopSidebar.tsx)

### 1.1 Substituir scroll listener por IntersectionObserver

**Arquivo:** `src/pages/Index.tsx` (linhas 68-95)

O scroll handler atual usa `getBoundingClientRect()` em loop dentro de `requestAnimationFrame`, causando reflows. Sera substituido por um `IntersectionObserver` que observa todas as secoes e atualiza `activeSection` passivamente.

```text
Antes (simplificado):
  scroll -> rAF -> loop 9x getBoundingClientRect -> setState

Depois:
  IntersectionObserver (threshold 0.3) -> callback so quando muda -> setState
```

### 1.2 Gestao de foco acessivel no handleSectionClick

**Arquivo:** `src/pages/Index.tsx` (linhas 40-46)

Apos o `scrollIntoView`, transferir o foco programaticamente para o heading da secao correspondente. Os headings `<h2>` das secoes precisarao receber `tabIndex={-1}` para serem focaveis sem aparecer na ordem de tabulacao natural.

### 1.3 Transicoes premium na sidebar

**Arquivo:** `src/components/pop/PopSidebar.tsx`

Substituir a curva de transicao padrao (`ease-out`) nos botoes de navegacao por `cubic-bezier(0.16, 1, 0.3, 1)` para um snappy feel. Garantir que todas as transicoes usem apenas `transform` e `opacity`.

---

## Fase 2: Otimizacao do LCP e Estetica (HeroCover.tsx)

### 2.1 Otimizar animacoes de background

**Arquivo:** `src/components/pop/HeroCover.tsx`

Os orbs animados com `blur-[100px]` ja possuem `will-change` mas usam `animate-pulse` do Tailwind (que anima opacity). Garantir que nenhuma animacao trigger layout/paint continuo. Reduzir blur em mobile via media query para aliviar a GPU.

### 2.2 Adicionar textura noise/grain

**Arquivo:** `src/index.css`

Adicionar um pseudo-elemento `::before` global com um SVG noise data URI ultra-leve (fractal turbulence) sobre toda a pagina. Isso previne color banding nos gradientes e adiciona o toque tatil premium.

### 2.3 Tipografia fluida com clamp() e text-wrap: balance

**Arquivo:** `src/components/pop/HeroCover.tsx`

Substituir as classes responsivas de tamanho do `h1` (`text-5xl sm:text-6xl md:text-7xl lg:text-8xl`) por `clamp()` via style inline. Adicionar `textWrap: 'balance'` para quebra de linha perfeita em qualquer viewport.

### 2.4 Focus-visible no botao de scroll

**Arquivo:** `src/components/pop/HeroCover.tsx`

Adicionar `focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent focus-visible:outline-none` ao botao "Role para continuar".

---

## Fase 3: Refinamento do Header (PopHeader.tsx)

### 3.1 Tooltips com Radix/shadcn

**Arquivo:** `src/components/pop/PopHeader.tsx`

Envolver os botoes de icone (Busca, Theme, ViewMode) em componentes `<Tooltip>` do shadcn/ui, que ja esta instalado. Delay instantaneo com animacao sutil.

### 3.2 Fallback para backdrop-filter

**Arquivo:** `src/components/pop/PopHeader.tsx`

Adicionar `@supports` fallback: se `backdrop-filter` nao for suportado, usar background solido `rgba(15, 23, 42, 0.98)`.

### 3.3 Micro-interacoes nos icones de toggle

**Arquivo:** `src/components/pop/PopHeader.tsx`

Adicionar `transition-transform duration-300 active:scale-90` aos icones de dark mode e view mode para feedback visual premium.

### 3.4 Verificar aria-labels

Os botoes do header ja possuem `aria-label` (verificado no codigo atual). Nenhuma acao necessaria, apenas confirmar durante a implementacao.

---

## Fase 4 (Bonus): Estabilidade de CLS nos lazy-loaded sections

### 4.1 Melhorar SectionLoader

**Arquivo:** `src/pages/Index.tsx` (linhas 26-33)

Dar ao `SectionLoader` uma `min-height` fixa (ex: `min-h-[400px]`) para reservar espaco e evitar saltos de layout (CLS) quando os chunks carregam.

---

## Resumo tecnico

| Fase | Arquivos | Impacto |
|------|----------|---------|
| 1 | Index.tsx, PopSidebar.tsx | Performance (sem reflow), A11y (foco) |
| 2 | HeroCover.tsx, index.css | LCP, estetica premium (noise, clamp) |
| 3 | PopHeader.tsx | UX (tooltips), fallback, micro-interacoes |
| 4 | Index.tsx (SectionLoader) | CLS estavel |

Nenhuma dependencia nova sera adicionada. Todos os componentes ja existem no projeto (Tooltip do shadcn, IntersectionObserver nativo).
