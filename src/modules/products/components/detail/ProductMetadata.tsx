import { Image, Link } from "@nextui-org/react";

import { Product } from "@products/interfaces/responses/product-response.interface.ts";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@shared/components/typography/Title.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { useGetProductVariants } from "@products/hooks/useGetProductVariants.ts";

interface ProductMetadataProps {
  product: Product;
}

export function ProductMetadata({ product }: ProductMetadataProps) {
  const { productVariants } = useGetProductVariants(product.productId);

  return (
    <>
      <header className={"flex flex-col gap-2"}>
        <Title>{product.name}</Title>
        <Subtitle>{currencyFormatter(product.price, "es-AR", "ARS")}</Subtitle>

        <div className={"mt-2 flex gap-2"}>
          <Link
            className={"opacity-50"}
            href={`/products/${product.productId}`}
          >
            <Image
              src={product.imagesURLS[0]}
              className={"size-16 object-cover"}
            />
          </Link>
          {productVariants?.map((variant) => {
            return (
              <Link
                href={`/products/${variant.productId}`}
                key={variant.productId}
              >
                <Image
                  className={"size-16 rounded-md object-cover"}
                  src={variant.imagesURLS[0]}
                />
              </Link>
            );
          })}
        </div>
      </header>
      <p>{product.description}</p>
    </>
  );
}
