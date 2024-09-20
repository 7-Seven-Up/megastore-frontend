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
        <div className={"flex flex-col content-center items-center"}>
          <p>
            For your account's security, we will send you an email to verify
            that it's you who wants to change the password.
          </p>
        </div>
      </div>
    </div>
  );
}
