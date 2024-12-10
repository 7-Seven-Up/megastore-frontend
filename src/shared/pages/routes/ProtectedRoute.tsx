import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";
import { Role } from "@/features/users/enums/role.enum.ts";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";

interface ProtectedRouteProps extends PropsWithChildren {
  allowedRoles?: Role[];
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { isAuthenticated, authResponse } = useAuthStore();
  const { pathname } = useLocation();
  if (!isAuthenticated) return <Navigate to={`/auth/signin?returnTo=${pathname}`} />;
  if (!authResponse) return <Navigate to={`/auth/signin?returnTo=${pathname}`} />;

  if (allowedRoles && !allowedRoles.includes(authResponse.role)) {
    return <Navigate to={"/"} />;
  }

  return children;
}
