import React from "react";
import { cn } from "@nextui-org/react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export default function Title({ children, className, ...rest }: Props) {
  return (
    <h1 className={cn("text-4xl font-medium md:text-5xl", className)} {...rest}>
      {children}
    </h1>
  );
}
