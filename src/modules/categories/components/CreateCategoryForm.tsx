import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/modules/categories/schemas/create-category.schema.ts";
import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Button, SelectItem } from "@nextui-org/react";
import { useCreateCategory } from "@/modules/categories/hooks/useCreateCategory.ts";
import { ControlledSelect } from "@/shared/components/ui/ControlledSelect.tsx";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useInfiniteCategories } from "@/modules/categories/hooks/useInfiniteCategories.ts";
import { useMemo, useState } from "react";
import { useZodForm } from "@/shared/hooks/useZodForm.ts";

interface CreateCategoryFormProps {
  onClose: () => void;
}

export function CreateCategoryForm({ onClose }: CreateCategoryFormProps) {
  const { control, handleSubmit } = useZodForm(CreateCategorySchema);
  const { createCategory, isCreating } = useCreateCategory();
  const { data, fetchNextPage, isLoading, hasNextPage } =
    useInfiniteCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    onLoadMore: fetchNextPage,
    shouldUseLoader: false,
  });

  const categories = useMemo(() => {
    return data?.pages.map((page) => page.content).flat();
  }, [data]);

  async function onSubmit(data: CreateCategorySchemaType) {
    await createCategory(data);
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
        items={categories || []}
        label={"Super category"}
        name={"superCategoryId"}
        onOpenChange={setIsOpen}
        placeholder={"Select a super category"}
        scrollRef={scrollerRef}
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
        <Button color="primary" type={"submit"} isLoading={isCreating}>
          Save
        </Button>
      </footer>
    </form>
  );
}
