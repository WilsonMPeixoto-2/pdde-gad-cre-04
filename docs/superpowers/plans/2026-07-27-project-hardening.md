# Saneamento técnico integral do Guia PDDE — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sanear dependências, governança, desempenho, acessibilidade, segurança e robustez do Guia PDDE sem alterar conteúdo normativo ou a experiência editorial aprovada.

**Architecture:** A execução será incremental, com mudanças pequenas e verificáveis sobre a `main` publicada. Configurações de qualidade serão adicionadas antes dos gates rígidos; refatorações preservarão as interfaces existentes e os testes E2E serão usados como contrato de comportamento.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Playwright, Axe, npm, Vercel.

## Global Constraints

- Repositório exclusivo: `WilsonMPeixoto-2/pdde-gad-cre-04`.
- Branch: `chore/project-hardening-v2.7`.
- Node.js oficial: 24.x.
- Gerenciador oficial: npm.
- Versão-alvo: 2.7.0.
- Data de modificação: 2026-07-27.
- Não alterar conteúdo normativo.
- Não adicionar backend ou biblioteca gráfica de interface.
- Não mesclar antes de `npm run check:ci`, auditoria de segurança e revisão do PR.

---

### Task 1: Sanear manifestos e dependências

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Delete: `bun.lock`
- Modify: `README.md`
- Modify: `.github/workflows/quality.yml`

**Interfaces:**
- Produces: ambiente oficial Node 24 + npm; scripts `audit:security`, `audit:unused`, `analyze:bundle`, `lighthouse`.

- [ ] Atualizar `postcss` para uma versão corrigida da linha 8.
- [ ] Remover `date-fns` do manifesto e lockfile.
- [ ] Adicionar `packageManager` e `engines`.
- [ ] Remover `bun.lock`.
- [ ] Alinhar README e CI ao Node 24.
- [ ] Atualizar Playwright dentro da linha 1.x.
- [ ] Instalar `knip`, `rollup-plugin-visualizer`, `@lhci/cli` e `eslint-plugin-jsx-a11y` como dependências de desenvolvimento.
- [ ] Executar `npm ci`, `npm audit --audit-level=high` e `npm run check:ci`.
- [ ] Commit: `chore: sanear dependências e padronizar ambiente`.

### Task 2: Sincronizar versão e governança de release

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/lib/guideVersion.ts`
- Create: `docs/releases/2.7.0.md`
- Modify: `README.md`

**Interfaces:**
- Produces: `GUIDE_VERSION` com número `2.7.0`, data `2026-07-27` e rótulo `Julho/2026`.

- [ ] Escrever teste E2E que confirme versão e data exibidas/metadados.
- [ ] Executar o teste e confirmar falha com a versão 2.6.0.
- [ ] Atualizar os quatro pontos de versão.
- [ ] Criar nota de release com escopo técnico e limites normativos.
- [ ] Executar teste de versão, build e auditoria de conteúdo.
- [ ] Commit: `chore: publicar metadados da versão 2.7.0`.

### Task 3: Fortalecer lint e acessibilidade estática

**Files:**
- Modify: `eslint.config.js`
- Modify: `src/components/pop/PDDEChecklist.tsx`
- Modify: `index.html`
- Modify: `src/index.css`
- Test: `e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: `useReducedMotion(): boolean`.
- Produces: confete condicionado a movimento permitido; skeleton sem animação em redução de movimento.

- [ ] Adicionar regras recomendadas de `eslint-plugin-jsx-a11y` para TSX.
- [ ] Escrever teste E2E com `reducedMotion: "reduce"` verificando ausência de canvas de confete.
- [ ] Executar teste e confirmar falha.
- [ ] Usar `useReducedMotion` no checklist e manter feedback textual.
- [ ] Adicionar media query de redução de movimento ao CSS crítico do skeleton.
- [ ] Remover `translateY(-2px)` dos cartões de leitura.
- [ ] Executar lint, Axe e E2E.
- [ ] Commit: `fix: respeitar redução de movimento e reforçar semântica`.

### Task 4: Adicionar análise de bundle e orçamento

**Files:**
- Modify: `vite.config.ts`
- Create: `scripts/check-bundle-budget.ts`
- Modify: `package.json`
- Modify: `.github/workflows/quality.yml`

**Interfaces:**
- Produces: `npm run analyze:bundle` e `npm run check:bundle-budget`.

- [ ] Criar script que leia `dist/assets`, identifique JS/CSS principais e falhe acima dos limites iniciais documentados.
- [ ] Adicionar visualizer somente quando `ANALYZE_BUNDLE=true`.
- [ ] Definir orçamento inicial: JS principal até 550 kB bruto; CSS principal até 280 kB bruto.
- [ ] Executar build e confirmar relatório.
- [ ] Adicionar orçamento ao `check:all`.
- [ ] Upload do relatório HTML no CI quando gerado.
- [ ] Commit: `chore: adicionar orçamento e análise do bundle`.

