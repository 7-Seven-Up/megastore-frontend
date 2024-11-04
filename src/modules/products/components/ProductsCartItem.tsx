import { useMemo, useState } from "react";
import { Image, Link } from "@nextui-org/react";

import {
  ProductWithQuantity,
  useCartStore,
} from "@/modules/cart/hooks/useCartStore.ts";
import { XIcon } from "@shared/components/icons/XIcon.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { QuantitySelector } from "@shared/components/ui/QuantitySelector.tsx";

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
      <div className={"flex items-center gap-4"}>
        <Link href={`/products/${product.productId}`}>
          <Image
            className={"size-32 object-cover"}
            src={product.imagesURLS[0]}
          />
        </Link>

        <div className={"flex flex-col gap-2"}>
          <div className={"flex flex-col"}>
            <p className={"text-lg"}>
              {product.name} - {product.quantity}
            </p>
            <p>{currencyFormatter(product.price, "es-AR", "ARS")}</p>
            <strong>
              <span>Subtotal: </span>
              {currencyFormatter(subTotal, "es-AR", "ARS")}
            </strong>
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

      <button onClick={onDelete} className={"hidden lg:block"}>
        <XIcon className={"size-6"} />
      </button>
    </div>
  );
}