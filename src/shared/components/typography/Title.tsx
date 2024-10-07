import React from "react";
import { cn } from "@nextui-org/react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function Title({ children, className, ...rest }: Props) {
  return (
    <h1 className={cn("text-2xl font-medium md:text-5xl", className)} {...rest}>
      {children}
    </h1>
  );
}
