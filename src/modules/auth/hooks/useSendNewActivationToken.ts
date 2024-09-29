import { sendNewActivationToken } from "@auth/auth.service.ts";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSendNewActivationToken() {
  const navigate = useNavigate();
  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: [""],
    mutationFn: sendNewActivationToken,
    onSuccess: () => {
      navigate("/auth/activation-email-resent", { replace: true });
    },
  });

  return {
    sendNewTokenMutate: mutate,
    sendNewTokenIsSuccess: isSuccess,
    sendNewTokenIsError: isError,
  };
}
