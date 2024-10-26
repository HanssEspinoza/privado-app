import { api } from "./api";

interface TestPlan {
  id: number;
  name: string;
  description?: string;
  projectId: number;
}

export const getTestPlans = async (): Promise<TestPlan[]> => {
  return api("/test-plans", "GET");
};

export const createTestPlan = async (
  name: string,
  description?: string,
  projectId?: number,
): Promise<TestPlan> => {
  return api("/test-plans", "POST", { name, description, projectId });
};

export const updateTestPlan = async (
  id: number,
  name: string,
  description?: string,
): Promise<TestPlan> => {
  return api(`/test-plans/${id}`, "PUT", { name, description });
};

export const deleteTestPlan = async (id: number): Promise<void> => {
  return api(`/test-plans/${id}`, "DELETE");
};
