import { Button, Textarea } from "@nextui-org/react";

import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";
import {
  UpdateProductSchema,
  UpdateProductSchemaType,
} from "@/features/products/schemas/update-product.schema.ts";
import { useUpdateProduct } from "@/features/products/hooks/useUpdateProduct.ts";
import { useZodForm } from "@shared/hooks/useZodForm.ts";
import { InputField } from "@shared/components/ui/InputField.tsx";
import { Controller } from "react-hook-form";
import { ProductsSelect } from "@/features/products/components/ProductsSelect.tsx";
import { CategoriesSelect } from "@/features/categories/components/CategoriesSelect.tsx";
import { ImageInput } from "@shared/components/ui/ImageInput.tsx";
import { useEffect, useRef, useState } from "react";
import { convertUrlsToFiles } from "@shared/utils/convertUrlsToFiles.ts";

interface EditProductFormProps {
  onClose: () => void;
  product: Product;
}

export function EditProductForm({ onClose, product }: EditProductFormProps) {
  const { control, handleSubmit } = useZodForm(UpdateProductSchema, {
    defaultValues: {
      ...product,
      variantOfId: product.variantOfId || "",
    },
  });
  const { updateProduct, isUpdating } = useUpdateProduct();
  const [productImages, setProductImages] = useState<File[]>([]);
  const initialImages = useRef<File[]>([]);

  async function onSubmit(data: UpdateProductSchemaType) {
    const hasImagesChanged = productImages !== initialImages.current;

    await updateProduct({
      multipartFiles: hasImagesChanged ? productImages : undefined,
      productId: product.productId,
      updateProductRequest: data,
    });

    onClose();
  }

  useEffect(() => {
    async function createFilesFromUrls() {
      const files = await convertUrlsToFiles(product.imagesURLS);
      setProductImages(files);
      initialImages.current = files;
    }

    createFilesFromUrls().then();
  }, [product.imagesURLS]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField
        control={control}
        label={"Product name"}
        name={"name"}
        placeholder={"Type the product name"}
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

      <InputField
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
        control={control}
        defaultSelectedKeys={[product.categoryId || ""]}
        label={"Product category"}
        name={"categoryId"}
      />

      <ProductsSelect
        className={"col-span-12"}
        control={control}
        placeholder={"Select a product variation"}
        defaultSelectedKeys={[product.variantOfId || ""]}
      />

      <ImageInput
        onImageSelect={setProductImages}
        control={control}
        name={"variantOfId"}
        defaultValue={product.imagesURLS}
      />

      <footer className={"my-4 flex justify-end gap-2"}>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" type={"submit"} isLoading={isUpdating}>
          Save
        </Button>
      </footer>
    </form>
  );
}
