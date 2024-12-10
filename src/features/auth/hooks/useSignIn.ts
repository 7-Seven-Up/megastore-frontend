import { useMutation } from "@tanstack/react-query";

import { AUTH_SIGN_IN_KEY } from "@/features/auth/constants.ts";
import { signInUser } from "@/features/auth/auth.service.ts";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";

export function useSignIn() {
  const { login } = useAuthStore();

  const { isPending, mutate } = useMutation({
    mutationFn: signInUser,
    mutationKey: [AUTH_SIGN_IN_KEY],
    onSuccess: (authResponse) => {
      login(authResponse);
    },
  });

  return {
    isPending,
    mutate,
  };
}
