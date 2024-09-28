import { Link } from "@nextui-org/react";

interface AuthFooterProps {
  actionText: string;
  linkHref: string;
  linkText: string;
}

export function AuthFooter({
  actionText,
  linkHref,
  linkText,
}: AuthFooterProps) {
  return (
    <footer className={"flex flex-col items-center justify-center gap-8"}>
      <div className={"flex gap-2"}>
        <p className={"text-content4-foreground"}>{actionText}</p>
        <Link href={linkHref}>{linkText}</Link>
      </div>
      <Link href={"/auth/resend-activation-email"} color={"secondary"}>
        Didn't receive an activation email?
      </Link>
    </footer>
  );
}
