import { Button, ButtonGroup, Pagination } from "@nextui-org/react";
import { PaginatedResponse } from "@/shared/interfaces/pagination/paginated-response.interface.ts";
import { useMemo } from "react";

interface PaginationControlsProps<T> {
  currentPage: number;
  handlePageChange: (page: number) => void;
  paginatedResponse: PaginatedResponse<T>;
  labelName: string;
}

export function PaginationControls<T>(props: PaginationControlsProps<T>) {
  const { paginatedResponse, handlePageChange, currentPage } = props;

  const label = useMemo(() => {
    return `Showing from ${paginatedResponse.pageable.offset + 1} to ${
      paginatedResponse.pageable.offset + paginatedResponse.numberOfElements
    } ${props.labelName} of ${paginatedResponse.totalElements}`;
  }, [paginatedResponse, props.labelName]);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 rounded-2xl p-4 shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] sm:justify-between">
      <Pagination
        color="primary"
        isCompact
        onChange={(page) => handlePageChange(page)}
        page={currentPage}
        showControls
        showShadow
        size={"lg"}
        total={paginatedResponse.totalPages}
      />
      <p className={"text-center text-content4-foreground"}>{label}</p>
      <ButtonGroup>
        <Button
          isDisabled={paginatedResponse.first}
          onPress={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          isDisabled={paginatedResponse.last}
          onPress={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
}
