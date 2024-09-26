import { Role } from "@/modules/user/enums/role.enum.ts";

export interface AuthResponse {
  accessToken: string;
  role: Role;
  userId: string;
}
