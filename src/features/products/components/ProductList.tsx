import React, { useState } from "react";
import { Skeleton } from "@nextui-org/react";

import { PaginationControls } from "@shared/components/ui/PaginationControls.tsx";
import { ProductCard } from "@/features/products/components/ProductCard.tsx";
import { useGetProducts } from "../hooks/useGetProducts.ts";

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { productResponse, isLoading } = useGetProducts({ page });

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

  return (
    <>
      <div className="grid h-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-center justify-center gap-4">
        {productResponse?.content.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>

      <div className={"mt-6"}>
        {productResponse && productResponse.content.length > 0 && (
          <PaginationControls
            currentPage={page}
            handlePageChange={setPage}
            labelName={"products"}
            paginatedResponse={productResponse}
          />
        )}
      </div>
    </>
  );
};
