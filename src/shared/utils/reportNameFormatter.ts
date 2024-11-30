const states = new Map([
  ["inProgressOrders", "In progress orders"],
  ["finishedOrders", "Finished orders"],
  ["inDeliveryOrders", "In delivery orders"],
  ["deliveredOrders", "Delivered orders"],
  ["cancelledOrders", "Cancelled orders"],
  ["totalOrders", "Total orders"]
])

export function reportNameFormatter(state: string) {
  return states.get(state)
}