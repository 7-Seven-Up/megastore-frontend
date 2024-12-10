import { InputField } from "@shared/components/ui/InputField.tsx";
import { useZodForm } from "@shared/hooks/useZodForm.ts";
import {
  CreateSizeSchema,
  CreateSizeSchemaType,
} from "../schemas/create-size.schema.ts";
import { useCreateSize } from "../hooks/useCreateSize.ts";
import { FormFooter } from "@shared/components/ui/FormFooter.tsx";

interface CreateSizeFormProps {
  onClose: () => void;
}

export function CreateSizeForm({ onClose }: CreateSizeFormProps) {
  const { control, handleSubmit } = useZodForm(CreateSizeSchema);
  const { createSize, isCreating } = useCreateSize();

  async function onSubmit(data: CreateSizeSchemaType) {
    await createSize(data);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
      <InputField
        control={control}
        label={"Size name"}
        name={"name"}
        placeholder={"Type the size name"}
        data-cy={"size-name"}
      />

      <InputField
        control={control}
        label={"Size description"}
        name={"description"}
        placeholder={"Type the size description"}
        data-cy={"size-description"}
      />

      <FormFooter onClose={onClose} isLoading={isCreating} />
    </form>
  );
}
