import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CREATE_SIZE_KEY, GET_SIZES_KEY } from "@/features/sizes/constants.ts";
import { createSize } from "@/features/sizes/sizes.service.ts";

export function useCreateSize() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSize,
    mutationKey: [CREATE_SIZE_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_SIZES_KEY],
      });
    },
  });

  return {
    createSize: mutateAsync,
    isCreating: isPending,
  };
}
