import { ComponentProps } from "react";

type HoodieIconProps = ComponentProps<"svg">;

export function HoodieIcon(props: HoodieIconProps) {
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
      <path d="M237.31,120.53,183,39.12A16,16,0,0,0,169.73,32H86.27A16,16,0,0,0,73,39.12L18.69,120.53a16,16,0,0,0-2.13,13.09L38,212.21A16,16,0,0,0,53.43,224H80a16,16,0,0,0,16-16V192h64v16a16,16,0,0,0,16,16h26.57A16,16,0,0,0,218,212.21l21.44-78.59A16,16,0,0,0,237.31,120.53ZM80,208H53.43L32,129.41l32-48V176a16,16,0,0,0,16,16Zm40-72a8,8,0,0,1-16,0V97.14a8,8,0,1,1,16,0Zm32-8a8,8,0,0,1-16,0V97.14a8,8,0,1,1,16,0ZM128,78.71,83.35,52.39,86.27,48h83.46l2.92,4.39ZM202.57,208H176V192a16,16,0,0,0,16-16V81.41l32,48Z" />
      <rect
        x="47.587"
        y="81.136"
        width="36.051"
        height="133.712"
        style={{
          fill: "rgb(83, 83, 91)",
          stroke: "rgb(83, 83, 91)",
        }}
        transform="matrix(0.999594, -0.02848, 0, 1.000406, 0, 1.868666)"
      />
      <rect
        x="47.587"
        y="81.136"
        width="36.051"
        height="133.712"
        style={{
          fill: "rgb(83, 83, 91)",
          stroke: "rgb(83, 83, 91)",
        }}
        transform="matrix(0.999594, -0.02848, 0, 1.000406, 124.107826, -1.014275)"
      />
      <rect
        x="32.576"
        y="102.503"
        width="25.658"
        height="85.333"
        style={{
          fill: "rgb(83, 83, 91)",
          stroke: "rgb(83, 83, 91)",
        }}
      />
      <rect
        x="197.91"
        y="102.214"
        width="25.658"
        height="85.333"
        style={{
          fill: "rgb(83, 83, 91)",
          stroke: "rgb(83, 83, 91)",
        }}
      />
      );
    </svg>
  );
}
