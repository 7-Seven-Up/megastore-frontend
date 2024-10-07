import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { Input, InputProps } from "@nextui-org/react";

type InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control"> & InputProps;

export function InputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputFieldProps<TFieldValues, TName>) {
  const { name, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
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
          {...rest}
        />
      )}
    />
  );
}
