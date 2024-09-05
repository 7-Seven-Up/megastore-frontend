import { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
  return <h1 className={"text-4xl font-medium md:text-5xl"}>{children}</h1>;
}
