import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Button } from "@nextui-org/react";
import {
  SendEmailSchemaType,
  SendEmailSchema,
} from "@/modules/user/schemas/send-email.schema.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendEmail } from "@/modules/user/hooks/useSendEmail.ts";
import { Title } from "@/shared/components/typography/Title";
import { PATH_TO_NAVIGATE_MAP } from "../route-constants";

interface SendEmailFormProps {
  path: string;
}

export default function SendEmailForm({ path }: SendEmailFormProps) {
  const { control, handleSubmit } = useForm<SendEmailSchemaType>({
    resolver: zodResolver(SendEmailSchema),
  });

  const navigate_to: string = PATH_TO_NAVIGATE_MAP[path] || "/";
  const { mutate, isPending } = useSendEmail({ navigate_to });

  const onSubmit = ({ email }: SendEmailSchemaType) => {
    mutate({ email, path });
  };

  return (
    <form
      className={"flex w-full flex-col gap-4"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={"grid gap-4"}>
        <Title>Send email</Title>
      </div>

      <div className={"flex gap-4"}>
        <InputField<SendEmailSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Email"}
          name={"email"}
          placeholder={"Type your email"}
          type={"text"}
        />
      </div>
      <Button color={"secondary"} isLoading={isPending} type={"submit"}>
        Send
      </Button>
    </form>
  );
}
