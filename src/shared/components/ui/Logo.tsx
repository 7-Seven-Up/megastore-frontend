import { Image } from "@nextui-org/react";

interface LogoProps {
  width?: number | string;
  height?: number | string;
}

export function Logo(props: LogoProps) {
  const { width, height } = props;
  return (
    <Image disableSkeleton height={height} src={"/logo.png"} width={width} />
  );
}
