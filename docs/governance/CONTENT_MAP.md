# Mapa de Conteúdo e Fontes de Verdade

Este documento identifica a origem autoritativa de cada grupo de conteúdo do Guia PDDE no SEI!RIO e reduz o risco de divergência entre página, checklist, busca, modelos e metadados.

## Princípio

Dados normativos e operacionais devem existir em um único registro estruturado. Componentes React devem selecionar e apresentar esses dados, sem recriar manualmente artigos, fontes, listas documentais ou matrizes de aplicabilidade.

## Mapa atual

| Conteúdo | Fonte de verdade | Superfícies consumidoras | Situação na versão 2.7.0 |
|---|---|---|---|
| Fontes normativas oficiais | `src/lib/normativeSources.ts` | Citações, cartões jurídicos, Anexo, matriz e recursos oficiais | Centralizado para os dados compartilhados |
| Regras normativas | `src/lib/normativeRules.ts` | Seção 2, busca e auditoria | Principais regras renderizadas e indexadas estruturalmente |
| Matriz por exercício | `src/lib/applicabilityMatrix.ts` | Anexo | Centralizada, com status explícito |
| Regras locais pendentes | `src/lib/localOperationalRules.ts` e `LOCAL_RULES_REGISTER.md` | Auditoria e governança editorial | Registro ampliado para todas as rotinas locais identificadas |
| Lista documental interativa | `src/lib/pddeOperationalData.ts` | Checklist e Anexo | Compartilhada; fundamento individual ainda deve migrar para registro próprio |
| Seções e navegação | `src/lib/guideContent.ts` | Menu, busca, jornada e JSON-LD | JSON-LD gerado no build a partir das seis seções do guia |
| Links de apoio gerais | `src/lib/externalResources.ts` | Cards, checklist e contatos | Título, URL, órgão e verificação das fontes compartilhadas derivados do catálogo normativo |
| Versão e datas | `src/lib/guideVersion.ts` | Interface e metadados de build | Centralizado parcialmente |
| Índice de busca | `src/lib/searchIndex.ts` | Busca global | Regras normativas geradas automaticamente; itens editoriais permanecem manuais |
| Modelos de texto | `src/components/pop/SmartTemplates.tsx` | Seção 2 | Identificados como minutas; despacho sem conclusão antecipada de regularidade |

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

- fazer o checklist derivar de um registro documental com fundamento individual por item;
- migrar integralmente os itens editoriais manuais da busca quando houver fonte estruturada equivalente;
- remover as exceções restantes da auditoria de citações diretas;
- substituir redações imperativas locais nas seções operacionais por conteúdo derivado do registro de validação;
- registrar fonte formal e revisão humana para as rotinas locais que vierem a ser homologadas;
- sincronizar a versão 2.7.0 em `package.json`, `package-lock.json` e `guideVersion.ts` no momento da publicação aprovada.
