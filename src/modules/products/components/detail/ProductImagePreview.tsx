import { Image } from "@nextui-org/react";

interface ProductImagePreviewProps {
  image: string;
  isSelectedImage: boolean;
  setSelectedImage: (src: string) => void;
}

export function ProductImagePreview(props: ProductImagePreviewProps) {
  const { image, isSelectedImage, setSelectedImage } = props;

  return (
    <Image
      onClick={() => setSelectedImage(image)}
      src={image}
      className={
        "size-24 cursor-pointer rounded-none object-cover lg:h-fit lg:w-full"
      }
      classNames={{
        wrapper: "rounded-none",
      }}
      style={{
        opacity: isSelectedImage ? "50%" : "100%",
      }}
      disableSkeleton={true}
    />
  );
}
