import { api } from "./api";

interface Project {
  id: number;
  name: string;
  description?: string;
}

export const getProjects = async (): Promise<Project[]> => {
  return api("/projects", "GET");
};

export const createProject = async (
  name: string,
  description?: string,
  ownerId?: number,
): Promise<Project> => {
  return api("/projects", "POST", { name, description, ownerId });
};

export const updateProject = async (
  id: number,
  name: string,
  description?: string,
): Promise<Project> => {
  return api(`/projects/${id}`, "PUT", { name, description });
};

export const deleteProject = async (id: number): Promise<void> => {
  return api(`/projects/${id}`, "DELETE");
};
