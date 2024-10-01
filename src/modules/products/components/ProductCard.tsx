import React from "react";
import { Product } from "../interfaces/product-response.interface";
import { Image } from "@nextui-org/react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const firstImageUrl = product.imagesURLS[0];
  const secondImageUrl = product.imagesURLS[1];

  return (
    <div className="flex h-full w-full flex-grow flex-col rounded-2xl shadow-md">
      <div className={"group h-64 w-full"}>
        <Image
          src={firstImageUrl}
          alt={product.name}
          className={`fadeIn block h-64 w-full rounded-bl-none rounded-br-none object-cover ${secondImageUrl ? "group-hover:hidden" : "group-hover:block"}`}
          classNames={{
            wrapper: "!max-w-full",
          }}
        />

        {secondImageUrl && (
          <Image
            src={secondImageUrl}
            className="fadeIn hidden h-64 w-full animate-drip-expand rounded-bl-none rounded-br-none object-cover group-hover:block"
            classNames={{
              wrapper: "!max-w-full",
            }}
          />
        )}
      </div>

      <div className="flex flex-col p-6">
        <h2 className="text-sm capitalize">{product.name}</h2>
        <h3 className={"text-2xl font-semibold"}>${product.price}</h3>
      </div>
    </div>
  );
};
