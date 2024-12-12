import { Button, Link } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import RenderIf from "@shared/components/RenderIf.tsx";
import { FullscreenLoading } from "@shared/components/ui/FullscreenLoading.tsx";
import { GET_ORDERS_BY_USER_KEY } from "@/features/users/constants.ts";
import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";
import { OrderState } from "@/features/orders/enums/order-state.enum.ts";
import { OrderStateChip } from "@/features/orders/components/OrderStateChip.tsx";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@shared/components/typography/Title.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { dateFormatter } from "@shared/utils/dateFormatter.ts";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";
import { useCancelOrder } from "@/features/orders/hooks/useCancelOrder.ts";
import { useGetOrdersByUser } from "@/features/users/hooks/useGetOrdersByUser.ts";

export function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const username = useAuthStore((state) => state.authResponse?.username);
  const { cancelOrder, isCanceling } = useCancelOrder();

  const cachedOrders = queryClient.getQueryData([GET_ORDERS_BY_USER_KEY]) as OrderResponse[];
  const { ordersByUser, isLoading } = useGetOrdersByUser(username!, !cachedOrders);

  const cachedOrder = cachedOrders?.find((order) => order.orderId === orderId);
  const order = ordersByUser?.find((order) => order.orderId === orderId) || cachedOrder;

  if (isLoading) {
    return <FullscreenLoading className={"h-screenMinusNavbar"} />;
  }

  if (!order) {
    return <Navigate to={"/user/orders"} />;
  }

  const { orderDetails } = order;

  async function handleCancelOrder() {
    await cancelOrder(orderId!);
    navigate(0);
  }

  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header className={"flex flex-col justify-center gap-3"}>
        <div className={"inline-flex gap-2"}>
          <Button
            variant={"flat"}
            className={"flex-1 lg:w-fit lg:flex-grow-0"}
            as={Link}
            href={"/user/orders"}
          >
            Go back
          </Button>

          <RenderIf condition={order.state !== OrderState.CANCELLED}>
            <Button
              className={"border-0"}
              color={"danger"}
              isLoading={isCanceling}
              onPress={handleCancelOrder}
              variant={"bordered"}
            >
              Cancel order
            </Button>
          </RenderIf>
        </div>

        <div className={"flex flex-wrap items-center justify-between"}>
          <div className={"flex items-center gap-2 md:gap-6"}>
            <Title>Order detail</Title>
            <OrderStateChip state={order?.state} />
          </div>
          <Subtitle className={"text-zinc-400"}>{dateFormatter(order.date)}</Subtitle>
        </div>
      </header>

      <div className={"flex flex-col gap-4"}>
        <Subtitle>Products</Subtitle>

        <div className={"flex flex-col gap-4 rounded-lg border-2 border-content2 p-2 lg:p-4"}>
          {orderDetails.map((detail) => (
            <div key={detail.orderDetailId} className={"flex items-center justify-between"}>
              <div className={"flex items-center gap-4"}>
                <Link href={`/products/${detail.product.productId}`}>
                  <Image
                    alt={detail.product.name}
                    className={"object-cover lg:h-28 lg:w-28"}
                    src={detail.product.imagesURLS[0]}
                  />
                </Link>
                <div className={"flex flex-col gap-1 text-center lg:text-start"}>
                  <h3 className={"text-xl font-medium lg:text-2xl"}>
                    {detail.product.name} ({detail.product.sizeName}) x {detail.quantity}
                  </h3>
                  <p className={"text-lg text-zinc-400 lg:text-xl"}>
                    <span className={"hidden lg:block"}>
                      {currencyFormatter(detail.product.price, "es-AR", "ARS")}
                    </span>
                    <span className={"lg:hidden"}>
                      {currencyFormatter(detail.product.price * detail.quantity, "es-AR", "ARS")}
                    </span>
                  </p>
                </div>
              </div>

              <p className={"hidden text-xl font-medium text-zinc-400 lg:block"}>
                {currencyFormatter(detail.product.price * detail.quantity, "es-AR", "ARS")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={"mt-1 flex items-center justify-between"}>
        <Title className={""}>Total</Title>
        <Subtitle className={"text-xl font-bold lg:text-3xl"}>
          {currencyFormatter(order.total, "es-AR", "ARS")}
        </Subtitle>
      </div>
    </div>
  );
}
