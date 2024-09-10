import { Image } from "@nextui-org/react";

interface LogoProps {
  width?: number | string;
  height?: number | string;
}

export default function Logo(props: LogoProps) {
  const { width, height } = props;
  return <Image src={"/logo.png"} width={width} height={height} />;
}
