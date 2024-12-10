import { Title } from "@/shared/components/typography/Title.tsx";
import { ProductList } from "@/features/products/components/ProductList";

export function ProductsPage() {
  return (
    <div className="w-full p-6">
      <Title>Products Page</Title>
      <ProductList />
    </div>
  );
}
