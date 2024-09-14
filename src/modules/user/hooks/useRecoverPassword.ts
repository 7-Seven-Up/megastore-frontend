import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AUTH_SIGN_UP_KEY } from "@auth/constants.ts";
import { recoverPassword } from "@/modules/user/user.service.ts";

export const useRecoverPassword = () => {
  const navigate = useNavigate();
  const { isError, isPending, mutate } = useMutation({
    mutationKey: [AUTH_SIGN_UP_KEY],
    mutationFn: recoverPassword,
    onSuccess: () => {
      navigate("/auth/signin", { replace: true });
    },
  });

  return {
    isError,
    isPending,
    mutate,
  };
};
