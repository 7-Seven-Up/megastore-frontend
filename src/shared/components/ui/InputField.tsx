import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { Input, InputProps } from "@nextui-org/react";

export default function InputField<T extends FieldValues>(
  props: UseControllerProps<T> & InputProps,
) {
  const { field, fieldState } = useController(props);
  return (
    <Input
      className={props.className}
      errorMessage={fieldState.error?.message}
      isInvalid={fieldState.invalid}
      label={props.label}
      placeholder={props.placeholder}
      classNames={{
        errorMessage: "text-start",
      }}
      {...field}
      {...props}
    />
  );
}
