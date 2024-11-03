import { useCartStore } from "@/modules/cart/hooks/useCartStore.ts";
import { CartIcon } from "@shared/components/icons/CartIcon.tsx";

export function ShoppingCart() {
  const itemsLength = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );

  return (
    <>
      <div className={"relative"}>
        <CartIcon />
        {itemsLength > 0 && (
          <div
            className={
              "absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-primary p-3 text-white"
            }
          >
            {itemsLength}
          </div>
        )}
      </div>
    </>
  );
}
