import { useState, useEffect } from "react";

interface TestCaseFormProps {
  onSubmit: (
    name: string,
    expectedResult: string,
    description?: string,
  ) => void;
  initialData?: { name: string; expectedResult: string; description?: string };
}

const TestCaseForm = ({ onSubmit, initialData }: TestCaseFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [expectedResult, setExpectedResult] = useState(
    initialData?.expectedResult || "",
  );
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setExpectedResult(initialData.expectedResult);
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, expectedResult, description);
    setName("");
    setExpectedResult("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Nombre del Caso de Prueba
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Resultado Esperado
        </label>
        <input
          type="text"
          value={expectedResult}
          onChange={(e) => setExpectedResult(e.target.value)}
          required
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {initialData ? "Actualizar Caso de Prueba" : "Crear Caso de Prueba"}
      </button>
    </form>
  );
};

export default TestCaseForm;
