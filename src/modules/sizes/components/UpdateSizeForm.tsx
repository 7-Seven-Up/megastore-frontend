import { InputField } from "@/shared/components/ui/InputField.tsx";
import { useZodForm } from "@/shared/hooks/useZodForm.ts";
import { Size } from "../interfaces/responses/size.interface";
import {
  UpdateSizeSchema,
  UpdateSizeSchemaType,
} from "../schemas/update-size.schema";
import { useUpdateSize } from "../hooks/useUpdateSize";
import { FormFooter } from "@/shared/components/ui/FormFooter.tsx";

interface UpdateSizeFormProps {
  size: Size;
  onClose: () => void;
}

export function UpdateSizeForm({ onClose, size }: UpdateSizeFormProps) {
  const { control, handleSubmit } = useZodForm(UpdateSizeSchema, {
    defaultValues: {
      name: size.name,
      description: size.description,
    },
  });
  const { updateSize, isUpdating } = useUpdateSize();

  async function onSubmit(data: UpdateSizeSchemaType) {
    await updateSize({
      sizeId: size.sizeId,
      ...data,
    });

    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField
        control={control}
        label={"Size name"}
        name={"name"}
        placeholder={"Type the size name"}
      />

      <InputField
        control={control}
        label={"Size description"}
        name={"description"}
        placeholder={"Type the size description"}
      />

      <FormFooter onClose={onClose} isLoading={isUpdating} />
    </form>
  );
}
