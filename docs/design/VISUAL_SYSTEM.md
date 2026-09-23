# Sistema Visual Institucional

Este documento orienta a composição visual do Guia PDDE no SEI!RIO e reduz a proliferação de estilos isolados, efeitos decorativos e componentes inconsistentes.

## Direção estética

O projeto deve parecer um guia institucional digital contemporâneo: claro, sóbrio, legível e tecnicamente confiável. A interface não deve competir com o conteúdo normativo nem assumir estética de painel comercial, aplicativo promocional ou landing page genérica.

## Referência operacional vinculante

As Etapas 3 e 4 publicadas em julho de 2026 constituem a referência de composição para o conteúdo operacional do guia. A capa e a apresentação podem manter linguagem editorial própria, mas as áreas de instrução, checklist, modelos, minutas, referências e suporte devem preservar a mesma gramática visual.

Características obrigatórias do padrão:

- `SectionLead` como abertura de cada etapa, com rótulo curto, título forte e descrição de largura controlada;
- separação vertical de aproximadamente 32 px entre blocos principais;
- `section-card` como superfície principal, com raio próximo de 12–17 px, borda fria visível e sombra discreta;
- títulos internos entre 20 e 24 px e corpo de texto entre 14 e 16 px, sempre com entrelinha confortável;
- largura de leitura de até 70–72 caracteres para explicações corridas;
- cartões internos com uma função cognitiva por bloco: decisão, procedimento, conferência, referência ou exceção;
- procedimentos apresentados em sequência numerada, com número em bloco azul e texto separado;
- grades de duas ou três colunas somente quando os itens forem equivalentes e curtos;
- azul para estrutura e ação; verde para conclusão ou conduta correta; âmbar para cautela; vermelho para vedação ou erro;
- fundos predominantemente planos, sem gradientes ornamentais em conteúdo operacional;
- bordas e espaçamento devem criar a hierarquia antes de sombras, cor ou efeitos;
- cápsulas arredondadas somente para estados compactos e metadados, nunca como padrão de botão, filtro ou cartão;
- evitar cartões aninhados sem necessidade. Um bloco interno deve existir apenas quando representar uma função distinta dentro do painel principal.

### Anatomia preferencial

1. abertura da etapa;
2. painel de conceito ou escopo;
3. procedimento ou comparação;
4. conferência do resultado;
5. callout de síntese, cautela ou limite quando necessário;
6. transição clara para a etapa seguinte.

A consistência deve ser avaliada por ritmo, tipografia, espaçamento, função das cores e densidade visual, e não pela repetição mecânica da mesma composição em todos os conteúdos.

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
