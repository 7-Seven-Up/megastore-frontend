import SignInForm from "@/modules/auth/components/SignInForm.tsx";

export default function SignInPage() {
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
