# Governança anual do guia PDDE no SEI!RIO

- Versão do guia: V. 2.4
- Ciclo editorial: Março/2026
- Última atualização da base: 28 de março de 2026

## Para que serve este documento

Este registro documenta os pontos do guia que dependem do exercício, de atos supervenientes do FNDE ou de mudanças no rito local. Ele ajuda a manter o projeto atualizado sem perder a base normativa permanente.

## Visão rápida

- **Exercício-base desta versão:** 2026. A redação editorial, o mapa de novidades e a identidade desta versão foram consolidados para o ciclo corrente de 2026.
- **Próxima revisão recomendada:** Antes do ciclo 2027. Revisar assim que o FNDE ou a EEx divulgarem novos atos, prazos ou orientações para o exercício seguinte.
- **Regra de manutenção:** Revalidar por gatilho. Nem tudo muda todo ano, mas itens sensíveis ao exercício precisam de checagem imediata quando houver ato novo.

## Pontos sensíveis por exercício

### Orientações específicas para recursos recebidos em 2024

- Status editorial: Consultar só em processos de 2024 (revisão sensível)
- Base relacionada: Comunicado PDDE nº 47/2024
- Escopo temporal: Material recortado ao exercício de 2024 e útil quando a pasta ou a análise ainda estiverem ligadas àquele ciclo.
- Risco se ignorado: Pode induzir o uso indevido de orientação antiga em exercício diferente.
- O que fazer: Aplique apenas quando o processo tratar efetivamente de recursos recebidos em 2024.
- Quando revisar de novo: Se o site passar a orientar exercícios passados adicionais ou se o FNDE revogar/substituir esse comunicado.
- Link oficial relacionado: https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2024-1/Comunicadon.47_2024Orientaesparaaprestaodecontasdosrecursosrecebidosem2024.pdf
- Última verificação registrada na fonte: Verificado em 28 de março de 2026

### Transição para efeitos sobre saldos, estorno e regras futuras

- Status editorial: Monitorar na virada para 2027 (monitoramento anual)
- Base relacionada: Comunicado PDDE nº 01/2026
- Escopo temporal: A comunicação foi emitida em 2026, mas seus efeitos interessam especialmente a dúvidas com projeção para 2027.
- Risco se ignorado: Pode levar a orientação equivocada sobre saldo remanescente, estorno e vigência das mudanças mais recentes.
- O que fazer: Releia este ponto quando a dúvida envolver saldo, reprogramação ou reflexos no exercício seguinte.
- Quando revisar de novo: Abrir novo ciclo anual ou surgir ato posterior do FNDE sobre saldos e estorno.
- Link oficial relacionado: https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2026/comunicado-n-01_2026-alteracoes-na-resolucao-cd-fnde-no-7-2024-estorno-de-recurso.pdf
- Última verificação registrada na fonte: Verificado em 28 de março de 2026

### Ferramentas federais e BB Gestão Ágil

- Status editorial: Revalidar a cada novo ciclo (monitoramento anual)
- Base relacionada: BB Gestão Ágil
- Escopo temporal: Os ambientes federais e manuais operacionais podem mudar de nome, fluxo ou convivência com outros sistemas.
- Risco se ignorado: O guia pode continuar visualmente correto, mas orientar o usuário para o ambiente federal errado ou desatualizado.
- O que fazer: Na abertura de cada exercício, confirme se o hub, o FAQ e o ambiente federal aplicável continuam os mesmos.
- Quando revisar de novo: Novo manual do FNDE, nova FAQ do BB Gestão Ágil ou alteração na convivência com SiGPC e análise da EEx.
- Link oficial relacionado: https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/area-para-gestores/bb-gestao-agil
- Última verificação registrada na fonte: Verificado em 28 de março de 2026

### Rito local, SEI!RIO e exigências internas

- Status editorial: Revisar quando a SME/CRE mudar o rito (revisão sensível)
- Base relacionada: Decreto Rio nº 57.250/2025
- Escopo temporal: Os passos locais podem receber despacho interno, circular ou ajuste de procedimento sem alterar a norma federal do PDDE.
- Risco se ignorado: A pasta pode ficar tecnicamente bem instruída, mas desajustada ao rito operacional vigente da rede.
- O que fazer: Revalide quando houver circular da SME, ajuste do Comitê Regional, mudança na GAD ou atualização relevante do SEI!RIO.
- Quando revisar de novo: Novo ato municipal, nova circular interna, nova rotina de assinatura/remessa ou alteração do portal SEI!RIO.
- Link oficial relacionado: https://comlurb.prefeitura.rio/wp-content/uploads/sites/74/2025/11/Decreto-SEI-57250.pdf
- Última verificação registrada na fonte: Verificado em 28 de março de 2026

### Base permanente do PDDE e núcleo mínimo documental

- Status editorial: Base contínua do guia (base contínua)
- Base relacionada: Resolução CD/FNDE nº 15/2021
- Escopo temporal: A Resolução nº 15/2021 permanece como eixo da conferência, salvo superveniência de norma que a altere ou substitua.
- Risco se ignorado: O usuário perde o referencial mínimo para distinguir obrigação permanente de detalhe operacional passageiro.
- O que fazer: Mantenha esta base como referência central e só troque o eixo quando houver ato federal superveniente claro.
- Quando revisar de novo: Nova resolução do FNDE, alteração formal da disciplina material do PDDE ou atualização do núcleo mínimo exigido.
- Link oficial relacionado: https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/view
- Última verificação registrada na fonte: Verificado em 28 de março de 2026

## Gatilhos de revisão do projeto

- Abertura de novo exercício da prestação de contas.
- Publicação de nova resolução, comunicado ou FAQ do FNDE.
- Mudança operacional do BB Gestão Ágil, SiGPC ou fluxos federais correlatos.
- Nova circular interna da SME/CRE, ajuste regional da GAD ou mudança relevante no SEI!RIO.
- Substituição de modelos, anexos ou peças de apoio no acervo do projeto.

## Observação de governança

Sempre que a base anual mudar, atualize `src/lib/annualGovernance.ts`, `src/lib/externalResources.ts` e regenere este arquivo com `npm run sync:annual-governance`.
