# POP PDDE no SEI!RIO - 4ª CRE

Aplicação web institucional com orientações operacionais para a instrução da prestação de contas do PDDE no SEI!RIO, voltada às unidades escolares e à GAD da 4ª CRE.

## Produção

- Site publicado: [https://pdde-gad-cre-04.vercel.app/](https://pdde-gad-cre-04.vercel.app/)
- Repositório: [https://github.com/WilsonMPeixoto-2/pdde-gad-cre-04](https://github.com/WilsonMPeixoto-2/pdde-gad-cre-04)
- Deploy: Vercel

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Sonner

## Desenvolvimento local

Pré-requisitos:

- Node.js 20 ou superior
- npm

Instalação e execução:

```sh
npm install
npm run dev
```

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
npm run check:pdfs
npm run check:all
npm run check:ci
npm run test:e2e
npm run test:e2e:ui
```

## Estrutura principal

- `src/pages/Index.tsx`: página principal publicada
- `src/components/pop`: seções e componentes específicos do guia
- `src/components/ui`: componentes base da interface
- `public`: manifesto, service worker, ícones e arquivos públicos
- `scripts`: auditorias, leitura do acervo PDF e geração de ativos da marca

## Publicação

O deploy de produção é feito pela Vercel a partir deste repositório.

## Manutenção

- Mantenha `package-lock.json` sincronizado com `package.json`
- Use `npm` como gerenciador principal de pacotes
- Atualize o manifesto de PDFs com `npm run sync:pdf-manifest` sempre que substituir arquivos em `public/models`
- Rode `npm run check:content` para validar manifesto, âncoras e links oficiais antes de publicar revisões editoriais
- Rode `npm run check:pdfs` quando houver troca no acervo de modelos e referências em PDF
- Rode `npm run check:ci` antes de publicar mudanças relevantes de interface, conteúdo ou arquivos do acervo
- Revise metadados públicos (`index.html`, `manifest.json`, `robots.txt`, `sitemap.xml`) sempre que o domínio ou a identidade institucional mudarem
