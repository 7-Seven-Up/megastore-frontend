export interface OrdersByState {
  inProgressOrders: number,
  finishedOrders: number,
  inDeliveryOrders: number,
  deliveredOrders: number,
  cancelledOrders: number,
  totalOrders: number,
}