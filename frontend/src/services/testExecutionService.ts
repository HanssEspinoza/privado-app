import { api } from "./api";

export const createTestExecution = async (
  testCaseId: number,
  executedBy: number,
  result: string,
  evidence: string,
) => {
  return api("/test-executions", "POST", {
    testCaseId,
    executedBy,
    result,
    evidence,
  });
};

export const getTestExecutions = async () => {
  return api("/test-executions", "GET");
};

export const getTestExecutionById = async (id: number) => {
  return api(`/test-executions/${id}`, "GET");
};

export const updateTestExecution = async (
  id: number,
  result: string,
  evidence: string,
) => {
  return api(`/test-executions/${id}`, "PUT", {
    result,
    evidence,
  });
};

export const deleteTestExecution = async (id: number) => {
  return api(`/test-executions/${id}`, "DELETE");
};
