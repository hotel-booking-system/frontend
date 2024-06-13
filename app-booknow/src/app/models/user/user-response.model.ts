import { RoleResponse } from "./role-response.moel";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  address: string;
  active: boolean;
  role: RoleResponse;
  createdAt: string;
  updatedAt: string;
}
