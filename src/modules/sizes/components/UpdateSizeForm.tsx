import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Button } from "@nextui-org/react";
import { useZodForm } from "@/shared/hooks/useZodForm.ts";
import { Size } from "../interfaces/responses/size.interface";
import { SizeSchema, SizeSchemaType } from "../schemas/size.schema";
import { useUpdateSize } from "../hooks/useUpdateSize";

interface UpdateSizeFormProps {
  size: Size;
  onClose: () => void;
}

export function UpdateSizeForm({ onClose, size }: UpdateSizeFormProps) {
  const { control, handleSubmit } = useZodForm(SizeSchema);
  const { updateSize, isUpdating } = useUpdateSize();

  async function onSubmit(data: SizeSchemaType) {
    await updateSize({
      sizeId: size.sizeId,
      ...data,
    });

    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField<SizeSchemaType>
        control={control}
        defaultValue={size.name}
        label={"Size name"}
        name={"name"}
        placeholder={"Type the size name"}
      />

      <InputField<SizeSchemaType>
        control={control}
        defaultValue={size.description}
        label={"Size description"}
        name={"description"}
        placeholder={"Type the size description"}
      />

      <footer className={"my-4 flex justify-end gap-2"}>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" type={"submit"} isLoading={isUpdating}>
          Save
        </Button>
      </footer>
    </form>
  );
}
