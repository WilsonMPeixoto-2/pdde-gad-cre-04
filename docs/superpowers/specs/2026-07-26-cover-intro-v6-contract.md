# Contrato vinculante — capa e introdução v6

## Escopo autorizado

Esta branch implementa exclusivamente:

1. capa;
2. apresentação institucional;
3. escopo e limites;
4. integração visual do mapa das seis etapas.

As Etapas 1 a 6 permanecem funcional e editorialmente inalteradas nesta rodada.

## Conteúdo bloqueado

- Os quatro parágrafos da apresentação institucional são fonte bloqueada.
- Os quatro parágrafos de escopo e limites são fonte bloqueada.
- Os seis títulos e as seis descrições do mapa das etapas são fonte bloqueada.
- É permitido segmentar e distribuir o texto em composições visuais.
- Não é permitido resumir, parafrasear, omitir condições ou alterar o grau de obrigação, cautela ou vedação.
- Todo o conteúdo deve permanecer recuperável, selecionável e pesquisável no HTML e no PDF.

O contrato automatizado `e2e/cover-intro-contract.spec.ts` compara cada bloco exibido com a fonte textual integral. Qualquer diferença reprova a rodada.

## Contrato visual

- proporção editorial da capa: 16:9;
- validação desktop em 3840 × 2160 e 1920 × 1080;
- validação mobile em 390 × 844 com densidade 3x;
- fotografia local com variantes de 960, 1600, 2400 e 3200 px;
- formatos AVIF e WebP, com JPEG local como fallback;
- tipografia e recursos informacionais renderizados como HTML, CSS ou SVG;
- corpo mínimo de 17 px na apresentação e no escopo;
- corpo mínimo de 16 px no mapa das etapas;
- nenhuma sobreposição, rolagem horizontal ou título cortado;
- modo escuro preservado;
- PDF com fontes incorporadas, texto pesquisável e gráficos vetoriais.

## Contrato de avanço

Esta branch não pode:

- alterar as Etapas 1 a 6;
- ser incorporada à `main` sem homologação expressa;
- promover uma implantação para produção;
- ser apresentada como visualmente aprovada pelo usuário antes da revisão do preview.

O próximo conjunto editorial somente pode começar após a homologação desta rodada.
