import { SortObject } from "./sort-object.interface.ts";

export interface PageableObject {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortObject;
  unpaged: boolean;
}
