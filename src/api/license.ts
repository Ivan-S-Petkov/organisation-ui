import { api } from "./index";

export const assignLicense = (userId: number) =>
  api.post(`/licenses/assign`, { userId });

export const unassignLicense = (userId: number) =>
  api.post(`/licenses/unassign`, { userId });
