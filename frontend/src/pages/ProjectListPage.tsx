import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../services/projectService";
import { ProjectForm } from "../components/ProjectForm";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  description?: string;
}

const ProjectListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Obtener el ID del usuario desde la cookie
  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user") || "")
    : null;

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
    }
  };

  const handleCreateProject = async (name: string, description?: string) => {
    try {
      if (user) {
        await createProject(name, description, user.id);
        fetchProjects();
        setIsModalOpen(false);
        Swal.fire(
          "Proyecto creado",
          "El proyecto se creó exitosamente",
          "success",
        );
      } else {
        Swal.fire("Error", "No se pudo obtener el ID del usuario", "error");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el proyecto", "error");
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleUpdateProject = async (name: string, description?: string) => {
    if (!editingProject) return;

    try {
      await updateProject(editingProject.id, name, description);
      fetchProjects();
      setIsModalOpen(false);
      setEditingProject(null);
      Swal.fire(
        "Proyecto actualizado",
        "El proyecto ha sido actualizado",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el proyecto", "error");
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      fetchProjects();
      Swal.fire(
        "Proyecto eliminado",
        "El proyecto ha sido eliminado",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el proyecto", "error");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
        <button
          onClick={() => {
            setEditingProject(null); // Para crear un nuevo proyecto
            setIsModalOpen(true);
          }}
          className="mb-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Agregar Proyecto
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
          </h2>
          <ProjectForm
            onSubmit={
              editingProject ? handleUpdateProject : handleCreateProject
            }
            initialData={
              editingProject
                ? {
                    name: editingProject.name,
                    description: editingProject.description,
                  }
                : undefined
            }
          />
        </Modal>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="text-lg font-bold">{project.name}</h2>
              <p>{project.description}</p>
              <div className="mt-2 space-x-2">
                <Link
                  to={`/projects/${project.id}/test-plans`}
                  className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Ver Planes de Prueba
                </Link>
                <button
                  onClick={() => handleEditProject(project)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectListPage;
