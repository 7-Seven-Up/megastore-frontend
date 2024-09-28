import { Title } from "@/shared/components/typography/Title.tsx";
import { ProductList } from "@/modules/products/components/ProductList";

export function ProductsPage() {
  return (
    <div className="p-6 w-full">
      <Title>Products Page</Title>
      <ProductList />
      </div>
  );
}
