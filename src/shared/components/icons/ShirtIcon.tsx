import { ComponentProps } from "react";

type ShirtIconProps = ComponentProps<"svg"> & {
  ellipseClassName?: string;
};

export function ShirtIcon(props: ShirtIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#53535b"
      viewBox="0 0 256 256"
      className={"size-5 lg:size-7"}
      {...props}
    >
      <path d="M247.59,61.22,195.83,33A8,8,0,0,0,192,32H160a8,8,0,0,0-8,8,24,24,0,0,1-48,0,8,8,0,0,0-8-8H64a8,8,0,0,0-3.84,1L8.41,61.22A15.76,15.76,0,0,0,1.82,82.48l19.27,36.81A16.37,16.37,0,0,0,35.67,128H56v80a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V128h20.34a16.37,16.37,0,0,0,14.58-8.71l19.27-36.81A15.76,15.76,0,0,0,247.59,61.22ZM35.67,112a.62.62,0,0,1-.41-.13L16.09,75.26,56,53.48V112Zm185.07-.14a.55.55,0,0,1-.41.14H200V53.48l39.92,21.78Z" />
      <ellipse
        cx="43.82"
        cy="83.46"
        rx="32.865"
        ry="34.162"
        className={props.ellipseClassName || ""}
      ></ellipse>
      <ellipse
        cx="212.757"
        cy="84.18"
        rx="32.865"
        ry="34.162"
        className={props.ellipseClassName || ""}
      ></ellipse>
    </svg>
  );
}
