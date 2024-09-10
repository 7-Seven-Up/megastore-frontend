import InputField from "./InputField.tsx";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { InputProps } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon.tsx";
import { EyeFilledIcon } from "../icons/EyeFilledIcon.tsx";

export default function PasswordInput<T extends FieldValues>(
  props: UseControllerProps<T> & InputProps,
) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <InputField
      {...props}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          onClick={() => setPasswordVisible(!passwordVisible)}
          type="button"
        >
          {passwordVisible ? (
            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      type={passwordVisible ? "text" : "password"}
    />
  );
}
