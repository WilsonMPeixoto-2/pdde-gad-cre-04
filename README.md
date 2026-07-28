# POP PDDE no SEI!RIO - 4ª CRE

Aplicação web institucional com orientações operacionais para a instrução da prestação de contas do PDDE no SEI!RIO, voltada às unidades escolares e à GAD da 4ª CRE.

## Produção

- Site publicado: [https://pdde-gad-cre-04.vercel.app/](https://pdde-gad-cre-04.vercel.app/)
- Repositório: [https://github.com/WilsonMPeixoto-2/pdde-gad-cre-04](https://github.com/WilsonMPeixoto-2/pdde-gad-cre-04)
- Deploy: Vercel
- Edição atual: 2.7.0 — julho de 2026

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Sonner

## Desenvolvimento local

Pré-requisitos:

- Node.js 24.x
- npm 11.x

Instalação e execução:

```sh
npm ci
npm run dev
```

O npm é o único gerenciador oficial deste repositório. O arquivo `package-lock.json` é a fonte de verdade das versões resolvidas.

## Scripts disponíveis

```sh
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
npm run sync:pdf-manifest
npm run sync:brand-assets
npm run check:content
npm run check:normative
npm run check:pdfs
npm run check:bundle-budget
npm run analyze:bundle
npm run audit:security
npm run audit:unused
npm run lighthouse
npm run check:all
npm run check:ci
npm run test:e2e
npm run test:e2e:ui
```

## Estrutura principal

- `src/pages/Index.tsx`: página principal publicada
- `src/components/pop`: seções e componentes específicos do guia
- `src/components/ui`: componentes base da interface
- `src/components/visual`: primitivas gráficas institucionais reutilizáveis
- `src/lib`: conteúdo estruturado, regras, metadados e utilitários
- `public`: manifesto, service worker, ícones e arquivos públicos
- `scripts`: auditorias, leitura do acervo PDF, orçamento de bundle e geração de ativos da marca
- `e2e`: contratos Playwright de comportamento, conteúdo, acessibilidade, impressão e PWA

## Publicação

O deploy de produção é feito pela Vercel a partir da branch `main`. Alterações devem passar pelo pipeline `npm run check:ci` e por revisão humana antes do merge.

## Manutenção

- Mantenha `package-lock.json` sincronizado com `package.json`.
- Não use Bun, pnpm ou Yarn para alterar dependências deste repositório.
- Atualize o manifesto de PDFs com `npm run sync:pdf-manifest` sempre que substituir arquivos em `public/models`.
- Rode `npm run check:content` para validar manifesto, âncoras e links oficiais antes de publicar revisões editoriais.
- Rode `npm run check:pdfs` quando houver troca no acervo de modelos e referências em PDF.
- Rode `npm run audit:security` após alterações de dependências.
- Rode `npm run audit:unused` para identificar dependências e arquivos potencialmente sem uso; revise falsos positivos antes de remover código.
- Rode `npm run analyze:bundle` quando uma mudança puder afetar o peso do carregamento.
- Rode `npm run lighthouse` para verificar a linha de base de desempenho, acessibilidade, boas práticas e SEO.
- Rode `npm run check:ci` antes de publicar mudanças relevantes de interface, conteúdo ou arquivos do acervo.
- Revise metadados públicos (`index.html`, `manifest.json`, `robots.txt`, `sitemap.xml`) sempre que o domínio ou a identidade institucional mudarem.
