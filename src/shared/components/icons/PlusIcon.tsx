import { ComponentProps } from "react";

type PlusIconProps = ComponentProps<"svg">;
export function PlusIcon(props: PlusIconProps) {
  return (
    <svg
      fill="#000000"
      height="32"
      viewBox="0 0 256 256"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
}
