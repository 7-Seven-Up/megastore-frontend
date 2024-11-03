import { Image, Link } from "@nextui-org/react";

import { ProductWithQuantity } from "@/modules/cart/hooks/useCartStore.ts";
import { XIcon } from "@shared/components/icons/XIcon.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";

interface ProductsCartItemProps {
  onDelete: () => void;
  product: ProductWithQuantity;
}

export function ProductsCartItem(props: ProductsCartItemProps) {
  const { product, onDelete } = props;

  return (
    <div className={"flex items-center justify-between gap-4"}>
      <div className={"flex items-center gap-4"}>
        <Link href={`/products/${product.productId}`}>
          <Image
            className={"size-28 object-cover"}
            src={product.imagesURLS[0]}
          />
        </Link>

        <div className={"flex flex-col"}>
          <p className={"text-lg"}>{product.name}</p>
          <p>{currencyFormatter(product.price, "es-AR", "ARS")}</p>
          <strong>
            <span>Subtotal: </span>
            {currencyFormatter(
              product.price * product.quantity,
              "es-AR",
              "ARS",
            )}
          </strong>
          <p>{product.quantity}</p>
        </div>
      </div>

      <button onClick={onDelete}>
        <XIcon className={"size-6"} />
      </button>
    </div>
  );
}
