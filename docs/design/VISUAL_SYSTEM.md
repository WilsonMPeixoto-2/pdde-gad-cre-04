# Sistema Editorial do Guia PDDE

Este documento define a linguagem visual e informacional do Guia PDDE no SEI!RIO. O sistema materializa o Manual de Identidade Editorial e a Biblioteca de Componentes do projeto **Referências editoriais** em um produto web responsivo, acessível e imprimível.

## 1. Direção

O guia deve funcionar como uma **publicação digital institucional orientadora**. A composição combina:

- autoridade institucional;
- leitura longa confortável;
- estrutura modular;
- presença visual controlada;
- cores com significado;
- componentes escolhidos pela função cognitiva;
- rastreabilidade normativa;
- equivalência entre desktop, mobile, modo escuro e impressão.

O produto não deve parecer uma landing page promocional, um painel comercial nem uma coleção uniforme de cartões.

## 2. Princípios vinculantes

1. **Conteúdo antes da forma:** a estrutura visual nasce da informação e da decisão que o leitor precisa tomar.
2. **Função antes da repetição:** componentes semelhantes somente são usados para conteúdos com finalidade semelhante.
3. **Camadas de leitura:** síntese, desenvolvimento técnico e evidência normativa devem ser reconhecíveis.
4. **Cor semântica:** cor sinaliza natureza, estado ou prioridade; não é ornamento isolado.
5. **Densidade controlada:** páginas densas devem alternar síntese, detalhe, tabela, fluxo, regra e respiro.
6. **Visualidade funcional:** imagem, ícone ou diagrama deve acrescentar compreensão, orientação, memória ou contexto.
7. **Rastreabilidade:** fundamentos, vigência, fontes e evidências permanecem visíveis no ponto de uso.
8. **Acessibilidade por construção:** significado não depende exclusivamente de cor, posição ou imagem.

## 3. Tipografia

| Função | Família | Uso |
|---|---|---|
| Corpo e interface | Public Sans | Texto corrido, tabelas, controles e metadados |
| Hierarquia de interface | Plus Jakarta Sans | Leads, blocos internos, navegação e ações |
| Títulos editoriais | Source Serif 4 | Capa e aberturas de etapas |
| Códigos e identificadores | Monoespaçada do sistema | NUP, CNPJ e identificadores técnicos |

Regras:

- títulos editoriais usam largura e quebra deliberadas;
- texto corrido mantém largura aproximada de 60 a 75 caracteres;
- caixa alta é restrita a rótulos curtos;
- tracking elevado não é usado em frases;
- a justificação é seletiva em textos formais longos, com hifenização e largura controlada;
- em telas estreitas, o corpo retorna ao alinhamento à esquerda para evitar rios tipográficos;
- tabelas, listas e instruções operacionais permanecem alinhadas à esquerda.

Escala de referência:

- capa: `clamp(3rem, 6.2vw, 6.7rem)`;
- abertura de etapa: `clamp(2.4rem, 4vw, 4.5rem)`;
- lead interno: `clamp(2rem, 3.3vw, 3.2rem)`;
- corpo principal: `1rem` a `1.22rem`, conforme a camada;
- rótulos: `0.6rem` a `0.78rem`.

## 4. Paleta semântica

| Família | Função principal |
|---|---|
| Navy | autoridade, títulos e estrutura |
| Azul | navegação, informação técnica e referências federais |
| Teal | processo, orientação, conformidade e atendimento |
| Âmbar | cautela, pendência, transição e validação |
| Vermelho | vedação, impedimento e não conformidade |
| Violeta | análise, classificação e regras complementares |
| Slate | contexto, metadados, auditoria e fontes |

Tokens centrais:

- `--ref-navy`;
- `--ref-blue`;
- `--ref-teal`;
- `--ref-amber`;
- `--ref-red`;
- `--ref-violet`;
- `--ref-slate`;
- `--ref-ink` e `--ref-copy`;
- variantes `*-soft` para superfícies;
- variantes `*-text` para contraste tipográfico.

A cor de identidade e a cor usada em texto são tratadas separadamente. No modo escuro, cada família possui equivalente luminoso próprio.

Evitar:

- gradiente em texto;
- cor decorativa sem função;
- opacidade baixa como único mecanismo de hierarquia;
- verde ou vermelho para conteúdo neutro;
- repetição de azul/teal em todos os blocos sem distinção funcional.

## 5. Capa

A capa é implementada por `HeroCover` e pelas classes `.editorial-hero*`.

Estrutura:

- identificação institucional;
- três marcadores de escopo;
- H1 editorial em largura proporcional;
- descrição e orientação de uso;
- fotografia contextual;
- legenda vinculada à fotografia;
- faixa inferior com percurso, conteúdo, segurança e uso recomendado.

Não há botão genérico de “iniciar”. A navegação natural e o sumário cumprem essa função.

A fotografia deve:

- contextualizar a rotina real da unidade escolar;
- possuir texto alternativo;
- manter proporção estável;
- não encobrir conteúdo;
- não receber filtro agressivo;
- permanecer próxima da resolução nativa;
- ser omitida na impressão.

## 6. Aberturas de etapas

`SectionDivider` é a abertura editorial de cada etapa. A composição inclui:

