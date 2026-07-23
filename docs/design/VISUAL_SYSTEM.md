# Sistema Visual Editorial Contemporâneo

Este documento orienta a composição visual do Guia PDDE no SEI!RIO. O sistema busca conciliar institucionalidade, leitura longa, clareza operacional, presença visual e consistência entre tela, mobile, modo escuro e impressão.

## 1. Direção de arte

O produto deve funcionar como uma **publicação digital institucional orientadora**. Não deve parecer um dashboard comercial, uma landing page promocional ou uma coleção de cartões independentes.

A linguagem aprovada combina:

- composição editorial contemporânea;
- fotografia institucional nas grandes aberturas;
- ilustrações e diagramas nas etapas operacionais;
- base azul institucional e verde/teal;
- títulos editoriais fortes;
- superfícies claras e densidade controlada;
- navegação funcional, sem competir com o conteúdo.

## 2. Princípios

1. **Conteúdo antes do ornamento:** todo elemento visual deve orientar, contextualizar, organizar ou sinalizar.
2. **Hierarquia estável:** capa, capítulo, lead interno, conteúdo, regra, alerta, ferramenta e próxima ação devem ser visualmente distinguíveis.
3. **Cores com significado:** azul estrutura; teal orientação e progresso; verde sucesso; âmbar cautela; vermelho erro ou vedação.
4. **Leitura longa confortável:** texto alinhado à esquerda, largura controlada e entrelinha consistente.
5. **Visualidade funcional:** imagens devem apoiar a compreensão ou o ritmo editorial, nunca ocupar espaço apenas para decorar.
6. **Equivalência entre modos:** a estrutura e o significado devem permanecer claros no modo escuro, mobile e impressão.

## 3. Tipografia

| Função | Família | Uso |
|---|---|---|
| Corpo e interface | Public Sans | Texto corrido, tabelas, botões, metadados e controles |
| Hierarquia de interface | Plus Jakarta Sans | Leads, cabeçalhos internos, navegação e ações |
| Títulos editoriais | Source Serif 4 | Capa, aberturas de capítulo e citações |
| Dados e códigos | Família monoespaçada do sistema | NUP, CNPJ, códigos e identificadores |

Regras:

- não justificar texto em tela;
- limitar texto corrido a aproximadamente 70–72 caracteres por linha;
- usar caixa alta apenas em rótulos curtos;
- evitar tracking elevado em frases completas;
- títulos editoriais podem usar tracking negativo moderado;
- controles devem possuir tamanho tipográfico deliberado, sem depender do padrão do navegador.

Escala principal:

- capa: `clamp(3rem, 7vw, 6.35rem)`;
- capítulo: `clamp(2.15rem, 4vw, 3.9rem)`;
- lead interno: `clamp(1.65rem, 2.8vw, 2.45rem)`;
- corpo: `1rem` a `1.08rem`, entrelinha aproximada de `1.7`;
- rótulos: `0.72rem` a `0.78rem`.

## 4. Paleta

Tokens centrais da camada editorial:

| Token | Finalidade |
|---|---|
| `--editorial-navy` | estrutura, títulos, ações principais |
| `--editorial-navy-deep` | títulos de maior contraste e fundos escuros |
| `--editorial-blue` | links, ações e estados ativos |
| `--editorial-teal` | orientação, progresso e acento editorial |
| `--editorial-ink` | texto principal |
| `--editorial-copy` | texto corrido |
| `--editorial-paper` | fundo editorial |
| `--editorial-surface` | superfícies de conteúdo |
| `--editorial-rule` | bordas e divisores |

Regras semânticas:

- azul: estrutura, navegação e ação;
- teal: orientação, etapa e progresso;
- verde: conclusão ou sucesso confirmado;
- âmbar: atenção, cautela e validação pendente;
- vermelho: erro, bloqueio ou vedação real;
- cinzas frios: superfícies neutras e metadados.

O teal do modo claro deve manter contraste WCAG AA para texto pequeno. O modo escuro utiliza variante mais luminosa e independente.

Evitar:

- texto em gradiente;
- gradientes multicoloridos em elementos pequenos;
- cor decorativa sem significado;
- contraste baseado apenas em opacidade baixa;
- usar verde ou vermelho para conteúdo neutro.

## 5. Capa

A capa é implementada por `HeroCover` e pelas classes `.editorial-hero*`.

Estrutura:

- identificação institucional curta;
- H1 editorial;
- descrição objetiva;
- ação primária;
- fotografia contextual;
- legenda editorial;
- faixa inferior com síntese da estrutura.

A fotografia deve:

- ter função contextual;
- possuir texto alternativo;
- manter proporção estável;
- permanecer próxima de sua resolução nativa;
- não receber filtro cromático agressivo;
- ser ocultada na impressão.

## 6. Aberturas de capítulo

`SectionDivider` funciona como abertura de capítulo e utiliza:

