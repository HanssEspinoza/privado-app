import { api } from "./api";

interface TestCase {
  id: number;
  title: string;
  description?: string;
  testPlanId: number;
}

export const getTestCases = async (): Promise<TestCase[]> => {
  return api("/test-cases", "GET");
};

export const createTestCase = async (
  testPlanId: number,
  name: string,
  expectedResult: string,
  description?: string,
): Promise<TestCase> => {
  return api("/test-cases", "POST", {
    name,
    expectedResult,
    description,
    testPlanId,
  });
};

export const updateTestCase = async (
  id: number,
  title: string,
  description?: string,
): Promise<TestCase> => {
  return api(`/test-cases/${id}`, "PUT", { title, description });
};

export const deleteTestCase = async (id: number): Promise<void> => {
  return api(`/test-cases/${id}`, "DELETE");
};
