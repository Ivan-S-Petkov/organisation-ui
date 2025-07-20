export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
};

export type Role = (typeof ROLES)[keyof typeof ROLES];
