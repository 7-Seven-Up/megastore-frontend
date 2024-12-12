import { Spinner } from "@nextui-org/react";

interface FullscreenLoadingProps {
  className?: string;
}

export function FullscreenLoading({ className }: FullscreenLoadingProps) {
  return (
    <div
      className={`fixed flex h-screen w-full items-center justify-center bg-default-50 ${className}`}
    >
      <Spinner size={"lg"} />
    </div>
  );
}
