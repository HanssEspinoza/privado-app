import { useEffect, useState } from "react";
import {
  getTestExecutions,
  createTestExecution,
  updateTestExecution,
  deleteTestExecution,
} from "../services/testExecutionService";
import TestExecutionForm from "../components/TestExecutionForm";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface TestExecution {
  id: number;
  testCaseId: number;
  result: string;
  evidence?: string;
  executedBy: number;
}

const TestExecutionListPage = () => {
  const { testCaseId } = useParams<{ testCaseId: string }>();
  const { user } = useAuth(); // Obtener el usuario actual del contexto de autenticación
  const [testExecutions, setTestExecutions] = useState<TestExecution[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExecution, setEditingExecution] =
    useState<TestExecution | null>(null);

  // Obtener la lista de ejecuciones de prueba
  const fetchTestExecutions = async () => {
    try {
      const data = await getTestExecutions();
      const filteredExecutions = data.filter(
        (execution) => execution.testCaseId === Number(testCaseId),
      );
      setTestExecutions(filteredExecutions);
    } catch (error) {
      console.error("Error al obtener ejecuciones de prueba:", error);
    }
  };

  const handleCreateTestExecution = async (
    testCaseId: number,
    executedBy: number,
    result: string,
    evidence?: string,
  ) => {
    try {
      await createTestExecution(testCaseId, executedBy, result, evidence);
      fetchTestExecutions();
      setIsModalOpen(false);
      Swal.fire(
        "Ejecución de prueba creada",
        "La ejecución de prueba se creó exitosamente",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo crear la ejecución de prueba", "error");
    }
  };

  const handleEditTestExecution = (execution: TestExecution) => {
    setEditingExecution(execution);
    setIsModalOpen(true);
  };

  const handleUpdateTestExecution = async (
    testCaseId: number,
    executedBy: number,
    result: string,
    evidence?: string,
  ) => {
    if (!editingExecution) return;

    try {
      await updateTestExecution(editingExecution.id, result, evidence);
      fetchTestExecutions();
      setIsModalOpen(false);
      setEditingExecution(null);
      Swal.fire(
        "Ejecución de prueba actualizada",
        "La ejecución de prueba ha sido actualizada",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo actualizar la ejecución de prueba",
        "error",
      );
    }
  };

  const handleDeleteTestExecution = async (id: number) => {
    try {
      await deleteTestExecution(id);
      fetchTestExecutions();
      Swal.fire(
        "Ejecución de prueba eliminada",
        "La ejecución de prueba ha sido eliminada",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la ejecución de prueba", "error");
    }
  };

  useEffect(() => {
    fetchTestExecutions();
  }, [testCaseId]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Ejecuciones de Prueba</h1>
        <button
          onClick={() => {
            setEditingExecution(null);
            setIsModalOpen(true);
          }}
          className="mb-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Agregar Ejecución
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {editingExecution ? "Editar Ejecución" : "Nueva Ejecución"}
          </h2>
          <TestExecutionForm
            onSubmit={
              editingExecution
                ? handleUpdateTestExecution
                : handleCreateTestExecution
            }
            initialData={editingExecution || undefined}
            testCaseId={Number(testCaseId)}
            userId={user.id}
          />
        </Modal>

        {testExecutions.length === 0 ? (
          <div className="text-center text-gray-600 mt-6">
            <p>No hay ejecuciones disponibles para este caso de prueba.</p>
            <p>Puedes crear una nueva haciendo clic en "Agregar Ejecución".</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {testExecutions.map((execution) => (
              <li
                key={execution.id}
                className="p-4 bg-gray-100 rounded-lg shadow"
              >
                <h2 className="text-lg font-bold">
                  Resultado: {execution.result}
                </h2>
                <p>
                  <strong>Evidencia:</strong>{" "}
                  {execution.evidence || "No proporcionada"}
                </p>
                <p>
                  <strong>Ejecutado por:</strong> {execution.executedBy}
                </p>
                <div className="mt-2 space-x-2">
                  <Link
                    to={`/test-cases/${testCaseId}/defects`}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Ver Casos de Prueba
                  </Link>
                  <button
                    onClick={() => handleEditTestExecution(execution)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTestExecution(execution.id)}
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

export default TestExecutionListPage;
