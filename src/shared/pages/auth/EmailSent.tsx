import { Title } from "@/shared/components/typography/Title.tsx";
import { Link } from "@nextui-org/react";

export function EmailSent() {
  return (
    <div className={"fadeInUp flex flex-col items-center gap-6 text-center"}>
      <header>
        <Title>Account created</Title>
      </header>

      <div className={"flex flex-col gap-1"}>
        <p>Please check your email to confirm your account.</p>
        <p>If you didn't receive the email, please check your spam folder.</p>
        <p>We hope to see you again!</p>
      </div>
      <Link href={"/auth/resend-activation-email"} color={"secondary"}>
        Didn't receive an activation email?
      </Link>
    </div>
  );
}
