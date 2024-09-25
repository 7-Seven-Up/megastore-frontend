import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Button } from "@nextui-org/react";
import { useZodForm } from "@/shared/hooks/useZodForm.ts";
import { SizeSchema, SizeSchemaType } from "../schemas/size.schema";
import { useCreateSize } from "../hooks/useCreateSize";

interface CreateSizeFormProps {
  onClose: () => void;
}

export function CreateSizeForm({ onClose }: CreateSizeFormProps) {
  const { control, handleSubmit } = useZodForm(SizeSchema);
  const { createSize, isCreating } = useCreateSize();

  async function onSubmit(data: SizeSchemaType) {
    await createSize(data);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField<SizeSchemaType>
        control={control}
        label={"Size name"}
        name={"name"}
        placeholder={"Type the size name"}
      />

      <InputField<SizeSchemaType>
        control={control}
        label={"Size description"}
        name={"description"}
        placeholder={"Type the size description"}
      />

      <footer className={"my-4 flex justify-end gap-2"}>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" type={"submit"} isLoading={isCreating}>
          Save
        </Button>
      </footer>
    </form>
  );
}
