import { CheckoutSummary } from "@shared/pages/cart/CheckoutSummary.tsx";
import { ProductsCardContainer } from "@/features/products/components/ProductsCardContainer.tsx";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@shared/components/typography/Title.tsx";
import { useCartStore } from "@/features/cart/hooks/useCartStore.ts";

export function CheckoutPage() {
  const getTotal = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <section
        className={
          "flex h-full min-h-screenMinusNavbar w-full flex-col items-center justify-center gap-4 p-6"
        }
      >
        <Title>Products</Title>
        <Subtitle>There are no products in the cart</Subtitle>
      </section>
    );
  }

  return (
    <section
      className={"grid min-h-screenMinusNavbar w-full grid-cols-12 items-center px-6 lg:gap-32"}
    >
      <div className={"col-span-12 flex flex-col gap-4 p-6 lg:col-span-6 lg:gap-6"}>
        <Title className={"text-center lg:text-start"}>Products</Title>
        <ProductsCardContainer />
      </div>

      <CheckoutSummary total={getTotal} />
    </section>
  );
}
