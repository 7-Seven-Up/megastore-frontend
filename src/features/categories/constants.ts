export const GET_CATEGORIES_KEY = "categories/get";
export const DELETE_CATEGORY_KEY = "categories/delete";
export const CREATE_CATEGORY_KEY = "categories/create";
export const UPDATE_CATEGORY_KEY = "categories/update";
export const GET_DELETE_CATEGORIES_KEY = "categories/getDelete";
export const RESTORE_CATEGORY_KEY = "categories/restore";

export enum AVAILABLE_CATEGORIES {
  TSHIRTS = "T-Shirts",
  OUTERWEAR = "Outerwear",
  PANTS = "Pants",
}

export const CATEGORIES_TABLE_COLUMNS = [
  {
    key: "actions",
    label: "ACTIONS",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "superCategory",
    label: "SUPER CATEGORY",
  },
];
