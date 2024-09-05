import { PropsWithChildren } from "react";

export default function Subtitle({ children }: PropsWithChildren) {
  return <h2 className={"text-3xl font-medium"}>{children}</h2>;
}
