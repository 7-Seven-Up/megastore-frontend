import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GET_DELETED_SIZES_KEY,
  GET_SIZES_KEY,
  RESTORE_SIZE_KEY,
} from "@/features/sizes/constants.ts";
import { restoreSize } from "@/features/sizes/sizes.service.ts";

export function useRestoreSize() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: restoreSize,
    mutationKey: [RESTORE_SIZE_KEY],
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
    restoreSize: mutateAsync,
  };
}
