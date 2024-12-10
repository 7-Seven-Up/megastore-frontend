import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_SIZES_KEY, UPDATE_SIZE_KEY } from "@/features/sizes/constants.ts";
import { updateSize } from "@/features/sizes/sizes.service.ts";

export function useUpdateSize() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSize,
    mutationKey: [UPDATE_SIZE_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_SIZES_KEY],
      });
    },
  });

  return { updateSize: mutateAsync, isUpdating: isPending };
}
