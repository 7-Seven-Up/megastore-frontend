import { PageableObject } from "@/shared/interfaces/pagination/pageable-object.interface.ts";
import { SortObject } from "@/shared/interfaces/pagination/sort-object.interface.ts";

export interface PaginatedResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableObject;
  size: number;
  sort: SortObject[];
  totalElements: number;
  totalPages: number;
}
