import SendEmailForm from "@/features/users/components/SendEmailForm.tsx";

export function SendEmailToRecoverPasswordPage() {
  return (
    <div className={"fadeInUp flex max-w-screen-sm flex-col items-center gap-8 p-6 text-center"}>
      <div className={"flex flex-col items-center gap-6"}>
        <div className={"flex w-full flex-col content-center items-center"}>
          <SendEmailForm path="/recover-password/send-email" />
        </div>
        <div className={"flex flex-col content-center items-center"}>
          <p>
            For your account's security, we will send you an email to verify that it's you who wants
            to change the password.
          </p>
        </div>
      </div>
    </div>
  );
}
