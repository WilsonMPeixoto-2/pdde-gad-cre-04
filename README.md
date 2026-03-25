# POP PDDE no SEI!RIO - 4a CRE

Aplicacao web institucional com orientacoes operacionais para instrucao da prestacao de contas do PDDE no SEI!RIO, voltada a equipes escolares e a GAD da 4a CRE.

## Producao

- Site publicado: [https://pdde-gad-cre-04.vercel.app/](https://pdde-gad-cre-04.vercel.app/)
- Repositorio: [https://github.com/WilsonMPeixoto-2/pdde-gad-cre-04](https://github.com/WilsonMPeixoto-2/pdde-gad-cre-04)
- Deploy: Vercel

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Sonner

## Desenvolvimento local

Prerequisitos:

- Node.js 20 ou superior
- npm

Instalacao e execucao:

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
```

## Estrutura principal

- `src/pages/Index.tsx`: pagina principal publicada
- `src/components/pop`: secoes e componentes especificos do guia
- `src/components/ui`: componentes base da interface
- `public`: manifesto, service worker e arquivos publicos

## Publicacao

O deploy de producao e feito pela Vercel a partir deste repositorio.

## Manutencao

- Mantenha `package-lock.json` sincronizado com `package.json`
- Use `npm` como gerenciador principal de pacotes
- Revise metadados publicos (`index.html`, `manifest.json`, `robots.txt`, `sitemap.xml`) sempre que o dominio ou a identidade institucional mudarem
