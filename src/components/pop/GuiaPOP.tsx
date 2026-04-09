import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function GuiaPOP() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* O container "prose" formata os H1, H2, p e listas automaticamente */}
      <article className="prose prose-slate md:prose-lg max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-200">
        
        <h1 className="text-slate-900 tracking-tight">
          POP PDDE: Prestação de Contas no SEI!RIO
        </h1>
        
        <p className="lead text-slate-600">
          Este manual orienta diretores de escolas da 4ª CRE sobre como realizar 
          corretamente a instrução da prestação de contas utilizando o sistema SEI.
        </p>

        <Alert variant="destructive" className="not-prose my-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Aviso Importante</AlertTitle>
          <AlertDescription>
            Todas as notas fiscais devem estar previamente carimbadas antes de
            serem digitalizadas para anexação no sistema.
          </AlertDescription>
        </Alert>

        <h2 className="text-slate-800 border-b pb-2">Fase 1: Abertura do Processo</h2>
        <p>Para iniciar a prestação de contas, o diretor da unidade deverá:</p>
        <ul>
          <li>Fazer login no SEI!RIO com sua matrícula;</li>
          <li>Clicar em "Iniciar Processo" no menu esquerdo;</li>
          <li>Selecionar o tipo de processo correto para "Educação: PDDE";</li>
        </ul>

        <h2 className="text-slate-800 border-b pb-2">Fase 2: Anexação de Documentos</h2>
        <p>
          Após abrir o processo, você deverá incluir o formulário de
          acompanhamento. É fundamental garantir que a formatação esteja em PDF/A
          para evitar devoluções da GAD.
        </p>
      </article>
    </main>
  )
}
