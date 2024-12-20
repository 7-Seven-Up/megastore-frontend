import { Avatar, AvatarGroup } from "@nextui-org/react";

import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";

interface ProductOrderPreviewProps {
  products: Product[];
}

export function ProductOrderPreview({ products }: ProductOrderPreviewProps) {
  return (
    <AvatarGroup max={5} total={products.length - 5}>
      {products.map((product, index) => (
        <Avatar key={product.productId + index} src={product.imagesURLS[0]} />
      ))}
    </AvatarGroup>
  );
}
