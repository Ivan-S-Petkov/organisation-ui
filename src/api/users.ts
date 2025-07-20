import { UserForm } from "../types";
import { api } from "./index";

export const fetchUsers = (
  page: number,
  perPage: number,
  search: string,
  role: string,
  hasLicense: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });
  if (search) params.append("search", search);
  if (role) params.append("role", role);
  if (hasLicense) params.append("hasLicense", hasLicense);

  return api.get(`/users?${params.toString()}`);
};

export const createUser = (user: UserForm) => api.post(`/users`, user);
