import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSize } from "@/modules/sizes/sizes.service.ts";
import { CREATE_SIZE_KEY, GET_SIZES_KEY } from "@/modules/sizes/constants.ts";

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
