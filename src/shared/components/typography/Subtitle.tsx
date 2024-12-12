import React from "react";
import { cn } from "@nextui-org/react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function Subtitle({ children, className, ...rest }: Props) {
  return (
    <h2 className={cn("text-xl font-medium md:text-3xl", className)} {...rest}>
      {children}
    </h2>
  );
}
