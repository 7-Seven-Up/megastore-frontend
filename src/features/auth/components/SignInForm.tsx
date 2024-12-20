import { Button, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@shared/components/ui/InputField.tsx";
import { PasswordInput } from "@shared/components/ui/PasswordInput.tsx";
import { SignInSchema, SignInSchemaType } from "@/features/auth/schemas/sign-in.schema.ts";
import { Title } from "@shared/components/typography/Title.tsx";
import { useSignIn } from "@/features/auth/hooks/useSignIn.ts";

export function SignInForm() {
  const { mutate, isPending } = useSignIn();
  const { control, handleSubmit } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  function onSubmit(data: SignInSchemaType) {
    mutate(data);
  }

  return (
    <form className={"flex w-full flex-col gap-8"} onSubmit={handleSubmit(onSubmit)}>
      <div className={"grid gap-4"}>
        <Title>Access our platform</Title>
        <p className={"text-content4-foreground"}>Fill the following form to access our platform</p>
      </div>

      <div className={"grid grid-cols-12 gap-3"}>
        <InputField<SignInSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Username"}
          name={"username"}
          placeholder={"Type your username"}
          type={"text"}
          data-cy={"username"}
        />

        <PasswordInput<SignInSchemaType>
          className={"col-span-12 lg:col-span-6"}
          control={control}
          label={"Password"}
          name={"password"}
          placeholder={"Type your password"}
          data-cy={"password"}
        />
      </div>

      <div className={"flex flex-col items-center justify-center gap-8"}>
        <div className={"flex gap-2"}>
          <p className={"text-content4-foreground"}>Forgot your password?</p>
          <Link href={"/auth/send-email"}>Recover Password</Link>
        </div>
      </div>

      <Button isLoading={isPending} color={"secondary"} type={"submit"}>
        Sign In
      </Button>
    </form>
  );
}
