import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ActivateUserRequest } from "@auth/interfaces/requests/activate-user.interface.ts";
import { Title } from "@/shared/components/typography/Title.tsx";
import { activateUser } from "@/modules/auth/auth.service.ts";

export function ActivateUserPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (params: ActivateUserRequest) => activateUser(params),
    onSuccess: () => {
      toast.success("Account activated successfully", { duration: 3000 });
      navigate("/auth/signin", { replace: true });
    },
  });

  async function handleActivate() {
    const userId = searchParams.get("userId");
    const activationToken = searchParams.get("activationToken");
    if (!userId || !activationToken) return;
    mutate({ userId, activationToken });
  }

  return (
    <div className={"flex flex-col gap-6"}>
      <div className={"flex flex-col gap-4 text-center"}>
        <Title>Activate your account</Title>
        <p className={"text-content4-foreground"}>
          It's simple, just click the button below and start using our
          e-commerce.
        </p>
      </div>
      <Button
        color={"secondary"}
        isDisabled={isSuccess || isError}
        isLoading={isPending}
        onClick={handleActivate}
      >
        Activate account
      </Button>
    </div>
  );
}
