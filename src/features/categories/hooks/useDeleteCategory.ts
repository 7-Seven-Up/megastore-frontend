import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DELETE_CATEGORY_KEY,
  GET_CATEGORIES_KEY,
  GET_DELETE_CATEGORIES_KEY,
} from "@/features/categories/constants.ts";
import { deleteCategory } from "@/features/categories/categories.service.ts";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteCategory,
    mutationKey: [DELETE_CATEGORY_KEY],
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

  return {
    deleteCategory: mutateAsync,
  };
}
