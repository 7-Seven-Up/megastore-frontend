import { useState } from "react";
import { Button } from "@nextui-org/react";

import { Product } from "@products/interfaces/responses/product-response.interface.ts";
import { QuantitySelector } from "@shared/components/ui/QuantitySelector.tsx";
import { useCartStore } from "@/modules/cart/hooks/useCartStore.ts";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  function handleRemoveQuantity() {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1);
  }

  function handleAddQuantity() {
    if (quantity + 1 > product.stock) return;
    setQuantity(quantity + 1);
  }

  function handleAddProductToCart() {
    addProductToCart(product, quantity);
    setQuantity(1);
  }

  return (
    <div className={"flex flex-wrap gap-2"}>
      <div className={"flex-1"}>
        <Button
          className={"w-full"}
          color={"primary"}
          isDisabled={product.stock === 0}
          onPress={handleAddProductToCart}
        >
          Agregar al carrito
        </Button>
      </div>

      <QuantitySelector
        disallowAdd={quantity === product.stock}
        disallowRemove={quantity === 1}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        isDisabled={product.stock === 0}
        quantity={quantity}
      />
    </div>
  );
}
