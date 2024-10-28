import { useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";

import { SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

import { ControlledSelect } from "@/shared/components/ui/ControlledSelect.tsx";
import { Select } from "@/shared/interfaces/select.interface.ts";
import { Size } from "@sizes/interfaces/responses/size.interface.ts";
import { useInfiniteSizes } from "@/modules/sizes/hooks/useInfiniteSizes.ts";

type SizesSelectProps<T extends FieldValues> = Select<T> & {
  defaultSelected?: Size;
};

export function SizesSelect<T extends FieldValues>({
  control,
  defaultSelected,
  ...rest
}: SizesSelectProps<T>) {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteSizes();

  const [isOpen, setIsOpen] = useState(false);
  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    onLoadMore: fetchNextPage,
    shouldUseLoader: false,
  });

  const sizes = useMemo(() => {
    const flatSizes = data?.pages.map((page) => page.content).flat();

    if (defaultSelected && flatSizes) {
      return [
        defaultSelected,
        ...flatSizes.filter((size) => size.sizeId !== defaultSelected.sizeId),
      ];
    }

    return flatSizes;
  }, [defaultSelected, data]);

  return (
    <ControlledSelect
      control={control}
      isLoading={isLoading}
      items={sizes || []}
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
