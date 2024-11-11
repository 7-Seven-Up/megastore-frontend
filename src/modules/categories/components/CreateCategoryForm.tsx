import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/modules/categories/schemas/create-category.schema.ts";
import { CategoriesSelect } from "@/modules/categories/components/CategoriesSelect.tsx";
import { FormFooter } from "@/shared/components/ui/FormFooter.tsx";
import { InputField } from "@/shared/components/ui/InputField.tsx";
import { useCreateCategory } from "@/modules/categories/hooks/useCreateCategory.ts";
import { useZodForm } from "@/shared/hooks/useZodForm.ts";

interface CreateCategoryFormProps {
  onClose: () => void;
}

export function CreateCategoryForm({ onClose }: CreateCategoryFormProps) {
  const { control, handleSubmit } = useZodForm(CreateCategorySchema);
  const { createCategory, isCreating } = useCreateCategory();

  async function onSubmit(data: CreateCategorySchemaType) {
    await createCategory(data);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField
        control={control}
        label={"Category name"}
        name={"name"}
        placeholder={"Type the category name"}
        data-cy={"category-name"}
      />

      <InputField
        control={control}
        label={"Category description"}
        name={"description"}
        placeholder={"Type the category description"}
        data-cy={"category-description"}
      />

      <CategoriesSelect
        control={control}
        label={"Super category"}
        name={"superCategoryId"}
        placeholder={"Select a super category"}
      />

      <FormFooter onClose={onClose} isLoading={isCreating} />
    </form>
  );
}
