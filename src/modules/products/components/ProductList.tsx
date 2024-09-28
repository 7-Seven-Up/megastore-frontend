import React, { useState } from "react";
import { ProductCard } from "./ProductCard.tsx";
import { useGetProducts } from "../hooks/useGetProducts.ts";

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProducts({page});
  const products = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const pageSize = 12; 
  const totalPages = Math.ceil(totalElements / pageSize);



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>ERROR</div>

  return (
    <div className="container mx-auto p-10">
      <h1>Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}>
          ← Previous
        </button>

        <span className="px-4 py-2 text-white font-semibold rounded bg-blue-600">Page: {page}</span>
        
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage(Math.max(page + 1, 1))}
          disabled={page >= totalPages}>
          Next →
        </button>
      </div>
    </div>
  );
};