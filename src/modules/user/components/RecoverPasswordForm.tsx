import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/shared/components/ui/PasswordInput.tsx";
import {
  RecoverPasswordSchema,
  ChangePasswordRecoverPasswordSchemaType,
} from "@/modules/user/schemas/recover-password.schema.ts";
import { Button } from "@nextui-org/react";
import { useRecoverPassword } from "@/modules/user/hooks/useRecoverPassword.ts";

type RecoverPasswordProps = {
  userId: string;
  token: string;
};

export default function RecoverPasswordForm(props: RecoverPasswordProps) {
  const { mutate } = useRecoverPassword();

  const { control, handleSubmit } =
    useForm<ChangePasswordRecoverPasswordSchemaType>({
      resolver: zodResolver(RecoverPasswordSchema),
    });

  const onSubmit = (data: ChangePasswordRecoverPasswordSchemaType) => {
    mutate({
      userId: props.userId,
      token: props.token,
      newPassword: data.password,
    });
  };

  return (
    <div className={"fadeInUp flex flex-col items-center gap-8 text-center"}>
      <div className={"flex flex-col items-center"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"flex flex-col items-center justify-center gap-8"}>
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
            <Button type={"submit"}>Change Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
