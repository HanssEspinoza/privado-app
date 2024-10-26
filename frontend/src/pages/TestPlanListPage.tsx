import { useEffect, useState } from "react";
import {
  getTestPlans,
  createTestPlan,
  deleteTestPlan,
  updateTestPlan,
} from "../services/testPlanService";
import TestPlanForm from "../components/TestPlanForm";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

interface TestPlan {
  id: number;
  name: string;
  description?: string;
  projectId: number;
}

const TestPlanListPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [testPlans, setTestPlans] = useState<TestPlan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestPlan, setEditingTestPlan] = useState<TestPlan | null>(null);

  const fetchTestPlans = async () => {
    try {
      const data = await getTestPlans();
      const projectTestPlans = data.filter(
        (plan) => plan.projectId === Number(projectId),
      );
      setTestPlans(projectTestPlans);
    } catch (error) {
      console.error("Error al obtener planes de prueba:", error);
    }
  };

  const handleCreateTestPlan = async (name: string, description?: string) => {
    try {
      await createTestPlan(name, description, Number(projectId));
      fetchTestPlans();
      setIsModalOpen(false);
      Swal.fire(
        "Plan de prueba creado",
        "El plan de prueba se creó exitosamente",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el plan de prueba", "error");
    }
  };

  const handleEditTestPlan = (testPlan: TestPlan) => {
    setEditingTestPlan(testPlan);
    setIsModalOpen(true);
  };

  const handleUpdateTestPlan = async (name: string, description?: string) => {
    if (!editingTestPlan) return;

    try {
      await updateTestPlan(editingTestPlan.id, name, description);
      fetchTestPlans();
      setIsModalOpen(false);
      setEditingTestPlan(null);
      Swal.fire(
        "Plan de prueba actualizado",
        "El plan de prueba ha sido actualizado",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el plan de prueba", "error");
    }
  };

  const handleDeleteTestPlan = async (id: number) => {
    try {
      await deleteTestPlan(id);
      fetchTestPlans();
      Swal.fire(
        "Plan de prueba eliminado",
        "El plan de prueba ha sido eliminado",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el plan de prueba", "error");
    }
  };

  useEffect(() => {
    fetchTestPlans();
  }, [projectId]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Planes de Prueba</h1>
        <button
          onClick={() => {
            setEditingTestPlan(null);
            setIsModalOpen(true);
          }}
          className="mb-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Agregar Plan de Prueba
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {editingTestPlan ? "Editar Plan de Prueba" : "Nuevo Plan de Prueba"}
          </h2>
          <TestPlanForm
            onSubmit={
              editingTestPlan ? handleUpdateTestPlan : handleCreateTestPlan
            }
            initialData={
              editingTestPlan
                ? {
                    name: editingTestPlan.name,
                    description: editingTestPlan.description,
                  }
                : undefined
            }
          />
        </Modal>

        {testPlans.length === 0 ? (
          <div className="text-center text-gray-600 mt-6">
            <p>No hay planes de prueba disponibles para este proyecto.</p>
            <p>
              Puedes crear uno nuevo haciendo clic en "Agregar Plan de Prueba".
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {testPlans.map((testPlan) => (
              <li
                key={testPlan.id}
                className="p-4 bg-gray-100 rounded-lg shadow"
              >
                <h2 className="text-lg font-bold">{testPlan.name}</h2>
                <p>{testPlan.description}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEditTestPlan(testPlan)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTestPlan(testPlan.id)}
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

export default TestPlanListPage;
