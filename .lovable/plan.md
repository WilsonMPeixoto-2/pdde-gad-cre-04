

# Auditoria e Correção de Conteudo: PDDE vs SDP

## Diagnostico

Apos analise detalhada de todas as secoes, identifiquei conteudo contaminado do SDP (Sistema Descentralizado de Pagamento, regido pelo Decreto Rio 50.162/2022) que precisa ser removido/substituido, e conteudo PDDE ausente que precisa ser adicionado.

---

## 1. Conteudo SDP a REMOVER ou CORRIGIR

### SectionAnexo.tsx — Problemas criticos

**A) Checklist de documentos (linhas 15-25)** — Varios itens sao especificos de SDP, nao de PDDE:
- "Canhotos dos cheques utilizados e cheques inutilizados" — SDP usa cheques; PDDE nao
- "Cheques cancelados" — idem
- "Fatura do cartao do periodo" — referencia ao Cartao de Pagamento do SDP (Res. CGM 2067/2025)
- "Comprovante de transacao do cartao (se pago via Cartao de Pagamento)" — SDP
- "Demonstrativo de despesas por meio de pagamento" — linguagem de SDP
- "Comprovantes de pagamentos e transferencias via internet banking" — linguagem de SDP

**Substituir por** documentos conforme Resolucao CD/FNDE 15/2021:
- Demonstrativo de execucao da receita e despesa (SiGPC/Contas Online)
- Relacao de bens adquiridos ou produzidos (quando houver capital)
- Conciliacao bancaria
- Termo de doacao (quando aplicavel)
- Comprovante de devolucao de saldo (quando houver)
- Extratos bancarios da conta corrente e aplicacao financeira
- Notas fiscais/cupons fiscais/recibos/DANFE
- Atas do Conselho Escolar/CEC
- Consolidacao de pesquisa de precos

**B) Regras de comprovantes (linhas 30-38)** — Artigos 22 e 25 referenciados sao do **Decreto Rio 50.162/2022 (SDP)**, nao da Resolucao FNDE 15/2021:
- "Art. 25 §1, §2, §3" — SDP
- "Art. 22 §1, §2, §3, §4" — SDP
- "Notas fiscais expedidas em nome da Prefeitura ou Orgao executor" — regra de SDP
- "Nao sao aceitos tiquetes de caixa" — SDP
- "2 servidores" como atestadores — regra de SDP (no PDDE a UEx/CEC e quem atesta)

**Substituir por** regras da Resolucao FNDE 15/2021 aplicaveis ao PDDE.

**C) Alerta "Cartao de Pagamento" (linhas 263-278)** — Res. CGM 2067/2025 e exclusiva de SDP. **Remover inteiramente.**

**D) Alerta "Retencao de Tributos" (linhas 280-299)** — ISS/INSS/IRRF na fonte e obrigacao do orgao publico (SDP). No PDDE, a UEx (CEC) e pessoa juridica de direito privado e as regras tributarias sao diferentes. **Remover ou reformular** para o contexto PDDE.

**E) Referencia ao "Art. 8 do Decreto Rio 50.162/2022" (linha 328)** — Despesas proibidas do SDP. No PDDE, as vedacoes estao na Resolucao FNDE 15/2021 (art. 4, §5 e outros). **Corrigir referencia.**

**F) Link para Decreto Rio 50.162/2022 (linhas 429-445)** na base normativa — Esse decreto e sobre SDP, nao sobre PDDE. **Remover** e substituir por legislacao PDDE relevante (ex: Resolucao CD/FNDE 6/2006, Manual SiGPC).

---

### SectionTwo.tsx — Problemas menores

**A) Erros comuns (linha 64)**: Referencia a "Declaracao de Autenticidade (item 14 do checklist)" — o checklist PDDE so tem 12 itens. **Corrigir numeracao.**

---

### SectionSix.tsx — Verificar

**A) "Relacionamento com Processo de Inventario" (linhas 65-75)** — Inventario patrimonial e mais pertinente ao SDP. No PDDE, bens adquiridos com recursos de capital devem ser incorporados ao patrimonio da escola, mas o processo de inventario formal nao e parte do fluxo de prestacao de contas PDDE no SEI. **Reformular** para mencionar controle patrimonial de bens adquiridos com PDDE Capital (conforme Resolucao 15/2021).