- número da etapa;
- ícone;
- rótulo de capítulo;
- título em Source Serif 4;
- síntese;
- ação de copiar link;
- `EditorialChapterVisual` com mapa informacional.

O mapa informa:

1. três movimentos centrais da etapa;
2. resultado esperado;
3. ponto de atenção.

Não são utilizadas ilustrações decorativas ou cenas genéricas. A função visual é explicar a estrutura da etapa.

No mobile, o mapa passa para sequência vertical. Na impressão, o mapa é removido e a abertura mantém somente a identificação essencial.

## 7. Leads internos

`SectionLead` representa o segundo nível hierárquico.

- com `step`, utiliza índice lateral e corpo principal;
- sem `step`, ocupa integralmente a largura disponível;
- inclui ícone, rótulo, título e descrição;
- não repete o mapa ou a imagem da abertura;
- não pode ser quebrado internamente entre páginas no PDF.

## 8. Famílias de componentes

Os componentes são selecionados conforme a pergunta que precisam responder.

| Pergunta | Família visual |
|---|---|
| Para que serve cada documento? | Função documental |
| Qual classificação se aplica? | Comparação e classificação |
| Em que ordem executar? | Processo e sequência |
| O que escolher ou decidir? | Decisão e recomendação |
| O que é permitido ou vedado? | Regra, conduta e evidência |
| O que falta conferir? | Checklist e controle |
| Qual canal utilizar? | Atendimento por finalidade |
| Qual fonte vale para o caso? | Aplicabilidade e camada normativa |

Regras gerais:

- não criar cartão apenas para agrupar texto;
- evitar cartão dentro de cartão sem necessidade semântica;
- usar bordas e faixas para revelar função;
- reservar sombras para elevação real;
- interações não devem deslocar blocos de leitura;
- cada componente deve possuir rótulo, mensagem e contexto; ação somente quando necessária.

## 9. Iconografia

A iconografia usa Lucide com traço consistente e molduras simples.

- ícones não substituem rótulos;
- cada ícone deve representar a função do bloco;
- molduras circulares são usadas em mapas e metadados;
- cores acompanham a função semântica;
- não são admitidos ícones infantis, tridimensionais ou de banco genérico incompatíveis com o contexto institucional.

## 10. Navegação

A navegação lateral organiza:

1. visão geral;
2. etapas do processo;
3. apoio e referências.

O item ativo utiliza trilho, contraste e estado textual. O progresso permanece discreto.

No mobile:

- painel com largura limitada;
- overlay bloqueia a página;
- `Escape` fecha o painel;
- `inert` é aplicado quando apropriado;
- áreas de toque mantêm dimensão adequada;
- componentes flutuantes são reduzidos para não competir com o conteúdo.

## 11. Modo escuro

O modo escuro preserva a mesma estrutura informacional.

- títulos principais quase brancos;
- corpo em cinza-azulado claro;
- variantes luminosas de azul, teal, âmbar, vermelho, violeta e slate;
- títulos dos passos e ações com contraste explícito;
- bordas mais perceptíveis;
- sombras reduzidas;
- fotografia sem filtro global.

O modo escuro deve ser validado por Axe e por inspeção visual, pois contraste matemático não substitui avaliação de hierarquia.

## 12. Impressão e PDF

A impressão é sempre clara, independentemente do tema ativo.

Regras:

- redefinir variáveis escuras para equivalentes claros;
- remover fotografia, mapas, navegação, ações, fundos pesados, filtros e animações;
- preservar cores semânticas em tons imprimíveis;
- manter títulos, leads, tabelas, regras e evidências;
- iniciar capítulos de modo previsível;
- impedir quebra interna de cabeçalhos editoriais;
- evitar rótulos órfãos no fim da página;
- usar `break-inside: avoid` apenas em unidades que comportem essa proteção;
- manter texto extraível;
- manter o arquivo compacto.

A homologação final produziu PDF A4 com 29 páginas e aproximadamente 0,87 MB.

## 13. Organização das camadas

```text
src/
  components/
    ui/           primitivas de interação
    visual/       hierarquia e mapas reutilizáveis
    legal/        regras e evidências
    pop/          conteúdo e composição das seções
  styles/
    editorial-contemporary.css
    editorial-semantic.css
    editorial-accessibility.css
    editorial-reference-system.css
    editorial-reference-components.css
    editorial-reference-support.css
    editorial-reference-fixes.css
public/
  editorial/
    hero-pdde.webp
```

Estilos transversais permanecem em `src/styles`. Componentes de conteúdo não devem introduzir sistemas visuais paralelos.

## 14. Critérios de revisão

Antes da publicação, verificar:

- capa desktop e mobile;
- fotografia e legenda sem colisão;
- abertura de cada etapa;
- mapas claro, escuro e mobile;
- leads com e sem numeração;
- variedade de componentes por função;
- contraste Axe e inspeção visual;
- ausência de overflow horizontal;
- navegação e compartilhamento;
- busca, modo guiado, checklists e persistência;
- impressão iniciada nos modos claro e escuro;
- paginação, tamanho e renderização do PDF;
- integridade de rotas, âncoras, PWA e links;
- `npm run check:ci` integralmente aprovado.
