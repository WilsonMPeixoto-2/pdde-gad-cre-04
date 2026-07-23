# Redesign Editorial Contemporâneo do Guia PDDE — Especificação

## 1. Objetivo

Transformar o Guia PDDE no SEI!RIO em uma publicação digital institucional de alta qualidade editorial, preservando conteúdo normativo, regras de negócio, rotas, ferramentas, acessibilidade, impressão e comportamento funcional.

A intervenção abrange todo o guia: capa, cabeçalho, navegação lateral, apresentação, etapas 1 a 6, ferramentas interativas, contatos, anexos, modo escuro, mobile e impressão.

## 2. Decisões aprovadas

- Escopo: todo o guia.
- Intervenção: visual, editorial e arquitetura da informação, sem revisão técnico-normativa nesta entrega.
- Direção de arte: editorial contemporânea.
- Presença visual: alta.
- Linguagem de imagens: mista — fotografia editorial nas grandes aberturas e ilustração/diagrama nas partes operacionais.
- Base cromática: azul institucional + verde/teal.
- Grau de transformação estrutural: intermediário.

## 3. Princípios editoriais

1. **Conteúdo antes do ornamento.** Toda imagem, cor, ícone, borda ou movimento deve apoiar orientação, hierarquia, contexto ou transição.
2. **Publicação, não painel.** O guia deve se aproximar de uma publicação digital orientadora e não de dashboard comercial, landing page promocional ou coleção de cartões.
3. **Hierarquia reconhecível.** Capa, capítulos, aberturas, subtítulos, conteúdo, exemplos, regras, alertas e transições devem possuir níveis visuais estáveis.
4. **Leitura longa confortável.** Texto corrido limitado a cerca de 70 caracteres por linha, alinhado à esquerda, com entrelinha e espaçamento consistentes.
5. **Cores com significado.** Azul estrutura e navegação; teal orientação e progresso; verde sucesso; âmbar cautela; vermelho erro, bloqueio ou vedação real.
6. **Visualidade funcional.** Fotografias apresentam contexto humano e institucional; ilustrações e diagramas explicam tarefas, documentos e fluxos.
7. **Acessibilidade e equivalência.** Imagens informativas devem ter alternativa textual; imagens decorativas devem ser ocultadas de tecnologias assistivas; cor nunca será o único indicador de estado.
8. **Responsividade editorial.** Mobile não deve ser mera compressão do desktop. A ordem de leitura, o ritmo e os controles devem ser recompostos para telas estreitas.

## 4. Sistema tipográfico

- Interface e corpo: Public Sans.
- Títulos de interface e navegação: Plus Jakarta Sans.
- Títulos editoriais de grande abertura e citações: Source Serif 4, com uso seletivo.
- Dados, NUP, códigos e identificadores: família monoespaçada do sistema.

Escala recomendada:

- H1 de capa: `clamp(3rem, 7vw, 6.4rem)`.
- Título de capítulo: `clamp(2.2rem, 4.2vw, 4rem)`.
- Título interno: `clamp(1.45rem, 2.4vw, 2rem)`.
- Corpo: 1rem a 1.08rem, entrelinha 1.68 a 1.78.
- Rótulos: 0.72rem a 0.78rem, caixa alta somente em expressões curtas.

## 5. Paleta e tokens

A implementação deve centralizar os novos tokens em uma camada própria, sem espalhar valores isolados pelos componentes.

- Azul estrutural profundo: cabeçalho, navegação, títulos e ações principais.
- Azul médio: links e estados ativos.
- Teal: orientação, progresso e ações de apoio.
- Verde: confirmação e conclusão.
- Âmbar: atenção e validação pendente.
- Vermelho: erro, bloqueio ou vedação.
- Branco e cinzas frios: fundo, superfícies, bordas e texto secundário.

Gradientes serão permitidos apenas em áreas editoriais amplas, como capa e faixas de transição. Não usar texto em gradiente, brilho promocional ou gradiente multicolorido em componentes pequenos.

## 6. Estrutura transversal

### 6.1 Capa

A capa deverá ser clara, editorial e visualmente rica, com:

- título principal;
- texto de apresentação curto;
- ação primária “Iniciar guia”;
- fotografia institucional editorial;
- composição gráfica azul/teal;
- resumo da estrutura do guia;
- transição perceptível para a apresentação.

A imagem não poderá competir com o título nem receber filtro cromático que comprometa sua leitura natural.

### 6.2 Cabeçalho

O cabeçalho permanecerá fixo e compacto. Deve conter:

- identificação resumida do guia;
- busca;
- alternância de tema;
- impressão/PDF;
- menu mobile.

A barra de progresso de leitura será preservada. Controles devem ter tipografia, foco e estados consistentes.

### 6.3 Navegação lateral

A navegação será reorganizada visualmente em grupos:

- apresentação;
- etapas do processo;
- apoio e referências.

O item ativo deve possuir indicador de posição, cor e contraste; o progresso de leitura permanece visível, mas discreto. No mobile, a navegação funciona como sumário editorial em painel, com hierarquia e áreas de toque adequadas.

