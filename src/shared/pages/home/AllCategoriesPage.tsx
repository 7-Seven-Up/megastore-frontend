import { useState } from "react";

import { ProductList } from "@/features/products/components/ProductList.tsx";
import { useGetProducts } from "@/features/products/hooks/useGetProducts.ts";

export function AllCategoriesPage() {
  const [page, setPage] = useState(1);
  const { productResponse, isLoading } = useGetProducts({ page });

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
