import RenderIf from "@/shared/components/RenderIf.tsx";
import { Button, Image } from "@nextui-org/react";
import { SelectedImage } from "@/shared/components/ui/ImageInput.tsx";

interface ImageInputPreviewProps {
  selectedImages: SelectedImage[];
  onDelete: (index: number) => void;
}

export function ImageInputPreview({
  selectedImages,
  onDelete,
}: ImageInputPreviewProps) {
  return (
    <RenderIf condition={selectedImages.length > 0}>
      <div className="col-span-12 mb-2 flex flex-wrap gap-2">
        {selectedImages.map((image, index) => {
          const { previewURL } = image;

          return (
            <div className={"relative size-24 grow"} key={previewURL}>
              <Image
                className={"size-full object-cover"}
                disableSkeleton
                src={previewURL}
              />

              <div
                className={
                  "absolute inset-0 z-20 flex items-end justify-center rounded-xl bg-black/40 py-2 opacity-0 transition-all duration-75 ease-linear hover:opacity-100"
                }
              >
                <Button
                  color={"danger"}
                  isIconOnly
                  onPress={() => onDelete(index)}
                  size={"sm"}
                >
                  X
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </RenderIf>
  );
}
