export const GET_PRODUCTS_KEY = "products/get";
export const CREATE_PRODUCTS_KEY = "products/create";
export const DELETE_PRODUCTS_KEY = "products/delete";
export const MAXIMUM_IMAGE_SIZE = 1024 * 1024;

export const PRODUCTS_TABLE_COLUMNS = [
  {
    key: "actions",
    label: "ACTIONS",
  },
  {
    key: "name",
    label: "NAME",
    width: 300,
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "stock",
    label: "STOCK",
  },
  {
    key: "color",
    label: "COLOR",
  },
  {
    key: "size",
    label: "SIZE",
  },
  {
    key: "variantOf",
    label: "VARIANT OF",
  },
];
