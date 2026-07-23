# Sistema Visual Editorial do Guia PDDE - v4

Este documento define a linguagem visual e informacional do Guia PDDE no SEI!RIO. A versão v4 trata as referências aprovadas como **contrato composicional**, não como inspiração genérica.

## 1. Direção vinculante

O produto funciona como publicação digital institucional orientadora, combinando:

- sidebar navy persistente;
- capa integrada com fotografia contextual;
- visão geral do percurso e de cada etapa;
- conteúdo modular de alta encontrabilidade;
- tipografia confortável;
- cor semântica;
- rastreabilidade normativa;
- equivalência entre desktop, mobile, modo escuro e impressão.

Evitar:

- títulos monumentais que reduzam a área útil;
- painéis vazios;
- cartão usado apenas como ornamento;
- imagens borradas ou ampliadas além da resolução útil;
- sobreposição de controles e conteúdo;
- texto pequeno para aumentar artificialmente a densidade.

## 2. Princípios

1. **Conteúdo antes da forma:** a estrutura visual nasce da tarefa do leitor.
2. **Função antes da repetição:** componentes semelhantes representam finalidades semelhantes.
3. **Fidelidade composicional:** proporção, densidade, escala e relação entre os blocos seguem as referências aprovadas.
4. **Camadas de leitura:** síntese, desenvolvimento e evidência normativa são reconhecíveis.
5. **Cor semântica:** cor informa natureza ou estado e nunca atua sozinha.
6. **Densidade equilibrada:** informação suficiente sem vazios arbitrários ou compressão tipográfica.
7. **Visualidade funcional:** fotografia, ícone, tabela ou diagrama precisam orientar ou explicar.
8. **Acessibilidade por construção:** legibilidade e navegação não dependem de correções posteriores.

## 3. Tipografia

| Função | Família | Uso |
|---|---|---|
| Corpo e interface | Public Sans | Texto, tabelas, controles e metadados |
| Hierarquia de interface | Plus Jakarta Sans | Leads, módulos, navegação e ações |
| Títulos editoriais | Source Serif 4 | Capa e abertura das etapas |
| Códigos | Monoespaçada do sistema | NUP, CNPJ e identificadores |

Escala mínima:

- corpo: 16 px;
- texto de destaque: 17 a 18 px;
- tabela: 15 px;
- rótulo: 12 px;
- título interno: 30 a 44 px conforme a hierarquia;
- título da capa: 48 a 67 px no desktop.

Regras:

- instruções, resumos, cartões e tabelas usam alinhamento à esquerda;
- justificação somente em textos formais longos, quando não produzir rios tipográficos;
- caixa alta restrita a rótulos curtos;
- título principal usa três linhas explícitas;
- nenhuma palavra pode ser cortada ou encoberta.

## 4. Paleta semântica

| Família | Função |
|---|---|
| Navy | autoridade, títulos e estrutura |
| Azul | navegação, informação técnica e referências federais |
| Teal | percurso, orientação, conformidade e atendimento |
| Verde | resultado confirmado e boa prática |
| Âmbar | cautela, pendência e validação |
| Vermelho | vedação, impedimento e não conformidade |
| Violeta | análise, classificação e auditoria |
| Slate | contexto, metadados e neutralidade |

A cor de superfície, a cor de identidade e a cor tipográfica são independentes. O modo escuro utiliza variantes luminosas próprias.

## 5. Shell institucional

### Desktop

- sidebar fixa com aproximadamente 248 px;
- capa, topbar e conteúdo deslocados pela largura da sidebar;
- topbar participa do fluxo e não cobre o conteúdo;
- modo guiado ocupa a área inferior da sidebar;
- conteúdo central limitado a aproximadamente 1500 px.

### Mobile

- sidebar convertida em painel sobreposto;
- conteúdo em uma coluna;
- corpo mínimo de 16 px;
- controles flutuantes reduzidos ou omitidos;
- ausência de overflow horizontal em 390 px.

## 6. Capa

`HeroCover` combina:

