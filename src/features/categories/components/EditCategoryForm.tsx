import { Category } from "@/features/categories/interfaces/responses/category.interface.ts";
import {
  UpdateCategorySchema,
  UpdateCategorySchemaType,
} from "@/features/categories/schemas/update-category.schema.ts";
import { InputField } from "@shared/components/ui/InputField.tsx";
import { Button, SelectItem } from "@nextui-org/react";
import { ControlledSelect } from "@shared/components/ui/ControlledSelect.tsx";
import { useUpdateCategory } from "@/features/categories/hooks/useUpdateCategory.ts";
import { useMemo, useState } from "react";
import { useInfiniteCategories } from "@/features/categories/hooks/useInfiniteCategories.ts";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useZodForm } from "@shared/hooks/useZodForm.ts";

interface EditCategoryFormProps {
  category: Category;
  onClose: () => void;
}

export function EditCategoryForm({ onClose, category }: EditCategoryFormProps) {
  const { control, handleSubmit } = useZodForm(UpdateCategorySchema, {
    defaultValues: {
      name: category.name,
      description: category.description || undefined,
    },
  });
  const { updateCategory, isUpdating } = useUpdateCategory();
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage,
  });

  async function onSubmit(data: UpdateCategorySchemaType) {
    await updateCategory({
      categoryId: category.categoryId,
      ...data,
    });

    onClose();
  }

  const flatCategories = useMemo(() => {
    return data?.pages.map((page) => page.content).flat();
  }, [data]);

  // Returns a new array of categories with the super category at the beginning
  const categories = useMemo(() => {
    if (!flatCategories || !category) return [];
    if (!category.superCategoryId) return flatCategories;

    return [
      {
        categoryId: category.superCategoryId,
        name: category.superCategoryName,
      },
      ...flatCategories.filter(
        (item) =>
          item.categoryId !== category.superCategoryId && item.categoryId !== category.categoryId,
      ),
    ];
  }, [flatCategories, category]);

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

      <ControlledSelect
        control={control}
        defaultSelectedKeys={[category.superCategoryId || ""]}
        isLoading={isLoading}
        items={categories}
        label={"Super category"}
        name={"superCategoryId"}
        onOpenChange={setIsOpen}
        placeholder={"Select a super category"}
        scrollRef={scrollerRef}
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
