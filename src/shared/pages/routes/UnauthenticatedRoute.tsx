import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAuthStore } from "@auth/hooks/useAuthStore.ts";

type UnauthenticatedRouteProps = PropsWithChildren;

export function UnauthenticatedRoute({ children }: UnauthenticatedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to={"/"} /> : children;
}
