import { OrderState } from "@/features/orders/enums/order-state.enum.ts";

export const CANCEL_ORDERS_KEY = "orders/cancel";
export const CREATE_ORDERS_KEY = "orders/create";
export const GET_ORDERS_KEY = "orders/get";

export const FINAL_ORDER_STATES = [OrderState.CANCELLED, OrderState.DELIVERED];

export const ORDERS_TABLE_COLUMNS = [
  {
    key: "actions",
    label: "ACTIONS",
  },
  {
    key: "state",
    label: "STATE",
  },
  {
    key: "number",
    label: "NUMBER",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "total",
    label: "TOTAL",
  },
  {
    key: "products",
    label: "PRODUCTS",
  },
];

export const ADMIN_ORDERS_TABLE_COLUMNS = [
  {
    key: "actions",
    label: "ACTIONS",
  },
  {
    key: "state",
    label: "STATE",
  },
  {
    key: "number",
    label: "NUMBER",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "total",
    label: "TOTAL",
  },
  {
    key: "products",
    label: "PRODUCTS",
  },
  {
    key: "client",
    label: "CLIENT NAME",
  },
];