- número editorial;
- ícone em `IconTile`;
- título em Source Serif 4;
- subtítulo;
- ação de compartilhamento;
- ilustração temática associada por `editorialMediaBySection`.

A abertura deve usar `data-editorial-chapter` e mídia com `data-editorial-media="chapter"` para testes e auditorias.

`SectionLead` é o segundo nível hierárquico. Ele não repete a imagem do capítulo. Usa trilho teal, ícone, rótulo curto, título em Plus Jakarta Sans e descrição.

## 7. Imagens e ilustrações

Ativos ficam em `public/editorial/` e são catalogados em `src/lib/editorialMedia.ts`.

Tipos:

- `hero-pdde.webp`: fotografia da capa;
- `chapter-process.svg`: abertura e fluxo processual;
- `chapter-documents.svg`: organização e inclusão documental;
- `chapter-authentication.svg`: autenticação e segurança;
- `chapter-follow-up.svg`: análise, acompanhamento e suporte.

Regras:

- não rasterizar textos de interface dentro das imagens;
- usar dimensões explícitas em `<img>`;
- usar `loading="lazy"` abaixo da dobra;
- usar `fetchPriority="high"` apenas na imagem principal da capa;
- manter alternativas textuais descritivas;
- não reutilizar imagem temática em contexto incompatível.

## 8. Navegação

A navegação lateral é agrupada em:

1. Visão geral;
2. Etapas do processo;
3. Apoio e referências.

Cada grupo possui `data-sidebar-group`. O item ativo utiliza trilho teal, número, ícone e contraste suficiente. O progresso de leitura permanece discreto.

No mobile:

- o painel deve ocupar até 90% da largura;
- o overlay deve impedir interação com a página;
- `Escape` fecha o painel;
- `inert` é aplicado quando fechado;
- áreas de toque devem permanecer adequadas.

## 9. Superfícies e cartões

Cartões são reservados a unidades informacionais reais: regra, documento, ferramenta, modelo, checklist ou ação.

Regras:

- evitar cartão dentro de cartão;
- wrappers que apenas agrupam cartões devem usar composição aberta;
- bordas devem ser mais informativas que sombras;
- blocos de leitura não devem saltar no hover;
- interativos podem alterar borda, fundo ou sombra, sem rotação;
- raio padrão entre 10 e 22 px conforme escala do bloco.

## 10. Componentes semânticos

Os blocos existentes são harmonizados pela camada `editorial-semantic.css`:

- azul: informação e fundamento;
- teal: orientação e conferência;
- âmbar: atenção;
- vermelho: erro ou vedação;
- verde: sucesso ou conclusão.

Cor nunca é o único sinal. Ícone, título ou rótulo devem acompanhar o estado.

As transições de etapa utilizam composição azul/teal aberta, sem borda lateral pesada nem sombra promocional.

## 11. Modo escuro

O modo escuro usa:

- navy profundo e grafite azulado;
- texto principal quase branco;
- texto secundário cinza-azulado;
- teal luminoso para orientação;
- imagens sem filtro global;
- bordas mais perceptíveis e sombras reduzidas.

Textos `primary` sobre superfícies escuras possuem correção específica de contraste em `editorial-accessibility.css`.

## 12. Impressão

A impressão deve ser clara mesmo quando acionada no modo escuro.

Regras finais:

- redefinir variáveis escuras para equivalentes claros;
- remover imagens e fundos gráficos;
- remover gradientes, sombras, filtros e animações;
- restaurar explicitamente o primeiro bloco da capa;
- preservar título, descrição, capítulos e leads internos;
- ocultar ações, navegação e mídias decorativas;
- iniciar cada capítulo em nova página;
- usar ajuste cromático econômico;
- manter arquivo final compacto.

A validação de 23/07/2026 reduziu o PDF gerado de aproximadamente 101 MB para 0,78 MB e eliminou ruído cromático e barras escuras.

## 13. Organização dos arquivos

```text
src/
  components/
    ui/           componentes básicos de interação
    visual/       primitivas visuais reutilizáveis
    pop/          composição e conteúdo das seções
  lib/
    editorialMedia.ts
  styles/
    institutional-polish.css
    editorial-contemporary.css
    editorial-semantic.css
    editorial-accessibility.css
public/
  editorial/
```

Componentes visuais genéricos não devem ser criados dentro de `components/pop`. Estilos transversais devem permanecer nas camadas de `src/styles`.

## 14. Critérios de revisão

Antes da publicação, verificar:

- capa desktop e mobile;
- abertura de capítulo clara e escura;
- hierarquia do `SectionLead`;
- grupos da navegação;
- contraste Axe nos modos claro e escuro;
- ausência de rolagem horizontal mobile;
- carregamento das imagens;
- compartilhamento de seção;
- impressão iniciada no modo claro e escuro;
- tamanho e renderização do PDF;
- integridade das âncoras, busca, modo guiado e ferramentas;
- `npm run check:ci` integralmente aprovado.
