# POP PDDE no SEI!RIO - 4ª CRE

Aplicação web institucional com orientações operacionais para instrução da prestação de contas do PDDE no SEI!RIO, voltada a equipes escolares e à GAD da 4ª CRE.

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

## Scripts

```sh
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
npm run sync:pdf-manifest
npm run sync:capabilities
npm run sync:release-notes
npm run sync:reference-governance
npm run sync:brand-assets
npm run check:content
npm run check:all
```

## Registros do produto

- Registro versionado das funções do guia: [`docs/REGISTRO_CAPACIDADES_GUIA.md`](docs/REGISTRO_CAPACIDADES_GUIA.md)
- Histórico recente de melhorias visíveis ao usuário: [`docs/NOVIDADES_RECENTES_GUIA.md`](docs/NOVIDADES_RECENTES_GUIA.md)
- Mapa de rastreabilidade das fontes oficiais: [`docs/MAPA_REFERENCIAS_OFICIAIS.md`](docs/MAPA_REFERENCIAS_OFICIAIS.md)
- Gere ou atualize esse registro com `npm run sync:capabilities`
- Gere ou atualize o histórico recente com `npm run sync:release-notes`
- Gere ou atualize o mapa de referências com `npm run sync:reference-governance`
- Gere ou atualize favicon, ícones do app e imagem social com `npm run sync:brand-assets`

## Estrutura principal

- `src/pages/Index.tsx`: página principal publicada
- `src/components/pop`: seções e componentes específicos do guia
- `src/components/ui`: componentes base da interface
- `public`: manifesto, service worker e arquivos públicos

## Publicação

O deploy de produção é feito pela Vercel a partir deste repositório.

## Manutenção

- Mantenha `package-lock.json` sincronizado com `package.json`
- Use `npm` como gerenciador principal de pacotes
- Atualize o manifesto de PDFs com `npm run sync:pdf-manifest` sempre que substituir arquivos em `public/models`
- Rode `npm run check:content` para validar manifesto, âncoras e links oficiais antes de publicar revisões editoriais
- Revise metadados públicos (`index.html`, `manifest.json`, `robots.txt`, `sitemap.xml`) sempre que o domínio ou a identidade institucional mudarem
