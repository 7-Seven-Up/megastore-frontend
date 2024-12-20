import { PropsWithChildren } from "react";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";
import { Role } from "@/features/users/enums/role.enum.ts";

interface RoleBasedVisibilityProps extends PropsWithChildren {
  allowedRoles?: Role[];
}

export function RoleBasedVisibility({ allowedRoles, children }: RoleBasedVisibilityProps) {
  const { isAuthenticated, authResponse } = useAuthStore();
  if (!isAuthenticated) return null;
  if (!authResponse) return null;

  if (allowedRoles && !allowedRoles.includes(authResponse.role)) {
    return null;
  }

  return children;
}
