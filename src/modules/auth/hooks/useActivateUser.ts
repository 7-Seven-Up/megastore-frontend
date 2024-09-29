import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { activateUser } from "@auth/auth.service.ts";
import { toast } from "sonner";

export function useActivateUser() {
  const navigate = useNavigate();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      toast.success("Account activated successfully", { duration: 3000 });
      navigate("/auth/signin", { replace: true });
    },
  });

  return {
    activateUserMutate: mutate,
    activateUserIsPending: isPending,
    activateUserIsError: isError,
    activateUserIsSuccess: isSuccess,
  };
}
