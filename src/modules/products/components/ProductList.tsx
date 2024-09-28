import React, { useState } from "react";
import { ProductCard } from "./ProductCard.tsx";
import { useGetProducts } from "../hooks/useGetProducts.ts";

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProducts({page});
  const products = data?.content ?? [];
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>ERROR</div>

  return (
    <div>
      <h1>Product List</h1>
      <div className="gap-5 grid justify-center place-content-center items-center auto-cols-fr"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridAutoRows: "22rem"
      }}
      >
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
          disabled={page === 1}>
          Next →
        </button>
      </div>
    </div>
  );
};