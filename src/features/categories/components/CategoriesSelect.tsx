import { useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";

import { SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

import { Category } from "@/features/categories/interfaces/responses/category.interface.ts";
import { ControlledSelect } from "@shared/components/ui/ControlledSelect.tsx";
import { Select } from "@shared/interfaces/select.interface.ts";
import { useInfiniteCategories } from "@/features/categories/hooks/useInfiniteCategories.ts";

type CategoriesSelectProps<T extends FieldValues> = Select<T> & {
  defaultSelected?: Category;
  label?: string;
  name?: string;
};

export function CategoriesSelect<T extends FieldValues>({
  control,
  defaultSelected,
  label,
  name,
  placeholder,
  ...rest
}: CategoriesSelectProps<T>) {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    onLoadMore: fetchNextPage,
    shouldUseLoader: false,
  });

  const categories = useMemo(() => {
    const flatCategories = data?.pages.map((page) => page.content).flat();

    if (defaultSelected && flatCategories) {
      return [
        {
          categoryId: defaultSelected.categoryId,
          name: defaultSelected.name,
        },
        ...flatCategories.filter((item) => item.categoryId !== defaultSelected.categoryId),
      ];
    }

    return flatCategories;
  }, [defaultSelected, data]);

  return (
    <ControlledSelect
      control={control}
      isLoading={isLoading}
      items={categories || []}
      label={label || "Super category"}
      name={name || "superCategoryId"}
      onOpenChange={setIsOpen}
      placeholder={placeholder || "Select a super category"}
      scrollRef={scrollerRef}
      {...rest}
    >
      {(category) => {
        return <SelectItem key={category.categoryId}>{category.name}</SelectItem>;
      }}
    </ControlledSelect>
  );
}
