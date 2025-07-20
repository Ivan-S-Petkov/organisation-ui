import { api } from ".";

export const login = (email: string) => api.post("/login", { email });
