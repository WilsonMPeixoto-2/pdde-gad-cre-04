# AGENTS.md — Política de engenharia assistida

Este arquivo contém as regras persistentes para agentes de programação neste repositório. **As regras específicas do projeto e as decisões vigentes prevalecem sobre orientações gerais.**

## 1. Seleção automática dos melhores recursos disponíveis
Em **toda** tarefa de implementação, correção, refatoração, auditoria, manutenção, automação ou evolução visual:
1. Inspecionar o repositório e identificar a arquitetura, a versão real, as convenções, os testes disponíveis, o ambiente e os contratos vigentes.
2. Avaliar e usar **proativamente**, quando pertinentes e acessíveis, as integrações, ferramentas e habilidades especializadas mais adequadas: GitHub (código, PR, CI), Context7/documentação oficial atualizada, Vercel (Preview, deploy, performance, observabilidade), Supabase (somente se a aplicação já utiliza esse backend), PostHog (análise de uso e erros, se já integrado), testes automatizados, depuração, análise de dados e ferramentas de design/UX como Figma e Product Design.
3. Selecionar ferramentas pela utilidade técnica, não pela quantidade. Não instalar dependências, serviços ou plugins redundantes para substituir algo que já funciona bem.
4. Confirmar o estado de conexão, permissão, instrumentação e disponibilidade; **plugin conectado não significa SDK instalado no sistema**. Se algo exigir permissão externa, nova conta ou custo, relatar objetivamente e continuar com os recursos disponíveis.
5. Preferir tecnologias estáveis, atuais e compatíveis, sem migrar de arquitetura nem atualizar bibliotecas indiscriminadamente.

## 2. Critérios permanentes de qualidade
- Diagnosticar a causa real antes da mudança; aplicar a menor solução coerente e completa.
- Preservar contratos, regras de negócio, dados existentes, desempenho, identidade visual e recursos aprovados.
- Exigir UI profissional, clara, acessível e responsiva, com boa hierarquia, tipografia, legibilidade, espaçamento e feedback de ações.
- Verificar o resultado real, não apenas o código: navegador, rotas, interações, casos de erro, dispositivos móveis e persistência quando aplicável.
- Usar os checks existentes do projeto, conforme o escopo: lint, typecheck, testes unitários e de integração, E2E/Playwright, cross-browser, build, CI, verificações visuais e análise de performance.
- Se houver telemetria oficial (Vercel Web Analytics/Speed Insights, PostHog), aproveitar dados reais antes de fazer otimizações e evitar coleta duplicada.
- Preferir mudanças em branch, PR e Preview; não modificar Production ou dados institucionais sem autorização específica da tarefa.
- Não declarar êxito, integração ativa ou testes aprovados sem evidência verificável.
- Documentar decisões técnicas duráveis e relatar em português do Brasil: mudanças, verificações, evidências, links e limites.

## 3. Orientações específicas deste projeto
- Este projeto é um guia institucional do PDDE no SEI!RIO para a 4ª CRE, com referências normativas, documentos e fluxos operacionais. **Não inventar orientações jurídicas, datas, normas, valores ou procedimentos**.
- Preservar precisão dos materiais, links, identidade visual e orientação ao usuário. Separar texto institucional do metadado técnico.
- Antes de concluir alterações, usar `npm run check:ci` quando viável, incluindo auditoria normativa/de conteúdo, PDFs, E2E e acessibilidade.
- Priorizar desempenho de navegação, clareza dos passos e leitura em celular, sem sacrificar a exatidão documental.
