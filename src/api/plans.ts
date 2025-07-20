import { api } from "./index";

export const fetchCurrentPlan = () => api.get("/plan", {});

export const switchPlan = (name: string) => api.post("/plan/switch", { name });
