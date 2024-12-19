import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

import { GET_ORDERS_BY_USER_KEY } from "@/features/users/constants.ts";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@shared/components/typography/Title.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";
import { useCartStore } from "@/features/cart/hooks/useCartStore.ts";
import { useCreateOrder } from "@/features/orders/hooks/useCreateOrder.ts";
import { useQueryClient } from "@tanstack/react-query";
import { GET_ORDERS_KEY } from "@/features/orders/constants.ts";

interface CheckoutSummaryProps {
  total: number;
}

export function CheckoutSummary({ total }: CheckoutSummaryProps) {
  const queryClient = useQueryClient();
  const productsInCart = useCartStore((state) => state.items);
  const resetCart = useCartStore((state) => state.resetCart);
  const userId = useAuthStore((state) => state.authResponse?.userId);

  const { createOrder, isPending } = useCreateOrder();
  const navigate = useNavigate();

  async function handleCreateOrder() {
    if (!userId) {
      return navigate(`/auth/signin?returnTo=/checkout`, { replace: true });
    }

    const createdOrder = await createOrder({
      orderDetailRequestList: productsInCart.map((product) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
        };
      }),
      userId: userId,
    });

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_ORDERS_BY_USER_KEY] }),
      queryClient.invalidateQueries({ queryKey: [GET_ORDERS_KEY] }),
    ]);

    resetCart();
    toast.success("Order created successfully!", { duration: 4000 });
    navigate(`/user/orders/${createdOrder.orderId}`, { replace: true });
  }

  return (
    <div
      className={
        "col-span-12 flex h-full flex-col items-center justify-center gap-8 bg-zinc-50 lg:col-span-6"
      }
    >
      <header className={"flex flex-col gap-1 text-center"}>
        <Title>Checkout</Title>
        <Subtitle>Total: {currencyFormatter(total, "es-AR", "ARS")}</Subtitle>
      </header>
      <Button
        className={"w-full max-w-xs"}
        color={"primary"}
        isLoading={isPending}
        onPress={handleCreateOrder}
        size={"lg"}
      >
        Create order
      </Button>
    </div>
  );
}
