import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";
import { PaginatedResponse } from "@shared/interfaces/pagination/paginated-response.interface.ts";

export type PaginatedOrderResponse = PaginatedResponse<OrderResponse>;
