# Mapa de Conteúdo e Fontes de Verdade

Este documento identifica a origem autoritativa de cada grupo de conteúdo do Guia PDDE no SEI!RIO e reduz o risco de divergência entre página, checklist, busca, modelos e metadados.

## Princípio

Dados normativos e operacionais devem existir em um único registro estruturado. Componentes React devem selecionar e apresentar esses dados, sem recriar manualmente artigos, fontes, listas documentais ou matrizes de aplicabilidade.

## Mapa atual

| Conteúdo | Fonte de verdade | Superfícies consumidoras | Situação na versão 2.7.0 |
|---|---|---|---|
| Fontes normativas oficiais | `src/lib/normativeSources.ts` | Citações, cartões jurídicos, Anexo, matriz | Centralizado para o Anexo e a matriz |
| Regras normativas | `src/lib/normativeRules.ts` | Seção 2 e futuros resumos | Seção 2 migrada para cartões estruturados |
| Matriz por exercício | `src/lib/applicabilityMatrix.ts` | Anexo | Centralizada, com status explícito |
| Regras locais pendentes | `src/lib/localOperationalRules.ts` e `LOCAL_RULES_REGISTER.md` | Auditoria e futuras interfaces | Parcial; ampliação depende de validação local |
| Lista documental interativa | `src/lib/pddeOperationalData.ts` | Checklist e Anexo | Compartilhada; revisão estrutural adicional recomendada |
| Seções e navegação | `src/lib/guideContent.ts` | Menu, busca, jornada, JSON-LD | Navegação centralizada; JSON-LD ainda requer migração completa |
| Links de apoio gerais | `src/lib/externalResources.ts` | Cards, checklist e contatos | Ainda paralelo ao registro normativo; unificação completa pendente |
| Versão e datas | `src/lib/guideVersion.ts` | Interface e metadados de build | Centralizado parcialmente |
| Índice de busca | `src/lib/searchIndex.ts` | Busca global | Revisão e geração parcial ainda pendentes |
| Modelos de texto | `src/components/pop/SmartTemplates.tsx` | Seção 2 | Devem ser tratados como minutas de apoio até homologação |

## Conteúdo que não deve permanecer hardcoded em componentes

- datas e prazos normativos;
- artigos, incisos ou parágrafos;
- URLs de fontes oficiais;
- listas de documentos federais;
- matriz de aplicabilidade por exercício;
- vedações e formas de pagamento;
- status de validação;
- regras locais apresentadas como obrigatórias.

## Fluxo recomendado para nova orientação

1. Cadastrar ou atualizar a fonte em `normativeSources.ts`.
2. Registrar a regra em `normativeRules.ts` ou `localOperationalRules.ts`.
3. Informar aplicabilidade, status e data de verificação.
4. Renderizar a regra por componente reutilizável.
5. Adicionar teste semântico.
6. Registrar revisão humana em `NORMATIVE_REVIEW_REGISTER.md`.

## Pendências de consolidação

- unificar completamente `externalResources.ts` e `normativeSources.ts`;
- fazer o checklist derivar de um registro documental com fundamento por item;
- gerar parte do índice de busca a partir dos registros estruturados;
- gerar o JSON-LD a partir de `guideHowToSteps`;
- remover as exceções restantes da auditoria de citações diretas;
- registrar todas as rotinas locais no modelo de governança.
