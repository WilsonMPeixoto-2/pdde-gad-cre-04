# Auditoria Final da Reconstrução Editorial do Guia PDDE

**Data:** 23/07/2026  
**Branch:** `design/editorial-fidelity-v4`  
**PR:** #8  
**Escopo:** Guia PDDE no SEI!RIO completo

## 1. Contexto

A versão anterior foi reprovada porque tratou as referências aprovadas como inspiração abstrata, produzindo títulos desproporcionais, áreas vazias, elementos sobrepostos, bitmaps de baixa qualidade e texto pequeno. A reconstrução v4 utiliza as referências editoriais como **contrato visual vinculante**.

A implementação foi conduzida por testes permanentes de fidelidade, comparação visual lado a lado e renderização independente do PDF.

## 2. Diretrizes vinculantes materializadas

- conteúdo antes da forma;
- função antes da repetição;
- navegação institucional persistente;
- capa compacta com fotografia integrada;
- visão geral da etapa com cinco movimentos;
- módulos visualmente distintos por função cognitiva;
- corpo entre 16 e 18 px e rótulos com mínimo de 12 px;
- alinhamento à esquerda em instruções, resumos e cartões;
- cores com significado e variantes tipográficas acessíveis;
- nenhuma imagem rasterizada de baixa resolução;
- equivalência entre desktop, mobile, modo escuro e impressão.

## 3. Implementação verificada

### 3.1 Shell e navegação

- sidebar navy fixa no desktop;
- conteúdo e capa respeitam a largura da navegação;
- topbar não cobre o conteúdo durante a leitura;
- grupos de visão geral, etapas e apoio preservados;
- modo guiado reposicionado para a área funcional da sidebar;
- menu mobile, busca, âncoras e progresso preservados.

### 3.2 Capa

- composição em painel principal e visão geral do percurso;
- título em três linhas deliberadas, com navy nas duas primeiras e teal na identificação do programa e sistema;
- fotografia preservada na resolução útil e integrada ao grid;
- legenda associada à imagem, sem colisão;
- cinco movimentos do percurso e três acessos rápidos;
- quatro cartões de metadados;
- ausência de CTA redundante.

### 3.3 Aberturas das etapas

- número, rótulo, título, síntese e compartilhamento em painel compacto;
- mapa informacional com cinco movimentos legíveis;
- resultado esperado e ponto de atenção;
- azul, teal, âmbar, violeta e slate usados conforme a função da etapa;
- recomposição vertical no mobile;
- versão impressa simplificada, sem sobreposição entre número e título.

### 3.4 Etapa 1

- grids de abertura e salvamento recompostos;
- texto e referência visual dispostos lado a lado sem vazios arbitrários;
- resultado esperado associado ao bloco de registro do NUP;
- rótulos pseudoeditoriais legados removidos da tela e do PDF;
- mockups existentes preservados sem perda de legibilidade.

### 3.5 Etapa 2

- função documental apresentada em quatro cartões com cores próprias;
- tipografia ampliada e alinhamento à esquerda;
- regras separadas em conduta correta, vedação, evidência e fundamento;
- contraste específico para cada família cromática no modo escuro.

### 3.6 Etapa 3

- comparação entre documento digitalizado e nato-digital em tabela legível;
- bitmaps borrados dos comandos do sistema removidos;
- referências substituídas por mockups HTML/CSS vetoriais e responsivos;
- fluxo de inclusão e controle da árvore documental preservados.

### 3.7 Demais etapas, atendimento e fontes

- autenticação, assinatura, remessa e acompanhamento mantêm famílias próprias de processo, decisão, controle e evidência;
- atendimento organizado por natureza da necessidade;
- fontes federais e municipais organizadas por nível e aplicabilidade;
- leads sem numeração ocupam toda a largura disponível.

## 4. Tipografia e legibilidade

- Source Serif 4: capa e aberturas editoriais;
- Plus Jakarta Sans: hierarquia e interface;
- Public Sans: corpo, tabelas e controles;
- corpo principal mínimo de 16 px;
- tabelas com mínimo de 15 px;
- rótulos com mínimo de 12 px;
- textos curtos e operacionais alinhados à esquerda;
- largura de leitura e entrelinha controladas;
- título principal sem cortes em desktop ou mobile.

## 5. Imagens e iconografia

- fotografia da capa mantida e dimensionada abaixo da resolução natural;
- ilustrações decorativas anteriores removidas;
- bitmaps de baixa resolução eliminados da Etapa 3;
- iconografia Lucide com traço consistente;
- imagens e ícones não substituem rótulos textuais.

## 6. Acessibilidade e responsividade

- ausência de overflow horizontal em 390 px;
- corpo mínimo de 16 px no mobile;
- títulos integralmente contidos nos painéis;
- controles flutuantes não cobrem o conteúdo;
- modo escuro com variantes luminosas próprias;
- Axe aprovado nos modos claro, mobile e escuro;
- significado nunca depende exclusivamente de cor.

## 7. Impressão e PDF

A geração foi verificada em renderizador independente.

Resultado final:

- PDF A4 com 29 páginas;
- aproximadamente 0,83 MB;
- texto extraível;
- fontes corretamente renderizadas;
- títulos de capítulos sem sobreposição;
- nenhuma página final vazia criada por rodapé duplicado;
- rótulos pseudoeditoriais removidos;
- fotografia, mapas e controles omitidos na impressão;
- cores semânticas preservadas em variantes imprimíveis.

## 8. Testes permanentes

Foram acrescentados contratos que impedem regressões de:

- sobreposição entre cópia e fotografia;
- título fora do contêiner;
- ampliação excessiva da fotografia;
- abertura de etapa com menos de cinco movimentos;
- corpo inferior a 16 px;
- tabela inferior a 15 px;
- rótulo inferior a 12 px;
- bitmap em referência visual do sistema;
- overflow horizontal no mobile.

O pipeline `npm run check:ci` aprovou:

- ESLint;
- TypeScript;
- Vite build;
- auditoria de conteúdo;
- auditoria normativa;
- auditoria dos PDFs vinculados;
- Playwright;
- Axe;
- impressão;
- PWA e rotas.

## 9. Evidências inspecionadas

- capa desktop e mobile;
- abertura das Etapas 1 e 2;
- Etapa 1 completa;
- funções documentais claras e escuras;
- comparação documental;
- dois mockups vetoriais do SEI!RIO;
- modo escuro;
- PDF A4 integral renderizado em 29 imagens.

## 10. Conclusão

A reconstrução v4 segue a lógica composicional das referências aprovadas: sidebar institucional, capa integrada, visão geral por etapas, módulos funcionalmente distintos, tipografia legível, cor semântica e conteúdo operacional em primeiro plano.

O PR #8 substitui integralmente a proposta reprovada do PR #7. A produção permanece inalterada até a revisão do preview e a decisão explícita de merge.