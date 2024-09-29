import { Title } from "@/shared/components/typography/Title.tsx";
import { Subtitle } from "@/shared/components/typography/Subtitle.tsx";
import { Button, Link } from "@nextui-org/react";
import { Logo } from "@/shared/components/ui/Logo.tsx";

export default function NotFoundPage() {
  return (
    <div className={"grid min-h-screen grid-cols-2 gap-8"}>
      <div
        className={
          "hidden min-h-screen flex-1 items-center justify-center bg-[#053262] lg:flex"
        }
      >
        <Logo />
      </div>
      <div
        className={
          "col-span-2 flex flex-col items-center justify-center gap-8 p-6 text-center lg:col-span-1"
        }
      >
        <div className={"fadeInUp flex flex-col items-center gap-8"}>
          <div className={"flex flex-col gap-4"}>
            <Title>404 - Not Found</Title>
            <Subtitle>Oops! Page Not Found.</Subtitle>
          </div>
          <div>
            <p>
              We couldn’t find the page you’re looking for. It might have been
              moved or no longer exists.
            </p>
            <p>But don’t worry, you can go back to the homepage.</p>
          </div>
          <Button as={Link} color={"secondary"} href={"/"} className={"w-fit"}>
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
