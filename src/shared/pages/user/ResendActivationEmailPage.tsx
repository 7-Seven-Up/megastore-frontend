import SendEmailForm from "@/modules/user/components/SendEmailForm";

export function ResendActivationEmailPage() {
  return (
    <div
      className={`fadeInUp flex w-full max-w-screen-sm flex-col justify-center gap-6 p-6 text-center`}
    >
      <SendEmailForm path="/resend-activation-email" />
      <div className="text-center text-content4-foreground">
        <p>You will receive another activation email in a few minutes.</p>
        <p>If you don't, please contact our support team for assistance.</p>
      </div>
    </div>
  );
}