### Task 5: Adicionar Lighthouse CI

**Files:**
- Create: `lighthouserc.cjs`
- Modify: `package.json`
- Modify: `.github/workflows/quality.yml`

**Interfaces:**
- Produces: `npm run lighthouse` contra `dist` servido localmente.

- [ ] Configurar coleta única inicial em Chromium.
- [ ] Definir mínimos conservadores: accessibility 0.95, best-practices 0.90, SEO 0.90; performance apenas informativa na primeira rodada.
- [ ] Executar Lighthouse localmente e registrar linha de base.
- [ ] Adicionar execução ao CI após `check:ci`.
- [ ] Upload de `.lighthouseci` como artefato com `if: always()`.
- [ ] Commit: `test: adicionar linha de base Lighthouse CI`.

### Task 6: Remover fragilidade da geração de JSON-LD

**Files:**
- Create: `src/lib/guideMetadata.ts`
- Modify: `src/lib/guideContent.ts`
- Modify: `vite.config.ts`
- Test: `e2e/metadata.spec.ts`

**Interfaces:**
- Produces: `getGuideHowToSteps(): GuideHowToStep[]` sem leitura textual ou regex.

- [ ] Escrever teste que valide seis etapas, ordem e textos no JSON-LD.
- [ ] Criar módulo puro de metadados compartilhado pelo conteúdo e build.
- [ ] Substituir `readFileSync` e regex em `vite.config.ts` por importação estruturada.
- [ ] Executar teste, typecheck e build.
- [ ] Commit: `refactor: gerar metadados a partir de dados estruturados`.

### Task 7: Reduzir responsabilidades de Index

**Files:**
- Create: `src/hooks/useDeferredGuideSections.ts`
- Create: `src/hooks/useGuidePrintCoordinator.ts`
- Modify: `src/pages/Index.tsx`
- Test: `e2e/print.spec.ts`
- Test: `e2e/smoke.spec.ts`

**Interfaces:**
- `useDeferredGuideSections` produz estados, ativação individual, ativação integral e resolução de seções.
- `useGuidePrintCoordinator` produz `isPreparingPrint` e `handlePrint()`.

- [ ] Registrar testes existentes de navegação diferida, falha e impressão como linha de base.
- [ ] Extrair carregamento diferido sem mudar nomes de eventos ou atributos `data-*`.
- [ ] Executar smoke e impressão.
- [ ] Extrair coordenação de impressão.
- [ ] Executar suíte completa.
- [ ] Commit: `refactor: separar coordenação de seções e impressão`.

### Task 8: Primeira etapa de TypeScript estrito

**Files:**
- Modify: `tsconfig.app.json`
- Modify: `tsconfig.json`
- Modify: arquivos de `src` necessários para correções de nulabilidade

**Interfaces:**
- Produces: `strictNullChecks: true` e `noFallthroughCasesInSwitch: true` na aplicação.

- [ ] Ativar `strictNullChecks` e `noFallthroughCasesInSwitch`.
- [ ] Executar `npm run typecheck` e registrar erros.
- [ ] Corrigir nulabilidade com narrowing, guardas e tipos explícitos; não usar `any` ou `!` sem justificativa.
- [ ] Executar `npm run check:ci`.
- [ ] Commit: `refactor: ativar primeira etapa de TypeScript estrito`.

### Task 9: Introduzir CSP em modo de observação

**Files:**
- Modify: `vercel.json`
- Test: `e2e/security-headers.spec.ts`

**Interfaces:**
- Produces: cabeçalho `Content-Security-Policy-Report-Only` compatível com os ativos atuais.

- [ ] Escrever teste de cabeçalhos no preview local ou deployment.
- [ ] Adicionar política report-only com `default-src 'self'`, permissões explícitas para estilos, scripts, imagens, fontes, workers e conexões necessárias.
- [ ] Validar PWA, fontes, JSON-LD, CSS crítico e navegação.
- [ ] Commit: `security: adicionar CSP em modo report-only`.

### Task 10: Governança do PR substituído e validação final

**Files:**
- Modify: documentação do PR nº 8 pelo GitHub
- Modify: `docs/superpowers/plans/2026-07-27-project-hardening.md` marcando conclusão

**Interfaces:**
- Produces: PR nº 8 fechado como substituído; novo PR de saneamento pronto para revisão.

- [ ] Fechar PR nº 8 com comentário explicando substituição pelo PR nº 10 e pela `main` atual.
- [ ] Executar `npm ci` em ambiente limpo.
- [ ] Executar `npm audit --audit-level=high`.
- [ ] Executar `npm run check:ci`.
- [ ] Executar `npm run check:bundle-budget`.
- [ ] Executar `npm run lighthouse`.
- [ ] Inspecionar relatórios Playwright, Lighthouse e bundle.
- [ ] Abrir PR com inventário de mudanças, riscos, testes e instrução explícita de não merge automático.
