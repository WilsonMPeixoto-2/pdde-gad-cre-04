

# Plano de Implementacao Fracionado — Revisao e Melhorias Gerais

## Visao Geral

O plano esta dividido em **8 fracoes independentes**, cada uma pequena o suficiente para ser executada sem sobrecarga. As fracoes seguem uma ordem de dependencia logica: primeiro correcoes de bugs e conteudo, depois design system, depois polish visual.

---

## Fracao 1 — Correcao de Bugs de Numeracao, Datas e Dark Mode Critico

**Arquivos**: `SectionContacts.tsx`, `DocumentFooter.tsx`, `ScopeCallout.tsx`

**Problemas identificados**:
- `SectionContacts.tsx` linha 14: exibe `section-number` = "6", mas no sidebar e na pagina e a secao **7**. Corrigir para "7".
- `SectionContacts.tsx` linha 230 e `DocumentFooter.tsx` linha 35: data "16 de dezembro de 2025" desatualizada. Atualizar para "Fevereiro de 2026".
- `DocumentFooter.tsx` linha 19: `from-slate-50 to-white` hardcoded — quebra dark mode.
- `ScopeCallout.tsx` linhas 9-10: `text-slate-900` e `text-slate-700` — ja tem dark variants, mas confirmar consistencia.

**Alteracoes**:
1. Corrigir numero da secao Contatos de "6" para "7"
2. Atualizar datas para fevereiro/2026
3. Substituir cores hardcoded do DocumentFooter por tokens semanticos
4. Revisar ScopeCallout — ja tem dark: variants, manter

---

## Fracao 2 — Substituicao de Cores Hardcoded em SectionTwo (Dark Mode)

**Arquivo**: `SectionTwo.tsx`

**Problema**: 59 ocorrencias de `text-slate-*` sem dark mode variants. Texto fica invisivel no dark mode.

**Alteracoes** (substituicoes sistematicas):
- `text-slate-700` → `text-foreground/80` (ou adicionar `dark:text-slate-300`)
- `text-slate-900` → `text-foreground`
- `text-slate-800` → `text-foreground`
- `text-slate-600` → `text-muted-foreground`
- `bg-slate-100/80` → `bg-muted`
- `border-slate-200/60` → `border-border`
- `from-slate-50` → `from-secondary`
- `from-white to-sky-50/50` → `from-card to-sky-50/50 dark:from-card dark:to-sky-950/20`
- `from-white to-primary/5` → `from-card to-primary/5`

---

## Fracao 3 — Dark Mode em SectionFour e SectionFive

**Arquivos**: `SectionFour.tsx`, `SectionFive.tsx`

**Acao**: Buscar e corrigir qualquer cor hardcoded (`text-slate-*`, `bg-white`, `from-white`) sem dark variants, aplicando o mesmo padrao da Fracao 2.

---

## Fracao 4 — Polish do HeroCover e Animacoes

**Arquivo**: `HeroCover.tsx`, `src/index.css`

**Melhorias**:
- Adicionar animacao de entrada suave (staggered) nos glass cards usando delays CSS
- Ajustar o scroll indicator para ter um efeito mais elegante
- Atualizar versao de "V. 1.4" / "Janeiro/2026" para "V. 1.5" / "Fevereiro/2026"
- Adicionar `will-change: transform` nos orbs para melhor performance de animacao

---

## Fracao 5 — Polish da Sidebar e Navegacao

**Arquivo**: `PopSidebar.tsx`, `PopHeader.tsx`

**Melhorias**:
- Adicionar indicador visual de progresso de leitura por secao na sidebar (dot ou barra ao lado de cada item)
- Melhorar transicao de hover nos itens de navegacao
- Garantir que o titulo "Declaracao de Autenticidade" no sidebar (secao 4) esteja alinhado com o titulo real da secao

---

## Fracao 6 — Melhorias de Tipografia e Espacamento Global

**Arquivo**: `src/index.css`

**Melhorias**:
- Refinar `.section-card` com sombras mais suaves e bordas arredondadas maiores
- Melhorar `.section-heading` com tracking e peso mais refinados
- Adicionar transicao suave (`transition-colors`) ao `.section-number` no hover
- Melhorar `.highlight-box` e `.step-indicator` com gradientes mais sutis
- Garantir que `.table-institutional` tenha bom contraste no dark mode

---

## Fracao 7 — Melhorias de UX: Modelos PDF e Funcionalidades

**Arquivo**: `SectionTwo.tsx`

**Melhorias**:
- Adicionar botao "Baixar Todos os Modelos" (ZIP) — se viavel com edge function, ou pelo menos agrupar visualmente
- Melhorar os cards de download com preview do nome do arquivo
- Adicionar tooltip com o tamanho estimado do arquivo
- Verificar se todos os links de PDF estao funcionais

---

## Fracao 8 — Polish Final e Micro-interacoes Premium

**Arquivos**: Varios componentes

**Melhorias Awwwards-level**:
- Adicionar `framer-motion` (ou CSS puro) para transicoes de entrada mais suaves nas secoes
- Micro-interacoes nos checkboxes do PDDEChecklist (confetti sutil ao completar 100%)
- Hover states mais elaborados nos link-cards (escala + sombra)
- Melhorar o ReadingProgressBar com gradiente animado
- Noise texture sutil no background geral

---

## Dependencias e Sequencia

```text
Fracao 1 (bugs)
    |
Fracao 2 (dark mode SectionTwo)
    |
Fracao 3 (dark mode SectionFour/Five)
    |
Fracao 4 (HeroCover polish)  ──┐
Fracao 5 (Sidebar polish)    ──┤── podem ser paralelas
Fracao 6 (Tipografia CSS)    ──┘
    |
Fracao 7 (UX/PDFs)
    |
Fracao 8 (Polish final)
```

As Fracoes 1-3 sao pre-requisitos (corrigem bugs). As Fracoes 4-6 sao independentes entre si. A Fracao 7 depende de layout estavel. A Fracao 8 e o polimento final.

## Pacotes

Os pacotes atuais estao em versoes recentes e adequadas. Nao ha necessidade critica de atualizar nenhum pacote neste momento. O unico pacote opcional a considerar futuramente seria `framer-motion` para animacoes mais elaboradas (Fracao 8), mas as animacoes CSS atuais ja sao de boa qualidade.

## Principios de Seguranca Anti-Regressao

- Cada fracao altera um conjunto isolado de arquivos
- Nenhuma fracao altera estrutura de dados ou logica de estado
- Todas as mudancas sao visuais/textuais — sem risco de quebra funcional
- O conteudo PDDE corrigido nas fases anteriores e preservado integralmente

