import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { AUTH_SIGN_IN_KEY } from "@auth/constants.ts";
import { signUpUser } from "@auth/auth.service.ts";

export function useSignUp() {
  const navigate = useNavigate();
  const { isError, isPending, mutate } = useMutation({
    mutationKey: [AUTH_SIGN_UP_KEY],
    mutationFn: signUpUser,
    onSuccess: () => {
      navigate("/auth/email-sent", { replace: true });
    },
  });

  return {
    isError,
    isPending,
    mutate,
  };
}
