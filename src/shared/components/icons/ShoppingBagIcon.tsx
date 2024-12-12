import { ComponentProps } from "react";

type ShoppingBagIconProps = ComponentProps<"svg">;

export function ShoppingBagIcon(props?: ShoppingBagIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#53535B"
      stroke="#53535B"
      viewBox="0 0 256 256"
      className={"size-5 lg:size-7"}
      {...props}
    >
      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-88,96A48.05,48.05,0,0,1,80,88a8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0A48.05,48.05,0,0,1,128,136Z"></path>
    </svg>
  );
}
