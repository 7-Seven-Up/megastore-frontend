import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/modules/users/user.service.ts";
import { useNavigate } from "react-router-dom";

export const useSendEmail = ({ navigate_to }: { navigate_to: string }) => {
  const navigate = useNavigate();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationKey: [""],
    mutationFn: sendEmail,
    onSuccess: () => {
      navigate(navigate_to, { replace: true });
    },
  });

  return { mutate, isError, isPending, isSuccess };
};
