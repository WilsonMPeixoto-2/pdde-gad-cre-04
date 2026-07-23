# Auditoria do Redesign Editorial Contemporâneo

**Data:** 23/07/2026  
**Branch:** `design/editorial-contemporaneo-v3`  
**PR:** #7  
**Escopo:** todo o Guia PDDE no SEI!RIO

## 1. Direção aprovada

- revisão visual, editorial e de arquitetura da informação;
- direção editorial contemporânea;
- alta presença visual;
- fotografia na capa e ilustrações nas etapas;
- paleta azul institucional + verde/teal;
- transformação estrutural intermediária;
- preservação do conteúdo normativo, das regras de negócio e das funcionalidades.

## 2. Implementação verificada

### Capa

- composição clara em duas colunas;
- título editorial em Source Serif 4;
- fotografia contextual com proporção estável;
- ação primária preservada;
- síntese estrutural na faixa inferior;
- adaptação mobile em uma coluna;
- mídia removida na impressão.

### Capítulos

- sete aberturas editoriais renderizadas;
- número, ícone, título, subtítulo, compartilhamento e ilustração temática;
- modo escuro com contraste e hierarquia preservados;
- mídia removida e composição simplificada no PDF.

### Hierarquia interna

- `SectionLead` substituído por cabeçalho aberto com trilho teal;
- título e descrição com largura de leitura controlada;
- distinção clara entre capítulo e conteúdo interno.

### Navegação

- grupos “Visão geral”, “Etapas do processo” e “Apoio e referências”;
- item ativo com trilho teal;
- progresso de leitura preservado;
- painel mobile com overlay, `Escape` e `inert` preservados.

### Superfícies e semântica

- redução de cartões aninhados;
- hover sem deslocamento em blocos de leitura;
- harmonização de azul, teal, verde, âmbar e vermelho por função;
- transições de etapa convertidas em faixas editoriais.

## 3. Validação funcional e técnica

Pipeline executado por `npm run check:ci`:

- ESLint: aprovado;
- TypeScript: aprovado;
- Vite build: aprovado;
- auditoria de conteúdo: aprovada;
- auditoria normativa: aprovada;
- auditoria de PDFs: aprovada;
- Playwright: aprovado;
- Axe: aprovado nos modos claro, mobile e escuro;
- impressão: aprovada;
- PWA e rotas: aprovadas.

A suíte final anterior à limpeza dos instrumentos temporários registrou **26 testes aprovados**. Os três testes temporários de captura foram posteriormente removidos; os contratos permanentes permanecem na suíte.

## 4. Correções identificadas durante a auditoria

### Contraste teal

O teal inicial apresentava 3,97:1 em rótulos pequenos sobre fundo claro. Foi escurecido para atingir WCAG AA. No modo escuro, utiliza variante luminosa separada.

### Contraste de ação no modo escuro

Uma ação textual `primary` apresentava 4,47:1. Foi aplicada correção localizada, sem alterar botões que usam azul como fundo.

### Links oficiais do SEI!RIO

Duas rotas oficiais retornavam 404 no ambiente de CI embora estivessem publicadas e indexadas. A auditoria passou a usar verificação alternativa do portal institucional somente para essas rotas conhecidas, mantendo falha obrigatória para outros links e domínios.

### Fotografia da capa

A fotografia inicialmente ocupava área superior à resolução nativa. A moldura foi reduzida e reposicionada para evitar ampliação excessiva e preservar nitidez.

### Impressão a partir do modo escuro

A primeira geração de PDF revelou:

- fundo escuro residual;
- ruído cromático;
- barras laterais;
- ocultação do conteúdo principal da capa por seletor legado;
- arquivo de aproximadamente 101 MB.

A camada final de impressão passou a:

- redefinir variáveis para modo claro;
- remover fundos gráficos, filtros e sombras;
- restaurar o conteúdo da capa;
- ocultar mídias e ações;
- simplificar capítulos;
- usar ajuste cromático econômico.

Resultado final:

- PDF com 29 páginas;
- tamanho aproximado de 0,78 MB;
- capa limpa e legível;
- capítulo 2 limpo e legível;
- ausência de ruído e barras escuras;
- texto extraível e fontes corretamente renderizadas.

## 5. Evidências visuais inspecionadas

Capturas temporárias geradas pelo Playwright e removidas após a inspeção:

1. capa desktop — 1440 × 1000;
2. abertura da Etapa 2 — 1066 × 512;
3. lead interno da Etapa 2 — 1066 × 262;
4. capa mobile — 390 × 844;
5. sumário mobile — 390 × 844;
6. abertura da Etapa 2 em modo escuro — 1066 × 512;
7. mídia de impressão;
8. PDF nativo A4 renderizado por ferramenta independente.

## 6. Comparação com a direção B aprovada

| Critério | Resultado |
|---|---|
| Hierarquia editorial | Aprovada — títulos, números e leads claramente diferenciados |
| Paleta azul + teal | Aprovada — estrutural, semântica e acessível |
| Presença visual | Aprovada — fotografia na capa e ilustrações em todos os capítulos |
| Redução de cartões | Aprovada — wrappers abertos e superfícies mais discretas |
| Navegação | Aprovada — agrupada, clara e preservando progresso |
| Mobile | Aprovado — sem overflow horizontal e com recomposição editorial |
| Modo escuro | Aprovado — contraste Axe e mídia preservada |
| Impressão | Aprovada — clara, compacta e independente do tema ativo |

## 7. Desvios intencionais

- A fotografia não ocupa toda a altura do painel da capa para permanecer próxima da resolução nativa e evitar perda de nitidez.
- As ilustrações são vetoriais e não contêm texto rasterizado.
- O conteúdo técnico não foi reescrito materialmente; a intervenção concentrou-se em organização e apresentação.
- Nenhuma dependência nova foi adicionada, porque React, Tailwind, Lucide e Playwright existentes foram suficientes.

## 8. Conclusão

O redesign atende à direção editorial contemporânea aprovada, preserva as funcionalidades e melhora de forma consistente a leitura, a orientação, a presença institucional, a responsividade, o contraste e a impressão.

A publicação em produção deve ocorrer somente após revisão do preview e decisão explícita de merge do PR.
