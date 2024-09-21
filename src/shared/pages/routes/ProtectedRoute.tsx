import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { Role } from "@/modules/users/enums/role.enum.ts";
import { useAuthStore } from "@auth/hooks/useAuthStore.ts";

interface ProtectedRouteProps extends PropsWithChildren {
  allowedRoles?: Role[];
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated, authResponse } = useAuthStore();
  if (!isAuthenticated) return <Navigate to={"/auth/signin"} />;
  if (!authResponse) return <Navigate to={"/auth/signin"} />;

  if (allowedRoles && !allowedRoles.includes(authResponse.role)) {
    return <Navigate to={"/"} />;
  }

  return children;
}
