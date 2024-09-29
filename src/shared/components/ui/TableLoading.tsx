import { Spinner } from "@nextui-org/react";

export function TableLoading() {
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-default p-4"
      }
    >
      <Spinner />
    </div>
  );
}
