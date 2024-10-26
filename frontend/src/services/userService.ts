import { api } from "./api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const getUsers = async (): Promise<User[]> => {
  return api("/users", "GET");
};

export const getUsersByRole = async (role: string): Promise<User[]> => {
  return api(`/users?role=${role}`, "GET");
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> => {
  return api("/users", "POST", { name, email, password, role });
};

export const updateUser = async (
  id: number,
  name: string,
  email: string,
  role: string,
): Promise<User> => {
  return api(`/users/${id}`, "PUT", { name, email, role });
};

export const deleteUser = async (id: number): Promise<void> => {
  return api(`/users/${id}`, "DELETE");
};

export const getCurrentUser = async (): Promise<User> => {
  return api("/users/me", "GET");
};
