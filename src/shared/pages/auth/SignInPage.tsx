import { SignInForm } from "@auth/components/SignInForm.tsx";

export function SignInPage() {
  return (
    <div
      className={
        "fadeInUp flex w-full max-w-screen-sm flex-col p-6 text-center"
      }
    >
      <SignInForm />
    </div>
  );
}
