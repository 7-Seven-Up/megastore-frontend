import { useMemo, useState } from "react";
import { Image, Link, Tooltip } from "@nextui-org/react";

import { ProductWithQuantity, useCartStore } from "@/features/cart/hooks/useCartStore.ts";
import { QuantitySelector } from "@shared/components/ui/QuantitySelector.tsx";
import { XIcon } from "@shared/components/icons/XIcon.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";

interface ProductsCartItemProps {
  onDelete: () => void;
  product: ProductWithQuantity;
}

export function ProductsCartItem(props: ProductsCartItemProps) {
  const { product, onDelete } = props;
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const subTotal = useMemo(
    () => product.price * product.quantity,
    [product.quantity, product.price],
  );

  function handleRemoveQuantity() {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1);
    addProductToCart(product, -1);
  }

  function handleAddQuantity() {
    if (quantity + 1 > product.stock) return;
    setQuantity(quantity + 1);
    addProductToCart(product, 1);
  }

  return (
    <div className={"flex items-center justify-between gap-4"}>
      <div className={"flex w-full items-center gap-4"}>
        <Link href={`/products/${product.productId}`}>
          <Image className={"size-32 object-cover"} src={product.imagesURLS[0]} />
        </Link>

        <div className={"flex flex-1 flex-col gap-2"}>
          <div className={"flex flex-col"}>
            <p className={"line-clamp-1 text-lg"}>
              {product.name} ({product.sizeName}) x {product.quantity}
            </p>
            <p>{currencyFormatter(product.price, "es-AR", "ARS")}</p>
            <p className={"font-medium"}>
              <span>Subtotal: </span>
              {currencyFormatter(subTotal, "es-AR", "ARS")}
            </p>
          </div>

          <div className={"inline-flex gap-4"}>
            <QuantitySelector
              disallowAdd={quantity === product.stock}
              disallowRemove={quantity === 1}
              handleAddQuantity={handleAddQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
              isDisabled={product.stock === 0}
              quantity={quantity}
              size={"small"}
            />

            <button onClick={onDelete} className={"block lg:hidden"}>
              <XIcon className={"size-6"} />
            </button>
          </div>
        </div>
      </div>

      <Tooltip content={"Remove product from the cart"} showArrow={true} delay={0} closeDelay={0}>
        <button onClick={onDelete} className={"hidden lg:block"}>
          <XIcon className={"size-6"} />
        </button>
      </Tooltip>
    </div>
  );
}
