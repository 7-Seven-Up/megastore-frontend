import SendEmailForm from "@/modules/user/components/SendEmailForm.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";

export default function SendEmailToRecoverPasswordPage() {
  return (
    <div className={"fadeInUp flex flex-col items-center gap-8 text-center"}>
      <header>
        <Title>Recover Password</Title>
      </header>
      <div className={"flex flex-col items-center gap-6"}>
        <div className={"flex flex-col content-center items-center"}>
          <SendEmailForm />
        </div>
      </div>
    </div>
  );
}