- identificação institucional;
- dois marcadores de escopo;
- título em três linhas deliberadas;
- fotografia contextual;
- legenda integrada;
- visão geral com cinco movimentos;
- três acessos rápidos;
- quatro cartões de metadados;
- orientação final de leitura.

As duas primeiras linhas do título usam navy. `PDDE no SEI!RIO` usa teal.

A fotografia:

- não ultrapassa a resolução natural;
- não cobre texto;
- não recebe filtros agressivos;
- possui texto alternativo;
- é omitida no PDF.

## 7. Aberturas das etapas

`SectionDivider` e `EditorialChapterVisual` produzem um cabeçalho em dois painéis.

Painel de identidade:

- número;
- rótulo;
- título;
- síntese;
- ação de compartilhar.

Painel de visão geral:

- cinco movimentos;
- resultado esperado;
- ponto de atenção.

Não são usadas ilustrações decorativas. No mobile, o mapa se torna uma sequência vertical. No PDF, o mapa é removido e o número ocupa coluna própria, sem sobreposição com o título.

## 8. Famílias de componentes

| Pergunta | Componente |
|---|---|
| Para que serve a peça? | Função documental |
| Qual classificação aplicar? | Comparação e classificação |
| Em que ordem executar? | Processo e sequência |
| O que escolher? | Decisão e recomendação |
| O que é permitido ou vedado? | Regra, conduta e evidência |
| O que falta? | Checklist e controle |
| Onde buscar ajuda? | Atendimento por finalidade |
| Qual fonte se aplica? | Camada normativa e aplicabilidade |

Os módulos não podem parecer equivalentes quando respondem a perguntas diferentes.

## 9. Referências visuais do SEI!RIO

Comandos e escolhas do sistema são apresentados por `SystemCommandPreview`:

- mockups HTML/CSS nítidos;
- ícones Lucide;
- nenhum bitmap de baixa resolução;
- sem controles interativos falsos;
- descrição acessível no elemento raiz.

## 10. Navegação e controles

- navegação agrupada em visão geral, etapas e apoio;
- item ativo com trilho e contraste;
- busca, links diretos e âncoras preservados;
- botão de modo guiado não cobre os módulos;
- compartilhamento de etapa possui rótulo textual;
- áreas de toque mantêm dimensão adequada.

## 11. Modo escuro

- fundo navy/grafite;
- títulos quase brancos;
- corpo cinza-azulado claro;
- variantes luminosas de todas as famílias semânticas;
- bordas mais perceptíveis;
- sombras reduzidas;
- fotografia sem filtro global.

## 12. Impressão e PDF

A impressão é sempre clara.

- sidebar, topbar, fotografia, mapas e ações são removidos;
- capítulos iniciam de forma previsível;
- número e título usam colunas separadas;
- cabeçalhos não quebram internamente;
- rótulos pseudoeditoriais da tela são removidos;
- rodapé final duplicado é omitido;
- texto permanece extraível;
- arquivo final permanece compacto.

A homologação v4 produziu PDF A4 com 29 páginas e aproximadamente 0,83 MB.

## 13. Arquivos da camada v4

```text
src/
  components/
    visual/
      EditorialChapterVisual.tsx
      SystemCommandPreview.tsx
    pop/
      HeroCover.tsx
      SectionDivider.tsx
      SectionThree.tsx
  styles/
    editorial-fidelity-v4.css
    editorial-fidelity-v4-fixes.css
    editorial-fidelity-v4-title.css
e2e/
  editorial-fidelity.spec.ts
```

## 14. Critérios de revisão

Antes da publicação:

- comparar a capa com as referências aprovadas;
- verificar título e fotografia em desktop e mobile;
- inspecionar todas as aberturas de etapa;
- confirmar cinco movimentos por mapa;
- revisar Etapa 1, funções documentais e tabela de classificação;
- verificar os dois mockups vetoriais;
- executar Axe claro, escuro e mobile;
- confirmar ausência de overflow;
- renderizar o PDF em ferramenta independente;
- executar `npm run check:ci` integralmente.