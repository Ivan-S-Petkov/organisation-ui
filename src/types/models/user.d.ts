export interface UserForm {
  name: string;
  email: string;
  role: string;
}

export interface User extends UserForm {
  ID: number;
  hasLicense: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
}
