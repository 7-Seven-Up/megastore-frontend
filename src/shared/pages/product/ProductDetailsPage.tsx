import { useGetProduct } from "@/modules/products/hooks/useGetProduct";
import { Title } from "@/shared/components/typography/Title";
import { useParams } from "react-router-dom";

type ProductDetailsPageParams = {
  productId?: string;
};

export default function ProductDetailsPage() {
  const { productId } = useParams<ProductDetailsPageParams>();
  console.log("Datos del producto:", productId);
  const { data, isLoading, isError } = useGetProduct(productId);
  console.log("Datos del producto:", data);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (isError) {
    return <div>Error al cargar el producto.</div>; // Maneja el error
  }

  return (
    <div>
      <header>
        <Title>{data?.name || "producto no encontrado"}</Title>
      </header>
      <div>
        <p>Description: {data?.description || ""} Size: {data?.sizeName || ""}{" "}
        </p>
        <p>{data?.price}</p>
        <p>{data?.imagesURLS}</p>
        <p>Stock: {data?.stock}</p>
      </div>
    </div>
  );
}
