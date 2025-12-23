import { ClipboardList, LogIn, KeyRound } from "lucide-react";
import { SeiMockup } from "./SeiMockup";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";

export const SectionOne = () => {
  return (
    <section id="secao-1" className="scroll-mt-20 animate-fade-in">
      <div className="space-y-8">
        {/* Intro Card */}
        <div className="section-card border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10 shrink-0">
              <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div className="content-spacing">
              <h3 className="section-heading">1.1. Sobre esta etapa</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                A etapa inicial compreende a autuação do processo administrativo eletrônico, 
                no qual serão inseridos todos os documentos comprobatórios da prestação de contas do PDDE.
              </p>
            </div>
          </div>
        </div>

        {/* Acesso ao SEI */}
        <div className="section-card">
          <h3 className="section-heading">1.2. Acesso ao SEI!RIO</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Para acessar o sistema, o usuário deve informar seu <strong className="text-slate-900">login</strong> e 
              <strong className="text-slate-900"> senha</strong> no portal do SEI!RIO. Após a autenticação inicial, 
              será solicitado o código de verificação em duas etapas (2FA).
            </p>

            <div className="mt-6 bg-card border border-border rounded-xl overflow-hidden shadow-lg max-w-sm">
              {/* SEI Header */}
              <div className="text-primary-foreground px-4 py-3 flex items-center gap-2" style={{ background: 'hsl(215, 75%, 28%)' }}>
                <div className="w-8 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">SEI</span>
                </div>
                <span className="font-semibold text-sm">SEI!RIO - Login</span>
              </div>
              
              {/* Login Form */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Usuário
                  </label>
                  <div className="bg-secondary/50 border border-border rounded px-3 py-2 text-sm text-muted-foreground">
                    seu.usuario
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <KeyRound className="w-4 h-4" />
                    Senha
                  </label>
                  <div className="bg-secondary/50 border border-border rounded px-3 py-2 text-sm text-muted-foreground">
                    ••••••••
                  </div>
                </div>
                <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium text-center cursor-pointer hover:bg-primary/90">
                  Acessar
                </div>
              </div>
            </div>

            <Callout variant="info" title="Verificação em Duas Etapas (2FA)" className="mt-6">
              <p className="text-sm text-slate-700 leading-relaxed">
                Após inserir usuário e senha, você receberá um código de verificação por e-mail ou aplicativo 
                autenticador. Este código deve ser informado para concluir o acesso.
              </p>
            </Callout>
          </div>
        </div>

        {/* Steps */}
        <div className="section-card">
          <h3 className="section-heading">1.3. Iniciando o Processo</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Para abrir um novo processo no SEI!RIO, o usuário deve selecionar a opção 
              <strong className="text-slate-900"> "INICIAR PROCESSO"</strong>, conforme o menu de navegação do sistema.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-900 mb-3">Visualização do menu:</p>
              <SeiMockup variant="menu" highlight="iniciar" />
            </div>
          </div>
        </div>

        {/* Type Selection */}
        <div className="section-card">
          <h3 className="section-heading">1.4. Seleção do Tipo de Processo</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Ao selecionar essa opção, o usuário deverá indicar o TIPO DE PROCESSO a ser instaurado. 
              Os tipos de processo disponíveis serão exibidos de acordo com os termos informados na busca.
            </p>

            <Callout variant="info" title="Tipo de Processo Correto:">
              <div className="flex items-center gap-2 mt-2">
                <p className="text-slate-900 font-semibold text-sm sm:text-base flex-1 leading-relaxed">
                  GESTÃO DOS CONSELHOS MUNICIPAIS DE EDUCAÇÃO: PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC
                </p>
                <CopyButton text="GESTÃO DOS CONSELHOS MUNICIPAIS DE EDUCAÇÃO: PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC" label="Copiado!" />
              </div>
            </Callout>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-900 mb-3">Tela de seleção:</p>
              <SeiMockup variant="type-selection" />
            </div>
          </div>
        </div>

        {/* Specification */}
        <div className="section-card">
          <h3 className="section-heading">1.5. Especificação</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              O cadastrante deverá obrigatoriamente digitar os metadados estabelecidos pela GAD, 
              composto pela <strong className="text-slate-900">identificação da unidade escolar</strong> seguida 
              do <strong className="text-slate-900">tipo de PDDE e exercício</strong>.
            </p>

            <Callout variant="success" title="Exemplo de Especificação:">
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-slate-900 data-code text-sm break-all bg-white/50 px-3 py-2 rounded-lg">
                  PRESTAÇÃO DE CONTAS DO CEC DA (XX.XX.XXX – E.M. XXXX-PDDE BÁSICO/2025)
                </code>
                <CopyButton text="PRESTAÇÃO DE CONTAS DO CEC DA (XX.XX.XXX – E.M. XXXX-PDDE BÁSICO/2025)" label="Copiado!" />
              </div>
            </Callout>

            <Callout variant="warning" title="Atenção:" className="mt-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                Substitua <code className="bg-slate-200 px-1 rounded">XX.XX.XXX</code> pela designação da sua unidade 
                e <code className="bg-slate-200 px-1 rounded">E.M. XXXX</code> pelo nome da escola.
              </p>
            </Callout>
          </div>
        </div>

        {/* Classification */}
        <div className="section-card">
          <h3 className="section-heading">1.6. Classificação por Assuntos</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Este campo deverá ser preenchido com o código de classificação correspondente ao assunto do processo.
            </p>

            <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-5">
              <p className="text-sm text-slate-600 mb-3">Classificação do PDDE:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-slate-200 text-sm data-code text-slate-900 break-all shadow-sm">
                  03.04.01.02 - PRESTAÇÃO DE CONTAS DO CEC
                </code>
                <CopyButton text="03.04.01.02" label="Copiado!" />
              </div>
            </div>
          </div>
        </div>

        {/* Interessados */}
        <div className="section-card">
          <h3 className="section-heading">1.7. Interessados</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Neste campo, deve ser informado o <strong className="text-slate-900">CNPJ do CEC</strong> da unidade escolar. 
              O CNPJ é o identificador único do Conselho Escola Comunidade junto à Receita Federal.
            </p>
            
            <Callout variant="success" title="Adicione o CNPJ do CEC:">
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-slate-900 data-code text-sm bg-white/50 px-3 py-2 rounded-lg">
                  XX.XXX.XXX/0001-XX (CNPJ do CEC da sua unidade)
                </code>
              </div>
            </Callout>

            <Callout variant="info" title="Onde encontrar o CNPJ?" className="mt-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                O CNPJ do CEC pode ser encontrado no Cartão CNPJ da entidade ou consultado junto à 
                Gerência de Administração (GAD).
              </p>
            </Callout>
          </div>
        </div>

        {/* Access Level */}
        <div className="section-card">
          <h3 className="section-heading">1.8. Nível de Acesso</h3>
          <div className="content-spacing">
            <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
              <table className="table-institutional text-sm w-full">
                <thead>
                  <tr>
                    <th className="w-28 sm:w-32 rounded-tl-lg">Nível</th>
                    <th className="rounded-tr-lg">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-accent">Público</td>
                    <td className="text-slate-700 leading-relaxed">Documentos acessíveis a qualquer pessoa, seja usuário interno ou externo via Consulta Pública.</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-warning">Restrito</td>
                    <td className="text-slate-700 leading-relaxed">Acessíveis apenas para a unidade que criou o processo e por unidades que recebam o processo para instrução.</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-destructive">Sigiloso</td>
                    <td className="text-slate-700 leading-relaxed">Classificação atribuída a informações confidenciais, com acesso controlado por Credenciais de Acesso.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout variant="info" title="Princípio da Publicidade" className="mt-6">
              <p className="text-sm text-slate-700 leading-relaxed">
                Os processos de prestação de contas do PDDE devem, como regra, ser classificados 
                com nível de acesso <strong className="text-slate-900">"Público"</strong>, por se 
                referirem à aplicação de recursos públicos federais (Art. 37 CF e Lei nº 12.527/2011 - LAI).
              </p>
              <p className="text-sm text-slate-900 font-semibold mt-3">
                → Selecione a opção "Público" no campo Nível de Acesso.
              </p>
            </Callout>
          </div>
        </div>

        {/* Observações */}
        <div className="section-card">
          <h3 className="section-heading">1.9. Observações da Unidade</h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            O campo "Observações desta unidade" poderá ser preenchido por cada unidade em que o processo 
            tramitar. As observações inseridas por outras unidades aparecerão, na tela Alterar Processo, 
            separadamente, na Lista de observações de outras unidades.
          </p>
        </div>

        {/* Salvar */}
        <div className="section-card border-l-4 border-l-success">
          <h3 className="section-heading">1.10. Salvando o Processo</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Após preencher todos os campos obrigatórios, clique no botão <strong className="text-slate-900">"Salvar"</strong> para 
              concluir a autuação do processo. O sistema gerará automaticamente o número do processo no formato:
            </p>
            
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-5 mt-4">
              <p className="text-sm text-slate-600 mb-2">Exemplo de número de processo:</p>
              <code className="bg-white px-4 py-3 rounded-lg border border-slate-200 text-sm data-code text-slate-900 shadow-sm inline-block">
                04.XX.XXXXXX/2025
              </code>
            </div>

            <Callout variant="success" title="Processo Criado!" className="mt-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                Com o processo autuado, você está pronto para iniciar a instrução processual, 
                incluindo os documentos exigidos para a prestação de contas do PDDE.
              </p>
            </Callout>
          </div>
        </div>
      </div>
    </section>
  );
};