### 6.4 Aberturas de capítulo

Cada capítulo terá uma abertura visual compartilhada, composta por:

- número editorial;
- título;
- subtítulo;
- ícone;
- imagem/ilustração relacionada ao tema;
- ação de compartilhamento.

A abertura não deve repetir integralmente o cabeçalho interno da seção. `SectionDivider` e `SectionLead` devem funcionar como níveis complementares: capítulo e conteúdo interno.

### 6.5 Conteúdo e cartões

- Reduzir “cartão dentro de cartão”.
- Preferir blocos abertos, faixas, listas editoriais e painéis com função explícita.
- Cartões devem ser reservados a unidade informacional real: regra, documento, ferramenta, checklist, modelo ou ação.
- Remover elevação decorativa em hover de blocos de leitura.
- Manter bordas e sombras discretas.

### 6.6 Componentes semânticos

O sistema deverá distinguir visualmente e semanticamente:

- orientação;
- atenção/cautela;
- vedação/erro;
- sucesso/conclusão;
- documento necessário;
- fundamento normativo;
- exemplo;
- próxima ação.

Ícone, rótulo e texto devem acompanhar a cor para garantir compreensão sem depender apenas do tom cromático.

### 6.7 Fechamentos e transições

As etapas devem terminar com uma transição clara para a ação seguinte, usando composição editorial, seta/ícone e texto curto. Checklists e pendências impeditivas devem aparecer antes da transição.

## 7. Imagens e ilustrações

### Fotografias

- uso prioritário na capa e em grandes aberturas;
- cenas institucionais plausíveis: escola pública, equipe administrativa, documentos, atendimento e ambiente de trabalho;
- enquadramento editorial, luz natural, diversidade e ausência de marcas comerciais;
- nenhuma pessoa real identificável ou representação de autoridade específica.

### Ilustrações

- linguagem vetorial/editorial contemporânea;
- formas geométricas, azul e teal, linhas documentais e metáforas de fluxo;
- sem texto rasterizado dentro das imagens;
- exportadas em formatos otimizados e com dimensões estáveis.

## 8. Arquitetura da informação

A ordem geral do guia será preservada. Dentro das seções, é permitido:

- agrupar blocos fragmentados;
- dividir textos longos;
- melhorar títulos e subtítulos;
- aproximar regra e contexto de aplicação;
- transformar listas em fluxos, quadros ou checklists;
- eliminar repetições editoriais.

É proibido:

- alterar o sentido normativo;
- inferir regra local;
- remover alertas de validação;
- alterar dados operacionais ou contratos de componentes interativos;
- quebrar âncoras e URLs compartilháveis.

## 9. Responsividade

- Desktop: largura editorial ampla, navegação fixa, imagens integradas ao grid.
- Tablet: redução de colunas e preservação de hierarquia.
- Mobile: imagem abaixo ou acima do texto conforme prioridade, títulos fluidos, controles compactos, tabelas com tratamento existente e sumário em painel.
- Nenhum conteúdo principal pode exigir rolagem horizontal.

## 10. Modo escuro

O modo escuro será mantido e refinado:

- superfícies grafite/azul profundo;
- contraste mínimo adequado;
- imagens sem filtros agressivos;
- teal e azul ajustados para legibilidade;
- sombras reduzidas e bordas mais informativas.

## 11. Impressão

- ocultar fotografia e elementos decorativos não essenciais quando necessário;
- manter títulos, números de capítulo, legendas e conteúdo textual;
- evitar fundos escuros e grandes áreas coloridas;
- preservar links e fontes normativas;
- manter a preparação completa das seções diferidas antes de `window.print()`.

## 12. Requisitos técnicos

- React 19, TypeScript, Vite e Tailwind CSS 4 permanecem como base.
- Não adicionar dependência sem benefício mensurável.
- Ícones de interface permanecem em Lucide.
- Imagens devem usar dimensões explícitas e carregamento adequado.
- Seções abaixo da dobra continuarão com carregamento diferido.
- Tokens e estilos globais devem ficar em `src/styles`.
- Componentes visuais genéricos devem ficar em `src/components/visual`.
- Rotas, âncoras e contratos públicos existentes devem ser preservados.

## 13. Critérios de aceite

1. A capa comunica imediatamente finalidade, órgão e ação principal.
2. Todas as seções compartilham a mesma gramática editorial.
3. Imagens e ilustrações têm função clara e não obstruem leitura.
4. A hierarquia entre capítulo, seção interna, regra, alerta e ação é inequívoca.
5. Não há proliferação de cartões aninhados.
6. Desktop, mobile, modo escuro e impressão permanecem funcionais.
7. Busca, navegação, compartilhamento, checklist, modelos, modo guiado e PDF continuam funcionando.
8. Axe, testes E2E, lint, typecheck, build e auditorias de conteúdo/normativa/PDF permanecem aprovados.
9. A implementação é comparada visualmente com a direção B aprovada e recebe correções até atingir padrão de publicação profissional.
