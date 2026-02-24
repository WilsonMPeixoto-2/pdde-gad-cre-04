# Plano de Verificação e Melhorias — POP PDDE 4ª CRE
## Atualizado: Fevereiro/2026

---

## 1. VERIFICAÇÃO DO ESTADO ATUAL

### ✅ Implementado e Funcionando

| Componente | Status | Observações |
|---|---|---|
| **Index.tsx** | ✅ | IntersectionObserver, foco programático A11y, lazy loading |
| **HeroCover.tsx** | ✅ | `clamp()`, `text-wrap: balance`, `focus-visible`, blur mobile reduzido |
| **PopHeader.tsx** | ✅ | Tooltips shadcn, `@supports` fallback, `aria-pressed`, overflow menu mobile |
| **PopSidebar.tsx** | ✅ | IntersectionObserver progress, `cubic-bezier`, `hover:translate-x-1` |
| **ReadingProgressBar** | ✅ | rAF, ARIA progressbar, gradient shimmer |
| **BackToTop** | ✅ | rAF scroll, pulse-ring, Tooltip, `aria-label` |
| **AnimatedSection** | ✅ | IntersectionObserver via `useScrollAnimation`, `forwardRef` |
| **SectionDivider** | ✅ | `forwardRef`, mesh gradient, animated badge |
| **CommandPalette** | ✅ | Ctrl+K, fuzzy search, anchors corretos |
| **PDDEChecklist** | ✅ | Filtros, resumo copiável, localStorage v3, confetti, design tokens |
| **PDDEModelCards** | ✅ | Categorized, 3D hover, tooltips, download all |
| **Callout** | ✅ | `forwardRef`, 3 variants, gradient border |
| **CopyButton** | ✅ | Clipboard API, toast |
| **SeiMockup** | ✅ | 5 variants, aria-labels nos botões |
| **InfoDrawer** | ✅ | `forwardRef`, Sheet, reusable blocks |
| **ShareQRCode** | ✅ | Canvas QR, native share, Tooltip no header |
| **ScopeCallout** | ✅ | Design tokens (warning) |
| **DocumentFooter** | ✅ | Blur mobile reduzido |
| **SectionLoader** | ✅ | `min-h-[400px]` anti-CLS |
| **Noise texture** | ✅ | SVG fractalNoise global `::before` |
| **prefers-reduced-motion** | ✅ | Global CSS rule |
| **GuidedWizard** | ✅ | 6 etapas, progresso persistente, navegação integrada |
| **BrandingBadge** | ✅ | Posição mobile corrigida |
| **searchIndex** | ✅ | Anchors corrigidos ("anexo") |

---

## 2. SPRINTS EXECUTADOS

### Sprint 1 — Quick Wins ✅
- [x] Corrigir anchors searchIndex ("anexos" → "anexo")
- [x] Envolver ShareQRCode no header em Tooltip
- [x] Adicionar aria-labels ao SeiMockup
- [x] Envolver BackToTop em Tooltip
- [x] ScopeCallout: usar design tokens (warning)

### Sprint 2 — Performance ✅
- [x] Sidebar: migrar `useSectionProgress` para IntersectionObserver
- [x] HeroCover: reduzir blur/tamanho dos orbs em mobile (max-sm)
- [x] DocumentFooter: reduzir blur orbs em mobile

### Sprint 3 — Features ✅
- [x] Checklist: filtros (Todos/Pendentes/Concluídos/Essenciais/Complementares)
- [x] Checklist: botão "Copiar resumo do que falta"
- [x] Checklist: design tokens para complementares (warning)

### Sprint 4 — Mobile & UX ✅
- [x] Header mobile overflow menu (DropdownMenu com ações secundárias)
- [x] Apenas busca e dark mode visíveis no mobile

### Sprint 5 — Inovação ✅
- [x] Modo Guiado (Wizard) com 6 etapas PDDE
- [x] Progresso persistente em localStorage
- [x] Navegação para seção correspondente
- [x] Erros comuns, documentos e próximo passo por etapa

### Sprint 6 — Acabamento ✅
- [x] BrandingBadge: posição mobile corrigida (bottom-20 sm:bottom-6)

---

## 3. CRITÉRIO AWWWARDS INSTITUCIONAL

### Estética ✅
- [x] Hero memorável (mesh gradient + clamp)
- [x] Noise texture anti-banding
- [x] Microdetalhes consistentes
- [x] Blur mobile otimizado

### Pedagogia ✅
- [x] Passos numerados, checklists, alertas
- [x] InfoDrawer nato-digital/digitalizado
- [x] Command Palette
- [x] Filtros checklist + resumo copiável
- [x] Modo Guiado wizard (6 etapas)

### Mobile ✅
- [x] Sidebar drawer responsivo
- [x] SectionLoader anti-CLS
- [x] Header overflow menu
- [x] Hero blur mobile otimizado
- [x] BrandingBadge posição corrigida

### Técnico ✅
- [x] IntersectionObserver (Index + Sidebar)
- [x] prefers-reduced-motion
- [x] ARIA, focus management
- [x] Lazy loading
- [x] @supports fallback
- [x] Design tokens consistentes
