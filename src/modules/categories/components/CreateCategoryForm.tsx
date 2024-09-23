import { useForm } from "react-hook-form";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/modules/categories/schemas/create-category.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Button, SelectItem } from "@nextui-org/react";
import { useCreateCategory } from "@/modules/categories/hooks/useCreateCategory.ts";
import { ControlledSelect } from "@/shared/components/ui/ControlledSelect.tsx";
import { useGetCategories } from "@/modules/categories/hooks/useGetCategories.ts";

interface CreateCategoryFormProps {
  onClose: () => void;
}

export function CreateCategoryForm({ onClose }: CreateCategoryFormProps) {
  const { control, handleSubmit } = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
  });
  const { mutateAsync, isPending } = useCreateCategory();
  const { data, isLoading } = useGetCategories({
    pageSize: 99999999,
  });

  async function onSubmit(data: CreateCategorySchemaType) {
    await mutateAsync(data);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField<CreateCategorySchemaType>
        control={control}
        label={"Category name"}
        name={"name"}
        placeholder={"Type the category name"}
      />

      <InputField<CreateCategorySchemaType>
        control={control}
        label={"Category description"}
        name={"description"}
        placeholder={"Type the category description"}
      />

      <ControlledSelect
        control={control}
        isLoading={isLoading}
        items={data?.content || []}
        label={"Super category"}
        name={"superCategoryId"}
        placeholder={"Select a super category"}
      >
        {(category) => {
          return (
            <SelectItem key={category.categoryId}>{category.name}</SelectItem>
          );
        }}
      </ControlledSelect>

      <footer className={"my-4 flex justify-end gap-2"}>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" type={"submit"} isLoading={isPending}>
          Save
        </Button>
      </footer>
    </form>
  );
}
