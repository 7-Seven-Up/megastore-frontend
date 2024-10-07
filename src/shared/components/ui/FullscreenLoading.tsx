import { Spinner } from "@nextui-org/react";

export function FullscreenLoading() {
  return (
    <div
      className={
        "fixed flex h-screen w-full items-center justify-center bg-default-50"
      }
    >
      <Spinner size={"lg"} />
    </div>
  );
}
