import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";

export type ProductWithQuantity = Product & { quantity: number };

type Store = {
  addProductToCart: (product: Product, quantity: number) => void;
  deleteProductFromCart: (index: number) => void;
  getTotal: () => number;
  items: ProductWithQuantity[];
  getItemsLength: () => number;
};

export const useCartStore = create<Store>()(
  persist(
    (set, get) => ({
      addProductToCart: (product: Product, quantity: number = 1) => {
        let updatedItems: ProductWithQuantity[];

        const isProductInCart = get().items.some((item) => item.productId === product.productId);

        if (isProductInCart) {
          updatedItems = get().items.map((item) => {
            if (item.productId === product.productId) {
              return { ...item, quantity: item.quantity + quantity };
            }

            return item;
          });

          set({ items: updatedItems });
          return;
        }

        updatedItems = [
          ...get().items,
          {
            ...product,
            quantity,
          },
        ];

        set({ items: updatedItems });
      },
      deleteProductFromCart: (index: number) => {
        const filteredProducts = get().items.filter((_, idx) => idx !== index);
        set({ items: filteredProducts });
      },
      items: [],
      getTotal: () => {
        return get().items.reduce((acc, item) => acc + item.price, 0);
      },
      getItemsLength: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
