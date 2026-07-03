# Sistema Visual Institucional

Este documento orienta a composição visual do Guia PDDE no SEI!RIO e reduz a proliferação de estilos isolados, efeitos decorativos e componentes inconsistentes.

## Direção estética

O projeto deve parecer um guia institucional digital contemporâneo: claro, sóbrio, legível e tecnicamente confiável. A interface não deve competir com o conteúdo normativo nem assumir estética de painel comercial, aplicativo promocional ou landing page genérica.

## Tipografia

| Função | Família | Uso |
|---|---|---|
| Corpo e interface | Public Sans | Texto corrido, tabelas, botões, metadados e controles |
| Títulos e hierarquia | Plus Jakarta Sans | H1, títulos de seção, cabeçalhos e números editoriais |
| Recurso editorial | Source Serif 4 | Citações, cartas, epígrafes e trechos que realmente exijam contraste editorial |
| Dados e códigos | Família monoespaçada do sistema | NUP, CNPJ, códigos, identificadores e exemplos técnicos |

Regras:

- não justificar texto em tela;
- limitar texto corrido a aproximadamente 70 caracteres por linha;
- usar entrelinha generosa, mas não superior ao necessário;
- evitar tracking excessivo em textos longos;
- reservar caixa alta para rótulos curtos.

## Espaçamento

A escala recomendada utiliza múltiplos próximos de 4 px:

- 4 px: microajustes;
- 8 px: relação entre ícone e texto curto;
- 12 px: agrupamentos compactos;
- 16 px: espaçamento interno padrão;
- 24 px: separação entre blocos relacionados;
- 32 px: separação entre grupos principais;
- 48–64 px: transição entre seções.

Não usar margens diferentes sem função clara. Componentes equivalentes devem manter o mesmo espaçamento interno.

## Cores

- azul institucional: ações, navegação e destaques principais;
- azul-céu: acento pontual em fundo escuro;
- verde: somente estados concluídos ou sucesso;
- âmbar: cautela e validação pendente;
- vermelho: erro ou bloqueio real;
- grafite e cinzas frios: texto, bordas e superfícies neutras.

Evitar:

- gradientes multicoloridos em elementos pequenos;
- texto com gradiente;
- cores decorativas sem significado semântico;
- contraste baseado apenas em opacidade muito baixa.

## Superfícies

Cartões e painéis devem usar:

- raio entre 9 e 17 px;
- borda visível e discreta;
- sombra curta e baixa;
- fundo predominantemente plano;
- elevação apenas quando necessário para hierarquia.

Evitar:

- arredondamento de 24–32 px em todos os componentes;
- múltiplas sombras simultâneas;
- máscaras, brilhos, textura e ruído em cartões comuns;
- movimento vertical no hover de blocos de leitura.

## Botões

Os botões devem:

- ter altura entre 36 e 44 px;
- usar raio aproximado de 10 px;
- manter ícones com stroke consistente;
- apresentar foco visível;
- mudar cor, borda ou sombra no hover, sem saltos ou rotações.

Botões arredondados em formato de cápsula devem ser reservados a filtros ou estados muito compactos.

## Ícones

Todos os ícones de interface devem utilizar Lucide e, preferencialmente, o componente `IconTile` quando inseridos em cartões ou cabeçalhos.

- tamanho visual consistente;
- stroke entre 1,8 e 2;
- moldura neutra ou semântica;
- sem pulsação contínua;
- sem rotação decorativa no hover.

## Etapas e losangos

O componente `StepDiamond` é a única representação gráfica dos números de etapa em formato de losango.

Estados:

- azul: etapa atual ou disponível;
- verde: concluída;
- cinza: ainda indisponível.

Regras de diagramação:

- conteúdo interno deve permanecer horizontal;
- conectores devem alinhar ao centro geométrico do losango;
- rótulos devem ficar abaixo, com largura controlada;
- em telas menores, a grade deve quebrar em 3 ou 2 colunas sem conectores atravessando linhas.

## Organização dos arquivos

```text
src/
  components/
    ui/           componentes básicos de interação
    visual/       primitivas visuais reutilizáveis
    pop/          composição e conteúdo das seções do guia
  styles/
    institutional-polish.css
```

Componentes visuais genéricos não devem ser criados dentro de `components/pop`. Estilos globais de refinamento não devem ser adicionados diretamente em componentes por meio de grandes objetos `style`.

## Critérios de revisão visual

Antes da publicação, conferir:

- alinhamento de ícones, títulos e ações;
- hierarquia tipográfica consistente;
- contraste claro nos modos claro e escuro;
- ausência de texto justificado;
- responsividade dos losangos e tabelas;
- foco visível em todos os controles;
- coerência entre capa, divisores, cartões e modo guiado;
- impressão sem fundos ou efeitos desnecessários.
