import { Image, Link } from "@nextui-org/react";

import { Product } from "@products/interfaces/responses/product-response.interface.ts";
import { ProductColor } from "@products/components/detail/ProductColor.tsx";
import { ProductSize } from "@products/components/detail/ProductSize.tsx";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@shared/components/typography/Title.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { useGetProductDetail } from "@products/hooks/useGetProductDetail.ts";
import { useGetProductVariants } from "@products/hooks/useGetProductVariants.ts";

interface ProductMetadataProps {
  product: Product;
}

export function ProductMetadata({ product }: ProductMetadataProps) {
  const { productVariants } = useGetProductVariants(
    product.variantOfId ?? product.productId,
  );

  const { product: superProduct } = useGetProductDetail(
    product.variantOfId ?? product.productId,
  );

  return (
    <>
      <header className={"flex flex-col gap-2"}>
        <Title>{product.name}</Title>
        <Subtitle>{currencyFormatter(product.price, "es-AR", "ARS")}</Subtitle>

        <div className={"mt-2 flex gap-2"}>
          <Link href={`/products/${superProduct?.productId}`}>
            <Image
              disableSkeleton={true}
              className={"size-16 object-cover"}
              src={superProduct?.imagesURLS[0]}
              style={{
                opacity:
                  product.productId === superProduct?.productId ? 0.5 : 1,
              }}
            />
          </Link>
          {productVariants?.map((variant) => {
            return (
              <Link
                href={`/products/${variant.productId}`}
                key={variant.productId}
              >
                <Image
                  disableSkeleton={true}
                  className={"size-16 rounded-md object-cover"}
                  src={variant.imagesURLS[0]}
                  style={{
                    opacity: variant.productId === product.productId ? 0.5 : 1,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </header>

      <div className={"flex items-center gap-2"}>
        <span className={"pr-3 text-tiny font-bold uppercase text-secondary"}>
          Color y talle
        </span>
        <ProductColor color={product.color} />
        <ProductSize size={product.sizeName} />
      </div>

      <p>{product.description}</p>
    </>
  );
}
