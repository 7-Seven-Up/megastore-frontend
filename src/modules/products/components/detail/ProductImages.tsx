import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";

import { ProductImagePreview } from "@products/components/detail/ProductImagePreview.tsx";

interface ProductImagesProps {
  images: string[];
}

export function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string>();

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div
      className={"col-span-12 flex flex-col gap-2 lg:col-span-8 lg:flex-row"}
    >
      {/* Image preview */}
      <div
        className={
          "order-1 flex w-full gap-2 lg:order-none lg:w-48 lg:flex-col"
        }
      >
        {images.map((src) => (
          <ProductImagePreview
            image={src}
            isSelectedImage={selectedImage === src}
            key={src}
            setSelectedImage={setSelectedImage}
          />
        ))}
      </div>

      {/* Fullscreen Image */}
      <div className={"flex-1"}>
        <Image
          src={selectedImage}
          className={"size-full rounded-none object-cover opacity-100"}
          classNames={{
            wrapper: "h-full",
          }}
          disableSkeleton={true}
        />
      </div>
    </div>
  );
}
