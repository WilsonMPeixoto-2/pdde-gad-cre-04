# Auditoria de Linha de Base - Remediação Normativa PDDE

Data de abertura: 02/07/2026  
Repositório: `WilsonMPeixoto-2/pdde-gad-cre-04`  
Branch de trabalho: `hotfix/normative-safety-v2.5.1`  
Tag de preservação: `v2.5.0-pre-normative-remediation`  
Commit preservado: `559eb483fd3c5b755261425d4f8d865322dbdbcb`  
Versão preservada: `2.5.0`  
URL canônica de produção registrada no projeto: `https://pdde-gad-cre-04.vercel.app/`

## Validação automatizada inicial

Comando executado antes das alterações do hotfix:

```bash
npm run check:ci
```

Resultado: aprovado em 02/07/2026.

Resumo do gate inicial:

- `eslint .`: aprovado.
- `tsc --noEmit`: aprovado.
- `vite build`: aprovado.
- `scripts/audit-content.ts`: sem inconsistências estruturais.
- `scripts/audit-pdfs.ts`: acervo PDF auditado com sucesso.
- `playwright test`: 3 testes aprovados.

## Conteúdos normativos de risco convertidos em tarefas

1. Calculadora antiga apresentava 31 de dezembro como data limite oficial de envio dos autos à GAD.
2. Calculadora antiga gerava marcos automáticos de 30 de novembro e 15 de dezembro.
3. Texto de vencimento utilizava a expressão "prazo legal de entrega" para fluxo interno.
4. Regra das três cotações atribuía a base ao art. 17.
5. Vedação de gastos com pessoal incluía genericamente prestadores.
6. Anexo simplificava contratação de pessoa física por recibo comum ou RPA.
7. O guia não tinha aviso permanente de escopo distinguindo SEI!RIO dos ambientes federais.

## Hashes SHA-256 dos modelos PDF

```text
CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf: 33D7710CC436BE0FE6E17624029C3FFA12FC94100B34FCCC2D078EF0514C956D
DEMONSTRATIVO_DE_DESPESA.pdf: 0E0A5F15A00288A20295EE41B442F1C248CAC3031C180210A18A844621A5FC2E
EXTRATO_APLICACAO.pdf: C54637038CB8E510241F36ECECF312B6FB78C5537555A49859FE23D3D89A813C
EXTRATO_CONTA_CORRENTE.pdf: 84BA6C360DD952282BD0EFAE2250F415E8E8063C5E1E9F782A2D89490B4D4A14
MODELO_DE_OFICIO_PDDE.pdf: 2AAA1FEC1897D040FB9AA547D410DA17AF967FB88DC65BAA53EF25C12CAED4D0
NOTA_FISCAL_ELETRONICA_DANFE.pdf: 11B8F25275D88C6D41A746F8533D22B7AD958764444009255BB6A208BE15E285
PARECER_DO_CONSELHO.pdf: 3F27F01100E52A87471568E584411F41463C888233349AE25D44D6CDFC93892E
PLANEJAMENTO_COM_ATA.pdf: 1A397E48DFB4120727835F3046DD3602C522300F6D553321F92C09C62901EB57
```

## Evidências pendentes para o pull request

- Capturas desktop antes/depois.
- Capturas mobile antes/depois.
- PDF integral gerado antes/depois.
- Registro nominal da revisão normativa humana.
- Confirmação de produção/preview após publicação.

Esses itens não foram marcados como concluídos nesta linha de base porque dependem de anexação ao PR, homologação local ou revisão humana formal.
