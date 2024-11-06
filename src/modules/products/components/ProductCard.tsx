import React from "react";
import { Product } from "../interfaces/responses/product-response.interface.ts";
import { Image, Link } from "@nextui-org/react";
import { currencyFormatter } from "@/shared/utils/currencyFormatter.ts";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const firstImageUrl = product.imagesURLS[0];
  const secondImageUrl = product.imagesURLS[1];

  return (
    <Link
      className="flex h-full w-full flex-grow flex-col rounded-2xl text-black shadow-md"
      href={`/products/${product.productId}`}
    >
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
            className="fadeIn hidden h-64 w-full rounded-bl-none rounded-br-none object-cover group-hover:block"
            classNames={{
              wrapper: "!max-w-full",
            }}
          />
        )}
      </div>

      <div className="flex w-full flex-col p-6">
        <h2 className="text-sm capitalize">{product.name}</h2>
        <h3 className={"text-2xl font-semibold"}>
          {currencyFormatter(product.price, "es-AR", "ARS")}
        </h3>
      </div>
    </Link>
  );
};
