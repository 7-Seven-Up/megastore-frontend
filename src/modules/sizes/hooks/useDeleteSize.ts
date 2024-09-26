import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_SIZE_KEY, GET_SIZES_KEY } from "@/modules/sizes/constants";
import { deleteSize } from "@/modules/sizes/sizes.service";

export function useDeleteSize() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteSize,
    mutationKey: [DELETE_SIZE_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_SIZES_KEY],
      });
    },
  });

  return {
    deleteSize: mutate,
  };
}
