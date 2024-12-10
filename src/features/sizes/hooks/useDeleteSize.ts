import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DELETE_SIZE_KEY,
  GET_DELETED_SIZES_KEY,
  GET_SIZES_KEY,
} from "@/features/sizes/constants.ts";
import { deleteSize } from "@/features/sizes/sizes.service.ts";

export function useDeleteSize() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteSize,
    mutationKey: [DELETE_SIZE_KEY],
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_SIZES_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_DELETED_SIZES_KEY],
        }),
      ]);
    },
  });

  return {
    deleteSize: mutateAsync,
  };
}
