import { useState } from "react";
import Cookies from "js-cookie";

interface TestExecutionFormProps {
  onSubmit: (
    testCaseId: number,
    executedBy: number,
    result: string,
    evidence?: string,
  ) => void;
  initialData?: {
    testCaseId: number;
    executedBy: number;
    result: string;
    evidence?: string;
  };
  testCaseId: number;
  userId: number;
}

const TestExecutionForm = ({
  onSubmit,
  initialData,
  testCaseId,
}: TestExecutionFormProps) => {
  const userCookie = Cookies.get("user");
  const executedBy = userCookie ? JSON.parse(userCookie).id : null;
  const [result, setResult] = useState<string>(initialData?.result || "PASSED");
  const [evidence, setEvidence] = useState(initialData?.evidence || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(testCaseId, Number(executedBy), result, evidence || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Resultado
        </label>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="PASSED">Pasado</option>
          <option value="FAILED">Fallido</option>
          <option value="BLOCKED">Bloqueado</option>
          <option value="SKIPPED">Omitido</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">
          Evidencia
        </label>
        <textarea
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="Opcional: Descripción de la evidencia de la ejecución"
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
      >
        {initialData ? "Actualizar Ejecución" : "Crear Ejecución"}
      </button>
    </form>
  );
};

export default TestExecutionForm;
