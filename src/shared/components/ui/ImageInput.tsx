import { ChangeEvent, ComponentProps, useRef, useState } from "react";
import { Button, Image } from "@nextui-org/react";
import RenderIf from "@/shared/components/RenderIf.tsx";

interface ImageInputProps extends ComponentProps<"div"> {
  onImageSelect: (file: File[]) => void;
}

type SelectedImage = {
  file: File;
  previewURL: string;
};

export function ImageInput({ onImageSelect, ...rest }: ImageInputProps) {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    if (!target.files || target.files.length === 0) return;

    // Only allow up to 8 images
    const targetFiles = Array.from(target.files).slice(0, 8);
    const selectedFiles = targetFiles.map((file) => {
      return {
        file,
        previewURL: URL.createObjectURL(file),
      };
    });

    setSelectedImages(selectedFiles);
    onImageSelect(selectedFiles.map((file) => file.file));
  }

  function handleOnClick() {
    inputRef.current?.click();
  }

  function handleOnDelete(index: number) {
    const newImages = selectedImages?.filter((_, i) => i !== index);
    setSelectedImages(newImages);
  }

  return (
    <div {...rest}>
      <section
        className={
          "grid grid-cols-12 items-center justify-between gap-4 rounded-lg bg-default-100 p-4"
        }
      >
        <RenderIf condition={selectedImages.length === 0}>
          <div
            className={
              "col-span-12 flex items-center justify-center lg:col-span-8 lg:justify-start lg:py-2"
            }
          >
            <span className={"text-sm font-normal text-foreground-500"}>
              There are no images selected.
            </span>
          </div>
        </RenderIf>

        <RenderIf condition={selectedImages.length > 0}>
          <div className="col-span-12 flex flex-wrap gap-2 lg:col-span-8">
            {selectedImages.map((image, index) => {
              const { previewURL } = image;

              return (
                <div className={"group relative size-24 grow"} key={previewURL}>
                  <Image
                    className={"size-full object-cover"}
                    disableSkeleton
                    src={previewURL}
                  />

                  <div
                    className={
                      "absolute inset-0 z-20 flex items-end justify-center rounded-xl bg-black/40 py-2 opacity-0 transition-all duration-75 ease-linear group-hover:opacity-100"
                    }
                  >
                    <Button
                      color={"danger"}
                      isIconOnly
                      onPress={() => handleOnDelete(index)}
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

        <Button
          className={"col-span-12 lg:col-span-4 lg:h-full min-h-1"}
          color={"secondary"}
          onPress={handleOnClick}
        >
          Select images
        </Button>
      </section>

      <input
        accept={"image/jpg, image/jpeg, image/png"}
        className={"hidden"}
        multiple={true}
        onChange={handleOnChange}
        placeholder={"Select files"}
        ref={inputRef}
        type={"file"}
      />
    </div>
  );
}
