import { useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";

import { SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

import { ControlledSelect } from "@shared/components/ui/ControlledSelect.tsx";
import { Select } from "@shared/interfaces/select.interface.ts";
import { useInfiniteProducts } from "@/features/products/hooks/useInfiniteProducts.ts";

export function ProductsSelect<T extends FieldValues>({ control, ...rest }: Select<T>) {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteProducts();

  const [isOpen, setIsOpen] = useState(false);
  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    onLoadMore: fetchNextPage,
    shouldUseLoader: false,
  });

  const products = useMemo(() => {
    return data?.pages.map((page) => page.content).flat();
  }, [data]);

  return (
    <ControlledSelect
      control={control}
      isLoading={isLoading}
      items={products || []}
      label={"Product variant"}
      name={"variantOfId"}
      onOpenChange={setIsOpen}
      placeholder={"Select a super category"}
      scrollRef={scrollerRef}
      {...rest}
    >
      {(product) => {
        return <SelectItem key={product.productId}>{product.name}</SelectItem>;
      }}
    </ControlledSelect>
  );
}
