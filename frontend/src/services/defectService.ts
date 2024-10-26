import { api } from "./api";

interface Defect {
  id: number;
  title: string;
  description?: string;
  status: string;
  severity: string;
  assignedTo?: string;
  testCaseId: number;
  reporterId: number;
}

// Obtener todos los defectos
export const getDefects = async (): Promise<Defect[]> => {
  return api("/defects", "GET");
};

// Crear un nuevo defecto
export const createDefect = async (
  testCaseId: number,
  title: string,
  description: string,
  status: string,
  reportedBy: number,
  assignedTo?: string,
): Promise<Defect> => {
  return api("/defects", "POST", {
    title,
    description,
    status,
    assignedTo,
    testCaseId,
    reportedBy,
  });
};

// Actualizar un defecto
export const updateDefect = async (
  id: number,
  title: string,
  description: string,
  status: string,
  severity: string,
  assignedTo?: string,
): Promise<Defect> => {
  return api(`/defects/${id}`, "PUT", {
    title,
    description,
    status,
    severity,
    assignedTo,
  });
};

// Eliminar un defecto
export const deleteDefect = async (id: number): Promise<void> => {
  return api(`/defects/${id}`, "DELETE");
};
