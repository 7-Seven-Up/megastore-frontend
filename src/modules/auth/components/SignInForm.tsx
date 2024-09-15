import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/shared/components/ui/InputField.tsx";
import { PasswordInput } from "@/shared/components/ui/PasswordInput.tsx";
import {
  SignInSchema,
  SignInSchemaType,
} from "@/modules/auth/schemas/sign-in.schema.ts";
import { Title } from "@/shared/components/typography/Title.tsx";
import { useSignIn } from "@auth/hooks/useSignIn.ts";

export function SignInForm() {
  const { mutate, isPending } = useSignIn();
  const { control, handleSubmit } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  function onSubmit(data: SignInSchemaType) {
    mutate(data);
  }

  return (
    <form
      className={"flex w-full flex-col gap-8"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={"grid gap-4"}>
        <Title>Access our platform</Title>
        <p className={"text-content4-foreground"}>
          Fill the following form to access our platform
        </p>
      </div>

      <div className={"grid grid-cols-12 gap-3"}>
        <InputField<SignInSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Username"}
          name={"username"}
          placeholder={"Type your username"}
          type={"text"}
        />

        <PasswordInput<SignInSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Password"}
          name={"password"}
          placeholder={"Type your password"}
        />
      </div>

      <Button isLoading={isPending} color={"secondary"} type={"submit"}>
        Sign In
      </Button>
    </form>
  );
}
