import RecoverPasswordForm from "@/modules/user/components/RecoverPasswordForm.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { useSearchParams } from "react-router-dom";
import { useRecoverPasswordValidationParams } from "@/modules/user/hooks/useRecoverPasswordValidationParams.ts";
import { useEffect } from "react";

type RecoverPasswordParams = {
  token?: string;
};

export default function RecoverPasswordPage() {
  const [searchParams] = useSearchParams();

  const params: RecoverPasswordParams = {
    token: searchParams.get("token")!,
  };

  const { redirectToNotFound } = useRecoverPasswordValidationParams();

  useEffect(() => {
    if (!params.token) {
      redirectToNotFound();
    }
  }, [params]);

  return (
    <div className={"fadeInUp grid w-full grid-cols-1 gap-6 p-12"}>
      <header className={"gap-6 text-center"}>
        <Title>Recover your password</Title>
      </header>
      <div className={"flex w-full"}>
        {params.token && <RecoverPasswordForm token={params.token} />}
      </div>
    </div>
  );
}
