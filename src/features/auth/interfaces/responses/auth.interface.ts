import { Role } from "@/features/users/enums/role.enum.ts";

export interface AuthResponse {
  accessToken: string;
  role: Role;
  userId: string;
  username: string;
}
