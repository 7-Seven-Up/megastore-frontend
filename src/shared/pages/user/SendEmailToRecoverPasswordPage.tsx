import SendEmailForm from "@/modules/user/components/SendEmailForm.tsx";

export default function SendEmailToRecoverPasswordPage() {
  return (
    <div className={"fadeInUp flex flex-col items-center gap-8 text-center"}>
      <div className={"flex flex-col items-center gap-6"}>
        <div className={"flex flex-col content-center items-center"}>
          <SendEmailForm path="/recover-password/send-email" />
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
