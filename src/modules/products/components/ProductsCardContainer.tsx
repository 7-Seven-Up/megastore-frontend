import { ProductsCartItem } from "@products/components/ProductsCartItem.tsx";
import { useCartStore } from "@/modules/cart/hooks/useCartStore.ts";

export function ProductsCardContainer() {
  const productsInCart = useCartStore((state) => state.items);
  const deleteProductFromCart = useCartStore(
    (state) => state.deleteProductFromCart,
  );

  return productsInCart.map((product, idx) => {
    return (
      <ProductsCartItem
        key={`product-card-${product.productId}`}
        onDelete={() => deleteProductFromCart(idx)}
        product={product}
      />
    );
  });
}
