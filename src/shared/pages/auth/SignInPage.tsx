import { AuthFooter } from "@/features/auth/components/AuthFooter.tsx";
import { SignInForm } from "@/features/auth/components/SignInForm.tsx";

export function SignInPage() {
  return (
    <div className={"fadeInUp flex w-full max-w-screen-sm flex-col gap-6 p-6 text-center"}>
      <SignInForm />
      <AuthFooter
        actionText={"Don't have an account yet?"}
        linkHref={"/auth/signup"}
        linkText={"Sign up here."}
      />
    </div>
  );
}
