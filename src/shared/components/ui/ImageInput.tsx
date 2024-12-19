import { Button, Textarea } from "@nextui-org/react";
import { ChangeEvent, ComponentProps, useCallback, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ImageInputPreview } from "@/shared/components/ui/ImageInputPreview.tsx";
import { convertUrlsToFiles } from "@shared/utils/convertUrlsToFiles.ts";

type ImageInputProps<T extends FieldValues> = ComponentProps<"div"> & {
  onImageSelect: (file: File[]) => void;
  control: Control<T>;
  name: Path<T>;
  defaultValue?: string[];
};

export type SelectedImage = {
  file: File;
  previewURL: string;
};

export function ImageInput<T extends FieldValues>(props: ImageInputProps<T>) {
  const { onImageSelect, name, control, defaultValue, ...rest } = props;
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

    setSelectedImages((prev) => prev.concat(selectedFiles));
    handleOnImageSelect(selectedImages.concat(selectedFiles));
  }

  function handleOnClick() {
    inputRef.current?.click();
  }

  function handleOnDelete(index: number) {
    const newImages = selectedImages?.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    handleOnImageSelect(newImages);
  }

  const handleOnImageSelect = useCallback(
    (images: SelectedImage[]) => {
      onImageSelect(images.map((image) => image.file));
    },
    [onImageSelect],
  );

  useEffect(() => {
    if (!defaultValue) return;

    async function createFiles() {
      const files = await convertUrlsToFiles(defaultValue!);

      const selectedImages = files.map((file) => {
        return {
          file,
          previewURL: URL.createObjectURL(file),
        };
      });

      setSelectedImages(selectedImages);
      handleOnImageSelect(selectedImages);
    }

    createFiles().then();
  }, [defaultValue, handleOnImageSelect]);

  return (
    <div {...rest}>
      <Controller
        name={name}
        control={control}
        render={({ fieldState, field }) => {
          return (
            <Textarea
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              label={"Product images"}
              classNames={{
                input: "hidden",
                inputWrapper: "!cursor-auto hover:!bg-default-100",
              }}
              startContent={
                <div className={"grid w-full grid-cols-12"}>
                  <ImageInputPreview onDelete={handleOnDelete} selectedImages={selectedImages} />

                  <Button
                    className={"col-span-12 min-h-10 lg:h-full"}
                    color={"secondary"}
                    onPress={handleOnClick}
                  >
                    Select images
                  </Button>

                  <input
                    accept={"image/jpg, image/jpeg, image/png, image/webp"}
                    className={"hidden"}
                    multiple={true}
                    onChange={handleOnChange}
                    placeholder={"Select files"}
                    ref={inputRef}
                    type={"file"}
                  />
                </div>
              }
              className={"w-full"}
              {...field}
            />
          );
        }}
      />
    </div>
  );
}
