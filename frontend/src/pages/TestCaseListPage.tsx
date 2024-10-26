import { useEffect, useState } from "react";
import {
  getTestCases,
  createTestCase,
  deleteTestCase,
  updateTestCase,
} from "../services/testCaseService";
import TestCaseForm from "../components/TestCaseForm";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

interface TestCase {
  id: number;
  name: string;
  expectedResult: string;
  description?: string;
  testPlanId: number;
}

const TestCaseListPage = () => {
  const { testPlanId } = useParams<{ testPlanId: string }>();
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);

  const fetchTestCases = async () => {
    try {
      const data = await getTestCases();
      const filteredTestCases = data.filter(
        (testCase) => testCase.testPlanId === Number(testPlanId),
      );
      setTestCases(filteredTestCases);
    } catch (error) {
      console.error("Error al obtener casos de prueba:", error);
    }
  };

  const handleCreateTestCase = async (
    name: string,
    expectedResult: string,
    description?: string,
  ) => {
    try {
      await createTestCase(
        Number(testPlanId),
        name,
        expectedResult,
        description,
      );
      fetchTestCases();
      setIsModalOpen(false);
      Swal.fire(
        "Caso de prueba creado",
        "El caso de prueba se creó exitosamente",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el caso de prueba", "error");
    }
  };

  const handleEditTestCase = (testCase: TestCase) => {
    setEditingTestCase(testCase);
    setIsModalOpen(true);
  };

  const handleUpdateTestCase = async (
    name: string,
    expectedResult: string,
    description?: string,
  ) => {
    if (!editingTestCase) return;

    try {
      await updateTestCase(
        editingTestCase.id,
        name,
        expectedResult,
        description,
      );
      fetchTestCases();
      setIsModalOpen(false);
      setEditingTestCase(null);
      Swal.fire(
        "Caso de prueba actualizado",
        "El caso de prueba ha sido actualizado",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el caso de prueba", "error");
    }
  };

  const handleDeleteTestCase = async (id: number) => {
    try {
      await deleteTestCase(id);
      fetchTestCases();
      Swal.fire(
        "Caso de prueba eliminado",
        "El caso de prueba ha sido eliminado",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el caso de prueba", "error");
    }
  };

  useEffect(() => {
    fetchTestCases();
  }, [testPlanId]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Casos de Prueba</h1>
        <button
          onClick={() => {
            setEditingTestCase(null);
            setIsModalOpen(true);
          }}
          className="mb-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Agregar Caso de Prueba
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {editingTestCase ? "Editar Caso de Prueba" : "Nuevo Caso de Prueba"}
          </h2>
          <TestCaseForm
            onSubmit={
              editingTestCase ? handleUpdateTestCase : handleCreateTestCase
            }
            initialData={
              editingTestCase
                ? {
                    name: editingTestCase.name,
                    expectedResult: editingTestCase.expectedResult,
                    description: editingTestCase.description,
                  }
                : undefined
            }
          />
        </Modal>

        {testCases.length === 0 ? (
          <div className="text-center text-gray-600 mt-6">
            <p>No hay casos de prueba disponibles para este plan.</p>
            <p>
              Puedes crear uno nuevo haciendo clic en "Agregar Caso de Prueba".
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {testCases.map((testCase) => (
              <li
                key={testCase.id}
                className="p-4 bg-gray-100 rounded-lg shadow"
              >
                <h2 className="text-lg font-bold">{testCase.name}</h2>
                <p>
                  <strong>Resultado Esperado:</strong> {testCase.expectedResult}
                </p>
                <p>{testCase.description}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEditTestCase(testCase)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTestCase(testCase.id)}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestCaseListPage;
