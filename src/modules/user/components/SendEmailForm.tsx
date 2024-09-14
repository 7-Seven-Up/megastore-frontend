import { InputField } from "@/shared/components/ui/InputField.tsx";
import { Button, Link } from "@nextui-org/react";
import {
  SendEmailSchemaType,
  SendEmailSchema,
} from "@/modules/user/schemas/send-email.schema.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendEmail } from "@/modules/user/hooks/useSendEmail.ts";

export default function SendEmailForm() {
  const { control, handleSubmit } = useForm<SendEmailSchemaType>({
    resolver: zodResolver(SendEmailSchema),
  });

  const { mutate, isPending } = useSendEmail();

  const onSubmit = (data: SendEmailSchemaType) => {
    mutate({ email: data.email });
  };

  return (
    <div className={"fadeInUp flex flex-col items-center justify-center gap-1"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col items-center justify-center gap-8"}>
          <InputField<SendEmailSchemaType>
            name={"email"}
            label={"Email"}
            labelPlacement={"outside"}
            control={control}
            placeholder={"Type your email"}
            type={"email"}
          />
          <Button isLoading={isPending} type={"submit"}>
            Send Email
          </Button>
        </div>
      </form>
      <Link
        color={"secondary"}
        href={"/auth/signin"}
        className={"fadeInUp"}
        style={{ marginTop: 25 }}
      >
        Back to log in
      </Link>
    </div>
  );
}
