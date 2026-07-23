# Redesign Editorial com Fidelidade às Referências — Especificação

## Objetivo

Reconstruir integralmente a apresentação do Guia PDDE no SEI!RIO, tratando as referências editoriais aprovadas como contrato visual vinculante. A nova interface deve possuir a mesma lógica composicional das referências: navegação institucional persistente, abertura compacta e informativa, visão geral da etapa, módulos funcionais distintos, uso semântico de cor, leitura confortável e alta encontrabilidade.

## Referência vinculante

A referência aprovada não é inspiração abstrata. Ela determina:

- densidade informacional equilibrada;
- proporção entre navegação, hero, visão geral e conteúdo;
- tipografia legível em tamanho real de uso;
- módulos com funções cognitivas diferentes;
- integração de imagem e conteúdo, sem sobreposição;
- cores semânticas visíveis e controladas;
- uso de grids consistentes, sem vazios arbitrários;
- conteúdo operacional em primeiro plano;
- continuidade entre desktop, mobile, modo escuro e impressão.

## Arquitetura visual

### Navegação

- sidebar desktop fixa, com largura entre 232 e 256 px;
- identidade institucional no topo;
- agrupamento por visão geral, etapas e apoio;
- item ativo com contraste, faixa teal e área de toque ampla;
- menu mobile em painel sobreposto, sem reduzir a área útil do conteúdo.

### Capa

- capa integrada à área principal, nunca sobreposta à sidebar;
- título com no máximo duas ou três linhas em desktop;
- fotografia preservada em alta qualidade, sem ampliação além da resolução útil;
- resumo do percurso em cartões de metadados legíveis;
- nenhum CTA redundante;
- legenda integrada à fotografia, sem cobrir conteúdo.

### Abertura de etapa

- altura editorial compacta, sem títulos monumentais;
- painel esquerdo com número, título, resumo e metadados;
- painel direito com visão geral de quatro ou cinco movimentos;
- resultado esperado e ponto de atenção em módulos semânticos;
- nenhum texto menor que 14 px em desktop;
- nenhuma quebra de título com palavras isoladas quando houver largura disponível.

### Corpo da etapa

Cada seção deve combinar, conforme aplicável:

- introdução e objetivo;
- passos principais;
- documentos e evidências;
- comparação ou classificação;
- exemplo prático;
- orientação, atenção, vedação e boa prática;
- checklist;
- pendências que impedem prosseguimento;
- fontes e referências;
- continuidade para a próxima etapa.

Os módulos não podem ser visualmente equivalentes. A forma deve expressar a função.

## Tipografia

- corpo: Public Sans, 16–18 px, entrelinha mínima de 1,6;
- títulos de interface: Plus Jakarta Sans;
- títulos editoriais: Source Serif 4, usados com moderação;
- rótulos: mínimo de 12 px, apenas para metadados curtos;
- tabelas: mínimo de 15 px em desktop;
- largura de leitura: 60–76 caracteres;
- alinhamento à esquerda como padrão; justificação apenas em textos longos quando não gerar rios tipográficos;
- hifenização em português habilitada de forma controlada.

## Cores

- navy: estrutura e autoridade;
- azul: navegação, ações e informação;
- teal: orientação, progresso e conformidade;
- verde: resultado concluído ou boa prática;
- âmbar: atenção, cautela e validação;
- vermelho: erro, vedação e impedimento;
- violeta: análise, classificação e auditoria;
- slate: contexto, metadados e neutralidade.

Cor nunca será o único sinal. Todo estado terá rótulo, ícone ou título.

## Imagens e referências do sistema

- imagens rasterizadas de baixa resolução são proibidas;
- comandos do SEI!RIO devem ser demonstrados por diagramas vetoriais ou mockups HTML/CSS nítidos;
- nenhuma imagem pode ser ampliada acima da resolução útil;
- imagens não podem cobrir texto, controles ou metadados;
- a fotografia da capa deve ser integrada ao grid, sem parecer colada sobre outro bloco.

## Responsividade

- desktop: sidebar persistente e conteúdo em grids funcionais;
- tablet: sidebar recolhida e grids de duas colunas quando houver espaço;
- mobile: uma coluna, corpo mínimo de 16 px, títulos sem cortes e cartões sem overflow;
- controles flutuantes não podem cobrir conteúdo;
- tabelas usam rolagem horizontal explícita apenas quando não houver alternativa semântica.

## Impressão

- fundo branco e texto escuro;
- imagens decorativas omitidas;
- títulos e cabeçalhos mantidos íntegros;
- módulos semânticos preservados com bordas e rótulos;
- nenhuma quebra entre rótulo e título;
- PDF final compacto, com texto extraível.

## Critérios de aceitação

- zero sobreposição textual;
- zero imagem borrada ou estourada;
- zero título cortado ou quebrado de forma arbitrária;
- corpo de texto confortável a 100% de zoom;
- fidelidade visual reconhecível em comparação lado a lado com as referências;
- nenhuma área vazia sem função composicional;
- Axe sem violações críticas ou sérias;
- ausência de overflow horizontal em 390 px;
- impressão clara e estável;
- `npm run check:ci` integralmente aprovado.