import { useGetProduct } from "@/modules/products/hooks/useGetProduct";
import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import { Title } from "@/shared/components/typography/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProductDetailsPageParams = {
  productId?: string;
};

export default function ProductDetailsPage() {
  const { productId } = useParams<ProductDetailsPageParams>();
  const { data } = useGetProduct(productId);
  const [product, setProduct] = useState<ProductResponse>();
  useEffect(() => {
    if (!productId) {
      return;
    }

    console.log(product);
  }, []);
  useEffect(() => {
    setProduct(data);
  }, [product]);
  return (
    <div>
      <header>
        <Title>{product?.name}</Title>
      </header>
    </div>
  );
}
