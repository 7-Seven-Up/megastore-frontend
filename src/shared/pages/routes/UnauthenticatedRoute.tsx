import { Navigate, useSearchParams } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";

type UnauthenticatedRouteProps = PropsWithChildren;

export function UnauthenticatedRoute({ children }: UnauthenticatedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const [params] = useSearchParams();
  return isAuthenticated ? <Navigate to={params.get("returnTo") || "/"} replace /> : children;
}
