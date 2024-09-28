import { useMemo, useState } from "react";
import { SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { FieldValues } from "react-hook-form";
import { ControlledSelect } from "@/shared/components/ui/ControlledSelect.tsx";
import { useInfiniteCategories } from "@/modules/categories/hooks/useInfiniteCategories.ts";
import { Select } from "@/shared/interfaces/select.interface.ts";

export function CategoriesSelect<T extends FieldValues>({
  control,
  ...rest
}: Select<T>) {
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

  return (
    <ControlledSelect
      control={control}
      isLoading={isLoading}
      items={categories || []}
      label={"Super category"}
      name={"superCategoryId"}
      onOpenChange={setIsOpen}
      placeholder={"Select a super category"}
      scrollRef={scrollerRef}
      {...rest}
    >
      {(category) => {
        return (
          <SelectItem key={category.categoryId}>{category.name}</SelectItem>
        );
      }}
    </ControlledSelect>
  );
}
