import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DELETE_CATEGORY_KEY,
  GET_CATEGORIES_KEY,
} from "@/modules/categories/constants.ts";
import { deleteCategory } from "@/modules/categories/categories.service.ts";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: deleteCategory,
    mutationKey: [DELETE_CATEGORY_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_KEY],
      });
    },
  });

  return { mutate, isSuccess, isPending };
}
