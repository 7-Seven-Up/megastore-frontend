import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { Role } from "@/features/users/enums/role.enum.ts";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";

export function UserOrGuestRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, authResponse } = useAuthStore();

  if (isAuthenticated && authResponse?.role === Role.ADMIN) {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
}
