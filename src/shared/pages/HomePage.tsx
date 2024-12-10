import { ProductList } from "@/features/products/components/ProductList.tsx";

export function HomePage() {
  return (
    <section className="flex min-h-screenMinusNavbar w-full flex-col justify-between p-6">
      <ProductList />
    </section>
  );
}
