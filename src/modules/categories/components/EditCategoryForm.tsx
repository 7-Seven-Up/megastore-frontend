import { Category } from "@/modules/categories/interfaces/responses/category.interface.ts";
import { useForm } from "react-hook-form";
import {
  UpdateCategorySchema,
  UpdateCategorySchemaType,
} from "@/modules/categories/schemas/update-category.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Button, SelectItem } from "@nextui-org/react";
import { useGetCategories } from "@/modules/categories/hooks/useGetCategories.ts";
import { ControlledSelect } from "@/shared/components/ui/ControlledSelect.tsx";
import { useUpdateCategory } from "@/modules/categories/hooks/useUpdateCategory.ts";

interface EditCategoryFormProps {
  category: Category;
  onClose: () => void;
}

export function EditCategoryForm({ onClose, category }: EditCategoryFormProps) {
  const { control, handleSubmit } = useForm<UpdateCategorySchemaType>({
    resolver: zodResolver(UpdateCategorySchema),
  });
  const { data, isLoading } = useGetCategories({
    pageSize: 99999999,
  });
  const { updateCategory, isUpdating } = useUpdateCategory();

  async function onSubmit(data: UpdateCategorySchemaType) {
    if (data.superCategoryId === "") {
      data.superCategoryId = null;
    }

    await updateCategory({
      categoryId: category.categoryId,
      ...data,
    });

    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField<UpdateCategorySchemaType>
        control={control}
        defaultValue={category.name}
        label={"Category name"}
        name={"name"}
        placeholder={"Type the category name"}
      />

      <InputField<UpdateCategorySchemaType>
        control={control}
        defaultValue={category.description}
        label={"Category description"}
        name={"description"}
        placeholder={"Type the category description"}
      />

      <ControlledSelect
        control={control}
        defaultSelectedKeys={[category.superCategoryId || ""]}
        isLoading={isLoading}
        items={data?.content || []}
        label={"Super category"}
        name={"superCategoryId"}
        placeholder={"Select a super category"}
        defaultValue={<SelectItem key={"default"}>Hola</SelectItem>}
      >
        {(item) => {
          return <SelectItem key={item.categoryId}>{item.name}</SelectItem>;
        }}
      </ControlledSelect>

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
