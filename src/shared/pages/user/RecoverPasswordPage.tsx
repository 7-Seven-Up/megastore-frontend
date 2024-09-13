import { useSearchParams } from "react-router-dom";
import InputField from "@/shared/components/ui/InputField.tsx";
import { useMutation } from "@tanstack/react-query";
import Title from "@/shared/components/typography/Title";

type RecoverPasswordParams = {
  userId: string,
  token: string
}
export default function RecoverPasswordPage() {
  const [searchParams] = useSearchParams();
  const params: RecoverPasswordParams = {
    userId: searchParams.get("userId")!,
    token: searchParams.get("token")!,
  }

  const {mutate, isPending, isError,isSuccess} = useMutation();

  return (
    <div>
      <Title>Recover your password</Title>
      <InputField name={email}/>
    </div>
  );

}