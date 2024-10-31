import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { recoverPassword } from "@/modules/users/user.service.ts";
import { toast } from "sonner";

export const useRecoverPassword = () => {
  const navigate = useNavigate();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      toast.success("Password recovered successfully", { duration: 3000 });
      navigate("/auth/signin", { replace: true });
    },
  });

  return {
    isError,
    isPending,
    mutate,
  };
};
