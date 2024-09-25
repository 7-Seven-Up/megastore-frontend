import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UPDATE_SIZE_KEY, GET_SIZES_KEY } from "@/modules/sizes/constants.ts";
import { updateSize } from "@/modules/sizes/sizes.service.ts";

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
