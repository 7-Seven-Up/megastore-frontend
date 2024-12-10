import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreCategory } from "@/features/categories/categories.service.ts";
import {
  GET_CATEGORIES_KEY,
  GET_DELETE_CATEGORIES_KEY,
  RESTORE_CATEGORY_KEY,
} from "@/features/categories/constants.ts";

export function useRestoreCategory() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (categoryId: string) => restoreCategory(categoryId),
    mutationKey: [RESTORE_CATEGORY_KEY],
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_CATEGORIES_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_DELETE_CATEGORIES_KEY],
        }),
      ]);
    },
  });

  return { restoreCategory: mutateAsync };
}