---

## 2. Conteudo PDDE que esta FALTANDO

### PDDEChecklist.tsx — Itens ausentes

O checklist atual (7 essenciais + 5 complementares) esta razoavel, mas precisa de ajustes:
- Adicionar: **Termo de compromisso/adesao ao PDDE** (documento de referencia)
- Adicionar: **Relacao de bens adquiridos ou produzidos** (obrigatorio quando houver despesa de capital)
- Ajustar item 3: Especificar que o demonstrativo vem do **SiGPC/Contas Online**
- Ajustar item 5: Conciliacao bancaria — esclarecer que e exigida quando ha divergencia entre extrato e demonstrativo

### SectionAnexo.tsx — Conteudo ausente

- **Prazos**: O prazo federal esta como "30/04 do ano seguinte" mas a Resolucao 15/2021 estabelece que o prazo e ate **28 de fevereiro** do exercicio subsequente para a UEx remeter a EEx, e a EEx ao FNDE ate **30 de abril**. Corrigir essa distincao.
- **Omissao na prestacao de contas**: Falta mencionar as consequencias de nao prestar contas (suspensao de repasses, inscricao em inadimplencia no FNDE, etc.)
- **SiGPC/Contas Online**: Falta uma secao ou referencia mais robusta ao sistema federal de prestacao de contas

### SectionTwo.tsx — Conteudo ausente

- Falta mencionar a obrigatoriedade de **3 pesquisas de precos** (conforme Resolucao FNDE 15/2021) para compras acima de determinado valor
- Falta mencionar a regra de **rateio de despesas** entre acoes do PDDE quando aplicavel

---

## 3. Plano de Implementacao

### Fase 1 — SectionAnexo.tsx (maior volume de correcoes)
1. Substituir a lista `documentosExigidos` por itens alinhados a Resolucao FNDE 15/2021
2. Substituir `regrasComprovantes` por regras do PDDE (nao do SDP)
3. Remover bloco "Cartao de Pagamento (Res. CGM 2067/2025)"
4. Remover ou reformular bloco "Retencao de Tributos"
5. Corrigir referencia ao Decreto 50.162/2022 no alerta de despesas proibidas
6. Substituir link do Decreto 50.162/2022 por legislacao PDDE na base normativa
7. Corrigir prazos (28/02 UEx para EEx; 30/04 EEx para FNDE)
8. Adicionar consequencias de omissao

### Fase 2 — PDDEChecklist.tsx
1. Revisar e ajustar os 12 itens para alinhar com a Resolucao 15/2021
2. Corrigir descricoes para especificar termos corretos do PDDE

### Fase 3 — SectionTwo.tsx
1. Corrigir referencia ao "item 14" nos erros comuns
2. Adicionar regra de 3 pesquisas de precos

### Fase 4 — SectionSix.tsx
1. Reformular "Processo de Inventario" para "Controle Patrimonial PDDE Capital"

### Fase 5 — Atualizacao do searchIndex
1. Atualizar `src/lib/searchIndex.ts` para refletir o conteudo corrigido

---

## Detalhes Tecnicos

### Arquivos a modificar:
1. `src/components/pop/SectionAnexo.tsx` — correcoes extensas (remover SDP, adicionar PDDE)
2. `src/components/pop/PDDEChecklist.tsx` — ajuste de itens do checklist
3. `src/components/pop/SectionTwo.tsx` — correcao de referencia e adicao de regras
4. `src/components/pop/SectionSix.tsx` — reformulacao do item sobre inventario
5. `src/lib/searchIndex.ts` — atualizacao de termos de busca

### Principios:
- Todas as referencias legais devem ser da **Resolucao CD/FNDE 15/2021** e **Lei 11.947/2009** (legislacao federal do PDDE)
- Nenhuma referencia ao **Decreto Rio 50.162/2022** (SDP) deve permanecer no conteudo sobre PDDE
- A unica legislacao municipal que permanece e a do SEI!RIO (Decreto Rio 57.250/2025) e LGPD/LAI, por tratarem do sistema processual, nao da verba
- O **Decreto Rio 50.162/2022** so aparecera na base normativa se for para referencia cruzada, nunca como base de regras para o PDDE

