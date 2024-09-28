import { FieldValues } from "react-hook-form";
import { Select } from "@/shared/interfaces/select.interface.ts";
import { useMemo, useState } from "react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { ControlledSelect } from "@/shared/components/ui/ControlledSelect.tsx";
import { SelectItem } from "@nextui-org/react";
import { useInfiniteSizes } from "@/modules/sizes/hooks/useInfiniteSizes.ts";

export function SizesSelect<T extends FieldValues>({
  control,
  ...rest
}: Select<T>) {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteSizes();

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
      {(size) => {
        return <SelectItem key={size.sizeId}>{size.name}</SelectItem>;
      }}
    </ControlledSelect>
  );
}
