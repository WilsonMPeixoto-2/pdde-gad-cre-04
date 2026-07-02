import { applicabilityMatrix } from "@/lib/applicabilityMatrix";

export const ApplicabilityMatrix = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="px-4 py-3 font-semibold">Exercício</th>
            <th className="px-4 py-3 font-semibold">UEx</th>
            <th className="px-4 py-3 font-semibold">EEx/EM</th>
            <th className="px-4 py-3 font-semibold">Orientação do site</th>
          </tr>
        </thead>
        <tbody>
          {applicabilityMatrix.map((entry) => (
            <tr key={entry.id} className="border-b border-slate-200">
              <td className="px-4 py-3 font-semibold text-slate-950">{entry.exerciseRange}</td>
              <td className="px-4 py-3 text-slate-700">{entry.uexApplicability}</td>
              <td className="px-4 py-3 text-slate-700">{entry.eexApplicability}</td>
              <td className="px-4 py-3 text-slate-700">{entry.siteGuidance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
