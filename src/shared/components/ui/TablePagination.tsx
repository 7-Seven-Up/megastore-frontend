import { PaginatedResponse } from "@shared/interfaces/pagination/paginated-response.interface.ts";
import { PaginationControls } from "@shared/components/ui/PaginationControls.tsx";

interface TablePaginationProps<T> {
  handlePageChange: (page: number) => void;
  items?: PaginatedResponse<T>;
  labelName: string;
  page: number;
}

export function TablePagination<T>(props: TablePaginationProps<T>) {
  const { handlePageChange, items, labelName, page } = props;

  if (items && items.content.length > 0) {
    return (
      <PaginationControls
        currentPage={page}
        handlePageChange={handlePageChange}
        labelName={labelName}
        paginatedResponse={items}
      />
    );
  }
}
