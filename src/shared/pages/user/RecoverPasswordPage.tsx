import RecoverPasswordForm from "@/modules/users/components/RecoverPasswordForm.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

type RecoverPasswordParams = {
  token: string | null;
};

export function RecoverPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const params = useMemo<RecoverPasswordParams>(() => {
    return {
      token: searchParams.get("token"),
    };
  }, [searchParams])

  useEffect(() => {
    if (!params.token) {
      navigate("/not-found");
    }
  }, [params, navigate]);

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
