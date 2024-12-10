import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/features/categories/categories.service.ts";
import { CREATE_CATEGORY_KEY, GET_CATEGORIES_KEY } from "@/features/categories/constants.ts";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCategory,
    mutationKey: [CREATE_CATEGORY_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_KEY],
      });
    },
  });

  return {
    createCategory: mutateAsync,
    isCreating: isPending,
  };
}
