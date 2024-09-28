import { Button, Textarea } from "@nextui-org/react";
import { ChangeEvent, ComponentProps, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ImageInputPreview } from "@/shared/components/ui/ImageInputPreview.tsx";

type ImageInputProps<T extends FieldValues> = ComponentProps<"div"> & {
  onImageSelect: (file: File[]) => void;
  control: Control<T>;
  name: Path<T>;
};

export type SelectedImage = {
  file: File;
  previewURL: string;
};

export function ImageInput<T extends FieldValues>(props: ImageInputProps<T>) {
  const { onImageSelect, name, control, ...rest } = props;
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
    handleOnImageSelect(selectedFiles);
  }

  function handleOnClick() {
    inputRef.current?.click();
  }

  function handleOnDelete(index: number) {
    const newImages = selectedImages?.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    handleOnImageSelect(newImages);
  }

  function handleOnImageSelect(images: SelectedImage[]) {
    onImageSelect(images.map((image) => image.file));
  }

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
                  <ImageInputPreview
                    onDelete={handleOnDelete}
                    selectedImages={selectedImages}
                  />

                  <Button
                    className={"col-span-12 min-h-10 lg:h-full"}
                    color={"secondary"}
                    onPress={handleOnClick}
                  >
                    Select images
                  </Button>

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
