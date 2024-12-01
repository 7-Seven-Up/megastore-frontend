import { useCallback, useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    handlePageChange,
    page,
  };
}
