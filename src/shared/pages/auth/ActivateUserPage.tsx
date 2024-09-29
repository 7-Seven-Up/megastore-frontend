import { Button, Link } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";

import { Title } from "@/shared/components/typography/Title.tsx";
import { useActivateUser } from "@auth/hooks/useActivateUser.ts";
import { useSendNewActivationToken } from "@auth/hooks/useSendNewActivationToken.ts";

export function ActivateUserPage() {
  const [searchParams] = useSearchParams();
  const {
    mutate: activateUserMutate,
    isPending: activateUserIsPending,
    isError: activateUserIsError,
    isSuccess: activateUserIsSuccess,
  } = useActivateUser();

  const {
    mutate: sendNewTokenMutate,
    isSuccess: sendNewTokenIsSuccess,
    isError: sendNewTokenIsError,
  } = useSendNewActivationToken();

  async function handleActivate() {
    const userId = searchParams.get("userId");
    const activationToken = searchParams.get("activationToken");
    if (!userId || !activationToken) return;
    activateUserMutate({ userId, activationToken });
  }

  async function handleSendNewActivationToken() {
    const activationToken = searchParams.get("activationToken");
    if (!activationToken) return;
    sendNewTokenMutate({ activationToken });
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
        isDisabled={activateUserIsSuccess || activateUserIsError}
        isLoading={activateUserIsPending}
        onClick={handleActivate}
      >
        Activate account
      </Button>
      <div className={"text-center"}>
        <Link
          isDisabled={sendNewTokenIsSuccess || sendNewTokenIsError}
          color={"secondary"}
          onPress={handleSendNewActivationToken}
        >
          Is your activation token expired? Click here to regenerate it.
        </Link>
      </div>
    </div>
  );
}
