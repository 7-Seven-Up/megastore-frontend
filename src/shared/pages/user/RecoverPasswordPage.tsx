import RecoverPasswordForm from "@/modules/user/components/RecoverPasswordForm.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { useSearchParams } from "react-router-dom";

type RecoverPasswordParams = {
  userId: string;
  token: string;
};

export default function RecoverPasswordPage() {
  const [searchParams] = useSearchParams();

  const params: RecoverPasswordParams = {
    userId: searchParams.get("userId")!,
    token: searchParams.get("token")!,
  };

  return (
    <div className={"fadeInUp flex flex-col items-center gap-8 text-center"}>
      <header>
        <Title>Recover your password</Title>
      </header>
      <div className={"flex flex-col items-center gap-6"}>
        <div className={"flex flex-col content-center items-center"}>
          <RecoverPasswordForm token={params.token} userId={params.userId} />
        </div>
      </div>
    </div>
  );
}
