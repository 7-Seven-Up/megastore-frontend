import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GET_CATEGORIES_KEY,
  UPDATE_CATEGORY_KEY,
} from "@/modules/categories/constants.ts";
import { updateCategory } from "@/modules/categories/categories.service.ts";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCategory,
    mutationKey: [UPDATE_CATEGORY_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_KEY],
      });
    },
  });

  return {
    updateCategory: mutateAsync,
    isUpdating: isPending,
  };
}
