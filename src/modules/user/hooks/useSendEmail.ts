import { useMutation } from "@tanstack/react-query";
import { sendRecoverPasswordEmail } from "@/modules/user/user.service.ts";
import { useNavigate } from "react-router-dom";

export const useSendEmail = () => {
  const navigate = useNavigate();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationKey: [""],
    mutationFn: sendRecoverPasswordEmail,
    onSuccess: () => {
      navigate("/auth/recover-password-email-sent", { replace: true });
    },
  });

  return { mutate, isError, isPending, isSuccess };
};
