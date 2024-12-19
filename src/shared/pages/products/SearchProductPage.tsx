import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { ProductList } from "@/features/products/components/ProductList.tsx";
import { useGetProducts } from "@/features/products/hooks/useGetProducts.ts";
import { Skeleton } from "@nextui-org/react";

export function SearchProductPage() {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const { productResponse, isLoading } = useGetProducts({ page: 1, pageSize: 10 }, name || "");

  if (!name) {
    return <Navigate to={"/"} />;
  }

  if (isLoading) {
    return (
      <div className={"grid grid-cols-12 items-center justify-center gap-4"}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className={"col-span-3 flex flex-col gap-2"} key={index}>
            <Skeleton className={"h-48 rounded-2xl"} />
            <Skeleton className={"h-24 rounded-2xl"} />
          </div>
        ))}
      </div>
    );
  }

  if (!productResponse?.content.length) {
    return <div>No products found</div>;
  }

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
