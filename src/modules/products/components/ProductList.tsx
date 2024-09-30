import React, { useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts.ts";
import { Skeleton } from "@nextui-org/react";
import { ProductCard } from "@products/components/ProductCard.tsx";
import { PaginationControls } from "@/shared/components/ui/PaginationControls.tsx";

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { productResponse, isLoading } = useGetProducts({ page });

  return (
    <>
      <div className="grid h-full auto-cols-fr grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center items-center justify-center gap-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div className={"flex flex-col gap-2"} key={index}>
              <Skeleton className={"h-48 rounded-2xl"} />
              <Skeleton className={"h-24 rounded-2xl"} />
            </div>
          ))}

        {productResponse?.content.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}

        {productResponse?.content.length === 0 && (
          <div className={"flex flex-col items-center justify-center gap-2"}>
            <h2 className={"text-center text-3xl font-semibold"}>
              No products found
            </h2>
          </div>
        )}
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
