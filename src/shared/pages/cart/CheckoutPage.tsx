import { Divider } from "@nextui-org/react";

import { ProductsCardContainer } from "@products/components/ProductsCardContainer.tsx";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@shared/components/typography/Title.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { useCartStore } from "@/modules/cart/hooks/useCartStore.ts";

export function CheckoutPage() {
  const getTotal = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <section
        className={
          "flex h-full w-full flex-col items-center justify-center gap-4 p-6"
        }
      >
        <Title>Products</Title>
        <Subtitle>There are no products in the cart</Subtitle>
      </section>
    );
  }

  return (
    <section className={"grid w-full grid-cols-12 items-center gap-4 p-6"}>
      <div className={"col-span-12 flex flex-col gap-4 lg:col-span-5 lg:gap-6"}>
        <Title className={"text-center lg:text-start"}>Products</Title>
        <ProductsCardContainer />
      </div>

      <div
        className={
          "col-span-12 flex h-full items-center justify-center lg:col-span-2"
        }
      >
        <Divider orientation={"vertical"} className={"hidden lg:block"} />
        <Divider
          orientation={"horizontal"}
          className={"my-4 block lg:hidden"}
        />
      </div>

      <div
        className={
          "col-span-12 flex h-full flex-col items-center gap-2 lg:col-span-5"
        }
      >
        <Title>Checkout</Title>
        <Subtitle>
          Total: {currencyFormatter(getTotal, "es-AR", "ARS")}
        </Subtitle>
      </div>
    </section>
  );
}
