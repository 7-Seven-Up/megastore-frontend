import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Image } from "@nextui-org/react";

import { ProductImagePreview } from "@/features/products/components/detail/ProductImagePreview.tsx";

interface ProductImagesProps {
  images: string[];
}

export function ProductImages({ images }: ProductImagesProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  useEffect(() => {
    const selectedImageParam = searchParams.get("image");

    if (!selectedImageParam) {
      setSelectedImage(images[0]);
      return;
    }

    const imageIndex = parseInt(selectedImageParam);
    const image = images.at(imageIndex) ?? images[0];
    setSelectedImage(image);
  }, [searchParams, images]);

  function handleImageChange(image: string, index: number) {
    setSelectedImage(image);
    setSearchParams({
      image: index.toString(),
    });
  }

  return (
    <div className={"col-span-12 flex flex-col gap-2 lg:col-span-8 lg:flex-row"}>
      {/* Image preview */}
      <div className={"order-1 flex w-full gap-2 lg:order-none lg:w-48 lg:flex-col"}>
        {images.map((src, index) => (
          <ProductImagePreview
            image={src}
            isSelectedImage={selectedImage === src}
            key={src}
            setSelectedImage={(src) => handleImageChange(src, index)}
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
