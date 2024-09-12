import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/shared/components/ui/InputField.tsx";
import { PasswordInput } from "@/shared/components/ui/PasswordInput.tsx";
import {
  SignUpSchema,
  SignUpSchemaType,
} from "@/modules/auth/schemas/sign-up.schema.ts";
import { Title } from "@/shared/components/typography/Title.tsx";
import { useSignUp } from "@auth/hooks/useSignUp.ts";

export function SignUpForm() {
  const { mutate, isPending } = useSignUp();
  const { control, handleSubmit } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  function onSubmit(data: SignUpSchemaType) {
    mutate(data);
  }

  return (
    <form
      className={"flex w-full max-w-screen-sm flex-col gap-8 text-center"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={"grid gap-4"}>
        <Title>Create a new account</Title>
        <p className={"text-content4-foreground"}>
          Fill the following form to create a new account
        </p>
      </div>

      <div className={"grid grid-cols-12 gap-3"}>
        <InputField
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Username"}
          name={"username"}
          placeholder={"Type your username"}
          rules={{ required: true }}
          type={"text"}
        />

        <InputField<SignUpSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"E-mail"}
          name={"email"}
          placeholder={"Type your e-mail"}
          rules={{ required: true }}
          type={"email"}
        />

        <PasswordInput<SignUpSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Password"}
          name={"password"}
          placeholder={"Type your password"}
          rules={{ required: true }}
        />

        <PasswordInput<SignUpSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Password confirmation"}
          name={"confirmPassword"}
          placeholder={"Retype your password"}
          rules={{ required: true }}
        />

        <InputField<SignUpSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Full name"}
          name={"fullName"}
          placeholder={"Type your full name"}
          rules={{ required: true }}
          type={"text"}
        />

        <InputField<SignUpSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Phone number"}
          name={"phoneNumber"}
          placeholder={"Type your phone number"}
          rules={{ required: true }}
          type={"tel"}
        />
      </div>

      <Button isLoading={isPending} color={"secondary"} type={"submit"}>
        Create account
      </Button>
    </form>
  );
}
