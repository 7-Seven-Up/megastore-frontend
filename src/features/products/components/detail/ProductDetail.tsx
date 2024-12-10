import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FullscreenLoading } from "@shared/components/ui/FullscreenLoading.tsx";
import { ProductActions } from "@/features/products/components/detail/ProductActions.tsx";
import { ProductImages } from "@/features/products/components/detail/ProductImages.tsx";
import { ProductMetadata } from "@/features/products/components/detail/ProductMetadata.tsx";
import { useGetProductDetail } from "@/features/products/hooks/useGetProductDetail.ts";

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const navigate = useNavigate();
  const { product, isError, isLoading } = useGetProductDetail(productId);

  useEffect(() => {
    if (!isError) return;
    navigate("/not-found", { replace: true });
  }, [navigate, isError]);

  if (isLoading) {
    return <FullscreenLoading />;
  }

  return (
    <section className={"grid min-h-screen w-full grid-cols-12 gap-6 p-6"}>
      {product && (
        <>
          <ProductImages images={product.imagesURLS} />

          <div
            className={
              "sticky top-32 col-span-12 flex flex-col gap-6 lg:col-span-4 lg:h-[calc(100dvh-90px-4rem)]"
            }
          >
            <ProductMetadata product={product} />
            <ProductActions product={product} />
          </div>
        </>
      )}
    </section>
  );
}
