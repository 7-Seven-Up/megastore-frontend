import { Role } from "@/modules/users/enums/role.enum.ts";

export interface AuthResponse {
  accessToken: string;
  role: Role;
  userId: string;
}
