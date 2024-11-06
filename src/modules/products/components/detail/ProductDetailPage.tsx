import { useParams } from "react-router-dom";
import { ProductDetail } from "@products/components/detail/ProductDetail.tsx";

export function ProductDetailPage() {
  const { productId } = useParams();

  if (!productId) return;
  return <ProductDetail productId={productId} />;
}
