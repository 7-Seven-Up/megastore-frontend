import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { recoverPassword } from "@/modules/user/user.service.ts";

export const useRecoverPassword = () => {
  const navigate = useNavigate();

  const { isError, isPending, mutate } = useMutation({
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
