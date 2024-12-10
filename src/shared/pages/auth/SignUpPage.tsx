import { AuthFooter } from "@/features/auth/components/AuthFooter.tsx";
import { SignUpForm } from "@/features/auth/components/SignUpForm.tsx";

export function SignUpPage() {
  return (
    <div className={"fadeInUp flex w-full max-w-screen-sm flex-col gap-6 p-6 text-center"}>
      <SignUpForm />
      <AuthFooter
        actionText={"Already have an account?"}
        linkHref={"/auth/signin"}
        linkText={"Sign in here."}
      />
    </div>
  );
}
