import { CartIcon } from "@shared/components/icons/CartIcon.tsx";
import { useCartStore } from "@/features/cart/hooks/useCartStore.ts";

export function ShoppingCart() {
  const itemsLength = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );

  return (
    <>
      <div className={"relative"}>
        <CartIcon className={"size-7 lg:size-8"} />
        {itemsLength > 0 && (
          <div
            className={
              "absolute -right-2 -top-2 flex size-1 items-center justify-center rounded-full bg-primary p-3 text-[13px] text-white lg:size-4 lg:text-medium"
            }
          >
            {itemsLength}
          </div>
        )}
      </div>
    </>
  );
}
