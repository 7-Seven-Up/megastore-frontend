import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/shared/components/ui/PasswordInput.tsx";
import {
  ChangePasswordRecoverPasswordSchemaType,
  RecoverPasswordSchema
} from "@/modules/users/schemas/recover-password.schema.ts";
import { Button } from "@nextui-org/react";
import { useRecoverPassword } from "@/modules/users/hooks/useRecoverPassword.ts";

type RecoverPasswordProps = {
  token: string;
};

export default function RecoverPasswordForm({ token }: RecoverPasswordProps) {
  const { mutate } = useRecoverPassword();

  const { control, handleSubmit } =
    useForm<ChangePasswordRecoverPasswordSchemaType>({
      resolver: zodResolver(RecoverPasswordSchema),
    });

  const onSubmit = ({
    password,
    confirmPassword,
  }: ChangePasswordRecoverPasswordSchemaType) => {
    mutate({
      newPassword: password,
      confirmNewPassword: confirmPassword,
      token,
    });
  };

  return (
    <div className={"fadeInUp w-full"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"grid-cols- 1 grid gap-4"}>
          <PasswordInput<ChangePasswordRecoverPasswordSchemaType>
            name={"password"}
            label={"Password"}
            labelPlacement={"outside"}
            control={control}
            placeholder={"Type your new password"}
          />
          <PasswordInput<ChangePasswordRecoverPasswordSchemaType>
            name={"confirmPassword"}
            label={"Confirm Password"}
            labelPlacement={"outside"}
            control={control}
            placeholder={"Confirm your new password"}
          />
          <Button color={"secondary"} type={"submit"}>
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
}
