import { useState } from "react";
import { Button } from "@nextui-org/react";

import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";
import { QuantitySelector } from "@shared/components/ui/QuantitySelector.tsx";
import { useCartStore } from "@/features/cart/hooks/useCartStore.ts";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";
import { Role } from "@/features/users/enums/role.enum.ts";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const role = useAuthStore((state) => state.authResponse?.role);

  function handleRemoveQuantity() {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1);
  }

  function handleAddQuantity() {
    if (quantity + 1 > product.stock) return;
    setQuantity(quantity + 1);
  }

  function handleAddProductToCart() {
    toast.info("Product added to cart", { duration: 1000 });
    addProductToCart(product, quantity);
    setQuantity(1);
  }

  return (
    <div className={"flex flex-wrap gap-2"}>
      <div className={"flex-1"}>
        <Button
          className={"w-full"}
          color={"primary"}
          isDisabled={product.stock === 0 || role === Role.ADMIN}
          onPress={handleAddProductToCart}
        >
          Add to cart
        </Button>
      </div>

      <QuantitySelector
        disallowAdd={quantity === product.stock}
        disallowRemove={quantity === 1}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        isDisabled={product.stock === 0 || role === Role.ADMIN}
        quantity={quantity}
      />
    </div>
  );
}
