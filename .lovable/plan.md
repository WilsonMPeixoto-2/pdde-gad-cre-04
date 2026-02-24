# Plano de Verificação e Melhorias — POP PDDE 4ª CRE
## Atualizado: Fevereiro/2026

---

## 1. VERIFICAÇÃO DO ESTADO ATUAL

### ✅ Implementado e Funcionando

| Componente | Status | Observações |
|---|---|---|
| **Index.tsx** | ✅ | IntersectionObserver, foco programático A11y, lazy loading |
| **HeroCover.tsx** | ✅ | `clamp()`, `text-wrap: balance`, `focus-visible` no scroll button |
| **PopHeader.tsx** | ✅ | Tooltips shadcn, `@supports` fallback, `aria-pressed`, `active:scale-90` |
| **PopSidebar.tsx** | ✅ | `cubic-bezier(0.16,1,0.3,1)`, `hover:translate-x-1`, progress bars |
| **ReadingProgressBar** | ✅ | rAF, ARIA progressbar, gradient shimmer |
| **BackToTop** | ✅ | rAF scroll, pulse-ring, `aria-label` |
| **AnimatedSection** | ✅ | IntersectionObserver via `useScrollAnimation`, `forwardRef` |
| **SectionDivider** | ✅ | `forwardRef`, mesh gradient, animated badge |
| **CommandPalette** | ✅ | Ctrl+K, fuzzy search 18 items, keyboard nav |
| **PDDEChecklist** | ✅ | localStorage v3, confetti, essenciais/complementares |
| **PDDEModelCards** | ✅ | Categorized, 3D hover, tooltips, download all |
| **Callout** | ✅ | `forwardRef`, 3 variants, gradient border |
| **CopyButton** | ✅ | Clipboard API, toast |
| **SeiMockup** | ✅ | 5 variants, animated hover |
| **InfoDrawer** | ✅ | `forwardRef`, Sheet, reusable blocks |
| **ShareQRCode** | ✅ | Canvas QR, native share, copy link |
| **ScopeCallout** | ✅ | Amber alert, LGPD scope |
| **DocumentFooter** | ✅ | Glassmorphism, author signature |
| **SectionLoader** | ✅ | `min-h-[400px]` anti-CLS |
| **Noise texture** | ✅ | SVG fractalNoise global `::before` |
| **prefers-reduced-motion** | ✅ | Global CSS rule |

---

### ⚠️ Gaps Identificados

| # | Área | Gap | Severidade |
|---|---|---|---|
| G1 | `PopSidebar` | `useSectionProgress` usa `getBoundingClientRect` em scroll loop — deveria usar IO | Média |
| G2 | `ScopeCallout` | Cores diretas (`amber-500`) em vez de design tokens | Baixa |
| G3 | `SeiMockup` | Cores hardcoded OK (mockup do SEI), mas faltam `aria-label` nos botões | Média |
| G4 | `ShareQRCode` | QR pseudo-aleatório, não scannable real | Média |
| G5 | `searchIndex` | Anchors errados: "anexos" → "anexo" | Baixa |
| G6 | `BackToTop` | Sem Tooltip (tem title nativo) | Baixa |
| G7 | `HeroCover` | Orbs `blur-[100px]` sem redução mobile | Média |
| G8 | `BrandingBadge` | Sobrepõe BackToTop em mobile | Baixa |
| G9 | `PDDEChecklist` | Sem filtros (Todos/Pendentes/Concluídos) | Feature |
| G10 | `DocumentFooter` | Blur orb sem media query mobile | Baixa |
| G11 | `useReadingProgress` | Hook existe mas NÃO conectado ao Index | Média |
| G12 | `PopHeader` | ShareQRCode button sem Tooltip wrapper | Baixa |

---

## 2. MELHORIAS PRIORITÁRIAS

### Sprint 1 — Quick Wins (30min)
- **M1**: Corrigir anchors searchIndex ("anexos" → "anexo")
- **M4**: Envolver ShareQRCode no header em Tooltip
- **M5**: Adicionar aria-labels ao SeiMockup
- **M8**: Envolver BackToTop em Tooltip
- **M9**: ScopeCallout: usar design tokens

### Sprint 2 — Performance (30min)
- **M2**: Sidebar: migrar `useSectionProgress` para IntersectionObserver
- **M3**: HeroCover: reduzir blur em mobile via media query

### Sprint 3 — Features (1h)
- **M6**: Conectar useReadingProgress ao Index
- **M7**: Checklist: filtros + "Resumo do que falta"

### Sprint 4 — Mobile & UX (2h)
- **M13**: Header mobile overflow menu
- **M14**: Tabelas responsivas (cards no mobile)

### Sprint 5 — Inovação (4h)
- **M11**: Modo Guiado (Wizard) com progresso persistente
- **M12**: Modo Diretor / Modo GAD (seletor de perfil)

### Sprint 6 — Acabamento (1h)
- **M10**: QR Code real (lib qrcode)
- **M15**: Exportação PDF real
- **M16**: BrandingBadge posição mobile

---

## 3. CRITÉRIO AWWWARDS INSTITUCIONAL

### Estética ✅
- [x] Hero memorável (mesh gradient + clamp)
- [x] Noise texture anti-banding
- [x] Microdetalhes consistentes
- [ ] Blur mobile otimizado

### Pedagogia ✅
- [x] Passos numerados, checklists, alertas
- [x] InfoDrawer nato-digital/digitalizado
- [x] Command Palette
- [ ] Filtros checklist
- [ ] Modo Guiado wizard

### Mobile ⚠️
- [x] Sidebar drawer responsivo
- [x] SectionLoader anti-CLS
- [ ] Header overflow menu
- [ ] Tabelas responsivas
- [ ] Hero blur mobile

### Técnico ✅
- [x] IntersectionObserver (Index)
- [x] prefers-reduced-motion
- [x] ARIA, focus management
- [x] Lazy loading
- [x] @supports fallback
- [ ] Sidebar progress IO migration
- [ ] useReadingProgress conectado
