import React from "react";
import { Product } from "../interfaces/product-response.interface";
import { Image } from "@nextui-org/react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const firstImageUrl = product.imagesURLS?.[0];

  return (
    <div className="flex h-full w-full flex-grow flex-col rounded-2xl shadow-md">
      <Image
        src={firstImageUrl}
        alt={product.name}
        className="mb-auto h-52 w-full rounded-bl-none rounded-br-none object-cover"
        classNames={{
          wrapper: "!max-w-full",
        }}
      />

      <div className="flex flex-col gap-2 p-6">
        <div className={"flex flex-col"}>
          <h2 className="font-medium capitalize">{product.name}</h2>
          <h2 className={"line-clamp-1 text-foreground-500"}>
            {product.description ?? (
              <i className="text-gray-500">{"<No description>"}</i>
            )}
          </h2>
        </div>
        <h3 className={"text-2xl font-semibold"}>${product.price}</h3>
      </div>
    </div>
  );
};
