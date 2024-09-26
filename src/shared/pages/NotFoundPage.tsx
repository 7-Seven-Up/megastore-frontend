import { Title } from "@/shared/components/typography/Title.tsx";
import { Subtitle } from "@/shared/components/typography/Subtitle.tsx";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/shared/components/ui/Logo.tsx";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={"grid grid-cols-2 gap-8"}>
      <div
        className={
          "hidden min-h-screen flex-1 items-center justify-center bg-[#053262] lg:flex"
        }
      >
        <Logo />
      </div>
      <div
        className={
          "fadeInUp flex flex-col items-center justify-center gap-8 text-center"
        }
      >
        <Title>404 - Not Found</Title>
        <Subtitle>Oops! Page Not Found.</Subtitle>
        <div>
          <p>
            We couldn’t find the page you’re looking for. It might have been
            moved or no longer exists.
          </p>
          <p>But don’t worry, you can go back to the homepage.</p>
        </div>
        <Button color={"secondary"} onClick={() => navigate("/")}>
          Go to homepage
        </Button>
      </div>
    </div>
  );
}
