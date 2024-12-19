import { useState } from "react";

import { AVAILABLE_CATEGORIES } from "@/features/categories/constants.ts";
import { ProductList } from "@/features/products/components/ProductList.tsx";
import { useGetProductByCategory } from "@/features/products/hooks/useGetProductByCategory.ts";

export function PantsPage() {
  const [page, setPage] = useState(1);
  const { productResponse, isLoading } = useGetProductByCategory(
    { page },
    AVAILABLE_CATEGORIES.PANTS,
  );

  return (
    <section className={"flex min-h-screenMinusNavbar w-full flex-col justify-between p-6"}>
      <ProductList
        isLoading={isLoading}
        onPageChange={setPage}
        page={page}
        productResponse={productResponse}
      />
    </section>
  );
}
