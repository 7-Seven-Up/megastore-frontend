import { Title } from "@/shared/components/typography/Title.tsx";

export function ActivationEmailResent() {
  return (
    <div className={"fadeInUp flex flex-col items-center gap-6 text-center"}>
      <header>
        <Title>Activation Email Resent</Title>
      </header>

      <div className={"flex flex-col gap-1"}>
        <p>Please check again your email to confirm your account.</p>
        <p>If you didn't receive the email, please contact our support team.</p>
        <p>All of your previous activation links will be expired.</p>
      </div>
    </div>
  );
}
