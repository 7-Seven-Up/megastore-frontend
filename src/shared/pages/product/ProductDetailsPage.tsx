import { useGetProduct } from "@/modules/products/hooks/useGetProduct";
import { Image } from "@nextui-org/react";
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

  const imagesURLS = data?.imagesURLS;
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="grid min-h-screen grid-cols-12 gap-4">
      <div className="col-span-8 bg-red-500">
        {data?.imagesURLS.map((image) => {
          return <Image src={image} width={100} height={200} />;
        })}
      </div>
      <div className="col-span-4 bg-blue-500"></div>
    </div>
  );
}
