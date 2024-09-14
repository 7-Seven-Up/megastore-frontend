import { Title } from "@/shared/components/typography/Title.tsx";

export default function EmailSentToRecoverPassword() {
  return (
    <div className={"fadeInUp flex flex-col items-center gap-6 text-center"}>
      <header>
        <Title>Email Sent</Title>
      </header>

      <div className={"flex flex-col gap-1"}>
        <p>Please check your email to confirm your account.</p>
        <p>If you didn't receive the email, please check your spam folder.</p>
        <p>We hope to see you again!</p>
      </div>
    </div>
  );
}
