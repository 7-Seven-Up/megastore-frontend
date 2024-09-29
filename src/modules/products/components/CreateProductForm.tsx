import { useZodForm } from "@/shared/hooks/useZodForm.ts";
import {
  CreateProductSchema,
  CreateProductSchemaType,
} from "@products/schemas/create-product.schema.ts";
import { CategoriesSelect } from "@/modules/categories/components/CategoriesSelect.tsx";
import { Controller } from "react-hook-form";
import { FormFooter } from "@/shared/components/ui/FormFooter.tsx";
import { ImageInput } from "@/shared/components/ui/ImageInput.tsx";
import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Textarea } from "@nextui-org/react";
import { useCreateProduct } from "@products/hooks/useCreateProduct.ts";
import { SizesSelect } from "@/modules/sizes/components/SizesSelect.tsx";
import { ProductsSelect } from "@products/components/ProductsSelect.tsx";

interface CreateProductFormProps {
  onClose: () => void;
}

export function CreateProductForm({ onClose }: CreateProductFormProps) {
  const { control, handleSubmit, setValue } = useZodForm(CreateProductSchema);
  const { createProduct, isCreating } = useCreateProduct();

  async function onSubmit(data: CreateProductSchemaType) {
    const { images, ...dataWithoutImages } = data;

    await createProduct({
      createProductRequest: dataWithoutImages,
      multipartFiles: images,
    });

    onClose();
  }

  function handleOnImageSelect(images: File[]) {
    setValue("images", images, { shouldValidate: true });
  }

  return (
    <form
      className={"grid grid-cols-12 gap-2"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField<CreateProductSchemaType>
        className={"col-span-12 lg:col-span-10"}
        control={control}
        label={"Product name"}
        name={"name"}
        placeholder={"Type the product name"}
      />

      <InputField<CreateProductSchemaType>
        className={"col-span-12 flex lg:col-span-2"}
        classNames={{
          label: "mb-2",
          innerWrapper: "mt-4",
          input: "w-full rounded-full border-none",
        }}
        control={control}
        label={"Product color"}
        name={"color"}
        type={"color"}
        defaultValue={"#000000"}
      />

      <Controller
        name={"description"}
        control={control}
        render={({ fieldState, formState, field }) => {
          return (
            <Textarea
              className={"col-span-12"}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              label={"Product description"}
              placeholder={"Type the product description"}
              maxLength={80}
              {...field}
              {...formState}
            />
          );
        }}
      />

      <InputField<CreateProductSchemaType>
        className={"col-span-12 lg:col-span-6"}
        control={control}
        label={"Product stock"}
        name={"stock"}
        placeholder={"Type the product stock"}
        type={"number"}
      />

      <InputField<CreateProductSchemaType>
        className={"col-span-12 lg:col-span-6"}
        control={control}
        label={"Product price"}
        name={"price"}
        placeholder={"Type the product price"}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400">$</span>
          </div>
        }
        type={"number"}
      />

      <CategoriesSelect
        className={"col-span-12 lg:col-span-6"}
        control={control}
        label={"Product category"}
        name={"categoryId"}
        placeholder={"Select a category"}
      />

      <SizesSelect
        className={"col-span-12 lg:col-span-6"}
        control={control}
        label={"Product size"}
        name={"sizeId"}
        placeholder={"Select a size"}
      />

      <ProductsSelect
        control={control}
        className={"col-span-12"}
        placeholder={"Select a product variation"}
      />

      <ImageInput
        className={"col-span-12"}
        control={control}
        name={"images"}
        onImageSelect={handleOnImageSelect}
      />

      <FormFooter
        className={"col-span-12"}
        isLoading={isCreating}
        onClose={onClose}
      />
    </form>
  );
}
