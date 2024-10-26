import { useEffect, useState } from "react";
import {
  getDefects,
  createDefect,
  deleteDefect,
  updateDefect,
} from "../services/defectService";
import DefectForm from "../components/DefectForm";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUsersByRole } from "../services/userService";

interface Defect {
  id: number;
  title: string;
  description?: string;
  status: string;
  severity: string;
  assigneeId?: number;
  reporterId: number;
  testCaseId: number;
}

interface Developer {
  id: number;
  name: string;
}

const DefectListPage = () => {
  const { testCaseId } = useParams<{ testCaseId: string }>();
  const { user } = useAuth();
  const [defects, setDefects] = useState<Defect[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDefect, setEditingDefect] = useState<Defect | null>(null);
  const [developers, setDevelopers] = useState<Developer[]>([]);

  // Obtener la lista de defectos
  const fetchDefects = async () => {
    try {
      const data = await getDefects();
      const filteredDefects = data.filter(
        (defect) => defect.testCaseId === Number(testCaseId),
      );
      setDefects(filteredDefects);
    } catch (error) {
      console.error("Error al obtener defectos:", error);
    }
  };

  // Obtener la lista de desarrolladores con rol DEVELOPER
  const fetchDevelopers = async () => {
    try {
      const devs = await getUsersByRole("DEVELOPER");
      setDevelopers(devs);
    } catch (error) {
      console.error("Error al obtener desarrolladores:", error);
    }
  };

  const handleCreateDefect = async (
    title: string,
    description: string,
    status: string,
    reporterId: number,
    assigneeId?: number,
  ) => {
    try {
      await createDefect(
        Number(testCaseId),
        title,
        description,
        status,
        reporterId,
        assigneeId,
      );
      fetchDefects();
      setIsModalOpen(false);
      Swal.fire("Defecto creado", "El defecto se creó exitosamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el defecto", "error");
    }
  };

  const handleEditDefect = (defect: Defect) => {
    setEditingDefect(defect);
    setIsModalOpen(true);
  };

  const handleUpdateDefect = async (
    title: string,
    description: string,
    status: string,
    reporterId: string,
    assigneeId?: string,
  ) => {
    if (!editingDefect) return;

    try {
      await updateDefect(
        editingDefect.id,
        title,
        description,
        status,
        (reporterId = reporterId.toString()),
        (assigneeId = assigneeId.toString()),
      );
      fetchDefects();
      setIsModalOpen(false);
      setEditingDefect(null);
      Swal.fire(
        "Defecto actualizado",
        "El defecto ha sido actualizado",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el defecto", "error");
    }
  };

  const handleDeleteDefect = async (id: number) => {
    try {
      await deleteDefect(id);
      fetchDefects();
      Swal.fire("Defecto eliminado", "El defecto ha sido eliminado", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el defecto", "error");
    }
  };

  useEffect(() => {
    fetchDefects();
    fetchDevelopers();
  });

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Defectos</h1>
        <button
          onClick={() => {
            setEditingDefect(null);
            setIsModalOpen(true);
          }}
          className="mb-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Agregar Defecto
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {editingDefect ? "Editar Defecto" : "Nuevo Defecto"}
          </h2>
          <DefectForm
            onSubmit={editingDefect ? handleUpdateDefect : handleCreateDefect}
            initialData={
              editingDefect
                ? {
                    title: editingDefect.title,
                    description: editingDefect.description,
                    status: editingDefect.status,
                    reporterId: editingDefect.reporterId,
                    assigneeId: editingDefect.assigneeId,
                  }
                : undefined
            }
            reporterId={user.id}
            developers={developers}
          />
        </Modal>

        {defects.length === 0 ? (
          <div className="text-center text-gray-600 mt-6">
            <p>No hay defectos disponibles para este caso de prueba.</p>
            <p>Puedes crear uno nuevo haciendo clic en "Agregar Defecto".</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {defects.map((defect) => (
              <li key={defect.id} className="p-4 bg-gray-100 rounded-lg shadow">
                <h2 className="text-lg font-bold">
                  {defect.title || "Sin título"}
                </h2>
                <p>
                  <strong>Estado:</strong> {defect.status || "No especificado"}
                </p>
                <p>
                  <strong>Asignado a:</strong>{" "}
                  {defect.assigneeId
                    ? developers.find((dev) => dev.id === defect.assigneeId)
                        ?.name || "No asignado"
                    : "No asignado"}
                </p>
                <p>
                  <strong>Descripción:</strong>{" "}
                  {defect.description || "No hay descripción"}
                </p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEditDefect(defect)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteDefect(defect.id)}
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

export default DefectListPage;
